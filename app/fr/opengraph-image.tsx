import { ImageResponse } from "next/og";

export const alt = "Farah Ben Harb — Cloud, DevOps, ingénierie de plateforme et MLOps";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export default function FrenchOpenGraphImage() {
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 70, color: "#eaf0f3", background: "radial-gradient(ellipse at 86% 22%, #163a40 0%, #0a151b 42%, #081116 100%)", fontFamily: "sans-serif" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 18, color: "#80e4de", fontSize: 22, letterSpacing: 5 }}><span style={{ display: "flex", width: 42, height: 42, alignItems: "center", justifyContent: "center", border: "1px solid #80e4de", borderRadius: 24 }}>F</span> FARAH BEN HARB <span style={{ marginLeft: "auto", color: "#e7bf87", fontSize: 16, letterSpacing: 2 }}>INGÉNIERIE / SYSTÈMES</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}><div style={{ color: "#80e4de", fontSize: 18, letterSpacing: 4 }}>CLOUD · PLATEFORME · FIABILITÉ</div><div style={{ maxWidth: 1000, fontSize: 66, lineHeight: 1.08, fontWeight: 600, letterSpacing: -3 }}>Concevoir des systèmes logiciels fiables.</div><div style={{ color: "#a8b9bf", fontSize: 27, lineHeight: 1.4 }}>Cloud, DevOps, DevSecOps, Kubernetes, SRE &amp; MLOps</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", color: "#71858c", fontSize: 17, letterSpacing: 2 }}><span>farah-me.vercel.app</span><span>FR / EN</span></div>
    </div>, size,
  );
}
