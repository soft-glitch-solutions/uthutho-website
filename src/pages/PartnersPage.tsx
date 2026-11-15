import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
  type Transition,
} from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  Trophy,
  Award,
  Building2,
  Rocket,
  Handshake,
  Mail,
  Globe,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Target,
  Users,
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Zap,
} from 'lucide-react';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const TEAL = '#1ea2b1';
const ORANGE = '#f18f01';
const PINK = '#e151af';

/* ============================================================
   MOTION PRIMITIVES
   ============================================================ */

const ONE_UI_EASE = [0.22, 0.25, 0.0, 1.0] as const;

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

const ONE_UI_TRANSITION: Transition = {
  duration: 0.35,
  ease: ONE_UI_EASE,
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
   SCENE HEADER
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
          transition={ONE_UI_TRANSITION}
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
   PARTNER / RECOGNITION DATA
   ============================================================ */

interface PartnerLogo {
  id: string;
  name: string;
  shortName: string;
  description: string;
  logoUrl: string;
  logoClassName?: string;
  accent: string;
  category: 'Award' | 'Programme' | 'Partner';
}

const PARTNERS: PartnerLogo[] = [
  {
    id: 'gcip',
    name: 'Global Cleantech Innovation Programme (GCIP-SA)',
    shortName: 'GCIP-SA',
    description:
      'A UNIDO and TIA programme funded by the Global Environment Facility. Uthutho was recognised within this ecosystem for cleantech-aligned mobility innovation.',
    // Note: Google encrypted images block hotlinking. Save it locally if it breaks.
    logoUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4qvPTyjU2a4Ebc2141vbkRrIxmq0O9qDW-_jDMtFYVw&s=10',
    accent: TEAL,
    category: 'Programme',
  },
  {
    id: 'ncic',
    name: 'NCIC Smart Mobility Cleantech Challenge',
    shortName: 'NCIC',
    description:
      'The NCIC Gauteng Smart Mobility Cleantech Challenge supports digital solutions that make informal transport more efficient, greener, and data-driven.',
    logoUrl: '',
    accent: ORANGE,
    category: 'Award',
  },
  {
    id: 'tia',
    name: 'Technology Innovation Agency (TIA)',
    shortName: 'TIA',
    description:
      "TIA is the South African government agency that stimulates and intensifies technological innovation. TIA's mandate is to use science and technology to develop new industries and create sustainable jobs.",
    logoUrl: 'https://www.tia.org.za/storage/2023/12/tia-logo-1.png',
    accent: PINK,
    category: 'Partner',
  },
  {
    id: 'tshimologong',
    name: 'Tshimologong Digital Innovation Precinct',
    shortName: 'Tshimologong',
    description:
      "A Wits University-owned digital innovation hub in Braamfontein, Johannesburg. Tshimologong incubates startups, commercialises research, and grows Africa's digital skills pipeline.",
    logoUrl: 'https://tshimologong.joburg/wp-content/uploads/2021/08/tshimologong-dark-logo.svg',
    accent: TEAL,
    category: 'Partner',
  },
  {
    id: 'dsti',
    name: 'Department of Science, Technology and Innovation (DSTI)',
    shortName: 'DSTI',
    description:
      "The South African government department responsible for driving research, science, and innovation. DSTI oversees TIA and funds programmes that turn research into commercial products.",
    logoUrl: 'https://kascphsjbbdmimgncrbn.supabase.co/storage/v1/object/public/media/science-technology_-and-innovation.jpg',
    accent: ORANGE,
    category: 'Partner',
  },
];

/* ============================================================
   PARTNERS PAGE
   ============================================================ */

const PartnersPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <main>
        {/* ===== HERO ===== */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden bg-background pt-24 pb-16 sm:pt-32 sm:pb-20"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-background"></div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          <motion.div
            style={
              prefersReduced ? undefined : { y: heroY, opacity: heroOpacity }
            }
            className="container mx-auto px-4 sm:px-6 relative z-10"
          >
            <SceneHeader
              eyebrow="Partners & Recognition"
              title="Backed by the"
              accentWord="best"
              accentColor={TEAL}
              description="Uthutho didn't get here alone. South Africa's leading innovation institutions have recognised, supported, and championed the mission to digitise public transport."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#recognition"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                See our backers
                <ChevronDown className="size-4" />
              </a>
              <a
                href="#join"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                <Handshake className="size-4" />
                Become a partner
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== WINNERS BANNER ===== */}
        <section className="relative bg-secondary/40 border-y border-border/60">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
            >
              <motion.div
                variants={rise}
                className="flex items-center gap-3 rounded-full bg-card border border-border/60 px-5 py-2.5"
              >
                <Trophy className="size-5" style={{ color: ORANGE }} />
                <span className="text-sm font-bold text-foreground">
                  Red Bull Basement 2026 — National Champion
                </span>
              </motion.div>
              <motion.div
                variants={rise}
                className="flex items-center gap-3 rounded-full bg-card border border-border/60 px-5 py-2.5"
              >
                <Award className="size-5" style={{ color: PINK }} />
                <span className="text-sm font-bold text-foreground">
                  Africa Tech Week — Pitch Den Winners
                </span>
              </motion.div>
              <motion.div
                variants={rise}
                className="flex items-center gap-3 rounded-full bg-card border border-border/60 px-5 py-2.5"
              >
                <ShieldCheck className="size-5" style={{ color: TEAL }} />
                <span className="text-sm font-bold text-foreground">
                  NCIC Smart Mobility — Winners
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== RECOGNITION WALL ===== */}
        <section id="recognition" className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="The ecosystem behind Uthutho"
              title="Recognised by"
              accentWord="innovators"
              accentColor={TEAL}
              description="From government departments to university incubators, these are the institutions that have validated, funded, or championed Uthutho's mission."
            />

            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {PARTNERS.map((partner, i) => (
                <motion.div
                  key={partner.id}
                  variants={{
                    hidden: { opacity: 0, y: 24, scale: 0.97 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      scale: 1,
                      transition: {
                        ...ONE_UI_TRANSITION,
                        delay: i * 0.07,
                      },
                    },
                  }}
                >
                  <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3 flex flex-col">
                    {/* Logo panel — added bg-white/95 so dark logos don't disappear on dark cards */}
                    <div
                      className="relative w-full h-44 rounded-[1.25rem] flex items-center justify-center p-6 overflow-hidden bg-white/95"
                      style={{
                        background: partner.logoUrl ? undefined : `radial-gradient(circle at 50% 50%, ${partner.accent}10, transparent 70%)`,
                      }}
                    >
                      {/* Category badge */}
                      <span
                        className="absolute top-3 right-3 z-10 text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 shadow-sm"
                        style={{
                          backgroundColor: `${partner.accent}15`,
                          color: partner.accent,
                        }}
                      >
                        {partner.category}
                      </span>

                      {/* Render Logo OR Fallback Text */}
                      {partner.logoUrl ? (
                        <img
                          src={partner.logoUrl}
                          alt={`${partner.name} logo`}
                          className={`max-h-full max-w-full object-contain relative z-10 ${partner.logoClassName ?? ''}`}
                          loading="lazy"
                        />
                      ) : (
                        <div className="flex flex-col items-center text-center">
                          <div
                            className="size-16 rounded-2xl flex items-center justify-center mb-3 shadow-sm"
                            style={{ backgroundColor: `${partner.accent}15` }}
                          >
                            {partner.id === 'ncic' && (
                              <Target className="size-8" style={{ color: partner.accent }} />
                            )}
                          </div>
                          <p
                            className="font-display text-base font-extrabold tracking-tight"
                            style={{ color: partner.accent }}
                          >
                            {partner.shortName}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Info panel */}
                    <div className="p-4 pt-5 flex flex-col flex-1">
                      <h3 className="font-display text-sm font-extrabold tracking-tight text-foreground leading-snug">
                        {partner.name}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground flex-1">
                        {partner.description}
                      </p>
                      {partner.logoUrl && !partner.logoUrl.includes('tbn') && (
                        <a
                          href={partner.logoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-3 inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:opacity-80"
                          style={{ color: partner.accent }}
                        >
                          Visit website
                          <ExternalLink className="size-3" />
                        </a>
                      )}
                    </div>
                  </MagneticCard>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
            >
              Uthutho is proud to be part of South Africa's innovation ecosystem.
              These institutions don't just recognise winners — they build the
              conditions for winners to exist.
            </motion.p>
          </div>
        </section>

        {/* ===== JOIN THE MOVEMENT ===== */}
        <section id="join" className="relative bg-secondary/60 overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="Join the movement"
              title="Looking to join and"
              accentWord="help"
              accentColor={ORANGE}
              description="Uthutho is bigger than two founders. If you're an operator, a school, an investor, or a builder — there's a place for you in this network."
            />

            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Briefcase,
                  title: 'Operators & schools',
                  description:
                    'List your routes, vehicles, and pricing on Uthutho. Reach thousands of commuters and parents actively looking for verified transport.',
                  cta: 'Partner as an operator',
                  color: TEAL,
                },
                {
                  icon: Rocket,
                  title: 'Investors & funders',
                  description:
                    "Uthutho is scaling from Cape Town to national coverage. If you back infrastructure that serves the 3.7 million daily commuters, let's talk.",
                  cta: 'Discuss investment',
                  color: ORANGE,
                },
                {
                  icon: Users,
                  title: 'Builders & researchers',
                  description:
                    'Data scientists, urban planners, developers — help us turn informal transport data into a public good.',
                  cta: 'Collaborate with us',
                  color: PINK,
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={prefersReduced ? false : 'hidden'}
                    whileInView={prefersReduced ? undefined : 'visible'}
                    viewport={viewportOnce}
                    variants={{
                      hidden: { opacity: 0, y: 24, scale: 0.97 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          ...ONE_UI_TRANSITION,
                          delay: i * 0.08,
                        },
                      },
                    }}
                  >
                    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 flex flex-col">
                      <div
                        className="size-12 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${card.color}15` }}
                      >
                        <Icon
                          className="size-6"
                          style={{ color: card.color }}
                        />
                      </div>
                      <h3 className="font-display text-lg font-extrabold text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">
                        {card.description}
                      </p>
                      <a
                        href="mailto:partners@uthutho.com"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold transition-colors hover:opacity-80"
                        style={{ color: card.color }}
                      >
                        {card.cta}
                        <ArrowRight className="size-4" />
                      </a>
                    </MagneticCard>
                  </motion.div>
                );
              })}
            </div>

            {/* Direct contact strip */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.25 }}
              className="mt-8 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div
                  className="size-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: `${TEAL}15` }}
                >
                  <Mail className="size-5" style={{ color: TEAL }} />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground">
                    Prefer email?
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Reach the partnerships team directly.
                  </p>
                </div>
              </div>
              <a
                href="mailto:partners@uthutho.com"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                partners@uthutho.com
                <ArrowRight className="size-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ===== CLOSING CTA ===== */}
        <section className="relative overflow-hidden bg-black">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-20">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
            >
              <motion.p
                variants={rise}
                className="mb-4 text-[11px] font-bold uppercase tracking-[0.25em] text-white/60"
              >
                Build with us
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                The future of transport is a{' '}
                <span className="relative inline-block" style={{ color: TEAL }}>
                  team sport
                  <motion.span
                    aria-hidden
                    initial={prefersReduced ? false : { scaleX: 0 }}
                    whileInView={prefersReduced ? undefined : { scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ ...SPRING, delay: 0.35 }}
                    className="absolute -bottom-1 left-0 right-0 h-[8px] rounded-full origin-left"
                    style={{ backgroundColor: TEAL }}
                  />
                </span>
              </motion.h2>
              <motion.p
                variants={rise}
                className="mt-6 text-sm sm:text-base text-white/70 max-w-xl mx-auto"
              >
                Whether you're an operator, funder, or builder — help us make
                every commute predictable.
              </motion.p>
              <motion.div
                variants={rise}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <a
                  href="mailto:partners@uthutho.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white hover:scale-105 transition-all"
                  style={{ backgroundColor: TEAL }}
                >
                  Start a conversation
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  <ArrowLeft className="size-4" />
                  Back to Home
                </a>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PartnersPage;