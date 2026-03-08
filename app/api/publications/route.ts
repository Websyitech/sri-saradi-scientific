import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get("page") || "1";

    const response = await fetch(
      `https://en.solarbio.com/web/lists/single/paper?page=${page}`,
      {
        method: "GET",
        headers: {
          "access-control-allow-credentials": "true",
          "access-control-allow-headers":
            "Content-Type, Authorization, X-Requested-With,x-ecapi-useragent,x-ecapi-authorization,x-ecapi-ver,x-ecapi-sign",
          "access-control-allow-origin": "https://en.solarbio.com",
          authorization:
            '{"real_ip":"49.43.234.24","ECS_ID":"785700771dd3e88e5cd41c8c57fc3cbef0cf1077","ECS":[]}',
          "X-Requested-With": "XMLHttpRequest",
          "User-Agent": "Mozilla/5.0",
          Origin: "https://en.solarbio.com",
          Referer: "https://en.solarbio.com/",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch publications from external API" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching publications:", error);
    return NextResponse.json(
      { error: "Failed to fetch publications" },
      { status: 500 }
    );
  }
}
