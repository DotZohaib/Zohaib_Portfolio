"use client";

import React from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Code2, Lock } from 'lucide-react';

/* ---------------- Data ---------------- */
const GITHUB_PROFILE = 'https://github.com/DotZohaib';

// Sources: CV, existing portfolio data, GitHub repo list (repo URLs verified to exist).
// No metrics are included other than those stated in the CV / project report.

export type ProjectCategory = 'AI & ML' | 'Full-Stack' | 'Data Science' | 'Other';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  category: ProjectCategory;
  tech: string[];
  featured?: boolean;
  role?: string;
  problem?: string;
  solution?: string;
  features?: string[];
  architecture?: string;
  roadmap?: string;
  github?: string;
  demo?: string;
  privateNote?: string;
};

const GH = 'https://github.com/DotZohaib';

export const projects: Project[] = [
  {
    slug: 'hotelpk',
    title: 'HotelPK — Smart Hotel Feedback & Recommendation System',
    summary:
      "Full-stack hotel review and feedback platform built for Pakistan's hospitality market, with voice reviews in English, Urdu and Sindhi.",
    category: 'Full-Stack',
    featured: true,
    role: 'Final-year project team member (BS IT, supervised)',
    problem:
      'Collecting guest feedback in the languages guests actually speak, and giving hotels one place to act on it.',
    solution:
      'A review platform where guests leave multilingual voice reviews and earn coupon rewards, while hotels and admins get an analytics dashboard.',
    features: [
      'Multilingual voice review system (English, Urdu, Sindhi)',
      'Automated coupon rewards for reviewers',
      'Admin analytics dashboard',
      'JWT-based authentication',
      '38 of 38 test cases passing',
    ],
    architecture:
      'Next.js + React front end with Tailwind CSS and Zustand; Express.js API on MongoDB; Cloudinary for media; JWT auth.',
    roadmap: 'AI sentiment analysis of reviews is planned as future work.',
    tech: ['Next.js', 'React', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Zustand', 'Cloudinary', 'JWT'],
    privateNote: 'Private repository · code available on request',
  },
  {
    slug: 'edgemoon',
    title: 'EdgeMoon — Offline Bilingual Voice Translation',
    summary:
      'Prototype pipeline for Sindhi/Urdu speech recognition and translation that runs locally on edge devices.',
    category: 'AI & ML',
    featured: true,
    role: 'Author',
    features: [
      'Conformer-CTC speech recognition model',
      'INT8 quantization for local inference',
      'Speech-to-text, translation and text-to-speech stages',
      'LAN voice-bridge demo',
    ],
    tech: ['Python', 'PyTorch', 'NLP'],
    github: `${GH}/EdgeMoon`,
  },
  {
    slug: 'codewithzohaib-academy',
    title: 'CodeWithZohaib Academy',
    summary:
      'Free bilingual programming-education platform with 25+ tracks and 1,300+ lessons, each following a 10-point format with English explanations and Roman Urdu analogies.',
    category: 'Full-Stack',
    featured: true,
    role: 'Founder & lead developer',
    features: [
      'Tracks across Python, JavaScript, React, Angular, Node.js, SQL and MongoDB',
      'Code walkthroughs and practice tasks in every lesson',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: `${GH}/CodeWithZohaib-Academy-`,
    demo: 'https://codewithzuhaib.vercel.app',
  },
  {
    slug: 'face-detection',
    title: 'Advanced Face Detection System',
    summary: 'Face detection and recognition built with deep learning and computer vision.',
    category: 'AI & ML',
    tech: ['Python', 'TensorFlow', 'OpenCV', 'Deep Learning'],
    github: `${GH}/FYP-Upgrade-Advance-Face-Detection`,
  },
  {
    slug: 'lan-messenger',
    title: 'LAN Messenger',
    summary: 'WhatsApp-style messaging system that runs across a local network with no internet connection.',
    category: 'Other',
    tech: ['Local network', 'Offline'],
    privateNote: 'Private repository · code available on request',
  },
  {
    slug: 'dotscents',
    title: 'DotScents',
    summary: 'Storefront for a fragrance brand with a product catalogue and shopping cart.',
    category: 'Full-Stack',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    github: `${GH}/DotScent-LOcalStorage-Work-advance`,
    demo: 'https://dotscents.vercel.app',
  },
  {
    slug: 'ml-dl-university',
    title: 'ML / DL University Projects',
    summary: 'Collection of machine learning and deep learning projects: classification, regression and neural networks.',
    category: 'AI & ML',
    tech: ['Python', 'Scikit-learn', 'PyTorch', 'Pandas', 'NumPy'],
    github: `${GH}/Python-project-using-ML-DL-and-other-for-university-project`,
  },
  {
    slug: 'data-science-course',
    title: 'Data Science Course',
    summary: 'Course repository with hands-on projects covering data analysis, visualization and machine learning.',
    category: 'Data Science',
    tech: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'TensorFlow', 'Scikit-learn', 'PyTorch'],
    github: `${GH}/Data-Science-Course`,
  },
  {
    slug: 'ml-full-course',
    title: 'Machine Learning Full Course',
    summary: 'Machine learning curriculum from fundamentals to advanced topics, with practical implementations.',
    category: 'Data Science',
    tech: ['Python', 'Jupyter', 'ML algorithms'],
    github: `${GH}/Machine-Learning-Full-Course`,
  },
];

/* ---------------- Ambient canvas (also used by Certifications) ---------------- */

/**
 * Subtle particle network drawn behind section content.
 * Colors are read from the site's own tokens (text-primary / text-chart-2),
 * so it follows the existing theme. Pointer-transparent, pauses off-screen,
 * and renders a single static frame under prefers-reduced-motion.
 */
export function AmbientNetwork({ className = '' }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const probeA = React.useRef<HTMLSpanElement>(null);
  const probeB = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    type P = { x: number; y: number; vx: number; vy: number };
    let pts: P[] = [];
    let w = 0, h = 0, raf = 0, visible = true;
    const pointer = { x: -9999, y: -9999 };
    let colA = '', colB = '';

    const readColors = () => {
      if (probeA.current) colA = getComputedStyle(probeA.current).color;
      if (probeB.current) colB = getComputedStyle(probeB.current).color;
    };

    const draw = (step: boolean) => {
      ctx.clearRect(0, 0, w, h);
      if (step) {
        for (const p of pts) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < pts.length; i++) {
        const a = pts[i];
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < 120) {
            ctx.globalAlpha = (1 - d / 120) * 0.18;
            ctx.strokeStyle = colA;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        const dp = Math.hypot(a.x - pointer.x, a.y - pointer.y);
        if (dp < 160) {
          ctx.globalAlpha = (1 - dp / 160) * 0.35;
          ctx.strokeStyle = colB;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
        }
        ctx.globalAlpha = 0.45;
        ctx.fillStyle = colA;
        ctx.beginPath();
        ctx.arc(a.x, a.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = host.clientWidth;
      h = host.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(60, Math.floor((w * h) / 22000));
      pts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
      }));
      readColors();
      draw(false);
    };

    const loop = () => {
      if (visible && !document.hidden) draw(true);
      raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const onLeave = () => { pointer.x = pointer.y = -9999; };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
    io.observe(host);

    if (!reduce) {
      host.addEventListener('pointermove', onMove, { passive: true });
      host.addEventListener('pointerleave', onLeave, { passive: true });
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <span ref={probeA} className="hidden text-primary" />
      <span ref={probeB} className="hidden text-chart-2" />
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

/* ---------------- Component ---------------- */
const tints = [
  'from-chart-3/10 to-chart-4/10',
  'from-chart-1/10 to-chart-3/10',
  'from-chart-1/10 to-chart-2/10',
  'from-chart-2/10 to-chart-4/10',
];

function TechBadges({ tech }: { tech: string[] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tech.map((t) => (
        <span key={t} className="px-3 py-1 rounded-md bg-primary/10 text-xs font-medium border border-primary/20">
          {t}
        </span>
      ))}
    </div>
  );
}

function Links({ p }: { p: Project }) {
  if (!p.github && !p.demo && !p.privateNote) return null;
  return (
    <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-card-border">
      {p.github && (
        <Button asChild variant="outline" className="flex-1 min-w-[8rem] hover-elevate active-elevate-2">
          <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} on GitHub`}>
            <Github className="w-4 h-4 mr-2" /> View on GitHub
          </a>
        </Button>
      )}
      {p.demo && (
        <Button asChild className="flex-1 min-w-[8rem] hover-elevate active-elevate-2">
          <a href={p.demo} target="_blank" rel="noopener noreferrer" aria-label={`${p.title} live demo`}>
            <ExternalLink className="w-4 h-4 mr-2" /> Live demo
          </a>
        </Button>
      )}
      {!p.github && p.privateNote && (
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="w-4 h-4 shrink-0" /> {p.privateNote}
        </p>
      )}
    </div>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-foreground mb-1">{label}</h4>
      <div className="text-sm md:text-base text-muted-foreground leading-relaxed">{children}</div>
    </div>
  );
}

function FeaturedCard({ p, index, wide }: { p: Project; index: number; wide: boolean }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      className={wide ? 'lg:col-span-2' : ''}
      data-testid={`project-featured-${p.slug}`}
    >
      <Card
        onPointerMove={onMove}
        className={`group relative overflow-hidden h-full p-6 md:p-8 flex flex-col gap-6 glass-morphism hover-elevate bg-gradient-to-br ${tints[index % tints.length]}`}
      >
        {/* Animated top border */}
        <motion.span
          aria-hidden="true"
          initial={reduce ? false : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
          style={{ transformOrigin: 'left' }}
          className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-primary via-chart-2 to-chart-3"
        />
        {/* Mouse-follow glow (theme tokens only) */}
        <motion.div
          aria-hidden="true"
          style={{ x, y }}
          className="pointer-events-none absolute left-0 top-0 -ml-40 -mt-40 h-80 w-80 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        <div className="relative flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
            <Code2 className="w-6 h-6 text-primary" />
          </div>
          <div className="min-w-0">
            <span className="inline-block px-2 py-0.5 mb-2 rounded bg-primary/10 text-primary text-xs font-medium">
              Featured · {p.category}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold break-words" style={{ fontFamily: 'var(--font-display)' }}>
              {p.title}
            </h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">{p.summary}</p>
            {p.role && <p className="mt-2 text-sm"><span className="font-semibold">Role:</span> {p.role}</p>}
          </div>
        </div>

        <div className={`relative grid gap-6 ${wide ? 'md:grid-cols-2' : ''}`}>
          {p.problem && <Detail label="Problem">{p.problem}</Detail>}
          {p.solution && <Detail label="Solution">{p.solution}</Detail>}
          {p.features && (
            <Detail label="Core features">
              <ul className="space-y-2">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" aria-hidden="true" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </Detail>
          )}
          {(p.architecture || p.roadmap) && (
            <div className="space-y-4">
              {p.architecture && <Detail label="Architecture">{p.architecture}</Detail>}
              {p.roadmap && <Detail label="Roadmap">{p.roadmap}</Detail>}
            </div>
          )}
        </div>

        <div className="relative mt-auto space-y-5">
          <TechBadges tech={p.tech} />
          <Links p={p} />
        </div>
      </Card>
    </motion.div>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.3, delay: Math.min(index, 5) * 0.04 }}
      data-testid={`project-${p.slug}`}
    >
      <Card className={`p-6 h-full flex flex-col glass-morphism hover-elevate active-elevate-2 bg-gradient-to-br ${tints[index % tints.length]} group`}>
        <div className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2 break-words" style={{ fontFamily: 'var(--font-display)' }}>{p.title}</h3>
        <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-4">{p.summary}</p>
        <div className="flex-1 mb-4"><TechBadges tech={p.tech} /></div>
        <Links p={p} />
      </Card>
    </motion.div>
  );
}

export function Projects() {
  const reduce = useReducedMotion();
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);
  const categories = ['All', ...Array.from(new Set(rest.map((p) => p.category)))] as ('All' | ProjectCategory)[];
  const [filter, setFilter] = React.useState<'All' | ProjectCategory>('All');
  const shown = filter === 'All' ? rest : rest.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-20 md:py-32 px-4 md:px-8 relative overflow-hidden bg-gradient-to-b from-background to-card/20">
      <AmbientNetwork className="opacity-60" />
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-chart-4/30 rounded-full blur-3xl animate-pulse-glow" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
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

        <div className="grid gap-6 lg:grid-cols-2 mb-20">
          {featured.map((p, i) => (
            <FeaturedCard key={p.slug} p={p} index={i} wide={i === 0} />
          ))}
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
          <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>More work</h3>
          <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                size="sm"
                variant={filter === c ? 'default' : 'outline'}
                aria-pressed={filter === c}
                onClick={() => setFilter(c)}
                className="hover-elevate active-elevate-2"
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <ProjectCard key={p.slug} p={p} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 flex justify-center">
          <Button asChild variant="outline" className="hover-elevate active-elevate-2">
            <a href={GITHUB_PROFILE} target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4 mr-2" /> Explore all repositories on GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
