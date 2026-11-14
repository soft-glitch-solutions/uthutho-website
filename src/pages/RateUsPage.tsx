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
  Star,
  Smartphone,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  ExternalLink,
  Sparkles,
  Heart,
  MessageCircle,
  ChevronDown,
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
   RATE US PAGE
   ============================================================ */

const RateUsPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const socialLinks = [
    {
      label: 'Facebook',
      handle: '@uthuthorsa',
      href: 'https://www.facebook.com/uthuthorsa/',
      Icon: Facebook,
      color: TEAL,
    },
    {
      label: 'Instagram',
      handle: '@uthuthorsa',
      href: 'https://www.instagram.com/uthuthorsa/',
      Icon: Instagram,
      color: PINK,
    },
    {
      label: 'LinkedIn',
      handle: 'Uthutho',
      href: 'https://www.linkedin.com/company/uthutho/',
      Icon: Linkedin,
      color: ORANGE,
    },
    {
      label: 'YouTube',
      handle: '@Uthutho',
      href: 'https://www.youtube.com/@Uthutho',
      Icon: Youtube,
      color: TEAL,
    },
  ];

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
              eyebrow="Rate Us"
              title="Your review helps us"
              accentWord="grow"
              accentColor={ORANGE}
              description="Uthutho is built by commuters, for commuters. A quick review on Google Play or a follow on social media helps us reach more people who need real-time transport info."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#google-review"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: ORANGE }}
              >
                <Star className="size-4" fill="currentColor" />
                Review on Google Play
              </a>
              <a
                href="#social"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                Follow us
                <ChevronDown className="size-4" />
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* ===== GOOGLE PLAY REVIEW ===== */}
        <section id="google-review" className="relative bg-background">
          <div className="mx-auto w-full max-w-4xl px-4 pb-16 sm:px-6 sm:pb-20">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={scaleIn}
            >
              <MagneticCard
                strength={4}
                className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-8 sm:p-12 text-center"
              >
                {/* Google Play badge */}
                <motion.div
                  variants={stagger(0.08)}
                  initial={prefersReduced ? false : 'hidden'}
                  whileInView={prefersReduced ? undefined : 'visible'}
                  viewport={viewportOnce}
                >
                  <motion.div
                    variants={rise}
                    className="flex justify-center mb-6"
                  >
                    <div
                      className="size-20 rounded-3xl flex items-center justify-center shadow-lg"
                      style={{ backgroundColor: `${ORANGE}15` }}
                    >
                      <Smartphone
                        className="size-10"
                        style={{ color: ORANGE }}
                      />
                    </div>
                  </motion.div>

                  <motion.p
                    variants={rise}
                    className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                    style={{ color: ORANGE }}
                  >
                    Google Play Store
                  </motion.p>

                  <motion.h2
                    variants={riseLg}
                    className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground leading-tight"
                  >
                    Leave a review on Google Play
                  </motion.h2>

                  <motion.p
                    variants={rise}
                    className="mt-4 text-sm sm:text-base text-muted-foreground max-w-lg mx-auto leading-relaxed"
                  >
                    Reviews help other commuters find Uthutho. If the app has
                    made your commute easier, a quick 5-star review goes a long
                    way.
                  </motion.p>

                  {/* Star row */}
                  <motion.div
                    variants={rise}
                    className="mt-6 flex justify-center gap-1.5"
                  >
                    {[1, 2, 3, 4, 5].map((n) => (
                      <motion.div
                        key={n}
                        initial={prefersReduced ? false : { scale: 0 }}
                        whileInView={
                          prefersReduced ? undefined : { scale: 1 }
                        }
                        viewport={viewportOnce}
                        transition={{
                          ...SOFT_SPRING,
                          delay: 0.4 + n * 0.08,
                        }}
                      >
                        <Star
                          className="size-8 sm:size-10"
                          fill={ORANGE}
                          style={{ color: ORANGE }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={rise} className="mt-8">
                    <a
                      href="https://play.google.com/store/apps/details?id=com.softglitch.uthutho&hl=en_ZA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white transition-all hover:scale-105"
                      style={{ backgroundColor: ORANGE }}
                    >
                      Open Google Play
                      <ExternalLink className="size-4" />
                    </a>
                    <p className="mt-3 text-xs text-muted-foreground">
                      Opens the Play Store listing — scroll to "Ratings and
                      reviews" to leave yours.
                    </p>
                  </motion.div>
                </motion.div>
              </MagneticCard>
            </motion.div>
          </div>
        </section>

        {/* ===== SOCIAL MEDIA ===== */}
        <section id="social" className="relative bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="Follow along"
              title="Join the conversation on"
              accentWord="social"
              accentColor={TEAL}
              description="Behind-the-scenes updates, launch news, and the occasional commute meme. Find us wherever you scroll."
            />

            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={stagger(0.08)}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            >
              {socialLinks.map((social, i) => {
                const Icon = social.Icon;
                return (
                  <motion.div
                    key={social.label}
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
                    <MagneticCard className="h-full">
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block h-full rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 transition-colors hover:border-border"
                      >
                        <div
                          className="size-12 rounded-full flex items-center justify-center mb-4"
                          style={{ backgroundColor: `${social.color}15` }}
                        >
                          <Icon
                            className="size-6"
                            style={{ color: social.color }}
                          />
                        </div>
                        <p className="font-display text-lg font-extrabold text-foreground">
                          {social.label}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {social.handle}
                        </p>
                        <div
                          className="mt-4 inline-flex items-center gap-1 text-xs font-semibold"
                          style={{ color: social.color }}
                        >
                          Follow
                          <ArrowRight className="size-3" />
                        </div>
                      </a>
                    </MagneticCard>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* TikTok — custom because lucide doesn't have it */}
            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 20 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.3 }}
              className="mt-4 max-w-sm mx-auto"
            >
              <MagneticCard>
                <a
                  href="https://www.tiktok.com/@uthuthorsa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-5 transition-colors hover:border-border"
                >
                  <div
                    className="size-12 rounded-full flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${PINK}15` }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-6"
                      style={{ color: PINK }}
                      aria-hidden
                    >
                      <path d="M21 8.5c-1.9 0-3.7-.6-5.1-1.8v8.3c0 4.2-3.4 7.5-7.6 7.5S.8 19.2.8 15s3.4-7.5 7.6-7.5c.4 0 .9 0 1.3.1v3.9c-.4-.1-.8-.2-1.3-.2-2 0-3.6 1.6-3.6 3.6s1.6 3.6 3.6 3.6 3.6-1.6 3.6-3.6V.5h4c.3 1.9 2.2 4 5.1 4v4z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-display text-lg font-extrabold text-foreground">
                      TikTok
                    </p>
                    <p className="text-sm text-muted-foreground">
                      @uthuthorsa
                    </p>
                  </div>
                  <ArrowRight
                    className="size-4 shrink-0"
                    style={{ color: PINK }}
                  />
                </a>
              </MagneticCard>
            </motion.div>
          </div>
        </section>

        {/* ===== WHY IT MATTERS ===== */}
        <section className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="Why it helps"
              title="Small actions, big"
              accentWord="impact"
              accentColor={PINK}
              description="Every review and every follow helps Uthutho reach the next commuter who needs it."
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
                  icon: Star,
                  title: 'Reviews drive visibility',
                  desc: 'Google Play ranks apps partly by reviews. Yours helps new commuters find Uthutho.',
                  color: ORANGE,
                },
                {
                  icon: Heart,
                  title: 'Social builds community',
                  desc: 'Following us means you see updates, polls, and behind-the-scenes first.',
                  color: PINK,
                },
                {
                  icon: MessageCircle,
                  title: 'Feedback shapes the app',
                  desc: 'Comments and DMs go straight to the team. We read every one.',
                  color: TEAL,
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
                Thank you
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Every star, every follow, every{' '}
                <span
                  className="relative inline-block"
                  style={{ color: ORANGE }}
                >
                  share
                  <motion.span
                    aria-hidden
                    initial={prefersReduced ? false : { scaleX: 0 }}
                    whileInView={prefersReduced ? undefined : { scaleX: 1 }}
                    viewport={viewportOnce}
                    transition={{ ...SPRING, delay: 0.35 }}
                    className="absolute -bottom-1 left-0 right-0 h-[8px] rounded-full origin-left"
                    style={{ backgroundColor: ORANGE }}
                  />
                </span>{' '}
                helps.
              </motion.h2>
              <motion.p
                variants={rise}
                className="mt-6 text-sm sm:text-base text-white/70 max-w-xl mx-auto"
              >
                Uthutho exists because commuters told us it should. Keep telling
                us — and keep sharing.
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
                  style={{ backgroundColor: ORANGE }}
                >
                  <Star className="size-4" fill="currentColor" />
                  Rate on Google Play
                </a>
                <a
                  href="#social"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
                >
                  Follow us
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

export default RateUsPage;