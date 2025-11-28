"use client";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      setTimeout(onComplete, 600);
    }, 3500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) {
    return (
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="fixed inset-0 bg-background z-50 pointer-events-none"
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      className="fixed inset-0 bg-background z-50 flex items-center justify-center overflow-hidden"
      data-testid="intro-screen"
    >
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-2/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold gradient-text-primary mb-4" style={{ fontFamily: 'var(--font-display)' }} data-testid="intro-greeting">
            Salam Everyone
          </h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto w-full max-w-md"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
