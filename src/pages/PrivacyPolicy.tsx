import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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
  ArrowLeft,
  ArrowRight,
  Mail,
  Globe,
  Shield,
  ShieldCheck,
  User,
  MapPin,
  Smartphone,
  MessageSquare,
  Database,
  Share2,
  Lock,
  Settings,
  Baby,
  RefreshCw,
  Trash2,
  AlertTriangle,
  ChevronDown,
  type LucideIcon,
} from 'lucide-react';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const TEAL = '#1ea2b1';
const ORANGE = '#f18f01';
const PINK = '#e151af';
const RED = '#ef4444';

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
}> = ({ children, className, strength = 6 }) => {
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
   PRIVACY DATA — 9 real sections + data deletion, copy unchanged
   ============================================================ */

interface Section {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  color: string;
  body: React.ReactNode;
}

const SECTIONS: Section[] = [
  {
    id: 'introduction',
    number: '01',
    title: 'Introduction',
    icon: Shield,
    color: TEAL,
    body: (
      <p>
        Welcome to Uthutho ("we," "our," or "us"). Your privacy is important to
        us, and we are committed to protecting your personal information. This
        Privacy Policy explains how we collect, use, and safeguard your data
        when you use our app.
      </p>
    ),
  },
  {
    id: 'information-we-collect',
    number: '02',
    title: 'Information We Collect',
    icon: Database,
    color: ORANGE,
    body: (
      <>
        <p className="mb-3">
          We may collect the following types of information:
        </p>
        <ul className="space-y-3">
          <li className="flex gap-3">
            <User
              className="size-4 shrink-0 mt-0.5"
              style={{ color: ORANGE }}
            />
            <span>
              <strong className="text-foreground">
                Personal Information:
              </strong>{' '}
              When you create an account, we may collect your name, email, and
              phone number.
            </span>
          </li>
          <li className="flex gap-3">
            <MapPin
              className="size-4 shrink-0 mt-0.5"
              style={{ color: ORANGE }}
            />
            <span>
              <strong className="text-foreground">Location Data:</strong> To
              provide transport routes and nearby pickup spots, we may collect
              your real-time location with your permission.
            </span>
          </li>
          <li className="flex gap-3">
            <Smartphone
              className="size-4 shrink-0 mt-0.5"
              style={{ color: ORANGE }}
            />
            <span>
              <strong className="text-foreground">Device Information:</strong>{' '}
              We may collect device type, operating system, and app usage data
              for analytics and performance improvements.
            </span>
          </li>
          <li className="flex gap-3">
            <MessageSquare
              className="size-4 shrink-0 mt-0.5"
              style={{ color: ORANGE }}
            />
            <span>
              <strong className="text-foreground">
                User Contributions:
              </strong>{' '}
              Messages in pickup spot chats and commuter updates may be stored
              to enhance community engagement.
            </span>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'how-we-use',
    number: '03',
    title: 'How We Use Your Information',
    icon: Settings,
    color: PINK,
    body: (
      <>
        <p className="mb-3">We use your data to:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide and improve our transport navigation services.</li>
          <li>
            Show relevant routes, transport hubs, and commuter updates.
          </li>
          <li>
            Enhance user safety by enabling real-time alerts and
            location-based features.
          </li>
          <li>
            Comply with legal obligations and prevent fraudulent activities.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-sharing',
    number: '04',
    title: 'Data Sharing & Third Parties',
    icon: Share2,
    color: TEAL,
    body: (
      <>
        <p className="mb-3">
          We do not sell your personal data. However, we may share information
          with:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <strong className="text-foreground">Service Providers:</strong> For
            app functionality, hosting, and analytics.
          </li>
          <li>
            <strong className="text-foreground">Legal Authorities:</strong> If
            required by law or to protect user safety.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'data-security',
    number: '05',
    title: 'Data Security',
    icon: Lock,
    color: ORANGE,
    body: (
      <p>
        We use encryption and industry-standard security practices to protect
        your data. However, no online service is 100% secure.
      </p>
    ),
  },
  {
    id: 'your-rights',
    number: '06',
    title: 'Your Choices & Rights',
    icon: ShieldCheck,
    color: PINK,
    body: (
      <ul className="list-disc pl-6 space-y-2">
        <li>
          <strong className="text-foreground">Location Access:</strong> You can
          enable or disable location permissions in your device settings.
        </li>
        <li>
          <strong className="text-foreground">Account Deletion:</strong> You
          may request account deletion by contacting us.
        </li>
        <li>
          <strong className="text-foreground">Privacy Settings:</strong> You
          can manage preferences in the app settings.
        </li>
      </ul>
    ),
  },
  {
    id: 'childrens-privacy',
    number: '07',
    title: "Children's Privacy",
    icon: Baby,
    color: TEAL,
    body: (
      <p>
        Uthutho is not intended for children under 13. We do not knowingly
        collect data from minors.
      </p>
    ),
  },
  {
    id: 'changes',
    number: '08',
    title: 'Changes to This Policy',
    icon: RefreshCw,
    color: ORANGE,
    body: (
      <p>
        We may update this policy periodically. Any changes will be posted here
        with a revised effective date.
      </p>
    ),
  },
  {
    id: 'contact',
    number: '09',
    title: 'Contact Us',
    icon: Mail,
    color: PINK,
    body: (
      <>
        <p className="mb-3">
          If you have any questions, please contact us at:
        </p>
        <div className="flex flex-col gap-1.5">
          <a
            href="mailto:info@uthutho.com"
            className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80"
            style={{ color: TEAL }}
          >
            <Mail className="size-4" />
            info@uthutho.com
          </a>
          <a
            href="https://www.uthutho.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80"
            style={{ color: TEAL }}
          >
            <Globe className="size-4" />
            www.uthutho.com
          </a>
        </div>
      </>
    ),
  },
];

/* ============================================================
   PRIVACY PAGE
   ============================================================ */

const PrivacyPolicy: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>('introduction');

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Highlight the current section in the sidebar
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) setActiveId(s.id);
          });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <main>
        {/* ===== HERO ===== */}
        <section
          ref={heroRef}
          className="relative w-full overflow-hidden bg-background pt-24 pb-12 sm:pt-32 sm:pb-16"
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
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 8 }}
              animate={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              transition={ONE_UI_TRANSITION}
              className="mb-8"
            >
  
            </motion.div>

            <SceneHeader
              eyebrow="Your Privacy"
              title="Privacy"
              accentWord="Policy"
              accentColor={TEAL}
              description="How we collect, protect, and respect your data at Uthutho. Effective January 01, 2024."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#introduction"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Read the policy
                <ChevronDown className="size-4" />
              </a>
              <a
                href="#data-deletion"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                <Trash2 className="size-4" />
                Data deletion
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== MAIN LAYOUT: sticky sidebar + sections ===== */}
        <section className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
            <div className="grid gap-8 lg:grid-cols-[260px_1fr] lg:gap-12">
              {/* Sticky Table of Contents */}
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-3">
                    On this page
                  </p>
                  <nav className="space-y-0.5">
                    {SECTIONS.map((s) => {
                      const isActive = activeId === s.id;
                      return (
                        <a
                          key={s.id}
                          href={`#${s.id}`}
                          className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? 'text-foreground'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                          style={
                            isActive
                              ? {
                                  backgroundColor: `${TEAL}15`,
                                  color: TEAL,
                                }
                              : undefined
                          }
                        >
                          <span className="text-[10px] font-bold opacity-60 mr-2">
                            {s.number}
                          </span>
                          {s.title}
                        </a>
                      );
                    })}
                    <a
                      href="#data-deletion"
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        activeId === 'data-deletion'
                          ? 'text-foreground'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      style={
                        activeId === 'data-deletion'
                          ? { backgroundColor: `${RED}15`, color: RED }
                          : undefined
                      }
                    >
                      <span className="text-[10px] font-bold opacity-60 mr-2">
                        ⚠
                      </span>
                      Data Deletion
                    </a>
                  </nav>
                </div>
              </aside>

              {/* Sections */}
              <div className="min-w-0">
                <motion.div
                  initial={prefersReduced ? false : 'hidden'}
                  whileInView={prefersReduced ? undefined : 'visible'}
                  viewport={viewportOnce}
                  variants={stagger(0.06)}
                  className="space-y-4"
                >
                  {SECTIONS.map((section, i) => {
                    const Icon = section.icon;
                    return (
                      <motion.div
                        key={section.id}
                        id={section.id}
                        variants={{
                          hidden: { opacity: 0, y: 20 },
                          visible: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              ...ONE_UI_TRANSITION,
                              delay: i * 0.02,
                            },
                          },
                        }}
                        className="scroll-mt-24"
                      >
                        <MagneticCard
                          strength={4}
                          className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className="shrink-0 size-11 rounded-full flex items-center justify-center mt-0.5"
                              style={{
                                backgroundColor: `${section.color}15`,
                              }}
                            >
                              <Icon
                                className="size-5"
                                style={{ color: section.color }}
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-baseline gap-2 mb-2">
                                <span
                                  className="text-[10px] font-bold uppercase tracking-[0.15em]"
                                  style={{ color: section.color }}
                                >
                                  {section.number}
                                </span>
                                <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                                  {section.title}
                                </h3>
                              </div>
                              <div className="text-sm leading-relaxed text-muted-foreground">
                                {section.body}
                              </div>
                            </div>
                          </div>
                        </MagneticCard>
                      </motion.div>
                    );
                  })}

                  {/* Data Deletion card — highlighted destructive */}
                  <motion.div
                    id="data-deletion"
                    initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                    whileInView={
                      prefersReduced ? undefined : { opacity: 1, y: 0 }
                    }
                    viewport={viewportOnce}
                    transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
                    className="scroll-mt-24"
                  >
                    <MagneticCard
                      strength={4}
                      className="rounded-[1.75rem] bg-card border-2 shadow-xl p-6 sm:p-8"
                      // override border color via inline style on wrapper
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="shrink-0 size-11 rounded-full flex items-center justify-center mt-0.5"
                          style={{ backgroundColor: `${RED}15` }}
                        >
                          <AlertTriangle
                            className="size-5"
                            style={{ color: RED }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-baseline gap-2 mb-2">
                            <span
                              className="text-[10px] font-bold uppercase tracking-[0.15em]"
                              style={{ color: RED }}
                            >
                              DANGER ZONE
                            </span>
                            <h3 className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-foreground">
                              Data Deletion
                            </h3>
                          </div>
                          <div className="text-sm leading-relaxed text-muted-foreground space-y-4">
                            <p>
                              As per our privacy commitment, you have the right
                              to request deletion of your personal data from
                              our services. If you would like to delete your
                              account and all associated data, please click the
                              button below.
                            </p>
                            <Link
                              to="/delete-account"
                              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                              style={{ backgroundColor: RED }}
                            >
                              <Trash2 className="size-4" />
                              Request Data Deletion
                              <ArrowRight className="size-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </MagneticCard>
                  </motion.div>
                </motion.div>

                {/* Closing CTA */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={
                    prefersReduced ? undefined : { opacity: 1, y: 0 }
                  }
                  viewport={viewportOnce}
                  transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
                  className="mt-8 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8 text-center"
                >
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    Questions about how we handle your data? We're happy to
                    help.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/terms-and-conditions"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
                    >
                      <ShieldCheck className="size-4" />
                      Terms & Conditions
                    </Link>
                    <a
                      href="mailto:info@uthutho.com"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: TEAL }}
                    >
                      Email privacy team
                      <ArrowRight className="size-4" />
                    </a>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;