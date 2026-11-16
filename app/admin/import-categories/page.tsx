"use client";

import React, { useState, useRef } from "react";
import { FaUpload, FaCheck, FaExclamationTriangle, FaDownload } from "react-icons/fa";
import AdminModal from "../components/AdminModal";

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

export default function ImportCategoriesPage() {
  const [step, setStep] = useState<"upload" | "map" | "preview" | "complete">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [fileHeaders, setFileHeaders] = useState<string[]>([]);
  const [parsedData, setParsedData] = useState<ParsedRow[]>([]);
  const [columnMapping, setColumnMapping] = useState<ColumnMapping>({});
  const [importing, setImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [error, setError] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const requiredFields = ["name", "slug"];
  const optionalFields = ["description", "image", "icon", "color", "parentName"];

  const handleFileSelect = async (selectedFile: File) => {
    setError("");
    try {
      let text = "";

      if (selectedFile.name.endsWith(".xlsx") || selectedFile.name.endsWith(".xls")) {
        const buffer = await selectedFile.arrayBuffer();
        const { utils, read } = await import("xlsx");
        const workbook = read(buffer, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        text = utils.sheet_to_csv(worksheet);
      } else {
        text = await selectedFile.text();
      }

      const lines = text.split("\n").filter((line) => line.trim());

      if (lines.length < 2) {
        setError("File must contain at least a header and one data row");
        return;
      }

      const delimiter = lines[0].includes("\t") ? "\t" : ",";
      const headers = parseCSVLine(lines[0], delimiter).map((h) => h.trim());

      const data: ParsedRow[] = [];
      for (let i = 1; i < lines.length && i <= 100; i++) {
        const values = parseCSVLine(lines[i], delimiter).map((v) => v.trim());
        const row: ParsedRow = {};
        headers.forEach((header, idx) => {
          row[header] = values[idx] || "";
        });
        data.push(row);
      }

      setFile(selectedFile);
      setFileHeaders(headers);
      setParsedData(data);
      setStep("map");
    } catch (err) {
      setError(`Failed to parse file: ${err instanceof Error ? err.message : "Unknown error"}`);
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

  const handleMappingChange = (fileColumn: string, categoryField: string | null) => {
    setColumnMapping({ ...columnMapping, [fileColumn]: categoryField });
  };

  const autoDetectMapping = () => {
    const newMapping: ColumnMapping = {};
    const allFields = [...requiredFields, ...optionalFields];

    fileHeaders.forEach((header) => {
      const headerLower = header.toLowerCase().trim().replace(/[_\-\s]/g, "");
      
      let bestMatch: string | null = null;
      let bestScore = 0;

      allFields.forEach((field) => {
        const fieldLower = field.toLowerCase().replace(/[_\-\s]/g, "");
        let score = 0;
        
        if (headerLower === fieldLower) {
          score = 100;
        } else if (headerLower.includes(fieldLower) || fieldLower.includes(headerLower)) {
          score = 80;
        } else {
          if ((headerLower.includes("parent") || headerLower.includes("parentname")) && fieldLower === "parentname") {
            score = 75;
          } else if ((headerLower.includes("color")) && fieldLower === "color") {
            score = 75;
          } else if ((headerLower.includes("icon")) && fieldLower === "icon") {
            score = 75;
          } else if ((headerLower.includes("desc") || headerLower.includes("description")) && fieldLower === "description") {
            score = 75;
          } else if ((headerLower.includes("slug")) && fieldLower === "slug") {
            score = 75;
          }
        }

        if (score > bestScore) {
          bestMatch = field;
          bestScore = score;
        }
      });

      if (bestMatch) {
        newMapping[header] = bestMatch;
      }
    });

    setColumnMapping(newMapping);
  };

  const handleImport = async () => {
    console.log("handleImport called");
    console.log("columnMapping:", columnMapping);
    console.log("requiredFields:", requiredFields);
    
    const missingRequired = requiredFields.filter((field) => !Object.values(columnMapping).includes(field));
    console.log("missingRequired:", missingRequired);
    
    if (missingRequired.length > 0) {
      setError(`Missing required fields: ${missingRequired.join(", ")}`);
      return;
    }

    setImporting(true);
    setError("");

    try {
      console.log("Sending import request...");
      console.log("parsedData length:", parsedData.length);
      console.log("mapping:", columnMapping);
      
      const response = await fetch("/api/admin/import-categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: parsedData, mapping: columnMapping }),
      });

      console.log("Response status:", response.status);
      const result = await response.json();
      console.log("Response result:", result);

      if (!response.ok) {
        throw new Error(result.error || "Import failed");
      }

      setImportResult(result);
      setStep("complete");
    } catch (err) {
      console.error("Import error:", err);
      setError(err instanceof Error ? err.message : "Import failed");
    } finally {
      setImporting(false);
    }
  };

  const downloadTemplate = () => {
    const template = `name,slug,description,icon,color,parentName
Immunology & Detection,immunology-and-detection,Product line for immunology,FaSyringe,#7B1FA2,
Antibodies,antibodies,Antibody products,,#7B1FA2,Immunology & Detection`;

    const blob = new Blob([template], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "category-import-template.csv";
    a.click();
  };

  const deleteAllCategories = async () => {
    if (!window.confirm("Are you sure you want to delete ALL categories? This cannot be undone.")) {
      return;
    }

    try {
      setError("");
      const response = await fetch("/api/admin/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ deleteAll: true }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Delete failed");
      }

      setError("");
      alert("All categories deleted successfully");
      setStep("upload");
      setFile(null);
      setParsedData([]);
      setColumnMapping({});
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  };

  return (
    <div>
      {step === "upload" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Import Categories</h1>
            <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
              Bulk import categories from CSV or Excel file with automatic column mapping
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
              <div style={{ fontSize: "36px", marginBottom: "12px" }}>📁</div>
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
                <li>Prepare a CSV or Excel file with your categories</li>
                <li>Required columns: <strong>name, slug</strong></li>
                <li>Optional: description, icon, color, parentName</li>
                <li>Unique parent category names for hierarchy</li>
                <li>Max 500 categories per import</li>
                <li>Duplicate categories will be skipped</li>
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
                  marginBottom: "8px",
                }}
              >
                <FaDownload /> Download Template
              </button>
              <button
                onClick={deleteAllCategories}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "10px 16px",
                  background: "#fee2e2",
                  border: "1px solid #fca5a5",
                  borderRadius: "8px",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: "#991b1b",
                  cursor: "pointer",
                }}
              >
                🗑️ Delete All Categories
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

      {step === "map" && (
        <div>
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <h1 style={{ fontSize: "24px", fontWeight: 700, color: "#1a1a2e", margin: 0 }}>Map Columns</h1>
                <p style={{ color: "#888", fontSize: "14px", margin: "4px 0 0" }}>
                  Match your file columns to category fields
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

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", padding: "24px", marginBottom: "24px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              {fileHeaders.map((header) => (
                <div key={header}>
                  <label style={{ display: "block", fontSize: "13px", fontWeight: 600, color: "#333", marginBottom: "8px" }}>
                    {header}
                  </label>
                  <select
                    value={columnMapping[header] || ""}
                    onChange={(e) => handleMappingChange(header, e.target.value || null)}
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "8px",
                      fontSize: "13px",
                      background: "#fff",
                      cursor: "pointer",
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
                </div>
              ))}
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
              Review your data before importing ({parsedData.length} categories)
            </p>
          </div>

          <div style={{ background: "#fff", borderRadius: "12px", border: "1px solid #f0f0f0", overflow: "hidden", marginBottom: "24px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px" }}>
              <thead style={{ background: "#fafafa" }}>
                <tr>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Name</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Slug</th>
                  <th style={{ padding: "12px", textAlign: "left", fontWeight: 600, color: "#666", borderBottom: "1px solid #f0f0f0" }}>Parent</th>
                </tr>
              </thead>
              <tbody>
                {parsedData.slice(0, 10).map((row, idx) => {
                  const nameCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "name");
                  const slugCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "slug");
                  const parentCol = Object.keys(columnMapping).find((col) => columnMapping[col] === "parentName");
                  return (
                    <tr key={idx} style={{ borderBottom: "1px solid #f5f5f5" }}>
                      <td style={{ padding: "12px", color: "#333" }}>{row[nameCol || ""] || "—"}</td>
                      <td style={{ padding: "12px", color: "#666", fontFamily: "monospace", fontSize: "12px" }}>{row[slugCol || ""] || "—"}</td>
                      <td style={{ padding: "12px", color: "#666" }}>{row[parentCol || ""] || "—"}</td>
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
              disabled={importing}
              style={{
                padding: "10px 20px",
                background: "#2D2B7F",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 600,
                cursor: importing ? "not-allowed" : "pointer",
                opacity: importing ? 0.7 : 1,
              }}
            >
              {importing ? "Importing..." : "Import Categories"}
            </button>
          </div>
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
              <p style={{ fontWeight: 600, color: "#166534", margin: 0 }}>Import successful!</p>
              <p style={{ color: "#166534", fontSize: "13px", margin: "4px 0 0" }}>
                {importResult.created} categories created, {importResult.skipped} skipped
              </p>
            </div>
          </div>

          {importResult.errors.length > 0 && (
            <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "12px", padding: "20px", marginBottom: "24px" }}>
              <p style={{ fontWeight: 600, color: "#991b1b", margin: "0 0 12px" }}>Errors ({importResult.errors.length})</p>
              <ul style={{ margin: 0, paddingLeft: "20px", color: "#991b1b", fontSize: "13px" }}>
                {importResult.errors.slice(0, 5).map((err, idx) => (
                  <li key={idx}>Row {err.row}: {err.message}</li>
                ))}
              </ul>
              {importResult.errors.length > 5 && (
                <p style={{ color: "#991b1b", fontSize: "13px", margin: "8px 0 0" }}>... and {importResult.errors.length - 5} more</p>
              )}
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
              href="/admin/categories"
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
              View Categories
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
