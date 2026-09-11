import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";
import { VideoCard } from "@/components/media/VideoCard";
import { featuredVideos, videosIntro } from "@/data/videos";
import type { VideoItem } from "@/data/videos";
import { siteContent } from "@/data/site";
import type { IntroContent } from "@/lib/cms/publicSections";
import type { Locale } from "@/lib/i18n";

interface Props {
  locale: Locale;
  videos?: VideoItem[];
  intro?: IntroContent | null;
}

export function FeaturedVideos({ locale, videos = featuredVideos, intro }: Props) {
  const header = intro ?? videosIntro;
  return (
    <Section tint="neutral" aria-labelledby="videos-heading">
      <SectionHeader
        locale={locale}
        headingId="videos-heading"
        eyebrow={header.eyebrow}
        title={header.title}
        description={header.description}
      />

      <Stagger className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-8 sm:grid-cols-3">
        {videos.slice(0, 3).map((video) => (
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
