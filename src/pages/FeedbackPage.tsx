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
  Star,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Lightbulb,
  Bug,
  Sparkles,
  ThumbsUp,
  ChevronDown,
} from 'lucide-react';

import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';

const TEAL = '#1ea2b1';
const ORANGE = '#f18f01';
const PINK = '#e151af';

/* ============================================================
   CONFIG
   ============================================================ */

// TODO: replace with your Apps Script Web App URL after deploying.
const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL';

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
   STAR RATING
   ============================================================ */

const StarRating: React.FC<{
  value: number;
  onChange: (v: number) => void;
  hover: number;
  setHover: (v: number) => void;
}> = ({ value, onChange, hover, setHover }) => {
  return (
    <div className="flex gap-2" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => {
        const active = n <= (hover || value);
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHover(n)}
            aria-label={`${n} star${n !== 1 ? 's' : ''}`}
            className="transition-transform hover:scale-110"
          >
            <Star
              className="size-8 sm:size-9"
              strokeWidth={1.5}
              fill={active ? ORANGE : 'transparent'}
              style={{ color: active ? ORANGE : 'hsl(var(--muted-foreground))' }}
            />
          </button>
        );
      })}
    </div>
  );
};

/* ============================================================
   FEEDBACK PAGE
   ============================================================ */

type Category = 'general' | 'idea' | 'bug' | 'praise';

const CATEGORIES: {
  id: Category;
  label: string;
  icon: typeof MessageSquare;
  color: string;
}[] = [
  { id: 'general', label: 'General', icon: MessageSquare, color: TEAL },
  { id: 'idea', label: 'Idea', icon: Lightbulb, color: ORANGE },
  { id: 'bug', label: 'Bug', icon: Bug, color: PINK },
  { id: 'praise', label: 'Praise', icon: ThumbsUp, color: TEAL },
];

const FeedbackPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Form state
  const [category, setCategory] = useState<Category>('general');
  const [rating, setRating] = useState(0);
  const [hoverStar, setHoverStar] = useState(0);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!message.trim()) {
      setError('Please add a message so we know what to fix.');
      return;
    }
    if (!email.trim()) {
      setError('Please add an email so we can follow up.');
      return;
    }

    setSubmitting(true);

    try {
      if (
        !APPS_SCRIPT_URL ||
        APPS_SCRIPT_URL === 'YOUR_APPS_SCRIPT_WEB_APP_URL'
      ) {
        await new Promise((r) => setTimeout(r, 900));
      } else {
        const body = new URLSearchParams({
          category,
          rating: String(rating),
          message,
          name,
          email,
          timestamp: new Date().toISOString(),
        });

        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: body.toString(),
        });
      }

      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError(
        'Something went wrong. Please try again or email info@uthutho.co.za.'
      );
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
              eyebrow="Feedback"
              title="Help us make Uthutho"
              accentWord="better"
              accentColor={TEAL}
              description="Every piece of feedback — big or small — shapes the next version of Uthutho. Tell us what works, what doesn't, and what you wish we'd build next."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#feedback-form"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Share feedback
                <ChevronDown className="size-4" />
              </a>
              <a
                href="mailto:info@uthutho.co.za"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                Email us instead
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== FORM ===== */}
        <section id="feedback-form" className="relative bg-background">
          <div className="mx-auto w-full max-w-3xl px-4 pb-16 sm:px-6 sm:pb-20">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={scaleIn}
            >
              <MagneticCard
                strength={4}
                className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-10"
              >
                {submitted ? (
                  <motion.div
                    initial={
                      prefersReduced ? false : { opacity: 0, scale: 0.95 }
                    }
                    animate={
                      prefersReduced ? undefined : { opacity: 1, scale: 1 }
                    }
                    transition={SOFT_SPRING}
                    className="py-10 text-center"
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
                      Thanks for the feedback
                    </h3>
                    <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                      We read every single message. If you left an email, we'll
                      reply as soon as we can.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                        setName('');
                        setEmail('');
                        setRating(0);
                        setCategory('general');
                      }}
                      className="mt-5 text-sm font-semibold transition-colors hover:opacity-80"
                      style={{ color: TEAL }}
                    >
                      Send more feedback →
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Category */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                        What kind of feedback?
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {CATEGORIES.map((cat) => {
                          const Icon = cat.icon;
                          const active = category === cat.id;
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => setCategory(cat.id)}
                              className={`flex flex-col items-center gap-2 rounded-xl border px-3 py-3 text-xs font-semibold transition-all ${
                                active
                                  ? 'border-transparent text-white'
                                  : 'border-border/60 bg-background text-muted-foreground hover:bg-secondary/60'
                              }`}
                              style={
                                active
                                  ? { backgroundColor: cat.color }
                                  : undefined
                              }
                            >
                              <Icon className="size-4" />
                              {cat.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Rating */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-3">
                        How would you rate your experience?
                      </label>
                      <StarRating
                        value={rating}
                        onChange={setRating}
                        hover={hoverStar}
                        setHover={setHoverStar}
                      />
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                        Your message <span style={{ color: TEAL }}>*</span>
                      </label>
                      <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        placeholder="Tell us what's on your mind…"
                        className="w-full rounded-xl bg-background border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all resize-none"
                        style={
                          {
                            '--tw-ring-color': TEAL,
                          } as React.CSSProperties
                        }
                      />
                    </div>

                    {/* Name + Email */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Your name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Jane Doe"
                          className="w-full rounded-xl bg-background border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all"
                          style={
                            {
                              '--tw-ring-color': TEAL,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Email <span style={{ color: TEAL }}>*</span>
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="jane@example.com"
                          className="w-full rounded-xl bg-background border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all"
                          style={
                            {
                              '--tw-ring-color': TEAL,
                            } as React.CSSProperties
                          }
                        />
                      </div>
                    </div>

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

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="w-full inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-all hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
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
                            Send feedback
                            <Send className="size-4" />
                          </>
                        )}
                      </button>
                      <p className="mt-3 text-[11px] text-center text-muted-foreground">
                        We'll only use your email to follow up on this feedback.
                      </p>
                    </div>
                  </form>
                )}
              </MagneticCard>
            </motion.div>
          </div>
        </section>

        {/* ===== WHAT WE DO WITH YOUR FEEDBACK ===== */}
        <section className="relative bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="What happens next"
              title="Your feedback shapes the"
              accentWord="roadmap"
              accentColor={ORANGE}
              description="Every message gets read by a real person on our team. Here's what we do with it."
            />

            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid gap-6 md:grid-cols-3"
            >
              {[
                {
                  icon: MessageSquare,
                  title: 'We read every message',
                  desc: 'Not a bot, not a filter. A team member reads every single piece of feedback you send.',
                  color: TEAL,
                },
                {
                  icon: Sparkles,
                  title: 'We prioritise together',
                  desc: 'Recurring themes get triaged into our roadmap. Popular requests get fast-tracked.',
                  color: ORANGE,
                },
                {
                  icon: CheckCircle2,
                  title: 'We ship improvements',
                  desc: 'When your feedback makes it into a release, we ship it back to you in the app.',
                  color: PINK,
                },
              ].map((card, i) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
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
                    <MagneticCard className="h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6">
                      <div
                        className="size-12 rounded-full flex items-center justify-center mb-4"
                        style={{ backgroundColor: `${card.color}15` }}
                      >
                        <Icon
                          className="size-5"
                          style={{ color: card.color }}
                        />
                      </div>
                      <h3 className="font-display text-lg font-extrabold text-foreground">
                        {card.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                        {card.desc}
                      </p>
                    </MagneticCard>
                  </motion.div>
                );
              })}
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
                Keep in touch
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Every voice makes the network{' '}
                <span
                  className="relative inline-block"
                  style={{ color: TEAL }}
                >
                  stronger
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
                Have a bigger idea or want to partner with us? We'd love to hear
                that too.
              </motion.p>
              <motion.div
                variants={rise}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white hover:scale-105 transition-all"
                  style={{ backgroundColor: TEAL }}
                >
                  Contact the team
                  <ArrowRight className="size-4" />
                </a>
                <a
                  href="https://www.mobile.uthutho.co.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Try the web app
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

export default FeedbackPage;