import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: "demo@example.com" },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Demo user already exists", user: existingUser },
        { status: 200 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("demo123456", 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        email: "demo@example.com",
        password: hashedPassword,
        name: "Demo User",
        company: "Demo Company",
        phone: "+91 9876543210",
        country: "India",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Demo user created successfully!",
        credentials: {
          email: "demo@example.com",
          password: "demo123456",
          name: user.name,
          company: user.company,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating demo user:", error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: "Failed to create demo user", details: errorMessage },
      { status: 500 }
    );
  }
}
