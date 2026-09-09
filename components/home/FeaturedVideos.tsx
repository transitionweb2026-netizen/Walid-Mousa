import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VideoCard } from "@/components/media/VideoCard";
import { featuredVideos, videosIntro } from "@/data/videos";
import { siteContent } from "@/data/site";
import type { Locale } from "@/lib/i18n";

export function FeaturedVideos({ locale }: { locale: Locale }) {
  return (
    <Section tint="neutral" aria-labelledby="videos-heading">
      <SectionHeader
        locale={locale}
        headingId="videos-heading"
        eyebrow={videosIntro.eyebrow}
        title={videosIntro.title}
        description={videosIntro.description}
      />

      <Stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
        {featuredVideos.map((video) => (
          <StaggerItem key={video.id} className="h-full">
            <VideoCard video={video} locale={locale} frame="phone" />
          </StaggerItem>
        ))}
      </Stagger>

      <Reveal className="mt-12 flex justify-center">
        <Button href={`/${locale}/videos`} variant="secondary" withArrow>
          {siteContent.actions.viewAllVideos[locale]}
        </Button>
      </Reveal>
    </Section>
  );
}
