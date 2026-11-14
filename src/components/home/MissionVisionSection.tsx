import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PINK = '#d84ba5';

const MissionVisionSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
            About Uthutho
          </p>
          <h2 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-foreground">
            Revolutionising{' '}
            <span className="relative inline-block" style={{ color: PINK }}>
              shared commutes
              <span aria-hidden className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full bg-black opacity-90" />
            </span>
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {[
            {
              label: 'Our Mission',
              title: 'Bring community transport into the 21st century',
              body: 'We harness technology to make shared commutes seamless, convenient, and safe — for the millions of South Africans who rely on them every day.',
            },
            {
              label: 'Our Vision',
              title: 'Reimagine transport for 4 million riders',
              body: 'A South Africa where every rider and every driver has real-time visibility, fair access, and a transport system that works for them.',
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={prefersReduced ? false : { opacity: 0, x: i === 0 ? -40 : 40 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-8 sm:p-10"
            >
              <p className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: PINK }}>
                {item.label}
              </p>
              <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold leading-tight text-foreground">
                {item.title}
              </h3>
              <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                {item.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;