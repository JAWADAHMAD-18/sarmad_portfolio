export function formatPhoneDisplay(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.startsWith("92") && digits.length === 12) {
    return `+92 ${digits.slice(2, 5)} ${digits.slice(5)}`;
  }
  return raw;
}
