import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Raghul S — Founding Engineer @ Velt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#09090b",
          fontFamily: "monospace",
        }}
      >
        {/* Subtle grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        {/* Accent glow */}
        <div
          style={{
            position: "absolute",
            width: 600,
            height: 300,
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
            zIndex: 1,
          }}
        >
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              margin: 0,
            }}
          >
            raghuls.dev
          </p>

          <h1
            style={{
              fontSize: 80,
              fontWeight: 700,
              color: "#ffffff",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Raghul S
          </h1>

          <div
            style={{
              width: 80,
              height: 3,
              background: "linear-gradient(90deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1))",
              borderRadius: 9999,
            }}
          />

          <p
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              letterSpacing: "0.02em",
            }}
          >
            Founding Engineer @ Velt
          </p>
        </div>
      </div>
    ),
    { ...size }
  );
}
