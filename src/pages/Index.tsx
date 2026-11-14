import React, { useRef, useState } from 'react';
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
  MapPin,
  Bus,
  Users,
  Clock,
  Navigation,
  CheckCircle2,
  ChevronDown,
  Route,
  Timer,
  Signal,
  UserCheck,
  ShieldCheck,
  GraduationCap,
  Radio,
  Send,
} from 'lucide-react';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import JourneyDrive from '@/components/home/JourneyDrive';
import TeamSection from '@/components/home/TeamSection';

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

<<<<<<< HEAD
      <JourneyDrive />
      
      <FeaturesSection />
      
      <GoalsSection />
      <AwardsSection />
      {/* Added new Timeline section */}
      <Timeline />
      
      <TeamSection />
=======
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
   HERO
   ============================================================ */

const HeroSection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const phoneScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={ref}
      id="home"
      className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center pt-20"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-background"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/uthutho-commute.png')] bg-cover bg-center opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between h-full">
        <motion.div
          style={prefersReduced ? undefined : { y: textY }}
          initial={prefersReduced ? false : 'hidden'}
          animate={prefersReduced ? undefined : 'visible'}
          variants={stagger(0.09, 0.2)}
          className="w-full max-w-xl md:w-1/2 text-center md:text-left"
        >
          <motion.h1
            variants={riseLg}
            className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
          >
            The Future of African{' '}
            <span className="text-brand-green">Mobility</span>, Mapped.
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 mx-auto md:mx-0 max-w-2xl text-lg text-muted-foreground sm:text-xl"
          >
            Uthutho is a community-powered platform that maps transport networks
            and provides real-time journey information for a safer, more
            efficient commute.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-8 flex flex-col items-center md:items-start justify-center md:justify-start gap-4"
          >
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-brand-green/80"
              >
                Download App
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#partners"
                className="group inline-flex items-center justify-center rounded-full border border-border bg-secondary/60 px-6 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                Partner With Us
              </a>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 mt-4">
              <a
                href="https://play.google.com/store/apps/details?id=com.softglitch.uthutho&hl=en_ZA"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQobhWPz0ruWVxG5fiJVRf3ctDkP-Yym8XSCY4VNXTXW1sOz0Z6"
                  alt="Get it on Google Play"
                  className="h-12"
                />
              </a>
              <a
                href="https://appgallery.huawei.com/app/C116453879"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="https://firstimpact.co.za/wp-content/uploads/2024/02/huawei-Badge-Black-huawei-app-gallery-1-1024x307.png"
                  alt="Available on Huawei AppGallery"
                  className="h-12"
                />
              </a>
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-80"
              >
                <img
                  src="https://appassets.mvtdev.com/index/public-transit-resources/img/store-buttons/web_app-badge_en.webp"
                  alt="Web App"
                  className="h-12"
                />
              </a>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          style={
            prefersReduced ? undefined : { y: phoneY, scale: phoneScale }
          }
          initial={prefersReduced ? false : { opacity: 0, scale: 0.92 }}
          animate={prefersReduced ? undefined : { opacity: 1, scale: 1 }}
          transition={{ ...SOFT_SPRING, delay: 0.4 }}
          className="w-full md:w-1/2 mt-12 md:mt-0 flex justify-center"
        >
          <div className="relative w-[280px] sm:w-[320px] h-[560px] sm:h-[640px] mx-auto pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-green via-brand-orange to-brand-red opacity-20 blur-2xl rounded-full"></div>
            <div className="relative z-10 bg-black/60 rounded-[40px] p-3 shadow-2xl border border-white/10 backdrop-blur-sm">
              <div className="relative overflow-hidden rounded-[32px] h-[530px] sm:h-[610px]">
                <iframe
                  className="w-full h-full absolute top-0 left-0 scale-[1.02]"
                  src="https://www.youtube.com/embed/AFaaiVxz0LU?autoplay=1&mute=1&loop=1&playlist=AFaaiVxz0LU&controls=0&showinfo=0&rel=0&playsinline=1&modestbranding=1"
                  title="Uthutho App Showcase"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   AS SEEN ON
   ============================================================ */

const AS_SEEN_ON = [
  'Red Bull',
  'News24',
  'UWC',
  'Hypertext',
  'Weekend Argus',
  'StartUp Magazine',
  'IOL',
  'Youth Village',
];

const AsSeenOnSection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  return (
    <section className="border-y border-border/60 bg-secondary/40 py-10">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 8 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={ONE_UI_TRANSITION}
          className="mb-6 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-muted-foreground"
        >
          As featured in
        </motion.p>

        <div
          className="relative overflow-hidden"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            WebkitMaskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
            maskImage:
              'linear-gradient(to right, transparent, black 8%, black 92%, transparent)',
          }}
        >
          <motion.div
            className="flex gap-16 whitespace-nowrap"
            animate={
              prefersReduced
                ? undefined
                : { x: hovered ? undefined : ['0%', '-50%'] }
            }
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            {[...AS_SEEN_ON, ...AS_SEEN_ON].map((outlet, i) => (
              <div
                key={`${outlet}-${i}`}
                className="flex h-10 shrink-0 items-center"
              >
                <span className="text-lg font-bold tracking-tight text-muted-foreground/60">
                  {outlet}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   STORY SECTION
   ============================================================ */

const StorySection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const routeLength = useTransform(scrollYProgress, [0.1, 0.6], [0, 1]);
  const dotX = useTransform(scrollYProgress, [0.1, 0.6], [0, 100]);
  const dotOpacity = useTransform(
    scrollYProgress,
    [0.05, 0.15, 0.55, 0.65],
    [0, 1, 1, 0]
  );

  const storySteps = [
    {
      time: '05:45',
      label: 'Wake up',
      text: 'Alarm goes off. You have no idea when the taxi will actually arrive.',
      icon: Clock,
      color: TEAL,
    },
    {
      time: '06:20',
      label: 'Walk to the stop',
      text: 'You stand on the corner with a dozen others. Nobody knows where the taxi is.',
      icon: MapPin,
      color: ORANGE,
    },
    {
      time: '06:48',
      label: 'Still waiting',
      text: '18 minutes gone. You start to wonder if you should have left earlier.',
      icon: Timer,
      color: PINK,
    },
    {
      time: '07:05',
      label: 'It arrives',
      text: 'No ETA. No signal. No certainty. Just luck — and the same story tomorrow.',
      icon: Bus,
      color: TEAL,
    },
  ];

  return (
    <section ref={ref} className="relative bg-background overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <SceneHeader
          eyebrow="A Morning in South Africa"
          title="Every morning, millions play a"
          accentWord="guessing game"
          accentColor={ORANGE}
          description="Before we talk about numbers, meet the person behind them. This is the commute that hasn't changed in decades — until now."
        />

        <motion.div
          initial={prefersReduced ? false : 'hidden'}
          whileInView={prefersReduced ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={scaleIn}
          className="relative mb-12 sm:mb-16 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-10 overflow-hidden"
        >
          <svg
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            className="absolute left-6 right-6 top-1/2 h-1 -translate-y-1/2"
            aria-hidden
          >
            <defs>
              <linearGradient id="storyGradient" x1="0" x2="1">
                <stop offset="0%" stopColor={TEAL} />
                <stop offset="50%" stopColor={ORANGE} />
                <stop offset="100%" stopColor={PINK} />
              </linearGradient>
            </defs>
            <motion.line
              x1="0"
              y1="5"
              x2="100"
              y2="5"
              stroke="url(#storyGradient)"
              strokeWidth="0.6"
              strokeLinecap="round"
              strokeDasharray="100"
              style={prefersReduced ? undefined : { pathLength: routeLength }}
              initial={prefersReduced ? false : { pathLength: 0 }}
              whileInView={prefersReduced ? undefined : { pathLength: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 1.6, ease: ONE_UI_EASE, delay: 0.2 }}
            />
          </svg>

          <div className="relative grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-4">
            {storySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.time}
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    ...ONE_UI_TRANSITION,
                    delay: 0.3 + i * 0.12,
                  }}
                  className="relative flex flex-col items-center text-center"
                >
                  <div
                    className="size-14 rounded-full flex items-center justify-center mb-3 ring-8 ring-background z-10"
                    style={{ backgroundColor: `${step.color}20` }}
                  >
                    <Icon className="size-6" style={{ color: step.color }} />
                  </div>
                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
                    style={{ color: step.color }}
                  >
                    {step.time}
                  </p>
                  <p className="font-display text-sm sm:text-base font-extrabold text-foreground leading-tight">
                    {step.label}
                  </p>
                  <p className="mt-1.5 text-[11px] sm:text-xs text-muted-foreground leading-relaxed max-w-[180px]">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ ...ONE_UI_TRANSITION, delay: 0.4 }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            <span className="font-bold text-foreground">
              3.7 million commuters
            </span>{' '}
            repeat this every day. Uthutho changes the ending of that story.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   PROBLEM
   ============================================================ */

const PROBLEM_STATS = [
  {
    value: '250k',
    label: 'minibus taxis on SA roads',
    icon: Bus,
    color: TEAL,
    ring: 0.85,
  },
  {
    value: '80%',
    label: 'of public transport users',
    icon: Users,
    color: ORANGE,
    ring: 0.8,
  },
  {
    value: '3.7M',
    label: 'commuters per day',
    icon: MapPin,
    color: PINK,
    ring: 0.92,
  },
  {
    value: '0',
    label: 'real-time info',
    icon: Clock,
    color: TEAL,
    ring: 0.02,
  },
];

const ProblemSection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.35],
    [1, 1, 0.15, 0]
  );
  const headlineScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35],
    [1, 1, 0.9]
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35],
    [0, 0, -40]
  );

  return (
    <section className="relative bg-background">
      <div ref={containerRef} className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-10">
          <motion.div
            style={
              prefersReduced
                ? undefined
                : {
                    opacity: headlineOpacity,
                    scale: headlineScale,
                    y: headlineY,
                  }
            }
            className="text-center px-4 max-w-4xl"
          >
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...SOFT_SPRING, delay: 0.2 }}
              className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
              style={{ color: TEAL }}
            >
              The Problem
            </motion.p>

            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...SOFT_SPRING, delay: 0.35 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]"
            >
              SA's transport runs on
              <span
                className="relative inline-block mx-2"
                style={{ color: TEAL }}
              >
                guesswork
                <motion.span
                  aria-hidden
                  initial={prefersReduced ? false : { scaleX: 0 }}
                  animate={prefersReduced ? undefined : { scaleX: 1 }}
                  transition={{ ...SOFT_SPRING, delay: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-[8px] rounded-full origin-left"
                  style={{ backgroundColor: TEAL }}
                />
              </span>
            </motion.h2>

            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...SOFT_SPRING, delay: 0.5 }}
              className="mt-6 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
            >
              Getting a taxi in South Africa hasn't changed in decades.
              Commuters stand somewhere along their route and wait — with zero
              visibility, zero ETAs, and zero certainty.
            </motion.p>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={prefersReduced ? undefined : { opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex justify-center"
            >
              <ChevronDown className="size-6 text-muted-foreground animate-bounce" />
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 -mt-[100vh] pt-[100vh]">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.15 }}
              variants={stagger(0.08)}
              className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4"
            >
              {PROBLEM_STATS.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    variants={{
                      hidden: { opacity: 0, y: 24, scale: 0.96 },
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
                    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6">
                      <div className="flex justify-center mb-4 relative">
                        <svg
                          viewBox="0 0 100 100"
                          className="size-20 -rotate-90"
                          aria-hidden
                        >
                          <circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="8"
                            className="text-border/60"
                          />
                          <motion.circle
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={stat.color}
                            strokeWidth="8"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 40}
                            initial={
                              prefersReduced
                                ? false
                                : {
                                    strokeDashoffset: 2 * Math.PI * 40,
                                  }
                            }
                            whileInView={
                              prefersReduced
                                ? undefined
                                : {
                                    strokeDashoffset:
                                      2 * Math.PI * 40 * (1 - stat.ring),
                                  }
                            }
                            viewport={viewportOnce}
                            transition={{
                              ...ONE_UI_TRANSITION,
                              duration: 1.1,
                              delay: 0.2 + i * 0.1,
                            }}
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon
                            className="size-6"
                            style={{ color: stat.color }}
                          />
                        </div>
                      </div>

                      <div className="text-center">
                        <p className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
                          {stat.value}
                        </p>
                        <p className="mt-2 text-xs sm:text-sm text-muted-foreground font-medium">
                          {stat.label}
                        </p>
                      </div>
                    </MagneticCard>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.3 }}
              className="mt-8 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-4">
                A real commute, visualized
              </p>
              <div className="relative">
                <div className="absolute left-0 right-0 top-4 h-[2px] bg-border/60" />
                <motion.div
                  initial={prefersReduced ? false : { scaleX: 0 }}
                  whileInView={prefersReduced ? undefined : { scaleX: 1 }}
                  viewport={viewportOnce}
                  transition={{ duration: 1.4, ease: ONE_UI_EASE, delay: 0.4 }}
                  className="absolute left-0 right-0 top-4 h-[2px] origin-left"
                  style={{
                    background: `linear-gradient(to right, ${TEAL}, ${ORANGE}, ${PINK})`,
                  }}
                />

                <div className="relative flex justify-between">
                  {[
                    { t: '06:20', l: 'At the stop', c: TEAL },
                    { t: '06:48', l: 'Still waiting', c: ORANGE },
                    { t: '07:05', l: 'Taxi arrives', c: PINK },
                    { t: '07:05+', l: 'Uthutho fixes this', c: TEAL },
                  ].map((node, i) => (
                    <motion.div
                      key={node.l}
                      initial={prefersReduced ? false : { opacity: 0, scale: 0.6 }}
                      whileInView={
                        prefersReduced ? undefined : { opacity: 1, scale: 1 }
                      }
                      viewport={viewportOnce}
                      transition={{
                        ...ONE_UI_TRANSITION,
                        delay: 0.5 + i * 0.15,
                      }}
                      className="flex flex-col items-center text-center flex-1"
                    >
                      <div
                        className="size-8 rounded-full bg-background border-2 flex items-center justify-center z-10"
                        style={{ borderColor: node.c }}
                      >
                        <div
                          className="size-3 rounded-full"
                          style={{ backgroundColor: node.c }}
                        />
                      </div>
                      <p
                        className="mt-2 text-[10px] font-bold tracking-wider"
                        style={{ color: node.c }}
                      >
                        {node.t}
                      </p>
                      <p className="mt-0.5 text-[11px] text-muted-foreground font-medium">
                        {node.l}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   HOW IT WORKS — with animated mini-diagrams
   ============================================================ */

/**
 * Step 1 graphic: a stop pin with a pulsing ring + a "waiting" avatar
 */
const GpsWaitingVisual: React.FC<{ color: string; animate: boolean }> = ({
  color,
  animate,
}) => (
  <div className="relative size-full flex items-center justify-center">
    {/* pulsing rings around the stop */}
    {[0, 0.8, 1.6].map((delay, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 44,
          height: 44,
          border: `2px solid ${color}`,
          opacity: 0.35,
        }}
        animate={
          animate
            ? { scale: [1, 2.4], opacity: [0.35, 0] }
            : undefined
        }
        transition={{
          duration: 2.2,
          repeat: Infinity,
          delay,
          ease: 'easeOut',
        }}
      />
    ))}
    {/* stop pin */}
    <div
      className="relative z-10 size-10 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
    >
      <MapPin className="size-5" style={{ color }} />
    </div>
    {/* waiting avatar */}
    <div
      className="absolute bottom-2 right-2 z-10 size-6 rounded-full flex items-center justify-center shadow-md"
      style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
    >
      <UserCheck className="size-3.5" style={{ color }} />
    </div>
  </div>
);
>>>>>>> b4726a8 (Some changes i feel like we should go with)

/**
 * Step 2 graphic: two nodes with a moving dot travelling between them
 */
const GpsMovingVisual: React.FC<{ color: string; animate: boolean }> = ({
  color,
  animate,
}) => (
  <div className="relative size-full flex items-center justify-center px-6">
    {/* track line */}
    <div
      className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-[2px] rounded-full"
      style={{ backgroundColor: 'rgba(255,255,255,0.35)' }}
    />
    {/* left node: waiting user */}
    <div
      className="absolute left-6 top-1/2 -translate-y-1/2 size-8 rounded-full flex items-center justify-center shadow-md z-10"
      style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
    >
      <MapPin className="size-4" style={{ color }} />
    </div>
    {/* right node: taxi */}
    <div
      className="absolute right-6 top-1/2 -translate-y-1/2 size-8 rounded-full flex items-center justify-center shadow-md z-10"
      style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
    >
      <Bus className="size-4" style={{ color }} />
    </div>
    {/* travelling GPS dot */}
    <motion.div
      aria-hidden
      className="absolute top-1/2 -translate-y-1/2 z-20 size-3 rounded-full shadow-lg"
      style={{ backgroundColor: '#ffffff' }}
      animate={animate ? { left: ['18%', '78%', '18%'] } : undefined}
      transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Radio className="size-3 absolute inset-0 m-auto" style={{ color }} />
    </motion.div>
  </div>
);

/**
 * Step 3 graphic: a checkmark drawn inside a circle with radiating pulse
 */
const GpsConfirmedVisual: React.FC<{ color: string; animate: boolean }> = ({
  color,
  animate,
}) => (
  <div className="relative size-full flex items-center justify-center">
    {/* radiating pulse */}
    {[0, 1].map((delay, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="absolute rounded-full"
        style={{
          width: 44,
          height: 44,
          border: `2px solid ${color}`,
          opacity: 0.35,
        }}
        animate={animate ? { scale: [1, 2.2], opacity: [0.35, 0] } : undefined}
        transition={{
          duration: 2,
          repeat: Infinity,
          delay,
          ease: 'easeOut',
        }}
      />
    ))}
    <div
      className="relative z-10 size-11 rounded-full flex items-center justify-center shadow-lg"
      style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
    >
      <CheckCircle2 className="size-6" style={{ color }} />
    </div>
    {/* tiny badge */}
    <div
      className="absolute top-2 right-2 z-10 size-6 rounded-full flex items-center justify-center shadow-md"
      style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}
    >
      <Send className="size-3" style={{ color }} />
    </div>
  </div>
);

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Mark yourself waiting',
    body: "Arrive at your stop and mark yourself as waiting in the app. Geofencing verifies you're actually there.",
    icon: MapPin,
    color: TEAL,
    visual: 'waiting' as const,
  },
  {
    step: '02',
    title: 'Someone starts moving',
    body: 'When a commuter on the same route starts moving, their GPS broadcasts progress to everyone waiting along that line.',
    icon: Navigation,
    color: ORANGE,
    visual: 'moving' as const,
  },
  {
    step: '03',
    title: 'Know before you leave',
    body: 'See exactly where your transport is — without a single driver opting in, and without hardware in the taxi.',
    icon: CheckCircle2,
    color: PINK,
    visual: 'confirmed' as const,
  },
];

const HowItWorksSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="bg-secondary/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="How Uthutho Works"
          title="Commuters as"
          accentWord="GPS"
          accentColor={TEAL}
          description="No hardware in the taxi. No driver opt-in. Your phone is the sensor."
        />

        <motion.div
          initial={prefersReduced ? false : 'hidden'}
          whileInView={prefersReduced ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="grid gap-6 md:grid-cols-3"
        >
          {HOW_IT_WORKS.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.step}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.97 },
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
                <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3">
                  <div
                    className="relative w-full h-40 rounded-[1.25rem] flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: item.color }}
                  >
                    <span className="absolute top-3 left-4 text-[11px] font-bold text-white/70 z-20">
                      {item.step}
                    </span>

                    {/* Icon chip in the corner (kept from before) */}
                    <div className="absolute top-3 right-3 size-7 rounded-full bg-white/20 flex items-center justify-center z-20">
                      <Icon className="size-3.5 text-white" />
                    </div>

                    {/* Live mini-diagram */}
                    <div className="absolute inset-0">
                      {item.visual === 'waiting' && (
                        <GpsWaitingVisual
                          color={item.color}
                          animate={!prefersReduced}
                        />
                      )}
                      {item.visual === 'moving' && (
                        <GpsMovingVisual
                          color={item.color}
                          animate={!prefersReduced}
                        />
                      )}
                      {item.visual === 'confirmed' && (
                        <GpsConfirmedVisual
                          color={item.color}
                          animate={!prefersReduced}
                        />
                      )}
                    </div>
                  </div>
                  <div className="p-4 pt-5">
                    <h3 className="font-display text-lg font-extrabold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
                      {item.body}
                    </p>
                  </div>
                </MagneticCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   FOR YOU — with contextual schematics + comparison strip
   ============================================================ */

/**
 * Commuter schematic: a route line with 3 stops and a travelling taxi
 */
const CommuterRouteVisual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="absolute inset-0 pointer-events-none">
    {/* faint route line */}
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 w-full h-full"
      aria-hidden
    >
      <path
        d="M 8 78 Q 30 78 38 58 T 62 38 Q 78 38 92 22"
        fill="none"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeDasharray="3 3"
        vectorEffect="non-scaling-stroke"
      />
    </svg>

    {/* stops */}
    {[
      { x: '8%', y: '78%' },
      { x: '50%', y: '46%' },
      { x: '92%', y: '22%' },
    ].map((p, i) => (
      <span
        key={i}
        aria-hidden
        className="absolute rounded-full"
        style={{
          left: p.x,
          top: p.y,
          width: 8,
          height: 8,
          backgroundColor: 'rgba(255,255,255,0.85)',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 0 3px rgba(255,255,255,0.15)',
        }}
      />
    ))}

    {/* travelling taxi dot */}
    <motion.div
      aria-hidden
      className="absolute size-6 rounded-full bg-white shadow-lg flex items-center justify-center"
      animate={
        animate
          ? {
              left: ['8%', '50%', '92%'],
              top: ['78%', '46%', '22%'],
            }
          : undefined
      }
      transition={{
        duration: 4.5,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.5, 1],
      }}
      style={{ transform: 'translate(-50%, -50%)' }}
    >
      <Bus className="size-3.5" style={{ color: TEAL }} />
    </motion.div>

    {/* "LIVE" chip */}
    <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-white/15 backdrop-blur-sm rounded-full pl-1.5 pr-2.5 py-1">
      <motion.span
        aria-hidden
        className="size-1.5 rounded-full bg-white"
        animate={animate ? { opacity: [1, 0.3, 1] } : undefined}
        transition={{ duration: 1.4, repeat: Infinity }}
      />
      <span className="text-[9px] font-bold tracking-wider text-white">
        LIVE
      </span>
    </div>
  </div>
);

/**
 * Parent schematic: a school + shield-check with verified ring
 */
const ParentVerifiedVisual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="absolute inset-0 pointer-events-none">
    {/* pulsing rings around a shield */}
    {[0, 0.8, 1.6].map((delay, i) => (
      <motion.span
        key={i}
        aria-hidden
        className="absolute left-1/2 top-1/2 rounded-full"
        style={{
          width: 56,
          height: 56,
          marginLeft: -28,
          marginTop: -28,
          border: '2px solid rgba(255,255,255,0.4)',
          opacity: 0.4,
        }}
        animate={animate ? { scale: [1, 2], opacity: [0.4, 0] } : undefined}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          delay,
          ease: 'easeOut',
        }}
      />
    ))}

    {/* centre badge */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-14 rounded-full bg-white shadow-lg flex items-center justify-center">
      <GraduationCap className="size-6" style={{ color: '#000' }} />
      <div
        className="absolute -bottom-1 -right-1 size-6 rounded-full flex items-center justify-center shadow-md"
        style={{ backgroundColor: TEAL }}
      >
        <ShieldCheck className="size-3.5 text-white" />
      </div>
    </div>

    {/* tiny floating labels */}
    <div className="absolute top-3 left-3 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider text-white">
      VERIFIED
    </div>
    <div className="absolute bottom-3 right-3 bg-white/15 backdrop-blur-sm rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wider text-white">
      TRACKED
    </div>
  </div>
);

const FOR_YOU = [
  {
    eyebrow: 'Uthutho for Commuters',
    title: 'Know when your taxi is coming.',
    body: 'Commuters mark themselves as waiting at a stop. When someone on the same route starts moving, GPS broadcasts their progress to everyone waiting — no driver opt-in needed.',
    features: [
      'Live route visibility',
      'Community-powered tracking',
      'Cape Town pilot live now',
    ],
    bg: TEAL,
    fg: '#ffffff',
    visual: 'commuter' as const,
  },
  {
    eyebrow: 'Uthutho for Parents',
    title: 'School transport, verified.',
    body: "School transport operators list their routes, vehicles, and pricing. Parents browse verified options and apply directly — with live tracking of their child's journey.",
    features: [
      'Verified school transport',
      'Live journey tracking',
      'Pickup & drop-off alerts',
    ],
    bg: '#000000',
    fg: '#ffffff',
    visual: 'parent' as const,
  },
];

const ForYouAppleSection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const headlineOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.25, 0.35],
    [1, 1, 0.15, 0]
  );
  const headlineScale = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35],
    [1, 1, 0.9]
  );
  const headlineY = useTransform(
    scrollYProgress,
    [0, 0.05, 0.35],
    [0, 0, -40]
  );

  return (
    <section id="for-you" className="relative bg-background">
      <div ref={containerRef} className="relative">
        <div className="sticky top-0 h-screen flex items-center justify-center pointer-events-none z-10">
          <motion.div
            style={
              prefersReduced
                ? undefined
                : {
                    opacity: headlineOpacity,
                    scale: headlineScale,
                    y: headlineY,
                  }
            }
            className="text-center px-4"
          >
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...SOFT_SPRING, delay: 0.2 }}
              className="text-[11px] font-bold uppercase tracking-[0.25em] mb-4"
              style={{ color: TEAL }}
            >
              Built for you
            </motion.p>
            <motion.h2
              initial={prefersReduced ? false : { opacity: 0, y: 30 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...SOFT_SPRING, delay: 0.35 }}
              className="font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground leading-[1.05]"
            >
              Whether you ride or
              <span
                className="relative inline-block mx-2"
                style={{ color: TEAL }}
              >
                parent
                <motion.span
                  aria-hidden
                  initial={prefersReduced ? false : { scaleX: 0 }}
                  animate={prefersReduced ? undefined : { scaleX: 1 }}
                  transition={{ ...SOFT_SPRING, delay: 0.6 }}
                  className="absolute -bottom-2 left-0 right-0 h-[8px] rounded-full origin-left"
                  style={{ backgroundColor: TEAL }}
                />
              </span>
            </motion.h2>
            <motion.p
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={{ ...SOFT_SPRING, delay: 0.5 }}
              className="mt-6 text-sm sm:text-lg text-muted-foreground max-w-xl mx-auto"
            >
              Uthutho gives you real-time visibility on every journey.
            </motion.p>
            <motion.div
              initial={prefersReduced ? false : { opacity: 0 }}
              animate={prefersReduced ? undefined : { opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-8 flex justify-center"
            >
              <ChevronDown className="size-6 text-muted-foreground animate-bounce" />
            </motion.div>
          </motion.div>
        </div>

        <div className="relative z-20 -mt-[100vh] pt-[100vh]">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {FOR_YOU.map((card, i) => (
                <motion.div
                  key={card.eyebrow}
                  initial={
                    prefersReduced
                      ? false
                      : { opacity: 0, y: 40, scale: 0.95 }
                  }
                  whileInView={
                    prefersReduced
                      ? undefined
                      : { opacity: 1, y: 0, scale: 1 }
                  }
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    ...SPRING,
                    delay: i * 0.1,
                  }}
                >
                  <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3">
                    <div
                      className="relative w-full h-52 rounded-[1.25rem] flex flex-col justify-end p-6 overflow-hidden"
                      style={{ backgroundColor: card.bg, color: card.fg }}
                    >
                      {/* Live schematic in the background */}
                      {card.visual === 'commuter' && (
                        <CommuterRouteVisual animate={!prefersReduced} />
                      )}
                      {card.visual === 'parent' && (
                        <ParentVerifiedVisual animate={!prefersReduced} />
                      )}

                      {/* Text sits on top with a subtle gradient for legibility */}
                      <div className="relative z-10 mt-auto">
                        <p className="text-[11px] font-bold uppercase tracking-wider opacity-90">
                          {card.eyebrow}
                        </p>
                        <h3 className="mt-1 font-display text-xl sm:text-2xl font-extrabold leading-tight drop-shadow-sm">
                          {card.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-5">
                      <p className="text-sm leading-relaxed text-muted-foreground font-medium">
                        {card.body}
                      </p>
                      <ul className="mt-4 space-y-2">
                        {card.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-start gap-2 text-sm text-foreground"
                          >
                            <span
                              className="mt-1.5 size-1.5 shrink-0 rounded-full"
                              style={{ backgroundColor: TEAL }}
                            />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </MagneticCard>
                </motion.div>
              ))}
            </div>

            {/* NEW: side-by-side comparison strip — gives context */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 24 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.25 }}
              className="mt-6 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
                What each experience gives you
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                {/* COMMUTER JOURNEY */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="size-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${TEAL}15` }}
                    >
                      <Bus className="size-4" style={{ color: TEAL }} />
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      If you ride
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      {
                        icon: MapPin,
                        title: 'Mark yourself waiting',
                        sub: 'One tap at your stop. Geofenced.',
                        color: TEAL,
                      },
                      {
                        icon: Radio,
                        title: 'A rider starts moving',
                        sub: 'Their GPS broadcasts to the whole line.',
                        color: ORANGE,
                      },
                      {
                        icon: Signal,
                        title: 'Watch the ETA tick down',
                        sub: 'Real-time dot on your route, no guesswork.',
                        color: PINK,
                      },
                      {
                        icon: ArrowRight,
                        title: 'Board with confidence',
                        sub: 'Know it’s coming before you leave the house.',
                        color: TEAL,
                      },
                    ].map((row, idx) => {
                      const RIcon = row.icon;
                      return (
                        <motion.li
                          key={row.title}
                          initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                          whileInView={
                            prefersReduced ? undefined : { opacity: 1, x: 0 }
                          }
                          viewport={viewportOnce}
                          transition={{
                            ...ONE_UI_TRANSITION,
                            delay: 0.1 + idx * 0.07,
                          }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className="size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${row.color}15` }}
                          >
                            <RIcon
                              className="size-3.5"
                              style={{ color: row.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground leading-tight">
                              {row.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                              {row.sub}
                            </p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>

                {/* PARENT JOURNEY */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="size-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${PINK}15` }}
                    >
                      <GraduationCap
                        className="size-4"
                        style={{ color: PINK }}
                      />
                    </div>
                    <p className="text-sm font-bold text-foreground">
                      If you parent
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      {
                        icon: ShieldCheck,
                        title: 'Browse verified operators',
                        sub: 'Routes, vehicles, pricing — all listed.',
                        color: PINK,
                      },
                      {
                        icon: Send,
                        title: 'Apply directly in-app',
                        sub: 'No phone tag. No WhatsApp threads.',
                        color: TEAL,
                      },
                      {
                        icon: Radio,
                        title: 'Watch the journey live',
                        sub: 'See the bus move in real time.',
                        color: ORANGE,
                      },
                      {
                        icon: CheckCircle2,
                        title: 'Get pickup + drop-off alerts',
                        sub: 'Know the moment your child is safe.',
                        color: PINK,
                      },
                    ].map((row, idx) => {
                      const RIcon = row.icon;
                      return (
                        <motion.li
                          key={row.title}
                          initial={prefersReduced ? false : { opacity: 0, x: 8 }}
                          whileInView={
                            prefersReduced ? undefined : { opacity: 1, x: 0 }
                          }
                          viewport={viewportOnce}
                          transition={{
                            ...ONE_UI_TRANSITION,
                            delay: 0.1 + idx * 0.07,
                          }}
                          className="flex items-start gap-3"
                        >
                          <div
                            className="size-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                            style={{ backgroundColor: `${row.color}15` }}
                          >
                            <RIcon
                              className="size-3.5"
                              style={{ color: row.color }}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-foreground leading-tight">
                              {row.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                              {row.sub}
                            </p>
                          </div>
                        </motion.li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ============================================================
   AWARDS
   ============================================================ */

const awards = [
  {
    logo: 'https://img.redbull.com/images/c_limit,w_2000/e_trim:1:transparent/c_limit,w_300,h_272/bo_5px_solid_rgb:00000000/q_auto:best,f_auto/redbullcom/2024/7/25/hckaipzsonzjai5rvhld/red-bull-basement-logo',
    title: 'Red Bull Basement 2026',
    subtitle: 'South African Representative',
    description:
      'Selected to represent our nation in a global showcase of innovation.',
    tag: 'Global',
    logoClassName: '',
  },
  {
    logo: 'https://africatechweek.co.za/wp-content/uploads/2023/02/SENTEch-1.png',
    title: 'Africa Tech Week',
    subtitle: 'Pitch Den Winners',
    description:
      'Crowned winners for our vision to revolutionize transport across the continent.',
    tag: 'Winner',
    logoClassName: 'invert',
  },
  {
    logo: '/lovable-uploads/ncic.png',
    title: 'NCIC Smart Mobility Challenge',
    subtitle: 'Winners',
    description:
      'Honored for creating sustainable and intelligent transport solutions.',
    tag: 'Winner',
    logoClassName: '',
  },
];

const AwardsSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="awards" className="relative bg-secondary/40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32 sm:h-48 z-20"
        style={{
          background:
            'linear-gradient(to bottom, hsl(var(--primary) / 0.15), transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 sm:h-48 z-20"
        style={{
          background:
            'linear-gradient(to top, hsl(var(--primary) / 0.18), transparent)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 select-none text-center font-display text-[18vw] sm:text-[22vw] font-black leading-none tracking-tighter text-foreground/[0.035]"
      >
        RECOGNITION
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="Awards & Recognition"
          title="Trusted by"
          accentWord="innovators"
          accentColor={TEAL}
          description="Uthutho has been recognized by leading innovation programs across Africa — validating our mission to make public transport predictable, safe, and community-powered."
        />

        <motion.div
          initial={prefersReduced ? false : 'hidden'}
          whileInView={prefersReduced ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={stagger(0.08)}
          className="mt-12 sm:mt-16 grid gap-6 sm:gap-8 md:grid-cols-3"
        >
          {awards.map((award, i) => (
            <motion.div
              key={award.title}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.97 },
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
              <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3">
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
                  <p
                    className="mt-1 text-sm font-bold"
                    style={{ color: TEAL }}
                  >
                    {award.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground font-medium">
                    {award.description}
                  </p>
                </div>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 20 }}
          whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={ONE_UI_TRANSITION}
          className="mt-12 text-center text-sm text-muted-foreground max-w-2xl mx-auto"
        >
          These recognitions aren't just trophies — they're validation that
          South Africa's public transport deserves to be digitised, made
          transparent, and built for the 3.7 million commuters who rely on it
          every day. Every award strengthens Uthutho's commitment to the riders,
          drivers, and communities building this future together.
        </motion.p>
      </div>
    </section>
  );
};

/* ============================================================
   MISSION / VISION
   ============================================================ */

const MISSION_VISION = [
  {
    label: 'Our Mission',
    title: 'Make public transport predictable',
    body: 'Born from the frustration of unclear taxi routes and uncertain wait times, Uthutho turns commuters into a live GPS network — no hardware in the taxi, no driver opt-in required.',
    color: TEAL,
  },
  {
    label: 'Our Vision',
    title: 'Scale across emerging markets',
    body: 'Red Bull Basement judges saw "real potential to scale across South Africa and even globally." Uthutho is building for the billions who rely on informal transport.',
    color: PINK,
  },
];

const MissionVisionSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section id="mission" className="bg-secondary/60">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="About Uthutho"
          title="Revolutionising"
          accentWord="shared commutes"
          accentColor={TEAL}
        />

        <motion.div
          initial={prefersReduced ? false : 'hidden'}
          whileInView={prefersReduced ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="grid gap-6 lg:grid-cols-2"
        >
          {MISSION_VISION.map((item, i) => (
            <motion.div
              key={item.label}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.97 },
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
              <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-8 sm:p-10">
                <p
                  className="text-[11px] font-bold uppercase tracking-[0.2em]"
                  style={{ color: item.color }}
                >
                  {item.label}
                </p>
                <h3 className="mt-3 font-display text-2xl sm:text-3xl font-extrabold leading-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </MagneticCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   CTA
   ============================================================ */

const CtaSection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section ref={ref} id="cta" className="relative overflow-hidden bg-black">
      <motion.div
        style={prefersReduced ? undefined : { y }}
        className="relative z-10 mx-auto w-full max-w-5xl px-4 py-20 text-center sm:px-6 sm:py-28"
      >
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
            Join the network
          </motion.p>
          <motion.h2
            variants={riseLg}
            className="font-display text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
          >
            Help digitise{' '}
            <span className="relative inline-block" style={{ color: TEAL }}>
              public transport
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
            Uthutho is live on the Play Store with ~300 users in Cape Town. Join
            the community-powered network.
          </motion.p>

          <motion.div
            variants={rise}
            className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a
              href="https://play.google.com/store/apps/details?id=com.softglitch.uthutho&hl=en_ZA"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white hover:scale-105 transition-all"
              style={{ backgroundColor: TEAL }}
            >
              Get the app
              <ArrowRight className="size-4" />
            </a>
            <a
              href="https://www.mobile.uthutho.co.za/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Use web app
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ============================================================
   HOME
   ============================================================ */

const Home: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
  });

  return (
    <div className="bg-background text-foreground">
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 z-[60] h-[3px] origin-left"
      >
        <div className="h-full w-full" style={{ backgroundColor: TEAL }} />
      </motion.div>

      <Navbar />
      <main>
        <HeroSection />
        <AsSeenOnSection />
        <StorySection />
        <ProblemSection />
        <HowItWorksSection />
        <JourneyDrive />
        <ForYouAppleSection />
        <AwardsSection />
        <TeamSection />
        <MissionVisionSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;