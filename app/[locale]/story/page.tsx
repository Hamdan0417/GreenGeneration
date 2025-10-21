import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {Timeline, type TimelineStep} from '@/components/sections/timeline';
import type {Locale} from '@/lib/i18n/locales';


export async function generateMetadata({params}: {params: {locale: Locale}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale});
  const story = t.raw('story') as {heading: string; about: string};
  return {
    title: story.heading,
    description: story.about,
    openGraph: {
      title: story.heading,
      description: story.about,
      images: ['/og/story.png']
    }
  };
}

export default async function StoryPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const story = t.raw('story') as {heading: string; about: string; timelineHeading: string};
  const timeline = t.raw('timeline.steps') as TimelineStep[];
  const philosophy = t.raw('philosophy') as {
    heading: string;
    vision: string;
    mission: string;
    valuesLabel: string;
    visionLabel: string;
    missionLabel: string;
    values: string[];
  };

  return (
    <div className="space-y-16 pb-16">
      <section className="container-responsive mt-10 space-y-6">
        <h1 className="text-4xl font-bold text-ink dark:text-mist">{story.heading}</h1>
        <p className="max-w-3xl text-lg text-ink/70 dark:text-mist/70">{story.about}</p>
      </section>
      <Timeline steps={timeline} heading={story.timelineHeading} />
      <section className="container-responsive mt-12 grid gap-8 lg:grid-cols-3">
        <div className="glass-card col-span-2 space-y-4 p-8">
          <h2 className="text-2xl font-semibold text-forest dark:text-sand">{philosophy.heading}</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-ink/10 bg-white/60 p-6 dark:border-mist/10 dark:bg-ink/60">
              <h3 className="text-lg font-semibold text-ink dark:text-mist">{philosophy.visionLabel}</h3>
              <p className="mt-2 text-sm text-ink/70 dark:text-mist/70">{philosophy.vision}</p>
            </article>
            <article className="rounded-2xl border border-ink/10 bg-white/60 p-6 dark:border-mist/10 dark:bg-ink/60">
              <h3 className="text-lg font-semibold text-ink dark:text-mist">{philosophy.missionLabel}</h3>
              <p className="mt-2 text-sm text-ink/70 dark:text-mist/70">{philosophy.mission}</p>
            </article>
          </div>
        </div>
        <aside className="glass-card space-y-4 p-8">
          <h3 className="text-xl font-semibold text-forest dark:text-sand">{philosophy.valuesLabel}</h3>
          <ul className="space-y-3">
            {philosophy.values.map((value) => (
              <li key={value} className="flex items-center gap-3 text-sm text-ink dark:text-mist">
                <span className="h-2 w-2 rounded-full bg-teal" aria-hidden="true" />
                {value}
              </li>
            ))}
          </ul>
        </aside>
      </section>
    </div>
  );
}
