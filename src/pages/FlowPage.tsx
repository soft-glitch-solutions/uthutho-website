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
  Radio,
  Signal,
  ShieldCheck,
  GraduationCap,
  Smartphone,
  Eye,
  Bell,
  Zap,
  Route,
  UserCheck,
  Send,
  CircleDot,
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
   INFOGRAPHIC 1 — Tap to mark waiting
   Phone silhouette with a pulsing stop pin and "waiting" state
   ============================================================ */

const Step1Visual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* phone */}
    <div className="relative w-28 h-44 rounded-3xl border-2 border-border bg-card shadow-inner flex flex-col overflow-hidden">
      {/* notch */}
      <div className="h-3 flex items-center justify-center">
        <div className="w-8 h-1 rounded-full bg-border" />
      </div>
      {/* map grid */}
      <div
        className="flex-1 relative opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '16px 16px',
          color: 'hsl(var(--muted-foreground))',
        }}
      />
      {/* stop pin */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={animate ? { y: [-2, 2, -2] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="size-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <MapPin className="size-5" style={{ color: TEAL }} />
        </div>
      </motion.div>
      {/* pulsing ring */}
      {[0, 0.8].map((delay, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: 40,
            height: 40,
            marginLeft: -20,
            marginTop: -20,
            border: `2px solid ${TEAL}`,
            opacity: 0.4,
          }}
          animate={animate ? { scale: [1, 2.5], opacity: [0.4, 0] } : undefined}
          transition={{ duration: 2, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}
      {/* tap button */}
      <div className="p-2">
        <div
          className="rounded-full py-2 text-center text-[9px] font-bold text-white"
          style={{ backgroundColor: TEAL }}
        >
          I'm waiting
        </div>
      </div>
    </div>
  </div>
);

/* ============================================================
   INFOGRAPHIC 2 — GPS verifies you (geofence)
   A geofenced circle with a pin inside, crosshair rings
   ============================================================ */

const Step2Visual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* geofence circle */}
    <div
      className="absolute rounded-full border-2 border-dashed"
      style={{
        width: 130,
        height: 130,
        borderColor: `${ORANGE}55`,
      }}
    />
    {/* rotating crosshair */}
    <motion.div
      className="absolute"
      style={{ width: 130, height: 130 }}
      animate={animate ? { rotate: 360 } : undefined}
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-4 bg-orange-400" />
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-px h-4 bg-orange-400" />
      <div className="absolute top-1/2 left-0 -translate-y-1/2 h-px w-4 bg-orange-400" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-px w-4 bg-orange-400" />
    </motion.div>
    {/* inner pin */}
    <motion.div
      className="relative z-10 size-14 rounded-full bg-white shadow-lg flex items-center justify-center"
      animate={animate ? { scale: [1, 1.05, 1] } : undefined}
      transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Navigation className="size-6" style={{ color: ORANGE }} />
    </motion.div>
    {/* verified chip */}
    <motion.div
      className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white shadow-md rounded-full pl-1.5 pr-2.5 py-1"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={animate ? { opacity: [0, 1, 1], scale: [0.6, 1.05, 1] } : { opacity: 1, scale: 1 }}
      transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 0.6 }}
    >
      <ShieldCheck className="size-3.5" style={{ color: ORANGE }} />
      <span className="text-[9px] font-bold" style={{ color: ORANGE }}>
        VERIFIED
      </span>
    </motion.div>
  </div>
);

/* ============================================================
   INFOGRAPHIC 3 — Rider moves, GPS broadcasts
   Two nodes: waiting commuter and a moving rider with signal waves
   ============================================================ */

const Step3Visual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="relative w-full h-full flex items-center justify-center px-6">
    {/* rail */}
    <div className="absolute left-10 right-10 top-1/2 h-[2px] bg-border" />
    <motion.div
      className="absolute left-10 top-1/2 h-[2px] origin-left"
      style={{
        background: `linear-gradient(to right, ${TEAL}, ${PINK})`,
        right: 40,
      }}
      initial={{ scaleX: 0 }}
      animate={animate ? { scaleX: [0, 1] } : { scaleX: 1 }}
      transition={{
        duration: 2,
        repeat: Infinity,
        repeatDelay: 0.8,
        ease: ONE_UI_EASE,
      }}
    />

    {/* waiting node */}
    <div className="absolute left-8 top-1/2 -translate-y-1/2 size-10 rounded-full bg-white shadow-md flex items-center justify-center z-10">
      <UserCheck className="size-5" style={{ color: TEAL }} />
    </div>

    {/* moving rider node */}
    <motion.div
      className="absolute top-1/2 -translate-y-1/2 z-20 size-10 rounded-full bg-white shadow-lg flex items-center justify-center"
      animate={animate ? { left: ['22%', '78%', '22%'] } : undefined}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      <Bus className="size-5" style={{ color: PINK }} />
      {/* signal waves */}
      {[0, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${PINK}`, opacity: 0.4 }}
          animate={animate ? { scale: [1, 2], opacity: [0.4, 0] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}
    </motion.div>

    {/* broadcast chip */}
    <motion.div
      className="absolute top-3 right-3 flex items-center gap-1.5 bg-white shadow-md rounded-full pl-1.5 pr-2.5 py-1"
      animate={animate ? { opacity: [0.6, 1, 0.6] } : undefined}
      transition={{ duration: 1.8, repeat: Infinity }}
    >
      <Signal className="size-3.5" style={{ color: PINK }} />
      <span className="text-[9px] font-bold" style={{ color: PINK }}>
        LIVE
      </span>
    </motion.div>
  </div>
);

/* ============================================================
   INFOGRAPHIC 4 — Network lights up
   Mesh of nodes connecting, with the hub at centre
   ============================================================ */

const Step4Visual: React.FC<{ animate: boolean }> = ({ animate }) => {
  const nodes = [
    { angle: 0, color: TEAL },
    { angle: 60, color: ORANGE },
    { angle: 120, color: PINK },
    { angle: 180, color: TEAL },
    { angle: 240, color: ORANGE },
    { angle: 300, color: PINK },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        {nodes.map((n, i) => {
          const rad = (n.angle * Math.PI) / 180;
          const x = 50 + Math.cos(rad) * 22;
          const y = 50 + Math.sin(rad) * 22;
          return (
            <motion.line
              key={i}
              x1="50%"
              y1="50%"
              x2={`${x}%`}
              y2={`${y}%`}
              stroke={`${n.color}66`}
              strokeWidth="1"
              strokeDasharray="3 3"
              initial={{ pathLength: 0 }}
              animate={animate ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: ONE_UI_EASE,
              }}
            />
          );
        })}
      </svg>

      {/* hub */}
      <motion.div
        className="relative z-10 size-12 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Users className="size-6" style={{ color: TEAL }} />
      </motion.div>

      {/* orbiting nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.cos(rad) * 64;
        const y = Math.sin(rad) * 64;
        return (
          <motion.div
            key={i}
            className="absolute size-7 rounded-full bg-white shadow-md flex items-center justify-center"
            style={{ translateX: x, translateY: y }}
            animate={animate ? { scale: [1, 1.15, 1] } : undefined}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          >
            <div
              className="size-2.5 rounded-full"
              style={{ backgroundColor: n.color }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ============================================================
   INFOGRAPHIC 5 — You know before you leave
   A countdown ring with an ETA label and a departing pin
   ============================================================ */

const Step5Visual: React.FC<{ animate: boolean }> = ({ animate }) => {
  const R = 44;
  const C = 2 * Math.PI * R;
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg viewBox="0 0 100 100" className="size-32 -rotate-90" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth="6"
        />
        <motion.circle
          cx="50"
          cy="50"
          r={R}
          fill="none"
          stroke={TEAL}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          animate={
            animate ? { strokeDashoffset: [C, 0] } : { strokeDashoffset: 0 }
          }
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: ONE_UI_EASE,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.p
          className="font-display text-2xl font-extrabold text-foreground"
          animate={animate ? { scale: [1, 1.06, 1] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          2 min
        </motion.p>
        <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-0.5">
          away
        </p>
      </div>
      {/* departure chip */}
      <motion.div
        className="absolute -bottom-2 flex items-center gap-1.5 bg-white shadow-md rounded-full pl-1.5 pr-2.5 py-1"
        animate={animate ? { y: [0, -3, 0] } : undefined}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <CheckCircle2 className="size-3.5" style={{ color: TEAL }} />
        <span className="text-[9px] font-bold" style={{ color: TEAL }}>
          YOU'RE READY
        </span>
      </motion.div>
    </div>
  );
};

/* ============================================================
   FLOW STEPS DATA
   ============================================================ */

interface FlowStep {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  side: 'left' | 'right';
  accent: string;
  visual: React.ReactNode;
  bullets: string[];
}

/* ============================================================
   FLOW PAGE
   ============================================================ */

const FlowPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const flowSteps: FlowStep[] = [
    {
      id: 'tap',
      number: '01',
      eyebrow: 'You tap',
      title: 'Mark yourself waiting at a stop',
      description:
        "Open Uthutho, find your stop, and tap once. That's the entire action. No account required to start, no forms, no waiting.",
      side: 'right',
      accent: TEAL,
      visual: <Step1Visual animate={!prefersReduced} />,
      bullets: [
        'One-tap mark — no forms',
        'Works offline — syncs when online',
        'Your stop is remembered for next time',
      ],
    },
    {
      id: 'geofence',
      number: '02',
      eyebrow: 'GPS confirms',
      title: 'Geofencing verifies you',
      description:
        "GPS checks that you're actually at the stop. This prevents ghost users from inflating routes and keeps the network honest — for riders and drivers alike.",
      side: 'left',
      accent: ORANGE,
      visual: <Step2Visual animate={!prefersReduced} />,
      bullets: [
        'Verified presence, not just intent',
        'No ghost riders, no fake data',
        'Runs quietly in the background',
      ],
    },
    {
      id: 'rider',
      number: '03',
      eyebrow: 'A rider moves',
      title: 'Someone on your route starts moving',
      description:
        "When any commuter on the same route starts moving, Uthutho detects it and broadcasts their GPS progress to everyone waiting along that line. No driver needed.",
      side: 'right',
      accent: PINK,
      visual: <Step3Visual animate={!prefersReduced} />,
      bullets: [
        'Any commuter can be the GPS',
        'Broadcasts to the whole line',
        'Works for taxis, buses, and trains',
      ],
    },
    {
      id: 'network',
      number: '04',
      eyebrow: 'Network lights up',
      title: 'Everyone waiting sees it',
      description:
        "The whole network — every stop along the route — receives the same live signal. What was invisible becomes a map everyone can see.",
      side: 'left',
      accent: TEAL,
      visual: <Step4Visual animate={!prefersReduced} />,
      bullets: [
        'One movement → everyone sees',
        'Every stop, every rider, same feed',
        'The network gets stronger every day',
      ],
    },
    {
      id: 'leave',
      number: '05',
      eyebrow: 'You know',
      title: 'Know before you leave the house',
      description:
        "The end result: certainty. You see the exact ETA, the exact location, and know precisely when to walk out the door. No more guessing games.",
      side: 'right',
      accent: ORANGE,
      visual: <Step5Visual animate={!prefersReduced} />,
      bullets: [
        'Live ETA, updated every second',
        'Know exactly when to leave',
        'Works for your whole household',
      ],
    },
  ];

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
              eyebrow="How it flows"
              title="From tapping to"
              accentWord="knowing"
              accentColor={TEAL}
              description="Five steps. One community. Every signal you send, every tap you make — every one of them feeds the network. Here's the whole journey."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#flow-steps"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Walk the flow
                <ChevronDown className="size-4" />
              </a>
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                <Smartphone className="size-4" />
                Try the web app
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== QUICK SUMMARY STRIP ===== */}
        <section className="relative bg-secondary/40 border-y border-border/60">
          <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.06)}
              className="flex flex-wrap justify-center items-center gap-x-2 gap-y-3"
            >
              {flowSteps.map((step, i) => (
                <React.Fragment key={step.id}>
                  <motion.div
                    variants={{
                      hidden: { opacity: 0, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        transition: ONE_UI_TRANSITION,
                      },
                    }}
                    className="flex items-center gap-2 rounded-full bg-card border border-border/60 px-3 py-1.5"
                  >
                    <span
                      className="size-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                      style={{ backgroundColor: step.accent }}
                    >
                      {step.number}
                    </span>
                    <span className="text-xs font-semibold text-foreground">
                      {step.eyebrow}
                    </span>
                  </motion.div>
                  {i < flowSteps.length - 1 && (
                    <ArrowRight className="size-4 text-muted-foreground" />
                  )}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ===== FLOW STEPS — alternating left/right ===== */}
        <section id="flow-steps" className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="relative">
              {/* central rail on desktop */}
              <div
                aria-hidden
                className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border/60 -translate-x-1/2"
              />
              <motion.div
                aria-hidden
                className="hidden md:block absolute left-1/2 top-0 w-[3px] -translate-x-1/2 origin-top"
                style={{
                  background: `linear-gradient(to bottom, ${TEAL}, ${ORANGE}, ${PINK})`,
                }}
                initial={prefersReduced ? false : { scaleY: 0 }}
                whileInView={prefersReduced ? undefined : { scaleY: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 2.4, ease: ONE_UI_EASE }}
                data-rail
              />

              <div className="space-y-12 sm:space-y-16">
                {flowSteps.map((step, i) => {
                  const isLeft = step.side === 'left';
                  return (
                    <motion.div
                      key={step.id}
                      initial={prefersReduced ? false : 'hidden'}
                      whileInView={
                        prefersReduced ? undefined : 'visible'
                      }
                      viewport={{ once: true, amount: 0.25 }}
                      variants={stagger(0.08)}
                      className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${
                        isLeft ? '' : 'md:[direction:rtl]'
                      }`}
                    >
                      {/* Text column */}
                      <motion.div
                        variants={rise}
                        className={`md:[direction:ltr] ${
                          isLeft ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        <div
                          className={`flex items-center gap-2 mb-3 ${
                            isLeft ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          <span
                            className="text-[10px] font-bold uppercase tracking-[0.15em]"
                            style={{ color: step.accent }}
                          >
                            {step.eyebrow}
                          </span>
                          <span className="text-[10px] font-bold text-muted-foreground">
                            {step.number}
                          </span>
                        </div>
                        <h3 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground leading-tight">
                          {step.title}
                        </h3>
                        <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground">
                          {step.description}
                        </p>
                        <ul
                          className={`mt-4 space-y-1.5 ${
                            isLeft ? 'md:flex md:flex-col md:items-end' : ''
                          }`}
                        >
                          {step.bullets.map((b) => (
                            <li
                              key={b}
                              className={`flex items-start gap-2 text-sm text-foreground ${
                                isLeft ? 'md:flex-row-reverse' : ''
                              }`}
                            >
                              <CheckCircle2
                                className="size-4 shrink-0 mt-0.5"
                                style={{ color: step.accent }}
                              />
                              <span className={isLeft ? 'md:text-right' : ''}>
                                {b}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </motion.div>

                      {/* Number pin on the central rail */}
                      <div
                        aria-hidden
                        className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
                      >
                        <motion.div
                          variants={{
                            hidden: { scale: 0 },
                            visible: {
                              scale: 1,
                              transition: SPRING,
                            },
                          }}
                          className="size-10 rounded-full bg-card border-2 flex items-center justify-center shadow-md"
                          style={{ borderColor: step.accent }}
                        >
                          <span
                            className="text-xs font-extrabold"
                            style={{ color: step.accent }}
                          >
                            {step.number}
                          </span>
                        </motion.div>
                      </div>

                      {/* Visual column */}
                      <motion.div
                        variants={scaleIn}
                        className="md:[direction:ltr] mt-8 md:mt-0"
                      >
                        <MagneticCard
                          strength={4}
                          className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3"
                        >
                          <div
                            className="relative w-full h-64 rounded-[1.25rem] flex items-center justify-center overflow-hidden"
                            style={{
                              background: `radial-gradient(circle at 50% 50%, ${step.accent}10, transparent 70%)`,
                            }}
                          >
                            <div className="absolute inset-0 flex items-center justify-center">
                              {step.visual}
                            </div>
                          </div>
                        </MagneticCard>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ===== WHAT THIS MEANS FOR YOU ===== */}
        <section className="relative bg-secondary/60">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="What this means"
              title="The"
              accentWord="difference"
              accentColor={TEAL}
              description="Two commuters. Same route. Same morning. Different experience."
            />

            <div className="grid gap-6 md:grid-cols-2">
              {/* WITHOUT */}
              <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={scaleIn}
              >
                <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="size-8 rounded-full bg-red-500/15 flex items-center justify-center">
                      <Clock className="size-4 text-red-500" />
                    </div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-red-500">
                      Without Uthutho
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Wake up unsure of the taxi schedule',
                      'Stand at the stop guessing which route',
                      '18 minutes pass — no ETA',
                      'A taxi shows up. Maybe the right one',
                    ].map((line, i) => (
                      <motion.li
                        key={line}
                        initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                        whileInView={
                          prefersReduced ? undefined : { opacity: 1, x: 0 }
                        }
                        viewport={viewportOnce}
                        transition={{
                          ...ONE_UI_TRANSITION,
                          delay: i * 0.08,
                        }}
                        className="flex items-start gap-2 text-sm text-muted-foreground"
                      >
                        <CircleDot className="size-4 shrink-0 mt-0.5 text-red-400" />
                        {line}
                      </motion.li>
                    ))}
                  </ul>
                </MagneticCard>
              </motion.div>

              {/* WITH */}
              <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={scaleIn}
              >
                <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="size-8 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: `${TEAL}15` }}
                    >
                      <Zap className="size-4" style={{ color: TEAL }} />
                    </div>
                    <p
                      className="text-[11px] font-bold uppercase tracking-wider"
                      style={{ color: TEAL }}
                    >
                      With Uthutho
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {[
                      'Open the app. See the live map',
                      'Tap your stop. Geofence confirms',
                      'See the taxi moving 3 stops away',
                      'Walk out the door at exactly the right moment',
                    ].map((line, i) => (
                      <motion.li
                        key={line}
                        initial={prefersReduced ? false : { opacity: 0, x: 8 }}
                        whileInView={
                          prefersReduced ? undefined : { opacity: 1, x: 0 }
                        }
                        viewport={viewportOnce}
                        transition={{
                          ...ONE_UI_TRANSITION,
                          delay: i * 0.08,
                        }}
                        className="flex items-start gap-2 text-sm text-foreground"
                      >
                        <CheckCircle2
                          className="size-4 shrink-0 mt-0.5"
                          style={{ color: TEAL }}
                        />
                        {line}
                      </motion.li>
                    ))}
                  </ul>
                </MagneticCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
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
                Start the flow
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Your next commute is{' '}
                <span className="relative inline-block" style={{ color: TEAL }}>
                  one tap
                  <motion.span
                    aria-hidden
                    initial={prefersReduced ? false : { scaleX: 0 }}
                    whileInView={prefersReduced ? undefined : { scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ ...SPRING, delay: 0.35 }}
                    className="absolute -bottom-1 left-0 right-0 h-[8px] rounded-full origin-left"
                    style={{ backgroundColor: TEAL }}
                  />
                </span>{' '}
                away
              </motion.h2>
              <motion.p
                variants={rise}
                className="mt-6 text-sm sm:text-base text-white/70 max-w-xl mx-auto"
              >
                Live in Cape Town. Free on Play Store and web.
              </motion.p>
              <motion.div
                variants={rise}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
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
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FlowPage;