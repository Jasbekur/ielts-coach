"use client";

import { useEffect, useCallback } from "react";

/**
 * Persists a draft object to localStorage under `key`.
 * Call `save(data)` whenever state changes.
 * Call `load()` on mount to restore.
 * Call `clear()` after a successful submit.
 */
export function useLocalDraft<T>(key: string) {
  const save = useCallback((data: T) => {
    try { localStorage.setItem(key, JSON.stringify(data)); } catch { /* quota */ }
  }, [key]);

  const load = useCallback((): T | null => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch { return null; }
  }, [key]);

  const clear = useCallback(() => {
    try { localStorage.removeItem(key); } catch { /* ignore */ }
  }, [key]);

  return { save, load, clear };
}
