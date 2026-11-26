import type { Metadata } from "next";
import { Closing } from "@/components/sections/closing";
import { Credentials } from "@/components/sections/credentials";
import { ExperiencePreview } from "@/components/sections/experience-preview";
import { Hero } from "@/components/sections/hero";
import { ProcessSection } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { TaxCalendar } from "@/components/sections/tax-calendar";
import { Testimonials } from "@/components/sections/testimonials";
import { FadeIn } from "@/components/ui/fade-in";
import { getPublicContent } from "@/lib/getPublicContent";
import { getContent } from "@/lib/content";
import { getRobotsMetadata, getSiteUrl } from "@/lib/seo";
import { isSectionOn } from "@/lib/visibility";

export function generateMetadata(): Metadata {
  const content = getPublicContent();
  return {
    title: { absolute: content.hero.headline },
    description: content.hero.subheadline,
    alternates: { canonical: "/" },
    robots: getRobotsMetadata(),
    openGraph: {
      title: content.hero.headline,
      description: content.hero.subheadline,
      url: "/",
    },
    twitter: {
      card: "summary_large_image",
      title: content.hero.headline,
      description: content.hero.subheadline,
    },
  };
}

export default function HomePage() {
  const content = getPublicContent();
  const approvalContent = getContent();

  const showHero = isSectionOn("hero", content);
  const showCredentials = isSectionOn("credentials", content);
  const showAcca = isSectionOn("acca", content);
  const showServices = isSectionOn("services", content);
  const showProcess = isSectionOn("process", content);
  const showTaxCalendar = isSectionOn("taxCalendar", content);
  const showSkills = isSectionOn("skills", content);
  const showExperience = isSectionOn("experience", content);
  const showTestimonials = isSectionOn("testimonials", content);
  const showClosing = isSectionOn("closing", content);

  const cvHref = content.cv.pdfUrl ?? "/cv";
  const cvIsFile = Boolean(content.cv.pdfUrl);
  const siteUrl = getSiteUrl();

  const sameAs = [
    ...(content.contact.linkedin ? [content.contact.linkedin] : []),
    ...content.contact.otherLinks
      .map((link) => link.url)
      .filter((url): url is string => Boolean(url && url.trim().length > 0)),
  ];

  const primaryEmployer = content.experience.items[0]?.company;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: content.meta.name,
    jobTitle: content.meta.title,
    url: siteUrl,
    ...(primaryEmployer
      ? {
          worksFor: {
            "@type": "Organization",
            name: primaryEmployer,
          },
        }
      : {}),
    ...(content.meta.photo?.src
      ? {
          image: `${siteUrl}/${content.meta.photo.src.replace(/^\/+/, "")}`,
        }
      : {}),
    ...(content.contact.email.public
      ? { email: content.contact.email.value }
      : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      {showHero ? (
        <FadeIn>
          <Hero
            headline={content.hero.headline}
            subheadline={content.hero.subheadline}
            ctaPrimary={content.hero.ctaPrimary}
            ctaSecondary={content.hero.ctaSecondary}
            cvHref={cvHref}
            cvIsFile={cvIsFile}
            availability={content.meta.availability}
            photo={content.meta.photo}
            accaLevel={content.acca.level}
            accaSince={content.acca.since}
          />
        </FadeIn>
      ) : null}

      {showCredentials || showAcca ? (
        <FadeIn>
          <Credentials
            items={showCredentials ? content.credentials.items : []}
            acca={
              showAcca
                ? {
                    level: content.acca.level,
                    levelNote: content.acca.levelNote,
                    institute: content.acca.institute,
                    since: content.acca.since,
                  }
                : null
            }
          />
        </FadeIn>
      ) : null}

      {showServices ? (
        <FadeIn>
          <Services
            heading={content.services.heading}
            intro={content.services.intro}
            needsApproval={approvalContent.services.needsApproval}
            items={content.services.items.map((item, index) => ({
              ...item,
              needsApproval:
                approvalContent.services.items[index]?.needsApproval,
            }))}
          />
        </FadeIn>
      ) : null}

      {showProcess ? (
        <FadeIn>
          <ProcessSection
            heading={content.process.heading}
            intro={content.process.intro}
            needsApproval={approvalContent.process.needsApproval}
            steps={content.process.steps.map((step, index) => ({
              ...step,
              needsApproval: approvalContent.process.steps[index]?.needsApproval,
            }))}
          />
        </FadeIn>
      ) : null}

      {showTaxCalendar ? (
        <FadeIn>
          <TaxCalendar
            heading={content.taxCalendar.heading}
            note={content.taxCalendar.note}
            startLabel={content.taxCalendar.startLabel}
            endLabel={content.taxCalendar.endLabel}
            dates={content.taxCalendar.dates.map((date, index) => ({
              ...date,
              needsApproval:
                approvalContent.taxCalendar.dates[index]?.needsApproval,
            }))}
          />
        </FadeIn>
      ) : null}

      {showSkills ? (
        <FadeIn>
          <Skills
            tools={content.skills.tools}
            technical={content.skills.technical}
            soft={content.skills.soft}
            excelSkills={content.skills.excelSkills}
          />
        </FadeIn>
      ) : null}

      {showExperience ? (
        <FadeIn>
          <ExperiencePreview
            items={content.experience.items.map((item, index) => ({
              ...item,
              needsApproval:
                approvalContent.experience.items[index]?.needsApproval,
            }))}
          />
        </FadeIn>
      ) : null}

      {showTestimonials ? (
        <FadeIn>
          <Testimonials
            visible={content.testimonials.visible}
            items={content.testimonials.items}
          />
        </FadeIn>
      ) : null}

      {showClosing ? (
        <FadeIn>
          <Closing
            heading={content.closing.heading}
            text={content.closing.text}
            cta={content.hero.ctaSecondary}
            needsApproval={approvalContent.closing.needsApproval}
          />
        </FadeIn>
      ) : null}
    </>
  );
}
