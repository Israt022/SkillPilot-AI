"use client";

import { useCallback, useEffect, useState } from "react";
import NetworkError from "./NetworkError";

export default function NetworkMonitor({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOffline, setIsOffline] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  useEffect(() => {
    const updateConnection = () => {
      setIsOffline(!navigator.onLine);
    };

    updateConnection();

    window.addEventListener("online", updateConnection);
    window.addEventListener("offline", updateConnection);

    return () => {
      window.removeEventListener("online", updateConnection);
      window.removeEventListener("offline", updateConnection);
    };
  }, []);

  const handleRetry = useCallback(async () => {
    setIsRetrying(true);

    try {
      if (!navigator.onLine) {
        setIsOffline(true);
        return;
      }

      const controller = new AbortController();
      const timeoutId = window.setTimeout(
        () => controller.abort(),
        5000,
      );

      try {
        const response = await fetch(
          `/api/health?retry=${Date.now()}`,
          {
            method: "GET",
            cache: "no-store",
            signal: controller.signal,
          },
        );

        setIsOffline(!response.ok);
      } finally {
        window.clearTimeout(timeoutId);
      }
    } catch {
      setIsOffline(true);
    } finally {
      setIsRetrying(false);
    }
  }, []);

  if (isOffline) {
    return <NetworkError onRetry={handleRetry} isRetrying={isRetrying} />;
  }

  return <>{children}</>;
}