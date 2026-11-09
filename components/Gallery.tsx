"use client";
import { useState } from "react";
import { imgSrc } from "@/lib/format";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const list = images.length ? images : [""];
  return (
    <div className="grid gap-3 min-w-0 md:grid-cols-[72px_minmax(0,1fr)]">
      <div className="order-2 flex gap-2 overflow-x-auto md:order-1 md:flex-col md:overflow-visible">
        {list.map((src, n) => (
          <button key={n} onClick={() => setI(n)} aria-label={`صورة ${n + 1}`} aria-current={n === i}
            className={`h-[88px] w-[66px] shrink-0 bg-tile ${n === i ? "outline outline-1 outline-ink" : "opacity-70 hover:opacity-100"}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imgSrc(src, 160)} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-full w-full object-cover" />
          </button>
        ))}
      </div>
      <div className="relative order-1 aspect-[3/4] min-w-0 overflow-hidden bg-tile md:order-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imgSrc(list[i], 1000)} alt={alt} referrerPolicy="no-referrer" className="absolute inset-0 h-full w-full object-cover" />
      </div>
    </div>
  );
}
