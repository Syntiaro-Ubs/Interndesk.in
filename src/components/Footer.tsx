/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Briefcase, ArrowRight, Check, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && /\S+@\S+\.\S+/.test(email)) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 2000);
    }
  };

  return (
    <footer id="footer" className="bg-slate-50 border-t border-slate-200 pt-16 pb-8 text-left relative overflow-hidden font-sans">
      {/* Background flare */}
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/5 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Column 1: InternDesk Profile */}
          <div className="md:col-span-4 space-y-4" id="footer-col-1">
            <div
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => onNavigate('home')}
              id="footer-logo"
            >
              <div className="bg-teal-600 text-white p-2 rounded-xl border border-teal-500/20">
                <Briefcase className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-slate-900 tracking-tight">
                  Intern<span className="text-teal-600">Desk</span>
                </span>
                <span className="text-[9px] font-mono tracking-wider font-semibold text-slate-500 -mt-1 uppercase">
                  Development & Training
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-650 leading-relaxed max-w-sm">
              Formerly known as Zidio Development. InternDesk is a premier technology software services provider and virtual internship architect, certifying future software talent globally.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-2 space-y-3" id="footer-col-2">
            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Navigation
            </h4>
            <div className="flex flex-col gap-2">
              <button
                id="footer-link-home"
                onClick={() => onNavigate('home')}
                className="text-xs text-slate-550 hover:text-teal-600 transition-colors text-left font-medium"
              >
                Home
              </button>
              <button
                id="footer-link-about"
                onClick={() => onNavigate('about')}
                className="text-xs text-slate-550 hover:text-teal-600 transition-colors text-left font-medium"
              >
                About Us
              </button>
              <button
                id="footer-link-services"
                onClick={() => onNavigate('services')}
                className="text-xs text-slate-550 hover:text-teal-600 transition-colors text-left font-medium"
              >
                Our Services
              </button>
              <button
                id="footer-link-internships"
                onClick={() => onNavigate('internships')}
                className="text-xs text-slate-550 hover:text-teal-600 transition-colors text-left font-medium"
              >
                Virtual Internships
              </button>
              <button
                id="footer-link-verify"
                onClick={() => onNavigate('verify-certificate')}
                className="text-xs text-slate-550 hover:text-teal-600 transition-colors text-left font-medium"
              >
                Verify Certificates
              </button>
            </div>
          </div>

          {/* Column 3: Fields Quick Links */}
          <div className="md:col-span-3 space-y-3" id="footer-col-3">
            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">
              Internship Streams
            </h4>
            <div className="flex flex-col gap-2 text-xs text-slate-550 font-medium">
              <span className="hover:text-teal-600 hover:underline cursor-pointer" onClick={() => onNavigate('internships')}>
                Frontend Web Development
              </span>
              <span className="hover:text-teal-600 hover:underline cursor-pointer" onClick={() => onNavigate('internships')}>
                Backend Node.js Development
              </span>
              <span className="hover:text-teal-600 hover:underline cursor-pointer" onClick={() => onNavigate('internships')}>
                Python Programming Models
              </span>
              <span className="hover:text-teal-600 hover:underline cursor-pointer" onClick={() => onNavigate('internships')}>
                Data Science & Analytics
              </span>
              <span className="hover:text-teal-600 hover:underline cursor-pointer" onClick={() => onNavigate('internships')}>
                Cybersecurity Operations
              </span>
            </div>
          </div>

          {/* Column 4: Active Newsletter Subscribe */}
          <div className="md:col-span-3 space-y-3" id="footer-col-4">
            <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-600" /> Keep In Touch
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Join our newsletter feed to receive details regarding subsequent tech cohort entries.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2 pt-1" id="newsletter-form">
              <div className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="e.g. email@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-teal-500"
                />
                <button
                  type="submit"
                  id="newsletter-submit-btn"
                  className="px-3 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl text-xs flex items-center justify-center transition-colors cursor-pointer"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[10px] text-teal-650 font-semibold mt-1">Subscribed successfully!</p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom copyright segment */}
        <div className="border-t border-slate-250 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500" id="copyright-bar">
          <p>
            Copyright &copy; 2026 InternDesk Development. All rights reserved.
          </p>
          <div className="flex gap-4">
            <span className="hover:text-slate-800 cursor-help transition-all">Terms of SLA</span>
            <span className="hover:text-slate-800 cursor-help transition-all">Privacy Standards</span>
            <span className="hover:text-slate-800 cursor-help transition-all">Refund Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
