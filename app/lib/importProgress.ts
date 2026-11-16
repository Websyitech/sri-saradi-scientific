// In-memory progress for bulk product imports, shared by the import and tracking routes.
export const activeImports = new Map<string, {
  current: number;
  total: number;
  created: number;
  skipped: number;
  status: string;
  errors: Array<{ row: number; catalogNumber: string; name: string; message: string }>;
}>();

export function registerImportProgress(
  importId: string,
  current: number,
  total: number,
  created: number,
  skipped: number,
  status: string,
  errors: Array<{ row: number; message: string }>
) {
  if (!activeImports.has(importId)) {
    activeImports.set(importId, {
      current: 0,
      total,
      created: 0,
      skipped: 0,
      status: "Starting...",
      errors: [],
    });
  }

  const data = activeImports.get(importId)!;
  data.current = current;
  data.created = created;
  data.skipped = skipped;
  data.status = status;

  errors.forEach((err) => {
    if (!data.errors.some((e) => e.row === err.row)) {
      const parts = err.message.split(" - ");
      data.errors.push({
        row: err.row,
        catalogNumber: parts[0] || "N/A",
        name: parts[1] || "N/A",
        message: parts.slice(2).join(" - ") || err.message,
      });
    }
  });
}
