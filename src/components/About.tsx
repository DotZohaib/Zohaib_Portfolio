"use client";

import React from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useInView } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Brain, Rocket, GraduationCap, MapPin, BookOpen, Layers, CheckCircle2, Hammer, Presentation, Globe2 } from 'lucide-react';

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


/* ---------------- Data (source: CV; test-case figure from the HotelPK project report) ---------------- */
const roles = ['AI Engineer', 'Data Scientist', 'Full-Stack Developer (MERN & Next.js)', 'Technical Instructor'];

const expertise = [
  'AI Agents & Generative AI Engineering',
  'Full Stack Development (MERN & Next.js)',
  'Machine Learning, Deep Learning & Computer Vision',
  'Data Science & Analytics',
  'Python Engineering',
  'Cloud Technologies',
];

const languages = ['English', 'Urdu', 'Sindhi'];

const pillars = [
  {
    icon: Hammer,
    title: 'Build',
    text: 'Python machine learning, computer vision and LLM/agent workflows (LangChain, RAG), alongside MERN and Next.js applications.',
    tint: 'from-chart-1/10 to-chart-2/10',
  },
  {
    icon: Presentation,
    title: 'Teach',
    text: 'AI, data science and AI web development instructor at NAVTTC, with practical, project-based sessions.',
    tint: 'from-chart-2/10 to-chart-3/10',
  },
  {
    icon: Globe2,
    title: 'Publish',
    text: 'Founder of CodeWithZohaib, a free bilingual programming platform with English explanations and Roman Urdu analogies.',
    tint: 'from-chart-3/10 to-chart-4/10',
  },
];

const stats = [
  { icon: BookOpen, value: 25, suffix: '+', label: 'Free learning tracks', sub: 'CodeWithZohaib' },
  { icon: Layers, value: 1300, suffix: '+', label: 'Lessons', sub: 'CodeWithZohaib' },
  { icon: GraduationCap, value: 3, suffix: '', label: 'Teaching roles', sub: 'NAVTTC' },
  { icon: CheckCircle2, value: 38, suffix: '/38', label: 'Test cases passing', sub: 'HotelPK' },
];

/* ---------------- Small pieces ---------------- */
function TypedRole() {
  const reduce = useReducedMotion();
  const [role, setRole] = React.useState(0);
  const [n, setN] = React.useState(0);
  const [del, setDel] = React.useState(false);

  React.useEffect(() => {
    if (reduce) return;
    const full = roles[role];
    let t: ReturnType<typeof setTimeout>;
    if (!del && n < full.length) t = setTimeout(() => setN(n + 1), 70);
    else if (!del) t = setTimeout(() => setDel(true), 2200);
    else if (n > 0) t = setTimeout(() => setN(n - 1), 28);
    else { setDel(false); setRole((role + 1) % roles.length); }
    return () => clearTimeout(t);
  }, [n, del, role, reduce]);

  if (reduce) {
    return <p className="text-lg text-muted-foreground">{roles.join(' · ')}</p>;
  }
  return (
    <p className="min-h-[1.75rem] text-lg text-primary font-medium" aria-label={roles.join(', ')}>
      <span aria-hidden="true">
        {roles[role].slice(0, n)}
        <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 animate-pulse bg-primary" />
      </span>
    </p>
  );
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const reduce = useReducedMotion();
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || !inView) { if (reduce) el.textContent = value.toLocaleString('en-US') + suffix; return; }
    const c = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (v) => { el.textContent = Math.round(v).toLocaleString('en-US') + suffix; },
    });
    return () => c.stop();
  }, [inView, reduce, value, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

const rise = (reduce: boolean | null, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-60px' },
        transition: { duration: 0.6, delay, ease: 'easeOut' as const },
      };

/* ---------------- Section ---------------- */
export function About() {
  const reduce = useReducedMotion();
  const gx = useMotionValue(-999);
  const gy = useMotionValue(-999);
  const [hover, setHover] = React.useState(false);

  const onMove = (e: React.PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };

  const nameWords = ['Zohaib', 'Ali', 'Dayo'];

  return (
    <section
      id="about"
      onPointerMove={onMove}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className="relative overflow-hidden bg-gradient-to-br from-background via-background to-primary/5 px-4 py-20 md:px-8 md:py-32"
    >
      <AmbientNetwork className="opacity-60" />
      {!reduce && (
        <motion.div
          aria-hidden="true"
          style={{ x: gx, y: gy }}
          animate={{ opacity: hover ? 0.2 : 0 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none absolute left-0 top-0 -ml-48 -mt-48 hidden h-96 w-96 rounded-full bg-primary blur-3xl md:block"
        />
      )}

      <div className="relative mx-auto max-w-7xl">
        <motion.div {...rise(reduce)} className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
            About <span className="gradient-text-primary">Me</span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-chart-2" />
        </motion.div>

        {/* Intro + side cards */}
        <div className="mb-16 grid items-start gap-6 lg:grid-cols-5">
          <motion.div {...rise(reduce, 0.05)} className="lg:col-span-3">
            <Card className="relative h-full overflow-hidden p-6 md:p-10 glass-morphism bg-gradient-to-br from-chart-1/10 to-chart-3/10">
              <motion.span
                aria-hidden="true"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: 'easeOut' }}
                style={{ transformOrigin: 'left' }}
                className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-chart-2 to-chart-3"
              />
              <p className="mb-2 text-muted-foreground">Assalam O Alaikum, I&apos;m</p>
              <h3 className="mb-3 text-4xl font-bold md:text-5xl" style={{ fontFamily: 'var(--font-display)' }}>
                {nameWords.map((w, i) => (
                  <span key={w} className="mr-3 inline-block overflow-hidden align-bottom">
                    <motion.span
                      className="inline-block"
                      initial={reduce ? false : { y: '110%' }}
                      whileInView={{ y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w}
                    </motion.span>
                  </span>
                ))}
              </h3>
              <TypedRole />

              <div className="mt-6 max-w-prose space-y-4 leading-relaxed text-muted-foreground">
                <p>
                  I&apos;m a BS Information Technology student at Sindh Madressatul Islam University (2022–2026), focused on AI and machine learning.
                  I build Python machine learning, computer vision and LLM/agent workflows with LangChain and RAG, and ship MERN and Next.js applications.
                </p>
                <p>
                  I also teach: AI, data science and AI web development at NAVTTC, and through CodeWithZohaib, the free bilingual programming platform I founded.
                </p>
                <p className="font-medium text-foreground">
                  I&apos;m looking for a role where I can apply AI and full-stack engineering to real problems.
                </p>
              </div>

              <ul className="mt-6 flex flex-wrap gap-2 text-sm">
                <li className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-3 py-1">
                  <MapPin className="h-3.5 w-3.5 text-primary" /> Karachi, Pakistan
                </li>
                <li className="inline-flex items-center gap-1.5 rounded-md border border-primary/20 bg-primary/10 px-3 py-1">
                  <GraduationCap className="h-3.5 w-3.5 text-primary" /> BS IT, SMIU
                </li>
              </ul>
            </Card>
          </motion.div>

          <div className="space-y-6 lg:col-span-2">
            <motion.div {...rise(reduce, 0.15)}>
              <Card className="p-6 glass-morphism hover-elevate bg-gradient-to-br from-chart-2/10 to-chart-4/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg border border-primary/20 bg-primary/10 p-2"><Brain className="h-5 w-5 text-primary" /></div>
                  <h4 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Core expertise</h4>
                </div>
                <ul className="space-y-2.5">
                  {expertise.map((s, i) => (
                    <motion.li
                      key={s}
                      initial={reduce ? false : { opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.07 }}
                      className="flex items-start gap-3 text-sm"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                      <span>{s}</span>
                    </motion.li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            <motion.div {...rise(reduce, 0.25)}>
              <Card className="p-6 glass-morphism hover-elevate bg-gradient-to-br from-chart-3/10 to-chart-1/10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg border border-primary/20 bg-primary/10 p-2"><Rocket className="h-5 w-5 text-primary" /></div>
                  <h4 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-display)' }}>Languages</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <span key={l} className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium">
                      {l} <span className="text-muted-foreground">· Proficient</span>
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Pillars */}
        <div className="mb-20 grid gap-6 md:grid-cols-3">
          {pillars.map((p, i) => (
            <motion.div key={p.title} {...rise(reduce, i * 0.1)}>
              <Card className={`group h-full p-6 glass-morphism hover-elevate active-elevate-2 bg-gradient-to-br ${p.tint}`}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 transition-transform group-hover:scale-110 group-hover:-rotate-6">
                  <p.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mb-2 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{p.title}</h4>
                <p className="leading-relaxed text-muted-foreground">{p.text}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div {...rise(reduce)} className="mb-10 text-center">
          <h3 className="mb-3 text-3xl font-bold md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
            Key <span className="gradient-text-primary">Achievements</span>
          </h3>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-chart-2" />
        </motion.div>
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} {...rise(reduce, i * 0.08)}>
              <Card className="h-full p-5 text-center glass-morphism hover-elevate bg-gradient-to-br from-chart-1/10 to-chart-2/10 sm:p-6">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10">
                  <s.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-1 text-3xl font-bold text-primary md:text-4xl" style={{ fontFamily: 'var(--font-display)' }}>
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <div className="text-sm font-medium">{s.label}</div>
                <div className="text-xs text-muted-foreground">{s.sub}</div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
