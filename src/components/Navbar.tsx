/* eslint-disable react-hooks/set-state-in-effect */
"use client";

// --- Step 1: Imports ---
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  Home,
  User,
  Code2,
  Briefcase,
  Award,
  GraduationCap,
  Mail,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
// We do NOT need to import Next.js Link for this
// import Link from "next/link"; 
// import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

// --- Step 2: Type Definition for Nav Items ---
interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

const navItems: NavItem[] = [
  { label: "Home", href: "#home", icon: Home },
  { label: "About", href: "#about", icon: User },
  { label: "Skills", href: "#skills", icon: Code2 },
  { label: "Experience", href: "#experience", icon: Briefcase },
  { label: "Projects", href: "#projects", icon: Code2 },
  { label: "Certifications", href: "#certifications", icon: Award },
  { label: "Education", href: "#education", icon: GraduationCap },
  { label: "Contact", href: "#contact", icon: Mail },
];

// --- Step 3: Component ---
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mounted, setMounted] = useState<boolean>(false);

  const logoRef = useRef<SVGSVGElement>(null);
  const zPathRef = useRef<SVGPathElement>(null);
  const aPathRef = useRef<SVGPathElement>(null);

  // --- Step 4: GSAP Logo Animation Effect ---
  useEffect(() => {
    // gsap.registerPlugin(DrawSVGPlugin);
    if (logoRef.current && zPathRef.current && aPathRef.current) {
      const tl = gsap.timeline({
        defaults: { duration: 1, ease: "power2.inOut" },
      });
      tl.fromTo(
        zPathRef.current,
        { strokeDashoffset: 140 },
        { strokeDashoffset: 0, delay: 0.5 }
      )
        .fromTo(
          aPathRef.current,
          { strokeDashoffset: 125 },
          { strokeDashoffset: 0 },
          "-=0.7"
        )
        .to(
          [zPathRef.current, aPathRef.current],
          { fill: "currentColor", duration: 0.5 },
          "-=0.5"
        );
    }
  }, [mounted]);

  // --- Step 5: Scroll & Mount Effects ---
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      const sections = navItems.map((item) => item.href.slice(1));
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.slice(1));
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  if (!mounted) return null;

  // --- Step 6: JSX ---
  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "glass-morphism shadow-2xl bg-white/80 dark:bg-black/80 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* --- Animated SVG Logo --- */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <svg
                ref={logoRef}
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 24 24"
                className="text-blue-600 dark:text-blue-500"
              >
                <path
                  ref={zPathRef}
                  d="M7 3h10l-10 18h10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="140"
                  strokeDashoffset="140"
                />
                <path
                  ref={aPathRef}
                  d="M17 3l-10 18l-10-18h20zM7 15h10"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="125"
                  strokeDashoffset="125"
                />
              </svg>
              <span className="font-bold text-xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Zohaib Ali
              </span>
            </motion.div>

            {/* --- Desktop Nav Links --- */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.href}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group ${
                    activeSection === item.href.slice(1)
                      ? "text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                  data-testid={`nav-${item.label.toLowerCase()}`}
                >
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </motion.button>
              ))}
            </div>

            {/* --- Hire Me Button (Desktop) --- */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden lg:block"
            >
              {/* --- THIS IS THE FIX --- */}
              {/* 1. Use motion.a */}
              {/* 2. Put href directly on it */}
              {/* 3. Do NOT use <Link> */}
              <motion.a
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
                }}
                whileTap={{ scale: 0.95 }}
                href="https://mail.google.com/mail/?view=cm&fs=1&to=zuhaibalid@gmail.com&su=Contact%20Request&body=Hello%20Zuhaib"
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-600 text-white font-semibold text-base flex items-center gap-2 transition-all duration-300 shadow-lg shadow-primary/30"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Hire Me
              </motion.a>
            </motion.div>

            {/* --- Mobile Menu Button --- */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="icon"
                variant="ghost"
                className="lg:hidden hover-elevate glass-morphism"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                data-testid="button-mobile-menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.nav>

      {/* --- Mobile Menu --- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-80 lg:hidden" // Corrected z-index
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="absolute inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-2xl" />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 max-w-[85vw] glass-morphism shadow-2xl p-6 border-l border-gray-200 dark:border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="font-bold text-2xl bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  Menu
                </span>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover-elevate"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </motion.div>
              </div>

              <div className="space-y-3">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <motion.button
                      key={item.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => scrollToSection(item.href)}
                      className={`w-full flex items-center gap-4 px-4 py-4 rounded-xl text-left transition-all duration-300 group ${
                        activeSection === item.href.slice(1)
                          ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 border border-blue-200 dark:border-blue-800"
                          : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      }`}
                      data-testid={`mobile-nav-${item.label.toLowerCase()}`}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                      <span className="font-medium text-base">
                        {item.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {/* --- THIS IS THE FIX --- */}
                {/* 1. Use motion.a */}
                {/* 2. Put href directly on it */}
                {/* 3. Do NOT use <Link> */}
                <motion.a
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 40px rgba(59, 130, 246, 0.4)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=zuhaibalid@gmail.com&su=Contact%20Request&body=Hello%20Zuhaib"
                  className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-cyan-500 hover:from-primary/90 hover:to-cyan-600 text-white font-semibold text-base flex items-center justify-center gap-2 transition-all duration-300 shadow-lg shadow-primary/30"
                >
                  <Sparkles className="w-5 h-5" />
                  Hire Me
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}