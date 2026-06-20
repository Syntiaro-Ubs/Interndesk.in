/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Briefcase, Menu, X, Globe, Shield, Star } from 'lucide-react';

interface NavbarProps {
  onNavigate: (pageId: string) => void;
  currentPage: string;
}

export default function Navbar({ onNavigate, currentPage }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About Us', id: 'about' },
    { label: 'Services', id: 'services' },
    { label: 'Virtual Internships', id: 'internships' },
    { label: 'Verify Certificate', id: 'verify-certificate' },
    { label: 'Contact Us', id: 'contact' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Contact Infobar in Zidio Navy theme */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-mono py-2 px-4 border-b border-white/5 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-teal-400 rounded-full inline-block animate-pulse" />
              Corporate Desk Email: <a href="mailto:support@zidio.in" className="text-teal-400 hover:underline">support@zidio.in</a>
            </span>
            <span className="text-slate-400">|</span>
            <span>Support Line: +91 91101 23456</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="bg-teal-500/10 text-teal-400 border border-teal-500/20 px-2 py-0.5 rounded-md">ISO 9001:2015 Cert</span>
            <span className="text-slate-400">Office Hours: 09:00 AM - 06:00 PM (IST)</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navbar */}
      <nav
        id="main-navbar"
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-900/95 backdrop-blur-md shadow-lg border-b border-white/5 py-3'
            : 'bg-slate-900/40 backdrop-blur-sm border-b border-white/5 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div
              id="navbar-logo"
              className="flex items-center gap-2.5 cursor-pointer group"
              onClick={() => handleItemClick('home')}
            >
              <div className="bg-gradient-to-br from-teal-500 to-emerald-600 text-white p-2 rounded-xl group-hover:scale-105 transition-transform duration-200 shadow-md shadow-teal-500/20">
                <Briefcase className="w-5 h-5" id="navbar-logo-icon" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-xl font-bold text-white tracking-tight group-hover:text-teal-400 transition-colors">
                  Zidio<span className="text-teal-400">Dev</span>
                </span>
                <span className="text-[9px] font-mono tracking-wider font-semibold text-slate-400 -mt-1 uppercase">
                  IT Solutions & Cohort
                </span>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center gap-1.5" id="desktop-nav-menu">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-link-${item.id}`}
                    onClick={() => handleItemClick(item.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs lg:text-sm font-semibold tracking-wide transition-all duration-200 ${
                      isActive
                        ? 'text-teal-450 bg-teal-500/10 border border-teal-500/30'
                        : 'text-slate-350 hover:text-white hover:bg-white/5 border border-transparent'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="hidden lg:flex items-center" id="nav-cta-wrapper">
              <button
                id="navbar-cta"
                onClick={() => handleItemClick('internships')}
                className="bg-teal-500 hover:bg-teal-400 text-slate-950 px-5 py-2 rounded-xl text-sm font-semibold tracking-wide transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 hover:shadow-lg hover:shadow-teal-500/20 cursor-pointer"
              >
                Apply Online
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center" id="mobile-toggle-wrapper">
              <button
                id="mobile-nav-toggle"
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-lg text-slate-450 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-900 border-b border-white/5 shadow-2xl absolute left-0 right-0 px-2 pt-2 pb-4 space-y-1 sm:px-3" id="mobile-dropdown-menu">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`mobile-nav-link-${item.id}`}
                  onClick={() => handleItemClick(item.id)}
                  className={`block w-full text-left px-4 py-2.5 rounded-lg text-semibold transition-all ${
                    isActive
                      ? 'text-teal-400 bg-teal-500/5 border-l-4 border-teal-500 pl-3 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-4 pb-1 border-t border-white/5 px-4" id="mobile-nav-cta">
              <button
                id="mobile-cta-btn"
                onClick={() => handleItemClick('internships')}
                className="w-full bg-teal-500 text-slate-950 py-3 rounded-xl font-bold tracking-wide hover:bg-teal-400 transition-colors shadow-lg shadow-teal-500/10"
              >
                Apply Online
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
