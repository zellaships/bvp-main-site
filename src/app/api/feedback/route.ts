import { NextRequest, NextResponse } from "next/server";

// Google Sheets Web App URL - you'll set this up
const GOOGLE_SHEETS_URL = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    // If Google Sheets URL is configured, send there
    if (GOOGLE_SHEETS_URL) {
      await fetch(GOOGLE_SHEETS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
    }

    return NextResponse.json({ success: true, id: data.id });
  } catch (error) {
    console.error("Feedback API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to save feedback" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Feedback API - POST to submit feedback",
    setup: "Set GOOGLE_SHEETS_WEBHOOK_URL env var to enable Google Sheets logging"
  });
}
