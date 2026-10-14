'use client';

import React, { useState, useEffect } from 'react';
import { enquirySchemas, FormFieldSchema } from './enquiry-schemas';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

const CATEGORY_OPTIONS = [
  { value: 'product', label: 'Help choosing a product category' },
  { value: 'molecular', label: 'Molecular biology reagents, kits & antibodies' },
  { value: 'filter', label: 'Laboratory or process filtration' },
  { value: 'plasticware', label: 'Specialist biological plasticware' },
  { value: 'service', label: 'Custom scientific services' },
  { value: 'discovery', label: 'Omni-Search / discovery services' },
  { value: 'dealer', label: 'Dealer collaboration' },
  { value: 'documentation', label: 'COA, datasheet or product citations' },
];

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'product',
}) => {
  const [kind, setKind] = useState<string>(initialCategory);
  const [baseFields, setBaseFields] = useState({
    name: '',
    organisation: '',
    email: '',
    destination: '',
    quantity: '',
    needed: '',
    reference: '',
    requirement: '',
  });

  const [categoryFieldValues, setCategoryFieldValues] = useState<Record<string, string>>({});
  const [selectedFamily, setSelectedFamily] = useState<string>('');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [preparedDraft, setPreparedDraft] = useState<string>('');
  const [showFallback, setShowFallback] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    if (initialCategory) {
      setKind(initialCategory);
      setShowFallback(false);
      setPreparedDraft('');
    }
  }, [initialCategory, isOpen]);

  const schema = enquirySchemas[kind] || enquirySchemas.product;

  // Initialize family if schema has branch
  useEffect(() => {
    if (schema.branches) {
      const branchKeys = Object.keys(schema.branches);
      if (branchKeys.length > 0 && !branchKeys.includes(selectedFamily)) {
        setSelectedFamily(branchKeys[0]);
      }
    } else {
      setSelectedFamily('');
    }
  }, [kind, schema]);

  if (!isOpen) return null;

  const handleBaseFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBaseFields((prev) => ({ ...prev, [name]: value }));
    setShowFallback(false);
  };

  const handleCategoryFieldChange = (key: string, value: string) => {
    setCategoryFieldValues((prev) => ({ ...prev, [key]: value }));
    setShowFallback(false);
  };

  const handleFamilyChange = (val: string) => {
    setSelectedFamily(val);
    setCategoryFieldValues((prev) => ({ ...prev, [`detail_${kind}_family`]: val }));
    setShowFallback(false);
  };

  const handleDocToggle = (doc: string) => {
    setSelectedDocuments((prev) =>
      prev.includes(doc) ? prev.filter((d) => d !== doc) : [...prev, doc]
    );
    setShowFallback(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const kindLabel = CATEGORY_OPTIONS.find((c) => c.value === kind)?.label || kind;
    const lines: string[] = [
      'Hello Sri Saradi team,',
      '',
      `I would like to discuss: ${kindLabel}`,
      '',
      `Name: ${baseFields.name.trim()}`,
      `Organisation: ${baseFields.organisation.trim()}`,
      `Email: ${baseFields.email.trim()}`,
      `Destination country & city: ${baseFields.destination.trim()}`,
    ];

    // Schema dynamic fields
    schema.fields.forEach((f) => {
      const fieldKey = `detail_${kind}_${f.key}`;
      const val = f.key === 'family' ? selectedFamily : categoryFieldValues[fieldKey];
      if (val && val.trim()) {
        lines.push(`${f.label.replace(/\s*\*\s*$/, '')}: ${val.trim()}`);
      }
    });

    // Branch fields if any
    if (schema.branches && selectedFamily && schema.branches[selectedFamily]) {
      schema.branches[selectedFamily].forEach((f) => {
        const fieldKey = `detail_${kind}_${f.key}`;
        const val = categoryFieldValues[fieldKey];
        if (val && val.trim()) {
          lines.push(`${f.label.replace(/\s*\*\s*$/, '')}: ${val.trim()}`);
        }
      });
    }

    if (baseFields.quantity.trim()) {
      lines.push(`Quantity / pack size: ${baseFields.quantity.trim()}`);
    }
    if (baseFields.needed.trim()) {
      lines.push(`Required delivery date: ${baseFields.needed.trim()}`);
    }
    if (baseFields.reference.trim()) {
      lines.push(`Catalogue number / current product: ${baseFields.reference.trim()}`);
    }
    if (selectedDocuments.length > 0) {
      lines.push(`Documents requested: ${selectedDocuments.join(', ')}`);
    }
    if (baseFields.requirement.trim()) {
      lines.push(`Additional context: ${baseFields.requirement.trim()}`);
    }

    lines.push(
      '',
      'Please advise on product fit / project scope, available evidence, the complete quotation and delivery plan.'
    );
    if (['product', 'molecular', 'filter', 'plasticware'].includes(kind)) {
      lines.push(
        'Please confirm the delivery start date and whether the 15-working-day product offer applies to this order.'
      );
    }
    lines.push('');

    const bodyText = lines.join('\n');
    setPreparedDraft(bodyText);
    setShowFallback(true);

    const subject = `Website enquiry — ${kindLabel}`;
    const mailtoUrl = `mailto:info@srisaradiscientific.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(bodyText)}`;

    // Attempt to open default mail client
    window.location.href = mailtoUrl;
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(preparedDraft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      className="enquiry-modal-backdrop"
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(17, 22, 53, 0.75)',
        backdropFilter: 'blur(4px)',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        overflowY: 'auto',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <dialog
        id="enquiry-dialog"
        open
        aria-labelledby="enquiry-title"
        style={{
          position: 'relative',
          width: 'min(780px, 96vw)',
          maxHeight: '92vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #dce4ef',
          boxShadow: '0 25px 50px -12px rgba(17, 22, 53, 0.25)',
          padding: 0,
          margin: 'auto',
          display: 'block',
        }}
      >
        <div className="modal-head">
          <div>
            <div className="eyebrow">An application-first enquiry</div>
            <h2 id="enquiry-title">Tell us what the product needs to do.</h2>
          </div>
          <button
            type="button"
            className="close"
            aria-label="Close enquiry"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <form className="enquiry-form" id="enquiry-form" onSubmit={handleSubmit}>
          <p>
            Choose a category to see the relevant questions. Unknown specifications are welcome: describe the experiment or process, and we’ll help clarify them.
          </p>

          <div className="form-grid">
            <label>
              Name *
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={120}
                value={baseFields.name}
                onChange={handleBaseFieldChange}
              />
            </label>
            <label>
              Organisation *
              <input
                name="organisation"
                autoComplete="organization"
                required
                maxLength={160}
                value={baseFields.organisation}
                onChange={handleBaseFieldChange}
              />
            </label>
            <label>
              Email *
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                maxLength={180}
                value={baseFields.email}
                onChange={handleBaseFieldChange}
              />
            </label>
            <label>
              Destination country & city *
              <input
                name="destination"
                autoComplete="address-level2"
                required
                maxLength={160}
                placeholder="e.g. Germany, Berlin"
                value={baseFields.destination}
                onChange={handleBaseFieldChange}
              />
            </label>
          </div>

          <label>
            What do you need? *
            <select
              name="kind"
              value={kind}
              onChange={(e) => {
                setKind(e.target.value);
                setShowFallback(false);
              }}
            >
              {CATEGORY_OPTIONS.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </label>

          <fieldset className="category-fields">
            <legend id="category-title">{schema.title}</legend>
            <p id="category-help">{schema.help}</p>

            <div id="category-fields" className="form-grid">
              {schema.fields.map((f: FormFieldSchema) => {
                const fieldKey = `detail_${kind}_${f.key}`;
                if (f.key === 'family' && schema.branches) {
                  return (
                    <label key={f.key} className={f.type === 'textarea' ? 'full-width' : ''}>
                      {f.label}
                      <select
                        value={selectedFamily}
                        onChange={(e) => handleFamilyChange(e.target.value)}
                        required={f.required}
                      >
                        {Object.keys(schema.branches).map((bKey) => (
                          <option key={bKey} value={bKey}>
                            {bKey}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (f.type === 'select') {
                  return (
                    <label key={f.key}>
                      {f.label}
                      <select
                        value={categoryFieldValues[fieldKey] || ''}
                        onChange={(e) => handleCategoryFieldChange(fieldKey, e.target.value)}
                        required={f.required}
                      >
                        <option value="">Select an option</option>
                        {f.options?.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                  );
                }

                if (f.type === 'textarea') {
                  return (
                    <label key={f.key} className="full-width">
                      {f.label}
                      <textarea
                        maxLength={1200}
                        placeholder={f.placeholder}
                        value={categoryFieldValues[fieldKey] || ''}
                        onChange={(e) => handleCategoryFieldChange(fieldKey, e.target.value)}
                        required={f.required}
                      />
                    </label>
                  );
                }

                return (
                  <label key={f.key}>
                    {f.label}
                    <input
                      type="text"
                      maxLength={250}
                      placeholder={f.placeholder}
                      value={categoryFieldValues[fieldKey] || ''}
                      onChange={(e) => handleCategoryFieldChange(fieldKey, e.target.value)}
                      required={f.required}
                    />
                  </label>
                );
              })}
            </div>

            {/* Branch dynamic fields */}
            {schema.branches && selectedFamily && schema.branches[selectedFamily] && (
              <div className="form-grid full-width" style={{ marginTop: '16px' }}>
                {schema.branches[selectedFamily].map((f: FormFieldSchema) => {
                  const fieldKey = `detail_${kind}_${f.key}`;
                  if (f.type === 'textarea') {
                    return (
                      <label key={f.key} className="full-width">
                        {f.label}
                        <textarea
                          maxLength={1200}
                          placeholder={f.placeholder}
                          value={categoryFieldValues[fieldKey] || ''}
                          onChange={(e) => handleCategoryFieldChange(fieldKey, e.target.value)}
                          required={f.required}
                        />
                      </label>
                    );
                  }
                  return (
                    <label key={f.key}>
                      {f.label}
                      <input
                        type="text"
                        maxLength={250}
                        placeholder={f.placeholder}
                        value={categoryFieldValues[fieldKey] || ''}
                        onChange={(e) => handleCategoryFieldChange(fieldKey, e.target.value)}
                        required={f.required}
                      />
                    </label>
                  );
                })}
              </div>
            )}
          </fieldset>

          <div className="form-grid">
            <label>
              Quantity / pack size
              <input
                name="quantity"
                placeholder="e.g. 2 × 100 reactions; 10 packs"
                maxLength={160}
                value={baseFields.quantity}
                onChange={handleBaseFieldChange}
              />
            </label>
            <label>
              Required delivery date
              <input
                name="needed"
                type="date"
                value={baseFields.needed}
                onChange={handleBaseFieldChange}
              />
            </label>
          </div>

          <label>
            Catalogue number / current product (if known)
            <input
              name="reference"
              maxLength={240}
              placeholder="Manufacturer, catalogue number or existing specification"
              value={baseFields.reference}
              onChange={handleBaseFieldChange}
            />
          </label>

          <fieldset className="document-choices">
            <legend>Documents you need</legend>
            <label>
              <input
                type="checkbox"
                name="documents"
                value="Datasheet"
                checked={selectedDocuments.includes('Datasheet')}
                onChange={() => handleDocToggle('Datasheet')}
              />{' '}
              Datasheet
            </label>
            <label>
              <input
                type="checkbox"
                name="documents"
                value="COA"
                checked={selectedDocuments.includes('COA')}
                onChange={() => handleDocToggle('COA')}
              />{' '}
              COA
            </label>
            <label>
              <input
                type="checkbox"
                name="documents"
                value="Product citations"
                checked={selectedDocuments.includes('Product citations')}
                onChange={() => handleDocToggle('Product citations')}
              />{' '}
              Product citations
            </label>
          </fieldset>

          <label>
            Additional context
            <textarea
              name="requirement"
              maxLength={3500}
              placeholder="Current challenge, acceptance criteria or anything we should know."
              value={baseFields.requirement}
              onChange={handleBaseFieldChange}
            />
          </label>

          <button className="btn" type="submit">
            Prepare my enquiry ↗
          </button>

          <div className="form-note">
            Creates an email draft; your enquiry is sent when you send that email. For confidential sequences, structures or files, request an NDA before disclosure. Share attachments through the agreed email channel.
          </div>

          {showFallback && (
            <div className="mail-fallback" role="status" style={{ display: 'block' }}>
              Your draft is ready. If your email app did not open, copy the text below and email{' '}
              <a href="mailto:info@srisaradiscientific.com">info@srisaradiscientific.com</a>.
              <textarea
                aria-label="Prepared enquiry text"
                readOnly
                value={preparedDraft}
                style={{ height: '180px', marginTop: '12px' }}
              />
              <button
                type="button"
                className="btn"
                onClick={copyToClipboard}
                style={{ marginTop: '8px', padding: '8px 16px', fontSize: '13px' }}
              >
                {copied ? '✓ Copied to clipboard!' : 'Copy drafted enquiry'}
              </button>
            </div>
          )}
        </form>
      </dialog>
    </div>
  );
};
