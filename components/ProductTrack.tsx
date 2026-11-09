"use client";
import { useEffect } from "react";

/** Counts one view per browser session. */
export default function ProductTrack({ id }: { id: string }) {
  useEffect(() => {
    try {
      const k = `v:${id}`;
      if (sessionStorage.getItem(k)) return;
      sessionStorage.setItem(k, "1");
    } catch { /* private mode: server de-dupes anyway */ }
    fetch(`/api/products/${encodeURIComponent(id)}/view`, { method: "POST", keepalive: true }).catch(() => {});
  }, [id]);
  return null;
}
