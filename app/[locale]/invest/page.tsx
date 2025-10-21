import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {ROICalculator} from '@/components/sections/roi-calculator';
import {UseOfProceeds, type UseOfProceedsItem} from '@/components/sections/use-of-proceeds';
import type {Locale} from '@/lib/i18n/locales';


export async function generateMetadata({params}: {params: {locale: Locale}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale});
  const invest = t.raw('invest') as {title: string; rationale: string; ask: string};
  return {
    title: invest.title,
    description: `${invest.ask} • ${invest.rationale}`,
    openGraph: {
      title: invest.title,
      description: `${invest.ask} • ${invest.rationale}`,
      images: ['/og/invest.png']
    }
  };
}

export default async function InvestPage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const invest = t.raw('invest') as {
    title: string;
    askLabel: string;
    ask: string;
    rationale: string;
    tableTab: string;
    chartTab: string;
    legend: string;
    columnTitle: string;
    useOfProceeds: UseOfProceedsItem[];
  };

  return (
    <div className="space-y-16 pb-16">
      <section className="container-responsive mt-10 space-y-4">
        <h1 className="text-4xl font-bold text-ink dark:text-mist">{invest.title}</h1>
        <p className="text-lg font-semibold text-forest dark:text-sand">
          {invest.askLabel}: {invest.ask}
        </p>
        <p className="max-w-3xl text-sm text-ink/70 dark:text-mist/70">{invest.rationale}</p>
      </section>
      <UseOfProceeds
        items={invest.useOfProceeds}
        ask={`${invest.title} • ${invest.ask}`}
        rationale={invest.rationale}
        tableLabel={invest.tableTab}
        chartLabel={invest.chartTab}
        legendLabel={invest.legend}
        columnTitle={invest.columnTitle}
      />
      <ROICalculator
        heading={t('roi.heading')}
        sitesLabel={t('roi.sitesLabel')}
        priceLabel={t('roi.priceLabel')}
        efficiencyLabel={t('roi.efficiencyLabel')}
        estimateLabel={t('roi.estimate')}
        disclaimer={t('roi.disclaimer')}
        resetLabel={t('roi.reset')}
      />
    </div>
  );
}
