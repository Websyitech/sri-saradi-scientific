import prisma from "@/app/lib/prisma";
import FaqClient, { type FAQ } from "./FaqClient";

export default async function FAQPage() {
  const faqs = await prisma.fAQ
    .findMany({ where: { isActive: true }, orderBy: { sortOrder: "asc" } })
    .then((rows) => JSON.parse(JSON.stringify(rows)) as FAQ[])
    .catch(() => null);
  return <FaqClient initial={faqs} />;
}
