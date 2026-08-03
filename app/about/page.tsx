import type { Metadata } from "next";
import { Prose } from "@/components/typography/Prose";
import { TextLink } from "@/components/ui/TextLink";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Raluca Rusu — a software engineer always on a quest, from robotics and freelance to Bloomberg in London.",
  path: "/about",
});

type TalkOrNewsItem = {
  type: "talk" | "news";
  title: string;
  source: string;
  date: string;
  url: string;
  summary?: string;
};

/** Add talks and press links here — rendered as embedded-style cards. */
const talksAndNews: TalkOrNewsItem[] = [];

function AboutPhotoPlaceholder() {
  return (
    <figure className="about-page__photo">
      <div
        className="about-page__photo-frame about-page__photo-frame--placeholder"
        aria-hidden="true"
      />
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
        <li key={`${item.url}-${item.date}`}>
          <article className="about-media__card">
            <div className="about-media__card-meta">
              <span className="about-media__type">
                {item.type === "talk" ? "Talk" : "News"}
              </span>
              <span aria-hidden="true">·</span>
              <span>{item.source}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={item.date}>
                {new Date(item.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                })}
              </time>
            </div>
            <h3 className="about-media__card-title">
              <TextLink href={item.url} external>
                {item.title}
              </TextLink>
            </h3>
            {item.summary && (
              <p className="about-media__card-summary">{item.summary}</p>
            )}
          </article>
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
          <div
            className="about-section__media about-section__media--single"
            aria-label="Intro photo"
          >
            <AboutPhotoPlaceholder />
          </div>
          <div className="about-section__content">
            <Prose className="about-page__prose">
              <p className="about-page__tagline">
                <em>A software engineer always on a quest.</em>
              </p>
              <p>
                Placeholder — a short note on personality, what I care about,
                and what I&apos;m building toward. This will sit alongside a
                single portrait.
              </p>
            </Prose>
          </div>
        </div>
      </section>

      <section className="about-section" aria-labelledby="about-career-title">
        <AboutSectionTitle id="about-career-title">Career</AboutSectionTitle>
        <div className="about-section__split about-section__split--career">
          <div
            className="about-section__media about-section__media--triple"
            aria-label="Career photos"
          >
            <AboutPhotoPlaceholder />
            <AboutPhotoPlaceholder />
            <AboutPhotoPlaceholder />
          </div>
          <div className="about-section__content">
            <Prose className="about-page__prose">
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
      </section>
    </article>
  );
}
