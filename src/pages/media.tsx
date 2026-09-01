<<<<<<< HEAD
<<<<<<< HEAD
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Bus,
  CalendarDays,
  Check,
  ChevronRight,
  Cloud,
  Download,
  ExternalLink,
  Globe2,
  MapPin,
  Menu,
  Newspaper,
  Quote,
  Route,
  School,
  ShieldCheck,
  Sparkles,
  TrainFront,
  Users,
  X,
} from "lucide-react";

const BRAND = {
  primary: "#1ea2b1",
  secondary: "#ed67b1",
  accent: "#f8c325",
  highlight: "#fd602d",
};

const LOGO_SRC = "/lovable-uploads/e9056cae-b62d-4515-aae1-ac0e16261d24.png";

const articles = [
  {
    publication: "UWC News",
    date: "13 April 2026",
    title: "UWC alumni take homegrown transport app from local commutes to global stage",
    summary:
      "UWC highlights how Makhi Mangxola and Shaqeel Less created Uthutho to help commuters navigate unclear routes, uncertain fares and limited real-time travel information.",
    tag: "University feature",
    accent: BRAND.primary,
    url: "https://www.uwc.ac.za/news-and-announcements/news/uwc-alumni-take-homegrown-transport-app-from-local-commutes-to-global-stage",
  },
  {
    publication: "Startup Magazine South Africa",
    date: "23 March 2026",
    title: "From local commute to Silicon Valley: Uthutho crowned South Africa’s champion",
    summary:
      "The publication covers Uthutho’s Red Bull Basement South Africa win and its vision for a community-powered interface bringing taxi, bus and train information together.",
    tag: "Startup spotlight",
    accent: BRAND.secondary,
    url: "https://startupmag.co.za/2026/03/from-local-commute-to-silicon-valley-uthutho-crowned-south-africas-red-bull-basement-champion/",
  },
  {
    publication: "Weekend Argus / Pretoria News",
    date: "17 April 2026",
    title: "Meet the UWC graduates revolutionising South Africa’s public transport with Uthutho",
    summary:
      "A profile of the founders, the platform’s live journey updates and community-verified information, as well as its support for school transport operators and parents.",
    tag: "Founder story",
    accent: BRAND.highlight,
    url: "https://pretorianews.co.za/weekend-argus/2026-04-17-meet-the-uwc-graduates-revolutionising-south-africas-public-transport-with-uthutho/",
  },
];

const features = [
  {
    icon: Route,
    title: "Clearer journeys",
    text: "Discover transport information that helps make unfamiliar routes easier to understand.",
    color: BRAND.primary,
  },
  {
    icon: MapPin,
    title: "Live travel context",
    text: "Use GPS-enabled updates and community input to make everyday commuting more predictable.",
    color: BRAND.secondary,
  },
  {
    icon: Users,
    title: "Community powered",
    text: "Build more useful transport information through updates shared and verified by commuters.",
    color: BRAND.accent,
  },
  {
    icon: School,
    title: "School transport",
    text: "Help parents browse listed operators, routes, vehicles and pricing options in one place.",
    color: BRAND.highlight,
  },
];

const timeline = [
  {
    date: "Late 2025",
    title: "Uthutho takes shape",
    text: "The platform is developed in response to unclear taxi routes, uncertain fares and limited real-time transport information.",
    color: BRAND.primary,
  },
  {
    date: "March 2026",
    title: "National recognition",
    text: "Uthutho is named the 2026 Red Bull Basement South Africa national champion.",
    color: BRAND.secondary,
  },
  {
    date: "April 2026",
    title: "The story gains momentum",
    text: "UWC News and South African publications profile the founders, the platform and its potential impact.",
    color: BRAND.accent,
  },
  {
    date: "1 to 3 June 2026",
    title: "Taking South African innovation global",
    text: "The team is scheduled to showcase Uthutho at the Red Bull Basement World Final in San Francisco and Silicon Valley.",
    color: BRAND.highlight,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">
      <Sparkles className="h-3.5 w-3.5" />
      {children}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All coverage");

  const filters = ["All coverage", "University feature", "Startup spotlight", "Founder story"];
  const filteredArticles = useMemo(
    () =>
      activeFilter === "All coverage"
        ? articles
        : articles.filter((article) => article.tag === activeFilter),
    [activeFilter]
  );

  const downloadPressPage = () => {
    window.print();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#050809] text-white selection:bg-cyan-300 selection:text-black">
      <style>{`
        :root { color-scheme: dark; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #050809; }
        @media print {
          nav, .no-print { display: none !important; }
          body, #uthutho-media-page { background: #050809 !important; print-color-adjust: exact; -webkit-print-color-adjust: exact; }
          section { break-inside: avoid; }
        }
      `}</style>

      <div id="uthutho-media-page">

        <main id="top">
          <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-20">
            <div className="absolute inset-0">
              <div className="absolute -left-40 top-24 h-[520px] w-[520px] rounded-full bg-cyan-400/15 blur-[120px]" />
              <div className="absolute -right-40 bottom-0 h-[560px] w-[560px] rounded-full bg-pink-500/15 blur-[140px]" />
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.25) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.25) 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
            </div>

            <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-5 py-24 md:px-8 lg:grid-cols-[1.1fr_.9fr]">
              <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.65 }}>
                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-200">
                  <Award className="h-4 w-4" />
                  2026 Red Bull Basement South Africa winner
                </div>

                <h1 className="max-w-4xl text-5xl font-black leading-[0.96] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
                  Moving people.
                  <span className="block bg-gradient-to-r from-cyan-300 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    Connecting communities.
                  </span>
                </h1>

                <p className="mt-8 max-w-2xl text-lg leading-8 text-white/62 md:text-xl">
                  Uthutho is a South African public transport platform created to make everyday journeys clearer, safer and more predictable through live and community-powered information.
                </p>

                <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                  <a href="#coverage" className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-black transition hover:bg-cyan-200">
                    Explore press coverage <ArrowRight className="h-4 w-4" />
                  </a>
                  <a href="#story" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-6 py-3.5 font-bold text-white transition hover:bg-white/10">
                    Discover Uthutho
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.92, rotate: 2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.75, delay: 0.12 }}
                className="relative"
              >
                <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-400/25 via-pink-500/10 to-orange-400/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-br from-[#10282c] to-[#111014] p-6 shadow-2xl">
                  <div className="mb-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#fd602d]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f8c325]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[#1ea2b1]" />
                    </div>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/45">Community mobility</span>
                  </div>

                  <div className="rounded-[2rem] border border-white/10 bg-black/35 p-7">
                    <div className="mb-8 flex items-center gap-4">
                      <div className="rounded-2xl bg-white p-3">
                        <img src={LOGO_SRC} alt="Uthutho" className="h-10 w-auto" />
                      </div>
                      <div>
                        <p className="font-bold">Plan your journey</p>
                        <p className="text-sm text-white/45">Cape Town, South Africa</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {[
                        { icon: Bus, label: "Taxi and bus routes", color: BRAND.primary },
                        { icon: TrainFront, label: "Connected travel options", color: BRAND.secondary },
                        { icon: ShieldCheck, label: "Community-verified updates", color: BRAND.accent },
                      ].map(({ icon: Icon, label, color }) => (
                        <div key={label} className="flex items-center justify-between rounded-2xl border border-white/8 bg-white/[0.04] p-4">
                          <div className="flex items-center gap-3">
                            <div className="rounded-xl p-2" style={{ backgroundColor: `${color}22`, color }}><Icon className="h-5 w-5" /></div>
                            <span className="text-sm font-medium">{label}</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-white/25" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

      

        

         

          <section id="coverage" className="mx-auto max-w-7xl px-5 py-28 md:px-8">
            <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
              <div className="max-w-3xl">
                <SectionLabel>In the news</SectionLabel>
                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">The Uthutho story, covered across South Africa.</h2>
              </div>
              <div className="flex max-w-full gap-2 overflow-x-auto pb-2 no-print">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                      activeFilter === filter ? "bg-white text-black" : "border border-white/10 bg-white/[0.03] text-white/55 hover:text-white"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {filteredArticles.map((article, index) => (
                <motion.article
                  layout
                  key={article.title}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                  className="group flex min-h-[430px] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]"
                >
                  <div className="relative h-40 overflow-hidden p-6" style={{ background: `linear-gradient(135deg, ${article.accent}33, #0a0e10 72%)` }}>
                    <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full border border-white/10" />
                    <div className="absolute right-8 top-8 h-16 w-16 rounded-full border border-white/10" />
                    <Newspaper className="absolute bottom-6 left-6 h-10 w-10" style={{ color: article.accent }} />
                    <span className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-white/60">
                      {article.tag}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-7">
                    <div className="flex items-center justify-between gap-4 text-xs text-white/38">
                      <span className="font-semibold uppercase tracking-wider" style={{ color: article.accent }}>{article.publication}</span>
                      <span>{article.date}</span>
                    </div>
                    <h3 className="mt-5 text-xl font-bold leading-7">{article.title}</h3>
                    <p className="mt-4 flex-1 text-sm leading-6 text-white/48">{article.summary}</p>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-white transition group-hover:text-cyan-300"
                    >
                      Read original article <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                </motion.article>
              ))}
            </div>
          </section>

          

          <section id="journey" className="border-y border-white/10 bg-[#091012] py-28">
            <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-8 lg:grid-cols-[.7fr_1.3fr]">
              <div>
                <SectionLabel>The journey</SectionLabel>
                <h2 className="text-4xl font-black tracking-[-0.04em] md:text-6xl">From a local challenge to a global stage.</h2>
                <p className="mt-6 max-w-lg leading-7 text-white/48">A focused timeline of the milestones documented in public coverage of Uthutho.</p>
              </div>
              <div className="relative space-y-4 before:absolute before:bottom-5 before:left-[19px] before:top-5 before:w-px before:bg-white/10">
                {timeline.map((item, index) => (
                  <motion.div
                    key={item.date}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp}
                    transition={{ delay: index * 0.08 }}
                    className="relative grid grid-cols-[40px_1fr] gap-5"
                  >
                    <div className="relative z-10 mt-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-[#091012]">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    </div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-6">
                      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: item.color }}>
                        <CalendarDays className="h-4 w-4" /> {item.date}
                      </div>
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-white/48">{item.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <footer id="contact" className="border-t border-white/10 bg-[#030506]">
          <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
            <div className="grid gap-12 md:grid-cols-[1fr_auto] md:items-end">
              <div>
                <div className="mb-6 flex items-center gap-3">
                  <div className="rounded-xl bg-white p-2"><img src={LOGO_SRC} alt="Uthutho" className="h-7 w-auto" /></div>
                  <p className="text-xl font-black">UTHUTHO</p>
                </div>
                <h2 className="max-w-2xl text-3xl font-black tracking-tight md:text-5xl">Let’s move the story forward.</h2>
                <p className="mt-5 text-white/45">For press, partnership and platform enquiries, contact the Uthutho team through the official website.</p>
              </div>
              <a href="mailto:brand@uthutho.com" className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-400 px-6 py-3.5 font-bold text-black transition hover:bg-cyan-300">
                Contact Uthutho <ArrowRight className="h-4 w-4" />
              </a>
            </div>
            <div className="mt-16 flex flex-col justify-between gap-3 border-t border-white/10 pt-7 text-xs text-white/32 md:flex-row">
              <p>© 2026 Uthutho. Media and press page.</p>
              <p>Transport information. Community connection. Smarter journeys.</p>
            </div>
          </div>
        </footer>
=======
import React, { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
  type Transition,
} from 'framer-motion';
import {
  ArrowRight,
  ExternalLink,
  Trophy,
  GraduationCap,
  Mic,
  ChevronDown,
} from 'lucide-react';
=======
import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
>>>>>>> 8113749 (Media page commit)

const MediaPage: React.FC = () => {
  const colors = [
    { name: 'Primary', hex: '#1ea2b1', className: 'bg-primary', usage: 'Buttons, links, key UI elements' },
    { name: 'Secondary', hex: '#ed67b1', className: 'bg-secondary', usage: 'Highlights, accents, icons' },
    { name: 'Accent', hex: '#f8c325', className: 'bg-accent', usage: 'Warnings, notifications, energy' },
    { name: 'Highlight', hex: '#fd602d', className: 'bg-highlight', usage: 'Calls-to-action, important alerts' },
  ];

  const downloadPdf = async () => {
    const input = document.getElementById('media-page');
    if (!input) return;

    try {
      // Show loading state (you can add a loading spinner UI)
      const canvas = await html2canvas(input, {
        backgroundColor: '#000000',
        scale: 2,
        logging: false,
        allowTaint: false,
        useCORS: true,
        windowWidth: 1200, // Fixed width for consistency
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'px',
        format: [canvas.width * 0.75, canvas.height * 0.75]
      });
      
      pdf.setFillColor(0, 0, 0);
      pdf.rect(0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight(), 'F');
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      pdf.save('uthutho-brand-guide.pdf');
    } catch (error) {
      console.error('PDF generation failed:', error);
    }
  };

  return (
    <div 
      id="media-page" 
      className="min-h-screen bg-black text-white"
    >
      {/* Simple Header */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-light tracking-tight mb-2">
                Uthutho Brand Kit
              </h1>
              <p className="text-gray-400 text-sm">
                Everything you need for consistent brand representation
              </p>
            </div>
            <button
              onClick={downloadPdf}
              className="bg-primary text-black px-6 py-3 rounded text-sm font-medium hover:bg-opacity-90 transition-colors inline-flex items-center justify-center gap-2 w-full md:w-auto"
            >
              <span>↓</span>
              Download Brand Guide (PDF)
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Logo Section - Simple and Clean */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Logo</h2>
          <div className="bg-gray-900 rounded-lg p-8">
            <div className="flex flex-col md:flex-row items-start gap-8">
              <div className="bg-gray-800 p-8 rounded-lg flex items-center justify-center w-full md:w-auto">
                <img 
                  src="/lovable-uploads/e9056cae-b62d-4515-aae1-ac0e16261d24.png" 
                  alt="Uthutho Logo" 
                  className="h-16 w-auto"
                />
              </div>
              <div className="space-y-3">
                <p className="text-gray-300 text-sm leading-relaxed max-w-xl">
                  Our logo represents connection and movement. Always maintain clear space around it equal to the height of the 'U'.
                </p>
                <div className="flex gap-3">
                  <a href="#" className="text-primary text-sm hover:underline">Download PNG →</a>
                  <a href="#" className="text-gray-400 text-sm hover:underline">Download SVG →</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colors - Simple Grid */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Colors</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {colors.map((color) => (
              <div key={color.name} className="bg-gray-900 rounded-lg overflow-hidden">
                <div className={`h-24 ${color.className}`} />
                <div className="p-4">
                  <p className="font-medium text-sm">{color.name}</p>
                  <p className="text-gray-400 text-xs mt-1">{color.hex}</p>
                  <p className="text-gray-500 text-xs mt-2">{color.usage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
<<<<<<< HEAD
>>>>>>> b4726a8 (Some changes i feel like we should go with)
=======

        {/* Typography - Clean Examples */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Typography</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <p className="text-xs text-gray-500 mb-2">HEADING — QUAPIO</p>
                <p className="text-3xl font-bold">Uthutho Commute</p>
                <p className="text-3xl font-bold mt-1">Making travel simpler</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">SUBHEADING — PLAYFAIR</p>
                <p className="text-xl font-serif">Smart commuting for everyone</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">BODY — INTER</p>
                <p className="text-sm text-gray-300 max-w-2xl">
                  Uthutho provides real-time public transport information to help communities navigate their daily commute with confidence.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Signature - Practical Example */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Email Signature</h2>
          <div className="bg-gray-900 rounded-lg p-6">
            <p className="text-xs text-gray-500 mb-4">Copy this template for your email signature:</p>
            
            {/* Email Signature Example */}
            <div className="border-l-4 border-primary pl-4 py-2 bg-gray-800 rounded-r-lg">
              <div className="flex items-start gap-4">
                <img 
                  src="/lovable-uploads/e9056cae-b62d-4515-aae1-ac0e16261d24.png" 
                  alt="Uthutho" 
                  className="h-8 w-auto"
                />
                <div className="text-sm">
                  <p className="font-bold">Your Name</p>
                  <p className="text-primary text-xs">Job Title</p>
                  <p className="text-gray-400 text-xs mt-2">✉︎ your.name@uthutho.com</p>
                  <p className="text-gray-400 text-xs">✆ +27 123 456 789</p>
                  <p className="text-gray-500 text-xs mt-2">www.uthutho.com • Cape Town</p>
                </div>
              </div>
            </div>

            {/* HTML Code */}
            <div className="mt-6">
              <p className="text-xs text-gray-500 mb-2">HTML template:</p>
              <pre className="bg-gray-800 p-4 rounded text-xs text-gray-300 overflow-x-auto">
{`<table style="font-family: Inter, sans-serif;">
  <tr>
    <td><img src="logo-url.png" height="32"></td>
    <td style="padding-left: 16px;">
      <strong>Your Name</strong><br>
      <span style="color: #1ea2b1;">Job Title</span><br>
      <span style="color: #666;">your.name@uthutho.com</span>
    </td>
  </tr>
</table>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Brand Voice - Simple Guidelines */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Brand Voice</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-xs text-gray-500 mb-3">DO</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✓ Be clear and straightforward</li>
                <li>✓ Use inclusive language</li>
                <li>✓ Focus on solutions</li>
                <li>✓ Keep it professional but warm</li>
              </ul>
            </div>
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-xs text-gray-500 mb-3">DON'T</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>✗ Use jargon or technical terms</li>
                <li>✗ Be overly casual</li>
                <li>✗ Make promises we can't keep</li>
                <li>✗ Ignore accessibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media Assets */}
        <div className="mb-12">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Social Assets</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Profile Picture</p>
              <div className="bg-gray-800 w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center">
                <img src="/lovable-uploads/e9056cae-b62d-4515-aae1-ac0e16261d24.png" alt="Logo" className="h-8 w-auto" />
              </div>
              <a href="#" className="text-primary text-xs block text-center">Download →</a>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Cover Photo</p>
              <div className="bg-gray-800 w-full h-16 rounded mb-3 flex items-center justify-center text-gray-600 text-xs">
                1500 x 500px
              </div>
              <a href="#" className="text-primary text-xs block text-center">Download →</a>
            </div>
            <div className="bg-gray-900 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Favicon</p>
              <div className="bg-gray-800 w-12 h-12 rounded mx-auto mb-3 flex items-center justify-center">
                <span className="text-primary font-bold">U</span>
              </div>
              <a href="#" className="text-primary text-xs block text-center">Download →</a>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="border-t border-gray-800 pt-8 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center text-sm">
            <div>
              <p className="text-gray-400">Questions? Contact our brand team:</p>
              <p className="text-primary mt-1">brand@uthutho.com</p>
            </div>
            <p className="text-gray-600 text-xs mt-4 md:mt-0">© 2024 Uthutho • Version 1.0</p>
          </div>
        </div>
>>>>>>> 8113749 (Media page commit)
      </div>
    </div>
  );
}

<<<<<<< HEAD
<<<<<<< HEAD
export default App;
=======
/* ============================================================
   SAMSUNG-STYLE QUICK REVEAL SECTION
   Snappy, interruptible reveals like One UI
   ============================================================ */

const SamsungRevealSection: React.FC = () => {
  const prefersReduced = useReducedMotion();

  return (
    <section className="relative bg-secondary/40 overflow-hidden">
      <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <SceneHeader
          eyebrow="Recognition"
          title="Awarded for"
          accentWord="impact"
          accentColor={ORANGE}
        />

        <motion.div
          initial={prefersReduced ? false : 'hidden'}
          whileInView={prefersReduced ? undefined : 'visible'}
          viewport={viewportOnce}
          variants={stagger(0.1)}
          className="grid gap-6 md:grid-cols-3"
        >
          {[
            {
              icon: Trophy,
              label: 'Red Bull Basement',
              value: 'National Champion',
              detail: 'South Africa 2026',
              color: ORANGE,
            },
            {
              icon: Mic,
              label: 'News24 Podcast',
              value: 'Featured Guest',
              detail: 'The Odds in Our Favour',
              color: PINK,
            },
            {
              icon: GraduationCap,
              label: 'UWC Feature',
              value: 'Alumni Spotlight',
              detail: 'Future Innovation Lab',
              color: TEAL,
            },
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.97 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      ...ONE_UI_TRANSITION,
                      delay: i * 0.08,
                    },
                  },
                }}
              >
                <MagneticCard className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-6 text-center">
                  <div
                    className="size-14 rounded-full mx-auto flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.color}15` }}
                  >
                    <Icon className="size-7" style={{ color: item.color }} />
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-muted-foreground mb-2">
                    {item.label}
                  </p>
                  <p className="font-display text-xl font-extrabold text-foreground">
                    {item.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">
                    {item.detail}
                  </p>
                </MagneticCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

/* ============================================================
   MEDIA PAGE
   ============================================================ */

const MediaPage: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const heroY = useTransform(heroScroll, [0, 1], [0, 120]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  return (
    <div className="bg-background text-foreground">
      <Navbar />

      <main>
        {/* APPLE-STYLE HERO with parallax exit */}
        <section
          ref={heroRef}
          className="relative min-h-[70vh] w-full overflow-hidden bg-background flex items-center justify-center pt-24 pb-16"
        >
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-background via-black to-background"></div>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                  'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
                backgroundSize: '48px 48px',
              }}
            />
          </div>

          <motion.div
            style={
              prefersReduced ? undefined : { y: heroY, opacity: heroOpacity }
            }
            className="container mx-auto px-4 sm:px-6 relative z-10"
          >
            <SceneHeader
              eyebrow="Press & Media"
              title="Uthutho in the"
              accentWord="news"
              accentColor={TEAL}
              description="From Cape Town commutes to the global stage. Here's what the press is saying about Uthutho — the community-powered platform turning commuters into a live GPS network."
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={ONE_UI_TRANSITION}
              className="flex flex-wrap justify-center gap-4"
            >
              <a
                href="https://www.mobile.uthutho.co.za/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center rounded-full bg-brand-green px-6 py-3 text-lg font-semibold text-white transition-colors hover:bg-brand-green/80"
              >
                Try the app
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="#press-coverage"
                className="group inline-flex items-center justify-center rounded-full border border-border bg-secondary/60 px-6 py-3 text-lg font-semibold text-foreground transition-colors hover:bg-secondary/80"
              >
                Read the coverage
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* APPLE-STYLE STICKY SCROLL COVERAGE */}
        <section id="press-coverage">
          <AppleScrollSection />
        </section>

        {/* SAMSUNG-STYLE RECOGNITION */}
        <SamsungRevealSection />

        {/* AWARD CALLOUT */}
        <section className="relative bg-background overflow-hidden">
          <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
            <motion.div
              initial={prefersReduced ? false : 'hidden'}
              whileInView={prefersReduced ? undefined : 'visible'}
              viewport={viewportOnce}
              variants={scaleIn}
              className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-8 sm:p-12 text-center"
            >
              <motion.div
                variants={stagger(0.08)}
                initial={prefersReduced ? false : 'hidden'}
                whileInView={prefersReduced ? undefined : 'visible'}
                viewport={viewportOnce}
              >
                <motion.div
                  variants={rise}
                  className="flex justify-center mb-6"
                >
                  <div
                    className="size-16 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: `${ORANGE}15` }}
                  >
                    <Trophy className="size-8" style={{ color: ORANGE }} />
                  </div>
                </motion.div>

                <motion.p
                  variants={rise}
                  className="text-[11px] font-bold uppercase tracking-[0.2em] mb-3"
                  style={{ color: ORANGE }}
                >
                  Red Bull Basement 2026
                </motion.p>

                <motion.h2
                  variants={riseLg}
                  className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground"
                >
                  South African National Champion
                </motion.h2>

                <motion.p
                  variants={rise}
                  className="mt-4 text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
                >
                  Uthutho represented South Africa at the World Finals in San
                  Francisco against winners from 40+ countries, competing for
                  $100,000 in equity-free funding .
                </motion.p>

                <motion.div
                  variants={rise}
                  className="mt-8 flex flex-wrap justify-center gap-3"
                >
                  <a
                    href="https://www.redbull.com/za-en/red-bull-basement-south-africa-2026-winner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                    style={{ backgroundColor: TEAL }}
                  >
                    Read the announcement
                    <ExternalLink className="size-4" />
                  </a>
                  <a
                    href="https://www.uwc.ac.za/news-and-announcements/news/uwc-alumni-take-homegrown-transport-app-from-local-commutes-to-global-stage"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-secondary/80"
                  >
                    <GraduationCap className="size-4" />
                    UWC feature
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* PRESS CONTACT */}
        <section className="bg-background">
          <div className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 text-center">
            <SceneHeader
              eyebrow="Media Enquiries"
              title="Get in"
              accentWord="touch"
              accentColor={TEAL}
            />

            <motion.div
              initial={prefersReduced ? false : { opacity: 0, y: 16 }}
              whileInView={prefersReduced ? undefined : { opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={ONE_UI_TRANSITION}
              className="rounded-[1.75rem] bg-card border border-border/60 shadow-xl p-8 sm:p-10 max-w-xl mx-auto"
            >
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                For press enquiries, interviews, or brand assets, reach out to
                the Uthutho team directly.
              </p>
              <a
                href="mailto:brand@uthutho.com"
                className="mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition-colors hover:opacity-90"
                style={{ backgroundColor: TEAL }}
              >
                brand@uthutho.com
                <ArrowRight className="size-4" />
              </a>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MediaPage;
>>>>>>> b4726a8 (Some changes i feel like we should go with)
=======
export default App;
>>>>>>> 8113749 (Media page commit)
