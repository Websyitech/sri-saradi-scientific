// Run: node --experimental-strip-types scripts/test-us-lab-filters.mjs
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import vm from "node:vm";
import ts from "typescript";
import * as jsxRuntime from "react/jsx-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { parseFilterInquiry, FilterInquiryError } from "../app/lib/usLabFilters.ts";

const base = {
  id: "6c166b59-94c6-486a-b3b2-d1879eeb14fc",
  name: "Test Buyer",
  email: "BUYER@example.com",
  company: "Test Lab",
  consent: "yes",
  family: "syringe",
  sku: "INY1322N",
  packs: "10",
  zip: "02139",
  buyingCycle: "Evaluation",
  utm_campaign: "us-filters",
};
const parse = overrides => parseFilterInquiry(new URLSearchParams({ ...base, ...overrides }));
const rejects = overrides => assert.throws(() => parse(overrides), FilterInquiryError);

const quote = parse({});
assert.equal(quote.orderId, `US-${base.id.toUpperCase()}`);
assert.equal(quote.email, "buyer@example.com");
assert.equal(quote.items[0].quantity, 10);
assert.equal(JSON.parse(quote.notes).zip, "02139");
assert.equal(JSON.parse(quote.notes).attribution.utm_campaign, "us-filters");
assert.equal(JSON.parse(quote.notes).quantityUnit, "packs");
assert.deepEqual(parse({}), quote, "Retries must produce the same stored payload");
assert.equal(JSON.parse(parse({ family: "process", sku: "", packs: "1" }).notes).quantityUnit, "units");
assert.equal(parse({ sku: "", packs: "1000000", zip: "02139-1234" }).items[0].quantity, 1000000);
assert.equal(JSON.parse(parse({ intent: "oem", callTime: "2026-12-01T10:30", timeZone: "US Eastern", notes: "Custom labels" }).notes).callTime, "2026-12-01T10:30");
assert.deepEqual(parse({ intent: "oem", callTime: "2026-12-01T10:30", timeZone: "US Eastern", notes: "Custom labels" }).items, []);
for (const overrides of [
  { name: "" }, { company: "" }, { email: "invalid" }, { email: "x@example.com\nBcc:other@example.com" },
  { consent: "" }, { consent: "no" }, { website: "spam" }, { id: "../invalid" },
  { family: "constructor" }, { sku: "INVALID" }, { family: "sterile" },
  { packs: "0" }, { packs: "-1" }, { packs: "1.5" }, { packs: "1e3" }, { packs: "1000001" },
  { zip: "1234" }, { zip: "ABCDE" }, { buyingCycle: "invalid" }, { intent: "invalid" },
  { notes: "x".repeat(1801) }, { utm_source: "x".repeat(251) }, { name: "bad\0name" },
  { intent: "oem", callTime: "2026-02-30T10:30", timeZone: "US Eastern", notes: "Project" },
  { intent: "oem", callTime: "2026-12-01T25:00", timeZone: "US Eastern", notes: "Project" },
  { intent: "oem", callTime: "2026-12-01T10:30", timeZone: "", notes: "Project" },
]) rejects(overrides);
const duplicate = new URLSearchParams(base);
duplicate.append("email", "other@example.com");
assert.throws(() => parseFilterInquiry(duplicate), FilterInquiryError);

const skus = JSON.parse(await readFile(new URL("../public/us-lab-filters/skus.json", import.meta.url), "utf8"));
assert.equal(skus.length, 71);
assert.equal(new Set(skus.map(row => row.id)).size, 71);
for (const row of skus) {
  assert.equal(parse({ family: row.family, sku: row.id }).items[0].sku, row.id);
}
console.log("US filter inquiry validation and all 71 SKUs passed.");

const pageSource = await readFile(new URL("../app/us-lab-filters/page.tsx", import.meta.url), "utf8");
assert.ok(!/dangerouslySetInnerHTML|node:fs|index\.html/.test(pageSource), "Render JSX directly without loading HTML");
const pageCompiled = ts.transpileModule(pageSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
}).outputText;
const page = {};
vm.runInNewContext(pageCompiled, {
  exports: page, process,
  require: id => {
    if (id === "react/jsx-runtime") return jsxRuntime;
    if (id === "../../public/us-lab-filters/skus.json") return skus;
    if (id === "./FilterInteractions") return { __esModule: true, default: () => null };
    if (id === "./filters.css") return {};
    throw new Error(`Unexpected page import: ${id}`);
  },
});
const rendered = renderToStaticMarkup(await page.default());
for (const row of skus) {
  assert.ok(rendered.includes(`<th scope="row">${row.id}</th><td>${row.description}</td><td>${row.pack}</td>`), `Missing catalog data for ${row.id}`);
  assert.ok(rendered.includes(`data-pick="${row.id}" data-group="${row.family}"`), `Missing catalog interaction for ${row.id}`);
}
assert.ok(rendered.startsWith('<main id="main" class="us-lab-filters">'));
assert.ok(!/<(?:html|head|header|footer|script)[\s>]/.test(rendered), "Use the shared layout, not standalone page chrome");
assert.ok(!rendered.includes("quote.php"));
assert.equal((rendered.match(/data-pick="/g) || []).length, 71);
assert.equal((rendered.match(/data-endpoint="\/api\/us-lab-filters"/g) || []).length, 2);
assert.equal((rendered.match(/action="\/api\/us-lab-filters"/g) || []).length, 2);
assert.equal((rendered.match(/<input\b(?=[^>]*\bname="consent")(?=[^>]*\brequired="")[^>]*>/g) || []).length, 2);
assert.ok(rendered.includes('name="intent" value="oem"'));
for (const id of ["rfq", "oem-form", "submit-quote", "submit-oem", "form-status", "oem-status", "catalog", "catalog-search", "quote-sku", "quote-notes", "quantity-label"]) {
  assert.ok(rendered.includes(`id="${id}"`), `Missing form or script hook ${id}`);
}
assert.equal(page.metadata.alternates.canonical, "/us-lab-filters");
for (const [, asset] of rendered.matchAll(/(?:src|href)="(\/us-lab-filters\/media\/[^"]+)"/g)) {
  await readFile(new URL(`../public${asset}`, import.meta.url));
}
const css = await readFile(new URL("../app/us-lab-filters/filters.css", import.meta.url), "utf8");
for (const [, selector] of css.replace(/\/\*[\s\S]*?\*\//g, "").matchAll(/([^{}]+)\{/g)) {
  if (!selector.trim().startsWith("@media")) {
    assert.ok(selector.trim().startsWith(".us-lab-filters"), `Unscoped filter styling: ${selector}`);
  }
}
console.log("Shared-layout markup, metadata, form endpoints, PDF paths, and scoped styles passed.");

// Exercise the HTTP handler without writing to the real database or sending mail.
const saved = new Map();
const alerts = [];
let recent = 0;
let databaseDown = false;
const tx = {
  $executeRaw: async () => 0,
  quoteRequest: {
    findUnique: async ({ where }) => saved.get(where.orderId) || null,
    count: async () => recent,
    create: async ({ data }) => {
      if (databaseDown) throw new Error("Database unavailable");
      saved.set(data.orderId, data);
      return data;
    },
  },
};
const apiSource = await readFile(new URL("../app/api/us-lab-filters/route.ts", import.meta.url), "utf8");
const compiled = ts.transpileModule(apiSource, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const api = {};
vm.runInNewContext(compiled, {
  exports: api, Buffer, URL, URLSearchParams, Date, process: { env: {} },
  console: { error() {} },
  require: id => {
    if (id === "next/server") return { NextResponse: { json: (data, options) => Response.json(data, options) } };
    if (id === "@/app/lib/prisma") return { default: { $transaction: callback => callback(tx) } };
    if (id === "@/app/lib/email") return { sendEmail: async data => { alerts.push(data); return true; } };
    if (id === "@/app/lib/usLabFilters") return { parseFilterInquiry, FilterInquiryError };
    throw new Error(`Unexpected import: ${id}`);
  },
});
function submit(overrides = {}, headers = {}, body) {
  return api.POST(new Request("https://example.com/api/us-lab-filters", {
    method: "POST",
    headers: { origin: "https://example.com", "content-type": "application/x-www-form-urlencoded", ...headers },
    body: body ?? new URLSearchParams({ ...base, ...overrides }),
  }));
}
const accepted = await submit();
assert.equal(accepted.status, 201);
assert.equal((await accepted.json()).reference, quote.orderId);
assert.equal(saved.size, 1);
assert.equal(saved.get(quote.orderId).items.create[0].sku, "INY1322N");
assert.equal(alerts.length, 1);
assert.ok(alerts[0].text.includes("02139"));
assert.equal(alerts[0].html, undefined);
assert.equal((await submit()).status, 200);
assert.equal(saved.size, 1);
assert.equal(alerts.length, 1, "Retries must not notify twice");
assert.equal((await submit({ notes: "Different payload" })).status, 409);
assert.equal((await submit({}, { origin: "https://attacker.example" })).status, 403);
assert.equal((await submit({}, { origin: "invalid" })).status, 403);
assert.equal((await submit({}, { "content-type": "application/json" }, "{}")).status, 415);
assert.equal((await submit({}, {}, "x".repeat(32769))).status, 413);
assert.equal((await submit({ consent: "no" })).status, 422);
const newId = "6c166b59-94c6-486a-b3b2-d1879eeb14fd";
recent = 20;
assert.equal((await submit({ id: newId })).status, 429);
recent = 0;
databaseDown = true;
assert.equal((await submit({ id: newId })).status, 503);
assert.equal(saved.size, 1, "Failed storage must not report success");
databaseDown = false;
assert.equal((await submit({ id: newId, intent: "oem", callTime: "2026-12-01T10:30", timeZone: "US Eastern", notes: "Project" })).status, 201);
assert.equal(saved.size, 2);
assert.equal(alerts.length, 2);
assert.equal(JSON.parse(saved.get(`US-${newId.toUpperCase()}`).notes).intent, "OEM call");
console.log("HTTP validation, persistence, retries, conflicts, throttling, OEM, and storage-failure checks passed (mock database/mail).");
