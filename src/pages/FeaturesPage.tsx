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
  Signal,
  Radio,
  ShieldCheck,
  Bell,
  GraduationCap,
  Zap,
  Lock,
  Globe,
  Smartphone,
  Wifi,
  Battery,
  Eye,
  Share2,
  RefreshCw,
  Gauge,
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
   INFOGRAPHIC #1 — Live Route Radar
   Concentric rings with a pulsing "you are here" dot and a
   travelling GPS packet moving towards you.
   ============================================================ */

const LiveRadarVisual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* radar rings */}
    {[0, 0.6, 1.2, 1.8].map((delay, i) => (
      <motion.div
        key={i}
        aria-hidden
        className="absolute rounded-full border"
        style={{
          width: 60 + i * 46,
          height: 60 + i * 46,
          borderColor: `${TEAL}33`,
        }}
        animate={
          animate
            ? { scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }
            : undefined
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          delay,
          ease: 'easeInOut',
        }}
      />
    ))}

    {/* you-are-here dot */}
    <motion.div
      className="relative z-10 size-4 rounded-full shadow-lg"
      style={{ backgroundColor: TEAL }}
      animate={
        animate
          ? { boxShadow: [`0 0 0 0 ${TEAL}88`, `0 0 0 14px ${TEAL}00`] }
          : undefined
      }
      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
    >
      <div className="absolute inset-0 rounded-full bg-white/70" />
    </motion.div>

    {/* travelling GPS packet on a circular orbit */}
    <motion.div
      aria-hidden
      className="absolute size-3 rounded-full bg-white shadow-md"
      animate={
        animate
          ? {
              rotate: 360,
              transition: {
                duration: 6,
                repeat: Infinity,
                ease: 'linear',
              },
            }
          : undefined
      }
      style={{ transformOrigin: '0px 0px', translateX: 60, translateY: 0 }}
    >
      <Signal className="size-2.5 absolute inset-0 m-auto" style={{ color: ORANGE }} />
    </motion.div>
  </div>
);

/* ============================================================
   INFOGRAPHIC #2 — Community Network Mesh
   Seven nodes orbiting a centre, lines connecting a few of them.
   ============================================================ */

const MeshVisual: React.FC<{ animate: boolean }> = ({ animate }) => {
  const nodes = [
    { angle: 0, r: 70, color: TEAL },
    { angle: 60, r: 70, color: ORANGE },
    { angle: 120, r: 70, color: PINK },
    { angle: 180, r: 70, color: TEAL },
    { angle: 240, r: 70, color: ORANGE },
    { angle: 300, r: 70, color: PINK },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* connection lines */}
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
              stroke={`${n.color}55`}
              strokeWidth="1"
              initial={{ pathLength: 0 }}
              animate={animate ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
              transition={{
                duration: 2.4,
                repeat: Infinity,
                delay: i * 0.2,
                ease: ONE_UI_EASE,
              }}
            />
          );
        })}
      </svg>

      {/* centre hub */}
      <motion.div
        className="relative z-10 size-10 rounded-full bg-white shadow-lg flex items-center justify-center"
        animate={animate ? { scale: [1, 1.08, 1] } : undefined}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Users className="size-5" style={{ color: TEAL }} />
      </motion.div>

      {/* orbital nodes */}
      {nodes.map((n, i) => {
        const rad = (n.angle * Math.PI) / 180;
        const x = Math.cos(rad) * n.r;
        const y = Math.sin(rad) * n.r;
        return (
          <motion.div
            key={i}
            className="absolute size-6 rounded-full bg-white shadow-md flex items-center justify-center"
            style={{ translateX: x, translateY: y }}
            animate={
              animate
                ? {
                    scale: [1, 1.15, 1],
                  }
                : undefined
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          >
            <div
              className="size-2 rounded-full"
              style={{ backgroundColor: n.color }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

/* ============================================================
   INFOGRAPHIC #3 — A/B Comparison (before vs after)
   Left: a broken/sparse signal. Right: a full clean line.
   ============================================================ */

const BeforeAfterVisual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="relative w-full h-full flex items-center justify-center gap-6 px-6">
    {/* BEFORE */}
    <div className="flex-1 flex flex-col items-center">
      <div className="relative w-full h-16">
        <svg viewBox="0 0 100 40" className="w-full h-full" aria-hidden>
          <motion.path
            d="M 2 20 L 18 20 L 22 8 L 26 32 L 30 20 L 50 20 L 60 20 L 68 6 L 74 34 L 80 20 L 98 20"
            fill="none"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: 1 } : { pathLength: 1 }}
            transition={{ duration: 1.6, ease: ONE_UI_EASE }}
          />
        </svg>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider text-red-400 mt-2">
        Before
      </p>
      <p className="text-[10px] text-muted-foreground mt-1 text-center">
        No info · Guessing
      </p>
    </div>

    {/* divider */}
    <div className="w-px h-24 bg-border" />

    {/* AFTER */}
    <div className="flex-1 flex flex-col items-center">
      <div className="relative w-full h-16">
        <svg viewBox="0 0 100 40" className="w-full h-full" aria-hidden>
          <motion.path
            d="M 2 20 L 98 20"
            fill="none"
            stroke={TEAL}
            strokeWidth="2"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={animate ? { pathLength: [0, 1] } : { pathLength: 1 }}
            transition={{
              duration: 1.4,
              repeat: Infinity,
              repeatDelay: 1,
              ease: ONE_UI_EASE,
            }}
          />
          {[10, 35, 60, 85].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy="20"
              r="2.5"
              fill={TEAL}
              initial={{ opacity: 0 }}
              animate={animate ? { opacity: [0.4, 1, 0.4] } : { opacity: 1 }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </svg>
      </div>
      <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: TEAL }}>
        After
      </p>
      <p className="text-[10px] text-muted-foreground mt-1 text-center">
        Live · Certain
      </p>
    </div>
  </div>
);

/* ============================================================
   INFOGRAPHIC #4 — One-Tap Flow
   Three stacked chips with a vertical rail showing 3 rapid taps.
   ============================================================ */

const OneTapVisual: React.FC<{ animate: boolean }> = ({ animate }) => {
  const steps = [
    { label: 'Tap: mark waiting', color: TEAL, icon: MapPin },
    { label: 'GPS confirms', color: ORANGE, icon: Radio },
    { label: 'Broadcast live', color: PINK, icon: Signal },
  ];
  return (
    <div className="relative w-full h-full flex flex-col justify-center gap-3 px-4">
      {steps.map((s, i) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.label}
            className="flex items-center gap-3 rounded-full bg-background/70 backdrop-blur px-3 py-2 shadow-sm"
            initial={{ opacity: 0, x: -12 }}
            animate={
              animate
                ? { opacity: [0, 1, 1], x: [-12, 0, 0] }
                : { opacity: 1, x: 0 }
            }
            transition={{
              duration: 1.6,
              repeat: Infinity,
              repeatDelay: 0.6,
              delay: i * 0.35,
            }}
          >
            <div
              className="size-6 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${s.color}25` }}
            >
              <Icon className="size-3.5" style={{ color: s.color }} />
            </div>
            <p className="text-[11px] font-semibold text-foreground">
              {s.label}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
};

/* ============================================================
   INFOGRAPHIC #5 — Alerts timeline
   A horizontal line with three discrete notifications popping.
   ============================================================ */

const AlertsVisual: React.FC<{ animate: boolean }> = ({ animate }) => {
  const alerts = [
    { icon: Bus, label: 'Taxi 5 min away', color: TEAL },
    { icon: GraduationCap, label: 'Child picked up', color: PINK },
    { icon: CheckCircle2, label: 'Dropped off safe', color: ORANGE },
  ];
  return (
    <div className="relative w-full h-full flex items-center justify-center px-4">
      {/* rail */}
      <div className="absolute left-6 right-6 top-1/2 h-[2px] bg-border" />
      <motion.div
        className="absolute left-6 top-1/2 h-[2px] origin-left"
        style={{
          background: `linear-gradient(to right, ${TEAL}, ${PINK}, ${ORANGE})`,
          right: 24,
        }}
        initial={{ scaleX: 0 }}
        animate={animate ? { scaleX: [0, 1] } : { scaleX: 1 }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          repeatDelay: 1,
          ease: ONE_UI_EASE,
        }}
      />

      <div className="relative w-full flex justify-between items-center">
        {alerts.map((a, i) => {
          const Icon = a.icon;
          return (
            <motion.div
              key={a.label}
              className="relative flex flex-col items-center"
              animate={
                animate
                  ? { y: [0, -3, 0] }
                  : undefined
              }
              transition={{
                duration: 1.6,
                repeat: Infinity,
                delay: i * 0.3,
                ease: 'easeInOut',
              }}
            >
              <motion.div
                className="size-10 rounded-full bg-background border-2 shadow-md flex items-center justify-center"
                style={{ borderColor: a.color }}
                initial={{ scale: 0 }}
                animate={animate ? { scale: [0, 1.1, 1] } : { scale: 1 }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  repeatDelay: 1.2,
                  delay: i * 0.35,
                }}
              >
                <Icon className="size-4" style={{ color: a.color }} />
              </motion.div>
              <p className="mt-2 text-[9px] font-semibold text-muted-foreground text-center max-w-[70px] leading-tight">
                {a.label}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

/* ============================================================
   INFOGRAPHIC #6 — Privacy Shield
   A shield with three orbiting lock chips.
   ============================================================ */

const ShieldVisual: React.FC<{ animate: boolean }> = ({ animate }) => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* outer rings */}
    {[0, 1.2].map((delay, i) => (
      <motion.div
        key={i}
        aria-hidden
        className="absolute rounded-full border"
        style={{
          width: 90,
          height: 90,
          borderColor: `${TEAL}33`,
        }}
        animate={
          animate ? { scale: [1, 1.4], opacity: [0.5, 0] } : undefined
        }
        transition={{
          duration: 3,
          repeat: Infinity,
          delay,
          ease: 'easeOut',
        }}
      />
    ))}

    {/* shield */}
    <motion.div
      className="relative z-10 size-14 rounded-2xl bg-white shadow-lg flex items-center justify-center"
      animate={animate ? { rotate: [0, 0, 3, -3, 0] } : undefined}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
    >
      <ShieldCheck className="size-7" style={{ color: TEAL }} />
    </motion.div>

    {/* orbit chips */}
    {[
      { icon: Lock, color: TEAL, angle: -30 },
      { icon: Eye, color: ORANGE, angle: 90 },
      { icon: Wifi, color: PINK, angle: 210 },
    ].map((c, i) => {
      const rad = (c.angle * Math.PI) / 180;
      const x = Math.cos(rad) * 52;
      const y = Math.sin(rad) * 52;
      const Icon = c.icon;
      return (
        <motion.div
          key={i}
          className="absolute size-7 rounded-full bg-white shadow-md flex items-center justify-center"
          style={{ translateX: x, translateY: y }}
          animate={animate ? { scale: [1, 1.15, 1] } : undefined}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
            ease: 'easeInOut',
          }}
        >
          <Icon className="size-3.5" style={{ color: c.color }} />
        </motion.div>
      );
    })}
  </div>
);

/* ============================================================
   FEATURE CARDS DATA
   ============================================================ */

interface Feature {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  accent: string;
  span?: 'wide' | 'normal';
}

const FEATURES: Feature[] = [
  {
    id: 'live',
    eyebrow: 'Live Tracking',
    title: 'Watch transport move in real time',
    description:
      'The whole network, live on one map. See every taxi on your route broadcasting its position — no driver app, no hardware.',
    bullets: [
      'Real-time dot on your route',
      'Accurate ETAs from real movement',
      'Works even for informal routes',
    ],
    accent: TEAL,
    span: 'wide',
  },
  {
    id: 'community',
    eyebrow: 'Community Network',
    title: 'Every rider is a sensor',
    description:
      'When one commuter moves, everyone on that route sees it. A mesh of riders is more reliable than any single driver.',
    bullets: [
      'No driver opt-in needed',
      'Grows stronger with every rider',
      'Community-verified accuracy',
    ],
    accent: ORANGE,
  },
  {
    id: 'confidence',
    eyebrow: 'Confidence',
    title: 'Before vs After Uthutho',
    description:
      'Same commute. Radically different experience. The before-After difference is the entire point of Uthutho.',
    bullets: [
      'No more standing in the dark',
      'No more guessing ETAs',
      'No more leaving too early or too late',
    ],
    accent: PINK,
  },
  {
    id: 'one-tap',
    eyebrow: 'One-Tap UX',
    title: 'From waiting to knowing in 3 taps',
    description:
      'Designed for the actual commute — one hand, moving, in the morning dark. Every action in 3 taps or fewer.',
    bullets: [
      'Mark waiting with one tap',
      'Geofencing verifies you',
      'Everything else is automatic',
    ],
    accent: TEAL,
  },
  {
    id: 'alerts',
    eyebrow: 'Smart Alerts',
    title: 'Alerts that actually matter',
    description:
      'No spam. No noise. Only the alerts that change your next move — from a taxi 5 minutes out to a child dropped off safe.',
    bullets: [
      'Route departure alerts',
      'School pickup & drop-off',
      'Live arrival warnings',
    ],
    accent: ORANGE,
  },
  {
    id: 'privacy',
    eyebrow: 'Privacy First',
    title: 'Your location is yours',
    description:
      'Every location data point is consented, encrypted, and deletable. You control what\'s shared, with whom, and for how long.',
    bullets: [
      'Explicit consent for every share',
      'Encrypted end-to-end',
      'Delete everything in one tap',
    ],
    accent: PINK,
    span: 'wide',
  },
];

/* ============================================================
   FEATURE CARD — picks the right infographic per id
   ============================================================ */

const FeatureCard: React.FC<{ feature: Feature; animate: boolean }> = ({
  feature,
  animate,
}) => {
  const visual = (() => {
    switch (feature.id) {
      case 'live':
        return <LiveRadarVisual animate={animate} />;
      case 'community':
        return <MeshVisual animate={animate} />;
      case 'confidence':
        return <BeforeAfterVisual animate={animate} />;
      case 'one-tap':
        return <OneTapVisual animate={animate} />;
      case 'alerts':
        return <AlertsVisual animate={animate} />;
      case 'privacy':
        return <ShieldVisual animate={animate} />;
      default:
        return null;
    }
  })();

  return (
    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3">
      <div
        className="relative w-full h-52 rounded-[1.25rem] flex items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${feature.accent}14, transparent 70%)`,
        }}
      >
        {/* corner accent */}
        <div
          className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.15em]"
          style={{ color: feature.accent }}
        >
          {feature.eyebrow}
        </div>

        {/* live infographic */}
        <div className="absolute inset-0 flex items-center justify-center">
          {visual}
        </div>
      </div>

      <div className="p-5 pt-5">
        <h3 className="font-display text-xl font-extrabold tracking-tight text-foreground leading-tight">
          {feature.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground font-medium">
          {feature.description}
        </p>
        <ul className="mt-4 space-y-2">
          {feature.bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2 text-sm text-foreground"
            >
              <CheckCircle2
                className="size-4 shrink-0 mt-0.5"
                style={{ color: feature.accent }}
              />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </MagneticCard>
  );
};

/* ============================================================
   FEATURES PAGE
   ============================================================ */

const FeaturesPage: React.FC = () => {
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
              eyebrow="Features"
              title="Everything you need to"
              accentWord="ride smart"
              accentColor={TEAL}
              description="Six features that turn South Africa's most unpredictable commute into a live, certain, community-powered experience. All built mobile-first."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#feature-grid"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Explore features
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

        {/* ===== FEATURE GRID ===== */}
        <section id="feature-grid" className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid gap-6 md:grid-cols-2"
            >
              {FEATURES.map((feature, i) => {
                const isWide = feature.span === 'wide';
                return (
                  <motion.div
                    key={feature.id}
                    variants={{
                      hidden: { opacity: 0, y: 24, scale: 0.97 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          ...ONE_UI_TRANSITION,
                          delay: i * 0.06,
                        },
                      },
                    }}
                    className={isWide ? 'md:col-span-2' : ''}
                  >
                    <FeatureCard
                      feature={feature}
                      animate={!prefersReduced}
                    />
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ===== STATS STRIP ===== */}
        <section className="relative bg-secondary/40 border-y border-border/60">
          <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid grid-cols-2 gap-6 lg:grid-cols-4"
            >
              {[
                { value: '3.7M', label: 'commuters per day', icon: Users, color: TEAL },
                { value: '250k', label: 'taxis mapped', icon: Bus, color: ORANGE },
                { value: '0', label: 'drivers needed', icon: Zap, color: PINK },
                { value: '100%', label: 'community-powered', icon: Users, color: TEAL },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.label}
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
                    className="text-center"
                  >
                    <div className="flex justify-center mb-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${s.color}15` }}
                      >
                        <Icon className="size-5" style={{ color: s.color }} />
                      </div>
                    </div>
                    <p className="font-display text-3xl sm:text-4xl font-extrabold text-foreground">
                      {s.value}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-muted-foreground font-medium">
                      {s.label}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ===== HOW IT ALL CONNECTS — visual pipeline ===== */}
        <section className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="How it all connects"
              title="One platform,"
              accentWord="one flow"
              accentColor={TEAL}
              description="Every feature feeds the next. A tap here becomes a live signal there — and 3.7M commuters get certainty."
            />

            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.1)}
              className="grid gap-6 md:grid-cols-3 items-center"
            >
              {[
                {
                  step: '1',
                  label: 'You tap',
                  desc: 'Mark yourself waiting at a stop',
                  icon: MapPin,
                  color: TEAL,
                },
                {
                  step: '2',
                  label: 'GPS confirms',
                  desc: 'Geofencing verifies you',
                  icon: Radio,
                  color: ORANGE,
                },
                {
                  step: '3',
                  label: 'Network lights up',
                  desc: 'Everyone on your route sees it',
                  icon: Signal,
                  color: PINK,
                },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <motion.div
                    key={s.step}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          ...ONE_UI_TRANSITION,
                          delay: i * 0.12,
                        },
                      },
                    }}
                    className="relative"
                  >
                    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 text-center">
                      <div
                        className="size-14 rounded-2xl mx-auto mb-4 flex items-center justify-center"
                        style={{ backgroundColor: `${s.color}15` }}
                      >
                        <Icon className="size-7" style={{ color: s.color }} />
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2"
                        style={{ color: s.color }}
                      >
                        Step {s.step}
                      </p>
                      <p className="font-display text-lg font-extrabold text-foreground">
                        {s.label}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                        {s.desc}
                      </p>
                    </MagneticCard>

                    {i < 2 && (
                      <motion.div
                        className="hidden md:block absolute top-1/2 -right-3 -translate-y-1/2 z-10"
                        initial={prefersReduced ? false : { opacity: 0, x: -8 }}
                        whileInView={
                          prefersReduced ? undefined : { opacity: 1, x: 0 }
                        }
                        viewport={viewportOnce}
                        transition={{
                          ...ONE_UI_TRANSITION,
                          delay: 0.3 + i * 0.15,
                        }}
                      >
                        <ArrowRight className="size-5 text-muted-foreground" />
                      </motion.div>
                    )}
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ===== WHAT'S NEXT ===== */}
        <section className="relative bg-secondary/60">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="On the roadmap"
              title="What's"
              accentWord="next"
              accentColor={ORANGE}
              description="The platform is live in Cape Town. Here's what's shipping soon — designed by the riders who use it every day."
            />

            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid gap-4 md:grid-cols-3"
            >
              {[
                {
                  icon: Globe,
                  title: 'National expansion',
                  desc: 'From Cape Town to Johannesburg, Durban, and Pretoria.',
                  status: 'Q3 2026',
                  color: TEAL,
                },
                {
                  icon: Gauge,
                  title: 'Predictive ETAs',
                  desc: 'Machine learning on top of live GPS for arrival predictions.',
                  status: 'Q4 2026',
                  color: ORANGE,
                },
                {
                  icon: Share2,
                  title: 'Operator portal',
                  desc: 'A dashboard for operators to list routes, pricing, and seats.',
                  status: 'Q4 2026',
                  color: PINK,
                },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
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
                    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div
                          className="size-11 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          <Icon
                            className="size-5"
                            style={{ color: item.color }}
                          />
                        </div>
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1"
                          style={{
                            backgroundColor: `${item.color}15`,
                            color: item.color,
                          }}
                        >
                          {item.status}
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-extrabold text-foreground">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {item.desc}
                      </p>
                    </MagneticCard>
                  </motion.div>
                );
              })}
            </motion.div>
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
                Ready to ride?
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Experience{' '}
                <span className="relative inline-block" style={{ color: TEAL }}>
                  all six
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
                in the app
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

export default FeaturesPage;