import React from 'react';
import { motion } from 'framer-motion';
import { Map, Clock, Layers, ShieldCheck } from 'lucide-react';
import ScrollScene from './ScrollScene';
import SceneHeader from './SceneHeader';

const TransportDigitalSection: React.FC = () => {
  const prefersReduced = 
    typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  const cardVariants = (i: number) => ({
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] } 
    },
  });

  const featureCards = [
    {
      icon: <Map className="h-8 w-8 text-brand-orange" />,
      title: "Route & Station Mapping",
      description: "We digitise informal transport networks, making every route, stop, and station visible and accessible to all.",
    },
    {
      icon: <Clock className="h-8 w-8 text-brand-orange" />,
      title: "Real-Time Updates",
      description: "Access live taxi queue lengths, departure times, and route congestion information powered by our community.",
    },
    {
      icon: <Layers className="h-8 w-8 text-brand-orange" />,
      title: "Multi-Modal Integration",
      description: "Plan your entire journey by combining informal transport with formal services like buses and trains.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-brand-orange" />,
      title: "Safety & Incident Reporting",
      description: "A dedicated channel for reporting safety concerns, vehicle incidents, and driver behaviour to improve services.",
    },
  ];

  return (
    <ScrollScene
      id="features"
      bg="bg-background"
      trackHeight="h-auto min-h-screen lg:h-[130vh]"
      ghostText="FEATURES"
    >
      <div className="mx-auto w-full max-w-6xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="PLATFORM FEATURES"
          title="Digitising Transport, "
          accentWord="Together"
          accentColor="text-brand-orange"
          description="Uthutho is a comprehensive suite of tools for commuters, operators, and organisations, built to create a more transparent and connected transport ecosystem."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureCards.map((card, i) => (
            <motion.div
              key={card.title}
              custom={i}
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={{ once: true, amount: 0.3 }}
              variants={cardVariants(i)}
              className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 flex flex-col h-full"
            >
                <div className="flex-shrink-0 mb-4">{card.icon}</div>
                <div className="flex-grow">
                    <h3 className="text-lg font-bold">{card.title}</h3>
                    <p className="text-muted-foreground mt-2 text-sm">{card.description}</p>
                </div>
            </motion.div>
          ))}
        </div>

      </div>
    </ScrollScene>
  );
};

export default TransportDigitalSection;
