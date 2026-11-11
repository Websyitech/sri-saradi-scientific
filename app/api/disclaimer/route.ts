import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    id: null,
    title: "Data & Privacy Notice",
    content: "We respect your privacy. By using our website, you agree to our terms and privacy policy.",
    isActive: true,
    acceptButtonText: "I Accept",
    declineButtonText: "Decline",
  });
}
