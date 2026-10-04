"use client";

import React from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, Calendar, GraduationCap, Award, ExternalLink, Github } from 'lucide-react';
import { GoogleGeminiEffect } from '../components/ui/google-gemini-effect';

/* ---------------- Data (source: CV) ---------------- */
// Source: CV (Zohaib_Ali_Dayo_CV.pdf). Only facts stated in the CV are included.
// Dates are shown only where the CV gives them.

export type ExperienceItem = {
  id: string;
  role: string;
  org: string;
  location?: string;
  period?: string;
  type?: string;
  points: string[];
  tech: string[];
  link?: { label: string; href: string };
};

export const experiences: ExperienceItem[] = [
  {
    id: 'navttc',
    role: 'AI, AI Web Development & Data Science Teacher',
    org: 'NAVTTC',
    location: 'Pakistan',
    type: 'Teaching',
    points: [
      'Teach AI fundamentals, Python and machine learning through practical, project-based sessions.',
      'Instruct data analysis, visualization and model building with Python libraries.',
      'Deliver AI web development training, integrating AI tools into modern web applications.',
      'Mentor students through hands-on, industry-oriented projects.',
    ],
    tech: ['Python', 'Machine Learning', 'Data Analysis', 'AI Web Development'],
  },
  {
    id: 'codewithzohaib',
    role: 'Founder & Lead Developer',
    org: 'CodeWithZohaib',
    type: 'Founder',
    points: [
      'Built a free programming-education platform with 25+ tracks and 1,300+ lessons across Python, JavaScript, React, Angular, Node.js, SQL and MongoDB.',
      'Designed a 10-point lesson format: English explanations, Roman Urdu analogies, code walkthroughs and practice tasks.',
      'Authored bilingual courses in Pandas, Matplotlib & Seaborn, and IT fundamentals.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    link: { label: 'Visit platform', href: 'https://codewithzuhaib.vercel.app' },
  },
  {
    id: 'informia',
    role: 'IT Officer',
    org: 'Informia Tech',
    location: 'Karachi',
    period: 'Apr 2025 – Oct 2025',
    points: [
      'Resolved hardware, software and network issues through scheduled maintenance.',
      'Configured LAN, subnetting and network security for active users.',
    ],
    tech: ['LAN', 'Subnetting', 'Network security'],
  },
  {
    id: 'xpace',
    role: 'Software Developer Intern (MERN Stack)',
    org: 'XPACE Technologies',
    location: 'Karachi',
    period: 'May 2024 – Sep 2024',
    type: 'Internship',
    points: [
      'Built responsive React and Tailwind CSS frontends and features through to MongoDB integration.',
      'Developed REST APIs with Node.js and Express.',
      'Worked with IT and development teams in three-week agile sprints.',
    ],
    tech: ['React', 'Tailwind CSS', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'freelance',
    role: 'Freelance Data Scientist',
    org: 'Self-employed',
    location: 'Remote',
    period: '2021 – Present',
    type: 'Freelance',
    points: [
      'Cleaned datasets, built predictive models and produced visualizations for project-based clients.',
      'Turned analytical findings into clear recommendations for decisions.',
    ],
    tech: ['Data cleaning', 'Predictive modeling', 'Visualization'],
  },
];

export const certifications = [
  { name: 'Certified Cloud Applied Generative AI Engineer', issuer: 'Governor Sindh Initiative', year: '2024' },
  { name: 'Data Science Certification', issuer: 'Oracle', year: '2023' },
  { name: 'Data Analytics', issuer: 'Berlin School of Business & Innovation', year: '2023' },
  { name: 'Google Data Analytics', issuer: 'Google (online course)', year: '2025' },
];

export const education = {
  degree: 'BS Information Technology',
  school: 'Sindh Madressatul Islam University, Karachi',
  period: '2022 – 2026',
  focus: 'AI & Machine Learning',
};

export const GITHUB_PROFILE = 'https://github.com/DotZohaib';

/* ---------------- Component ---------------- */
const cardTints = [
  'from-chart-1/10 to-chart-2/10',
  'from-chart-2/10 to-chart-3/10',
  'from-chart-3/10 to-chart-4/10',
  'from-chart-4/10 to-chart-1/10',
];

export function Experience() {
  const reduce = useReducedMotion();

  // Existing Gemini background effect (unchanged)
  const scrollRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: scrollRef, offset: ['end start', 'start end'] });
  const pathLengthFirst = useTransform(scrollYProgress, [0.2, 0.8], [0.2, 1.2]);
  const pathLengthSecond = useTransform(scrollYProgress, [0.2, 0.8], [0.15, 1.2]);
  const pathLengthThird = useTransform(scrollYProgress, [0.2, 0.8], [0.1, 1.2]);
  const pathLengthFourth = useTransform(scrollYProgress, [0.2, 0.8], [0.05, 1.2]);
  const pathLengthFifth = useTransform(scrollYProgress, [0.2, 0.8], [0, 1.2]);

  // Timeline line fills as the list scrolls through the viewport
  const timelineRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: tl } = useScroll({ target: timelineRef, offset: ['start 70%', 'end 60%'] });
  const fill = useTransform(tl, [0, 1], [0, 1]);

  const reveal = (i: number, x = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, x },
          whileInView: { opacity: 1, y: 0, x: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.55, delay: Math.min(i, 3) * 0.08, ease: 'easeOut' as const },
        };

  return (
    <section id="experience" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden" ref={scrollRef}>
      <div className="absolute inset-0 z-0">
        <GoogleGeminiEffect
          pathLengths={[pathLengthFirst, pathLengthSecond, pathLengthThird, pathLengthFourth, pathLengthFifth]}
          className="h-full w-full"
        />
      </div>
      <div className="absolute inset-0 opacity-10 z-10 pointer-events-none">
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-chart-3/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div {...reveal(0)} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Professional <span className="gradient-text-primary">Experience</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Teaching, building and shipping across AI, data science and full-stack development.
          </p>
        </motion.div>

        <div ref={timelineRef} className="relative">
          {/* Timeline rail + scroll-driven fill */}
          <div className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduce ? 1 : fill, transformOrigin: 'top' }}
            className="absolute left-3 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-chart-2 to-chart-3"
          />

          <ol className="space-y-10 md:space-y-14">
            {experiences.map((exp, index) => {
              const right = index % 2 === 0;
              return (
                <motion.li
                  key={exp.id}
                  {...reveal(index, right ? 24 : -24)}
                  className={`relative pl-9 md:pl-0 md:w-1/2 ${right ? 'md:ml-auto md:pl-10' : 'md:pr-10'}`}
                  data-testid={`experience-${index}`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute top-7 left-1 md:left-auto w-4 h-4 rounded-full bg-primary border-4 border-background ${
                      right ? 'md:-left-2' : 'md:-right-2'
                    }`}
                  />
                  <Card
                    className={`p-6 md:p-8 glass-morphism hover-elevate active-elevate-2 bg-gradient-to-br ${cardTints[index % cardTints.length]}`}
                    data-testid={`card-experience-${index}`}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-xl md:text-2xl font-bold mb-2 break-words" style={{ fontFamily: 'var(--font-display)' }}>
                          {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground">{exp.org}</span>
                          {exp.location && (<><span aria-hidden="true">•</span><span>{exp.location}</span></>)}
                          {exp.type && (
                            <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">{exp.type}</span>
                          )}
                        </div>
                        {exp.period && (
                          <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            <span>{exp.period}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ul className="space-y-3 mb-5">
                      {exp.points.map((p) => (
                        <li key={p} className="flex items-start gap-3 text-sm md:text-base">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.tech.map((t) => (
                        <span key={t} className="px-3 py-1 rounded-md bg-primary/10 text-xs font-medium border border-primary/20">
                          {t}
                        </span>
                      ))}
                    </div>

                    {exp.link && (
                      <Button asChild variant="outline" size="sm" className="mt-5 hover-elevate active-elevate-2">
                        <a href={exp.link.href} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {exp.link.label}
                        </a>
                      </Button>
                    )}
                  </Card>
                </motion.li>
              );
            })}
          </ol>
        </div>

        <motion.div {...reveal(0)} className="mt-12 flex justify-center">
          <Button asChild variant="outline" className="hover-elevate active-elevate-2">
            <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" />
              GitHub profile
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
