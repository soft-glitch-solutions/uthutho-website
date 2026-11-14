import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, MessageSquare, Bus, Shield } from 'lucide-react';

const PINK = '#d84ba5';

const FEATURES = [
  {
    icon: MapPin,
    title: 'Live Route Demand',
    body: 'See queue levels and commuter activity before you leave.',
    tag: 'COMMUTERS',
  },
  {
    icon: MessageSquare,
    title: 'Journey Chats',
    body: 'Swap live updates with people already on your route.',
    tag: 'COMMUTERS',
  },
  {
    icon: Bus,
    title: 'School Transport',
    body: 'Review provider routes and service areas in one place.',
    tag: 'PARENTS',
  },
  {
    icon: Shield,
    title: 'Safer Choices',
    body: 'Clear route info helps families decide with confidence.',
    tag: 'PARENTS',
  },
];

const FeaturesSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-secondary/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            One platform for{' '}
            <span className="relative inline-block" style={{ color: PINK }}>
              everyone
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full bg-black opacity-90" />
            </span>
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={prefersReduced ? false : { opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.08 }}
                whileHover={prefersReduced ? undefined : { y: -4 }}
                className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3"
              >
                <div
                  className="relative w-full h-32 rounded-[1.25rem] flex items-center justify-center overflow-hidden"
                  style={{ backgroundColor: PINK }}
                >
                  <div className="absolute top-3 right-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-black shadow-sm">
                    {feature.tag}
                  </div>
                  <div className="size-14 rounded-full bg-white/25 flex items-center justify-center">
                    <Icon className="size-7 text-white" />
                  </div>
                </div>
                <div className="p-4 pt-5">
                  <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
                    {feature.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;