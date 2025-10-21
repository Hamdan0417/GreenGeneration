'use client';

import {useMemo, useState} from 'react';
import {Slider} from '@/components/ui/slider';
import {Button} from '@/components/ui/button';

export function ROICalculator({
  heading,
  sitesLabel,
  priceLabel,
  efficiencyLabel,
  estimateLabel,
  disclaimer,
  resetLabel
}: {
  heading: string;
  sitesLabel: string;
  priceLabel: string;
  efficiencyLabel: string;
  estimateLabel: string;
  disclaimer: string;
  resetLabel: string;
}) {
  const [sites, setSites] = useState(12);
  const [price, setPrice] = useState(3);
  const [efficiency, setEfficiency] = useState(18);

  const savings = useMemo(() => {
    const baseline = 950; // m3 per site annually
    const annual = sites * baseline * price * (efficiency / 100);
    return Math.round(annual);
  }, [sites, price, efficiency]);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('en-US', {style: 'currency', currency: 'SAR', maximumFractionDigits: 0}).format(
      value
    );

  return (
    <section className="container-responsive mt-24" aria-labelledby="roi-heading">
      <div className="glass-card grid gap-8 p-8 lg:grid-cols-[1.1fr_minmax(0,1fr)]">
        <div className="space-y-4">
          <h2 id="roi-heading" className="text-2xl font-semibold text-ink dark:text-mist">
            {heading}
          </h2>
          <p className="text-sm text-ink/70 dark:text-mist/70">{disclaimer}</p>
          <div className="rounded-2xl bg-forest/10 p-6 dark:bg-mist/10">
            <p className="text-sm font-medium text-forest dark:text-sand">{estimateLabel}</p>
            <p className="mt-2 text-3xl font-bold text-forest dark:text-sand" aria-live="polite">
              {formatCurrency(savings)}
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <Control
            label={sitesLabel}
            value={sites}
            min={1}
            max={30}
            onChange={(val) => setSites(val)}
          />
          <Control
            label={priceLabel}
            value={price}
            min={1}
            max={6}
            step={0.5}
            onChange={(val) => setPrice(val)}
          />
          <Control
            label={efficiencyLabel}
            value={efficiency}
            min={5}
            max={35}
            onChange={(val) => setEfficiency(val)}
          />
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setSites(12);
              setPrice(3);
              setEfficiency(18);
            }}
          >
            {resetLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}

function Control({
  label,
  value,
  min,
  max,
  step = 1,
  onChange
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: number) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm font-medium text-ink dark:text-mist">
        <label>{label}</label>
        <span>{value}</span>
      </div>
      <Slider
        min={min}
        max={max}
        step={step}
        value={[value]}
        onValueChange={(values) => onChange(values[0] ?? value)}
        aria-label={label}
      />
    </div>
  );
}
