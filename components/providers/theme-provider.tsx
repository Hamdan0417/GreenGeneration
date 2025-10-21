'use client';

import {ThemeProvider as NextThemesProvider} from 'next-themes';
import {ReactNode, useEffect, useState} from 'react';

export function ThemeProvider({children}: {children: ReactNode}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {mounted ? children : <div className="min-h-screen bg-mist dark:bg-ink" />}
    </NextThemesProvider>
  );
}
