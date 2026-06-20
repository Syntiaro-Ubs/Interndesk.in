/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Internships from './components/Internships';
import CertificateVerification from './components/CertificateVerification';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Sparkles, Star, Users, Briefcase, Award, TrendingUp, Handshake, CheckCircle } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Trigger smooth scroll or page shift
  const handlePageChange = (pageId: string) => {
    setCurrentPage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen selection:bg-teal-500 selection:text-slate-950 antialiased font-sans">
      {/* Top sticky logo navigation */}
      <Navbar onNavigate={handlePageChange} currentPage={currentPage} />

      {/* Main Multi-Page Router Stage */}
      <main className="pt-20 md:pt-28 min-h-[calc(100vh-320px)] flex flex-col">
        {currentPage === 'home' ? (
          <div id="home-view-container" className="flex flex-col">
            {/* Integrated Hero Area */}
            <Hero onNavigate={handlePageChange} />

            {/* Trusted Enterprise Partners slider */}
            <section className="py-10 bg-slate-950 border-y border-white/5 overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block mb-6">
                  Trusted by 100+ Enterprise Clients & Academic Placement Portals Globally
                </span>
                
                {/* Rolling Partner Cards */}
                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide bg-slate-900 border border-white/5 py-2 px-4 rounded-xl">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full" /> Google Cloud Partner
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide bg-slate-900 border border-white/5 py-2 px-4 rounded-xl">
                    <span className="w-2.5 h-2.5 bg-teal-400 rounded-full" /> Zidio Learning Hub
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide bg-slate-900 border border-white/5 py-2 px-4 rounded-xl">
                    <span className="w-2.5 h-2.5 bg-yellow-500 rounded-full" /> AWS Educate Org
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide bg-slate-900 border border-white/5 py-2 px-4 rounded-xl">
                    <span className="w-2.5 h-2.5 bg-indigo-500 rounded-full" /> Microsoft Academic
                  </div>
                  <div className="flex items-center gap-2 text-white text-sm font-semibold tracking-wide bg-slate-900 border border-white/5 py-2 px-4 rounded-xl">
                    <span className="w-2.5 h-2.5 bg-purple-500 rounded-full" /> SkillIndia Council
                  </div>
                </div>
              </div>
            </section>

            {/* Corporate Summary & Impact Intro */}
            <About isFullPage={false} />

            {/* Core Operational Pipeline */}
            <section className="py-20 bg-slate-950 border-b border-white/5 relative overflow-hidden text-left" id="operational-sprints-tracker">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
              
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center mb-16">
                  <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold border border-teal-500/20 px-3 py-1 bg-teal-500/5 rounded-full inline-block mb-3">
                    Bespoke Execution Plan
                  </span>
                  <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
                    Our Quality Software <span className="text-teal-400">Engineering Lifecycle</span>
                  </h2>
                  <p className="mt-3 text-slate-400 max-w-xl mx-auto text-sm">
                    How we maintain near-zero regression, robust security compliance, and dynamic scalability across our codebases.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    {
                      step: '01',
                      title: 'Analyze & Blueprint',
                      desc: 'We map system parameters, draft architectural diagrams, and build secure entity-relation blueprints.',
                      highlight: '100% Precision'
                    },
                    {
                      step: '02',
                      title: 'Agile Coding Sprints',
                      desc: 'Our modular code leads build micro-services utilizing clean TypeScript, Node modules, and automated tests.',
                      highlight: 'Bi-weekly Releases'
                    },
                    {
                      step: '03',
                      title: 'OWASP & QA Audits',
                      desc: 'Rigorous penetration tests, code-sniff checkups, performance load bottlenecks calculations, and leak scanning.',
                      highlight: 'Strict Gateways'
                    },
                    {
                      step: '04',
                      title: 'Deployment & SLA',
                      desc: 'Deploying dockerized clusters on hot-scalable cloud runtimes with continuous monitored system backups.',
                      highlight: '24/7 SLA Defense'
                    }
                  ].map((p, idx) => (
                    <div key={idx} className="p-6 bg-slate-900 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-teal-500/20 transition-all group">
                      <div>
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-2xl font-mono font-black text-teal-500/40">{p.step}</span>
                          <span className="text-[9px] font-mono text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-md font-semibold">{p.highlight}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white tracking-tight mb-2 group-hover:text-teal-400 transition-colors">
                          {p.title}
                        </h4>
                        <p className="text-xs text-slate-450 leading-relaxed">
                          {p.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Tech Consulting & Enterprise Deliveries */}
            <Services isFullPage={false} />

            {/* Dynamic Metric Graphs */}
            <section className="py-20 bg-slate-900 border-b border-white/5 text-left" id="metrics-growth-boards">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5 space-y-4">
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block">
                      Proven Growth Figures
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-bold text-white leading-tight">
                      Driving Operational Value Across High-Octane Technical Verticals
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Zidio Development (rebranded as InternDesk) operates as both an institutional partner and bespoke development team. We track performance indices carefully to ensure we match elite professional outcomes.
                    </p>

                    <div className="space-y-3 pt-2">
                      {[
                        { title: 'Project Pipeline Success Rate', val: '99.4%' },
                        { title: 'SLA Uptime Metrics', val: '99.98%' },
                        { title: 'Cohort Placement Transition', val: '92.3%' }
                      ].map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5">
                          <span className="text-xs font-semibold text-slate-300">{item.title}</span>
                          <span className="text-xs font-mono font-bold text-teal-400">{item.val}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-slate-950 border border-white/5 p-6 rounded-3xl relative overflow-hidden" id="growth-chart-mock">
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h4 className="text-sm font-bold text-white tracking-tight">Active Student Placement Index</h4>
                        <p className="text-[10px] text-slate-400">Quarterly growth parameters over fiscal semesters</p>
                      </div>
                      <span className="text-[10px] font-mono text-teal-400 font-semibold bg-teal-500/10 px-2.5 py-1 rounded-md">
                        +48% YoY Yield
                      </span>
                    </div>

                    {/* Chart visual elements */}
                    <div className="space-y-4 pt-4 font-mono text-[10px]">
                      {[
                        { label: 'Q1 (Data & CybSec Ops)', percent: '45%' },
                        { label: 'Q2 (Cloud Infras Architect)', percent: '65%' },
                        { label: 'Q3 (System Sprints Deployment)', percent: '80%' },
                        { label: 'Q4 (Total Certified Placement)', percent: '94%' }
                      ].map((bar, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between items-center text-slate-400">
                            <span>{bar.label}</span>
                            <span className="text-teal-400 font-bold">{bar.percent}</span>
                          </div>
                          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-white/5">
                            <div className="h-full bg-gradient-to-r from-teal-500 to-green-400 rounded-full" style={{ width: bar.percent }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hands-On Virtual Sprints Categories */}
            <Internships isFullPage={false} />

            {/* Cryptographic Completion Verification Portal */}
            <CertificateVerification isFullPage={false} />

            {/* Messaging Gateway */}
            <Contact isFullPage={false} />
          </div>
        ) : currentPage === 'about' ? (
          <About isFullPage={true} />
        ) : currentPage === 'services' ? (
          <Services isFullPage={true} />
        ) : currentPage === 'internships' ? (
          <Internships isFullPage={true} />
        ) : currentPage === 'verify-certificate' ? (
          <CertificateVerification isFullPage={true} />
        ) : (
          <Contact isFullPage={true} />
        )}
      </main>

      {/* Primary Footer */}
      <Footer onNavigate={handlePageChange} />
    </div>
  );
}
