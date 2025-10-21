import type {MetadataRoute} from 'next';
import {locales} from '@/lib/i18n/locales';

const baseUrl = 'https://ggen.sa';

const paths = ['', '/story', '/team', '/invest', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const path of paths) {
      const url = `${baseUrl}/${locale}${path}`.replace(/\/+$/, '/');
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: path === '' ? 1 : 0.8
      });
    }
  }

  return entries;
}
