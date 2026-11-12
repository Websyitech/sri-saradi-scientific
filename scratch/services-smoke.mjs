// Run with Playwright available on NODE_PATH and the dev server on port 3000.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");

(async () => {
  const browser = await chromium.launch({ channel: "msedge", headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
    await page.addInitScript(() => localStorage.setItem("disclaimerAccepted", "true"));
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    const response = await page.goto("http://localhost:3000/services");
    assert.equal(response.status(), 200);
    assert.match(await page.title(), /Custom Biologics & Discovery Services/);
    assert.equal(await page.locator("main h1").count(), 1);
    assert.equal(await page.locator("#service-scope article").count(), 4);

    const scope = page.locator("#service-scope article details").first();
    await scope.locator("summary").click();
    assert.equal(await scope.getAttribute("open"), "");
    await scope.locator("summary").click();
    assert.equal(await scope.getAttribute("open"), null);

    const serviceTypes = [
      "Peptide synthesis",
      "Oligonucleotides / primers",
      "Labeling / conjugation",
      "Protein / antibody expression",
    ];
    for (const [index, serviceType] of serviceTypes.entries()) {
      const trigger = page.locator("#service-scope article button").nth(index);
      await trigger.click();
      const dialog = page.getByRole("dialog");
      await dialog.waitFor({ state: "visible" });
      assert.equal(await dialog.locator('select[name="kind"]').inputValue(), "service");
      await dialog.getByLabel("Service type", { exact: false }).selectOption(serviceType);
      assert.equal(await dialog.getByLabel("Service type", { exact: false }).inputValue(), serviceType);
      await page.keyboard.press("Escape");
      await dialog.waitFor({ state: "detached" });
    }

    await page.getByRole("button", { name: "Discuss an analysis brief" }).click();
    assert.equal(await page.locator('select[name="kind"]').inputValue(), "service");
    await page.getByLabel("Service type", { exact: false }).selectOption("Bioinformatics");
    await page.getByLabel("Name", { exact: false }).first().fill("Services smoke check");
    await page.getByRole("button", { name: "Close enquiry" }).click();
    await page.getByRole("button", { name: "Discuss a discovery brief" }).click();
    assert.equal(await page.locator('select[name="kind"]').inputValue(), "discovery");
    await page.keyboard.press("Escape");
    await page.getByRole("button", { name: "Discuss a project", exact: false }).click();
    assert.equal(await page.locator('select[name="kind"]').inputValue(), "service");
    assert.equal(await page.getByLabel("Service type", { exact: false }).inputValue(), "Bioinformatics");
    assert.equal(await page.getByLabel("Name", { exact: false }).first().inputValue(), "Services smoke check");
    assert.equal(await page.locator("#enquiry-form").evaluate((form) => form.checkValidity()), false);
    await page.keyboard.press("Escape");

    await page.getByRole("link", { name: "Explore our services" }).click();
    await page.waitForURL("**/services#service-scope");
    const pdf = await page.request.get("http://localhost:3000/assets/services-catalogue.pdf");
    assert.equal(pdf.status(), 200);
    assert.match(pdf.headers()["content-type"], /application\/pdf/);

    for (const width of [1440, 1024, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 900 });
      assert.equal(await page.locator("main").evaluate((main) => main.scrollWidth <= main.clientWidth), true, `Page overflow at ${width}px`);
      await page.getByRole("button", { name: "Discuss a project", exact: false }).click();
      const dialog = page.getByRole("dialog");
      assert.equal(await dialog.evaluate((element) => element.scrollWidth <= element.clientWidth), true, `Dialog overflow at ${width}px`);
      await page.keyboard.press("Escape");
    }

    // The homepage uses the same modal; exercise it after client navigation too.
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.getByRole("link", { name: "Sri Saradi Scientific" }).first().click();
    await page.waitForURL("http://localhost:3000/");
    const homeTrigger = page.locator(".homepage-redesign button").filter({ hasText: "Discuss" }).first();
    await homeTrigger.click();
    await page.getByRole("dialog").waitFor({ state: "visible" });
    await page.keyboard.press("Escape");
    await page.getByRole("dialog").waitFor({ state: "hidden" });
    assert.deepEqual(errors, []);
    console.log("Services smoke check passed: content, scopes, enquiry categories, retained form values, closing, PDF, responsive layouts and unchanged homepage modal.");
  } finally {
    await browser.close();
  }
})().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
