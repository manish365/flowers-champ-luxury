import { NextResponse } from "next/server";

// Instagram embed is used instead of the Graph API.
// This route is kept as a placeholder in case a token is added later.
export async function GET() {
  return NextResponse.json({ message: "Use the Instagram embed instead." });
}
