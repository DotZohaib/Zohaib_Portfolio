/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { motion, animate, Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Users,
  TrendingUp,
  Award,
  Zap,
  Sparkles,
  Cpu,
  Network,
  Rocket,
  Code,
  Database,
  Brain,
  Cloud,
} from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// --- CONSTANTS (Moved outside component) ---

const stats = [
  {
    icon: Users,
    label: "Client Satisfaction",
    value: "70%",
    increase: "Increased",
    color: "text-blue-600",
    bgColor: "from-blue-100 to-blue-200",
    borderColor: "border-blue-200",
  },
  {
    icon: TrendingUp,
    label: "Model Accuracy",
    value: "35%",
    increase: "Improved",
    color: "text-emerald-600",
    bgColor: "from-emerald-100 to-emerald-200",
    borderColor: "border-emerald-200",
  },
  {
    icon: Award,
    label: "User Experience",
    value: "80%",
    increase: "Enhanced",
    color: "text-purple-600",
    bgColor: "from-purple-100 to-purple-200",
    borderColor: "border-purple-200",
  },
  {
    icon: Zap,
    label: "Project Delivery",
    value: "100%",
    increase: "On-time",
    color: "text-amber-600",
    bgColor: "from-amber-100 to-amber-200",
    borderColor: "border-amber-200",
  },
];

// [FIX] Define the missing roles for the typing effect
const roles = [
  "Software Engineer",
  "Full-Stack Developer",
  "Data Scientist",
  "AI Enthusiast",
];

// [FIX] Define all missing animation variants
const animationVariants: Record<string, any> = { // <--- Use a loose type to allow state maps like 'hidden'/'visible'
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  },
};

// --- [IMPROVEMENT] Particle Class (Moved outside component) ---
// This allows for proper typing of refs and avoids re-declaration
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseOpacity: number;
  opacity: number;
  pulsePhase: number;
  canvasWidth: number;
  canvasHeight: number;
  ctx: CanvasRenderingContext2D;

  constructor(
    canvasWidth: number,
    canvasHeight: number,
    ctx: CanvasRenderingContext2D
  ) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.ctx = ctx;

    // Initialize all properties
    this.x = 0;
    this.y = 0;
    this.vx = 0;
    this.vy = 0;
    this.radius = 0;
    this.baseOpacity = 0;
    this.opacity = 0;
    this.pulsePhase = 0;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.canvasWidth;
    this.y = Math.random() * this.canvasHeight;
    this.vx = (Math.random() - 0.5) * 1.5;
    this.vy = (Math.random() - 0.5) * 1.5;
    this.radius = Math.random() * 2.5 + 0.5;
    this.baseOpacity = Math.random() * 0.6 + 0.2;
    this.opacity = this.baseOpacity;
    this.pulsePhase = Math.random() * Math.PI * 2;
  }

  update(mouseX: number, mouseY: number) {
    this.x += this.vx;
    this.y += this.vy;
    this.pulsePhase += 0.05;

    // Mouse repulsion
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 150) {
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * 0.3;
      this.vy += Math.sin(angle) * 0.3;
    }

    // Boundary wrap
    if (this.x < 0) this.x = this.canvasWidth;
    if (this.x > this.canvasWidth) this.x = 0;
    if (this.y < 0) this.y = this.canvasHeight;
    if (this.y > this.canvasHeight) this.y = 0;

    // Damping
    this.vx *= 0.98;
    this.vy *= 0.98;

    // Pulsing opacity
    this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.3;
  }

  draw() {
    const gradient = this.ctx.createRadialGradient(
      this.x,
      this.y,
      0,
      this.x,
      this.y,
      this.radius * 3
    );
    gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity})`);
    gradient.addColorStop(1, `rgba(6, 182, 212, ${this.opacity * 0.2})`);

    this.ctx.fillStyle = gradient;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Glow effect
    this.ctx.strokeStyle = `rgba(6, 182, 212, ${this.opacity * 0.5})`;
    this.ctx.lineWidth = 0.5;
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
    this.ctx.stroke();
  }
}

// --- [FIX] Missing Component: AnimatedStatValue ---
interface AnimatedStatValueProps {
  value: string;
}

const AnimatedStatValue: React.FC<AnimatedStatValueProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const nodeRef = useRef<HTMLSpanElement>(null);

  const numericValue = parseFloat(value.replace("%", ""));
  const suffix = value.includes("%") ? "%" : "";

  useEffect(() => {
    if (inView && nodeRef.current) {
      const controls = animate(0, numericValue, {
        duration: 2,
        ease: "easeOut",
        onUpdate(latest) {
          setDisplayValue(parseFloat(latest.toFixed(0)));
        },
      });
      return () => controls.stop();
    }
  }, [inView, numericValue]);

  return (
    <span ref={ref}>
      <span ref={nodeRef}>{displayValue}</span>
      {suffix}
    </span>
  );
};

// --- [FIX] Missing Component: AnimatedCard ---
interface AnimatedCardProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1, // Animate when 10% of the card is visible
  });

  return (
    <motion.div
      ref={ref}
      variants={animationVariants.scaleIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{ duration: 0.5, delay: delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- Main Component ---
export function About() {
  const [currentRole, setCurrentRole] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); // Used for GSAP context
  const imageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // [IMPROVEMENT] Correctly typed ref now that Particle class is external
  const particlesRef = useRef<Particle[]>([]);
  const animationIdRef = useRef<number | null>(null);

  // [FIX] Define refs and inView state for section titles
  const { ref: titleRef, inView: titleInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const { ref: statsTitleRef, inView: statsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // --- Canvas Animation (useEffect) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particleCount = 80;
    const mousePos = { x: canvas.width / 2, y: canvas.height / 2 };

    // Initialize particles
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new Particle(canvas.width, canvas.height, ctx));
    }

    const animateParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.update(mousePos.x, mousePos.y);
        p.draw();
      });

      // Draw connecting lines
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x;
          const dy = particlesRef.current[i].y - particlesRef.current[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
            ctx.stroke();
          }
        }
      }
      animationIdRef.current = requestAnimationFrame(animateParticles);
    };
    animateParticles();

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const handleResize = () => {
      if (canvasRef.current && ctx) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        // Re-initialize particles with new dimensions
        particlesRef.current = [];
        for (let i = 0; i < particleCount; i++) {
          particlesRef.current.push(
            new Particle(canvasRef.current.width, canvasRef.current.height, ctx)
          );
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, []); // Empty dependency array ensures this runs once

  // --- [IMPROVEMENT] GSAP Animations with Context ---
  useEffect(() => {
    // Use GSAP context for safe setup and cleanup
    const ctx = gsap.context(() => {
      // Spotlight Animation
      const handleMouseMoveSpotlight = (e: MouseEvent) => {
        gsap.to(spotlightRef.current, {
          x: e.clientX,
          y: e.clientY,
          xPercent: -50,
          yPercent: -50,
          duration: 0.8,
          ease: "power3.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMoveSpotlight);

      // Image Parallax Animation
      if (imageRef.current) {
        // 1. Initial entrance animation
        gsap
          .timeline()
          .fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.6, y: 80, filter: "blur(20px)" },
            {
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 1.2,
              ease: "power3.out",
            }
          );

        // 2. Parallax mouse-tracking animation
        const handleMouseMoveParallax = (e: MouseEvent) => {
          if (!imageRef.current) return;
          const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
          const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
          gsap.to(imageRef.current, {
            x: xPos,
            y: yPos,
            rotateX: -yPos / 2,
            rotateY: xPos / 2,
            duration: 1,
            ease: "power2.out",
          });
        };
        window.addEventListener("mousemove", handleMouseMoveParallax);

        // Return cleanup function for *this context*
        return () => {
          window.removeEventListener("mousemove", handleMouseMoveSpotlight);
          window.removeEventListener("mousemove", handleMouseMoveParallax);
          gsap.killTweensOf(spotlightRef.current); // Kill animations on cleanup
          gsap.killTweensOf(imageRef.current);
        };
      }
    }, containerRef); // Scope context to the main container

    return () => ctx.revert(); // Cleanup all animations created in this context
  }, []); // Empty dependency array

  // --- Premium Typing Effect (useEffect) ---
  useEffect(() => {
    const currentFullText = roles[currentRole];
    const typingSpeed = isDeleting ? 30 : 80;

    let timer: NodeJS.Timeout;

    if (!isDeleting && charIndex < currentFullText.length) {
      timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
    } else if (!isDeleting && charIndex === currentFullText.length) {
      timer = setTimeout(() => setIsDeleting(true), 2500);
    } else if (isDeleting && charIndex > 0) {
      timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentRole]);

  return (
    // [FIX] Changed <section> to <div> to match opening tag
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 p-4 md:p-8" // Added padding
    >
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08), transparent 50%)",
        }}
      />

      {/* GSAP Mouse-following Spotlight */}
      <div
        ref={spotlightRef}
        className="absolute top-0 left-0 w-80 h-80 lg:w-96 lg:h-96 rounded-full opacity-20 blur-3xl z-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.7), transparent 70%)",
        }}
      />

      {/* [FIX] Added missing closing </div> for this container */}
      <div className="max-w-6xl mx-auto relative z-10">
        {" "}
        {/* Ensure content is above canvas */}
        {/* Title Section */}
        <motion.div
          ref={titleRef} // [FIX] Apply the ref
          variants={animationVariants.fadeInUp} // [FIX] Use defined variants
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"} // [FIX] Use inView state
          className="text-center mb-16 pt-16" // Added padding-top
        >
          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            About <span className="gradient-text-primary">Me</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
        </motion.div>
        {/* Summary & Expertise Grid */}
        <div
          // [FIX] Removed summaryRef, as AnimatedCard components handle their own animation
          className="grid lg:grid-cols-2 gap-8 items-start mb-20"
        >
          {/* Left Card */}
          {/* [FIX] Use the new AnimatedCard component */}
          <AnimatedCard delay={0.1}>
            <motion.div
              whileHover={{ y: -4 }}
              className="relative group h-full" // Added h-full
            >
              <Card className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Cpu className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800">
                    Professional Summary
                  </h3>
                </div>
                <div className="space-y-4 text-slate-600 leading-relaxed">
                  <h3>
                    <b className="text-slate-800">Assalam O Alaikum</b>
                  </h3>
                  <p>
                    I&apos;m{" "}
                    <strong className="text-slate-800">Zohaib Ali Dayo</strong>{" "}
                    - a dedicated Information Technology specialist with
                    comprehensive expertise in transforming complex challenges
                    into innovative technical solutions.
                  </p>

                  <p>
                    I have a proven track record of developing intelligent AI
                    systems, building scalable web applications, and creating
                    data-driven solutions that enhance operational efficiency,
                    drive innovation, and deliver measurable business impact.
                  </p>

                  <p className="text-slate-700 font-medium">
                    I am seeking a challenging role where I can leverage my
                    technical expertise to solve complex problems and contribute
                    to organizational success through innovative technology
                    solutions.
                  </p>
                </div>
              </Card>
            </motion.div>
          </AnimatedCard>

          {/* Right Cards */}
          <div className="space-y-6">
            {/* Expertise Card */}
            <AnimatedCard delay={0.2}>
              <motion.div whileHover={{ y: -4 }} className="relative group">
                <Card className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Brain className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800">
                      Core Expertise
                    </h4>
                  </div>
                  <motion.ul
                    variants={animationVariants.staggerContainer} // [FIX] Use defined variants
                    initial="hidden"
                    animate="visible" // Animate this list once parent card is visible
                    className="space-y-2"
                  >
                    {[
                      "AI Agents & Generative AI Engineering",
                      "Full Stack Development (MERN Stack)",
                      "Machine Learning & Deep Learning",
                      "Data Science & Analytics",
                      "Python Engineering",
                      "Cloud Technologies",
                    ].map((skill) => (
                      <motion.li
                        key={skill}
                        variants={animationVariants.staggerItem} // [FIX] Use defined variants
                        className="flex items-center gap-3 group/item"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-slate-600 text-sm group-hover/item:text-slate-800 transition-colors">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </Card>
              </motion.div>
            </AnimatedCard>

            {/* Languages Card */}
            <AnimatedCard delay={0.3}>
              <motion.div whileHover={{ y: -4 }} className="relative group">
                <Card className="p-6 bg-white/70 backdrop-blur-sm border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Rocket className="w-5 h-5 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-slate-800">
                      Languages
                    </h4>
                  </div>
                  <motion.div
                    variants={animationVariants.staggerContainer} // [FIX] Use defined variants
                    initial="hidden"
                    animate="visible"
                    className="flex flex-wrap gap-2"
                  >
                    {[
                      "Sindhi - Proficient",
                      "English - Proficient",
                      "Urdu - Proficient",
                    ].map((lang) => (
                      <motion.span
                        key={lang}
                        variants={animationVariants.staggerItem} // [FIX] Use defined variants
                        whileHover={{ scale: 1.02 }}
                        className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium border border-slate-200 hover:bg-slate-200 transition-all duration-200"
                      >
                        {lang}
                      </motion.span>
                    ))}
                  </motion.div>
                </Card>
              </motion.div>
            </AnimatedCard>
          </div>
        </div>
        {/* Key Achievements Section */}
        <div className="pb-20">
          {" "}
          {/* Added padding-bottom */}
          <motion.h3
            ref={statsTitleRef} // [FIX] Use the correct ref
            variants={animationVariants.fadeInUp} // [FIX] Use defined variants
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"} // [FIX] Use correct inView state
            className="text-2xl md:text-3xl font-bold text-center mb-12 text-slate-800"
          >
            <span
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Key <span className="gradient-text-primary">Achievements</span>
            </span>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-chart-2 mx-auto rounded-full" />
          </motion.h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                // [FIX] Use AnimatedCard component for staggered animation
                <AnimatedCard key={stat.label} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="relative group h-full"
                  >
                    <Card
                      className={`p-6 text-center bg-white/70 backdrop-blur-sm border ${stat.borderColor} shadow-sm hover:shadow-md transition-all duration-300 h-full`}
                    >
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.bgColor} mb-4`}
                      >
                        <Icon className="w-6 h-6 text-slate-700" />
                      </div>

                      <div
                        className={`text-2xl md:text-3xl font-bold mb-2 ${stat.color}`}
                      >
                        {/* [FIX] Use new AnimatedStatValue component */}
                        <AnimatedStatValue value={stat.value} />
                      </div>

                      <div className="text-xs text-slate-500 mb-1 uppercase tracking-wider">
                        {stat.increase}
                      </div>

                      <div className="text-sm font-medium text-slate-700">
                        {stat.label}
                      </div>
                    </Card>
                  </motion.div>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
