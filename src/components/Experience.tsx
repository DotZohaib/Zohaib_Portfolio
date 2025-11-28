"use client";

// Imports from both components, corrected and merged
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Briefcase, Calendar } from 'lucide-react';
import React from 'react'; // Added React for useRef
import { GoogleGeminiEffect } from '../components/ui/google-gemini-effect'; // Path from your demo


const experiences = [
  {
    role: 'AI Agents | Certified Cloud Applied Generative AI Engineer',
    company: 'Governor Sindh Initiative',
    location: 'Karachi',
    period: 'Mar 2023 - Present',
    type: 'Full-time',
    achievements: [
      'Designed and developed Generative AI workflows improving accuracy by 35%',
      'Built intelligent AI agents with enhanced decision-making capabilities',
      'Implemented RAG systems and multi-agent architectures',
      'Enhanced project efficiency and accuracy through innovative AI solutions',
    ],
    color: 'from-chart-1/10 to-chart-2/10',
  },
  {
    role: 'Frontend & MERN Stack Developer',
    company: 'XPACE Technologies Pvt Ltd',
    location: 'Karachi',
    period: '2022 - 2023',
    type: 'Full-time',
    achievements: [
      'Increased client satisfaction by 70% through responsive UI/UX design',
      'Improved user experience by 80% with modern frontend solutions',
      'Delivered scalable full-stack applications using React, Node.js, and MongoDB',
      'Collaborated with cross-functional teams to deliver high-quality products',
    ],
    color: 'from-chart-2/10 to-chart-3/10',
  },
  {
    role: 'Data Scientist',
    company: 'Self-Freelancing',
    location: 'Online',
    period: '2021 - Present',
    type: 'Project-based',
    achievements: [
      'Enhanced model accuracy through advanced data cleaning techniques',
      'Performed predictive modeling and data visualization for various clients',
      'Delivered actionable insights from complex datasets',
      'Improved business decision-making through data-driven recommendations',
    ],
    color: 'from-chart-3/10 to-chart-4/10',
  },
];

export function Experience() {
  // --- Hooks for Google Gemini Effect ---
  const scrollRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    // Animate as the section scrolls through the viewport
    offset: ['end start', 'start end'],
  });

  // Tweak the input range [0.2, 0.8] to make animation play
  // as it moves through the middle of the screen
  const pathLengthFirst = useTransform(scrollYProgress, [0.2, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.2, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0.2, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.2, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.2, 0.8], [0, 1.2]);

  // --- Hooks for original Experience component (card animations) ---
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    
    <section
      id="experience"
      className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden"
      ref={scrollRef} // Ref for Google Gemini background scroll
    >
      
      {/* --- NEW: Google Gemini Effect Background --- */}
      {/* Placed in an absolute container at the very back (z-0) */}
      <div className="absolute inset-0 z-0">
        <GoogleGeminiEffect
          pathLengths={[
            pathLengthFirst,
            pathLengthSecond,
            pathLengthThird,
            pathLengthFourth,
            pathLengthFifth,
          ]}
          className="h-full w-full"
        />
      </div>

      {/* --- Original Background Elements --- */}
      {/* Added z-10 to be on top of Gemini, but behind content */}
      <div className="absolute inset-0 opacity-10 z-10">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-3/30 rounded-full blur-3xl" />
      </div>

      {/* --- Original Content --- */}
      {/* Added z-20 to be on top of all backgrounds */}
      <div ref={ref} className="max-w-7xl mx-auto relative z-20">
        {/* 'ref' from useInView is attached here for card animations */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Professional <span className="gradient-text-primary">Experience</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </motion.div>

        <div className="relative">
          {/* Vertical timeline bar */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-chart-2 to-chart-3 hidden md:block" />

          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative ${index % 2 === 0 ? 'md:pr-12 md:ml-auto md:pl-12 lg:pl-0' : 'md:pl-12 md:mr-auto md:pr-12 lg:pr-0'} md:w-[calc(50%+2rem)]`}
                data-testid={`experience-${index}`}
              >
                {/* Timeline dot */}
                <div
                  className="absolute left-0 md:left-auto top-6 w-4 h-4 bg-primary rounded-full border-4 border-background hidden md:block"
                  style={{ [index % 2 === 0 ? 'right' : 'left']: '-0.5rem' }}
                />

                <Card className={`p-6 md:p-8 glass-morphism hover-elevate active-elevate-2 bg-gradient-to-br ${exp.color}`} data-testid={`card-experience-${index}`}>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }} data-testid={`text-exp-role-${index}`}>
                        {exp.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-semibold text-foreground" data-testid={`text-exp-company-${index}`}>{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                        <span>•</span>
                        <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                          {exp.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {exp.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.2 + i * 0.1 }}
                        className="flex items-start gap-3 text-sm md:text-base"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}