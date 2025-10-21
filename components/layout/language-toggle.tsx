'use client';

import {usePathname, useRouter} from '@/lib/navigation';
import {useTransition} from 'react';
import {Button} from '@/components/ui/button';
import type {Locale} from '@/lib/i18n/locales';

export function LanguageToggle({locale, label}: {locale: Locale; label: string}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={() =>
        startTransition(() => {
          router.replace(pathname, {locale: nextLocale});
        })
      }
      aria-label={label}
      disabled={isPending}
    >
      {nextLocale.toUpperCase()}
    </Button>
  );
}
