'use client';

import {animate, motion, useInView} from 'framer-motion';
import {useEffect, useRef, useState} from 'react';

export type KPI = {
  value: string;
  label: string;
};

function useCountUp(value: string, inView: boolean) {
  const [display, setDisplay] = useState(value);
  useEffect(() => {
    if (!inView) return;
    const match = value.match(/([+-]?\d*\.?\d+)/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const numeric = parseFloat(match[1]);
    const prefix = value.slice(0, match.index ?? 0);
    const suffix = value.slice((match.index ?? 0) + match[1].length);
    const controls = animate(0, numeric, {
      duration: 1.4,
      ease: 'easeOut',
      onUpdate: (latest) => {
        const formatted = Number.isInteger(numeric)
          ? Math.round(latest).toString()
          : latest.toFixed(1);
        setDisplay(`${prefix}${formatted}${suffix}`);
      }
    });
    return () => controls.stop();
  }, [value, inView]);
  return display;
}

export function KPICards({items, title, subtitle}: {items: KPI[]; title: string; subtitle: string}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, {once: true, margin: '-30%'});

  return (
    <section ref={ref} id="opportunity" className="container-responsive mt-24" aria-labelledby="kpi-heading">
      <div className="mb-10 flex flex-col gap-4 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
        <div>
          <p className="text-gradient text-sm font-semibold uppercase tracking-widest">KPIs</p>
          <h2 id="kpi-heading" className="mt-2 text-3xl font-bold text-ink dark:text-mist">
            {title}
          </h2>
        </div>
        <p className="text-sm text-ink/70 dark:text-mist/70">
          {subtitle}
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {items.map((item, idx) => (
          <KPIItem key={item.label} item={item} index={idx} inView={inView} />
        ))}
      </div>
    </section>
  );
}

function KPIItem({item, index, inView}: {item: KPI; index: number; inView: boolean}) {
  const display = useCountUp(item.value, inView);
  return (
    <motion.article
      className="glass-card flex flex-col gap-4 p-8"
      initial={{opacity: 0, y: 24}}
      animate={inView ? {opacity: 1, y: 0} : {}}
      transition={{delay: index * 0.1, duration: 0.5}}
      role="group"
      aria-label={item.label}
    >
      <p className="text-4xl font-bold text-forest dark:text-sand" aria-live="polite">{display}</p>
      <p className="text-sm text-ink/70 dark:text-mist/70">{item.label}</p>
    </motion.article>
  );
}
