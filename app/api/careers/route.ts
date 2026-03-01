import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";

export async function GET() {
  try {
    const jobs = await prisma.jobOpening.findMany({
      where: { isActive: true },
      orderBy: { postedAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("Error fetching job openings:", error);
    return NextResponse.json([], { status: 500 });
  }
}
