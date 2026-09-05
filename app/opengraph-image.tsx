import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} portfolio preview`;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background:
            "radial-gradient(circle at top right, rgba(255,85,0,0.18), transparent 45%), linear-gradient(135deg, #050505 0%, #0d0d0d 55%, #171717 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 32,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 24,
          }}
        />
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "54px 64px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                border: "1px solid rgba(255,85,0,0.4)",
                background: "rgba(255,85,0,0.1)",
                borderRadius: 9999,
                padding: "8px 20px",
                fontSize: 20,
                color: "#ff5500",
                fontWeight: 700,
                letterSpacing: 2,
              }}
            >
              {`${siteConfig.siteName.toUpperCase()} // FOLIO 2026`}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 20,
                color: "rgba(255,255,255,0.6)",
                letterSpacing: 1,
              }}
            >
              AGARTALA, TRIPURA, INDIA
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 76,
                fontWeight: 900,
                lineHeight: 1,
                letterSpacing: -2,
                color: "#ffffff",
              }}
            >
              {siteConfig.name}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 32,
                color: "#ff5500",
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {siteConfig.jobTitle}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                lineHeight: 1.4,
                color: "rgba(255,255,255,0.85)",
                maxWidth: 1000,
              }}
            >
              High-performance web apps, AI integrations & scalable custom software in Agartala, Tripura — with Next.js, React, FastAPI, Python, and AWS.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            {["Next.js 16", "React 19", "FastAPI", "Python", "AWS", "Budget Dev", "Agartala"].map(
              (label) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    border: "1px solid rgba(255,255,255,0.16)",
                    background: "rgba(255,255,255,0.06)",
                    borderRadius: 9999,
                    padding: "10px 22px",
                    fontSize: 20,
                    color: "rgba(255,255,255,0.85)",
                    fontWeight: 600,
                  }}
                >
                  {label}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    ),
    size
  );
}
