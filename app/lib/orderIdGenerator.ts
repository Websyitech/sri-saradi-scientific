import crypto from "crypto";

/** Order reference like SSS-261111-7K3QD (date + random), no database needed. */
export async function generateOrderId(): Promise<string> {
  const d = new Date();
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const rand = crypto.randomBytes(4).readUInt32BE(0).toString(36).toUpperCase().padStart(5, "0").slice(-5);
  return `SSS-${date}-${rand}`;
}
