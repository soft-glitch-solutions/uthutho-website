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
  Mail,
  MessageCircle,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Linkedin,
  Instagram,
  Twitter,
  Building2,
  Headphones,
  Briefcase,
  AlertCircle,
  ChevronDown,
} from 'lucide-react';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const TEAL = '#1ea2b1';
const ORANGE = '#f18f01';
const PINK = '#e151af';

/* ============================================================
   MOTION PRIMITIVES — same system as Home / MediaPage
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
   CONTACT DATA
   ============================================================ */

const CONTACT_REASONS = [
  {
    icon: Headphones,
    label: 'General enquiries',
    email: 'info@uthutho.com',
    color: TEAL,
    description: 'Questions about the app, features, or your account.',
  },
  {
    icon: Briefcase,
    label: 'Partnerships',
    email: 'partners@uthutho.com',
    color: ORANGE,
    description: 'Operators, schools, municipalities, and investors.',
  },
  {
    icon: AlertCircle,
    label: 'Press & media',
    email: 'brand@uthutho.com',
    color: PINK,
    description: 'Interviews, brand assets, and press enquiries.',
  },
  {
    icon: Building2,
    label: 'Legal',
    email: 'legal@uthutho.com',
    color: TEAL,
    description: 'Terms, privacy, and data deletion requests.',
  },
];

const SOCIALS = [
  { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/company/uthutho' },
  { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/uthutho' },
  { icon: Twitter, label: 'X', url: 'https://x.com/uthutho' },
];

/* ============================================================
   FORM FIELD COMPONENT
   ============================================================ */

const FormField: React.FC<{
  id: string;
  label: string;
  type?: 'text' | 'email' | 'tel';
  placeholder: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  textarea?: boolean;
}> = ({
  id,
  label,
  type = 'text',
  placeholder,
  required,
  value,
  onChange,
  textarea,
}) => {
  const baseClasses =
    'w-full rounded-xl bg-background border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-offset-0 transition-all';
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2"
      >
        {label}
        {required && <span style={{ color: TEAL }}> *</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={5}
          className={`${baseClasses} resize-none`}
          style={{ '--tw-ring-color': TEAL } as React.CSSProperties}
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={baseClasses}
          style={{ '--tw-ring-color': TEAL } as React.CSSProperties}
        />
      )}
    </div>
  );
};

/* ============================================================
   CONTACT PAGE
   ============================================================ */

const ContactPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 100]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name || !email || !message) {
      setError('Please fill in name, email, and message.');
      return;
    }
    setSubmitting(true);

    // ────────────────────────────────────────────────────────
    // Replace this with your real submission endpoint.
    // e.g. Formspree:  fetch('https://formspree.io/f/xxxxxxx', …)
    // or a serverless function / Resend / EmailJS call.
    // ────────────────────────────────────────────────────────
    try {
      await new Promise((r) => setTimeout(r, 900)); // simulated send
      setSubmitted(true);
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

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
            <SceneHeader
              eyebrow="Contact"
              title="Let's"
              accentWord="talk"
              accentColor={TEAL}
              description="Whether you're a commuter with feedback, a transport operator, or a journalist — we'd love to hear from you."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#contact-form"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Send a message
                <ArrowRight className="size-4" />
              </a>
              <a
                href="#contact-methods"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                Other ways to reach us
                <ChevronDown className="size-4" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== CONTACT METHODS GRID ===== */}
        <section id="contact-methods" className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 pb-12 sm:px-6">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {CONTACT_REASONS.map((reason, i) => {
                const Icon = reason.icon;
                return (
                  <motion.div
                    key={reason.email}
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
                    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-5">
                      <div
                        className="size-11 rounded-full flex items-center justify-center mb-3"
                        style={{ backgroundColor: `${reason.color}15` }}
                      >
                        <Icon
                          className="size-5"
                          style={{ color: reason.color }}
                        />
                      </div>
                      <p
                        className="text-[10px] font-bold uppercase tracking-[0.15em] mb-1"
                        style={{ color: reason.color }}
                      >
                        {reason.label}
                      </p>
                      <a
                        href={`mailto:${reason.email}`}
                        className="font-display text-sm font-extrabold text-foreground hover:underline break-all"
                      >
                        {reason.email}
                      </a>
                      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                        {reason.description}
                      </p>
                    </MagneticCard>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* ===== FORM + SIDEBAR ===== */}
        <section id="contact-form" className="relative bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="Send us a message"
              title="Drop us a"
              accentWord="line"
              accentColor={TEAL}
              description="Fill in the form and we'll get back to you within 1–2 business days."
            />

            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              {/* Form */}
              <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={scaleIn}
              >
                <MagneticCard
                  strength={4}
                  className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8"
                >
                  {submitted ? (
                    <motion.div
                      initial={prefersReduced ? false : { opacity: 0, scale: 0.95 }}
                      animate={
                        prefersReduced ? undefined : { opacity: 1, scale: 1 }
                      }
                      transition={SOFT_SPRING}
                      className="py-8 text-center"
                    >
                      <div
                        className="size-16 rounded-full mx-auto flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${TEAL}15` }}
                      >
                        <CheckCircle2
                          className="size-8"
                          style={{ color: TEAL }}
                        />
                      </div>
                      <h3 className="font-display text-xl font-extrabold text-foreground mb-2">
                        Message sent
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        Thanks for reaching out. We'll reply to your email
                        shortly.
                      </p>
                      <button
                        onClick={() => setSubmitted(false)}
                        className="mt-5 text-sm font-semibold transition-colors hover:opacity-80"
                        style={{ color: TEAL }}
                      >
                        Send another message →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          id="contact-name"
                          label="Your name"
                          placeholder="Jane Doe"
                          required
                          value={name}
                          onChange={setName}
                        />
                        <FormField
                          id="contact-email"
                          label="Email"
                          type="email"
                          placeholder="jane@example.com"
                          required
                          value={email}
                          onChange={setEmail}
                        />
                      </div>
                      <FormField
                        id="contact-subject"
                        label="Subject"
                        placeholder="What's this about?"
                        value={subject}
                        onChange={setSubject}
                      />
                      <FormField
                        id="contact-message"
                        label="Message"
                        placeholder="Tell us what's on your mind…"
                        required
                        value={message}
                        onChange={setMessage}
                        textarea
                      />

                      {error && (
                        <div
                          className="flex items-start gap-2 rounded-xl px-4 py-3 text-sm"
                          style={{
                            backgroundColor: '#ef444415',
                            color: '#ef4444',
                          }}
                        >
                          <AlertCircle className="size-4 shrink-0 mt-0.5" />
                          {error}
                        </div>
                      )}

                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between pt-2">
                        <p className="text-xs text-muted-foreground">
                          We'll never share your info.
                        </p>
                        <button
                          type="submit"
                          disabled={submitting}
                          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
                          style={{ backgroundColor: TEAL }}
                        >
                          {submitting ? (
                            <>
                              <motion.span
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: 'linear',
                                }}
                                className="size-4 rounded-full border-2 border-white/30 border-t-white inline-block"
                              />
                              Sending…
                            </>
                          ) : (
                            <>
                              Send message
                              <Send className="size-4" />
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}
                </MagneticCard>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={stagger(0.08, 0.15)}
                className="space-y-4"
              >
                {/* Office / location card */}
                <motion.div variants={rise}>
                  <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${TEAL}15` }}
                      >
                        <MapPin className="size-5" style={{ color: TEAL }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                          Based in
                        </p>
                        <p className="font-display text-base font-extrabold text-foreground">
                          Cape Town, South Africa
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Working with operators across the Western Cape.
                        </p>
                      </div>
                    </div>
                  </MagneticCard>
                </motion.div>

                {/* Hours card */}
                <motion.div variants={rise}>
                  <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${ORANGE}15` }}
                      >
                        <Clock className="size-5" style={{ color: ORANGE }} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                          Response time
                        </p>
                        <p className="font-display text-base font-extrabold text-foreground">
                          1–2 business days
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Mon–Fri · 08:00–17:00 SAST
                        </p>
                      </div>
                    </div>
                  </MagneticCard>
                </motion.div>

                {/* Social card */}
                <motion.div variants={rise}>
                  <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                      Follow along
                    </p>
                    <div className="flex gap-2">
                      {SOCIALS.map((s) => {
                        const Icon = s.icon;
                        return (
                          <a
                            key={s.label}
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={s.label}
                            className="size-10 rounded-full flex items-center justify-center transition-colors hover:opacity-80"
                            style={{ backgroundColor: `${TEAL}15` }}
                          >
                            <Icon
                              className="size-4"
                              style={{ color: TEAL }}
                            />
                          </a>
                        );
                      })}
                    </div>
                  </MagneticCard>
                </motion.div>

                {/* WhatsApp / instant card */}
                <motion.div variants={rise}>
                  <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-5">
                    <div className="flex items-start gap-3">
                      <div
                        className="size-10 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: `${PINK}15` }}
                      >
                        <MessageCircle
                          className="size-5"
                          style={{ color: PINK }}
                        />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-1">
                          Quick questions
                        </p>
                        <a
                          href="mailto:info@uthutho.com"
                          className="font-display text-base font-extrabold text-foreground hover:underline break-all"
                        >
                          info@uthutho.com
                        </a>
                        <p className="text-xs text-muted-foreground mt-1">
                          For the fastest response.
                        </p>
                      </div>
                    </div>
                  </MagneticCard>
                </motion.div>
              </motion.div>
            </div>
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
                Prefer the app?
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Reach us from{' '}
                <span className="relative inline-block" style={{ color: TEAL }}>
                  anywhere
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
                Download Uthutho and reach us from inside the app — plus live
                transport updates wherever you ride.
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

export default ContactPage;