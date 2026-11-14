import React from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight, ShieldCheck, TrendingUp, Users } from 'lucide-react';
import ScrollScene from './ScrollScene';
import SceneHeader from './SceneHeader';

const PartnersSection: React.FC = () => {
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

  const partnerCards = [
    {
      icon: <TrendingUp className="h-8 w-8 text-brand-green" />,
      title: "Commuter Intelligence",
      description: "Gain insights into how your employees and customers travel to inform better business and operational decisions.",
    },
    {
      icon: <Users className="h-8 w-8 text-brand-green" />,
      title: "Community Engagement",
      description: "Connect with a growing community of commuters and transport stakeholders to build brand trust and social impact.",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-brand-green" />,
      title: "Safety & ESG Solutions",
      description: "Align your organisation with tangible safety and sustainability outcomes by supporting data-driven transport initiatives.",
    },
     {
      icon: <Building2 className="h-8 w-8 text-brand-green" />,
      title: "Platform for Growth",
      description: "Leverage a purpose-built platform to build new services, research, and data models for the future of African mobility.",
    },
  ];

  return (
    <ScrollScene
      id="partners"
      bg="bg-secondary/60"
      trackHeight="h-auto min-h-screen lg:h-[130vh]"
      ghostText="PARTNERS"
    >
      <div className="mx-auto w-full max-w-6xl lg:max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="ORGANISATIONAL PARTNERS"
          title="Data for a Better"
          accentWord="Tomorrow"
          accentColor="text-brand-green"
          description="Uthutho partners with employers, transport operators, and public sector organisations to build a safer, more efficient, and data-driven transport ecosystem."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {partnerCards.map((card, i) => (
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

        <motion.div 
            className="mt-12 text-center"
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <a 
            href="/contact-us"
            className="group inline-flex items-center rounded-full bg-brand-green px-6 py-3 text-lg font-semibold text-background transition-colors hover:bg-brand-green/80"
          >
            Partner With Us
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>

      </div>
    </ScrollScene>
  );
};

export default PartnersSection;
