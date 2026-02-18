"use client";

import { useState, useEffect, useCallback } from "react";

interface UseAutoRefreshOptions {
  interval?: number;
  enabled?: boolean;
}

export function useAutoRefresh<T>(
  fetcher: () => Promise<T>,
  options: UseAutoRefreshOptions = {}
) {
  const { interval = 15000, enabled = true } = options;
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const result = await fetcher();
      setData(result);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  useEffect(() => {
    refresh();
    
    if (enabled) {
      const id = setInterval(refresh, interval);
      return () => clearInterval(id);
    }
  }, [refresh, interval, enabled]);

  return { data, loading, error, lastUpdated, refresh };
}
