'use client';

import KitProductForm from '../components/KitProductForm';

export default function NewKitProduct() {
  return (
    <div>
      <div style={{ marginBottom: "24px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px 0" }}>
          Create Kit Product
        </h1>
        <p style={{ color: "#888", fontSize: "14px", margin: 0 }}>
          Add a new kit product to the homepage section
        </p>
      </div>

      <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
        <KitProductForm isNew={true} />
      </div>
    </div>
  );
}
