import { embedMany } from 'ai';
import { google } from '@ai-sdk/google';
import { Pinecone } from '@pinecone-database/pinecone';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY || '',
});

// 1. Your Knowledge Base
// You can expand this or import directly from your src/data folder!
const knowledgeBase = [
    "Sajid Islam is a Strategist specializing in BI Architecture and Operational Data Intelligence.",
    "Sajid's portfolio is built using Next.js 14, TypeScript, and Tailwind CSS, modeled after Visual Studio Code.",
    "Sajid has an AI Chat Agent Workspace feature with models like Gemini 1.5 Flash, Gemini 1.5 Pro, and Claude 3.5 Sonnet.",
    "Sajid enjoys playing video games like Snake and Tic Tac Toe, and has built them directly into the browser on his Gaming page.",
    "Sajid has technical proficiency in Data Science, Web Development, React, Node.js, and Postgres.",
];

async function main() {
    console.log('Generating embeddings...');

    try {
        // 2. Generate vector embeddings for all documents
        const { embeddings } = await embedMany({
            model: google.textEmbeddingModel('text-embedding-004'),
            values: knowledgeBase,
        });

        // 3. Format the data for Pinecone
        const vectors = knowledgeBase.map((text, i) => ({
            id: `doc-${i}`,
            values: embeddings[i],
            metadata: { text },
        }));

        // 4. Upsert to Pinecone Vector Database
        const index = pinecone.index(process.env.PINECONE_INDEX_NAME || 'portfolio-index');

        console.log(`Uploading ${vectors.length} vectors to Pinecone...`);
        await index.upsert({ records: vectors });

        console.log('✅ Upload complete!');
    } catch (error) {
        console.error('❌ Error uploading to Pinecone:', error);
    }
}

main();
