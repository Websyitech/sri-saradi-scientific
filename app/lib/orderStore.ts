import fs from "fs/promises";
import path from "path";

// Online orders are kept as small JSON files (no database). One file per order id.
const DIR = process.env.ORDER_STORE_DIR || path.join(process.cwd(), ".data", "orders");

export type StoredOrder = {
  orderId: string;
  status: "payment_pending" | "paid";
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes: string;
  sku: string;
  productName: string;
  quantity: number;
  amount: string;
  paymentSessionId?: string;
  paymentId?: string;
  createdAt: string;
  paidAt?: string;
};

const fileFor = (orderId: string) => {
  if (!/^[A-Za-z0-9-]{1,40}$/.test(orderId)) throw new Error("Bad order id");
  return path.join(DIR, `${orderId}.json`);
};

export async function saveOrder(order: StoredOrder): Promise<void> {
  await fs.mkdir(DIR, { recursive: true });
  const file = fileFor(order.orderId);
  await fs.writeFile(`${file}.tmp`, JSON.stringify(order, null, 2));
  await fs.rename(`${file}.tmp`, file);
}

export async function loadOrder(orderId: string): Promise<StoredOrder | null> {
  try {
    return JSON.parse(await fs.readFile(fileFor(orderId), "utf8"));
  } catch {
    return null;
  }
}

/** Atomically claims the right to mark an order paid; only the first caller gets true. */
export async function claimPaid(orderId: string): Promise<boolean> {
  await fs.mkdir(DIR, { recursive: true });
  try {
    const fh = await fs.open(`${fileFor(orderId)}.paid`, "wx");
    await fh.close();
    return true;
  } catch {
    return false;
  }
}
