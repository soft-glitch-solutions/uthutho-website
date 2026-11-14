import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, User, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PINK = '#d84ba5';

const CARDS = [
  {
    icon: User,
    eyebrow: 'Uthutho for Me',
    title: 'Live routes. Real updates.',
    body: 'See commuter activity, queue levels, and community updates on your route — before you leave home.',
    features: [
      'Live route demand',
      'Journey chats with commuters',
      'Community visibility',
    ],
    cta: 'Explore for commuters',
    bg: PINK,
    fg: '#ffffff',
  },
  {
    icon: Building2,
    eyebrow: 'Uthutho for Business',
    title: 'Safe, coordinated group transport.',
    body: 'Pre-book transport for your team, school, or community group — with routes and schedules that fit.',
    features: [
      'Pre-booked group transport',
      'Route customisation',
      'School & team transport',
    ],
    cta: 'Explore for business',
    bg: '#000000',
    fg: '#ffffff',
  },
];

const ForYouSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Built for{' '}
            <span className="relative inline-block" style={{ color: PINK }}>
              you
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full bg-black opacity-90" />
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-muted-foreground">
            Whether you're a daily commuter or coordinating group transport,
            Uthutho gives you the info and tools you need.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.eyebrow}
                initial={prefersReduced ? false : { opacity: 0, x: i === 0 ? -40 : 40 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
                whileHover={prefersReduced ? undefined : { y: -6 }}
                className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3"
              >
                {/* Colored top block */}
                <div
                  className="relative w-full h-44 rounded-[1.25rem] flex flex-col justify-end p-6 overflow-hidden"
                  style={{ backgroundColor: card.bg, color: card.fg }}
                >
                  <div className="mb-auto">
                    <Icon className="size-8 opacity-80" />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-wider opacity-80">
                    {card.eyebrow}
                  </p>
                  <h3 className="mt-1 font-display text-xl sm:text-2xl font-extrabold leading-tight">
                    {card.title}
                  </h3>
                </div>

                <div className="p-5">
                  <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                    {card.body}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {card.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                        <span
                          className="mt-1.5 size-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: PINK }}
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="ghost"
                    className="mt-4 -ml-2 gap-1 px-2 text-sm font-bold text-foreground hover:bg-secondary"
                  >
                    {card.cta}
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ForYouSection;