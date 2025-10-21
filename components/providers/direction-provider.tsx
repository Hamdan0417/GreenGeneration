'use client';

import {useEffect} from 'react';
import type {Locale} from '@/lib/i18n/locales';

export function DirectionProvider({locale}: {locale: Locale}) {
  useEffect(() => {
    const dir = locale === 'ar' ? 'rtl' : 'ltr';
    const doc = document.documentElement;
    doc.setAttribute('dir', dir);
    doc.setAttribute('lang', locale);
    document.body.classList.remove('rtl', 'ltr');
    document.body.classList.add(dir);
  }, [locale]);

  return null;
}
