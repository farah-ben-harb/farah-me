import { ImageResponse } from "next/og";

import { siteConfig } from "@/lib/site";

export const alt = siteConfig.description;
export const contentType = "image/png";
export const size = {
  width: 1200,
  height: 630,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #17392c 0%, #0e261d 65%, #214635 100%)",
          color: "#f7f3df",
          display: "flex",
          flexDirection: "column",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            borderBottom: "2px solid #648360",
            color: "#d7ef9d",
            display: "flex",
            fontFamily: "sans-serif",
            fontSize: 32,
            fontWeight: 700,
            letterSpacing: 0,
            marginBottom: 48,
            paddingBottom: 16,
            width: "100%",
          }}
        >
          FBH / ENGINEERING PORTFOLIO
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 86,
              fontWeight: 700,
              letterSpacing: 0,
              lineHeight: 1,
            }}
          >
            Farah Ben Harb
          </div>
          <div
            style={{
            color: "#bfd0c1",
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 34,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Cloud · DevOps · MLOps
          </div>
        </div>
      </div>
    ),
    size,
  );
}
