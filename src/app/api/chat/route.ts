import { streamText, embed } from 'ai';
import { google } from '@ai-sdk/google';
import { Pinecone } from '@pinecone-database/pinecone';

// 1. Initialize Pinecone Client
// Ensure you have PINECONE_API_KEY and PINECONE_INDEX_NAME in your .env.local
const pinecone = new Pinecone({
  apiKey: process.env.PINECONE_API_KEY || '',
});

// 2. RETRIEVAL FUNCTION (The real 'R' in RAG)
async function retrieveContext(query: string): Promise<string> {
  try {
    // a) Create an embedding for the user's query
    const { embedding } = await embed({
      model: google.textEmbeddingModel('text-embedding-004'),
      value: query,
    });

    // b) Query the Pinecone Vector Database
    const index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'portfolio-index');
    const queryResponse = await index.query({
      vector: embedding,
      topK: 5,
      includeMetadata: true,
    });

    // c) Extract the text from the metadata of the matched vectors
    const matches = queryResponse.matches
      .map((match) => (match.metadata as { text?: string })?.text)
      .filter((text): text is string => !!text);

    return matches.length > 0 ? matches.join("\n- ") : "No specific context found.";
  } catch (error) {
    console.error("Pinecone Retrieval Error:", error);
    return "Context retrieval failed.";
  }
}

export async function POST(req: Request) {
  try {
    // Extract the messages and the selected model from the request body
    const { messages, model = 'gemini-1.5-flash' } = await req.json();

    // Get the latest message from the user to use as our search query
    const lastUserMessage = messages[messages.length - 1];

    // 3. RETRIEVE CONTEXT
    const context = await retrieveContext(lastUserMessage.content);

    // 4. AUGMENT & GENERATE (The 'A' and 'G' in RAG)
    const result = await streamText({
      model: google(model),
      system: `You are a helpful AI assistant integrated into Sajid Islam's VS Code-themed developer portfolio.
      Use the following retrieved context to answer the user's query accurately. 
      If the answer is not contained in the context, you may use your general knowledge, but always prioritize the context provided below.
      Keep your answers concise, professional, and matching a developer/hacker persona.

      === RETRIEVED CONTEXT ===
      - ${context}
      =========================`,
      messages,
    });

    // Return the streaming response to the frontend client
    return result.toTextStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
