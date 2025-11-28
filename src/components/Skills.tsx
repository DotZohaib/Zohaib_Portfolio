"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { SiPython, SiReact, SiNextdotjs, SiNodedotjs, SiMongodb, SiPostgresql, SiTensorflow, SiPytorch, SiTypescript, SiTailwindcss, SiDocker, SiGit } from 'react-icons/si';

const skillCategories = [
  {
    title: 'AI & Machine Learning',
    color: 'from-chart-1/20 to-chart-2/20',
    skills: [
      { name: 'Python', icon: SiPython, level: 95 },
      { name: 'TensorFlow', icon: SiTensorflow, level: 90 },
      { name: 'PyTorch', icon: SiPytorch, level: 88 },
      { name: 'OpenAI/LangChain', icon: null, level: 92 },
    ],
  },
  {
    title: 'Full Stack Development',
    color: 'from-chart-2/20 to-chart-3/20',
    skills: [
      { name: 'React', icon: SiReact, level: 95 },
      { name: 'Next.js', icon: SiNextdotjs, level: 90 },
      { name: 'Node.js', icon: SiNodedotjs, level: 92 },
      { name: 'TypeScript', icon: SiTypescript, level: 90 },
    ],
  },
  {
    title: 'Database & Backend',
    color: 'from-chart-3/20 to-chart-4/20',
    skills: [
      { name: 'MongoDB', icon: SiMongodb, level: 90 },
      { name: 'PostgreSQL', icon: SiPostgresql, level: 88 },
      { name: 'Express.js', icon: null, level: 92 },
      { name: 'REST APIs', icon: null, level: 93 },
    ],
  },
  {
    title: 'Tools & Technologies',
    color: 'from-chart-4/20 to-chart-1/20',
    skills: [
      { name: 'Git/GitHub', icon: SiGit, level: 95 },
      { name: 'Docker', icon: SiDocker, level: 85 },
      { name: 'Tailwind CSS', icon: SiTailwindcss, level: 95 },
      { name: 'Power BI', icon: null, level: 87 },
    ],
  },
];

export function Skills() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="skills" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-card/20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Skills & <span className="gradient-text-primary">Expertise</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive tech stack built over years of learning and professional experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              data-testid={`skill-category-${category.title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <Card className={`p-6 h-full glass-morphism hover-elevate active-elevate-2 transition-all bg-gradient-to-br ${category.color}`}>
                <h3 className="text-xl font-bold mb-6 text-center" style={{ fontFamily: 'var(--font-display)' }}>
                  {category.title}
                </h3>
                <div className="space-y-5">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className="space-y-2"
                        data-testid={`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {Icon && <Icon className="w-5 h-5 text-primary" />}
                            <span className="text-sm font-medium">{skill.name}</span>
                          </div>
                          <span className="text-xs text-muted-foreground">{skill.level}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 + 0.3 }}
                            className="h-full bg-gradient-to-r from-primary to-chart-2 rounded-full"
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
