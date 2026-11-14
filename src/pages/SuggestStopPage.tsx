import React, { useEffect, useRef, useState } from 'react';
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
  Send,
  CheckCircle2,
  AlertCircle,
  LocateFixed,
  Bus,
  Users,
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

const DEFAULT_LAT = -33.9249;
const DEFAULT_LNG = 18.4241;
const DEFAULT_ZOOM = 13;

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
   OSM IFRAME MAP — no library, no API key
   ============================================================ */

interface OsmMapProps {
  lat: number;
  lng: number;
  zoom?: number;
}

const OsmMap: React.FC<OsmMapProps> = ({ lat, lng, zoom = DEFAULT_ZOOM }) => {
  // Build the bbox around the marker (roughly ±0.01° ~ 1km at CPT latitude)
  const delta = 0.01;
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`;

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(
    bbox
  )}&layer=mapnik&marker=${lat},${lng}`;

  return (
    <div className="relative w-full h-[400px] sm:h-[500px] rounded-[1.5rem] overflow-hidden border border-border/60 shadow-xl bg-secondary/40">
      <iframe
        title="OpenStreetMap location preview"
        src={src}
        className="absolute inset-0 w-full h-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="absolute bottom-3 left-3 z-10 bg-background/90 backdrop-blur-sm rounded-full px-3 py-1.5 text-[10px] font-semibold text-muted-foreground shadow-sm pointer-events-none">
        Preview · use the form to set your exact location
      </div>
    </div>
  );
};

/* ============================================================
   SUGGEST STOP PAGE
   ============================================================ */

const SuggestStopPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 80]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  // Form state
  const [lat, setLat] = useState<string>(String(DEFAULT_LAT));
  const [lng, setLng] = useState<string>(String(DEFAULT_LNG));
  const [stopName, setStopName] = useState('');
  const [landmark, setLandmark] = useState('');
  const [routeContext, setRouteContext] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const parsedLat = parseFloat(lat);
  const parsedLng = parseFloat(lng);
  const validCoords =
    !isNaN(parsedLat) && !isNaN(parsedLng) && parsedLat !== 0 && parsedLng !== 0;

  const handleUseMyLocation = () => {
    if (!navigator.geolocation) {
      setError('Your browser does not support geolocation.');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLat(pos.coords.latitude.toFixed(6));
        setLng(pos.coords.longitude.toFixed(6));
        setError(null);
      },
      () => {
        setError(
          'Could not get your location. Please allow location access or enter coordinates manually.'
        );
      }
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!validCoords) {
      setError('Please set a valid location (use the button or enter coordinates).');
      return;
    }
    if (!stopName.trim()) {
      setError('Please give the stop a name.');
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
          lat,
          lng,
          stopName,
          landmark,
          routeContext,
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
              eyebrow="Suggest a Stop"
              title="Help us map your"
              accentWord="neighbourhood"
              accentColor={TEAL}
              description="Tell us where you wait for transport. We'll verify it and add it to the Uthutho network so everyone on your route benefits."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ ...ONE_UI_TRANSITION, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-3"
            >
              <a
                href="#suggest-form"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                Suggest a stop
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

        {/* ===== FORM + MAP ===== */}
        <section id="suggest-form" className="relative bg-background">
          <div className="mx-auto w-full max-w-6xl px-4 pb-16 sm:px-6 sm:pb-20">
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              {/* Map column */}
              <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={scaleIn}
              >
                <div className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-3">
                  <OsmMap lat={parsedLat} lng={parsedLng} />
                  <div className="flex flex-wrap items-center gap-2 px-3 pt-4 pb-2">
                    <button
                      type="button"
                      onClick={handleUseMyLocation}
                      className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-secondary/80"
                    >
                      <LocateFixed className="size-3.5" />
                      Use my current location
                    </button>
                    {validCoords && (
                      <div
                        className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
                        style={{ backgroundColor: TEAL }}
                      >
                        <CheckCircle2 className="size-3.5" />
                        {parsedLat.toFixed(5)}, {parsedLng.toFixed(5)}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Form column */}
              <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
                variants={stagger(0.06, 0.1)}
              >
                <MagneticCard
                  strength={4}
                  className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 sm:p-8"
                >
                  {submitted ? (
                    <motion.div
                      initial={
                        prefersReduced
                          ? false
                          : { opacity: 0, scale: 0.95 }
                      }
                      animate={
                        prefersReduced
                          ? undefined
                          : { opacity: 1, scale: 1 }
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
                        Thanks for the suggestion
                      </h3>
                      <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                        We've received your stop. Our team will review it and
                        add it to the network if it fits the route.
                      </p>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setLat(String(DEFAULT_LAT));
                          setLng(String(DEFAULT_LNG));
                          setStopName('');
                          setLandmark('');
                          setRouteContext('');
                          setName('');
                          setEmail('');
                        }}
                        className="mt-5 text-sm font-semibold transition-colors hover:opacity-80"
                        style={{ color: TEAL }}
                      >
                        Suggest another stop →
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {/* Location row */}
                      <div className="grid gap-3 sm:grid-cols-2">
                        <div>
                          <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                            Latitude <span style={{ color: TEAL }}>*</span>
                          </label>
                          <input
                            type="number"
                            step="any"
                            required
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                            placeholder="-33.9249"
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
                            Longitude <span style={{ color: TEAL }}>*</span>
                          </label>
                          <input
                            type="number"
                            step="any"
                            required
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                            placeholder="18.4241"
                            className="w-full rounded-xl bg-background border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all"
                            style={
                              {
                                '--tw-ring-color': TEAL,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                          Stop name{' '}
                          <span style={{ color: TEAL }}>*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={stopName}
                          onChange={(e) => setStopName(e.target.value)}
                          placeholder="e.g. Nyanga Junction"
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
                          Nearby landmark
                        </label>
                        <input
                          type="text"
                          value={landmark}
                          onChange={(e) => setLandmark(e.target.value)}
                          placeholder="e.g. Opposite Shoprite"
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
                          Which route is this for?
                        </label>
                        <input
                          type="text"
                          value={routeContext}
                          onChange={(e) => setRouteContext(e.target.value)}
                          placeholder="e.g. Taxi to Cape Town CBD"
                          className="w-full rounded-xl bg-background border border-border/60 px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all"
                          style={
                            {
                              '--tw-ring-color': TEAL,
                            } as React.CSSProperties
                          }
                        />
                      </div>

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
                            Email{' '}
                            <span style={{ color: TEAL }}>*</span>
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
                              Submit stop
                              <Send className="size-4" />
                            </>
                          )}
                        </button>
                        <p className="mt-3 text-[11px] text-center text-muted-foreground">
                          We'll only use your email to confirm the stop.
                        </p>
                      </div>
                    </form>
                  )}
                </MagneticCard>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== WHY IT MATTERS ===== */}
        <section className="relative bg-secondary/40">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <SceneHeader
              eyebrow="Why it matters"
              title="Every stop you add makes the network"
              accentWord="stronger"
              accentColor={ORANGE}
              description="Uthutho is built by commuters, for commuters. The more stops we map, the more accurate the live tracking becomes for everyone on that route."
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
                  icon: MapPin,
                  title: 'Fills the gaps',
                  desc: 'Official maps miss the informal stops where real commuters wait. You know them better than anyone.',
                  color: TEAL,
                },
                {
                  icon: Bus,
                  title: 'Improves accuracy',
                  desc: 'More stops means better ETA calculations and a more reliable live map for every rider.',
                  color: ORANGE,
                },
                {
                  icon: Users,
                  title: 'Helps your community',
                  desc: "When you add a stop, everyone on that route benefits. It's a small action with a big ripple.",
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
                Together
              </motion.p>
              <motion.h2
                variants={riseLg}
                className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-[1.05]"
              >
                Map your street.{' '}
                <span
                  className="relative inline-block"
                  style={{ color: TEAL }}
                >
                  Help your city.
                  <motion.span
                    aria-hidden
                    initial={prefersReduced ? false : { scaleX: 0 }}
                    whileInView={
                      prefersReduced ? undefined : { scaleX: 1 }
                    }
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
                Every suggested stop makes the next commute a little more
                certain for someone else.
              </motion.p>
              <motion.div
                variants={rise}
                className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
              >
                <a
                  href="#suggest-form"
                  className="inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-base font-bold text-white hover:scale-105 transition-all"
                  style={{ backgroundColor: TEAL }}
                >
                  Suggest a stop
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

export default SuggestStopPage;