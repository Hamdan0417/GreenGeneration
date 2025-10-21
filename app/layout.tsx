import '@/styles/globals.css';
import type {Metadata} from 'next';
import {ReactNode} from 'react';
import {inter, tajawal} from '@/lib/fonts';

export const metadata: Metadata = {
  metadataBase: new URL('https://ggen.sa'),
  title: {
    default: 'الجيل الأخضر | Green Generation',
    template: '%s | Green Generation'
  },
  description:
    'Green Generation delivers smart agriculture & livestock solutions across Saudi Arabia with AI irrigation, showrooms, and branded tools.',
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({children}: {children: ReactNode}) {
  return (
    <html suppressHydrationWarning>
      <body className={`${inter.variable} ${tajawal.variable} rtl`}>{children}</body>
    </html>
  );
}
