/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import { useState } from 'react';
import { CheckCircle2, Shield, Flame, Users, Landmark, ChevronDown, Award, Lightbulb, Handshake, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function About({ isFullPage = false }: { isFullPage?: boolean }) {
  const highlights = [
    {
      icon: Shield,
      title: 'Our Proven Expertise',
      desc: 'Formed by seasoned software architects, engineering robust products and enterprise-ready workflows.'
    },
    {
      icon: Flame,
      title: 'Fueling Continuous Innovation',
      desc: 'Deploying custom artificial intelligence models, automated developer pipelines, and high-performance engines.'
    },
    {
      icon: Users,
      title: 'Global Cohort Community',
      desc: 'Deep collaboration channels connecting thousands of students with experienced engineering team leads.'
    },
    {
      icon: Landmark,
      title: 'Credential Fidelity',
      desc: 'All certification keys are cryptographically logged and widely respected across top IT staffing partners.'
    }
  ];

  const bulletPoints = [
    'Highly experienced advisory staff & code leads',
    'Agile delivery frameworks tailored for SMEs and enterprise structures',
    'Custom software architectures crafted with modern clean-code standards',
    'Seamless connection between academic engineering and real-world deployment'
  ];

  const team = [
    {
      name: 'Nikhil Kumar',
      role: 'Chief Tech Architect',
      prev: 'Ex-Infosys Cloud Architect',
      desc: 'Nikhil leads our cloud clusters design and full-stack architecture specs validation tests.'
    },
    {
      name: 'Amit Kumar',
      role: 'Director of Cohorts & Sprints',
      prev: 'Senior Program Coordinator',
      desc: 'Amit manages development pipeline schedules and academic partner engagements across cohorts.'
    },
    {
      name: 'Priya Patel',
      role: 'Academic Carrier Lead',
      prev: 'Corporate HR Advisory',
      desc: 'Priya steers placement interviews workshops, CV auditing sessions, and core staffing interfaces.'
    }
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What is the corporate background of InternDesk?',
      a: 'InternDesk operates as an elite full-scale software solutions developer and student training academy. We historically operated as Zidio Development before restructuring our portal tools to specialize in scalable systems. We continue serving standard IT clients and cohort students under consistent quality management.'
    },
    {
      q: 'How does the Virtual Internship program operate?',
      a: 'Our programs are structured directly on agile sprint principles. Registered interns receive distinct coding assignments and tickets. They build actual components, commit progress on GitHub repository logs, undergo senior team lead code reviews, and earn cryptographic completion certificates.'
    },
    {
      q: 'Are the certifications acknowledged by tech recruiters?',
      a: 'Yes, absolutely. Every credential contains a unique audit reference key searchable inside our cryptographic secure verify gateway. Top corporate recruiters utilize these reference portals during validation stages to assess candidate task submissions.'
    },
    {
      q: 'Is there a placement support system?',
      a: 'Yes! High-performing cohort students receive focused Letters of Recommendation, direct referrals to our global staffing associates, CV optimization templates, and mock technical evaluation prep packages.'
    }
  ];

  return (
    <section id="about" className="bg-slate-900 relative overflow-hidden text-left pb-20">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Header breadcrumb for full page mode */}
      {isFullPage && (
        <div className="bg-slate-950 py-16 border-b border-white/5 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-semibold block mb-2">
              Home / Corporate Profile
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              About Zidio Development <span className="text-teal-400">(InternDesk)</span>
            </h1>
            <p className="mt-3 text-slate-400 max-w-2xl text-sm leading-relaxed">
              We deliver elite software solutions for enterprise ventures while training high-potential digital talent through structured agile sprints.
            </p>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {!isFullPage && (
          /* Segment Header for Home page mode */
          <div className="text-center mb-16" id="about-header-container">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold border border-teal-500/20 px-3 py-1 bg-teal-500/5 rounded-full inline-block mb-3">
              Corporate Introduction
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white tracking-tight">
              Bridging the Gap Between IT Consulting and Talent Capital
            </h2>
            <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-xs leading-relaxed">
              Empowering organizations with sophisticated IT capabilities while modeling high-potential tech paths for virtual interns globally.
            </p>
          </div>
        )}

        {/* Content rows */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 flex flex-col items-start" id="about-conceptual-brief">
            <span className="text-xs font-mono text-teal-400 uppercase tracking-wider mb-2 font-semibold">
              Our Organizational Blueprint
            </span>
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight mb-4 leading-snug">
              Bespoke Enterprise Software Systems & Practical Engineering Pipelines
            </h3>
            <p className="text-slate-400 leading-relaxed text-xs mb-4">
              At **Zidio Development (InternDesk)**, we operate at the intersection of business automation and high-intensity tech training. As a software consulting enterprise, we manage, maintain, and execute full-stack codebases for clients around the globe.
            </p>
            <p className="text-slate-400 leading-relaxed text-xs mb-6">
              At the exact same time, we have pioneered our Virtual Internship pipeline. This academy functions as a launching stage where students and new developers escape static textbooks and delve into complex modular tasks, simulating a real agile sprint environment.
            </p>

            {/* List checklist */}
            <div className="space-y-2" id="about-bullets-list">
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-2.5 text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                  <span className="text-xs font-medium">{point}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6" id="about-values-grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((item, i) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={i}
                    id={`about-highlight-card-${i}`}
                    className="p-5 bg-slate-950 border border-white/5 rounded-2xl flex flex-col items-start hover:border-teal-500/20 transition-all duration-305"
                  >
                    <div className="p-2.5 bg-teal-500/10 text-teal-400 border border-teal-500/20 rounded-xl mb-3">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-white mb-1.5 tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-slate-450 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Extended Fields for dedicated About Page */}
        {isFullPage && (
          <div className="space-y-24 pt-16 border-t border-white/5">
            {/* Mission & Vision cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 bg-slate-950 border border-white/5 rounded-3xl relative overflow-hidden text-left" id="mission-card">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
                <span className="p-3 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20 inline-block mb-4">
                  <Lightbulb className="w-5 h-5" />
                </span>
                <h4 className="text-lg font-bold text-white mb-2">Our Fundamental Mission</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To supply cutting-edge engineering assets and robust digital products for global small-to-medium business enterprises, while democratizing structured practical tech mentorship. We ensure promising talent escapes theoretical stagnation to achieve validated tech portfolio status.
                </p>
              </div>

              <div className="p-8 bg-slate-950 border border-white/5 rounded-3xl relative overflow-hidden text-left" id="vision-card">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />
                <span className="p-3 bg-teal-500/10 text-teal-450 rounded-xl border border-teal-500/20 inline-block mb-4">
                  <Award className="w-5 h-5" />
                </span>
                <h4 className="text-lg font-bold text-white mb-2">Our Corporate Vision</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  To become the world's premier certified talent-incubation and product development associate. By licensing and documenting verifiable candidate project skills, we aspire to build a more competent, efficient, and direct entry pathway for developers globally.
                </p>
              </div>
            </div>

            {/* Meet our advisors & leadership */}
            <div id="corporate-leadership-grid">
              <div className="text-center mb-12">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block mb-2">
                  Our Engineering Desk Leads
                </span>
                <h3 className="text-2xl font-display font-bold text-white">Leadership & Code Advisors</h3>
                <p className="mt-2 text-xs text-slate-400 max-w-xl mx-auto">
                  Experienced corporate technology pioneers dedicated to code refinement and cohort development.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {team.map((member, idx) => (
                  <div key={idx} className="p-6 bg-slate-950 border border-white/5 rounded-2xl flex flex-col justify-between hover:border-teal-500/20 transition-all text-left">
                    <div>
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-teal-400">{member.role}</span>
                        <span className="text-[9px] font-mono text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-md">{member.prev}</span>
                      </div>
                      <h4 className="text-md font-bold text-white tracking-tight mb-3">
                        {member.name}
                      </h4>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {member.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Accordion Block */}
            <div id="corporate-faq-block" className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest font-semibold block mb-2">Answers Provided</span>
                <h3 className="text-2xl font-display font-bold text-white">Frequently Asked Questions</h3>
              </div>

              <div className="space-y-4">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="border border-white/5 bg-slate-950 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex justify-between items-center p-5 text-left font-semibold text-xs sm:text-sm text-white hover:text-teal-400 transition-colors focus:outline-none"
                      >
                        <span>{faq.q}</span>
                        <ChevronDown className={`w-4 h-4 shrink-0 text-slate-405 transition-transform duration-200 ${isOpen ? 'rotate-180 text-teal-450' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-white/5 bg-slate-900/30 text-xs text-slate-400 p-5 leading-relaxed"
                          >
                            {faq.a}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
