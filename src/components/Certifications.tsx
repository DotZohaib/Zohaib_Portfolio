"use client";

import React from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type AnimationPlaybackControls,
} from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Brain, Cloud, Code2, Database, BarChart3, PieChart, GraduationCap, Calendar, ExternalLink } from 'lucide-react';

/* ---------- Ambient canvas ---------- */
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


/* ---------- Data ---------- */
// Sources: CV (primary) → existing portfolio data.
// Years are shown only where known. NAVTTC teaching credentials have no year/URL on file:
// add `year` and `href` (link to the certificate file/page) when you have them.

export type CredentialKind = 'Certification' | 'Teaching';
export type FocusArea = 'AI & GenAI' | 'Data' | 'Web';

export type Credential = {
  id: string;
  title: string;
  issuer: string;
  kind: CredentialKind;
  area: FocusArea;
  year?: string;
  note?: string;
  href?: string; // optional link to the certificate itself
};

export const credentials: Credential[] = [
  {
    id: 'governor-genai',
    title: 'Certified Cloud Applied Generative AI Engineer',
    issuer: 'Governor Sindh Initiative',
    kind: 'Certification',
    area: 'AI & GenAI',
    year: '2024',
  },
  {
    id: 'navttc-ai',
    title: 'AI Teacher',
    issuer: 'NAVTTC, Pakistan',
    kind: 'Teaching',
    area: 'AI & GenAI',
    note: 'AI fundamentals, Python and machine learning',
  },
  {
    id: 'navttc-ds',
    title: 'Data Science Teacher',
    issuer: 'NAVTTC, Pakistan',
    kind: 'Teaching',
    area: 'Data',
    note: 'Data analysis, visualization and model building with Python',
  },
  {
    id: 'navttc-aiweb',
    title: 'AI Web Development Teacher',
    issuer: 'NAVTTC, Pakistan',
    kind: 'Teaching',
    area: 'Web',
    note: 'Integrating AI tools into modern web applications',
  },
  {
    id: 'oracle-ds',
    title: 'Data Science Certification',
    issuer: 'Oracle',
    kind: 'Certification',
    area: 'Data',
    year: '2023',
  },
  {
    id: 'google-da',
    title: 'Google Data Analytics',
    issuer: 'Google',
    kind: 'Certification',
    area: 'Data',
    year: '2025',
    note: 'Online course',
  },
  {
    id: 'berlin-da',
    title: 'Data Analytics',
    issuer: 'Berlin School of Business & Innovation',
    kind: 'Certification',
    area: 'Data',
    year: '2023',
  },
  {
    // From the existing portfolio data; not listed on the CV. Remove if you don't want it shown.
    id: 'fullstack',
    title: 'Full Stack Web Development',
    issuer: 'Chai Aur Code & CodeWithHarry',
    kind: 'Certification',
    area: 'Web',
    year: '2022',
  },
];

/* ---------- theme-token styling (no hard-coded colors) ---------- */
const areaStyle: Record<FocusArea, { bar: string; dot: string; tint: string }> = {
  'AI & GenAI': { bar: 'bg-chart-1', dot: 'bg-chart-1', tint: 'from-chart-1/10 to-chart-2/10' },
  Data: { bar: 'bg-chart-2', dot: 'bg-chart-2', tint: 'from-chart-2/10 to-chart-3/10' },
  Web: { bar: 'bg-chart-3', dot: 'bg-chart-3', tint: 'from-chart-3/10 to-chart-4/10' },
};
const areas: FocusArea[] = ['AI & GenAI', 'Data', 'Web'];

const iconFor: Record<string, React.ComponentType<{ className?: string }>> = {
  'governor-genai': Cloud,
  'navttc-ai': Brain,
  'navttc-ds': GraduationCap,
  'navttc-aiweb': Code2,
  'oracle-ds': Database,
  'google-da': PieChart,
  'berlin-da': BarChart3,
  fullstack: Code2,
};

const countBy = (a: FocusArea) => credentials.filter((c) => c.area === a).length;
const certCount = credentials.filter((c) => c.kind === 'Certification').length;
const teachCount = credentials.length - certCount;

/* ---------- 3D bar chart (pure CSS 3D, no dependency) ---------- */
const W = 52, D = 52, UNIT = 36, GAP = 92;

function Face({ className, style, shade }: { className: string; style: React.CSSProperties; shade?: string }) {
  return (
    <div className={`absolute ${className}`} style={style}>
      {shade && <span className={`absolute inset-0 ${shade}`} />}
    </div>
  );
}

function Bar({ area, index }: { area: FocusArea; index: number }) {
  const reduce = useReducedMotion();
  const count = countBy(area);
  const H = count * UNIT;
  const color = areaStyle[area].bar;
  const offset = (index - (areas.length - 1) / 2) * GAP;

  return (
    <motion.div
      initial={reduce ? false : { scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: 0.15 + index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'absolute', bottom: 0, left: '50%', width: W, height: H,
        marginLeft: offset - W / 2, transformStyle: 'preserve-3d', transformOrigin: '50% 100%',
      }}
    >
      <div className={`absolute inset-0 ${color}`} style={{ transform: `translateZ(${D / 2}px)` }}>
        <span className="absolute inset-x-0 top-2 text-center text-sm font-bold text-background">{count}</span>
      </div>
      <Face className={`inset-0 ${color}`} style={{ transform: `translateZ(${-D / 2}px) rotateY(180deg)` }} shade="bg-black/35" />
      <Face className={`inset-y-0 ${color}`} style={{ width: D, left: W / 2 - D / 2, transform: `rotateY(90deg) translateZ(${W / 2}px)` }} shade="bg-black/25" />
      <Face className={`inset-y-0 ${color}`} style={{ width: D, left: W / 2 - D / 2, transform: `rotateY(-90deg) translateZ(${W / 2}px)` }} shade="bg-black/40" />
      <Face className={`inset-x-0 ${color}`} style={{ height: D, top: -D / 2, transform: 'rotateX(90deg)' }} shade="bg-white/20" />
    </motion.div>
  );
}

function Chart3D() {
  const reduce = useReducedMotion();
  const rotY = useMotionValue(-28);
  const sway = React.useRef<AnimationPlaybackControls | null>(null);
  const drag = React.useRef<{ x: number; start: number } | null>(null);
  const clamp = (v: number) => Math.max(-75, Math.min(75, v));

  React.useEffect(() => {
    if (reduce) return;
    sway.current = animate(rotY, [-28, 28], { duration: 7, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' });
    return () => sway.current?.stop();
  }, [reduce, rotY]);

  const summary = areas.map((a) => `${a}: ${countBy(a)}`).join(', ');

  return (
    <div>
      <div
        role="img"
        aria-label={`3D bar chart of credentials by focus area. ${summary}. Drag or use left and right arrow keys to rotate.`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') { sway.current?.stop(); rotY.set(clamp(rotY.get() - 8)); }
          if (e.key === 'ArrowRight') { sway.current?.stop(); rotY.set(clamp(rotY.get() + 8)); }
        }}
        onPointerDown={(e) => {
          sway.current?.stop();
          drag.current = { x: e.clientX, start: rotY.get() };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => { if (drag.current) rotY.set(clamp(drag.current.start + (e.clientX - drag.current.x) * 0.5)); }}
        onPointerUp={() => { drag.current = null; }}
        onPointerCancel={() => { drag.current = null; }}
        style={{ perspective: 900, touchAction: 'pan-y' }}
        className="relative mx-auto h-64 w-full max-w-md cursor-grab select-none overflow-hidden rounded-lg active:cursor-grabbing focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <motion.div
          className="absolute inset-x-0 bottom-10 h-48"
          style={{ transformStyle: 'preserve-3d', transformOrigin: '50% 100%', rotateX: -20, rotateY: rotY }}
        >
          <div
            className="absolute left-1/2 bottom-0 border border-border bg-primary/5"
            style={{ width: 290, height: 140, marginLeft: -145, marginBottom: -70, transform: 'rotateX(90deg)' }}
          />
          {areas.map((a, i) => (<Bar key={a} area={a} index={i} />))}
        </motion.div>
      </div>
      <ul className="mt-2 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm">
        {areas.map((a) => (
          <li key={a} className="flex items-center gap-2">
            <span className={`h-3 w-3 rounded-sm ${areaStyle[a].dot}`} aria-hidden="true" />
            <span className="text-muted-foreground">{a}</span>
            <span className="font-semibold">{countBy(a)}</span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-center text-xs text-muted-foreground">Drag to rotate</p>
    </div>
  );
}

/* ---------- animated donut: certifications vs teaching ---------- */
function Donut() {
  const reduce = useReducedMotion();
  const total = credentials.length;
  const a = certCount / total;
  const common = { cx: 50, cy: 50, r: 38, fill: 'none', strokeWidth: 14 } as const;
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-44 w-44" role="img" aria-label={`${certCount} certifications and ${teachCount} teaching credentials`}>
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
          <circle {...common} className="stroke-border" />
          <motion.circle
            {...common}
            className="stroke-primary"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: a, pathOffset: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
          <motion.circle
            {...common}
            className="stroke-chart-2"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 - a, pathOffset: a }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{total}</span>
          <span className="text-xs text-muted-foreground">credentials</span>
        </div>
      </div>
      <ul className="space-y-2 text-sm">
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-primary" aria-hidden="true" /><span className="text-muted-foreground">Certifications</span><span className="font-semibold">{certCount}</span></li>
        <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-chart-2" aria-hidden="true" /><span className="text-muted-foreground">NAVTTC teaching</span><span className="font-semibold">{teachCount}</span></li>
      </ul>
    </div>
  );
}

/* ---------- tilt card ---------- */
function CredentialCard({ c, index }: { c: Credential; index: number }) {
  const reduce = useReducedMotion();
  const Icon = iconFor[c.id] ?? Award;
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const gx = useMotionValue(-999);
  const gy = useMotionValue(-999);
  const rx = useSpring(useTransform(py, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(px, [-0.5, 0.5], [-6, 6]), { stiffness: 200, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch') return;
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
    gx.set(e.clientX - r.left);
    gy.set(e.clientY - r.top);
  };
  const onLeave = () => { px.set(0); py.set(0); };

  return (
    <motion.div
      layout
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index, 4) * 0.07, ease: 'easeOut' }}
      style={{ perspective: 800 }}
      data-testid={`certification-${c.id}`}
    >
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className="h-full"
      >
        <Card className={`group relative h-full overflow-hidden p-6 flex flex-col glass-morphism hover-elevate bg-gradient-to-br ${areaStyle[c.area].tint}`}>
          <motion.span
            aria-hidden="true"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 + Math.min(index, 4) * 0.07, ease: 'easeOut' }}
            style={{ transformOrigin: 'left' }}
            className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-primary via-chart-2 to-chart-3"
          />
          <motion.div
            aria-hidden="true"
            style={{ x: gx, y: gy }}
            className="pointer-events-none absolute left-0 top-0 -ml-28 -mt-28 h-56 w-56 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />

          <div className="relative flex items-start justify-between gap-3 mb-5">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 transition-transform group-hover:scale-110">
              <Icon className="h-6 w-6 text-primary" />
            </div>
            <span className="rounded bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">{c.kind}</span>
          </div>

          <h3 className="relative mb-2 break-words text-lg font-bold leading-snug" style={{ fontFamily: 'var(--font-display)' }}>{c.title}</h3>
          <p className="relative text-sm font-medium">{c.issuer}</p>
          {c.note && <p className="relative mt-1 text-sm text-muted-foreground">{c.note}</p>}

          <div className="relative mt-auto flex flex-wrap items-center gap-2 pt-5">
            <span className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium">{c.area}</span>
            {c.year && (
              <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" /> {c.year}
              </span>
            )}
          </div>

          {c.href && (
            <Button asChild variant="outline" size="sm" className="relative mt-4 hover-elevate active-elevate-2">
              <a href={c.href} target="_blank" rel="noopener noreferrer" aria-label={`View certificate: ${c.title}`}>
                <ExternalLink className="mr-2 h-4 w-4" /> View certificate
              </a>
            </Button>
          )}
        </Card>
      </motion.div>
    </motion.div>
  );
}

/* ---------- section ---------- */
export function Certifications() {
  const reduce = useReducedMotion();
  const [filter, setFilter] = React.useState<'All' | CredentialKind>('All');
  const shown = filter === 'All' ? credentials : credentials.filter((c) => c.kind === filter);
  const filters: ('All' | CredentialKind)[] = ['All', 'Certification', 'Teaching'];

  return (
    <section id="certifications" className="relative overflow-hidden px-4 py-20 md:px-8 md:py-32">
      <AmbientNetwork className="opacity-50" />
      <div className="pointer-events-none absolute inset-0 opacity-10">
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-chart-3/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl lg:text-6xl" style={{ fontFamily: 'var(--font-display)' }}>
            Certifications & <span className="gradient-text-primary">Credentials</span>
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-primary to-chart-2" />
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Industry certifications and the NAVTTC teaching credentials behind my work in AI, data science and web development.
          </p>
        </motion.div>

        <div className="mb-16 grid gap-6 lg:grid-cols-5">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <Card className="h-full p-6 md:p-8 glass-morphism bg-gradient-to-br from-chart-1/10 to-chart-3/10">
              <h3 className="mb-4 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Credentials by focus area</h3>
              <Chart3D />
            </Card>
          </motion.div>
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Card className="h-full p-6 md:p-8 glass-morphism bg-gradient-to-br from-chart-2/10 to-chart-4/10">
              <h3 className="mb-6 text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>Certified and teaching</h3>
              <Donut />
            </Card>
          </motion.div>
        </div>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-2xl font-bold md:text-3xl" style={{ fontFamily: 'var(--font-display)' }}>All credentials</h3>
          <div role="group" aria-label="Filter credentials" className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <Button
                key={f}
                size="sm"
                variant={filter === f ? 'default' : 'outline'}
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
                className="hover-elevate active-elevate-2"
              >
                {f}
              </Button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => (<CredentialCard key={c.id} c={c} index={i} />))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
