import skus from "../../public/us-lab-filters/skus.json" with { type: "json" };

export class FilterInquiryError extends Error {
  status: number;

  constructor(message: string, status = 422) {
    super(message);
    this.status = status;
  }
}

const families = {
  syringe: "Nonsterile syringe filters",
  sterile: "Sterile syringe filters",
  disc: "Plain membrane discs",
  grid: "Gridded membranes",
  capflux: "CapFlux capsules",
  steriflux: "SteriFlux cartridges",
  supflux: "SupFlux high-flow cartridges",
  aquaflux: "AquaFlux sediment filters",
  steelflux: "SteelFlux housings",
  vent: "Laboratory venting filters",
  glass: "Glass fiber membranes",
  otherlab: "Other laboratory catalog item",
  process: "Industrial filters",
};
const industrial = ["capflux", "steriflux", "supflux", "aquaflux", "steelflux", "process"];
const campaigns = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "gbraid", "wbraid"];

export function parseFilterInquiry(body: URLSearchParams) {
  function field(key: string, limit: number, required = false) {
    const value = body.get(key) || "";
    if (body.getAll(key).length > 1 || value.length > limit || /[\0\uFFFD]/.test(value)) {
      throw new FilterInquiryError(`Check the ${key} field and try again.`);
    }
    if (required && !value.trim()) throw new FilterInquiryError(`Complete the ${key} field.`);
    return value.trim();
  }

  if (field("website", 500)) throw new FilterInquiryError("Unable to accept this submission.");
  const id = field("id", 36, true).toLowerCase();
  if (!/^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(id)) {
    throw new FilterInquiryError("Refresh the form and try again.");
  }
  const name = field("name", 100, true);
  const email = field("email", 254, true).toLowerCase();
  const company = field("company", 150, true);
  if (!/^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/.test(email)) {
    throw new FilterInquiryError("Enter a valid email address.");
  }
  if (field("consent", 8, true) !== "yes") {
    throw new FilterInquiryError("Please confirm permission to respond to your inquiry.");
  }
  const intent = field("intent", 12);
  if (intent && intent !== "oem") throw new FilterInquiryError("Select a valid inquiry type.");
  const isOem = intent === "oem";
  const notes = field("notes", 1800, isOem);
  const attribution = Object.fromEntries(campaigns.map(key => [key, field(key, 250)]));
  const details = { source: "/us-lab-filters/", intent: isOem ? "OEM call" : "Filter quote", consent: "yes", notes, attribution };
  let inquiry;
  let items: { sku?: string; name: string; quantity: number }[] = [];

  if (isOem) {
    const callTime = field("callTime", 16, true);
    const timeZone = field("timeZone", 80, true);
    const date = new Date(`${callTime}:00.000Z`);
    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(callTime) ||
        !Number.isFinite(date.getTime()) || date.toISOString() !== `${callTime}:00.000Z`) {
      throw new FilterInquiryError("Enter a valid preferred date and time.");
    }
    inquiry = { ...details, callTime, timeZone };
  } else {
    const family = field("family", 20, true);
    if (!Object.hasOwn(families, family)) throw new FilterInquiryError("Select a product family.");
    const sku = field("sku", 60);
    const product = skus.find(row => row.id === sku && row.family === family);
    if (sku && !product) throw new FilterInquiryError("Select a catalog number from the chosen family or leave it open.");
    const packs = field("packs", 7, true);
    if (!/^[1-9]\d{0,6}$/.test(packs) || Number(packs) > 1000000) {
      throw new FilterInquiryError("Enter a quantity between 1 and 1000000.");
    }
    const zip = field("zip", 10, true);
    if (!/^\d{5}(-\d{4})?$/.test(zip)) throw new FilterInquiryError("Enter a US ZIP code.");
    const buyingCycle = field("buyingCycle", 40, true);
    if (!["Recurring supply", "Evaluation", "One-time order", "Distributor purchase"].includes(buyingCycle)) {
      throw new FilterInquiryError("Select a purchase type.");
    }
    const quantityUnit = industrial.includes(family) ? "units" : "packs";
    inquiry = { ...details, family, sku, quantity: Number(packs), quantityUnit, zip, buyingCycle };
    items = [{ sku: sku || undefined, name: `${product?.description || families[family as keyof typeof families]} (${quantityUnit})`, quantity: Number(packs) }];
  }

  return { orderId: `US-${id.toUpperCase()}`, name, email, company, notes: JSON.stringify(inquiry, null, 2), items };
}
