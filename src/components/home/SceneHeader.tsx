import React from 'react';
import { motion } from 'framer-motion';

interface SceneHeaderProps {
  eyebrow: string;
  title: string;
  accentWord: string;
  accentColor: string;
  description: string;
}

const SceneHeader: React.FC<SceneHeaderProps> = ({ 
    eyebrow, 
    title, 
    accentWord, 
    accentColor, 
    description 
}) => {

    const prefersReduced = 
        typeof window !== 'undefined' 
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
        : false;

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
    };

    return (
        <motion.div 
            className="text-center max-w-4xl mx-auto"
            initial={prefersReduced ? false : 'hidden'}
            whileInView={prefersReduced ? undefined : 'visible'}
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <motion.p 
                variants={itemVariants}
                className={`text-sm font-bold uppercase tracking-[3px] ${accentColor}`}
            >
                {eyebrow}
            </motion.p>
            <motion.h2 
                variants={itemVariants}
                className="mt-4 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
                {title}
                <span className={accentColor}>{accentWord}</span>
            </motion.h2>
            <motion.p 
                variants={itemVariants}
                className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto"
            >
                {description}
            </motion.p>
        </motion.div>
    );
};

export default SceneHeader;
