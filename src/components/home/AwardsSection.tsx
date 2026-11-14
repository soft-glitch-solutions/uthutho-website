import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SceneHeader from './SceneHeader';

const AwardsSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  const cardVariants = {
    hidden: (i: number) => ({
      opacity: 0,
      x: i % 2 === 0 ? -40 : 40,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
    },
  };

  return (
    <section id="awards" className="relative bg-secondary/40">
      {/* Top blue bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-48 z-20"
        style={{
          background:
            'linear-gradient(to bottom, hsl(var(--primary) / 0.15), transparent)',
        }}
      />

      {/* Bottom blue bleed */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48 z-20"
        style={{
          background:
            'linear-gradient(to top, hsl(var(--primary) / 0.18), transparent)',
        }}
      />

      {/* Ghost wordmark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[18vw] sm:text-[22vw] font-black leading-none tracking-tighter text-foreground/[0.035]"
      >
        CREDIBILITY
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="Awards & Recognition"
          title="Trusted by "
          accentWord="innovators"
          accentColor="text-brand-green"
          description="Uthutho has been recognized by leading innovation programs across Africa — validating our mission to put everyday South Africans' money in motion."
        />

        <div className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3">
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              custom={i}
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants}
              whileHover={prefersReduced ? undefined : { y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3"
            >
              {/* Black logo block */}
              <div className="relative w-full h-48 sm:h-52 rounded-[1.25rem] bg-black flex items-center justify-center p-6 overflow-hidden">
                <div className="absolute top-3 right-3 bg-white/90 rounded-full px-2.5 py-1 text-[10px] font-bold text-black shadow-sm z-10">
                  {award.tag}
                </div>

                <img
                  src={award.logo}
                  alt={`${award.title} logo`}
                  loading="lazy"
                  className={`max-h-20 sm:max-h-24 w-auto object-contain relative z-10 ${award.logoClassName ?? ''}`}
                />
              </div>

              <div className="p-4 sm:p-5 pt-5">
                <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                  {award.title}
                </h3>
                <p className="mt-1 text-sm font-bold text-brand-green">
                  {award.subtitle}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">
                  {award.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const, delay: 0.2 }}
          className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          These recognitions aren't just trophies — they're validation that
          South Africa's mobility economy deserves transparent, accessible
          investment. Every award strengthens Uthutho's commitment to the
          drivers, riders, and investors building this future together.
        </motion.p>
      </div>
    </section>
  );
};

const awards = [
  {
    logo: 'https://img.redbull.com/images/c_limit,w_2000/e_trim:1:transparent/c_limit,w_300,h_272/bo_5px_solid_rgb:00000000/q_auto:best,f_auto/redbullcom/2024/7/25/hckaipzsonzjai5rvhld/red-bull-basement-logo',
    title: 'Red Bull Basement 2026',
    subtitle: 'South African Representative',
    description: 'Selected to represent our nation in a global showcase of innovation.',
    tag: 'Global',
    logoClassName: '',
  },
  {
    logo: 'https://africatechweek.co.za/wp-content/uploads/2023/02/SENTEch-1.png',
    title: 'Africa Tech Week',
    subtitle: 'Pitch Den Winners',
    description: 'Crowned winners for our vision to revolutionize transport across the continent.',
    tag: 'Winner',
    logoClassName: 'invert', // dark logo becomes white on black
  },
  {
    logo: '/lovable-uploads/ncic.png',
    title: 'NCIC Smart Mobility Challenge',
    subtitle: 'Winners',
    description: 'Honored for creating sustainable and intelligent transport solutions.',
    tag: 'Winner',
    logoClassName: '',
  },
];

export default AwardsSection;