import type { MetadataRoute } from 'next';

const baseUrl = 'https://ggen.sa';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*' }],
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
