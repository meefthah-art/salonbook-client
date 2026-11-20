"use client";
import { useState } from "react";

const FALLBACK =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    "<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect width='100%' height='100%' fill='#EBDDE3'/><circle cx='400' cy='235' r='46' fill='none' stroke='#B4467B' stroke-width='8'/><text x='400' y='345' fill='#7a5a6c' font-family='serif' font-size='30' text-anchor='middle'>SalonBook</text></svg>"
  );

export default function SafeImg({ src, alt = "", className = "" }) {
  const [broken, setBroken] = useState(false);
  return (
    <img
      src={broken || !src ? FALLBACK : src}
      alt={alt}
      className={className}
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
    />
  );
}
