'use client';

import Image from 'next/image';
import {Link} from '@/lib/navigation';
import {useTranslations} from 'next-intl';
import {motion, useReducedMotion} from 'framer-motion';
import {Button} from '@/components/ui/button';
import type {Locale} from '@/lib/i18n/locales';

export function Hero({locale}: {locale: Locale}) {
  const t = useTranslations('hero');
  const opportunity = useTranslations('opportunity');
  const reduceMotion = useReducedMotion();
  const badgeText = t('badge');

  return (
    <section className="relative overflow-hidden">
      <motion.div
        className="hero-gradient container-responsive mt-8 flex flex-col items-center gap-8 overflow-hidden rounded-[2.5rem] px-6 py-16 text-center text-mist shadow-glow lg:flex-row lg:items-center lg:justify-between lg:text-left"
        initial={reduceMotion ? false : {opacity: 0, y: 40, scale: 0.98}}
        animate={reduceMotion ? undefined : {opacity: 1, y: 0, scale: 1}}
        transition={{duration: 0.8, ease: 'easeOut'}}
      >
        <motion.div
          initial={reduceMotion ? false : {opacity: 0, y: 30}}
          animate={reduceMotion ? undefined : {opacity: 1, y: 0}}
          transition={{delay: 0.1, duration: 0.6}}
          className="flex-1 space-y-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-sand shadow-soft backdrop-blur">
            {badgeText}
          </span>
          <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">{t('title')}</h1>
          <p className="max-w-2xl text-lg text-mist/90">{t('subtitle')}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <Button asChild size="lg">
              <Link href="/contact" locale={locale}>
                {t('primaryCta')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/story" locale={locale}>
                {t('secondaryCta')}
              </Link>
            </Button>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/10 p-6 text-left text-sm text-mist/90 backdrop-blur">
            <p className="text-base font-semibold text-sand">{opportunity('heading')}</p>
            <p className="mt-2 text-lg font-bold text-mist">{opportunity('ask')}</p>
            <p className="mt-2 text-mist/90">{opportunity('oneLiner')}</p>
          </div>
        </motion.div>
        <motion.div
          className="relative flex flex-1 flex-col items-center gap-6"
          initial={reduceMotion ? false : {opacity: 0, y: 40}}
          animate={reduceMotion ? undefined : {opacity: 1, y: 0}}
          transition={{delay: 0.2, duration: 0.6}}
        >
          <div className="relative h-48 w-48 overflow-hidden rounded-3xl border border-mist/20 bg-white/80 p-6 shadow-lg">
            <Image src="/logo.png" alt="Green Generation" fill sizes="192px" className="object-contain" priority />
          </div>
          <motion.div
            initial={reduceMotion ? false : {opacity: 0, y: 20}}
            animate={reduceMotion ? undefined : {opacity: 1, y: 0}}
            transition={{delay: 0.5, duration: 0.6}}
            className="flex flex-col items-center gap-2 text-sm text-mist/80"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-mist/20 bg-mist/20 px-4 py-2 text-xs uppercase tracking-wide">
              {opportunity('heading')}
            </span>
            <span>{opportunity('ask')}</span>
          </motion.div>
        </motion.div>
      </motion.div>
      <div className="mt-10 flex justify-center">
        <motion.a
          href="#opportunity"
          className="flex flex-col items-center gap-2 text-sm font-medium text-forest dark:text-sand"
          initial={reduceMotion ? false : {opacity: 0, y: 10}}
          animate={reduceMotion ? undefined : {opacity: 1, y: 0}}
          transition={{delay: 0.6, duration: 0.5}}
        >
          <span>↓</span>
          <span>{t('scroll')}</span>
        </motion.a>
      </div>
    </section>
  );
}
