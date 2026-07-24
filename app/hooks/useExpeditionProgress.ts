"use client";

import { useCallback, useEffect, useState } from "react";
import { STORAGE_KEY } from "../data/expedition";

export type ExpeditionProgress = {
  started: boolean;
  packedItems: string[];
  elevation: number;
  soundEnabled: boolean;
  reducedMotion: boolean;
};

const DEFAULT_PROGRESS: ExpeditionProgress = {
  started: false,
  packedItems: [],
  elevation: 1240,
  soundEnabled: false,
  reducedMotion: false,
};

export function useExpeditionProgress() {
  const [progress, setProgress] = useState(DEFAULT_PROGRESS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setProgress({ ...DEFAULT_PROGRESS, ...JSON.parse(saved) });
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress, hydrated]);

  const update = useCallback((patch: Partial<ExpeditionProgress>) => {
    setProgress((current) => ({ ...current, ...patch }));
  }, []);

  const restart = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setProgress(DEFAULT_PROGRESS);
  }, []);

  return { progress, update, restart, hydrated };
}
