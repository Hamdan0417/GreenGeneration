import type {Metadata} from 'next';
import {ReactNode} from 'react';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages, unstable_setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {DirectionProvider} from '@/components/providers/direction-provider';
import {ThemeProvider} from '@/components/providers/theme-provider';
import {Footer} from '@/components/layout/footer';
import {Navbar} from '@/components/layout/navbar';
import {SkipToContent} from '@/components/layout/skip-to-content';
import {ToastProvider, ToastViewport} from '@/components/ui/toast';
import {locales, type Locale} from '@/lib/i18n/locales';

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params: {locale}
}: {
  params: {locale: Locale};
}): Promise<Metadata> {
  const isArabic = locale === 'ar';
  return {
    title: isArabic
      ? 'الجيل الأخضر | حلول زراعية ذكية'
      : 'Green Generation | Smart agriculture for Saudi Arabia',
    description: isArabic
      ? 'الجيل الأخضر يقدم حلولاً ذكية للزراعة والماشية مع ري مدعوم بالذكاء الاصطناعي وخدمات محلية عبر المملكة.'
      : 'Green Generation blends equipment, AI irrigation, and localized service to modernize Saudi agriculture.'
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: ReactNode;
  params: {locale: Locale};
}) {
  const {locale} = params;
  if (!locales.includes(locale)) {
    notFound();
  }
  unstable_setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Asia/Riyadh">
      <DirectionProvider locale={locale} />
      <ThemeProvider>
        <ToastProvider>
          <SkipToContent />
          <Navbar locale={locale} />
          <main id="content" className="min-h-screen bg-mist pb-24 dark:bg-ink">
            {children}
          </main>
          <Footer locale={locale} />
          <ToastViewport />
        </ToastProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
