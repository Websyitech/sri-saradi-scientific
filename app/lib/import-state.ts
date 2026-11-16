interface ImportState {
  importId: string;
  isPaused: boolean;
  startTime: number;
}

const importStates = new Map<string, ImportState>();

export function createImportState(importId: string): string {
  importStates.set(importId, {
    importId,
    isPaused: false,
    startTime: Date.now(),
  });
  return importId;
}

export function getImportState(importId: string): ImportState | undefined {
  return importStates.get(importId);
}

export function setImportPaused(importId: string, isPaused: boolean): void {
  const state = importStates.get(importId);
  if (state) {
    state.isPaused = isPaused;
  }
}

export function deleteImportState(importId: string): void {
  importStates.delete(importId);
}
