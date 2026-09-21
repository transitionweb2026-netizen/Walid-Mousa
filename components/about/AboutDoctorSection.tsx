import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Icon } from "@/components/icons/Icon";
import { aboutContent } from "@/data/about";
import type { AboutDoctorContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

const fb: AboutDoctorContent = {
  eyebrow: aboutContent.bio.eyebrow,
  heading: aboutContent.bio.heading,
  paragraphs: aboutContent.bio.paragraphs,
  highlight: aboutContent.bio.highlight,
  portrait: aboutContent.bio.portrait,
  portraitLayers: aboutContent.bio.portraitLayers,
  signatureName: aboutContent.bio.signatureName,
  signatureRole: aboutContent.bio.signatureRole,
};

/**
 * "About the Doctor" — LEFT: editorial bio column. RIGHT: the portrait as a
 * premium paper/glass card, with two more photos layered behind it at slight
 * offsets for depth. The front card tilts gently under the pointer (TiltCard).
 */
export function AboutDoctorSection({ locale, content = fb }: { locale: Locale; content?: AboutDoctorContent }) {
  const bio = content;
  const [layerA, layerB] = bio.portraitLayers;

  return (
    <Section tint="neutral" glow="teal" aria-labelledby="about-doctor-heading">
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <Reveal>
          <h2
            id="about-doctor-heading"
            className="text-gradient-brand text-3xl font-extrabold leading-tight sm:text-4xl"
          >
            {bio.heading[locale]}
          </h2>
          <div className="mt-5 space-y-4 text-base leading-relaxed text-brand-ink-soft">
            {bio.paragraphs[locale].map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="mt-7 flex items-start gap-4 rounded-2xl border-s-2 border-brand-pink/50 bg-brand-pink-wash/70 p-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-brand text-white shadow-glass">
              <Icon name="award" className="h-5 w-5" />
            </span>
            <p className="text-sm leading-relaxed text-brand-ink-soft">
              <span className="font-heading text-base font-extrabold text-brand-ink">
                {bio.highlight.value[locale]}
              </span>{" "}
              {bio.highlight.label[locale]}
            </p>
          </div>
        </Reveal>

        {/* Portrait — one main photo, with two much smaller photo edges peeking
            out behind it (tinted + blurred) purely to suggest depth, not to
            compete with the main image. */}
        <Reveal delay={0.12} className="relative mx-auto w-full max-w-md lg:max-w-none">
          <span aria-hidden className="glow-pink absolute -end-10 -top-8 h-44 w-44 rounded-full opacity-40" />
          <span aria-hidden className="glow-teal absolute -bottom-12 -start-8 h-48 w-48 rounded-full opacity-40" />

          <div className="relative aspect-[4/5] w-full [perspective:1200px]">
            {/* Back hint B */}
            <div className="absolute -end-3 -top-3 z-0 h-[34%] w-[30%] -rotate-6 overflow-hidden rounded-2xl shadow-glass blur-[0.5px] rtl:rotate-6">
              <Image
                src={layerB.src}
                alt=""
                aria-hidden
                fill
                sizes="(min-width:1024px) 9rem, 24vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-br from-brand-teal-deep/35 to-brand-pink-deep/35" />
            </div>
            {/* Back hint A */}
            <div className="absolute -start-3 -bottom-3 z-0 h-[30%] w-[26%] rotate-6 overflow-hidden rounded-2xl shadow-glass blur-[0.5px] rtl:-rotate-6">
              <Image
                src={layerA.src}
                alt=""
                aria-hidden
                fill
                sizes="(min-width:1024px) 8rem, 22vw"
                className="object-cover"
              />
              <span className="absolute inset-0 bg-gradient-to-br from-brand-teal-deep/35 to-brand-pink-deep/35" />
            </div>

            {/* Main portrait — tilts under the pointer */}
            <div className="absolute inset-x-3 inset-y-0 z-10 sm:inset-x-6">
              <TiltCard max={5} glare={0.2} className="h-full">
                <div className="glass-card glass-sheen h-full rounded-[1.9rem] p-2.5">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={bio.portrait.src}
                      alt={bio.portrait.alt[locale]}
                      fill
                      priority
                      sizes="(min-width:1024px) 30rem, 90vw"
                      style={{ objectPosition: bio.portrait.position }}
                      className="object-cover"
                    />
                    <span className="absolute inset-0 bg-gradient-to-t from-brand-ink/45 via-transparent to-transparent" />
                    <div className="absolute inset-x-3 bottom-3 flex items-center gap-3 rounded-2xl bg-white/80 p-3 backdrop-blur-md">
                      <span className="h-9 w-9 shrink-0 rounded-xl bg-gradient-brand" />
                      <div className="min-w-0">
                        <p className="truncate font-heading text-sm font-extrabold text-brand-ink">
                          {bio.signatureName[locale]}
                        </p>
                        <p className="truncate text-[0.7rem] text-brand-muted">{bio.signatureRole[locale]}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
