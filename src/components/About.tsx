"use client";

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn, SiOpencv, SiPandas, SiNumpy, SiJupyter,
  SiReact, SiNextdotjs, SiTailwindcss, SiHtml5, SiThreedotjs,
  SiNodedotjs, SiExpress, SiMongodb, SiPostgresql,
  SiJavascript, SiTypescript,
  SiGit, SiDocker, SiPostman, SiVercel, SiLinux,
} from 'react-icons/si';

/**
 * Subtle particle network drawn behind section content.
 * Colors are read from the site's own tokens (text-primary / text-chart-2),
 * so it follows the existing theme. Pointer-transparent, pauses off-screen,
 * and renders a single static frame under prefers-reduced-motion.
 */
function AmbientNetwork({ className = '' }: { className?: string }) {
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


/* ---------------- Data (source: CV skills list) ---------------- */
type Icon = React.ComponentType<{ className?: string }>;
type Skill = { name: string; icon?: Icon };

const categories: { title: string; tint: string; skills: Skill[] }[] = [
  {
    title: 'AI & Generative AI',
    tint: 'from-chart-1/10 to-chart-2/10',
    skills: [
      { name: 'Generative AI' }, { name: 'AI Agents' }, { name: 'LLM apps' }, { name: 'Prompt Engineering' },
      { name: 'RAG' }, { name: 'LangChain' }, { name: 'OpenAI API' },
    ],
  },
  {
    title: 'ML & Data Science',
    tint: 'from-chart-2/10 to-chart-3/10',
    skills: [
      { name: 'Machine Learning' }, { name: 'Deep Learning' }, { name: 'Computer Vision' }, { name: 'NLP' },
      { name: 'TensorFlow', icon: SiTensorflow }, { name: 'PyTorch', icon: SiPytorch },
      { name: 'scikit-learn', icon: SiScikitlearn }, { name: 'OpenCV', icon: SiOpencv },
      { name: 'Pandas', icon: SiPandas }, { name: 'NumPy', icon: SiNumpy },
      { name: 'Matplotlib' }, { name: 'Seaborn' }, { name: 'Power BI' },
    ],
  },
  {
    title: 'Programming',
    tint: 'from-chart-3/10 to-chart-4/10',
    skills: [
      { name: 'Python', icon: SiPython }, { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript }, { name: 'SQL' }, { name: 'Java' }, { name: 'C' },
    ],
  },
  {
    title: 'Frontend',
    tint: 'from-chart-4/10 to-chart-1/10',
    skills: [
      { name: 'React', icon: SiReact }, { name: 'Next.js', icon: SiNextdotjs },
      { name: 'Tailwind CSS', icon: SiTailwindcss }, { name: 'HTML5/CSS3', icon: SiHtml5 },
      { name: 'Three.js', icon: SiThreedotjs },
    ],
  },
  {
    title: 'Backend & Databases',
    tint: 'from-chart-1/10 to-chart-3/10',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs }, { name: 'Express', icon: SiExpress }, { name: 'REST APIs' },
      { name: 'MongoDB', icon: SiMongodb }, { name: 'PostgreSQL', icon: SiPostgresql },
    ],
  },
  {
    title: 'Tools',
    tint: 'from-chart-2/10 to-chart-4/10',
    skills: [
      { name: 'Git/GitHub', icon: SiGit }, { name: 'Docker', icon: SiDocker }, { name: 'Jupyter', icon: SiJupyter },
      { name: 'Postman', icon: SiPostman }, { name: 'Vercel', icon: SiVercel }, { name: 'Linux', icon: SiLinux },
    ],
  },
];

// Evidence: where each skill appears in the CV's roles and the portfolio's projects.
// Counted from the project/experience data, not self-rated.
const usage: Record<string, string[]> = {
  Python: ['EdgeMoon', 'Face Detection', 'ML/DL Projects', 'Data Science Course', 'ML Full Course'],
  'Tailwind CSS': ['HotelPK', 'CodeWithZohaib Academy', 'DotScents', 'XPACE internship'],
  'Next.js': ['HotelPK', 'CodeWithZohaib Academy', 'DotScents'],
  PyTorch: ['EdgeMoon', 'ML/DL Projects', 'Data Science Course'],
  React: ['HotelPK', 'CodeWithZohaib Academy', 'XPACE internship'],
  TypeScript: ['CodeWithZohaib Academy', 'DotScents'],
  TensorFlow: ['Face Detection', 'Data Science Course'],
  'scikit-learn': ['ML/DL Projects', 'Data Science Course'],
  Pandas: ['ML/DL Projects', 'Data Science Course'],
  NumPy: ['ML/DL Projects', 'Data Science Course'],
  MongoDB: ['HotelPK', 'XPACE internship'],
  Express: ['HotelPK', 'XPACE internship'],
};
const usageRows = Object.entries(usage).sort((a, b) => b[1].length - a[1].length || a[0].localeCompare(b[0]));
const maxUse = usageRows[0][1].length;

const sphereWords = categories.flatMap((c, ci) => c.skills.map((s) => ({ label: s.name, cat: ci })));

/* ---------------- 3D skill sphere (canvas, theme colors, no dependency) ---------------- */
function SkillSphere() {
  const reduce = useReducedMotion();
  const hostRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const probes = React.useRef<(HTMLSpanElement | null)[]>([]);
  const probeClasses = ['text-chart-1', 'text-chart-2', 'text-chart-3', 'text-chart-4', 'text-primary', 'text-muted-foreground'];

  React.useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!host || !canvas || !ctx) return;

    const n = sphereWords.length;
    const pts = sphereWords.map((w, i) => {
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * Math.PI * (3 - Math.sqrt(5));
      return { ...w, x: Math.cos(th) * r, y, z: Math.sin(th) * r };
    });

    let w = 0, h = 0, raf = 0, visible = true, frame = 0;
    let ax = 0.35, ay = 0; // rotation angles
    let vx = 0, vy = 0.004; // angular velocity
    let dragging = false, lx = 0, ly = 0;
    let colors: string[] = [];
    let font = 'sans-serif';

    const readColors = () => {
      colors = probes.current.map((p) => (p ? getComputedStyle(p).color : '#888'));
      font = getComputedStyle(host).fontFamily || 'sans-serif';
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.36;
      const base = Math.max(11, Math.min(w / 26, 16));
      const sx = Math.sin(ax), cx = Math.cos(ax), sy = Math.sin(ay), cy = Math.cos(ay);
      const projected = pts.map((p) => {
        const x1 = p.x * cy + p.z * sy;
        const z1 = -p.x * sy + p.z * cy;
        const y2 = p.y * cx - z1 * sx;
        const z2 = p.y * sx + z1 * cx;
        const k = 2.4 / (2.4 - z2);
        return { label: p.label, cat: p.cat, x: w / 2 + x1 * R * k, y: h / 2 + y2 * R * k, z: z2, k };
      }).sort((a, b) => a.z - b.z);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      for (const p of projected) {
        ctx.globalAlpha = 0.25 + 0.75 * ((p.z + 1) / 2);
        ctx.fillStyle = colors[p.cat] || '#888';
        ctx.font = `${p.z > 0.4 ? 600 : 500} ${(base * p.k).toFixed(1)}px ${font}`;
        ctx.fillText(p.label, p.x, p.y);
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
      readColors();
      draw();
    };

    const loop = () => {
      if (visible && !document.hidden) {
        if (!dragging) { vx *= 0.95; vy += (0.004 - vy) * 0.03; }
        ax += vx; ay += vy;
        if (++frame % 120 === 0) readColors();
        draw();
      }
      raf = requestAnimationFrame(loop);
    };

    const down = (e: PointerEvent) => { dragging = true; lx = e.clientX; ly = e.clientY; host.setPointerCapture(e.pointerId); };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lx, dy = e.clientY - ly;
      lx = e.clientX; ly = e.clientY;
      vy = dx * 0.006; vx = -dy * 0.006;
      if (reduce) { ay += vy; ax += vx; draw(); }
    };
    const up = () => { dragging = false; };

    resize();
    const ro = new ResizeObserver(resize); ro.observe(host);
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(host);
    host.addEventListener('pointerdown', down);
    host.addEventListener('pointermove', move);
    host.addEventListener('pointerup', up);
    host.addEventListener('pointercancel', up);
    if (!reduce) raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      host.removeEventListener('pointerdown', down);
      host.removeEventListener('pointermove', move);
      host.removeEventListener('pointerup', up);
      host.removeEventListener('pointercancel', up);
    };
  }, [reduce]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      style={{ touchAction: 'pan-y' }}
      className="relative mx-auto aspect-square w-full max-w-md cursor-grab select-none active:cursor-grabbing"
    >
      {probeClasses.map((c, i) => (
        <span key={c} ref={(el) => { probes.current[i] = el; }} className={`hidden ${c}`} />
      ))}
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}

/* ---------------- Section ---------------- */
export function Skills() {
  const reduce = useReducedMotion();
  const rise = (delay = 0) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: '-60px' },
          transition: { duration: 0.6, delay, ease: 'easeOut' as const },
        };

  return (
    <section id="skills" className="relative overflow-hidden bg-gradient-to-b from-background to-card/20 px-4 py-20 md:px-8 md:py-32">
      <AmbientNetwork className="opacity-50" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute left-1/3 top-1/3 h-96 w-96 animate-pulse-glow rounded-full bg-primary/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div {...rise()} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
            Skills & <span className="gradient-text-primary">Expertise</span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-chart-2" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            The tools I work with, and where I&apos;ve actually used them.
          </p>
        </motion.div>

        {/* Sphere + evidence graph */}
        <div className="mb-16 grid gap-6 lg:grid-cols-5">
          <motion.div {...rise(0.05)} className="lg:col-span-2">
            <Card className="h-full p-6 glass-morphism bg-gradient-to-br from-chart-1/10 to-chart-3/10 md:p-8">
              <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Skill sphere</h3>
              <SkillSphere />
              <p className="mt-2 text-center text-xs text-muted-foreground">Drag to spin. Every skill is listed below.</p>
            </Card>
          </motion.div>

          <motion.div {...rise(0.12)} className="lg:col-span-3">
            <Card className="h-full p-6 glass-morphism bg-gradient-to-br from-chart-2/10 to-chart-4/10 md:p-8">
              <h3 className="mb-1 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Where I&apos;ve used them</h3>
              <p className="mb-6 text-sm text-muted-foreground">Number of my projects and roles that use each skill.</p>
              <ul className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {usageRows.map(([name, where], i) => (
                  <li key={name} className="min-w-0">
                    <div className="mb-1.5 flex items-baseline justify-between gap-3">
                      <span className="text-sm font-medium">{name}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{where.length}</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-muted" role="img" aria-label={`${name}: ${where.length} projects or roles`}>
                      <motion.div
                        initial={reduce ? false : { scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.1 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                        style={{ width: `${(where.length / maxUse) * 100}%`, transformOrigin: 'left' }}
                        className="h-full rounded-full bg-gradient-to-r from-primary to-chart-2"
                      />
                    </div>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{where.join(', ')}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        {/* Category cards */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((cat, ci) => (
            <motion.div key={cat.title} {...rise(Math.min(ci, 3) * 0.07)} data-testid={`skill-category-${cat.title.toLowerCase().replace(/[^a-z]+/g, '-')}`}>
              <Card className={`h-full p-6 glass-morphism hover-elevate bg-gradient-to-br ${cat.tint}`}>
                <h3 className="mb-5 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{cat.title}</h3>
                <ul className="flex flex-wrap gap-2">
                  {cat.skills.map((s, si) => (
                    <motion.li
                      key={s.name}
                      initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: 0.1 + si * 0.04 }}
                      whileHover={reduce ? undefined : { y: -2 }}
                      className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium"
                    >
                      {s.icon && <s.icon className="h-4 w-4 text-primary" />}
                      {s.name}
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
