import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type Variants,
  type Transition,
} from 'framer-motion';

import TeamMember, { TeamMemberProps } from '../TeamMember';

/* ============================================================
   MOTION PRIMITIVES — Google Labs style (matches Home.tsx)
   ============================================================ */

const TEAL = '#1ea2b1';

const SPRING: Transition = {
  type: 'spring',
  stiffness: 260,
  damping: 30,
  mass: 0.9,
};

const SOFT_SPRING: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 22,
  mass: 1,
};

const rise: Variants = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SPRING },
  },
};

const riseLg: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SOFT_SPRING },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 12, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { ...SPRING },
  },
};

const stagger = (gap = 0.07, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

const viewportOnce = { once: true, amount: 0.2 } as const;

/* ============================================================
   MAGNETIC CARD
   ============================================================ */

const MagneticCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className, strength = 8 }) => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const onMove = (e: React.MouseEvent) => {
    if (prefersReduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    x.set(((e.clientX - cx) / r.width) * strength * 2);
    y.set(((e.clientY - cy) / r.height) * strength * 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ============================================================
   SCENE HEADER — per-word reveal + wipe underline
   ============================================================ */

const SceneHeader: React.FC<{
  eyebrow?: string;
  title: string;
  accentWord?: string;
  accentColor?: string;
  description?: string;
}> = ({ eyebrow, title, accentWord, accentColor = TEAL, description }) => {
  const prefersReduced = useReducedMotion();
  const words = title.split(' ');

  return (
    <div className="relative z-10 max-w-4xl text-center mx-auto mb-10 sm:mb-16">
      {eyebrow && (
        <motion.span
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...SPRING }}
          className="block text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground mb-2 sm:mb-3"
        >
          {eyebrow}
        </motion.span>
      )}

      <motion.h2
        initial={prefersReduced ? false : 'hidden'}
        whileInView={prefersReduced ? undefined : 'visible'}
        viewport={viewportOnce}
        variants={stagger(0.045)}
        className="font-display text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-foreground"
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={{
              hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
              visible: {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                transition: { ...SPRING },
              },
            }}
            className="inline-block mr-[0.25em]"
          >
            {word}
          </motion.span>
        ))}
        {accentWord && (
          <>
            {' '}
            <motion.span
              variants={{
                hidden: { opacity: 0, y: 18, filter: 'blur(5px)' },
                visible: {
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                  transition: { ...SPRING },
                },
              }}
              className="relative inline-block"
              style={{ color: accentColor }}
            >
              {accentWord}
              <motion.span
                aria-hidden
                initial={prefersReduced ? false : { scaleX: 0 }}
                whileInView={prefersReduced ? undefined : { scaleX: 1 }}
                viewport={viewportOnce}
                transition={{ ...SPRING, delay: 0.35 }}
                className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full bg-black opacity-90 origin-left"
              />
            </motion.span>
          </>
        )}
      </motion.h2>

      {description && (
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...SPRING, delay: 0.15 }}
          className="mt-4 sm:mt-5 text-sm sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto"
        >
          {description}
        </motion.p>
      )}
    </div>
  );
};

/* ============================================================
   TEAM DATA
   ============================================================ */

const teamMembers: TeamMemberProps[] = [
  {
    id: 1,
    name: 'Shaqeel Less',
    title: 'Founder',
    description:
      'Shaqeel is the visionary behind Uthutho, building a smarter way for communities to navigate and access public transport information.',
    image: '/lovable-uploads/shaqeel.jpg',
    socialLinks: {
      linkedin:
        'https://www.linkedin.com/in/shaqeel-less-11979a186?originalSubdomain=za',
    },
  },
  {
    id: 4,
    name: 'Makhi Mangxola',
    title: 'Co-Founder',
    description:
      "Makhi drives Uthutho's product strategy by bridging technical development with business needs. He leads business analysis, defines system requirements, supports data-driven decision-making, and works closely with developers to ensure scalable, market-ready transport solutions aligned with Uthutho's growth goals.",
    image: '/lovable-uploads/makhi.jpeg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/makhi-mangxola-4b740718b/',
    },
  },
  {
    id: 2,
    name: 'Delisha-Ann Naicker',
    title: 'Head of Business Operations',
    description:
      'Delisha ensures the Uthutho experience is smooth, functional, and beautifully designed — for every commuter and community.',
    image: '/lovable-uploads/delisha.jpeg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/delisha-ann-n-710879115/',
    },
  },
  {
    id: 9,
    name: 'Waseem Dollie',
    title: 'Business Analyst & Developer',
    description:
      "Waseem ensures Uthutho's systems and processes align with governance best practices, supporting compliance, structure, and sustainable platform growth.",
    image: '/lovable-uploads/waseem.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/waseemdollie/',
    },
  },
  {
    id: 3,
    name: 'Zeyn Kisten',
    title: 'Business Development & Account Manager',
    description:
      'Zeyn brings financial expertise to Uthutho, ensuring sound financial planning, analysis, and sustainability as we scale our transport solutions across communities.',
    image: '/lovable-uploads/zeyn.jpeg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/zeyn-kisten/',
    },
  },
  {
    id: 8,
    name: 'Zacharia Solomons',
    title: 'Brand Ambassador, UI/UX Tester & Support',
    description:
      'Zacharia contributes to Uthutho growth by identifying new opportunities, supporting partnerships, and helping align business initiatives with community needs.',
    image: '/lovable-uploads/zac.jpg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/naeema-less-77b9a31a9/',
    },
  },
  {
    id: 5,
    name: 'Ishmael Sikhikhi',
    title: 'Developer & Network Mapper',
    description:
      'Ishmael ensures our applications meet the highest standards through rigorous testing and quality control, while also contributing to our software development.',
    image: '/lovable-uploads/Ishmeal.jpg',
    socialLinks: {
      linkedin:
        'https://www.linkedin.com/in/ishmael-sikhikhi-2b8086126/?originalSubdomain=za',
    },
  },
  {
    id: 6,
    name: 'Eben Jacobs',
    title: 'Brand Ambassador, UI/UX Tester & Support',
    description:
      'Eben meticulously tests our software to identify issues, improve performance, and ensure every product release is reliable and user-friendly.',
    image: '/lovable-uploads/eben.jpeg',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/eben-jacobs-92090037a/',
    },
  },
  {
    id: 10,
    name: 'Aakifah Moosa',
    title: 'Network Mapper',
    description:
      'Aakifah is responsible for mapping and maintaining our network infrastructure, ensuring the highest levels of performance and reliability.',
    image: '/lovable-uploads/aakifah.png',
    socialLinks: {
      linkedin: 'https://www.linkedin.com/in/aakifah-moosa/',
    },
  },
];

/* ============================================================
   TEAM SECTION
   ============================================================ */

const TeamSection = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="about" className="relative bg-background overflow-hidden">
      {/* subtle backdrop grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      <div className="relative mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="Our Team"
          title="The Driving Force Behind"
          accentWord="Uthutho"
          accentColor={TEAL}
          description="Meet the dedicated individuals working to transform public transport in South Africa. Our team combines expertise in technology, design, and community engagement to build solutions that make a difference."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.id}
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={scaleIn}
              transition={{ ...SPRING, delay: (i % 4) * 0.06 }}
            >
              <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3">
                <TeamMember {...member} />
              </MagneticCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;