/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

"use client";

// --- Step 1: Imports ---
// We import React hooks, Framer Motion, GSAP, and our icons.
// We also import the 'LucideIcon' type for typing our social links.
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  MessageSquare, // --- CHANGED: 'whatsApp' icon doesn't exist, using 'MessageSquare'
  ExternalLink,
  Code2,
  ArrowRight,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";

// --- Step 2: Constants and Type Definitions ---

// We define our roles array with a 'string[]' type
const roles: string[] = [
  "AI & GenAI Engineer",
  "Full Stack Developer",
  "Data Science",
  "Data Analysis",
  "Chain Of Thoughts",
  "Information Technology",
  "Machine Learning",
  "Prompt Engineering",
];

// We create an interface for our social links for type safety
interface SocialLink {
  href: string;
  icon: LucideIcon;
  label: string;
}

// --- Step 3: Component Definition ---

export default function HeroMain() {
  // --- Step 4: State with Types ---
  // All state hooks are given explicit types
  const [currentRole, setCurrentRole] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [charIndex, setCharIndex] = useState<number>(0);

  // --- Step 5: Refs with Types ---
  // All refs are typed to the specific HTML element they will hold
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  // 'any[]' is a pragmatic choice here since the 'Particle' class
  // is defined inside the useEffect scope.
  const particlesRef = useRef<unknown[]>([]);
  const animationIdRef = useRef<number | null>(null);

  // --- Step 6: Advanced Canvas Animation (useEffect) ---
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Guard clause

    // We add a type guard to ensure 'ctx' is not null
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = []; // <-- Type the array
    const particleCount = 80;
    const mousePos = { x: canvas.width / 2, y: canvas.height / 2 };

    class Particle {
      // --- Type all class properties ---
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseOpacity: number;
      opacity: number;
      pulsePhase: number;
      angle: number;
      speed: number;

      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.speed = Math.random() * 0.5 + 0.2;
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
        const canvasWidth = canvas?.width ?? window.innerWidth;
        const canvasHeight = canvas?.height ?? window.innerHeight;
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * 2.5 + 0.5;
        this.baseOpacity = Math.random() * 0.6 + 0.2;
        this.opacity = this.baseOpacity;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }

      // --- Type method parameters ---
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
        if (canvas) {
          if (this.x < 0) this.x = canvas.width;
          if (this.x > canvas.width) this.x = 0;
          if (this.y < 0) this.y = canvas.height;
          if (this.y > canvas.height) this.y = 0;
        }

        // Damping
        this.vx *= 0.98;
        this.vy *= 0.98;

        // Pulsing opacity
        this.opacity = this.baseOpacity + Math.sin(this.pulsePhase) * 0.3;
      }

      draw() {
        // 'ctx' is available from the parent scope
        if (!ctx) return;
        const gradient = ctx.createRadialGradient(
          this.x,
          this.y,
          0,
          this.x,
          this.y,
          this.radius * 3
        );
        gradient.addColorStop(0, `rgba(59, 130, 246, ${this.opacity})`);
        gradient.addColorStop(1, `rgba(6, 182, 212, ${this.opacity * 0.2})`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.strokeStyle = `rgba(6, 182, 212, ${this.opacity * 0.5})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius + 2, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    particlesRef.current = particles;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles (we type 'p' here)
      particles.forEach((p: Particle) => {
        p.update(mousePos.x, mousePos.y);
        p.draw();
      });

      // Draw connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 200) {
            const opacity = (1 - dist / 200) * 0.15;
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    // --- Type the event in the handler ---
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
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
  }, []);

  // --- Step 7: GSAP Spotlight Animation (useEffect) ---
  useEffect(() => {
    // --- Type the event ---
    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(spotlightRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50, // Center the spotlight
        yPercent: -50, // Center the spotlight
        duration: 0.8,
        ease: "power3.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // --- Step 8: GSAP Image Parallax Animation (useEffect) ---
  useEffect(() => {
    if (!imageRef.current) return;

    // 1. Initial entrance animation
    gsap.timeline().fromTo(
      imageRef.current,
      {
        opacity: 0,
        scale: 0.6,
        y: 80,
        filter: "blur(20px)",
      },
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
    // --- Type the event ---
    const handleMouseMove = (e: MouseEvent) => {
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

    window.addEventListener("mousemove", handleMouseMove);

    // 3. Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // --- Step 9: Premium Typing Effect (useEffect) ---
  useEffect(() => {
    const currentFullText = roles[currentRole];
    const typingSpeed = isDeleting ? 30 : 80;

    if (!isDeleting && charIndex < currentFullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (!isDeleting && charIndex === currentFullText.length) {
      const timer = setTimeout(() => setIsDeleting(true), 2500);
      return () => clearTimeout(timer);
    } else if (isDeleting && charIndex > 0) {
      const timer = setTimeout(() => {
        setDisplayText(currentFullText.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, typingSpeed);
      return () => clearTimeout(timer);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }
  }, [charIndex, isDeleting, currentRole]);

  // --- Step 10: Helper Function with Types ---
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // --- Step 11: JSX / Render Method ---

  // We type our social links array using the interface
  const socialLinks: SocialLink[] = [
    { href: "https://github.com/DotZohaib", icon: Github, label: "GitHub" },
    {
      href: "https://www.linkedin.com/in/zohaib-ali-dayo-7862261b5", // --- ADDED: https://
      icon: Linkedin,
      label: "LinkedIn",
    },
    {
      href: "https://mail.google.com/mail/?view=cm&fs=1&to=zuhaibalid@gmail.com&su=Contact%20Request&body=Hello%20Zuhaib",
      icon: Mail,
      label: "Email",
    },
    {
      // --- CHANGED: Formatted for WhatsApp click-to-chat
      href: "https://wa.me/923493237141", // (Removed leading 0, added country code 92)
      icon: MessageSquare, // --- CHANGED: Using the imported 'MessageSquare' icon
      label: "WhatsApp",
    },
  ];

  
  return (
    <div
      ref={containerRef}
      className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-background to-primary/5"
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

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60 z-1 pointer-events-none" />

      {/* Radial Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0 animate-pulse" />

      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8 z-10"
            >
              {/* Name with Gradient */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-primary via-primary to-cyan-500 bg-clip-text text-transparent">
                    Zohaib Ali
                  </span>
                </h1>
              </motion.div>

              {/* Animated Role */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="min-h-20 flex items-center"
              >
                <div className="text-2xl md:text-3xl lg:text-4xl font-semibold font-mono">
                  <span className="text-primary/80">&lt;</span>
                  <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                    {displayText}
                  </span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="text-primary"
                  >
                    _
                  </motion.span>
                  <span className="text-primary/80">/&gt;</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl"
              >
                I am a technologist specializing at the intersection of{" "}
                <span className="text-primary font-semibold">AI/GenAI</span> and{" "}
                <span className="text-primary font-semibold">
                  Full Stack Development
                </span>
                . From scalable web apps to advanced{" "}
                <span className="text-primary font-semibold">
                  Machine Learning
                </span>{" "}
                models, I turn complex data into intelligent solutions. My work
                is powered by deep expertise in{" "}
                <span className="text-primary font-semibold">Data Science</span>{" "}
                and{" "}
                <span className="text-primary font-semibold">
                  Prompt Engineering
                </span>
                . Let&apos;s collaborate to build something remarkable.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                // MODIFICATION: Stack vertically on small screens, horizontally on larger screens.
                className="flex flex-col sm:flex-row gap-4 pt-4"
              >
                {/* Get In Touch Button */}
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="/DotZohaibResume.pdf" // Recommended: Use a mailto link
                  target="_blank"
                  rel="noopener noreferrer"
                  // MODIFICATION: Responsive classes for padding, width, and text size.
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 rounded-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-600 text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  <Mail className="w-5 h-5" />
                  Get In Touch
                  <ArrowRight className="w-4 h-4" />
                </motion.a>

                {/* View Projects Button */}
                <motion.a
                  whileHover={{ scale: 1.05, borderColor: "#3b82f6" }}
                  whileTap={{ scale: 0.95 }}
                  href="https://codewithzuhaib.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  // MODIFICATION: Responsive classes for padding, width, and text size.
                  className="w-full sm:w-auto px-6 py-3 sm:px-8 rounded-lg border border-primary/30 hover:border-primary hover:bg-primary/5 text-primary font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all duration-300 backdrop-blur-sm"
                >
                  <Code2 className="w-5 h-5" />
                  View Projects
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex items-center gap-6 pt-8"
              >
                <span className="text-sm font-medium text-muted-foreground">
                  Connect:
                </span>
                <div className="flex gap-3">
                  {socialLinks.map((social) => (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target={
                        social.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        social.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      whileHover={{ scale: 1.15, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <div className="p-3 rounded-lg bg-primary/10 border border-primary/30 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 backdrop-blur-sm text-primary hover:shadow-lg hover:shadow-primary/20">
                        {/* Render the icon component */}
                        <social.icon className="w-5 h-5" />
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image Section */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
              ref={imageRef}
              style={{ perspective: "1000px" }} // Needed for 3D tilt
            >
              <div className="relative w-full max-w-sm mx-auto">
                {/* Animated Glow Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, #3b82f6, #06b6d4, #3b82f6)",
                    padding: "2px",
                    WebkitMask:
                      "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                    filter: "blur(8px)",
                  }}
                />

                {/* Outer Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -inset-6 blur-2xl"
                />

                {/* Image Container */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="relative z-10"
                >
                  <motion.div
                    className="aspect-square relative flex items-center justify-center"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <img src="/zohaib.png" alt="profile" />
                  </motion.div>
                </motion.div>

                {/* Decorative Rotating Rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -top-12 -right-12 w-40 h-40 border border-primary/20 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -bottom-8 -left-8 w-32 h-32 border border-cyan-500/20 rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
