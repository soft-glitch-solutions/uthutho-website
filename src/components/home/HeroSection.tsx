import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
  type Transition,
} from 'framer-motion';
import { ArrowRight } from 'lucide-react';

<<<<<<< HEAD
const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const highlights = [
  ];
  const trustSignals = [

  ];
=======
/* ============================================================
   MOTION PRIMITIVES — Google Labs style
   ============================================================ */
>>>>>>> b4726a8 (Some changes i feel like we should go with)

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

/* ============================================================
   HERO
   ============================================================ */

const HeroSection: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLElement>(null);

  // Scroll-linked parallax: phone drifts up + shrinks, text drifts down.
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
          style={prefersReduced ? undefined : { y: phoneY, scale: phoneScale }}
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

export default HeroSection;