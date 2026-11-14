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
  FileText,
  ShieldCheck,
  Scale,
  AlertCircle,
  Copyright,
  Ban,
  UserX,
  Gavel,
  Mail,
  Globe,
  ChevronDown,
  type LucideIcon,
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
   TERMS DATA — 12 real sections, unchanged copy
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
    id: 'acceptance',
    number: '01',
    title: 'Acceptance of Terms',
    icon: FileText,
    color: TEAL,
    body: (
      <p>
        By accessing or using the Uthutho application ("App"), you agree to be
        bound by these Terms and Conditions ("Terms"). If you do not agree to
        these Terms, please do not use the App.
      </p>
    ),
  },
  {
    id: 'changes',
    number: '02',
    title: 'Changes to Terms',
    icon: AlertCircle,
    color: ORANGE,
    body: (
      <p>
        We reserve the right to modify these Terms at any time. Changes will be
        effective immediately upon posting on the App. Your continued use of the
        App after any such changes constitutes acceptance of the new Terms.
      </p>
    ),
  },
  {
    id: 'accounts',
    number: '03',
    title: 'User Accounts',
    icon: ShieldCheck,
    color: PINK,
    body: (
      <>
        <p className="mb-3">
          To use certain features of the App, you must create an account. You
          agree to:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Provide accurate and complete registration information</li>
          <li>
            Maintain the security and confidentiality of your password
          </li>
          <li>
            Accept responsibility for all activities that occur under your
            account
          </li>
          <li>
            Notify us immediately of any unauthorized use of your account
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'use',
    number: '04',
    title: 'Use of the App',
    icon: Ban,
    color: TEAL,
    body: (
      <>
        <p className="mb-3">
          You agree to use the App only for lawful purposes and in a way that
          does not infringe upon the rights of others or restrict their use of
          the App. Prohibited activities include:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Posting false or misleading transport information</li>
          <li>Using the App for any illegal activity</li>
          <li>
            Attempting to gain unauthorized access to systems or data
          </li>
          <li>Harassing or threatening other users</li>
          <li>
            Uploading malicious code or interfering with the App's
            functionality
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'transport',
    number: '05',
    title: 'Transport Information',
    icon: Globe,
    color: ORANGE,
    body: (
      <p>
        While we strive to provide accurate transportation information, we
        cannot guarantee the accuracy, completeness, or timeliness of routes,
        schedules, or other transport data. The App should be used as a guide
        only, and users should verify critical information through official
        transport providers.
      </p>
    ),
  },
  {
    id: 'content',
    number: '06',
    title: 'User Content',
    icon: Copyright,
    color: PINK,
    body: (
      <>
        <p className="mb-3">
          When you post content to the App (such as comments, reports, or
          ratings), you grant us a non-exclusive, worldwide, royalty-free
          license to use, modify, publicly display, reproduce, and distribute
          that content on the App. You affirm that:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            You own or have the necessary rights to the content you post
          </li>
          <li>
            Your content does not violate the privacy, publicity, copyright, or
            other rights of any person
          </li>
          <li>
            Your content is not defamatory, obscene, or otherwise unlawful
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'ip',
    number: '07',
    title: 'Intellectual Property',
    icon: Scale,
    color: TEAL,
    body: (
      <p>
        The App and its content, features, and functionality are owned by
        Uthutho and are protected by international copyright, trademark, patent,
        trade secret, and other intellectual property laws. You may not copy,
        modify, distribute, or create derivative works based on our App without
        express written permission.
      </p>
    ),
  },
  {
    id: 'disclaimer',
    number: '08',
    title: 'Disclaimer of Warranties',
    icon: AlertCircle,
    color: ORANGE,
    body: (
      <p>
        The App is provided "as is" without warranties of any kind, whether
        express or implied. We do not warrant that the App will be error-free,
        secure, or uninterrupted. You use the App at your own risk.
      </p>
    ),
  },
  {
    id: 'liability',
    number: '09',
    title: 'Limitation of Liability',
    icon: Gavel,
    color: PINK,
    body: (
      <p>
        To the maximum extent permitted by law, Uthutho shall not be liable for
        any indirect, incidental, special, consequential, or punitive damages
        resulting from your use or inability to use the App, including but not
        limited to loss of profits, data, or goodwill.
      </p>
    ),
  },
  {
    id: 'termination',
    number: '10',
    title: 'Termination',
    icon: UserX,
    color: TEAL,
    body: (
      <p>
        We reserve the right to terminate or suspend your account and access to
        the App without prior notice for violation of these Terms or for any
        other reason at our sole discretion.
      </p>
    ),
  },
  {
    id: 'law',
    number: '11',
    title: 'Governing Law',
    icon: Scale,
    color: ORANGE,
    body: (
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of South Africa, without regard to its conflict of law provisions.
      </p>
    ),
  },
  {
    id: 'contact',
    number: '12',
    title: 'Contact Information',
    icon: Mail,
    color: PINK,
    body: (
      <>
        <p className="mb-3">
          For questions about these Terms, please contact us at:
        </p>
        <div className="flex flex-col gap-1.5">
          <a
            href="mailto:legal@uthutho.com"
            className="inline-flex items-center gap-2 font-semibold transition-colors hover:opacity-80"
            style={{ color: TEAL }}
          >
            <Mail className="size-4" />
            legal@uthutho.com
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
   TERMS PAGE
   ============================================================ */

const TermsAndConditions: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<string>('acceptance');

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Highlight current section in the sidebar using IntersectionObserver
  React.useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(s.id);
            }
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
              eyebrow="Legal"
              title="Terms and"
              accentWord="Conditions"
              accentColor={TEAL}
              description="The rules that keep Uthutho safe, fair, and community-powered for everyone. Effective January 01, 2024."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#acceptance"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Read the terms
                <ChevronDown className="size-4" />
              </a>
              <a
                href="mailto:legal@uthutho.com"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                <Mail className="size-4" />
                Contact legal
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
                </motion.div>

                {/* Closing CTA */}
                <motion.div
                  initial={prefersReduced ? false : { opacity: 0, y: 20 }}
                  whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
                  className="mt-8 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8 text-center"
                >
                  <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                    By using Uthutho, you acknowledge that you have read and
                    understood these Terms and agree to be bound by them.
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-3">
                    <Link
                      to="/privacy-policy"
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
                    >
                      <ShieldCheck className="size-4" />
                      Privacy Policy
                    </Link>
                    <a
                      href="mailto:legal@uthutho.com"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                      style={{ backgroundColor: TEAL }}
                    >
                      Ask a question
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

export default TermsAndConditions;