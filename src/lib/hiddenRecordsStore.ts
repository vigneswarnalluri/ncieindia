"use client";

const HIDDEN_STORAGE_KEY = "ncie_hidden_reg_ids_cache";
const HIDDEN_EVENT_NAME = "ncie_hidden_records_updated";

let memoryHiddenIds: Set<string> | null = null;
let isFetchingPromise: Promise<Set<string>> | null = null;

/**
 * Read cached hidden IDs from localStorage
 */
export function getLocalCachedHiddenIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(HIDDEN_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) {
        return new Set(parsed);
      }
    }
  } catch (e) {
    console.warn("Error reading hidden IDs from localStorage:", e);
  }
  return new Set();
}

/**
 * Write hidden IDs to local storage and dispatch update event
 */
export function saveLocalHiddenIds(ids: string[] | Set<string>): void {
  if (typeof window === "undefined") return;
  const arr = Array.from(ids);
  memoryHiddenIds = new Set(arr);
  try {
    localStorage.setItem(HIDDEN_STORAGE_KEY, JSON.stringify(arr));
    window.dispatchEvent(
      new CustomEvent(HIDDEN_EVENT_NAME, {
        detail: { hiddenIds: arr },
      })
    );
  } catch (e) {
    console.warn("Error saving hidden IDs to localStorage:", e);
  }
}

/**
 * Fetch hidden records from server API
 */
export async function fetchServerHiddenIds(): Promise<Set<string>> {
  if (typeof window === "undefined") return new Set();

  if (isFetchingPromise) {
    return isFetchingPromise;
  }

  isFetchingPromise = (async () => {
    try {
      const res = await fetch("/api/records/hidden", {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      });
      if (res.ok) {
        const data = await res.json();
        if (data && Array.isArray(data.hiddenIds)) {
          const newSet = new Set<string>(data.hiddenIds);
          saveLocalHiddenIds(newSet);
          return newSet;
        }
      }
    } catch (err) {
      console.warn("Failed to fetch hidden records from server API:", err);
    } finally {
      isFetchingPromise = null;
    }

    const fallback = getLocalCachedHiddenIds();
    memoryHiddenIds = fallback;
    return fallback;
  })();

  return isFetchingPromise;
}

/**
 * Toggle hide/unhide status for a registration ID
 */
export async function toggleHideRegistration(
  regId: string,
  userEmail?: string
): Promise<{ success: boolean; isHidden: boolean; hiddenIds: string[] }> {
  if (!regId) return { success: false, isHidden: false, hiddenIds: [] };

  const current = memoryHiddenIds || getLocalCachedHiddenIds();
  const willBeHidden = !current.has(regId);
  const updated = new Set(current);

  if (willBeHidden) {
    updated.add(regId);
  } else {
    updated.delete(regId);
  }

  saveLocalHiddenIds(updated);

  try {
    const res = await fetch("/api/records/hidden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: willBeHidden ? "hide" : "unhide",
        regIds: [regId],
        userEmail: userEmail || "vigneswarnalluri10@gmail.com",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.hiddenIds)) {
        saveLocalHiddenIds(new Set(data.hiddenIds));
        return {
          success: true,
          isHidden: willBeHidden,
          hiddenIds: data.hiddenIds,
        };
      }
    }
  } catch (err) {
    console.error("Failed to sync hide action with server:", err);
  }

  return {
    success: true,
    isHidden: willBeHidden,
    hiddenIds: Array.from(updated),
  };
}

/**
 * Batch update hide status for multiple registration IDs
 */
export async function batchUpdateHiddenRegistrations(
  regIds: string[],
  action: "hide" | "unhide",
  userEmail?: string
): Promise<{ success: boolean; hiddenIds: string[] }> {
  if (!regIds || regIds.length === 0) return { success: true, hiddenIds: [] };

  const current = memoryHiddenIds || getLocalCachedHiddenIds();
  const updated = new Set(current);

  if (action === "hide") {
    regIds.forEach((id) => updated.add(id));
  } else {
    regIds.forEach((id) => updated.delete(id));
  }

  saveLocalHiddenIds(updated);

  try {
    const res = await fetch("/api/records/hidden", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: action === "hide" ? "batch_hide" : "batch_unhide",
        regIds,
        userEmail: userEmail || "vigneswarnalluri10@gmail.com",
      }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && Array.isArray(data.hiddenIds)) {
        saveLocalHiddenIds(new Set(data.hiddenIds));
        return { success: true, hiddenIds: data.hiddenIds };
      }
    }
  } catch (err) {
    console.error("Failed to sync batch hide action with server:", err);
  }

  return { success: true, hiddenIds: Array.from(updated) };
}

/**
 * React hook or listener registration helper
 */
export function subscribeToHiddenUpdates(callback: (hiddenIds: Set<string>) => void): () => void {
  if (typeof window === "undefined") return () => {};

  const handler = (e: Event) => {
    const custom = e as CustomEvent<{ hiddenIds: string[] }>;
    if (custom.detail?.hiddenIds) {
      callback(new Set(custom.detail.hiddenIds));
    } else {
      callback(getLocalCachedHiddenIds());
    }
  };

  window.addEventListener(HIDDEN_EVENT_NAME, handler);
  return () => {
    window.removeEventListener(HIDDEN_EVENT_NAME, handler);
  };
}
