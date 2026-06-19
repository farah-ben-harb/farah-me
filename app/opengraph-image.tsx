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
          background: "#f7f8f3",
          color: "#12302b",
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
            borderBottom: "2px solid #047857",
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
          AB
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
            Aziz Ben Ammar
          </div>
          <div
            style={{
              color: "#41645d",
              display: "flex",
              fontFamily: "sans-serif",
              fontSize: 34,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            Backend, AI, microservices, and platform engineering student based in Tunis.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
