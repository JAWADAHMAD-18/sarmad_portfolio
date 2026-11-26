import { AccaPath } from "./acca-path";

export function Credentials({
  items,
  acca,
}: {
  items: Array<{
    label: string;
    value: string;
    numeric: boolean;
  }>;
  acca?: {
    level: string | null;
    levelNote?: string | null;
    institute?: string | null;
    since?: string | null;
  } | null;
}) {
  const validItems = items.filter(
    (item) =>
      item.label &&
      item.label.trim().length > 0 &&
      item.value &&
      item.value.trim().length > 0,
  );

  if (validItems.length === 0 && !acca?.level) return null;

  return (
    <section className="shell my-4 md:my-6" aria-label="Key facts and ACCA path">
      <div className="border-y border-line py-7 md:py-9">
        {validItems.length > 0 ? (
          <dl className="grid grid-cols-2 gap-6 sm:gap-8 md:grid-cols-4 md:gap-10">
            {validItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                <dt className="font-mono text-xs uppercase tracking-wider text-muted">
                  {item.label}
                </dt>
                <dd
                  className={`mt-1.5 font-serif text-xl tracking-tight text-ink sm:text-2xl ${
                    item.numeric
                      ? "font-mono text-lg font-medium tabular-nums sm:text-xl"
                      : ""
                  }`}
                >
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        {acca?.level ? (
          <div className={validItems.length > 0 ? "mt-7 border-t border-line/70" : ""}>
            <AccaPath
              level={acca.level}
              levelNote={acca.levelNote}
              institute={acca.institute}
              since={acca.since}
              compact
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}
