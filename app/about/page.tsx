import type { Metadata } from "next";
import Image from "next/image";
import { TextLink } from "@/components/ui/TextLink";
import { Prose } from "@/components/typography/Prose";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "About Raluca Rusu, software engineer in London, from robotics and freelance to Bloomberg. Intro, career story, talks, and press.",
  path: "/about",
});

type MediaItemType = "talk" | "news";

type TalkOrNewsItem = {
  type: MediaItemType;
  title: string;
  source?: string;
  venue?: string;
  location?: string;
  date: string;
  url: string;
};

const MEDIA_TYPE_LABELS: Record<MediaItemType, string> = {
  talk: "Talk",
  news: "News",
};

/** Add talks and press links here — rendered newest to oldest. */
const talksAndNews: TalkOrNewsItem[] = [
  {
    type: "news",
    title: "Dean's List Finalist: BRD FIRST Tech Challenge Romania",
    source: "Europa FM",
    date: "2019-03-01",
    url: "https://www.europafm.ro/brd-first-tech-challenge-romania-si-a-desemnat-castigatorii/",
  },
  {
    type: "news",
    title:
      "Programatoarea de 17 ani din România care a lansat primul joc pe Product Hunt",
    source: "start-up.ro",
    date: "2020-06-17",
    url: "https://start-up.ro/programatoarea-de-17-ani-din-romania-care-a-lansat-primul-joc-pe-product-hunt/",
  },
  {
    type: "news",
    title: "Duty Ventures: helping startups build their MVP",
    source: "start-up.ro",
    date: "2021-02-02",
    url: "https://start-up.ro/duty-ventures-tinerii-romani-care-te-ajuta-sa-construiesti-mvp-ul-startup-ului/",
  },
  {
    type: "talk",
    title: "Grace Hopper Celebration: Selected Speaker",
    venue: "GHC Conference",
    location: "California, USA",
    date: "2026-10-01",
    url: "https://ghc.anitab.org/session-catalog?tab.day=20261029&search=raluca%20rusu#/session/1772118191123001AZm8",
  },
  {
    type: "talk",
    title: "Difffusion Festival: How FIRST Tech Challenge shaped my career",
    venue: "Difffusion Festival",
    location: "Alba Iulia, Romania",
    date: "2024-06-21",
    url: "https://difffusion.ro/",
  },
  {
    type: "talk",
    title: "NTT DATA eAwards: Hackathon-winning web application pitch",
    venue: "NTT DATA eAwards",
    location: "Cluj-Napoca, Romania",
    date: "2022-09-15",
    url: "https://globaleawards.com/",
  },
  {
    type: "talk",
    title: "European Parliament: Speech at the plenary session",
    venue: "European Parliament",
    location: "Strasbourg, France",
    date: "2019-06-01",
    url: "https://www.youtube.com/watch?v=islYAvEXT_0",
  },
].sort((a, b) => b.date.localeCompare(a.date)) as TalkOrNewsItem[];

const careerPhotos = [
  {
    id: "robotics-deans-list",
    src: "/about/career-robotics-deans-list.png",
    alt: "Raluca Rusu holding a Dean's List finalist certificate at the BRD FIRST Tech Challenge Romania championship",
  },
  {
    id: "graduation-babes-bolyai",
    src: "/about/career-graduation-babes-bolyai.png",
    alt: "Raluca Rusu at her Computer Science graduation from Babeș-Bolyai University",
  },
  {
    id: "beigel-bake-brick-lane",
    src: "/about/career-beigel-bake-brick-lane.png",
    alt: "Raluca Rusu outside Beigel Bake on Brick Lane, London",
  },
] as const;

const talksAndNewsPhotos = [
  {
    id: "too-good-to-go-presentation",
    src: "/about/talks-too-good-to-go-presentation.png",
    alt: "Raluca Rusu giving a startup presentation with a microphone and clicker",
  },
  {
    id: "panel-discussion",
    src: "/about/talks-panel-discussion.png",
    alt: "Raluca Rusu on a panel discussion stage",
  },
  {
    id: "european-parliament-speech",
    src: "/about/talks-european-parliament-speech.png",
    alt: "Raluca Rusu speaking at a podium in the European Parliament",
  },
] as const;

const introPortrait = {
  src: "/about/intro-portrait.png",
  alt: "Portrait of Raluca Rusu outdoors",
} as const;

const introGalleryPhotos = [
  {
    src: "/about/intro-snowboarding.png",
    alt: "Raluca Rusu snowboarding in powder snow",
  },
  {
    src: "/about/intro-japan.png",
    alt: "Raluca Rusu eating taiyaki on a street in Japan at night",
  },
  {
    src: "/about/intro-festival.png",
    alt: "Raluca Rusu at an outdoor music festival at night",
  },
] as const;

function AboutPhoto({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 50vw, 17rem",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <figure className="about-page__photo">
      <div className="about-page__photo-frame">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="about-page__photo-image"
          priority={priority}
        />
      </div>
    </figure>
  );
}

function AboutSectionTitle({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="about-section__title">
      {children}
    </h2>
  );
}

function formatMediaDate(date: string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

function MediaMeta({ item }: { item: TalkOrNewsItem }) {
  const parts: { key: string; className: string; content: string }[] = [];

  if (item.source) {
    parts.push({ key: "source", className: "about-media__source", content: item.source });
  }
  if (item.venue) {
    parts.push({ key: "venue", className: "about-media__venue", content: item.venue });
  }
  if (item.location) {
    parts.push({
      key: "location",
      className: "about-media__location",
      content: item.location,
    });
  }
  parts.push({
    key: "date",
    className: "about-media__date",
    content: formatMediaDate(item.date),
  });

  return (
    <span className="about-media__meta">
      {parts.flatMap((part, index) => {
        const nodes = [];

        if (index > 0) {
          nodes.push(
            <span key={`sep-${part.key}`} className="about-media__sep" aria-hidden="true">
              ·
            </span>,
          );
        }

        if (part.key === "date") {
          nodes.push(
            <time key={part.key} className={part.className} dateTime={item.date}>
              {part.content}
            </time>,
          );
        } else {
          nodes.push(
            <span key={part.key} className={part.className}>
              {part.content}
            </span>,
          );
        }

        return nodes;
      })}
    </span>
  );
}

function TalksAndNewsList({ items }: { items: TalkOrNewsItem[] }) {
  if (items.length === 0) {
    return (
      <p className="about-media__empty font-light text-muted">
        Talks and press coverage will appear here soon.
      </p>
    );
  }

  return (
    <ul className="about-media__list">
      {items.map((item) => (
        <li
          key={`${item.url}-${item.date}`}
          className={`about-media__item about-media__item--${item.type}`}
        >
          <p className="about-media__line">
            <span
              className={`about-media__type about-media__type--${item.type}`}
            >
              {MEDIA_TYPE_LABELS[item.type]}
            </span>
            <MediaMeta item={item} />
            <span className="about-media__divider" aria-hidden="true">
              {" | "}
            </span>
            <a
              href={item.url}
              className="about-media__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.title}
            </a>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default function AboutPage() {
  return (
    <article className="about-page">
      <section className="about-section" aria-labelledby="about-intro-title">
        <AboutSectionTitle id="about-intro-title">Intro</AboutSectionTitle>
        <div className="about-section__split about-section__split--intro">
          <div className="about-section__content">
            <Prose className="about-page__prose">
              <p>
                Hi! I&apos;m Raluca. I&apos;m 23 years old. I have a habit of
                organizing my life around the things I love, very on-brand for
                my INTJ &amp; Red personality.
              </p>
              <p>
                Most of the time, you&apos;ll find me behind a computer. But
                don&apos;t worry, I&apos;m rarely doing anything boring. When
                I&apos;m not, I&apos;m probably:
              </p>
              <ul>
                <li>
                  Snowboarding, (my favorite sport) or just walking somewhere (I
                  love walking).
                </li>
                <li>
                  Listening to music or at a festival. I&apos;ve been going to{" "}
                  <TextLink href="https://electriccastle.ro/" external>
                    Electric Castle
                  </TextLink>{" "}
                  for the past five years, and it has become one of my favorite
                  yearly traditions.
                </li>
                <li>
                  Traveling or eating. Favorite cuisine is Mediterranean,
                  especially Greek food. 3/7 continents, 18/195 countries.
                </li>
                <li>Reading or painting.</li>
              </ul>
            </Prose>
          </div>
          <div
            className="about-section__media about-section__media--single"
            aria-label="Intro photo"
          >
            <AboutPhoto
              src={introPortrait.src}
              alt={introPortrait.alt}
              priority
            />
          </div>
        </div>
        <div className="about-section__gallery" aria-label="More intro photos">
          {introGalleryPhotos.map((photo) => (
            <AboutPhoto
              key={photo.src}
              src={photo.src}
              alt={photo.alt}
              sizes="(max-width: 640px) 33vw, 14rem"
            />
          ))}
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-career-title">
        <AboutSectionTitle id="about-career-title">Career</AboutSectionTitle>
        <div className="about-section__split about-section__split--career">
          <div
            className="about-section__media about-section__media--triple"
            aria-label="Career photos"
          >
            {careerPhotos.map((photo) => (
              <AboutPhoto key={photo.id} src={photo.src} alt={photo.alt} />
            ))}
          </div>
          <div className="about-section__content">
            <Prose className="about-page__prose">
              <p className="about-page__tagline">
                <em>A software engineer always on a quest.</em>
              </p>
              <p>
                My journey into software engineering started in the last year of
                middle school… although not exactly by choice. My older brother
                was determined to turn me into one of those legendary competitive
                programmers who swept every informatics olympiad. That meant a
                steady stream of algorithms and data structures problems long
                before I appreciated why they mattered.
              </p>

              <p>I wasn&apos;t nearly as enthusiastic as he was.</p>

              <p>
                Instead, I found my place in my first year of high school when I
                joined the robotics team. What started as an extracurricular
                quickly became the center of my world. Over the next few years, I
                built robots, wrote software, competed nationally and
                internationally in the FIRST Tech Challenge (FTC), and
                eventually had the privilege of leading the team through some of
                its most successful seasons. It was my first taste of solving
                difficult problems alongside people who cared just as much as I
                did, and it cemented my love for engineering.
              </p>

              <p>Then the pandemic happened.</p>

              <p>
                Robotics competitions stopped. School moved online. I found
                myself stuck in the village where my parents grew up, with an
                unexpected amount of free time and nothing to do with it. Luckily,
                Romania has excellent internet anywhere, so I started exploring
                the world of software beyond robotics.
              </p>

              <p>
                So I started to learn full-stack web development. Spent countless
                hours creating projects then bragging on social media about them.
                And somehow, that eventually led to people throwing money at me
                to build their websites.
              </p>

              <p>
                Freelance projects eventually led me to Duty Ventures, a software
                agency working with clients worldwide. I worked there throughout
                university, learning what it meant to ship software professionally.
              </p>

              <p>
                2 years later, I was wrapping up an internship at Bloomberg while
                somehow surviving the final year of my Computer Science degree at
                Babeș-Bolyai University.
              </p>

              <p>
                5 years later (i.e. currently), I&apos;m based in London, where I
                work as a Software Engineer at Bloomberg. I build infrastructure
                that processes market data from exchanges around the world.
              </p>

              <p>
                The technologies and problems have changed over the years, but the
                underlying motivation hasn&apos;t.
              </p>

              <p className="about-page__closing">
                <em>I&apos;m still on different quests.</em>
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-talks-title">
        <AboutSectionTitle id="about-talks-title">Talks &amp; News</AboutSectionTitle>
        <TalksAndNewsList items={talksAndNews} />
        <div
          className="about-section__gallery about-section__gallery--talks"
          aria-label="Talks and news photos"
        >
          {talksAndNewsPhotos.map((photo) => (
            <AboutPhoto
              key={photo.id}
              src={photo.src}
              alt={photo.alt}
              sizes="(max-width: 640px) 33vw, 14rem"
            />
          ))}
        </div>
      </section>
    </article>
  );
}
