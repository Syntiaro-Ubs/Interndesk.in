/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ArrowRight, Trophy, GraduationCap, Building2, Terminal } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const stats = [
    { icon: GraduationCap, count: '15,000+', label: 'Interns Trained' },
    { icon: Trophy, count: '4.8/5', label: 'Average rating' },
    { icon: Building2, count: '120+', label: 'Hiring Partners' },
    { icon: Terminal, count: '500+', label: 'Products Delivered' }
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-teal-50/50 via-white to-slate-50/50 pt-32 pb-16 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] -mr-40 -mt-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -ml-40 -mb-20 pointer-events-none" />
      
      {/* Mesh lines effect */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero text */}
          <div className="lg:col-span-7 flex flex-col items-start text-left" id="hero-text-container">
            {/* Animated Announcement Capsule */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              id="hero-badge"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-50 to-teal-100/80 border border-teal-200/60 px-3.5 py-1.5 rounded-full mb-6 cursor-pointer hover:bg-teal-100 transition-all group"
              onClick={() => onNavigate('about')}
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600"></span>
              </span>
              <span className="text-xs font-mono font-semibold text-teal-800">
                Formerly Zidio Development
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-teal-700 group-hover:translate-x-1 transition-transform" />
            </motion.div>

            {/* Title / Header */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              id="hero-headline"
              className="text-4xl sm:text-5xl lg:text-6xl font-sans font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6"
            >
              Empowering Innovation,{' '}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-600 via-emerald-600 to-teal-700">
                Shaping Technical Careers
              </span>
            </motion.h1>

            {/* Description Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              id="hero-summary"
              className="text-slate-600 text-lg sm:text-xl leading-relaxed mb-8 max-w-2xl"
            >
              InternDesk is a premier technology partner and software development firm. We engineered global digital products while offering state-of-the-art Virtual Internship Programs to scale future-ready developer competencies.
            </motion.p>

            {/* Floating Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              id="hero-actions"
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-12"
            >
              <button
                id="hero-cta-primary"
                onClick={() => onNavigate('internships')}
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all transform hover:-translate-y-0.5 shadow-lg shadow-teal-600/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                Explore Internships
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                id="hero-cta-secondary"
                onClick={() => onNavigate('services')}
                className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300 px-8 py-3.5 rounded-xl font-bold tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                Our IT Services
              </button>
            </motion.div>

            {/* Stat Counters Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              id="hero-stats-grid"
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full border-t border-slate-200/80 pt-8"
            >
              {stats.map((stat, i) => {
                const IconComp = stat.icon;
                return (
                  <div key={i} className="flex flex-col items-start" id={`hero-stat-${i}`}>
                    <div className="flex items-center gap-1.5 text-teal-600 mb-1">
                      <IconComp className="w-4 h-4 text-teal-600" />
                      <span className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                        {stat.count}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold font-mono">
                      {stat.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>

          {/* Hero visual graphic representation */}
          <div className="lg:col-span-5 relative hidden lg:block" id="hero-graphic-container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full aspect-square flex items-center justify-center"
            >
              {/* Spinning planetary gears effect */}
              <div className="absolute w-72 h-72 border border-teal-500/5 rounded-full animate-[spin_40s_linear_infinite] pointer-events-none" />
              <div className="absolute w-96 h-96 border border-blue-500/5 rounded-full animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />
              
              {/* Glow center */}
              <div className="absolute w-64 h-64 bg-teal-500/5 rounded-full blur-[80px]" />

              {/* Central Code Hub */}
              <div className="relative bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xl w-80 mb-6 backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 bg-red-400 rounded-full inline-block" />
                    <span className="w-2.5 h-2.5 bg-yellow-400 rounded-full inline-block" />
                    <span className="w-2.5 h-2.5 bg-green-400 rounded-full inline-block" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">server.ts</span>
                </div>
                <div className="font-mono text-xs text-slate-600 space-y-2.5">
                  <p className="text-teal-700"><span className="text-teal-600">const</span> startup = <span className="text-teal-600 font-semibold">new</span> <span className="text-slate-800 font-bold">SoftwareHouse</span>();</p>
                  <p className="pl-3 text-slate-400 italic">// Initialize system params</p>
                  <p className="pl-3">startup.<span className="text-teal-600 font-medium">setName</span>(<span className="text-slate-800">"InternDesk"</span>);</p>
                  <p className="pl-3">startup.<span className="text-teal-600 font-medium">setQuality</span>(<span className="text-slate-800">"Enterprise"</span>);</p>
                  <p className="pl-3">startup.<span className="text-teal-600 font-medium">enableGlobalSupport</span>();</p>
                  <p className="pl-3 text-emerald-600 font-medium">await startup.<span className="text-teal-600">launchCareer</span>();</p>
                  <p className="text-teal-700"><span className="text-teal-600">export default</span> startup;</p>
                </div>
              </div>

              {/* Floating Element 1 - Alumni Badge */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                className="absolute top-12 left-2 bg-white/95 border border-teal-100 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-700 font-bold">
                  92%
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-950 tracking-tight">Placement Rate</span>
                  <span className="text-[9px] text-slate-500 uppercase font-semibold">Post Graduation</span>
                </div>
              </motion.div>

              {/* Floating Element 2 - Project Badge */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'easeInOut', delay: 0.5 }}
                className="absolute bottom-16 right-4 bg-white/95 border border-slate-100 px-4 py-2.5 rounded-xl shadow-lg flex items-center gap-2.5 backdrop-blur-md"
              >
                <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                  24/7
                </div>
                <div className="flex flex-col">
                  <span className="text-[11px] font-bold text-slate-950 tracking-tight">Global Support</span>
                  <span className="text-[9px] text-slate-500 uppercase font-semibold">Active Monitoring</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
