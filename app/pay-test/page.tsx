import type { Metadata } from "next";
import PayTestClient from "./PayTestClient";

export const metadata: Metadata = { title: "Payment test", robots: { index: false, follow: false } };

export default function PayTestPage() {
  return <PayTestClient />;
}
