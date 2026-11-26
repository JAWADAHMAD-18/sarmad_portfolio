import { cache } from "react";
import raw from "@/docs/content.json";
import { contentSchema, type Content } from "./schema";

function assertServer() {
  if (typeof window !== "undefined") {
    throw new Error("Content loaders can only run on the server.");
  }
}

export const getContent = cache((): Content => {
  assertServer();
  const parsed = contentSchema.safeParse(raw);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");
    throw new Error(`content.json failed validation:\n${details}`);
  }
  return parsed.data;
});
