import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    // Get user by ID (token is the user ID)
    const user = await prisma.user.findUnique({
      where: { id: token },
      select: {
        id: true,
        email: true,
        name: true,
        company: true,
        phone: true,
        country: true,
      },
    });

    if (!user) {
      return NextResponse.json({ authenticated: false }, { status: 200 });
    }

    return NextResponse.json({
      authenticated: true,
      user,
    });
  } catch (error) {
    console.error("Auth verify error:", error);
    return NextResponse.json(
      { authenticated: false },
      { status: 200 }
    );
  }
}
