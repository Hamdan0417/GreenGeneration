import ar from '@/content/ar.json';
import en from '@/content/en.json';

describe('Use of proceeds totals', () => {
  it('sums to 100 percent for Arabic locale', () => {
    const total = ar.invest.useOfProceeds.reduce((sum, item) => sum + item.pct, 0);
    expect(total).toBe(100);
  });

  it('sums to 100 percent for English locale', () => {
    const total = en.invest.useOfProceeds.reduce((sum, item) => sum + item.pct, 0);
    expect(total).toBe(100);
  });
});
