/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  Globe,
  Smartphone,
  Cpu,
  Cloud,
  ShieldAlert,
  Figma,
  LineChart,
  Lightbulb,
  X,
  Sparkles,
  ArrowRight,
  Calculator,
  Layers,
  Clock,
  Coins
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ServiceItem {
  icon: any;
  title: string;
  category: string;
  shortDesc: string;
  longDesc: string;
  techs: string[];
  deliverables: string[];
}

export default function Services({ isFullPage = false }: { isFullPage?: boolean }) {
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeCategory, setActiveCategory] = useState('All');

  // Interactive Calculator State
  const [calcStack, setCalcStack] = useState('web-app');
  const [calcScale, setCalcScale] = useState('mid-tier');
  const [calcSecurity, setCalcSecurity] = useState('standard');
  const [calcTimeline, setCalcTimeline] = useState(3); // in months
  const [isCalculated, setIsCalculated] = useState(false);
  const [budgetEstimate, setBudgetEstimate] = useState(0);

  const services: ServiceItem[] = [
    {
      icon: Globe,
      title: 'Web Application Development',
      category: 'Software Engineering',
      shortDesc: 'Crafting highly responsive, scalable, and secure single-page and full-stack web applications.',
      longDesc: 'Our engineering group designs enterprise-grade platforms optimized for peak load times and custom user flows. We develop robust single page applications, SaaS models, and custom content hubs with seamless server logic integrations.',
      techs: ['React.js', 'Next.js', 'Node.js', 'TypeScript', 'TailwindCSS', 'GraphQL'],
      deliverables: ['Responsive Web Dashboards', 'Admin Control Centers', 'Robust Payment Gateways', 'Progressive Web Apps (PWAs)']
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      category: 'Mobile Solutions',
      shortDesc: 'Building immersive, highly functional native and cross-platform applications for Android and iOS.',
      longDesc: 'From initial prototype designs to global App Store deployments, we program secure, low-latency applications. We specialize in cross-platform setups and Kotlin native files that maximize device performance and sensor bindings.',
      techs: ['React Native', 'Kotlin', 'Swift', 'Flutter', 'Jetpack Compose', 'Firebase'],
      deliverables: ['Native iOS & Android Apps', 'In-App Notifications Systems', 'Secure Payment Rails', 'Offline-First Database Synchronization']
    },
    {
      icon: Cpu,
      title: 'AI & Machine Learning Solutions',
      category: 'Artificial Intelligence',
      shortDesc: 'Integrating intelligent LLMs, predictive algorithms, and custom natural language processing pipelines.',
      longDesc: 'We upgrade existing services with deep-learning neural capabilities. Our pipelines include training supervised forecasting networks and fine-tuning Gemini/LLM nodes to streamline automated enterprise operations.',
      techs: ['Python', 'PyTorch / TensorFlow', 'LangChain', 'Gemini APIs', 'Scikit-Learn', 'Pandas'],
      deliverables: ['Custom Chatbot Interfaces', 'Automated Scraping Pipelines', 'Predictive Recommendation Engines', 'Intelligent Document Scanning']
    },
    {
      icon: Cloud,
      title: 'Cloud Infrastructure & DevOps',
      category: 'Systems & Infrastructure',
      shortDesc: 'Streamlining deployment pipelines and executing secure, robust cloud database migrations.',
      longDesc: 'We evaluate, configure, construct, and defend secure cloud server instances. We automate development deployment setups (CI/CD) and balance scaling processes so your operations survive massive usage spikes with near-zero downtime.',
      techs: ['AWS Solutions', 'Google Cloud Platform', 'Docker', 'Kubernetes', 'CI/CD Pipelines', 'Terraform'],
      deliverables: ['Auto-scaling Cloud Architectures', 'Dockerized Containers Configurations', 'Secure S3 Data Backups Systems', 'Complete System Observability Logs']
    },
    {
      icon: ShieldAlert,
      title: 'Cybersecurity & Auditing',
      category: 'Security & Integrity',
      shortDesc: 'Thorough vulnerability scanning, penetration trials, and credential storage security setups.',
      longDesc: 'Protect your enterprise parameters and consumer data files from persistent actors. We run comprehensive stress validations under the OWASP framework, write custom auth gates, and identify dangerous security leaks.',
      techs: ['Linux Security', 'Wireshark & Nmap', 'OWASP Top 10 Audit', 'SSL/TLS & Cryptography', 'OAuth Security', 'IAM Roles'],
      deliverables: ['Detailed Vulnerability Logs', 'Middlewares Security Installations', 'Cryptographic End-to-End Protections', 'Compliance Documentation Setup']
    },
    {
      icon: Figma,
      title: 'UI/UX Interface Design',
      category: 'Creative Design',
      shortDesc: 'User journey mapping, wireframes drafting, and gorgeous interactive Figma design prototypes.',
      longDesc: 'We construct beautiful visual layouts matching high brand identity values. By analyzing user behavior patterns, we structure simple interactive controls that maximize user focus and improve general user retention.',
      techs: ['Figma Pro', 'Adobe XD', 'Interactive Prototyping', 'User Research Maps', 'Atomic UI Systems', 'Framer / CSS Motion'],
      deliverables: ['High-Fidelity App Wireframes', 'Tailored Design Typography Guides', 'Clickable Figma Demonstrations', 'Tailwind-Optimized Visual Tokens']
    },
    {
      icon: LineChart,
      title: 'Big Data & Business Intelligence',
      category: 'Data Engineering',
      shortDesc: 'Processing huge structured database logs and constructing high-fidelity analytics visual dashboards.',
      longDesc: 'Turn raw data feeds into actionable growth parameters. We structure optimized database queries, construct complex aggregations pipelines, and represent performance indices in clean, interactive dashboards.',
      techs: ['SQL PostgreSQL', 'MongoDB Aggregations', 'PowerBI / Tableau', 'Apache Spark', 'Python Analytics', 'D3.js Charts'],
      deliverables: ['Live Corporate Performance Dashboards', 'Complex SQL Database Upgrades', 'Sales and Traffic Models', 'Weekly Automatically Generated Reports System']
    },
    {
      icon: Lightbulb,
      title: 'IT Strategy & Digital Consultation',
      category: 'Strategy & Growth',
      shortDesc: 'Providing clear structural guidelines, technical architectures audits, and optimization support.',
      longDesc: 'We advise businesses on selecting optimal stacks and upgrading legacy systems. Our engineers conduct code audits, construct technical specs, and develop customized digital transition roadmaps to save operational costs.',
      techs: ['Legacy Refactoring', 'Architecture Blueprints', 'Agile Product Design', 'Cost Auditing', 'Tech-Stack Selections', 'Workflow Automation'],
      deliverables: ['Detailed Architecture Blueprints', 'Operational Tech-Stack Audits Reports', 'Integration Roadmaps Documentation', 'Quarterly Optimization Metrics Sheets']
    }
  ];

  // Unique categories
  const categories = ['All', 'Software Engineering', 'Mobile Solutions', 'Artificial Intelligence', 'Systems & Infrastructure', 'Security & Integrity'];

  const filteredServices = activeCategory === 'All'
    ? services
    : services.filter(s => s.category === activeCategory);

  const calculateCost = () => {
    let base = 0;
    // Base cost mapping
    if (calcStack === 'web-app') base = 4800;
    else if (calcStack === 'mobile-app') base = 6500;
    else if (calcStack === 'ai-agent') base = 8500;
    else if (calcStack === 'cloud-infra') base = 3800;

    // Scale multiplier
    let mult = 1.0;
    if (calcScale === 'mvp') mult = 0.8;
    else if (calcScale === 'mid-tier') mult = 1.25;
    else if (calcScale === 'enterprise') mult = 2.1;

    // Security add-on
    let secCost = 0;
    if (calcSecurity === 'encrypted') secCost = 850;
    else if (calcSecurity === 'owasp-audited') secCost = 2400;

    // Timeline urgency multiplier (shorter timeline = higher cost)
    let timelineMult = 1.0;
    if (calcTimeline <= 1) timelineMult = 1.4;
    else if (calcTimeline === 2) timelineMult = 1.15;
    else if (calcTimeline >= 5) timelineMult = 0.85;

    const total = Math.round((base * mult + secCost) * timelineMult);
    setBudgetEstimate(total);
    setIsCalculated(true);
  };

  return (
    <section id="services" className="py-24 bg-slate-900 border-t border-white/5 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header breadcrumbs */}
      {isFullPage && (
        <div className="bg-slate-950 py-16 border-b border-white/5 mb-16 text-left">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold block mb-2 font-mono">
              Home / Enterprise Services
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Enterprise <span className="text-teal-400">IT Solutions</span>
            </h1>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm leading-relaxed">
              We design and construct high-performance digital architectures, custom AI systems, secure database repositories, and responsive frontends.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main section titles */}
        {!isFullPage && (
          <div className="text-center mb-16 animate-fade-in" id="services-header">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold border border-teal-500/20 px-3 py-1 bg-teal-500/5 rounded-full inline-block mb-3">
              Technical Offerings
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight animate-pulse">
              Our Comprehensive <span className="text-teal-400">Engineering Verticals</span>
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-xs leading-relaxed">
              Leverage custom-engineered web setups, high-concurrency cloud nodes, machine learning modules, and cybersecurity structures.
            </p>
          </div>
        )}

        {/* Category Filter Pills on Dedicated Services view */}
        {isFullPage && (
          <div className="flex flex-wrap justify-start gap-1.5 mb-12" id="category-filter-pills">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-semibold text-xs tracking-wide rounded-xl border transition-all ${
                  activeCategory === cat
                    ? 'bg-teal-500 text-slate-950 border-teal-500 shadow-md shadow-teal-500/25'
                    : 'bg-slate-950 text-slate-300 border-white/5 hover:border-white/10 hover:bg-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Services mapping grid */}
        <div id="services-blocks-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 text-left">
          {(isFullPage ? filteredServices : services.slice(0, 4)).map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                id={`service-card-${idx}`}
                className="group p-6 bg-slate-950 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-teal-500/20 transition-all duration-300"
              >
                <div>
                  <div className="p-3 bg-teal-500/10 text-teal-400 border border-teal-500/15 rounded-2xl w-fit mb-6">
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <h3 className="text-md sm:text-lg font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {item.shortDesc}
                  </p>
                </div>

                <button
                  id={`srv-details-trigger-${idx}`}
                  onClick={() => setSelectedService(item)}
                  className="mt-4 text-xs font-mono font-bold text-teal-450 hover:text-teal-400 flex items-center gap-1.5 group/btn border-t border-white/5 pt-4"
                >
                  Inspect Specifications
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>

        {/* DynamicCost Estimator UI Block */}
        {isFullPage && (
          <div className="mt-24 p-8 bg-slate-950 border border-white/5 rounded-3xl relative overflow-hidden text-left" id="cost-estimator-calculator">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-teal-500/5 rounded-full blur-[110px] pointer-events-none" />
            
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                <span className="p-2.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-xl">
                  <Calculator className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-white">Interactive IT Sprints Budget Estimator</h3>
                  <p className="text-[10px] text-slate-400">Configure parameters in real-time to compute prospective development costs</p>
                </div>
              </div>

              {/* Calculator Settings Forms */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4 border-t border-white/5">
                <div className="lg:col-span-7 space-y-5">
                  {/* Option 1: Work Stack */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      1. Deliverable Technology Stack
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        { id: 'web-app', label: 'Web Cloud SaaS', price: 'Est. $4,800 base' },
                        { id: 'mobile-app', label: 'Android & iOS App', price: 'Est. $6,500 base' },
                        { id: 'ai-agent', label: 'Custom ML & NLP Pipelines', price: 'Est. $8,500 base' },
                        { id: 'cloud-infra', label: 'GCP/AWS DevOps Clusters', price: 'Est. $3,800 base' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setCalcStack(item.id)}
                          className={`p-3 text-left border rounded-xl transition-all ${
                            calcStack === item.id
                              ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                              : 'bg-slate-900 border-white/5 hover:border-white/10 text-slate-300'
                          }`}
                        >
                          <span className="text-xs font-bold block mb-0.5">{item.label}</span>
                          <span className="text-[9px] font-mono text-slate-400 block">{item.price}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Option 2: Scalability Level */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      2. Scale and Sizing Multipliers
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { id: 'mvp', title: 'Basic MVP', sub: '0.8x multi' },
                        { id: 'mid-tier', title: 'Mid Scale', sub: '1.25x multi' },
                        { id: 'enterprise', title: 'Enterprise HA', sub: '2.1x multi' }
                      ].map((sc) => (
                        <button
                          key={sc.id}
                          onClick={() => setCalcScale(sc.id)}
                          className={`p-3 text-center border rounded-xl transition-all ${
                            calcScale === sc.id
                              ? 'bg-teal-500/10 border-teal-500 text-teal-400'
                              : 'bg-slate-900 border-white/5 hover:border-white/10 text-slate-300'
                          }`}
                        >
                          <span className="text-xs font-bold block">{sc.title}</span>
                          <span className="text-[9px] font-mono text-slate-400 block mt-0.5">{sc.sub}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Option 3: Security Constraints */}
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider mb-2">
                      3. Operational Security Compliance
                    </label>
                    <select
                      value={calcSecurity}
                      onChange={(e) => setCalcSecurity(e.target.value)}
                      className="w-full bg-slate-900 border border-white/5 text-xs text-slate-300 rounded-xl px-4 py-3 focus:outline-none focus:border-teal-500 appearance-none font-sans"
                    >
                      <option value="none" className="bg-slate-950">None extra (Standard baseline protocols)</option>
                      <option value="encrypted" className="bg-slate-950">SSL/TLS & JWT Key hashing configurations (+$850)</option>
                      <option value="owasp-audited" className="bg-slate-950">Full compliance audit check & OWASP gateway configuration (+$2,400)</option>
                    </select>
                  </div>

                  {/* Option 4: Timeline Slider */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-xs font-mono font-semibold text-slate-300 uppercase tracking-wider">
                        4. Expected Project Timeline
                      </label>
                      <span className="text-xs font-mono text-teal-400 font-bold bg-teal-500/10 px-2 rounded">{calcTimeline} Months</span>
                    </div>
                    <input
                      type="range"
                      min={1}
                      max={8}
                      value={calcTimeline}
                      onChange={(e) => setCalcTimeline(Number(e.target.value))}
                      className="w-full h-1 bg-slate-900 border border-white/5 rounded-lg appearance-none cursor-pointer accent-teal-500"
                    />
                    <div className="flex justify-between text-[9px] font-mono text-slate-400 px-1 mt-1">
                      <span>1 Month (Urgency fee)</span>
                      <span>3 M (Standard)</span>
                      <span>8 Months (Self-paced)</span>
                    </div>
                  </div>
                </div>

                {/* Calculation Output Results column */}
                <div className="lg:col-span-5 bg-slate-900 border border-white/5 p-6 rounded-2xl flex flex-col justify-between h-full">
                  <div>
                    <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block mb-3">Estimated Budget Ledger</span>
                    
                    <div className="space-y-4 font-mono text-slate-300 text-[10px] pt-2">
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Base Core Stack:</span>
                        <span className="text-white font-bold">
                          {calcStack === 'web-app' ? '$4,800' : calcStack === 'mobile-app' ? '$6,500' : calcStack === 'ai-agent' ? '$8,500' : '$3,800'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Sizing Multiplier:</span>
                        <span className="text-white font-bold">
                          {calcScale === 'mvp' ? '0.8x' : calcScale === 'mid-tier' ? '1.25x' : '2.1x'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Vulnerability Addon:</span>
                        <span className="text-white font-bold">
                          {calcSecurity === 'none' ? '$0' : calcSecurity === 'encrypted' ? '+$850' : '+$2,400'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-white/5 pb-2">
                        <span>Deadline Multiplier:</span>
                        <span className="text-white font-bold">
                          {calcTimeline <= 1 ? '1.4x (Rush)' : calcTimeline === 2 ? '1.15x' : calcTimeline >= 5 ? '0.85x' : '1.0x'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8">
                    {isCalculated ? (
                      <div className="text-center p-4 bg-slate-950 border border-teal-500/10 rounded-xl mb-4">
                        <span className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block">Project Estimation Total:</span>
                        <span className="text-3xl font-mono font-extrabold text-teal-400">${budgetEstimate.toLocaleString()} USD</span>
                        <span className="text-[8px] text-slate-500 block mt-1">Estimations valid under 30 days pending technical discovery SLA.</span>
                      </div>
                    ) : (
                      <div className="text-center p-6 bg-slate-950/55 rounded-xl border border-white/5 mb-4 text-xs text-slate-500 font-medium">
                        Click calculate below to compute estimated engineering prices.
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={calculateCost}
                        className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold py-3 px-4 rounded-xl text-xs flex justify-center items-center gap-1.5 cursor-pointer shadow-lg shadow-teal-500/10"
                      >
                        <Calculator className="w-4 h-4" /> Calculate Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Service Details Modal */}
      <AnimatePresence>
        {selectedService && (
          <div
            id="service-details-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              id="service-details-card"
              className="bg-slate-900 border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto text-left shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="close-services-modal"
                className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950 border border-white/5 hover:border-white/10 p-2 rounded-xl transition-colors cursor-pointer"
                onClick={() => setSelectedService(null)}
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div className="p-3 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-2xl shrink-0">
                  {/* Since type specifies any, we can instantiate smoothly */}
                  <selectedService.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-bold text-teal-400 uppercase tracking-widest block mb-1">
                    {selectedService.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-display font-extrabold text-white tracking-tight">
                    {selectedService.title}
                  </h4>
                </div>
              </div>

              <div className="border-t border-white/5 py-4">
                <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-2">Solution Narrative</h5>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {selectedService.longDesc}
                </p>
              </div>

              {/* Technologies row */}
              <div className="border-t border-white/5 py-4">
                <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-teal-400" /> Integrated Tech Stack
                </h5>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.techs.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-950 border border-white/5 text-[10px] text-slate-350 font-mono font-medium rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Deliverables */}
              <div className="border-t border-white/5 py-4">
                <h5 className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider mb-3">Typical Engineering Deliverables</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedService.deliverables.map((del, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
                      <span className="text-teal-400 shrink-0 mt-0.5">&bull;</span>
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/5 flex gap-3">
                <button
                  id="modal-specs-close-btn"
                  onClick={() => setSelectedService(null)}
                  className="w-full bg-slate-950 border border-white/5 text-slate-300 hover:text-white py-3 rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Return to Portals
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
