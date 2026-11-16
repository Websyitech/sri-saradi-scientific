"use client";

import React, { useState, useEffect, useRef } from "react";
import { FaPause, FaPlay, FaCheckCircle, FaTimesCircle, FaExclamationCircle } from "react-icons/fa";

interface SkipReason {
  row: number;
  catalogNumber: string;
  name: string;
  message: string;
}

interface TrackingData {
  current: number;
  total: number;
  created: number;
  skipped: number;
  status: string;
  errors: SkipReason[];
}

export default function ImportTrackingPage() {
  const [tracking, setTracking] = useState<TrackingData>({
    current: 0,
    total: 0,
    created: 0,
    skipped: 0,
    status: "Waiting for import...",
    errors: [],
  });
  const [isPaused, setIsPaused] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const eventSourceRef = useRef<EventSource | null>(null);
  const pauseRequestRef = useRef(false);

  useEffect(() => {
    const importId = new URLSearchParams(window.location.search).get("importId");
    if (!importId) {
      return;
    }

    const connectToStream = () => {
      const eventSource = new EventSource(`/api/admin/import-tracking-stream?importId=${importId}`);
      eventSourceRef.current = eventSource;

      eventSource.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          
          setTracking((prev) => ({
            ...prev,
            current: data.current || prev.current,
            total: data.total || prev.total,
            created: data.created || prev.created,
            skipped: data.skipped || prev.skipped,
            status: data.status || prev.status,
            errors: data.errors ? data.errors.map((err: any) => ({
              row: err.row,
              catalogNumber: err.catalogNumber,
              name: err.name,
              message: err.message,
            })) : prev.errors,
          }));
        } catch (err) {
          console.error("Error parsing tracking data:", err);
        }
      };

      eventSource.onerror = () => {
        eventSource.close();
        setIsImporting(false);
      };

      setIsImporting(true);
    };

    connectToStream();

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, []);

  const handlePause = () => {
    setIsPaused(true);
    pauseRequestRef.current = true;
    // Send pause request to API
    fetch("/api/admin/import-pause", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleResume = () => {
    setIsPaused(false);
    pauseRequestRef.current = false;
    // Send resume request to API
    fetch("/api/admin/import-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
  };

  const handleStop = () => {
    setIsImporting(false);
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
    }
    window.close();
  };

  const percentage = tracking.total > 0 ? Math.round((tracking.current / tracking.total) * 100) : 0;

  const groupedErrors = tracking.errors.reduce((acc, error) => {
    const reason = error.message.split(":")[0] || "Unknown";
    if (!acc[reason]) {
      acc[reason] = [];
    }
    acc[reason].push(error);
    return acc;
  }, {} as Record<string, SkipReason[]>);

  return (
    <div style={{ padding: "32px", background: "#fff", minHeight: "100vh" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "28px", fontWeight: 700, color: "#1a1a2e", margin: "0 0 8px" }}>
            Import Progress Tracker
          </h1>
          <p style={{ color: "#666", margin: 0 }}>Real-time monitoring of product import</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "32px" }}>
          {/* Progress Card */}
          <div style={{ background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: "12px", padding: "24px" }}>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#666", margin: "0 0 16px" }}>PROGRESS</p>
            
            <div style={{ marginBottom: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                <span style={{ fontSize: "14px", color: "#333", fontWeight: 500 }}>
                  {tracking.current} / {tracking.total}
                </span>
                <span style={{ fontSize: "14px", color: "#2D2B7F", fontWeight: 700 }}>
                  {percentage}%
                </span>
              </div>
              <div style={{
                width: "100%",
                height: "12px",
                background: "#e0e0e0",
                borderRadius: "6px",
                overflow: "hidden",
              }}>
                <div
                  style={{
                    height: "100%",
                    background: "#2D2B7F",
                    width: `${percentage}%`,
                    transition: "width 0.3s ease",
                  }}
                />
              </div>
            </div>

            <p style={{ color: "#666", fontSize: "12px", margin: "12px 0 0" }}>
              {tracking.status}
            </p>
          </div>

          {/* Stats Card */}
          <div style={{ display: "grid", gridTemplateRows: "1fr 1fr", gap: "16px" }}>
            <div style={{ background: "#dcfce7", border: "1px solid #86efac", borderRadius: "12px", padding: "16px" }}>
              <p style={{ fontSize: "11px", color: "#166534", margin: "0 0 4px", fontWeight: 600 }}>CREATED</p>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "#16a34a", margin: 0 }}>
                {tracking.created}
              </p>
            </div>
            <div style={{ background: "#fef3c7", border: "1px solid #fde047", borderRadius: "12px", padding: "16px" }}>
              <p style={{ fontSize: "11px", color: "#92400e", margin: "0 0 4px", fontWeight: 600 }}>SKIPPED</p>
              <p style={{ fontSize: "24px", fontWeight: 700, color: "#f59e0b", margin: 0 }}>
                {tracking.skipped}
              </p>
            </div>
          </div>
        </div>

        {/* Control Buttons */}
        <div style={{ marginBottom: "32px", display: "flex", gap: "12px" }}>
          {!isPaused ? (
            <button
              onClick={handlePause}
              disabled={!isImporting}
              style={{
                padding: "12px 24px",
                background: isImporting ? "#f59e0b" : "#ccc",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: isImporting ? "pointer" : "not-allowed",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaPause /> Pause
            </button>
          ) : (
            <button
              onClick={handleResume}
              style={{
                padding: "12px 24px",
                background: "#10b981",
                border: "none",
                borderRadius: "8px",
                color: "#fff",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <FaPlay /> Resume
            </button>
          )}
          <button
            onClick={handleStop}
            style={{
              padding: "12px 24px",
              background: "#dc2626",
              border: "none",
              borderRadius: "8px",
              color: "#fff",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            ✕ Stop
          </button>
        </div>

        {/* Skip Reasons */}
        {tracking.errors.length > 0 && (
          <div style={{ background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "12px", padding: "24px" }}>
            <p style={{ fontSize: "16px", fontWeight: 600, color: "#991b1b", margin: "0 0 16px" }}>
              ⚠️ Skip Reasons ({tracking.errors.length})
            </p>

            <div style={{ maxHeight: "800px", overflowY: "auto" }}>
              {Object.entries(groupedErrors).map(([reason, errors]) => (
                <div key={reason} style={{ marginBottom: "20px" }}>
                  <div style={{ background: "#fff3cd", padding: "12px", borderRadius: "8px", marginBottom: "12px", borderLeft: "4px solid #f59e0b" }}>
                    <p style={{ margin: 0, fontWeight: 600, color: "#92400e", fontSize: "13px" }}>
                      {reason} ({errors.length})
                    </p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "8px" }}>
                    {errors.map((error, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "#fff",
                          border: "1px solid #fca5a5",
                          borderRadius: "8px",
                          padding: "12px",
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <FaExclamationCircle style={{ color: "#dc2626", fontSize: "16px", flexShrink: 0, marginTop: "2px" }} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{ fontWeight: 600, color: "#333", margin: "0 0 4px", fontSize: "12px" }}>
                            Row {error.row}
                          </p>
                          <p style={{ color: "#333", margin: "0 0 4px", fontSize: "11px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                            {error.name}
                          </p>
                          <p style={{ color: "#666", margin: 0, fontSize: "11px", fontFamily: "monospace" }}>
                            {error.catalogNumber}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
