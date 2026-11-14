import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const LOGOS = [
  { name: 'TechCrunch', src: '/logos/techcrunch.svg' },
  { name: 'Forbes Africa', src: '/logos/forbes.svg' },
  { name: 'BusinessTech', src: '/logos/businesstech.svg' },
  { name: 'SABC', src: '/logos/sabc.svg' },
  { name: 'Daily Maverick', src: '/logos/dailymaverick.svg' },
  { name: 'Ventureburn', src: '/logos/ventureburn.svg' },
];

const AsSeenOnSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="border-y border-border/60 bg-secondary/40 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground">
          As featured in
        </p>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 whitespace-nowrap"
            animate={
              prefersReduced ? undefined : { x: ['0%', '-50%'] }
            }
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex h-10 shrink-0 items-center opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all"
              >
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-8 w-auto object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AsSeenOnSection;