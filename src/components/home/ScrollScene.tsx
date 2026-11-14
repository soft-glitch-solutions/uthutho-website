import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollSceneProps {
  children: React.ReactNode;
  id: string;
  bg?: string;
  trackHeight?: string;
  ghostText?: string;
}

const ScrollScene: React.FC<ScrollSceneProps> = ({ 
  children, 
  id, 
  bg = 'bg-background',
  trackHeight = 'h-[150vh]',
  ghostText
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: trackRef, 
    offset: ['start start', 'end end'] 
  });

  const ghostY = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id={id} ref={trackRef} className={`relative ${trackHeight} ${bg}`}>
      {ghostText && (
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden pointer-events-none">
          <motion.h1 
            style={{ y: ghostY }}
            className="text-[20vw] lg:text-[15vw] font-black text-foreground/5 whitespace-nowrap uppercase"
          >
            {ghostText}
          </motion.h1>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full flex items-center">
        {children}
      </div>
    </section>
  );
};

export default ScrollScene;
