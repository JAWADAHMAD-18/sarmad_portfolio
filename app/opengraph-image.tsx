import { readFileSync } from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getPublicContent } from "@/lib/getPublicContent";

export const alt = "Sarmad Ali — ACCA Finalist and Junior Accountant";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

function loadPortraitDataUri(photoSrc: string | undefined): string | null {
  if (!photoSrc) return null;
  try {
    const cleanName = photoSrc.replace(/^\/+/, "");
    const filePath = path.join(process.cwd(), "public", cleanName);
    const buffer = readFileSync(filePath);
    const ext = path.extname(cleanName).toLowerCase();
    const mime =
      ext === ".jpg" || ext === ".jpeg"
        ? "image/jpeg"
        : ext === ".webp"
          ? "image/webp"
          : "image/png";
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default function OpenGraphImage() {
  const content = getPublicContent();
  const portraitUri = loadPortraitDataUri(content.meta.photo?.src);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#FAFAF7",
          color: "#0B1B2E",
          padding: "64px 72px",
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Left Column */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            width: portraitUri ? "64%" : "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontSize: "18px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#0F7B5F",
              fontFamily: "monospace",
            }}
          >
            <span>PORTFOLIO</span>
            <span style={{ color: "#5B6675" }}>·</span>
            <span style={{ color: "#5B6675" }}>UK TAXATION</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "76px",
                lineHeight: 1.0,
                letterSpacing: "-0.02em",
                color: "#0B1B2E",
              }}
            >
              {content.meta.name}
            </div>
            <div
              style={{
                marginTop: "14px",
                fontSize: "34px",
                lineHeight: 1.2,
                color: "#5B6675",
              }}
            >
              {content.meta.title}
            </div>

            {/* Ledger Double Rule */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "28px",
                width: "180px",
              }}
            >
              <div style={{ height: "2px", backgroundColor: "#0B1B2E" }} />
              <div
                style={{
                  height: "1px",
                  marginTop: "5px",
                  backgroundColor: "#E4E4DD",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              fontSize: "18px",
              color: "#5B6675",
              fontFamily: "monospace",
            }}
          >
            <span>{content.acca.level}</span>
            <span>·</span>
            <span>{content.experience.items[0]?.company ?? ""}</span>
          </div>
        </div>

        {/* Right Column: Portrait if available */}
        {portraitUri ? (
          <div
            style={{
              display: "flex",
              width: "320px",
              height: "420px",
              borderRadius: "16px",
              overflow: "hidden",
              border: "1px solid #E4E4DD",
              backgroundColor: "#FFFFFF",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={portraitUri}
              alt={content.meta.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "50% 15%",
              }}
            />
          </div>
        ) : null}
      </div>
    ),
    {
      ...size,
    },
  );
}
