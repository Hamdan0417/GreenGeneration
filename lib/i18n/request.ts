import {getRequestConfig} from 'next-intl/server';

export default getRequestConfig(async ({locale}) => {
  const supportedLocales = ['ar', 'en'] as const;
  const finalLocale = supportedLocales.includes(locale as (typeof supportedLocales)[number])
    ? locale
    : 'ar';

  return {
    messages: (await import(`../../content/${finalLocale}.json`)).default
  };
});
