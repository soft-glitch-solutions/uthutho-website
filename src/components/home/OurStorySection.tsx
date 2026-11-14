import React from 'react';
import { motion } from 'framer-motion';
import ScrollScene from './ScrollScene';
import SceneHeader from './SceneHeader';
import { ArrowRight } from 'lucide-react';

const OurStorySection: React.FC = () => {
  const prefersReduced = 
    typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const leftVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const rightVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <ScrollScene 
        id="about"
        bg="bg-background"
        trackHeight="h-auto min-h-screen lg:h-[130vh]"
        ghostText="OUR STORY"
    >
      <div className="mx-auto w-full max-w-6xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="OUR JOURNEY"
          title="Born from a Commuter's "
          accentWord="Frustration"
          accentColor="text-brand-red"
          description="Uthutho began as a simple idea: what if everyone had the information they needed to travel with confidence? Our founder, a daily commuter himself, experienced the uncertainty and inefficiency of informal transport firsthand."
        />
        
        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.5 }}
              variants={leftVariants}
            >
                <h3 className="text-3xl font-bold tracking-tight mb-6">From a Personal Pain Point to a Community-Driven Solution</h3>
                <p className="text-muted-foreground text-lg mb-4">
                    Tired of unpredictable wait times and a lack of clear information, he set out to build a solution. What started as a personal project quickly grew into a collaborative effort, bringing together a community of developers, designers, and commuters passionate about improving mobility for all.
                </p>
                <p className="text-muted-foreground text-lg mb-8">
                    Today, Uthutho is a testament to the power of community and technology. We are dedicated to creating a more transparent, efficient, and accessible transport network, one route at a time.
                </p>
                <a 
                    href="/about"
                    className="group inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-lg font-semibold text-background transition-colors hover:bg-primary/80"
                >
                    Learn More About Our Mission
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </a>
            </motion.div>

            <motion.div
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={{ once: true, amount: 0.5 }}
                variants={rightVariants} 
                className="relative flex justify-center items-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-brand-orange opacity-10 blur-3xl"></div>
              <img 
                src="/lovable-uploads/founder.jpg" 
                alt="Uthutho Founder" 
                className="relative rounded-3xl shadow-2xl w-full max-w-md border-4 border-white/10"
              />
            </motion.div>
        </div>
      </div>
    </ScrollScene>
  );
};

export default OurStorySection;
