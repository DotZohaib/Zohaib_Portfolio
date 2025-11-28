"use client";
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2 } from 'lucide-react';

const projects = [
  {
    title: 'CodeWithZohaib Academy',
    description: 'Educational platform providing comprehensive programming tutorials and courses. Built with modern web technologies to deliver exceptional learning experience.',
    tech: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/DotZohaib/CodeWithZohaib-Academy-',
    demo: 'https://codewithzuhaib.vercel.app',
    color: 'from-chart-3/10 to-chart-4/10',
  },
  {
    title: 'Data Science',
    description: 'Comprehensive Data Science course repository featuring hands-on projects, tutorials, and resources. Covers data analysis, visualization, and machine learning techniques.',
    tech: [ 'Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'TensorFlow', 'Scikit-learn', 'PyTorch'],
    github: 'https://github.com/DotZohaib/Data-Science-Course',
    color: 'from-chart-1/10 to-chart-3/10',
  },
  {
    title: 'Advanced Face Detection System',
    description: 'FYP project implementing cutting-edge face detection using deep learning and computer vision. Features real-time detection, facial recognition, and advanced ML algorithms.',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    github: 'https://github.com/DotZohaib/FYP-Upgrade-Advance-Face-Detection',
    color: 'from-chart-1/10 to-chart-2/10',
  },
  {
    title: 'ML/DL University Projects',
    description: 'Comprehensive collection of Machine Learning and Deep Learning projects covering classification, regression, neural networks, and advanced AI techniques.',
    tech: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'NumPy'],
    github: 'https://github.com/DotZohaib/Python-project-using-ML-DL-and-other-for-university-project',
    color: 'from-chart-2/10 to-chart-3/10',
  },
  {
    title: 'Machine Learning Full Course',
    description: 'Complete machine learning curriculum with hands-on projects, covering fundamentals to advanced topics. Includes practical implementations and real-world applications.',
    tech: ['Python', 'Jupyter', 'ML Algorithms', 'Data Science'],
    github: 'https://github.com/DotZohaib/Machine-Learning-Full-Course',
    color: 'from-chart-4/10 to-chart-1/10',
  },
  {
    title: 'DotScents - Own Brand Fragrances',
    description: 'E-commerce platform for custom fragrances. Features product catalog, shopping cart, secure checkout, and user accounts. Built with modern web technologies for optimal performance.',
    tech: ['Next.js', 'Typescript', 'Tailwind CSS', 'WhatsApp', "Speed"],
    github: 'https://github.com/DotZohaib/DotScent-LOcalStorage-Work-advance',
    demo: 'https://dotscents.vercel.app',
    color: 'from-chart-2/10 to-chart-4/10',
  },
];

export function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-card/20">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chart-4/30 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Featured <span className="gradient-text-primary">Projects</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Showcasing innovative solutions across AI, web development, and data science
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              data-testid={`project-${index}`}
            >
              <Card className={`p-6 h-full flex flex-col glass-morphism hover-elevate active-elevate-2 bg-gradient-to-br ${project.color} transition-all group`} data-testid={`card-project-${index}`}>
                <div className="mb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }} data-testid={`text-project-title-${index}`}>
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4" data-testid={`text-project-description-${index}`}>
                    {project.description}
                  </p>
                </div>

                <div className="flex-1 mb-4">
                  <div className="flex flex-wrap gap-2" data-testid={`list-project-tech-${index}`}>
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-md bg-primary/10 text-xs font-medium border border-primary/20"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-card-border">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid={`project-github-${index}`}
                    >
                      <Button variant="outline" className="w-full hover-elevate active-elevate-2">
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </Button>
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1"
                      data-testid={`project-demo-${index}`}
                    >
                      <Button className="w-full hover-elevate active-elevate-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Demo
                      </Button>
                    </a>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
