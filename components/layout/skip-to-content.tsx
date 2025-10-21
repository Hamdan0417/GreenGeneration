'use client';

import {useTranslations} from 'next-intl';

export function SkipToContent() {
  const t = useTranslations('navigation');
  return (
    <a href="#content" className="skip-link">
      {t('skip')}
    </a>
  );
}
