import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Work365 — Kurucular için hepsi bir arada iş platformu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px",
          background: "linear-gradient(135deg, #0F172A 0%, #14365a 55%, #1b98d5 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 16,
              background: "#1b98d5",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 800,
              color: "#ffffff",
            }}
          >
            W
          </div>
          <div style={{ display: "flex", fontSize: 40, fontWeight: 800, color: "#ffffff", letterSpacing: -1 }}>
            Work365
          </div>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.15,
            letterSpacing: -2,
            maxWidth: 920,
          }}
        >
          Şirketini kur, dijitalleş, işini büyüt.
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
            maxWidth: 860,
          }}
        >
          Kurucular için hepsi bir arada iş platformu
        </div>
      </div>
    ),
    { ...size }
  );
}
