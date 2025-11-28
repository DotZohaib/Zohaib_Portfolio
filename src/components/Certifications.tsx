/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { 
  Award, 
  Trophy, 
  Cloud, 
  Database, 
  Code, 
  BarChart3,
  Sparkles,
  Calendar,
  Building
} from 'lucide-react';

const certifications = [
  {
    title: 'Certified Cloud Applied Generative AI Engineer',
    organization: 'Governor House Sindh',
    year: '2024',
    color: 'from-blue-500/10 to-purple-600/10',
    borderColor: 'hover:border-blue-400/30',
    icon: Cloud,
    iconColor: 'text-blue-500',
    gradient: 'from-blue-500 to-purple-600',
    tags: ['AI', 'Cloud', 'GenAI']
  },
  {
    title: 'Data Science Certification',
    organization: 'Oracle',
    year: '2023',
    color: 'from-green-500/10 to-emerald-600/10',
    borderColor: 'hover:border-green-400/30',
    icon: Database,
    iconColor: 'text-green-500',
    gradient: 'from-green-500 to-emerald-600',
    tags: ['Data', 'ML', 'Analysis']
  },
  {
    title: 'Full Stack Web Development',
    organization: 'Chai Aur Code & CodeWithHarry',
    year: '2022',
    color: 'from-orange-500/10 to-red-600/10',
    borderColor: 'hover:border-orange-400/30',
    icon: Code,
    iconColor: 'text-orange-500',
    gradient: 'from-orange-500 to-red-600',
    tags: ['Web', 'Full Stack', 'Development']
  },
  {
    title: 'Data Analytics Certification',
    organization: 'Berlin SBI',
    year: '2023',
    color: 'from-purple-500/10 to-pink-600/10',
    borderColor: 'hover:border-purple-400/30',
    icon: BarChart3,
    iconColor: 'text-purple-500',
    gradient: 'from-purple-500 to-pink-600',
    tags: ['Analytics', 'BI', 'Data']
  },
];

// Add : Variants to all your variant objects

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

const iconVariants: Variants = {
  initial: { scale: 1, rotate: 0 },
  hover: { 
    scale: 1.1, 
    rotate: 360,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 10
    }
  }
};

const floatingVariants: Variants = {
  floating: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export function Certifications() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="certifications" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 opacity-5">
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      <div ref={ref} className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="text-center mb-16"
        >
          <motion.div
            variants={floatingVariants}
            animate="floating"
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Achievements
            </span>
            <Sparkles className="w-6 h-6 text-primary" />
          </motion.div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Certifications & <span className="gradient-text-primary">Awards</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            Professional certifications and awards that validate my expertise and dedication
          </p>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-purple-600 mx-auto rounded-full" />
        </motion.div>

        {/* Certifications Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {certifications.map((cert, index) => {
            const IconComponent = cert.icon;
            
            return (
              <motion.div
                key={`cert-${index}`}
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { type: "spring", stiffness: 300 }
                }}
                data-testid={`certification-${index}`}
              >
                <Card 
                  className={`
                    p-6 h-full text-left relative overflow-hidden 
                    border-2 border-transparent transition-all duration-300
                    bg-gradient-to-br ${cert.color} backdrop-blur-sm
                    hover:shadow-2xl hover:shadow-${cert.iconColor}/20
                    ${cert.borderColor}
                    group cursor-pointer
                  `}
                  data-testid={`card-certification-${index}`}
                >
                  {/* Animated Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  {/* Icon Container */}
                  <motion.div
                    className="relative z-10 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/80 shadow-lg mb-6 group-hover:shadow-xl backdrop-blur-sm"
                    variants={iconVariants}
                    initial="initial"
                    whileHover="hover"
                  >
                    <IconComponent className={`w-8 h-8 ${cert.iconColor}`} />
                  </motion.div>

                  {/* Content */}
                  <div className="relative z-10 space-y-4">
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1">
                      {cert.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className={`px-2 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${cert.gradient} text-white backdrop-blur-sm`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-lg font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-800 group-hover:to-gray-600 transition-all duration-300"
                      style={{ fontFamily: 'var(--font-display)' }}
                      data-testid={`text-cert-title-${index}`}
                    >
                      {cert.title}
                    </h3>

                    {/* Organization & Year */}
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Building className="w-4 h-4" />
                        <span className="font-medium" data-testid={`text-cert-org-${index}`}>
                          {cert.organization}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-gray-700 text-xs font-medium border`}>
                          <Calendar className="w-3 h-3" />
                          <span data-testid={`text-cert-year-${index}`}>{cert.year}</span>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg"
                        >
                          <Award className="w-4 h-4 text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${cert.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}>
                    <div className="absolute inset-[2px] rounded-xl bg-white dark:bg-gray-900" />
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground">
            Continuously learning and expanding my skill set 🚀
          </p>
        </motion.div>
      </div>
    </section>
  );
}