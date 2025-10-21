'use client';

import Image from 'next/image';
import {motion} from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';

export type Pillar = {
  title: string;
  body: string;
  details: string;
};

const icons = ['geography', 'production', 'ai', 'health', 'brand'];

export function PillarsGrid({pillars, heading, title, cta}: {pillars: Pillar[]; heading: string; title: string; cta: string}) {
  return (
    <section className="container-responsive mt-24" aria-labelledby="pillars-heading">
      <div className="text-center lg:text-left">
        <p className="text-gradient text-sm font-semibold uppercase tracking-widest">{heading}</p>
        <h2 id="pillars-heading" className="mt-2 text-3xl font-bold text-ink dark:text-mist">
          {title}
        </h2>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {pillars.map((pillar, index) => (
          <Dialog key={pillar.title}>
            <DialogTrigger asChild>
              <motion.button
                type="button"
                className="glass-card group flex w-full flex-col items-start gap-6 p-8 text-left transition hover:-translate-y-1"
                initial={{opacity: 0, y: 24}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-20%'}}
                transition={{delay: index * 0.08, duration: 0.5}}
              >
                <span className="inline-flex items-center gap-3 rounded-full bg-ink/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-teal dark:bg-mist/10">
                  {index + 1}
                </span>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12">
                    <Image src={`/icons/${icons[index]}.svg`} alt={pillar.title} fill sizes="48px" />
                  </div>
                  <h3 className="text-xl font-semibold text-ink dark:text-mist">{pillar.title}</h3>
                </div>
                <p className="text-sm text-ink/70 dark:text-mist/70">{pillar.body}</p>
                <span className="mt-auto text-sm font-medium text-teal">{cta}</span>
              </motion.button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-2xl text-forest dark:text-sand">{pillar.title}</DialogTitle>
                <DialogDescription>{pillar.body}</DialogDescription>
              </DialogHeader>
              <div className="mt-4 space-y-4 text-sm leading-relaxed text-ink/80 dark:text-mist/80">
                <p>{pillar.details}</p>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </section>
  );
}
