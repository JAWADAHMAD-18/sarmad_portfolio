import type { Metadata } from "next";
import { CvActions } from "@/components/cv/cv-actions";
import { getPublicContent } from "@/lib/getPublicContent";
import { formatPhoneDisplay } from "@/lib/phone";
import { getRobotsMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const content = getPublicContent();
  const description = `${content.meta.name} — ${content.meta.title}. Printable Curriculum Vitae.`;
  return {
    title: "Curriculum Vitae",
    description,
    alternates: { canonical: "/cv" },
    robots: getRobotsMetadata(),
    openGraph: {
      title: `Curriculum Vitae | ${content.meta.name}`,
      description,
      url: "/cv",
    },
    twitter: {
      card: "summary_large_image",
      title: `Curriculum Vitae | ${content.meta.name}`,
      description,
    },
  };
}

export default function CvPage() {
  const content = getPublicContent();
  const publicEmail = content.contact.email.public ? content.contact.email.value : null;
  const publicPhone = content.contact.phone.public ? content.contact.phone.value : null;
  const locationText = [
    content.contact.city ?? content.meta.location.city,
    content.meta.location.country,
  ]
    .filter((value): value is string => Boolean(value))
    .join(", ");

  return (
    <div className="min-h-screen bg-[#F4F4EE] py-8 text-[#0B1B2E] dark:bg-[#0A0F14] print:bg-white print:p-0">
      {/* Action Bar (Print / Download buttons, Back link) */}
      <CvActions pdfUrl={content.cv.pdfUrl} />

      {/* Main CV Document - Forced Light Theme */}
      <main className="mx-auto my-8 max-w-[850px] border border-[#E4E4DD] bg-white p-8 sm:p-12 md:p-16 text-[#0B1B2E] shadow-sm print:m-0 print:border-none print:p-0 print:shadow-none">
        {/* CV Header */}
        <header className="border-b border-[#0B1B2E] pb-6">
          <h1 className="font-serif text-4xl tracking-tight text-[#0B1B2E] sm:text-5xl">
            {content.meta.name}
          </h1>
          <p className="mt-1 font-serif text-xl text-[#5B6675]">
            {content.meta.title}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-y-1 gap-x-4 font-mono text-xs text-[#5B6675]">
            {publicEmail ? (
              <span>
                Email: <span className="text-[#0B1B2E]">{publicEmail}</span>
              </span>
            ) : null}
            {publicPhone ? (
              <span>
                Phone:{" "}
                <a href={`tel:${publicPhone}`} className="text-[#0B1B2E] underline-offset-2 hover:underline">
                  {formatPhoneDisplay(publicPhone)}
                </a>
              </span>
            ) : null}
            {locationText ? (
              <span>
                Location: <span className="text-[#0B1B2E]">{locationText}</span>
              </span>
            ) : null}
            {content.contact.linkedin ? (
              <span>
                LinkedIn:{" "}
                <a
                  href={content.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0B1B2E] underline underline-offset-2"
                >
                  sarmad-ali-a42ab03b9
                </a>
              </span>
            ) : null}
            {content.meta.availability ? (
              <span>
                Availability: <span className="text-[#0B1B2E]">{content.meta.availability}</span>
              </span>
            ) : null}
          </div>
        </header>

        {/* Profile / Summary */}
        {content.about.bio ? (
          <section className="mt-8 border-b border-[#E4E4DD] pb-6" aria-labelledby="cv-profile">
            <h2 id="cv-profile" className="font-mono text-xs uppercase tracking-widest text-[#5B6675]">
              Professional Profile
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-[#0B1B2E]">
              {content.about.bio}
            </p>
          </section>
        ) : null}

        {/* ACCA Qualification */}
        <section className="mt-8 border-b border-[#E4E4DD] pb-6" aria-labelledby="cv-acca">
          <h2 id="cv-acca" className="font-mono text-xs uppercase tracking-widest text-[#5B6675]">
            ACCA Qualification
          </h2>
          <div className="mt-4 flex flex-col justify-between sm:flex-row sm:items-baseline">
            <div>
              <h3 className="font-serif text-lg font-bold text-[#0B1B2E]">
                {content.acca.level}
              </h3>
              <p className="text-sm text-[#5B6675]">
                {content.acca.institute}
              </p>
            </div>
            {content.acca.since ? (
              <span className="font-mono text-xs text-[#5B6675]">
                Commenced {content.acca.since}
              </span>
            ) : null}
          </div>
        </section>

        {/* Professional Experience */}
        <section className="mt-8 border-b border-[#E4E4DD] pb-6" aria-labelledby="cv-experience">
          <h2 id="cv-experience" className="font-mono text-xs uppercase tracking-widest text-[#5B6675]">
            Professional Experience
          </h2>
          <div className="mt-4 space-y-6">
            {content.experience.items.map((item, idx) => (
              <div key={idx}>
                <div className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-[#0B1B2E]">
                      {item.role}
                    </h3>
                    <p className="text-sm font-medium text-[#5B6675]">
                      {item.company}
                    </p>
                  </div>
                  {item.period ? (
                    <span className="font-mono text-xs text-[#5B6675]">
                      {item.period}
                    </span>
                  ) : null}
                </div>
                {item.responsibilities &&
                Array.isArray(item.responsibilities) &&
                item.responsibilities.length > 0 ? (
                  <ul className="mt-2.5 list-disc space-y-1 pl-5 text-xs leading-relaxed text-[#5B6675]">
                    {item.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx}>{resp}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mt-8 border-b border-[#E4E4DD] pb-6" aria-labelledby="cv-education">
          <h2 id="cv-education" className="font-mono text-xs uppercase tracking-widest text-[#5B6675]">
            Education
          </h2>
          <div className="mt-4 space-y-4">
            {content.education.items.map((edu, idx) => (
              <div key={idx} className="flex flex-col justify-between sm:flex-row sm:items-baseline">
                <div>
                  <h3 className="text-sm font-semibold text-[#0B1B2E]">
                    {edu.qualification}
                  </h3>
                  {edu.institute ? (
                    <p className="text-xs text-[#5B6675]">{edu.institute}</p>
                  ) : null}
                </div>
                {edu.period ? (
                  <span className="font-mono text-xs text-[#5B6675]">{edu.period}</span>
                ) : null}
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Tools */}
        <section className="mt-8 border-b border-[#E4E4DD] pb-6" aria-labelledby="cv-skills">
          <h2 id="cv-skills" className="font-mono text-xs uppercase tracking-widest text-[#5B6675]">
            Skills & Software
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h3 className="font-mono text-xs uppercase text-[#5B6675]">
                Accounting Software
              </h3>
              <p className="mt-1 text-sm text-[#0B1B2E]">
                {content.skills.tools.map((t) => `${t.name}${t.level ? ` (${t.level})` : ""}`).join(", ")}
              </p>
            </div>
            <div>
              <h3 className="font-mono text-xs uppercase text-[#5B6675]">
                Technical Competencies
              </h3>
              <p className="mt-1 text-sm text-[#0B1B2E]">
                {content.skills.technical.join(", ")}
              </p>
            </div>
          </div>
        </section>

        {/* Certifications */}
        {content.certifications.items && content.certifications.items.length > 0 ? (
          <section className="mt-8" aria-labelledby="cv-certs">
            <h2 id="cv-certs" className="font-mono text-xs uppercase tracking-widest text-[#5B6675]">
              Certifications
            </h2>
            <div className="mt-4 space-y-2">
              {content.certifications.items.map((cert, idx) => (
                <div key={idx} className="text-sm font-medium text-[#0B1B2E]">
                  {cert.name}
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </div>
  );
}
