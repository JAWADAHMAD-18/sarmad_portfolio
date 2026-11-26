export function splitHeadline(headline: string): {
  title: string;
  subtitle: string | null;
} {
  const separator = " | ";
  const index = headline.indexOf(separator);
  if (index === -1) {
    return { title: headline.trim(), subtitle: null };
  }

  const title = headline.slice(0, index).trim();
  const subtitle = headline.slice(index + separator.length).trim();
  if (!title) return { title: headline.trim(), subtitle: null };

  return { title, subtitle: subtitle.length > 0 ? subtitle : null };
}
