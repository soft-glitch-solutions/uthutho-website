import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PARTNERS = [
  { name: 'Partner One', src: '/partners/one.svg' },
  { name: 'Partner Two', src: '/partners/two.svg' },
  { name: 'Partner Three', src: '/partners/three.svg' },
  { name: 'Partner Four', src: '/partners/four.svg' },
];

const PartnersSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-secondary/40">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-10 text-center">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Our Partners
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={partner.name}
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: i * 0.06 }}
              className="flex h-20 items-center justify-center rounded-2xl bg-card border border-border/60 shadow-sm grayscale hover:grayscale-0 transition-all"
            >
              <img
                src={partner.src}
                alt={partner.name}
                className="h-8 w-auto object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;