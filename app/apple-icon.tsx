import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0F7B5F",
          color: "#FFFFFF",
          borderRadius: "36px",
          fontFamily: "Georgia, serif",
          fontSize: "84px",
          letterSpacing: "-2px",
        }}
      >
        SA
      </div>
    ),
    {
      ...size,
    },
  );
}
