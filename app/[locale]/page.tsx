import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';
import {Hero} from '@/components/sections/hero';
import {KPICards, type KPI} from '@/components/sections/kpi-cards';
import {PillarsGrid, type Pillar} from '@/components/sections/pillars-grid';
import {CTASection} from '@/components/sections/cta-block';
import {ROICalculator} from '@/components/sections/roi-calculator';
import {UseOfProceeds, type UseOfProceedsItem} from '@/components/sections/use-of-proceeds';
import {Timeline, type TimelineStep} from '@/components/sections/timeline';
import type {Locale} from '@/lib/i18n/locales';


export async function generateMetadata({params}: {params: {locale: Locale}}): Promise<Metadata> {
  const t = await getTranslations({locale: params.locale});
  return {
    title: t('hero.title'),
    description: t('opportunity.oneLiner'),
    openGraph: {
      title: t('hero.title'),
      description: t('opportunity.oneLiner'),
      images: ['/og/home.png']
    }
  };
}

export default async function HomePage({params}: {params: {locale: Locale}}) {
  const {locale} = params;
  const t = await getTranslations({locale});
  const kpis = t.raw('kpis') as KPI[];
  const pillars = t.raw('pillars.items') as Pillar[];
  const timeline = t.raw('timeline.steps') as TimelineStep[];
  const useOfProceeds = t.raw('invest.useOfProceeds') as UseOfProceedsItem[];
  const cta = t.raw('ctaBlock') as {title: string; subtitle: string; contacts: string[]};

  return (
    <div className="space-y-16 pb-16">
      <Hero locale={locale} />
      <KPICards
        items={kpis}
        title={t('homeKpis.heading')}
        subtitle={t('homeKpis.subheading')}
      />
      <PillarsGrid
        pillars={pillars}
        heading={t('pillars.heading')}
        title={t('pillars.heading')}
        cta={t('pillars.cta')}
      />
      <Timeline steps={timeline} heading={t('story.timelineHeading')} />
      <UseOfProceeds
        items={useOfProceeds}
        ask={`${t('invest.title')} • ${t('invest.ask')}`}
        rationale={t('invest.rationale')}
        tableLabel={t('invest.tableTab')}
        chartLabel={t('invest.chartTab')}
        legendLabel={t('invest.legend')}
        columnTitle={t('invest.columnTitle')}
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
      <CTASection
        title={cta.title}
        subtitle={cta.subtitle}
        contacts={cta.contacts}
        locale={locale}
        ctaLabel={t('navigation.contactCta')}
      />
    </div>
  );
}
