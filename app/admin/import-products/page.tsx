"use client";

import React, { useState, useRef } from "react";
import { FaUpload, FaCheck, FaExclamationTriangle, FaDownload, FaCircleNotch } from "react-icons/fa";

interface ParsedRow {
  [key: string]: string;
}

interface ColumnMapping {
  [key: string]: string | null;
}

interface ImportResult {
  success: boolean;
  created: number;
  skipped: number;
  errors: Array<{ row: number; message: string }>;
}

interface SkipReason {
  row: number;
  catalogNumber: string;
  name: string;
  message: string;
}

interface ImportProgress {
  current: number;
  total: number;
  percentage: number;
  status: string;
  createdSoFar: number;
  skippedSoFar: number;
  processingItems?: Array<{ name: string; catalogNumber: string; status: string }>;
  skipReasons?: SkipReason[];
}

export default function ImportProductsPage() {
  const [step, setStep] = useState<"upload" | "parsing" | "map" | "preview" | "importing" | "complete">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileHeaders, setFileHeaders] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string>("");
  const [parsingStatus, setParsingStatus] = useState<string>("");
  const [progress, setProgress] = useState<ImportProgress>({
    current: 0,
    total: 0,
    percentage: 0,
    status: "Initializing...",
    createdSoFar: 0,
    skippedSoFar: 0,
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = ["productId", "name"];
  
  const fieldDescriptions: { [key: string]: string } = {
    productId: "Unique product identifier",
    name: "Product name",
    catalogNumber: "Catalog/SKU number",
    categoryId: "Direct category ID (if known)",
    categoryName: "Category name - will auto-link to existing categories",
    description: "Product description",
    manufacturer: "Manufacturer name",
    material: "Material composition",
    volume: "Volume/capacity",
    size: "Size specification",
    image: "Image URL",
    sku: "Stock keeping unit",
    packSize: "Pack size",
    price: "Product price",
    brand: "Brand name",
    casNumber: "CAS number (chemistry)",
    storage: "Storage instructions",
    purity: "Purity level",
    section: "Product section",
    productLine: "Product line/series",
    primaryCategory: "Primary category (text only)",
    subCategory: "Sub-category",
    applications: "Intended applications",
    needleShape: "Needle shape (for syringes/needles)",
    abType: "Antibody type",
    abHost: "Antibody host",
    abTarget: "Antibody target",
    abCloneType: "Antibody clone type",
    abIsotype: "Antibody isotype",
    abImmunogen: "Antibody immunogen",
    abCalculatedMw: "Antibody calculated molecular weight",
    abPurification: "Antibody purification method",
    abStorageBuffer: "Antibody storage buffer",
    abGeneId: "Antibody gene ID",
    abSubcellularLocation: "Antibody subcellular location",
    abSwissProt: "Antibody SwissProt ID",
    abDilutionRatio: "Antibody dilution ratio",
    abApplicationType: "Antibody application type",
    abReactivity: "Antibody reactivity",
    elisaDetectionRange: "ELISA detection range",
    elisaSensitivity: "ELISA sensitivity",
    elisaReactivity: "ELISA reactivity",
    elisaSampleType: "ELISA sample type",
    elisaChineseName: "ELISA Chinese name",
    mediaExpiry: "Media expiry date",
    histoPrimaryCategory: "Histology primary category",
    isFeatured: "Featured product (yes/no)",
    isActive: "Active product (yes/no)",
    sortOrder: "Display sort order",
  };

  const optionalFields = [
    "catalogNumber",
    "categoryId",
    "description",
    "categoryName",
    "manufacturer",
    "material",
    "volume",
    "size",
    "image",
    "sku",
    "packSize",
    "price",
    "brand",
    "casNumber",
    "storage",
    "purity",
    "section",
    "productLine",
    "primaryCategory",
    "subCategory",
    "applications",
    "needleShape",
    "abType",
    "abHost",
    "abTarget",
    "abCloneType",
    "abIsotype",
    "abImmunogen",
    "abCalculatedMw",
    "abPurification",
    "abStorageBuffer",
    "abGeneId",
    "abSubcellularLocation",
    "abSwissProt",
    "abDilutionRatio",
    "abApplicationType",
    "abReactivity",
    "elisaDetectionRange",
    "elisaSensitivity",
    "elisaReactivity",
    "elisaSampleType",
    "elisaChineseName",
    "mediaExpiry",
    "histoPrimaryCategory",
    "isFeatured",
    "isActive",
    "sortOrder",
  ];

  const handleFileSelect = async (selectedFile: File) => {
    setError("");
    setStep("parsing");
    setParsingStatus("Uploading file...");
    
    try {
      let text = "";

      if (selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls")) {
        setParsingStatus("Reading Excel file...");
        const buffer = await selectedFile.arrayBuffer();
        const { utils, read } = await import("xlsx");
        setParsingStatus("Converting Excel to CSV...");
        const workbook = read(buffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        text = utils.sheet_to_csv(worksheet);
      } else {
        setParsingStatus("Reading CSV file...");
        text = await selectedFile.text();
      }

      setParsingStatus("Parsing file contents...");
      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        setError("File must contain at least a header and one data row");
        setStep("upload");
        return;
      }

      setParsingStatus(`Processing ${lines.length} rows...`);
      
      const delimiter = lines[0].includes("\t") ? "\t" : ",";
      const headers = parseCSVLine(lines[0], delimiter).map((h) => h.trim());

      const data: ParsedRow[] = [];
      for (let i = 1; i < lines.length && i <= 100000; i++) {
        const values = parseCSVLine(lines[i], delimiter).map((v) => v.trim());
        const row: ParsedRow = {};
        headers.forEach((header, idx) => {
          row[header] = values[idx] || "";
        });
        if (row[headers[0]]) data.push(row);
        
        if (i % 5000 === 0) {
          setParsingStatus(`Processing ${lines.length} rows... (${i}/${lines.length})`);
          await new Promise(resolve => setTimeout(resolve, 10));
        }
      }

      setParsingStatus("Done! Preparing mapping...");
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFile(selectedFile);
      setFileHeaders(headers);
      setParsedData(data);
      setStep("map");
    } catch (err) {
      setError(`Failed to parse file: ${err instanceof Error ? err.message : "Unknown error"}`);
      setStep("upload");
    }
  };

  const parseCSVLine = (line: string, delimiter: string): string[] => {
    const result: string[] = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];

      if (char === '"') {
        insideQuotes = !insideQuotes;
      } else if (char === delimiter && !insideQuotes) {
        result.push(current);
        current = "";
      } else {
        current += char;
      }
    }

    result.push(current);
    return result;
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && (droppedFile.type === "text/csv" || droppedFile.name.endsWith(".xlsx"))) {
      handleFileSelect(droppedFile);
    } else {
      setError("Please upload a CSV or Excel file");
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleMappingChange = (fileColumn: string, productField: string | null) => {
    setColumnMapping({ ...columnMapping, [fileColumn]: productField });
  };

  const autoDetectMapping = () => {
    const newMapping: ColumnMapping = {};
    const allFields = [...requiredFields, ...optionalFields];

    fileHeaders.forEach((header) => {
      const headerLower = header.toLowerCase().trim();
      
      let bestMatch: string | null = null;
      let bestScore = 0;

      allFields.forEach((field) => {
        const fieldLower = field.toLowerCase();
        
        if (headerLower === fieldLower) {
          bestMatch = field;
          bestScore = 100;
        } else if (headerLower.includes(fieldLower) || fieldLower.includes(headerLower)) {
          const score = 80;
          if (score > bestScore) {
            bestMatch = field;
            bestScore = score;
          }
        } else if (
          (headerLower.includes("catalog") && fieldLower === "catalognumber") ||
          (headerLower.includes("sku") && fieldLower === "sku") ||
          (headerLower.includes("pack") && fieldLower === "packsize") ||
          (headerLower.includes("category") && fieldLower === "categoryname") ||
          (headerLower.includes("product") && headerLower.includes("line") && fieldLower === "productline") ||
          (headerLower.includes("primary") && fieldLower === "primarycategory") ||
          (headerLower.includes("sub") && fieldLower === "subcategory") ||
          (headerLower.includes("ab_") && fieldLower.startsWith("ab")) ||
          (headerLower.includes("elisa") && fieldLower.startsWith("elisa"))
        ) {
          const score = 70;
          if (score > bestScore) {
            bestMatch = field;
            bestScore = score;
          }
        }
      });

      if (bestMatch) {
        newMapping[header] = bestMatch;
      }
    });

    setColumnMapping(newMapping);
  };

  const handleImport = async () => {
    const missingRequired = requiredFields.filter((field) => !Object.values(columnMapping).includes(field));
    if (missingRequired.length > 0) {
      setError(`Missing required fields: ${missingRequired.join(", ")}`);
      return;
    }

    const importId = `import_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    console.log("=== IMPORT DEBUG ===");
    console.log("Column Mapping:", columnMapping);
    console.log("First 3 rows of data:", parsedData.slice(0, 3));
    
    const categoryNameCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "categoryName");
    if (categoryNameCol) {
      console.log(`Category Name Column: "${categoryNameCol}"`);
      console.log("Sample category values:", parsedData.slice(0, 5).map((row) => row[categoryNameCol]));
    } else {
      console.warn("⚠️ No categoryName column mapped!");
    }
    
    setImporting(true);
    setError("");
    setStep("importing");
    setProgress({
      current: 0,
      total: parsedData.length,
      percentage: 0,
      status: "Initializing import...",
      createdSoFar: 0,
      skippedSoFar: 0,
    });

    try {
      const response = await fetch("/api/admin/import-products-bulk-stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedData, mapping: columnMapping, importId }),
      });

      if (!response.ok) {
        throw new Error("Import failed");
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const data = JSON.parse(line);

            if (data.type === "progress") {
              setProgress((prev) => ({
                current: data.current,
                total: data.total,
                percentage: Math.round((data.current / data.total) * 100),
                status: data.status,
                createdSoFar: data.created,
                skippedSoFar: data.skipped,
                processingItems: data.processingItems,
                skipReasons: data.errors ? data.errors.map((err: any) => ({
                  row: err.row,
                  catalogNumber: err.catalogNumber || "N/A",
                  name: err.name || "N/A",
                  message: err.message,
                })) : prev.skipReasons || [],
              }));
            } else if (data.type === "complete") {
              setImportResult({
                success: true,
                created: data.created,
                skipped: data.skipped,
                errors: data.errors || [],
              });
              setStep("complete");
            } else if (data.type === "error") {
              throw new Error(data.message);
            }
          } catch (e) {
            console.error("Failed to parse progress line:", line);
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Import failed");
      setStep("preview");
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = `catalogNumber,name,description,categoryName,manufacturer,sku,packSize,price,brand,casNumber,storage,purity
CATH-001,Monoclonal Antibody Anti-Human,High-quality antibody,Antibodies,Sigma,AB001,100µL,450.00,Sigma-Aldrich,58-86-6,2-8°C,95%
CATH-002,Cell Culture Medium DMEM,Basal medium for cell culture,Cell Culture Media,Thermo,CM001,500mL,120.00,Gibco,67-48-1,Room Temp,100%`;

    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "product-import-template.csv";
    a.click();
  };

  return (
    <div>
      {step === "upload" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Import Products</h1>
            <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
              Bulk import products from CSV or Excel file with automatic column mapping
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            <div
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              style={{
                border: "2px dashed #ddd",
                borderRadius: "12px",
                padding: "40px",
                textAlign: "center",
                cursor: "pointer",
                background: "#fafbff",
                transition: "all 0.2s",
              }}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                style={{ display: "none" }}
              />
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>📦</div>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#333", margin: "0 0 4px" }}>
                Drag and drop your file
              </p>
              <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>or click to browse</p>
              <p style={{ fontSize: "12px", color: "#bbb", margin: "8px 0 0" }}>CSV or Excel (.xlsx)</p>
            </div>

            <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px" }}>
              <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#333", margin: "0 0 16px" }}>
                📋 Import Guide
              </h3>
              <ul style={{ fontSize: "13px", color: "#666", lineHeight: "1.8", margin: 0, paddingLeft: "20px" }}>
                <li>CSV or Excel files supported</li>
                <li>Required: <strong>catalogNumber, name</strong></li>
                <li>Max 5,000 products per import</li>
                <li>Large imports show live progress</li>
                <li>Auto-link categories by name</li>
                <li>Create variants with sku+price</li>
                <li>Duplicates automatically skipped</li>
              </ul>
              <button
                onClick={downloadTemplate}
                style={{
                  marginTop: "20px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  background: "#f0f0f0",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#333",
                  cursor: "pointer",
                }}
              >
                <FaDownload /> Download Template
              </button>
            </div>
          </div>

          {error && (
            <div style={{ marginTop: "20px", padding: "12px 16px", background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "8px", color: "#991b1b", fontSize: "13px", display: "flex", gap: "8px", alignItems: "center" }}>
              <FaExclamationTriangle /> {error}
            </div>
          )}
        </div>
      )}

      {step === "parsing" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Parsing File...</h1>
            <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
              Please wait while we read and process your file
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "48px" }}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  fontSize: "48px",
                  marginBottom: "24px",
                  animation: "spin 1s linear infinite",
                }}
              >
                ⏳
              </div>
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#333", margin: "0 0 12px" }}>
                {parsingStatus}
              </p>
              <p style={{ fontSize: "13px", color: "#999", margin: 0 }}>
                This may take a few moments for large files...
              </p>
            </div>
          </div>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {step === "map" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Map Columns</h1>
                <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
                  Match your file columns to product fields ({parsedData.length} products to import)
                </p>
              </div>
              <button
                onClick={autoDetectMapping}
                style={{
                  padding: "8px 16px",
                  background: "#2D2B7F",
                  border: "none",
                  borderRadius: "8px",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                🔍 Auto-Detect
              </button>
            </div>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "24px", maxHeight: "700px", overflow: "auto" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
              {fileHeaders.map((header) => {
                const selectedField = columnMapping[header];
                const selectedDescription = selectedField ? fieldDescriptions[selectedField] : "";
                
                return (
                  <div key={header} style={{ borderBottom: "1px solid #f0f0f0", paddingBottom: "16px" }}>
                    <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "6px" }}>
                      Excel Column: <strong>{header}</strong>
                    </label>
                    <select
                      value={columnMapping[header] || ""}
                      onChange={(e) => handleMappingChange(header, e.target.value || null)}
                      style={{
                        width: "100%",
                        padding: "10px 12px",
                        border: selectedField ? "2px solid #2D2B7F" : "1px solid #ddd",
                        borderRadius: "8px",
                        fontSize: "13px",
                        background: "#fff",
                        cursor: "pointer",
                        marginBottom: "8px",
                      }}
                    >
                      <option value="">— Skip this column —</option>
                      <optgroup label="Required Fields">
                        {requiredFields.map((field) => (
                          <option key={field} value={field}>
                            {field} *
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Optional Fields">
                        {optionalFields.map((field) => (
                          <option key={field} value={field}>
                            {field}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                    {selectedField && selectedDescription && (
                      <div style={{ 
                        fontSize: "12px", 
                        color: "#666", 
                        background: "#f9f9f9", 
                        padding: "8px 10px", 
                        borderRadius: "6px",
                        borderLeft: "3px solid #2D2B7F"
                      }}>
                        <strong>{selectedField}:</strong> {selectedDescription}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              onClick={() => setStep("upload")}
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#333",
              }}
            >
              Back
            </button>
            <button
              onClick={() => setStep("preview")}
              style={{
                padding: "10px 20px",
                background: "#2D2B7F",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {step === "preview" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Preview & Confirm</h1>
            <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
              Review your data before importing ({parsedData.length} products)
            </p>
          </div>

          {(() => {
            const categoryNameCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "categoryName");
            if (categoryNameCol) {
              const categories = new Set(
                parsedData
                  .map((row) => row[categoryNameCol]?.trim())
                  .filter((cat) => cat && cat.length > 0)
              );
              
              return (
                <div style={{ background: "#f0f9ff", borderRadius: "12px", border: "1px solid #bfdbfe", padding: "16px", marginBottom: "24px" }}>
                  <div style={{ fontSize: "13px", fontWeight: 600, color: "#1e40af", marginBottom: "12px" }}>
                    ℹ️ Categories Found in Your Data:
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "8px" }}>
                    {Array.from(categories).map((cat) => (
                      <div key={cat} style={{ 
                        padding: "8px 12px", 
                        background: "#fff", 
                        borderRadius: "6px", 
                        fontSize: "12px",
                        border: "1px solid #dbeafe"
                      }}>
                        <span style={{ fontWeight: 500, color: "#333" }}>{cat}</span>
                        <span style={{ fontSize: "10px", color: "#999", marginLeft: "8px" }}>
                          ({parsedData.filter((row) => row[categoryNameCol]?.trim() === cat).length} products)
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "11px", color: "#666", marginTop: "12px" }}>
                    These will be auto-linked to categories in your database. Make sure they match exactly!
                  </div>
                </div>
              );
            }
            return null;
          })()}

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden", marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead style={{ background: "#fafafa" }}>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Product ID</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>SKU</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Catalog #</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Category</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 10).map((row, idx) => {
                  const productIdCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "productId");
                  const nameCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "name");
                  const skuCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "sku");
                  const catalogCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "catalogNumber");
                  const catCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "categoryName");

                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "12px", color: "#333", fontFamily: "monospace", fontSize: "12px", fontWeight: 500 }}>
                        {productIdCol ? row[productIdCol] : "—"}
                      </td>
                      <td style={{ padding: "12px", color: "#333" }}>{nameCol ? row[nameCol] : "—"}</td>
                      <td style={{ padding: "12px", color: "#666", fontFamily: "monospace", fontSize: "11px" }}>
                        {skuCol ? row[skuCol] : "—"}
                      </td>
                      <td style={{ padding: "12px", color: "#666", fontFamily: "monospace", fontSize: "11px" }}>
                        {catalogCol ? row[catalogCol] : "—"}
                      </td>
                      <td style={{ padding: "12px", color: "#666" }}>{catCol ? row[catCol] : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {parsedData.length > 10 && (
              <div style={{ padding: "12px", textAlign: "center", background: "#fafafa", color: "#888", fontSize: "12px" }}>
                ... and {parsedData.length - 10} more
              </div>
            )}
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              onClick={() => setStep("map")}
              style={{
                padding: "10px 20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                background: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                color: "#333",
              }}
            >
              Back
            </button>
            <button
              onClick={handleImport}
              style={{
                padding: "10px 20px",
                background: "#2D2B7F",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Start Import
            </button>
          </div>
        </div>
      )}

      {step === "importing" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Importing...</h1>
            <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
              Processing {progress.total} products
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "32px" }}>
            <div style={{ textAlign: "center", marginBottom: "32px" }}>
              <FaCircleNotch
                style={{
                  fontSize: "48px",
                  color: "#2D2B7F",
                  animation: "spin 1s linear infinite",
                  marginBottom: "16px",
                }}
              />
              <p style={{ fontSize: "16px", fontWeight: 600, color: "#333", margin: 0 }}>
                {progress.status}
              </p>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "13px", color: "#666", fontWeight: 600 }}>
                  Progress: {progress.current} / {progress.total}
                </span>
                <span style={{ fontSize: "13px", color: "#2D2B7F", fontWeight: 700 }}>
                  {progress.percentage}%
                </span>
              </div>
              <div style={{
                width: "100%",
                height: "8px",
                background: "#e0e0e0",
                borderRadius: "4px",
                overflow: "hidden",
              }}>
                <div
                  style={{
                    height: "100%",
                    background: "#2D2B7F",
                    width: `${progress.percentage}%`,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "24px" }}>
              <div style={{ background: "#dcfce7", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontSize: "11px", color: "#166534", margin: "0 0 4px", fontWeight: 600 }}>CREATED</p>
                <p style={{ fontSize: "20px", fontWeight: 700, color: "#16a34a", margin: 0 }}>
                  {progress.createdSoFar}
                </p>
              </div>
              <div style={{ background: "#fef3c7", borderRadius: "8px", padding: "12px" }}>
                <p style={{ fontSize: "11px", color: "#92400e", margin: "0 0 4px", fontWeight: 600 }}>SKIPPED</p>
                <p style={{ fontSize: "20px", fontWeight: 700, color: "#f59e0b", margin: 0 }}>
                  {progress.skippedSoFar}
                </p>
              </div>
            </div>

            {progress.processingItems && progress.processingItems.length > 0 && (
              <div style={{ marginBottom: "24px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "12px" }}>Currently Processing:</p>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {progress.processingItems.map((item, idx) => (
                    <div key={idx} style={{
                      background: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "6px",
                      padding: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}>
                      <div>
                        <p style={{ fontSize: "12px", fontWeight: 500, color: "#1a1a2e", margin: "0 0 4px" }}>
                          {item.name}
                        </p>
                        <p style={{ fontSize: "11px", color: "#666", margin: 0 }}>
                          {item.catalogNumber}
                        </p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        {item.status === "created" && (
                          <span style={{ fontSize: "12px", color: "#16a34a", fontWeight: 600 }}>✓ Created</span>
                        )}
                        {item.status === "skipped" && (
                          <span style={{ fontSize: "12px", color: "#f59e0b", fontWeight: 600 }}>⊘ Skipped</span>
                        )}
                        {item.status === "error" && (
                          <span style={{ fontSize: "12px", color: "#dc2626", fontWeight: 600 }}>✕ Error</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {progress.skipReasons && progress.skipReasons.length > 0 && (
              <div style={{ marginTop: "24px" }}>
                <p style={{ fontSize: "13px", fontWeight: 600, color: "#991b1b", marginBottom: "12px" }}>
                  Skip Reasons ({progress.skipReasons.length})
                </p>
                <div style={{ maxHeight: "400px", overflowY: "auto", border: "1px solid #fca5a5", borderRadius: "8px", background: "#fef2f2" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
                    <thead style={{ background: "#fee2e2", position: "sticky", top: 0 }}>
                      <tr>
                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#991b1b", borderBottom: "1px solid #fca5a5" }}>Row</th>
                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#991b1b", borderBottom: "1px solid #fca5a5" }}>Product Name</th>
                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#991b1b", borderBottom: "1px solid #fca5a5" }}>Product ID</th>
                        <th style={{ padding: "10px 12px", textAlign: "left", fontWeight: 600, color: "#991b1b", borderBottom: "1px solid #fca5a5" }}>Skip Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {progress.skipReasons.slice(0, 100).map((reason, idx) => (
                        <tr key={idx} style={{ borderBottom: "1px solid #fca5a5", background: idx % 2 === 0 ? "#fff" : "#fef9f9" }}>
                          <td style={{ padding: "10px 12px", color: "#666", fontWeight: 500 }}>{reason.row}</td>
                          <td style={{ padding: "10px 12px", color: "#333", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{reason.name}</td>
                          <td style={{ padding: "10px 12px", color: "#666", fontFamily: "monospace", fontSize: "11px", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{reason.catalogNumber}</td>
                          <td style={{ padding: "10px 12px", color: "#991b1b" }}>{reason.message}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {progress.skipReasons.length > 100 && (
                  <p style={{ fontSize: "11px", color: "#666", margin: "8px 0 0" }}>
                    Showing 100 of {progress.skipReasons.length} skipped items
                  </p>
                )}
              </div>
            )}
          </div>

          <style>{`
            @keyframes spin {
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
      )}

      {step === "complete" && importResult && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Import Complete</h1>
          </div>

          <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: "12px", padding: "20px", marginBottom: "24px", display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <FaCheck style={{ color: "#16a34a", fontSize: "20px", flexShrink: 0, marginTop: "2px" }} />
            <div>
              <p style={{ fontWeight: 600, color: "#166534", margin: 0 }}>✅ Import successful!</p>
              <p style={{ color: "#166534", fontSize: "13px", margin: "4px 0 0" }}>
                {importResult.created} products created, {importResult.skipped} skipped
              </p>
            </div>
          </div>

          {importResult.skipped > 0 && (
            <div style={{ background: "#fef3c7", border: "1px solid #fde047", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
              <p style={{ fontWeight: 600, color: "#92400e", margin: "0 0 12px" }}>📊 Skip Summary ({importResult.skipped} skipped)</p>
              <div style={{ fontSize: "13px", color: "#92400e" }}>
                {importResult.errors.length > 0 && (
                  <>
                    <p style={{ margin: "0 0 8px" }}>
                      <strong>{importResult.errors.length} errors encountered:</strong>
                    </p>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {importResult.errors.slice(0, 20).map((err, idx) => (
                        <li key={idx} style={{ marginBottom: "4px" }}>
                          <span style={{ fontWeight: 500 }}>Row {err.row}:</span> {err.message}
                        </li>
                      ))}
                    </ul>
                    {importResult.errors.length > 20 && (
                      <p style={{ margin: "8px 0 0", fontStyle: "italic" }}>... and {importResult.errors.length - 20} more errors</p>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={() => {
                setStep("upload");
                setFile(null);
                setError("");
                setParsedData([]);
                setColumnMapping({});
                setImportResult(null);
              }}
              style={{
                padding: "10px 20px",
                background: "#2D2B7F",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Import More
            </button>
            <a
              href="/admin/products"
              style={{
                padding: "10px 20px",
                background: "#f0f0f0",
                border: "1px solid #ddd",
                borderRadius: "8px",
                color: "#333",
                fontSize: "13px",
                fontWeight: 600,
                cursor: "pointer",
                textDecoration: "none",
              }}
            >
              View Products
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
