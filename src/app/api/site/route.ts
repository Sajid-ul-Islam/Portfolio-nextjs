export async function GET() {
  try {
    const external = await fetch("https://saajiidi.github.io/", { next: { revalidate: 300 } });
    if (!external.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch site content" }), { status: 502 });
    }

    const html = await external.text();
    // Basic extraction: remove tags, keep text, limit size
    const text = html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .substring(0, 3500);

    return new Response(JSON.stringify({ content: text }));
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
