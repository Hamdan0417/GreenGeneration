import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {Card} from '@/components/ui/card';
import type {Locale} from '@/lib/i18n/locales';

type Member = {
  name: string;
  role: string;
};


export async function generateMetadata({params}: {params: {locale: Locale}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale});
  const team = t.raw('team') as {heading: string; subtitle: string; members: {name: string}[]};
  const membersLine = team.members.map((m) => m.name).join(', ');
  return {
    title: team.heading,
    description: team.subtitle || membersLine,
    openGraph: {
      title: team.heading,
      description: team.subtitle || membersLine,
      images: ['/og/team.png']
    }
  };
}

export default async function TeamPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const team = t.raw('team') as {heading: string; subtitle: string; members: Member[]; descriptions: string[]};

  return (
    <div className="space-y-12 pb-16">
      <section className="container-responsive mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-ink dark:text-mist">{team.heading}</h1>
        <p className="max-w-2xl text-sm text-ink/70 dark:text-mist/70">{team.subtitle}</p>
      </section>
      <section className="container-responsive grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {team.members.map((member, index) => (
          <Card key={member.name} className="flex flex-col gap-4 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-forest/10 text-lg font-semibold text-forest dark:bg-mist/10 dark:text-sand">
                {member.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-semibold text-ink dark:text-mist">{member.name}</h2>
                <p className="text-sm text-ink/70 dark:text-mist/70">{member.role}</p>
              </div>
            </div>
            <p className="text-xs text-ink/60 dark:text-mist/60">{team.descriptions[index] ?? ''}</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
