import ar from '@/content/ar.json';
import en from '@/content/en.json';

function validate(locale: 'ar' | 'en') {
  const content = locale === 'ar' ? ar : en;
  const total = content.invest.useOfProceeds.reduce((sum, item) => sum + item.pct, 0);
  if (total !== 100) {
    throw new Error(`Use of proceeds for ${locale} totals ${total}, expected 100`);
  }
  console.log(`Use of proceeds totals for ${locale} validated: ${total}%`);
}

validate('ar');
validate('en');
