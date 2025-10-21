import {Link} from '@/lib/navigation';
import {Button} from '@/components/ui/button';
import type {Locale} from '@/lib/i18n/locales';

export function CTASection({
  title,
  subtitle,
  contacts,
  locale,
  ctaLabel
}: {
  title: string;
  subtitle: string;
  contacts: string[];
  locale: Locale;
  ctaLabel: string;
}) {
  return (
    <section className="container-responsive mt-24">
      <div className="hero-gradient grid gap-6 rounded-[2rem] px-8 py-12 text-mist shadow-glow lg:grid-cols-[2fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-3xl font-semibold">{title}</h2>
          <p className="text-sm text-mist/90">{subtitle}</p>
        </div>
        <div className="flex flex-col items-start justify-center gap-3 text-sm">
          {contacts.map((contact) => (
            <span key={contact} className="rounded-full bg-white/10 px-4 py-2 text-mist">
              {contact}
            </span>
          ))}
          <Button asChild variant="secondary">
            <Link href="/contact" locale={locale}>
              {ctaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
