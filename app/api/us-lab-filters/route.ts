import { NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { sendEmail } from "@/app/lib/email";
import { FilterInquiryError, parseFilterInquiry } from "@/app/lib/usLabFilters";

export async function POST(request: Request) {
  try {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host") || new URL(request.url).host;
    if (origin && (!URL.canParse(origin) || new URL(origin).host !== host ||
        !["http:", "https:"].includes(new URL(origin).protocol))) {
      throw new FilterInquiryError("Submit this request through the quote page.", 403);
    }
    if (request.headers.get("content-type")?.split(";")[0].trim() !== "application/x-www-form-urlencoded") {
      throw new FilterInquiryError("Use the quote request form.", 415);
    }
    const reader = request.body?.getReader();
    if (!reader) throw new FilterInquiryError("Complete the quote request form.");
    const chunks: Uint8Array[] = [];
    let length = 0;
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 32768) {
        await reader.cancel();
        throw new FilterInquiryError("Shorten your request and try again.", 413);
      }
      chunks.push(value);
    }
    const lead = parseFilterInquiry(new URLSearchParams(Buffer.concat(chunks).toString("utf8")));
    const isNew = await prisma.$transaction(async tx => {
      // Serialize each sender's submissions so retries and the hourly limit stay atomic.
      await tx.$executeRaw`SELECT pg_advisory_xact_lock(hashtext(${lead.email}))`;
      const existing = await tx.quoteRequest.findUnique({ where: { orderId: lead.orderId } });
      if (existing) {
        if (existing.email !== lead.email || existing.name !== lead.name ||
            existing.company !== lead.company || existing.notes !== lead.notes) {
          throw new FilterInquiryError("This reference was already used. Refresh for a new inquiry.", 409);
        }
        return false;
      }
      // shortcut: limits are per email; add edge IP throttling if automated spam appears.
      const recent = await tx.quoteRequest.count({
        where: { email: lead.email, orderId: { startsWith: "US-" }, createdAt: { gte: new Date(Date.now() - 3600000) } },
      });
      if (recent >= 20) {
        throw new FilterInquiryError("Too many inquiries. Please email info@srisaradiscientific.com or try again later.", 429);
      }
      const { items, ...data } = lead;
      await tx.quoteRequest.create({ data: { ...data, items: { create: items } } });
      return true;
    });

    if (isNew) {
      // Plain text keeps buyer-supplied content out of HTML email templates.
      try {
        await sendEmail({
          to: process.env.SMTP_FROM_EMAIL || "info@srisaradiscientific.com",
          subject: `New US filter inquiry ${lead.orderId}`,
          text: `Reference: ${lead.orderId}\nName: ${lead.name}\nEmail: ${lead.email}\nCompany: ${lead.company}\n\n${lead.notes}\n\nView this inquiry in Admin > Quotes.`,
        });
      } catch {
        console.error("US filter inquiry saved; sales notification unavailable.");
      }
    }
    return NextResponse.json({ ok: true, reference: lead.orderId }, {
      status: isNew ? 201 : 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (error) {
    if (error instanceof FilterInquiryError) {
      return NextResponse.json({ ok: false, error: error.message }, {
        status: error.status,
        headers: { "Cache-Control": "no-store", ...(error.status === 429 ? { "Retry-After": "3600" } : {}) },
      });
    }
    if (error && typeof error === "object" && "code" in error && error.code === "P2002") {
      return NextResponse.json({ ok: false, error: "This reference was already used. Refresh for a new inquiry." }, {
        status: 409,
        headers: { "Cache-Control": "no-store" },
      });
    }
    console.error("US filter inquiry could not be saved.");
    return NextResponse.json({ ok: false, error: "Your request could not be saved. Please retry or email info@srisaradiscientific.com." }, {
      status: 503,
      headers: { "Cache-Control": "no-store" },
    });
  }
}
