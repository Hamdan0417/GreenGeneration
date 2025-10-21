'use client';

import {motion} from 'framer-motion';
import {useCallback, useState} from 'react';
import type {KeyboardEvent} from 'react';

export type TimelineStep = {
  idx: string;
  date: string;
  title: string;
  text: string;
};

export function Timeline({steps, heading, eyebrow}: {steps: TimelineStep[]; heading: string; eyebrow?: string}) {
  const [active, setActive] = useState(0);

  const onKey = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        setActive((prev) => (prev + 1) % steps.length);
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        setActive((prev) => (prev - 1 + steps.length) % steps.length);
      }
      if (event.key === 'Home') {
        event.preventDefault();
        setActive(0);
      }
      if (event.key === 'End') {
        event.preventDefault();
        setActive(steps.length - 1);
      }
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        setActive(index);
      }
    },
    [steps.length]
  );

  return (
    <section className="container-responsive mt-24" aria-labelledby="timeline-heading">
      <div className="text-center lg:text-left">
        <p className="text-gradient text-sm font-semibold uppercase tracking-widest">{eyebrow ?? heading}</p>
        <h2 id="timeline-heading" className="mt-2 text-3xl font-bold text-ink dark:text-mist">
          {heading}
        </h2>
      </div>
      <div className="mt-12 space-y-10">
        <div className="flex flex-col gap-6 lg:flex-row">
          <ol className="flex flex-1 flex-col gap-4 lg:flex-row lg:items-stretch" role="tablist" aria-orientation="horizontal">
            {steps.map((step, index) => {
              const isActive = active === index;
              return (
                <li key={step.idx} className="flex-1">
                  <button
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`timeline-panel-${index}`}
                    id={`timeline-tab-${index}`}
                    onClick={() => setActive(index)}
                    onKeyDown={(event) => onKey(event, index)}
                    className={`group flex w-full flex-col gap-2 rounded-3xl border p-5 text-start transition focus-visible:ring-2 focus-visible:ring-teal ${
                      isActive
                        ? 'border-teal bg-mist shadow-glow dark:bg-ink'
                        : 'border-ink/10 bg-white/40 hover:border-teal/40 dark:border-mist/20 dark:bg-ink/60'
                    }`}
                  >
                    <span className="text-sm font-semibold text-teal">{step.date}</span>
                    <span className="text-lg font-semibold text-ink dark:text-mist">{step.title}</span>
                    <motion.span
                      layoutId="timeline-bar"
                      className={`mt-2 h-1 rounded-full ${isActive ? 'bg-teal' : 'bg-transparent'}`}
                    />
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
        <div className="glass-card relative overflow-hidden p-8" role="presentation">
          {steps.map((step, index) => {
            const isActive = active === index;
            return (
              <motion.div
                key={step.idx}
                id={`timeline-panel-${index}`}
                role="tabpanel"
                aria-labelledby={`timeline-tab-${index}`}
                hidden={!isActive}
                initial={{opacity: 0, y: 12}}
                animate={isActive ? {opacity: 1, y: 0} : {opacity: 0, y: 12}}
                transition={{duration: 0.4}}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-forest dark:text-sand">{step.title}</h3>
                <p className="text-sm text-ink/70 dark:text-mist/70">{step.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
