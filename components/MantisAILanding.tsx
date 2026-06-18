"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Brain,
  Cpu,
  Zap,
  Shield,
  BarChart3,
  Link2,
  Menu,
  X,
  Terminal,
  Globe,
  Lock,
  TrendingUp,
  Eye,
} from "lucide-react";

/* ═══════════════════════ Utilities ═══════════════════════ */

const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");

function MantisLogo({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <img
      src="/mantis-logo.png"
      alt="Mantis AI"
      style={{ height: size, width: "auto", mixBlendMode: "screen" }}
      className={`object-contain ${className}`}
    />
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }
    return undefined;
  }, []);
  return reduced;
}

/* ═══════════════════════ Announcement Banner ═══════════════════════ */

function AnnouncementBanner() {
  return (
    <div className="bg-w-bg-secondary border-b border-w-border">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-4 py-2.5">
        <span className="text-[13px] text-w-text">
          <span className="font-semibold text-white">Mantis AI</span>
          {" "}- Profitability&apos;s secret ingredient for independents. Save your guesses for the lottery.
        </span>
        <a
          href="#cta"
          className="group inline-flex items-center gap-1 text-[13px] font-medium text-w-cream hover:text-white transition-colors"
        >
          Book a demo
          <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

/* ═══════════════════════ Navbar ═══════════════════════ */

function Navbar({ scrollTo }: { scrollTo: (id: string) => void }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navItems = [
    { label: "Solutions", id: "products" },
    { label: "How it Works", id: "how" },
    { label: "Results", id: "results" },
  ];

  return (
    <header className={cx(
      "sticky top-0 z-50 transition-all duration-300",
      scrolled ? "bg-w-bg/90 backdrop-blur-xl border-b border-w-border" : "bg-transparent"
    )}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2.5">
          <MantisLogo />
          <span className="text-[17px] font-semibold tracking-tight text-w-cream">Mantis AI</span>
        </button>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="text-[14px] text-w-muted hover:text-w-cream transition-colors duration-200">
              {item.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden items-center gap-3 md:flex">
          <button className="text-[14px] text-w-muted hover:text-w-cream transition-colors">Sign in</button>
          <button onClick={() => scrollTo("cta")}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-[14px] font-medium text-w-bg hover:bg-white/85 transition-colors duration-200">
            Book a demo
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-w-muted hover:text-w-cream" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-w-border bg-w-bg md:hidden">
            <div className="flex flex-col gap-4 px-6 py-6">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { scrollTo(item.id); setMobileOpen(false); }}
                  className="text-left text-[14px] text-w-muted hover:text-w-cream transition">
                  {item.label}
                </button>
              ))}
              <button onClick={() => { scrollTo("cta"); setMobileOpen(false); }}
                className="mt-2 rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-w-bg">
                Book a demo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ═══════════════════════ Hero ═══════════════════════ */

function RotatingPills({ reducedMotion }: { reducedMotion: boolean }) {
const items = ["Demand Forecasting", "Smart Ordering", "Labor Planning", "Margin Protection"];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => setActive((p) => (p + 1) % items.length), 2200);
    return () => clearInterval(t);
  }, [reducedMotion, items.length]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      {items.map((item, i) => (
        <div
          key={item}
          className={cx(
            "rounded-full px-4 py-1.5 text-[13px] font-medium border transition-all duration-500",
            i === active
              ? "bg-w-card border-white/30 text-w-cream shadow-[0_0_14px_rgba(255,255,255,0.12)]"
              : "bg-transparent border-w-border text-w-faint"
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function HeroTerminal({ reducedMotion }: { reducedMotion: boolean }) {
  const exchanges = useMemo(
    () => [
      { q: "How did yesterday go?", a: "Spoilage down 23%. Gross margin +4.1%. Labor came in 1.8 pts under plan. 3,847 covers across the day." },
      { q: "What should we order and staff for tomorrow?", a: "Rain + two events nearby. Order +14% on fast movers. Plan 2 extra on the line for lunch. Labor target 18%. Ready for review." },
      { q: "Why are our margins slipping on weekends?", a: "Weekend covers up but food cost +3 pts and comps are high. Top 3 items driving it. Want the breakdown and suggested price tests?" },
    ],
    []
  );

  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    const t = setInterval(() => setIdx((p) => (p + 1) % exchanges.length), 3500);
    return () => clearInterval(t);
  }, [reducedMotion, exchanges.length]);

  return (
    <div className="overflow-hidden rounded-xl border border-w-border bg-w-bg-secondary shadow-[0_32px_80px_-20px_rgba(0,0,0,0.65)]">
      {/* Chrome bar */}
      <div className="flex items-center gap-2 border-b border-w-border px-4 py-3 bg-w-bg">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <div className="h-3 w-3 rounded-full bg-[#28c840]" />
        </div>
          <span className="ml-3 flex-1 text-center text-[12px] text-w-faint">
          mantis — your AI teammate for the whole operation
        </span>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-white animate-pulse" />
          <span className="text-[11px] text-white/50">live</span>
        </div>
      </div>

      {/* Body */}
      <div className="relative p-6 min-h-[185px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={idx}
            initial={reducedMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 p-6 space-y-4 font-mono text-[13px]"
          >
            <div className="flex items-start gap-2">
              <span className="shrink-0 select-none text-white">❯</span>
              <span className="text-w-cream">{exchanges[idx].q}</span>
            </div>
            <motion.div
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="ml-5 rounded-lg border-l-2 border-white/30 pl-4 py-1"
            >
              <span className="leading-relaxed text-w-text">{exchanges[idx].a}</span>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Metrics bar */}
      <div className="grid grid-cols-3 divide-x divide-w-border border-t border-w-border">
        {[
          { label: "Covers analyzed", value: "2,847/hr" },
          { label: "Scenarios run", value: "12k" },
          { label: "Decisions approved", value: "98%" },
        ].map((m) => (
          <div key={m.label} className="bg-w-bg p-4">
            <div className="text-[10px] font-medium uppercase tracking-wider text-w-faint">{m.label}</div>
            <div className="mt-1 text-[20px] font-semibold tabular-nums text-w-cream">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HeroSection({
  reducedMotion,
  scrollTo,
}: {
  reducedMotion: boolean;
  scrollTo: (id: string) => void;
}) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 sm:pt-28">
      {/* Ambient radial glow behind heading */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[640px] w-[1100px] rounded-full bg-white/[0.035] blur-[130px]" />
      </div>
      {/* Space star - compact bright star seen from near distance */}
      <div className="pointer-events-none absolute left-1/2 top-[5%] -translate-x-1/2 -translate-y-1/2 z-0 flex items-center justify-center">
        {/* Far outer halo - faint nebula glow */}
        <motion.div
          className="absolute rounded-full blur-[60px]"
          style={{ width: 340, height: 340, background: "radial-gradient(circle, rgba(180,200,255,0.08) 0%, transparent 70%)" }}
          animate={reducedMotion ? {} : { scale: [1, 1.2, 1], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Inner hot glow - warm white */}
        <motion.div
          className="absolute rounded-full blur-[20px]"
          style={{ width: 110, height: 110, background: "radial-gradient(circle, rgba(255,250,240,0.35) 0%, rgba(200,220,255,0.1) 50%, transparent 100%)" }}
          animate={reducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [1, 0.7, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Hot core - intense white point */}
        <motion.div
          className="absolute rounded-full bg-white"
          style={{ width: 10, height: 10, boxShadow: "0 0 14px 6px rgba(255,255,255,0.8), 0 0 35px 12px rgba(200,220,255,0.4)" }}
          animate={reducedMotion ? {} : { scale: [1, 1.4, 1], opacity: [1, 0.9, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Primary horizontal diffraction spike */}
        <motion.div
          className="absolute"
          style={{ width: 380, height: 1.5, background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 35%, white 50%, rgba(255,255,255,0.5) 65%, transparent 100%)" }}
          animate={reducedMotion ? {} : { scaleX: [1, 1.12, 1], opacity: [0.6, 0.35, 0.6] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Primary vertical diffraction spike */}
        <motion.div
          className="absolute"
          style={{ width: 1.5, height: 280, background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.4) 35%, white 50%, rgba(255,255,255,0.4) 65%, transparent 100%)" }}
          animate={reducedMotion ? {} : { scaleY: [1, 1.15, 1], opacity: [0.45, 0.25, 0.45] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        />
        {/* Secondary diagonal spike 45° */}
        <motion.div
          className="absolute rotate-45"
          style={{ width: 240, height: 0.75, background: "linear-gradient(90deg, transparent 0%, rgba(200,220,255,0.25) 40%, rgba(255,255,255,0.45) 50%, rgba(200,220,255,0.25) 60%, transparent 100%)" }}
          animate={reducedMotion ? {} : { scaleX: [1, 1.08, 1], opacity: [0.35, 0.18, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        {/* Secondary diagonal spike -45° */}
        <motion.div
          className="absolute -rotate-45"
          style={{ width: 240, height: 0.75, background: "linear-gradient(90deg, transparent 0%, rgba(200,220,255,0.25) 40%, rgba(255,255,255,0.45) 50%, rgba(200,220,255,0.25) 60%, transparent 100%)" }}
          animate={reducedMotion ? {} : { scaleX: [1, 1.08, 1], opacity: [0.35, 0.18, 0.35] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Beta badge */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-7 inline-flex"
        >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1 text-[12px] font-medium text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-white" />
            Predictive · Connected · Human-Approved
          </span>
        </motion.div>

        <motion.h1
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="text-[40px] font-semibold leading-[1.08] tracking-tight sm:text-[58px] lg:text-[74px]"
        >
          <span className="text-w-cream">Stop guessing.</span>
          <br />
          <span className="bg-gradient-to-r from-white via-white/80 to-white bg-clip-text text-transparent">
            Start saving.
          </span>
        </motion.h1>

        <motion.p
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12 }}
          className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-w-text sm:text-[18px]"
        >
          Your crew + AI. Mantis is the agentic operating system for independent businesses.
          It predicts demand, optimizes inventory and pricing, manages operations, and keeps every decision human-approved.
          One conversational teammate that plugs into your existing tools and learns how you actually run.
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <button
            onClick={() => scrollTo("cta")}
            className="group inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-[15px] font-medium text-w-bg hover:bg-white/85 transition-colors shadow-[0_0_22px_rgba(255,255,255,0.18)]"
          >
            Book a demo
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
          <button
            onClick={() => scrollTo("how")}
            className="inline-flex items-center gap-2 rounded-lg border border-w-border bg-w-bg-secondary px-6 py-3 text-[15px] font-medium text-w-cream hover:bg-w-card transition-colors"
          >
            See How It Works
          </button>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.32 }}
          className="mt-10"
        >
          <RotatingPills reducedMotion={reducedMotion} />
        </motion.div>
      </div>

      {/* Terminal + glow underneath */}
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.38 }}
        className="relative mx-auto mt-16 max-w-3xl"
      >
        <HeroTerminal reducedMotion={reducedMotion} />
      </motion.div>
    </section>
  );
}


/* ═══════════════════════ "A New Way to Operate" ═══════════════════════ */

function NewWaySection({ reducedMotion }: { reducedMotion: boolean }) {
  return (
    <section className="relative mx-auto max-w-7xl px-6 py-28">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        {/* Left */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white">A new way to run your daily operations.</p>
          <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-w-cream sm:text-[42px]">
            Stop wasting stock. Stop guessing.
          </h2>
          <p className="mt-4 text-[16px] leading-relaxed text-w-text">
            Mantis replaces your messy spreadsheets, group texts, and gut-feel forecasts with a crew of AI assistants
            that know your business. They help with demand forecasting, ordering, labor planning, payroll, and daily operations —
            and every recommendation waits for your team to approve.
          </p>

          {/* Before → After comparison */}
          <div className="mt-10 flex items-stretch gap-3">
            <div className="flex-1 rounded-lg border border-w-border bg-w-bg-secondary p-4 opacity-70">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-w-faint">Before</p>
              <div className="space-y-2">
                {["Messy spreadsheets", "Guessing what sells", "Software you don't trust"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-[12px] text-w-muted">
                    <div className="h-1 w-1 rounded-full bg-w-dim" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 rounded-lg border border-white/25 bg-white/[0.06] p-4">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-white">With Mantis</p>
              <div className="space-y-2">
                {["Automatic data sync", "Exact demand prediction", "You stay in control"].map((t) => (
                  <div key={t} className="flex items-center gap-2 text-[12px] text-w-cream">
                    <div className="h-1 w-1 rounded-full bg-white" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right - cards */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, x: 16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-3"
        >
          {[
            { icon: Cpu, title: "Spreadsheets & texts → One conversation", desc: "Ditch the messy spreadsheets, scattered texts, and five dashboards. Ask Mantis anything in plain English — sales, orders, labor, staffing, forecasts, margins, even guest notes. It pulls from all your systems and answers like a sharp teammate who knows your business." },
            { icon: Brain, title: "Guessing → Institutional memory", desc: "Mantis doesn't just forecast. It remembers every special, every weather event, every shift note, every staffing decision. Your team's knowledge compounds instead of walking out the door." },
            { icon: Eye, title: "Black box → Your judgment amplified", desc: "Mantis never decides for you. It surfaces clear options with full reasoning. Your team reviews, tweaks, and approves. Human + AI beats either alone." },
          ].map((card) => (
            <div key={card.title} className="group rounded-xl border border-w-border bg-w-bg-secondary p-5 hover:border-w-border-light hover:bg-w-card transition-all duration-200">
              <div className="flex items-start gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/10 group-hover:bg-white/15 transition-colors">
                  <card.icon className="h-4 w-4 text-white" />
                </div>
                <div>
                  <h3 className="text-[15px] font-semibold text-w-cream">{card.title}</h3>
                  <p className="mt-1 text-[13px] leading-relaxed text-w-muted">{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════ Capabilities (State of the Art) ═══════════════════════ */

function CapabilitiesSection({ reducedMotion }: { reducedMotion: boolean }) {
  const products = [
    {
      title: "Works With What You Have",
      subtitle: "Connects to your existing hardware in minutes",
      icon: Cpu,
      desc: "No need to buy new tills or scanners. Mantis connects directly to the hardware and software you already use, organizing your fragmented data automatically.",
      topGlow: "from-white/30 via-white/10 to-transparent",
    },
    {
      title: "Smarter Every Night",
      subtitle: "Learns your business and improves while you sleep",
      icon: Brain,
      desc: "Mantis learns your specific business patterns. Every night it prepares recommendations for ordering, pricing, labor schedules, and margin protection so you start the day with a clear plan.",
      topGlow: "from-white/20 via-white/8 to-transparent",
    },
    {
      title: "The Power of a Network",
      subtitle: "Collective intelligence without sharing your secrets",
      icon: Shield,
      desc: "Get sharper forecasts from patterns across many businesses without sharing your raw data. Collective intelligence that makes your demand predictions, labor plans, and margin calls better every night.",
      topGlow: "from-white/15 via-white/5 to-transparent",
    },
  ];

  return (
    <section id="products" className="mx-auto max-w-7xl px-6 py-28">
      <div className="section-divider mb-28" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white">How Mantis Helps You</p>
        <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-w-cream sm:text-[42px]">
          Three things that change everything.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-w-text">
          Mantis connects to what you have, learns your business overnight, and gives you one conversation
          with everything that matters. Cloud by default. Optional private on-prem deployment if you want it.
        </p>
      </div>

      {/* Metrics badges */}
      <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-3">
        {[
          { label: "What you need", val: "1", tag: "Your tools" },
          { label: "When it runs", val: "6 AM", tag: "Daily plan" },
          { label: "Your data", val: "100%", tag: "You control it" },
        ].map((m) => (
          <div key={m.label} className="flex items-center gap-3 rounded-full border border-w-border bg-w-bg-secondary px-5 py-2.5">
            <div>
              <div className="text-[10px] font-semibold text-white">{m.tag}</div>
              <div className="text-[11px] text-w-muted">{m.label}</div>
            </div>
            <div className="text-[22px] font-bold tabular-nums text-w-cream">{m.val}</div>
          </div>
        ))}
      </div>

      {/* Integrations row - Nory inspired */}
      <div className="mx-auto mt-8 text-center">
        <p className="text-[11px] uppercase tracking-[0.12em] text-w-faint mb-3">Straightforward integrations</p>
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-w-muted">
          {["Square", "Toast", "Lightspeed", "Shopify", "Clover", "Xero", "QuickBooks"].map((i) => (
            <span key={i} className="px-2">{i}</span>
          ))}
        </div>
      </div>

      {/* Product cards with gradient top accents */}
      <div className="mx-auto mt-14 grid gap-4 lg:grid-cols-3">
        {products.map((p, i) => (
          <motion.div
            key={p.title}
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.45, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-xl border border-w-border bg-w-bg-secondary p-7 hover:border-w-border-light transition-all duration-200"
          >
            {/* Gradient top accent */}
            <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${p.topGlow}`} />
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
              <p.icon className="h-5 w-5 text-white" />
            </div>
            <h3 className="mt-5 text-[18px] font-semibold text-w-cream">{p.title}</h3>
            <p className="mt-1 text-[12px] font-medium text-w-muted">{p.subtitle}</p>
            <p className="mt-4 text-[14px] leading-relaxed text-w-text">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════ Step Illustrations ═══════════════════════ */

function IllustrationConnect({ rm }: { rm: boolean }) {
  const CX = 320, CY = 120;
  const NW = 72, NH = 28, HR = 44;
  const left = [
    { label: "ERP", x: 70, y: 40 },
    { label: "CRM", x: 70, y: 120 },
    { label: "SaaS", x: 70, y: 200 },
  ];
  const right = [
    { label: "Comms", x: 570, y: 40 },
    { label: "APIs", x: 570, y: 120 },
    { label: "Data", x: 570, y: 200 },
  ];
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } } };
  const nodeV = { hidden: { opacity: 0, scale: 0.6 }, visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 180, damping: 16 } } };
  const pathV = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "easeOut" } } };

  const curvePath = (ex: number, ey: number, hx: number, hy: number) => {
    const mx = (ex + hx) / 2;
    return `M${ex},${ey} C${mx},${ey} ${mx},${hy} ${hx},${hy}`;
  };

  const sides = [
    ...left.map(n => ({ ...n, edgeX: n.x + NW / 2, hubX: CX - HR })),
    ...right.map(n => ({ ...n, edgeX: n.x - NW / 2, hubX: CX + HR })),
  ];

  return (
    <motion.svg viewBox="0 0 640 240" fill="none" className="h-full w-full"
      variants={container} initial={rm ? "visible" : "hidden"} animate="visible">
      <defs>
        <radialGradient id="cn-rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      {/* Grid dots */}
      {Array.from({ length: 16 }).map((_, i) =>
        Array.from({ length: 6 }).map((_, j) => (
          <circle key={`d-${i}-${j}`} cx={20 + i * 40} cy={20 + j * 40} r="0.7" fill="rgba(255,255,255,0.05)" />
        ))
      )}
      {/* Center glow */}
      <ellipse cx={CX} cy={CY} rx="100" ry="85" fill="url(#cn-rg)" />
      {/* Curved connection paths - edge-to-edge */}
      {sides.map((n, i) => {
        const d = curvePath(n.edgeX, n.y, n.hubX, CY);
        return (
          <motion.path key={`p-${i}`} d={d}
            stroke="rgba(255,255,255,0.14)" strokeWidth="1" fill="none" variants={pathV} />
        );
      })}
      {/* Traveling dots along curves */}
      {sides.map((n, i) => {
        const d = curvePath(n.edgeX, n.y, n.hubX, CY);
        const id = `cn-mp-${i}`;
        return (
          <g key={`tp-${i}`}>
            <path id={id} d={d} fill="none" stroke="none" />
            {!rm && (
              <circle r="2" fill="white" opacity="0">
                <animateMotion dur={`${4.5 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`}>
                  <mpath href={`#${id}`} />
                </animateMotion>
                <animate attributeName="opacity" values="0;0.85;0.85;0" keyTimes="0;0.15;0.85;1" dur={`${4.5 + i * 0.4}s`} repeatCount="indefinite" begin={`${i * 0.6}s`} />
              </circle>
            )}
          </g>
        );
      })}
      {/* Outer hub ring - orbit */}
      <motion.circle cx={CX} cy={CY} r="52" fill="none"
        stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" strokeDasharray="3 5"
        animate={rm ? {} : { rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${CX}px ${CY}px` }} />
      {/* Hub outer circle */}
      <motion.circle cx={CX} cy={CY} r={HR} fill="rgba(255,255,255,0.04)"
        stroke="rgba(255,255,255,0.22)" strokeWidth="1" variants={pathV} />
      {/* Hub inner circle */}
      <motion.circle cx={CX} cy={CY} r="30" fill="rgba(255,255,255,0.06)"
        stroke="rgba(255,255,255,0.32)" strokeWidth="1.5"
        animate={rm ? {} : { opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 3, repeat: Infinity }} />
      {/* Hub text */}
      <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.95)" fontSize="12" fontFamily="ui-sans-serif,sans-serif" fontWeight="700">MANTIS</text>
      {/* Source nodes - left */}
      {left.map((n, i) => (
        <motion.g key={`nl-${i}`} variants={nodeV}>
          <rect x={n.x - NW / 2} y={n.y - NH / 2} width={NW} height={NH} rx="6"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="ui-monospace,monospace">{n.label}</text>
        </motion.g>
      ))}
      {/* Source nodes - right (mirrored) */}
      {right.map((n, i) => (
        <motion.g key={`nr-${i}`} variants={nodeV}>
          <rect x={n.x - NW / 2} y={n.y - NH / 2} width={NW} height={NH} rx="6"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <text x={n.x} y={n.y} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.65)" fontSize="10" fontFamily="ui-monospace,monospace">{n.label}</text>
        </motion.g>
      ))}
      {/* Direction labels */}
      <motion.text x={175} y={18} textAnchor="middle" variants={nodeV}
        fill="rgba(255,255,255,0.18)" fontSize="7.5" fontFamily="ui-monospace,monospace">ingest →</motion.text>
      <motion.text x={465} y={18} textAnchor="middle" variants={nodeV}
        fill="rgba(255,255,255,0.18)" fontSize="7.5" fontFamily="ui-monospace,monospace">← ingest</motion.text>
    </motion.svg>
  );
}

function IllustrationLearn({ rm }: { rm: boolean }) {
  const sources = ["Source A", "Source B", "Source C", "Source D"];
  const sCY = [36, 84, 156, 204];
  const SX = 90, MX = 320, MY = 120;
  const bars = [{ label: "Accuracy", pct: 87 }, { label: "Coverage", pct: 94 }, { label: "Recency", pct: 98 }];
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } } };
  const itemV = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 150, damping: 16 } } };
  const rightV = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 150, damping: 16 } } };
  const lineV = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.7 } } };

  return (
    <motion.svg viewBox="0 0 640 240" fill="none" className="h-full w-full"
      variants={container} initial={rm ? "visible" : "hidden"} animate="visible">
      <defs>
        <radialGradient id="lr-rg" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.10)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      {/* Grid dots */}
      {Array.from({ length: 15 }).map((_, i) =>
        Array.from({ length: 6 }).map((_, j) => (
          <circle key={`d-${i}-${j}`} cx={40 + i * 40} cy={20 + j * 40} r="0.8" fill="rgba(255,255,255,0.06)" />
        ))
      )}
      {/* Label */}
      <text x={SX} y="14" textAnchor="middle" fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="ui-monospace,monospace">DATA STAYS LOCAL</text>
      {/* Sources + lines */}
      {sources.map((s, i) => (
        <motion.g key={s} variants={itemV}>
          <rect x={SX - 55} y={sCY[i] - 14} width={110} height={28} rx="6"
            fill="rgba(255,255,255,0.07)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
          <text x={SX} y={sCY[i]} textAnchor="middle" dominantBaseline="middle"
            fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="ui-monospace,monospace">{s}</text>
        </motion.g>
      ))}
      {/* Flow lines with traveling dots */}
      {sCY.map((cy, i) => (
        <motion.g key={`fl-${i}`} variants={lineV}>
          <motion.line x1={SX + 55} y1={cy} x2={MX - 52} y2={MY}
            stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <motion.circle r="2" fill="white"
            animate={rm ? {} : {
              cx: [SX + 55, MX - 52], cy: [cy, MY], opacity: [0, 0.7, 0]
            }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }} />
        </motion.g>
      ))}
      {/* Center glow */}
      <ellipse cx={MX} cy={MY} rx="70" ry="70" fill="url(#lr-rg)" />
      {/* Orbital ring */}
      <motion.circle cx={MX} cy={MY} r="52" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"
        strokeDasharray="3 5" animate={rm ? {} : { rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        style={{ transformOrigin: `${MX}px ${MY}px` }} />
      {/* Core circles */}
      <motion.circle cx={MX} cy={MY} r="46" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.30)" strokeWidth="1.5"
        animate={rm ? {} : { opacity: [0.6, 1, 0.6] }} transition={{ duration: 3, repeat: Infinity }} />
      <circle cx={MX} cy={MY} r="32" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <text x={MX} y={MY - 8} textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.92)" fontSize="11" fontFamily="ui-sans-serif,sans-serif" fontWeight="700">Knowledge</text>
      <text x={MX} y={MY + 8} textAnchor="middle" dominantBaseline="middle"
        fill="rgba(255,255,255,0.92)" fontSize="11" fontFamily="ui-sans-serif,sans-serif" fontWeight="700">Graph</text>
      {/* Right panel */}
      <motion.g variants={rightV}>
        <rect x="420" y="30" width="196" height="180" rx="8"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="421" y="31" width="194" height="30" rx="7" fill="rgba(255,255,255,0.06)" />
        <motion.circle cx="434" cy="46" r="3.5" fill="white"
          animate={rm ? {} : { opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
        <text x="444" y="46" dominantBaseline="middle"
          fill="rgba(255,255,255,0.45)" fontSize="9" fontFamily="ui-monospace,monospace">LIVE · MODEL STATUS</text>
        {bars.map((b, i) => (
          <g key={b.label}>
            <text x="434" y={80 + i * 48} dominantBaseline="middle"
              fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="ui-monospace,monospace">{b.label}</text>
            <rect x="434" y={90 + i * 48} width="168" height="5" rx="2.5" fill="rgba(255,255,255,0.08)" />
            <motion.rect x="434" y={90 + i * 48} height="5" rx="2.5" fill="rgba(255,255,255,0.55)"
              initial={{ width: 0 }} animate={{ width: (b.pct / 100) * 168 }}
              transition={{ duration: 1.2, delay: 0.6 + i * 0.2, ease: "easeOut" }} />
            <text x={434 + (b.pct / 100) * 168 + 6} y={94 + i * 48} dominantBaseline="middle"
              fill="rgba(255,255,255,0.35)" fontSize="8" fontFamily="ui-monospace,monospace">{b.pct}%</text>
          </g>
        ))}
      </motion.g>
      {/* Output flow line */}
      <motion.line x1={MX + 52} y1={MY} x2={418} y2={MY}
        stroke="rgba(255,255,255,0.15)" strokeWidth="1" variants={lineV} />
    </motion.svg>
  );
}

function IllustrationAgents({ rm }: { rm: boolean }) {
  const agents = [
    { label: "Agent 01", status: "EXEC", task: "Pipeline Analysis" },
    { label: "Agent 02", status: "EXEC", task: "Market Intel" },
    { label: "Agent 03", status: "IDLE", task: "Anomaly Watch" },
  ];
  const aCY = [50, 120, 190];
  const LX = 400, LY = 16;
  const entries = [
    { action: "Pipeline risk flagged", time: "09:41:12", done: true },
    { action: "Alert → CFO escalated", time: "09:41:15", done: true },
    { action: "Competitor shift noted", time: "09:41:20", done: true },
    { action: "Report generating…", time: "09:41:24", done: false },
  ];
  const container = { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
  const leftV = { hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 160, damping: 16 } } };
  const rightV = { hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 160, damping: 16, delay: 0.4 } } };
  const lineV = { hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.6, delay: 0.3 } } };

  return (
    <motion.svg viewBox="0 0 640 240" fill="none" className="h-full w-full"
      variants={container} initial={rm ? "visible" : "hidden"} animate="visible">
      {/* Grid dots */}
      {Array.from({ length: 15 }).map((_, i) =>
        Array.from({ length: 6 }).map((_, j) => (
          <circle key={`d-${i}-${j}`} cx={40 + i * 40} cy={20 + j * 40} r="0.8" fill="rgba(255,255,255,0.06)" />
        ))
      )}
      {/* Agent cards */}
      {agents.map((a, i) => (
        <motion.g key={a.label} variants={leftV}>
          <rect x="20" y={aCY[i] - 28} width="200" height={56} rx="8"
            fill="rgba(255,255,255,0.06)"
            stroke={a.status === "EXEC" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.10)"} strokeWidth="1" />
          <motion.circle cx="40" cy={aCY[i] - 6} r="5"
            fill={a.status === "EXEC" ? "white" : "rgba(255,255,255,0.2)"}
            animate={a.status === "EXEC" && !rm ? { opacity: [0.4, 1, 0.4] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }} />
          <text x="54" y={aCY[i] - 6} dominantBaseline="middle"
            fill="rgba(255,255,255,0.88)" fontSize="11.5" fontFamily="ui-sans-serif,sans-serif" fontWeight="600">{a.label}</text>
          <rect x="170" y={aCY[i] - 16} width="40" height="16" rx="4"
            fill={a.status === "EXEC" ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.03)"}
            stroke={a.status === "EXEC" ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.1)"} strokeWidth="1" />
          <text x="190" y={aCY[i] - 8} textAnchor="middle" dominantBaseline="middle"
            fill={a.status === "EXEC" ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.25)"}
            fontSize="8" fontFamily="ui-monospace,monospace">{a.status}</text>
          <text x="40" y={aCY[i] + 14} dominantBaseline="middle"
            fill="rgba(255,255,255,0.35)" fontSize="9" fontFamily="ui-monospace,monospace">{a.task}</text>
        </motion.g>
      ))}
      {/* Connection lines - all converge to single point */}
      {aCY.map((cy, i) => (
        <motion.g key={`cl-${i}`} variants={lineV}>
          <motion.line x1={220} y1={cy} x2={LX - 2} y2={LY + 105}
            stroke={agents[i].status === "EXEC" ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.06)"}
            strokeWidth="1" />
          {agents[i].status === "EXEC" && (
            <motion.circle r="2" fill="white"
              animate={rm ? {} : {
                cx: [220, LX - 2], cy: [cy, LY + 105], opacity: [0, 0.7, 0]
              }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }} />
          )}
        </motion.g>
      ))}
      {/* Audit log panel */}
      <motion.g variants={rightV}>
        <rect x={LX} y={LY} width="224" height="210" rx="8"
          fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />
        <rect x={LX + 1} y={LY + 1} width="222" height="32" rx="7" fill="rgba(255,255,255,0.06)" />
        <line x1={LX} y1={LY + 33} x2={LX + 224} y2={LY + 33} stroke="rgba(255,255,255,0.10)" strokeWidth="0.75" />
        <motion.circle cx={LX + 16} cy={LY + 17} r="3.5" fill="white"
          animate={rm ? {} : { opacity: [0.3, 0.9, 0.3] }} transition={{ duration: 1.6, repeat: Infinity }} />
        <text x={LX + 28} y={LY + 17} dominantBaseline="middle"
          fill="rgba(255,255,255,0.6)" fontSize="10" fontFamily="ui-sans-serif,sans-serif" fontWeight="600">Audit Log</text>
        {entries.map((e, i) => (
          <motion.g key={e.action}
            initial={rm ? {} : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 + i * 0.15, duration: 0.3 }}>
            <rect x={LX + 8} y={LY + 40 + i * 42} width="208" height="34" rx="5"
              fill="rgba(255,255,255,0.03)"
              stroke={!e.done ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.08)"} strokeWidth="0.75" />
            <text x={LX + 22} y={LY + 57 + i * 42} textAnchor="middle" dominantBaseline="middle"
              fill={e.done ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.4)"} fontSize="11">
              {e.done ? "✓" : "●"}
            </text>
            <text x={LX + 34} y={LY + 51 + i * 42} dominantBaseline="middle"
              fill="rgba(255,255,255,0.55)" fontSize="9" fontFamily="ui-monospace,monospace">{e.action}</text>
            <text x={LX + 34} y={LY + 65 + i * 42} dominantBaseline="middle"
              fill="rgba(255,255,255,0.25)" fontSize="8" fontFamily="ui-monospace,monospace">{e.time}</text>
          </motion.g>
        ))}
      </motion.g>
    </motion.svg>
  );
}

function StepIllustration({ step, reducedMotion }: { step: number; reducedMotion: boolean }) {
  if (step === 0) return <IllustrationConnect rm={reducedMotion} />;
  if (step === 1) return <IllustrationLearn rm={reducedMotion} />;
  return <IllustrationAgents rm={reducedMotion} />;
}

/* ═══════════════════════ Workflow Steps ═══════════════════════ */

function WorkflowStepsSection({ reducedMotion }: { reducedMotion: boolean }) {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      num: "1",
      title: "Connect Your Tools",
      headline: "One teammate. All your systems.",
      desc: "Mantis connects to the tools you already use — POS, inventory, reservations, payroll, accounting, spreadsheets. It pulls everything into one place so you stop hunting across five dashboards and can just ask questions in plain English.",
      icon: Cpu,
      tags: ["POS & Inventory", "Payroll & HR", "Reservations", "Accounting", "Spreadsheets"],
    },
    {
      num: "2",
      title: "Synthesize your Environment",
      headline: "Map the Reality. Simulate the Future.",
      desc: "Overnight, Mantis runs thousands of scenarios using your actual sales, local signals, and team notes. It prepares recommendations for inventory, pricing, staffing levels, and ordering — ready for your review.",
      icon: Link2,
      tags: ["Weather & Local Events", "Your Sales History", "Knowledge Graph", "Demand Signals"],
    },
    {
      num: "3",
      title: "Review & Execute",
      headline: "Review the Logic. Approve. Move On.",
      desc: "By 6:00 AM your daily strategy is ready in one place. Review, tweak, or approve with one click. Mantis handles the execution — updating prices, sending orders, logging everything. Your team stays in the room; the busywork doesn't.",
      icon: Shield,
      tags: ["6 AM Daily Brief", "One-Click Approve", "HITL Governance", "Full Audit Trail"],
    },
  ];

  return (
    <section id="how" className="mx-auto max-w-7xl px-6 py-28">
      <div className="section-divider mb-28" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white">How it works</p>
        <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-w-cream sm:text-[40px]">
          Set it up. Let it learn. Approve the plan.
        </h2>
      <p className="mt-4 text-[16px] leading-relaxed text-w-text">
          Connect once. Sleep peacefully. Start every day with a clear plan.
        </p>
      </div>

      <div className="mx-auto mt-16 grid gap-10 lg:grid-cols-[280px_1fr] lg:gap-14">
        {/* Tabs */}
        <div className="flex flex-col gap-1">
          {steps.map((s, i) => (
            <button key={s.num} onClick={() => setActiveStep(i)}
              className={cx(
                "flex items-center gap-3 rounded-lg px-4 py-3.5 text-left transition-all duration-200",
                i === activeStep
                  ? "bg-w-bg-secondary border border-w-border-light"
                  : "border border-transparent hover:bg-w-bg-secondary/50"
              )}>
              <span className={cx(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[13px] font-bold transition-all duration-200",
                i === activeStep ? "bg-white text-w-bg" : "bg-w-card text-w-faint"
              )}>
                {s.num}
              </span>
              <span className={cx(
                "text-[14px] font-medium transition-colors duration-200",
                i === activeStep ? "text-w-cream" : "text-w-muted"
              )}>
                {s.title}
              </span>
            </button>
          ))}
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div key={activeStep}
            initial={reducedMotion ? false : { opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl border border-w-border bg-w-bg-secondary p-8 lg:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-white">
              Step {steps[activeStep].num}
            </div>
            <h3 className="mt-4 text-[24px] font-semibold leading-tight text-w-cream sm:text-[28px]">
              {steps[activeStep].headline}
            </h3>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-w-text">
              {steps[activeStep].desc}
            </p>

            {/* Tags */}
            <div className="mt-6 flex flex-wrap gap-2">
              {steps[activeStep].tags.map((tag) => (
                <span key={tag} className="rounded-full border border-w-border bg-w-bg px-3 py-1 text-[12px] text-w-muted">
                  {tag}
                </span>
              ))}
            </div>
            {/* Illustration */}
            <div className="mt-8 aspect-[16/6] w-full overflow-hidden rounded-lg border border-w-border bg-w-bg">
              <StepIllustration step={activeStep} reducedMotion={reducedMotion} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ═════════════════ Full Lifecycle Tabs ═════════════════ */

function LifecycleSection({ reducedMotion }: { reducedMotion: boolean }) {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { label: "Connect", icon: Cpu,
      heading: "Connects to What You Have",
      desc: "Mantis plugs directly into your existing tills, scanners, and software. It organizes your messy data automatically. No new hardware required.",
      features: [
        "Connects to your existing POS, inventory, reservations, payroll, and accounting tools",
        "One place to ask questions across all your systems instead of five dashboards",
        "Cloud by default. Optional private on-prem if you want it.",
        "You stay in control. No black boxes.",
      ],
    },
    { label: "Predict", icon: Brain,
      heading: "Predicts Tomorrow, Tonight",
      desc: "While you sleep, Mantis runs thousands of what-if scenarios using local weather, events, and your own customer patterns to build the perfect strategy for tomorrow.",
      features: [
        "Tests thousands of demand scenarios every night",
        "Factors in weather, local events, and seasonal trends",
        "Calculates exactly what to discount and what to reorder",
        "Delivers your daily strategy by 6:00 AM",
      ] },
    { label: "Control", icon: Shield,
      heading: "You Approve Everything",
      desc: "Mantis never changes a price or places an order without your clear, one-click approval. You stay in complete control of every decision.",
      features: [
        "Every recommendation waits for your approval",
        "Clear explanations for every suggestion",
        "Full record of every decision for your records",
        "One-click approve or adjust before anything happens",
      ] },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-28">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white">What&apos;s Under the Hood</p>
        <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-w-cream sm:text-[40px]">
          Smart technology. Simple for you.
        </h2>
      </div>

      {/* Tabs */}
      <div className="mx-auto mt-10 flex max-w-md items-center justify-center gap-1 rounded-lg border border-w-border bg-w-bg-secondary p-1">
        {tabs.map((tab, i) => (
          <button key={tab.label} onClick={() => setActiveTab(i)}
            className={cx(
              "flex items-center gap-2 rounded-md px-4 py-2 text-[13px] font-medium transition-all duration-200",
              i === activeTab ? "bg-w-card text-w-cream" : "text-w-muted hover:text-w-text"
            )}>
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={activeTab}
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className="mx-auto mt-8 max-w-5xl">
          <div className="rounded-xl border border-w-border bg-w-bg-secondary">
            <div className="grid gap-8 p-8 sm:p-10 lg:grid-cols-2 lg:gap-10">
              <div>
                <h3 className="text-[22px] font-semibold text-w-cream">{tabs[activeTab].heading}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-w-text">{tabs[activeTab].desc}</p>
              </div>
              <ul className="space-y-3">
                {tabs[activeTab].features.map((f, i) => (
                  <motion.li key={f}
                    initial={reducedMotion ? false : { opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-3 text-[14px] text-w-text">
                    <span className="mt-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/10">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                    {f}
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}


/* ═══════════════════════ CTA ═══════════════════════ */

function DemoForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [values, setValues] = useState({ name: "", email: "", company: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success") return;
    setStatus("loading");
    try {
      await new Promise((r) => setTimeout(r, 700));
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputClass = "w-full rounded-lg bg-w-bg px-4 py-2.5 text-[14px] text-w-cream placeholder:text-w-dim border border-w-border outline-none focus:border-white/40 transition-colors duration-200";

  return (
    <form onSubmit={onSubmit} className="mt-5 space-y-3">
      <div>
        <label className="text-[11px] font-medium text-w-faint" htmlFor="demo-name">Name</label>
        <input id="demo-name" name="name" autoComplete="name" required value={values.name}
          onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))} className={inputClass} placeholder="Your name" />
      </div>
      <div>
        <label className="text-[11px] font-medium text-w-faint" htmlFor="demo-email">Email</label>
        <input id="demo-email" name="email" type="email" autoComplete="email" required value={values.email}
          onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))} className={inputClass} placeholder="you@company.com" />
      </div>
      <div>
        <label className="text-[11px] font-medium text-w-faint" htmlFor="demo-company">Company</label>
        <input id="demo-company" name="company" autoComplete="organization" required value={values.company}
          onChange={(e) => setValues((v) => ({ ...v, company: e.target.value }))} className={inputClass} placeholder="Company name" />
      </div>
      <button type="submit" disabled={status === "loading" || status === "success"}
        className={cx("w-full rounded-lg bg-white px-4 py-2.5 text-[14px] font-medium text-w-bg hover:bg-white/85 transition-colors",
          (status === "loading") && "opacity-70")}>
        {status === "loading" ? "Submitting…" : status === "success" ? "Request received ✓" : "Submit"}
      </button>
      <div aria-live="polite" className="min-h-[14px]">
        {status === "error" && <p className="text-[11px] text-red-400">Something went wrong. Please try again.</p>}
        {status === "success" && <p className="text-[11px] text-white">Thanks, we&apos;ll reach out shortly.</p>}
      </div>
      <p className="text-[11px] text-w-dim">By submitting, you agree to be contacted by Mantis AI.</p>
    </form>
  );
}

function CTASection() {
  return (
    <section id="cta" className="relative mx-auto max-w-7xl overflow-hidden px-6 pb-28 pt-10">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
        <div className="h-[280px] w-[800px] rounded-full bg-white/[0.025] blur-[80px]" />
      </div>
      <div className="relative overflow-hidden rounded-xl border border-w-border bg-w-bg-secondary">
        {/* Top gradient accent line */}
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        <div className="grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:p-14">
          <div>
            <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-w-cream sm:text-[36px]">
              Want better margins?
            </h2>
            <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-w-text">
              Join independents who stopped guessing. Connect the tools you already use and get one
              conversational teammate that learns your business and helps you run it better.
            </p>
          </div>

          <div className="rounded-xl border border-w-border bg-w-bg p-6">
            <h3 className="text-[16px] font-semibold text-w-cream">Book a demo</h3>
            <p className="mt-1 text-[12px] text-w-muted">Tell us about your business. We&apos;ll reach out within a day.</p>
            <DemoForm />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════ Results / Impact (Nory-inspired) ══════════════ */

function ResultsSection() {
  const metrics = [
    { label: "Inventory & Spoilage", value: "Up to 50%", sub: "Reduction in food & stock waste" },
    { label: "Margins", value: "+3–5 pts", sub: "Typical gross margin lift in 60 days" },
    { label: "Admin Time", value: "60–100 hrs", sub: "Saved per month on forecasting & ordering" },
    { label: "Forecast Accuracy", value: "96–99%", sub: "Daily demand prediction" },
  ];
  return (
    <section id="results" className="mx-auto max-w-7xl px-6 py-20">
      <div className="section-divider mb-16" />
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-[12px] font-semibold uppercase tracking-[0.15em] text-white">Results you can take to the bank</p>
        <h2 className="mt-4 text-[32px] font-semibold leading-tight tracking-tight text-w-cream sm:text-[40px]">
          Thicken up the thinnest of margins.
        </h2>
        <p className="mt-4 text-[16px] leading-relaxed text-w-text">
          Across inventory, pricing, and daily operations — run with the precision of a chain and the soul of an independent.
        </p>
      </div>

      <div className="mx-auto mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-xl border border-w-border bg-w-bg-secondary p-7">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-w-faint">{m.label}</div>
            <div className="mt-3 text-[36px] font-semibold tabular-nums text-w-cream leading-none">{m.value}</div>
            <div className="mt-2 text-[14px] text-w-muted">{m.sub}</div>
          </div>
        ))}
      </div>

      <p className="mx-auto mt-8 max-w-2xl text-center text-[13px] text-w-muted">
        Built by operators, for operators. Every number grounded in your actual sales, weather, events, and local reality — never industry averages.
      </p>
    </section>
  );
}

/* ══════════════ Step Illustrations ══════════════ */

function Footer() {
  const columns = [
    { title: "Platform", links: ["Edge Ingestion", "Swarm Simulator", "Federated Hive Mind", "HITL Governance"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
    { title: "Resources", links: ["Documentation", "API Reference", "Security", "Status"] },
    { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy"] },
  ];

  return (
    <footer className="border-t border-w-border">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <MantisLogo />
              <span className="text-[17px] font-semibold text-w-cream">Mantis AI</span>
            </div>
            <p className="mt-3 max-w-xs text-[13px] leading-relaxed text-w-muted">
              The agentic operating system for independent businesses. A crew of AI assistants that forecast demand,
              plan labor and staffing, manage ordering, and keep your P&amp;L on track — so you can focus on the food, the team, and the guests.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-w-faint">{col.title}</h4>
              <ul className="mt-3 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}><a href="#" className="text-[13px] text-w-muted hover:text-w-cream transition-colors">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-w-border pt-6 sm:flex-row">
          <p className="text-[12px] text-w-faint">© {new Date().getFullYear()} Mantis AI. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <a key={l} href="#" className="text-[12px] text-w-faint hover:text-w-muted transition-colors">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════ Main Export ═══════════════════════ */

export default function MantisAILanding() {
  const reducedMotion = usePrefersReducedMotion();

  const scrollTo = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    },
    [reducedMotion]
  );

  return (
    <div className="min-h-screen bg-w-bg text-w-cream">
      <AnnouncementBanner />
      <Navbar scrollTo={scrollTo} />
      <main>
        <HeroSection reducedMotion={reducedMotion} scrollTo={scrollTo} />
<NewWaySection reducedMotion={reducedMotion} />
        <CapabilitiesSection reducedMotion={reducedMotion} />
        <ResultsSection />
        <WorkflowStepsSection reducedMotion={reducedMotion} />
        <LifecycleSection reducedMotion={reducedMotion} />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
