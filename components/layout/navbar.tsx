'use client';

import Image from 'next/image';
import {Link, usePathname} from '@/lib/navigation';
import {motion} from 'framer-motion';
import {useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {Dialog, DialogContent, DialogTrigger} from '@/components/ui/dialog';
import {LanguageToggle} from '@/components/layout/language-toggle';
import {ThemeToggle} from '@/components/layout/theme-toggle';
import type {Locale} from '@/lib/i18n/locales';
import {Menu} from 'lucide-react';

const navItems = [
  {href: '/', key: 'home'},
  {href: '/story', key: 'story'},
  {href: '/team', key: 'team'},
  {href: '/invest', key: 'invest'},
  {href: '/contact', key: 'contact'}
];

export function Navbar({locale}: {locale: Locale}) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, ease: 'easeOut'}}
      className={`sticky top-0 z-50 backdrop-blur-lg transition-all ${
        scrolled ? 'bg-mist/80 shadow-soft dark:bg-ink/80' : 'bg-transparent'
      }`}
      role="banner"
    >
      <nav className="container-responsive flex items-center justify-between gap-4 py-4" aria-label="Main navigation">
        <div className="flex items-center gap-3">
          <Link href="/" locale={locale} className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Green Generation logo"
              width={48}
              height={48}
              priority
              className="h-12 w-12 rounded-xl border border-ink/10 bg-white/80 p-1 shadow-sm"
            />
            <span className="text-lg font-semibold text-ink dark:text-mist">
              {t('home') === 'Home' ? 'Green Generation' : 'الجيل الأخضر'}
            </span>
          </Link>
        </div>
        <div className="hidden items-center gap-1 text-sm font-medium lg:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.href === '/' ? '' : item.href}`;
            const isActive = pathname === href;
            return (
              <Link
                key={item.key}
                href={item.href}
                locale={locale}
                className={`rounded-full px-4 py-2 transition ${
                  isActive
                    ? 'bg-ink/90 text-mist shadow-glow dark:bg-mist/90 dark:text-ink'
                    : 'text-ink/80 hover:bg-ink/5 hover:text-forest dark:text-mist/80 dark:hover:bg-mist/10'
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden lg:flex lg:items-center lg:gap-2">
            <ThemeToggle />
            <LanguageToggle locale={locale} label={t('toggleLang')} />
            <Button asChild size="sm">
              <Link href="/contact" locale={locale}>
                {t('contactCta')}
              </Link>
            </Button>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open navigation">
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </DialogTrigger>
            <DialogContent className="w-[92vw] max-w-md bg-mist/95 dark:bg-ink/95">
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between">
                  <Image src="/logo.png" alt="Green Generation logo" width={40} height={40} className="h-10 w-10 rounded-xl" />
                  <ThemeToggle />
                </div>
                <div className="flex flex-col gap-3 text-lg">
                  {navItems.map((item) => (
                    <Link key={item.key} href={item.href} locale={locale} className="rounded-2xl bg-ink/5 px-4 py-3 text-ink transition hover:bg-ink/10 dark:bg-mist/10 dark:text-mist">
                      {t(item.key)}
                    </Link>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <LanguageToggle locale={locale} label={t('toggleLang')} />
                  <Button asChild>
                    <Link href="/contact" locale={locale}>
                      {t('contactCta')}
                    </Link>
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </nav>
    </motion.header>
  );
}
