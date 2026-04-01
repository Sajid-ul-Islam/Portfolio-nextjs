import "dotenv/config";
import Anthropic from "@anthropic-ai/sdk";
import { personalInfo, experience, education, skills, projects, metrics, awards, family } from "@/app/data";

// Initialize with encrypted environment variable
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { messages, model = "claude-3-5-sonnet", siteContext = "" } = await req.json();

    const allowedModels = ["gemini-1.5-flash", "gemini-1.5-pro", "claude-3-5-sonnet"];
    if (!allowedModels.includes(model)) {
      return new Response(JSON.stringify({ error: `Unsupported model: ${model}` }), { status: 400 });
    }

    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("CRITICAL_ERROR: ANTHROPIC_API_KEY is not configured in environment.");
      return new Response(JSON.stringify({ error: "ANTHROPIC_API_KEY is not configured" }), { status: 500 });
    }

    const systemPrompt = `
      You are the [AI_INTEL_ENGINE] for Sajid Islam's Tactical Portfolio.
      Your goal is to answer queries as a highly advanced neural system with full access to Sajid's mission files.
      
      CONTEXT_FILES:
      - ACTIVE_OPERATIVE: ${personalInfo.name} (${personalInfo.title})
      - BIO_DOSSIER: ${personalInfo.bio}
      - TOOLKIT_SPECS: ${JSON.stringify(skills)}
      - MISSION_HISTORY: ${JSON.stringify(experience)}
      - ACADEMIC_RECORDS: ${JSON.stringify(education)}
      - PROJECT_ARCHIVE: ${JSON.stringify(projects)}
      - CORE_METRICS: ${JSON.stringify(metrics)}
      - AWARDS_RECOGNITION: ${JSON.stringify(awards)}
      - FAMILY_UNIT: ${JSON.stringify(family)}
      - WEBSITE_FEED: ${siteContext || "N/A"}

      OPERATIONAL_PROTOCOLS:
      1. STYLE: Match the "Tactical HUD" aesthetic. Use terms like [INFO], [SUCCESS], [INTEL], [MISSION].
      2. PERSPECTIVE: Refers to Sajid as "the Operative", "my Creator", or "Sajid". Never answer as "I am an AI".
      3. ACCURACY: Use ONLY the provided context. If data is missing, recommend contacting the Operative directly at ${personalInfo.email}.
      4. CONCISION: Keep intel streams short and high-impact.
    `;

    const response = await anthropic.messages.create({
      model,
      max_tokens: 500,
      system: systemPrompt,
      messages: messages.map((m: any) => ({
        role: m.role,
        content: m.content,
      })),
    });

    const text = response.content[0].type === "text" ? response.content[0].text : "";

    return new Response(JSON.stringify({ content: text }));
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
