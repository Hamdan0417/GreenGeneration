import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ContactForm} from '@/components/sections/contact-form';
import type {Locale} from '@/lib/i18n/locales';


export async function generateMetadata({params}: {params: {locale: Locale}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale});
  const contact = t.raw('contact') as {headline: string; sub: string};
  return {
    title: contact.headline,
    description: contact.sub,
    openGraph: {
      title: contact.headline,
      description: contact.sub,
      images: ['/og/contact.png']
    }
  };
}

export default async function ContactPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const contact = t.raw('contact') as {
    headline: string;
    sub: string;
    phoneLabel: string;
    emailLabel: string;
  };
  const company = t.raw('company') as {phone: string; email: string};

  return (
    <div className="space-y-16 pb-16">
      <section className="container-responsive mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          <h1 className="text-4xl font-bold text-ink dark:text-mist">{contact.headline}</h1>
          <p className="text-sm text-ink/70 dark:text-mist/70">{contact.sub}</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-4 dark:border-mist/10 dark:bg-ink/60">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/60 dark:text-mist/60">
                {contact.phoneLabel}
              </p>
              <a href={`tel:${company.phone}`} className="mt-2 block text-lg font-semibold text-forest dark:text-sand">
                {company.phone}
              </a>
            </div>
            <div className="rounded-2xl border border-ink/10 bg-white/70 p-4 dark:border-mist/10 dark:bg-ink/60">
              <p className="text-xs font-semibold uppercase tracking-widest text-ink/60 dark:text-mist/60">
                {contact.emailLabel}
              </p>
              <a href={`mailto:${company.email}`} className="mt-2 block text-lg font-semibold text-forest dark:text-sand">
                {company.email}
              </a>
            </div>
          </div>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
