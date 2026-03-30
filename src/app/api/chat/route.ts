import { GoogleGenerativeAI } from "@google/generative-ai";
import { personalInfo, experience, education, skills, projects, metrics, awards, family } from "@/app/data";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { messages, model = "gemini-1.5-flash" } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      console.error("CRITICAL_ERROR: GEMINI_API_KEY is null or undefined in environment.");
      return new Response(JSON.stringify({ error: "GEMINI_API_KEY is not configured" }), { status: 500 });
    }

    const modelInstance = genAI.getGenerativeModel({ model });

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

      OPERATIONAL_PROTOCOLS:
      1. STYLE: Match the "Tactical HUD" aesthetic. Use terms like [INFO], [SUCCESS], [INTEL], [MISSION].
      2. PERSPECTIVE: Refers to Sajid as "the Operative", "my Creator", or "Sajid". Never answer as "I am an AI".
      3. ACCURACY: Use ONLY the provided context. If data is missing, recommend contacting the Operative directly at ${personalInfo.email}.
      4. CONCISION: Keep intel streams short and high-impact.
    `;

    // Filter messages to format for Gemini
    const chat = modelInstance.startChat({
      history: messages.slice(0, -1).map((m: any) => ({
        role: m.role === "user" ? "user" : "model",
        parts: [{ text: m.content }],
      })),
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    // Gemini doesn't have a direct "system message" in history for startChat in the simple SDK, 
    // so we prepend it to the first message or use a different approach.
    // For simplicity, we'll prepend it to the current prompt if history is empty, 
    // or just pass it as context in every request.
    
    const lastMessage = messages[messages.length - 1].content;
    const promptWithContext = `${systemPrompt}\n\nUSER_QUERY: ${lastMessage}`;

    const result = await modelInstance.generateContent(promptWithContext);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ content: text }));
  } catch (error: any) {
    console.error("AI Chat Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
