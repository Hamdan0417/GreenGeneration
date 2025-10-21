'use client';

import {Link} from '@/lib/navigation';
import {useTranslations} from 'next-intl';
import {ThemeToggle} from '@/components/layout/theme-toggle';
import type {Locale} from '@/lib/i18n/locales';

export function Footer({locale}: {locale: Locale}) {
  const t = useTranslations('footer');
  const company = useTranslations('company');
  const navT = useTranslations('navigation');

  return (
    <footer className="border-t border-ink/10 bg-mist/90 py-10 text-sm dark:border-mist/10 dark:bg-ink/90" role="contentinfo">
      <div className="container-responsive flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-semibold text-ink dark:text-mist">
            {company('name') ?? 'الجيل الأخضر'}
          </h2>
          <p className="text-sm text-ink/70 dark:text-mist/70">
            {locale === 'ar' ? company('name_en') : company('name_ar', {default: 'الجيل الأخضر'})}
          </p>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <span className="text-xs text-ink/60 dark:text-mist/60">{t('darkMode')}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-wrap gap-10">
          <div className="min-w-[160px] space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/80 dark:text-mist/80">
              {t('addressLabel')}
            </h3>
            <div className="space-y-1 text-ink/70 dark:text-mist/70">
              <a href="tel:+966595556788" className="block transition hover:text-teal">
                +966 59 555 6788
              </a>
              <a href="mailto:contact@ggen.sa" className="block transition hover:text-teal">
                contact@ggen.sa
              </a>
            </div>
          </div>
          <div className="min-w-[160px] space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/80 dark:text-mist/80">
              Social
            </h3>
            <ul className="space-y-1 text-ink/70 dark:text-mist/70">
              <li>
                <Link href="https://linkedin.com" target="_blank" rel="noreferrer" className="transition hover:text-teal">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://x.com" target="_blank" rel="noreferrer" className="transition hover:text-teal">
                  X (Twitter)
                </Link>
              </li>
            </ul>
          </div>
          <div className="min-w-[160px] space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/80 dark:text-mist/80">
              {navT('contact')}
            </h3>
            <div className="space-y-2">
              <Link href="/invest" locale={locale} className="block transition hover:text-teal">
                {navT('invest')}
              </Link>
              <Link href="/contact" locale={locale} className="block transition hover:text-teal">
                {navT('contact')}
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container-responsive mt-8 border-t border-ink/10 pt-6 text-xs text-ink/60 dark:border-mist/10 dark:text-mist/60">
        {t('copyright')}
      </div>
    </footer>
  );
}
