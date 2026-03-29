import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name: string;
  email: string;
  subject?: string;
  message: string;
  captchaToken?: string;
  honeypot?: string;
};

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const rateLimitStore = new Map<string, { count: number; reset: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim();
  }
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);
  if (!entry || now > entry.reset) {
    rateLimitStore.set(ip, { count: 1, reset: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  rateLimitStore.set(ip, entry);
  return false;
}

async function verifyTurnstile(token: string, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  const formData = new URLSearchParams();
  formData.append("secret", secret);
  formData.append("response", token);
  if (ip) {
    formData.append("remoteip", ip);
  }
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body: formData }
  );
  if (!response.ok) return false;
  const data = (await response.json()) as { success: boolean };
  return data.success;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let payload: ContactPayload;
  try {
    payload = (await request.json()) as ContactPayload;
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Invalid request payload." },
      { status: 400 }
    );
  }

  if (payload.honeypot) {
    return NextResponse.json({ ok: false, error: "Spam detected." }, { status: 400 });
  }

  const name = payload.name?.trim();
  const email = payload.email?.trim();
  const subject = payload.subject?.trim() || "Portfolio Contact";
  const message = payload.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Missing required fields." },
      { status: 400 }
    );
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = payload.captchaToken;
    if (!token) {
      return NextResponse.json(
        { ok: false, error: "Captcha required." },
        { status: 400 }
      );
    }
    const verified = await verifyTurnstile(token, ip === "unknown" ? null : ip);
    if (!verified) {
      return NextResponse.json(
        { ok: false, error: "Captcha verification failed." },
        { status: 400 }
      );
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Email service is not configured. Set RESEND_API_KEY, CONTACT_TO_EMAIL, and CONTACT_FROM_EMAIL.",
      },
      { status: 500 }
    );
  }

  const html = `
    <div>
      <h2>New portfolio message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, "<br />")}</p>
    </div>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      subject: `[Portfolio] ${subject}`,
      reply_to: email,
      html,
    }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { ok: false, error: "Failed to send email." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
