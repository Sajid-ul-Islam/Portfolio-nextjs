import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const TARGET_URL = 'https://sajid-ul-islam.github.io/';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch the target website. We use 'no-store' to ensure we get a fresh
    // snapshot every time the "Refresh Site Snapshot" button is clicked.
    const response = await fetch(TARGET_URL, {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch website: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const $ = cheerio.load(html);

    // Remove unnecessary elements that don't contain meaningful conversational text
    $('script, style, noscript, iframe, img, svg, head').remove();

    // Extract text from the body and clean up the whitespace
    const extractedText = $('body').text().replace(/\s+/g, ' ').trim();

    return NextResponse.json({
      success: true,
      data: extractedText,
      source: TARGET_URL,
      timestamp: new Date().toISOString(),
    });
  } catch (error: unknown) {
    console.error('Error scraping website:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { success: false, error: errorMessage || 'Failed to scrape website content' },
      { status: 500 }
    );
  }
}