"use client";
import { useEffect, useRef, useState } from "react";

/** Image that shows a shimmering skeleton until it has loaded, then fades in. The wrapper's size must be set by the parent. */
export default function FadeImg({ src, alt, className = "", eager = false }: { src: string; alt: string; className?: string; eager?: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // already cached / loaded before hydration
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth > 0) setLoaded(true);
  }, []);

  return (
    <>
      {!loaded && <span className={`skeleton absolute inset-0 ${failed ? "!animate-none" : ""}`} aria-hidden />}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref} src={src} alt={alt} loading={eager ? "eager" : "lazy"} decoding="async" referrerPolicy="no-referrer"
        onLoad={() => setLoaded(true)} onError={() => { setFailed(true); setLoaded(true); }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"} ${className}`}
      />
    </>
  );
}
