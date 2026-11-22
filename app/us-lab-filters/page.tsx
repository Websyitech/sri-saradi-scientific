import type { Metadata } from "next";
import skus from "../../public/us-lab-filters/skus.json";
import FilterInteractions from "./FilterInteractions";
import "./filters.css";

// Material, diameter and pore size read from each SKU's description, for the finder's filters.
const specOf = (description: string) => ({
  material: description.match(/\b(Nylon|PES|PTFE|PVDF|CA|MCE)\b/)?.[1] ?? "",
  diameter: description.match(/(\d+)\s*mm/)?.[1] ?? "",
  pore: description.match(/(0\.\d+)\s*µm/)?.[1] ?? "",
});
const countBy = (key: "material" | "diameter" | "pore") => {
  const counts = new Map<string, number>();
  for (const sku of skus) {
    const value = specOf(sku.description)[key];
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => (key === "material" ? a[0].localeCompare(b[0]) : Number(a[0]) - Number(b[0])));
};
const SPEC_FILTERS = [
  { key: "material" as const, title: "Membrane material", unit: "" },
  { key: "diameter" as const, title: "Diameter", unit: " mm" },
  { key: "pore" as const, title: "Pore size", unit: " µm" },
];

const title = "Orient Filtr Lab & Industrial Filters | Sri Saradi Scientific";
const description = "Explore lab and process filters, review lot documents, request US pricing, or arrange an OEM call. Six-day delivery for confirmed in-stock items.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/us-lab-filters" },
  openGraph: { title, description, url: "/us-lab-filters", type: "website" },
  twitter: { card: "summary_large_image", title, description },
};

export default function UsLabFiltersPage() {
  return (
    <>
      <main id="main" className="us-lab-filters">
        <section className="hero">
          <div className="shell hero-layout">
            <div className="hero-copy">
              <div className="kicker"><i></i> Orient Filtr · US business supply</div>
              <h1 id="hero-title">Lab &amp; industrial <em>filters.</em></h1>
              <p id="hero-copy">Syringe filters and membranes for the lab. Capsules, cartridges, and housings for the plant. Made in China by Orient Filtr and supplied by Sri Saradi Scientific, its authorized US sales partner in India.</p>
              <p className="delivery-promise"><strong>US delivery within 6 days</strong> for confirmed in-stock items.</p>
              <div className="hero-actions">
                <a className="button" href="#products">Lab filters</a>
                <a className="button outline" href="#industrial">Industrial filters</a>
                <a className="under" href="#oem" data-open-oem="">Request an OEM call</a>
              </div>
            </div>
            <figure className="product-shot">
              <span className="photo-slot hero-slot" data-photo-slot="hero" aria-hidden="true">
                <span className="frame-mark"></span>
              </span>
              <figcaption>
                <span>
                  <span className="micro">Orient Filtr</span>
                  <strong>Laboratory &amp; process filtration</strong>
                </span>
                <a className="under" href="#quote">Get US pricing</a>
              </figcaption>
            </figure>
          </div>
        </section>
        <div className="factband">
          <div className="shell facts">
            <div>
              <small>Supplier verification</small>
              <a href="#trust"><b>US sales authorization</b></a>
            </div>
            <div>
              <small>Quality evidence</small>
              <a href="#quality"><b>View sample lot certificates</b></a>
            </div>
            <div>
              <small>Tracked international shipping</small>
              <a href="#delivery"><b>DHL &amp; UPS · quoted by ZIP</b></a>
            </div>
          </div>
        </div>
        <section className="shell range-block" id="range">
          <div className="kicker"><i></i> Product catalogs</div>
          <h2>Choose your application.</h2>
          <div className="range-columns">
            <article id="lab-catalog" className="range-tile">
              <span className="photo-slot range-slot" data-photo-slot="lab-range" aria-hidden="true">
                <span className="frame-mark"></span>
              </span>
              <div className="range-content">
                <h3>Laboratory filtration</h3>
                <p>HPLC sample prep, vessel venting, membrane testing, and particulate collection.</p>
                <div className="range-links">
                  <a className="under" href="/us-lab-filters/media/laboratory-catalog-2026.pdf" target="_blank" rel="noopener">Lab catalog (PDF)</a>
                  <a className="under" href="#products">Browse 71 lab SKUs</a>
                </div>
                <details>
                  <summary>See all lab families</summary>
                  <p>Syringe filters, sterile syringe filters, plain and gridded discs, venting filters, and glass fiber membranes. The full catalog also includes RC and glass fiber syringe filter options.</p>
                  <div className="range-line">
                    <div>
                      <strong>Laboratory venting filters</strong>
                      <span>Vessel venting and air or gas filtration.</span>
                    </div>
                    <a className="under" href="#quote" data-range="vent" aria-label="Request pricing for Laboratory venting filters">Quote</a>
                  </div>
                  <div className="range-line">
                    <div>
                      <strong>Glass fiber membranes</strong>
                      <span>Particulate collection for environmental analysis.</span>
                    </div>
                    <a className="under" href="#quote" data-range="glass" aria-label="Request pricing for Glass fiber membranes">Quote</a>
                  </div>
                  <div className="range-line">
                    <div>
                      <strong>Other laboratory catalog item</strong>
                      <span>Other catalog configurations and materials.</span>
                    </div>
                    <a className="under" href="#quote" data-range="otherlab" aria-label="Request pricing for Other laboratory catalog item">Quote</a>
                  </div>
                </details>
              </div>
            </article>
            <article id="industrial" className="range-tile">
              <span className="photo-slot range-slot" data-photo-slot="industrial-range" aria-hidden="true">
                <span className="frame-mark"></span>
              </span>
              <div className="range-content">
                <h3>Industrial &amp; process filtration</h3>
                <p>Capsule, pleated, high-flow, and sediment filters, plus housings for liquid and gas service.</p>
                <div className="range-links">
                  <a className="under" href="/us-lab-filters/media/process-catalog-2026.pdf" target="_blank" rel="noopener">Process catalog (PDF)</a>
                  <a className="under" href="#quote" data-range="process">Request sizing &amp; pricing</a>
                </div>
                <details id="process-range">
                  <summary>See all 5 industrial families</summary>
                  <div className="range-line">
                    <div>
                      <strong>CapFlux™ capsules</strong>
                      <span>Single-use capsules in PP, PES, PTFE, PVDF, or nylon 66.</span>
                    </div>
                    <a className="under" href="#quote" data-range="capflux" aria-label="Request pricing for CapFlux™ capsules">Quote</a>
                  </div>
                  <div className="range-line">
                    <div>
                      <strong>SteriFlux™ cartridges</strong>
                      <span>Pleated and mini cartridges, lenticular filters, and stainless steel elements.</span>
                    </div>
                    <a className="under" href="#quote" data-range="steriflux" aria-label="Request pricing for SteriFlux™ cartridges">Quote</a>
                  </div>
                  <div className="range-line">
                    <div>
                      <strong>SupFlux™ high-flow cartridges</strong>
                      <span>P, M, K, A, B, and E series for high-flow systems.</span>
                    </div>
                    <a className="under" href="#quote" data-range="supflux" aria-label="Request pricing for SupFlux™ high-flow cartridges">Quote</a>
                  </div>
                  <div className="range-line">
                    <div>
                      <strong>AquaFlux™ sediment filters</strong>
                      <span>Melt-blown, string-wound, bag, carbon, and specialty media.</span>
                    </div>
                    <a className="under" href="#quote" data-range="aquaflux" aria-label="Request pricing for AquaFlux™ sediment filters">Quote</a>
                  </div>
                  <div className="range-line">
                    <div>
                      <strong>SteelFlux™ housings</strong>
                      <span>Sanitary liquid and gas, high-flow, bag, and membrane housings.</span>
                    </div>
                    <a className="under" href="#quote" data-range="steelflux" aria-label="Request pricing for SteelFlux™ housings">Quote</a>
                  </div>
                </details>
              </div>
            </article>
          </div>
        </section>
        <section id="products" className="shell block">
          <div className="section-title">
            <div>
              <div className="kicker"><i></i> Filter selection</div>
              <h2>Laboratory filter finder.</h2>
            </div>
            <p>Choose a membrane and format or search all 71 listed SKUs. A W prefix identifies a welded syringe filter.</p>
          </div>
          <div className="finder-layout">
          <div className="family-filters" role="group" aria-labelledby="family-filter-heading">
            <h3 id="family-filter-heading" className="filter-heading">Product family</h3>
            {[
              { key: "syringe", name: "Nonsterile syringe", info: "13 or 25 mm · 100/pack" },
              { key: "sterile", name: "Sterile syringe", info: "13, 25 or 30 mm · 100/pack" },
              { key: "disc", name: "Plain membrane discs", info: "47 or 142 mm · 50 or 200/pack" },
              { key: "grid", name: "Gridded membranes", info: "47 mm · sterile MCE · 100/pack" },
            ].map((f) => (
              <label key={f.key} className="family-check">
                <input type="checkbox" value={f.key} data-filter-group="family" />
                <span>
                  <strong>{f.name}</strong>
                  <small>{f.info} · {skus.filter((s) => s.family === f.key).length} items</small>
                </span>
              </label>
            ))}
            {SPEC_FILTERS.map((group) => (
              <div key={group.key} className="filter-group">
                <h3 className="filter-heading">{group.title}</h3>
                {countBy(group.key).map(([value, count]) => (
                  <label key={value} className="family-check spec-check">
                    <input type="checkbox" value={value} data-filter-group={group.key} />
                    <span>{value}{group.unit} <small>({count})</small></span>
                  </label>
                ))}
              </div>
            ))}
            <button type="button" className="under clear-filters" id="clear-filters">Clear filters</button>
          </div>
          <div className="catalog-panel" id="all-products">
            <label htmlFor="catalog-search">Search by catalog number, material, diameter, or pore size</label>
            <input id="catalog-search" type="search" placeholder="e.g. 25 mm nylon or 0.45" />
            <p id="catalog-count" role="status">{skus.length} catalog numbers</p>
            <div className="catalog-scroll" role="region" tabIndex={0} aria-label="Filter catalog">
              <table>
                <thead>
                  <tr>
                    <th>Catalog number</th>
                    <th>Product specification</th>
                    <th>Units per pack</th>
                    <th>Inquiry</th>
                  </tr>
                </thead>
                <tbody>
                  {skus.map((sku) => (
                    <tr key={sku.id} data-family={sku.family} data-material={specOf(sku.description).material} data-diameter={specOf(sku.description).diameter} data-pore={specOf(sku.description).pore}>
                      <th scope="row">{sku.id}</th>
                      <td>{sku.description}</td>
                      <td>{sku.pack}</td>
                      <td>
                        <a className="pick-sku" href="#quote" data-pick={sku.id} data-group={sku.family} aria-label={`Request a quote for ${sku.id}`}>Quote</a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          </div>
        </section>
        <section id="trust" className="trust">
          <div className="shell">
            <div className="kicker"><i></i> Your supply partner</div>
            <h2>Why buy through Sri Saradi?</h2>
            <div className="trust-columns">
              <article>
                <h3>Verify who supplies your filters.</h3>
                <p>Orientfiltr Technology Co., Ltd. manufactures the filters in China. Sri Saradi Scientific Private Limited in Hyderabad, India, is authorized to sell Orient Filtr in the US. Request our authorization letter before placing a PO.</p>
              </article>
              <article>
                <h3>Talk to a scientist about your method.</h3>
                <p>Our founder, Praveen Gadde, worked in analytical R&amp;D at Novartis. Tell us your sample or process conditions and we’ll review the filter specification with you.</p>
                <a className="under" href="https://srisaradiscientific.com/about">Meet Sri Saradi Scientific</a>
              </article>
              <article>
                <h3>Reach the team handling your order.</h3>
                <p>One Sri Saradi contact handles your quote, documents, and shipment. We share tracking after dispatch and follow up with the manufacturer on lot-specific questions.</p>
                <a className="under" href="mailto:info@srisaradiscientific.com">Email our team</a>{" "}
                <span className="contact-sep">·</span>{" "}
                <a className="under" href="tel:+917207607444">+91 72076 07444</a>
              </article>
            </div>
          </div>
        </section>
        <section className="quality" id="quality">
          <div className="shell quality-layout">
            <div>
              <div className="kicker"><i></i> Quality documentation</div>
              <h2>See what your lab<br />can verify.</h2>
              <p>Review a manufacturer-issued certificate for IPES1322N, a 13 mm, 0.22 µm nonsterile PES syringe filter, lot 381208032. Ask which lot and documents are available for your order.</p>
              <a className="button light" href="/us-lab-filters/media/IPES1322N-sample.pdf" target="_blank" rel="noopener">View PES lot certificate (PDF)</a>
              <p className="cert-note">The manufacturer’s ISO 9001:2015 certificate covers the design, manufacture, and sale of microfiltration membranes, laboratory syringe filters, and industrial filters. This copy is dated December 21, 2023 through December 20, 2026. <a href="/us-lab-filters/media/manufacturer-iso9001.pdf" target="_blank" rel="noopener">View certificate (PDF)</a></p>
              <details className="technical-docs">
                <summary>Manufacturer guides and test reports</summary>
                <ul>
                  <li><a href="/us-lab-filters/media/syringe-guide.pdf" target="_blank" rel="noopener">Syringe filter selection guide</a></li>
                  <li><a href="/us-lab-filters/media/gridded-guide.pdf" target="_blank" rel="noopener">Gridded membrane guide</a></li>
                  <li><a href="/us-lab-filters/media/pes-33mm-report.pdf" target="_blank" rel="noopener">33 mm, 0.22 µm sterile PES comparison</a></li>
                  <li><a href="/us-lab-filters/media/pvdf-30mm-report.pdf" target="_blank" rel="noopener">30 mm, 0.22 µm sterile PVDF comparison</a></li>
                </ul>
                <p>The comparisons describe the specific filters tested. For the 13 mm or 25 mm sterile PES and PVDF items in this catalog, request the records for your chosen SKU.</p>
              </details>
            </div>
            <div className="evidence">
              <span className="micro">Nonsterile nylon · second sample lot</span>
              <h3>INY2545N <span>25 mm / 0.45 µm</span></h3>
              <dl>
                <div>
                  <dt>Lot number</dt>
                  <dd>381205037</dd>
                </div>
                <div>
                  <dt>Certificate checks</dt>
                  <dd>Bubble point, flow, burst pressure</dd>
                </div>
                <div>
                  <dt>HPLC extractables</dt>
                  <dd>Pass for this lot</dd>
                </div>
              </dl>
              <p><a href="/us-lab-filters/media/INY2545N-sample.pdf" target="_blank" rel="noopener">View this nylon certificate (PDF)</a></p>
              <p>For sterile products, request the release or sterilization records for your selected SKU and lot.</p>
            </div>
          </div>
        </section>
        <section className="shell block shipping" id="delivery">
          <div>
            <div className="kicker"><i></i> Cross-border purchasing</div>
            <h2>When will my<br />filters arrive?</h2>
            <p>We promise US delivery within 6 days for confirmed in-stock items. Send the catalog number, quantity, and delivery ZIP code. We’ll confirm stock and give you the arrival date in writing before you order.</p>
          </div>
          <div className="faqs">
            <details open>
              <summary>Does the six-day promise apply to my entire order?</summary>
              <p>We check availability for the quantity of each SKU you request. If a line is backordered, your quote will identify it and specify its lead time. OEM projects have a separate schedule agreed after the project call.</p>
            </details>
            <details>
              <summary>How are freight and import costs handled?</summary>
              <p>Your USD quote identifies the dispatch point, pack price, and handover location. For buyer-paid courier freight, request FCA at a named place. Ocean FOB quotes specify the port of loading. DHL or UPS freight, brokerage, duties, and taxes are separate unless expressly included.</p>
            </details>
            <details>
              <summary>Can my lab evaluate one pack first?</summary>
              <p>Request a paid evaluation pack and give us your US ZIP code so we can price the shipment. For a routine order, combine packs on one quote and tell us your expected reorder frequency.</p>
            </details>
            <details>
              <summary>What can procurement confirm before ordering?</summary>
              <p>Ask for the applicable product specification, manufacturer documentation, sales authorization, dispatch location, availability, lead time, and the process for a shipping or quality claim. Include your required arrival date and any vendor onboarding, PO, or payment-term requirements so we can address them on the quote.</p>
            </details>
            <details>
              <summary>What if my order is delayed or arrives damaged?</summary>
              <p>Email info@srisaradiscientific.com with the order reference and tracking number. For damage or a product discrepancy, include the catalog number, lot number, and photos of the packaging. We’ll review the issue with the carrier or manufacturer and advise the next step.</p>
            </details>
          </div>
        </section>
        <section id="oem" className="oem-section">
          <div className="shell oem-layout">
            <div>
              <div className="kicker"><i></i> OEM orders</div>
              <h2>Plan an OEM<br /><em>filter order.</em></h2>
              <p>OEM orders start with a call. Share the filter, expected volume, and labeling or packaging needs. We’ll confirm feasibility, minimum quantity, and lead time before quoting.</p>
            </div>
            <div>
              <details id="oem-booking">
                <summary>Request an OEM call</summary>
                <form id="oem-form" method="post" action="/api/us-lab-filters" data-endpoint="/api/us-lab-filters">
                  <input type="hidden" name="intent" value="oem" />
                  <div className="formgrid">
                    <label>Your name<input name="name" autoComplete="name" maxLength={100} required /></label>
                    <label>Work email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                    <label className="full">Company or institution<input name="company" autoComplete="organization" maxLength={150} required /></label>
                    <label>Preferred date and time<input name="callTime" type="datetime-local" required /></label>
                    <label>Your time zone<input name="timeZone" maxLength={80} placeholder="e.g. US Eastern" required /></label>
                    <label className="full">OEM project brief<textarea name="notes" rows={3} maxLength={1800} required placeholder="Filter type, estimated volume, and what you want to customize"></textarea></label>
                    <div className="trap" aria-hidden="true">
                      <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                    </div>
                  </div>
                  <label className="check">
                    <input type="checkbox" name="consent" value="yes" required />
                    <span>Sri Saradi Scientific may contact me about this OEM request.</span>
                  </label>
                  <p className="formnote">We’ll confirm the call time and meeting details by email. We record the campaign that led to your request. <a href="https://srisaradiscientific.com/privacy-policy">Privacy policy</a></p>
                  <button className="button" id="submit-oem" type="submit">Request this call time</button>
                  <p id="oem-status" role="status" aria-live="polite"></p>
                  <noscript>Email your preferred time, time zone, and project details to info@srisaradiscientific.com.</noscript>
                </form>
              </details>
              <p className="oem-tip">For standard catalog items, use the <a href="#quote">US quote form</a>.</p>
            </div>
          </div>
        </section>
        <section className="quote-section" id="quote">
          <div className="shell quote-layout">
            <div className="quote-intro">
              <div className="kicker"><i></i> US business inquiries</div>
              <h2>Request a<br /><em>filter quote.</em></h2>
              <p>Tell us what you buy, how many packs you need, and where they will ship. We’ll reply with the SKU, stock status, USD price, shipping terms, and delivery date.</p>
              <a className="under" href="mailto:info@srisaradiscientific.com">info@srisaradiscientific.com</a>
            </div>
            <form id="rfq" method="post" action="/api/us-lab-filters" data-endpoint="/api/us-lab-filters">
              <div className="formgrid">
                <label>Your name<input name="name" autoComplete="name" maxLength={100} required /></label>
                <label>Work or university email<input name="email" type="email" autoComplete="email" maxLength={254} required /></label>
                <label className="full">Company or institution<input name="company" autoComplete="organization" maxLength={150} required /></label>
                <label>
                  Filter family
                  <select name="family" required>
                    <option value="syringe">Nonsterile syringe filters</option>
                    <option value="sterile">Sterile syringe filters</option>
                    <option value="disc">Plain membrane discs</option>
                    <option value="grid">Gridded membranes</option>
                    <option value="capflux">CapFlux™ capsules</option>
                    <option value="steriflux">SteriFlux™ cartridges</option>
                    <option value="supflux">SupFlux™ high-flow cartridges</option>
                    <option value="aquaflux">AquaFlux™ sediment filters</option>
                    <option value="steelflux">SteelFlux™ housings</option>
                    <option value="vent">Laboratory venting filters</option>
                    <option value="glass">Glass fiber membranes</option>
                    <option value="otherlab">Other laboratory catalog item</option>
                    <option value="process">Industrial filter · help me choose</option>
                  </select>
                </label>
                <label id="quote-sku">
                  Catalog number
                  <select name="sku"><option value="">Help me choose</option></select>
                </label>
                <label>
                  <span id="quantity-label" className="field-caption">Number of packs</span>
                  <input name="packs" type="number" inputMode="numeric" min="1" max="1000000" placeholder="e.g. 10" required />
                </label>
                <label>US delivery ZIP code<input name="zip" autoComplete="postal-code" pattern="[0-9]{5}(-[0-9]{4})?" maxLength={10} title="Enter a 5-digit ZIP code or ZIP+4" placeholder="e.g. 02139" required /></label>
                <label className="full">
                  Purchase type
                  <select name="buyingCycle">
                    <option>Recurring supply</option>
                    <option>Evaluation</option>
                    <option>One-time order</option>
                    <option>Distributor purchase</option>
                  </select>
                </label>
                <label className="full">Specifications or additional SKUs <span>(optional)</span><textarea id="quote-notes" name="notes" rows={3} maxLength={1800} placeholder="Required arrival date, application, additional SKUs, or documents needed"></textarea></label>
                <div className="trap" aria-hidden="true">
                  <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
                </div>
              </div>
              <label className="check">
                <input name="consent" value="yes" type="checkbox" required />
                <span>Sri Saradi Scientific may contact me about this request.</span>
              </label>
              <p className="formnote">We use these details to prepare your quote and record the campaign that led to your inquiry. <a href="https://srisaradiscientific.com/privacy-policy" target="_blank" rel="noopener">Privacy policy</a></p>
              <button className="button" id="submit-quote" type="submit">Send quote request</button>
              <p role="status" aria-live="polite" id="form-status"></p>
              <noscript>Please email your filter specifications, pack quantity, and ZIP code to info@srisaradiscientific.com to request a quote.</noscript>
            </form>
          </div>
        </section>
      </main>
      <FilterInteractions />
    </>
  );
}
