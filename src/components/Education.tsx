"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { GraduationCap, MapPin } from 'lucide-react';

const education = [
  {
    degree: 'Bachelor of Science in Information Technology',
    institution: 'Sindh Madressatul Islam University',
    location: 'Karachi, Sindh',
    period: '2022 - 2026',
    color: 'from-chart-1/10 to-chart-2/10',
  },
  {
    degree: 'Intermediate (Engineering)',
    institution: 'Board of Intermediate and Secondary Education Larkana',
    location: 'Larkana, Sindh',
    period: '2020 - 2022',
    color: 'from-chart-2/10 to-chart-3/10',
  },
  {
    degree: 'Matriculation (Science)',
    institution: 'Board of Intermediate and Secondary Education Larkana',
    location: 'Larkana, Sindh',
    period: '2018 - 2020',
    color: 'from-chart-3/10 to-chart-4/10',
  },
];

export function Education() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="education" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-card/20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute bottom-1/3 left-1/3 w-96 h-96 bg-chart-2/30 rounded-full blur-3xl" />
      </div>

      <div ref={ref} className="max-w-5xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            <span className="gradient-text-primary">Education</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </motion.div>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              data-testid={`education-${index}`}
            >
              <Card className={`p-6 md:p-8 glass-morphism hover-elevate active-elevate-2 bg-gradient-to-br ${edu.color}`} data-testid={`card-education-${index}`}>
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 border border-primary/20 flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ fontFamily: 'var(--font-display)' }} data-testid={`text-edu-degree-${index}`}>
                      {edu.degree}
                    </h3>
                    <p className="text-base md:text-lg font-semibold text-foreground mb-2" data-testid={`text-edu-institution-${index}`}>
                      {edu.institution}
                    </p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2" data-testid={`text-edu-location-${index}`}>
                        <MapPin className="w-4 h-4" />
                        <span>{edu.location}</span>
                      </div>
                      <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium" data-testid={`text-edu-period-${index}`}>
                        {edu.period}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
