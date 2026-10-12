/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ContactMessage } from '../types';
import { Mail, MapPin, Phone, MessageSquare, Linkedin, Send, ThumbsUp, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Contact() {
  const [formData, setFormData] = useState<ContactMessage>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<ContactMessage>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    if (formErrors[name as keyof ContactMessage]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validate = (): boolean => {
    const errors: Partial<ContactMessage> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address';
    }
    if (!formData.subject.trim()) errors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      errors.message = 'Please type your contact message content';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Minimum 10 characters required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSuccess(true);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccess(false);
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/50">
      {/* Background glowing layer */}
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16" id="contact-header">
          <span className="text-xs font-mono text-teal-800 uppercase tracking-widest font-semibold border border-teal-200 px-3 py-1 bg-teal-50 rounded-full inline-block mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            Contact <span className="text-teal-600">Our Offices</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base">
            Have an enterprise product specification, or questions about the next student batch onboarding? Send a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Coordinates Grid Column */}
          <div className="lg:col-span-5 space-y-6" id="contact-coors">
            {/* Address */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 hover:border-teal-500/20 hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
              <div className="p-3 bg-teal-50 border border-teal-100 text-teal-600 rounded-xl shrink-0 h-fit">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="text-left" id="coor-address">
                <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider mb-1">
                  Corporate Headquarters
                </h4>
                <p className="text-base font-bold text-slate-900 mb-2">Bengaluru Office</p>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Hosur Road, Koramangala Industrial Layout, Block IV,<br />
                  Bengaluru, Karnataka 560034, India
                </p>
              </div>
            </div>

            {/* Email Channels */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl flex gap-4 hover:border-teal-500/20 hover:bg-white hover:shadow-lg hover:shadow-slate-100 transition-all duration-300">
              <div className="p-3 bg-teal-50 border border-teal-100 text-teal-600 rounded-xl shrink-0 h-fit">
                <Mail className="w-5 h-5" />
              </div>
              <div className="text-left" id="coor-emails">
                <h4 className="text-sm font-mono font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Official Channels
                </h4>
                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                      Enterprise & Consulting
                    </span>
                    <a
                      href="mailto:services@interndesk.com"
                      className="text-sm text-teal-600 hover:text-teal-700 hover:underline font-semibold font-mono"
                    >
                      services@interndesk.com
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                      Academic Cohort & Intern Support
                    </span>
                    <a
                      href="mailto:support@interndesk.com"
                      className="text-sm text-teal-600 hover:text-teal-700 hover:underline font-semibold font-mono"
                    >
                      support@interndesk.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Connects */}
            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl" id="coor-socials">
              <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-4 text-left">
                Continuous Social Pulse
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white border border-slate-200 hover:border-teal-500/20 rounded-xl text-xs text-slate-700 hover:text-teal-600 flex items-center gap-2 transition-all cursor-pointer font-semibold"
                >
                  <Linkedin className="w-4 h-4" /> LinkedIn Profile
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-white border border-slate-200 hover:border-teal-500/20 rounded-xl text-xs text-slate-700 hover:text-teal-600 flex items-center gap-2 transition-all cursor-pointer font-semibold"
                >
                  <MessageSquare className="w-4 h-4" /> Cohort Discord
                </a>
              </div>
            </div>
          </div>

          {/* Interactive Form column */}
          <div className="lg:col-span-7" id="contact-form-card">
            <div className="bg-slate-50 border border-slate-200 p-6 sm:p-8 rounded-3xl relative">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="absolute inset-0 bg-white/95 backdrop-blur-sm rounded-3xl z-10 flex flex-col items-center justify-center p-6 text-center"
                    id="contact-form-success"
                  >
                    <div className="w-14 h-14 rounded-full bg-teal-50 border-2 border-teal-500 text-teal-600 flex items-center justify-center mb-4">
                      <ThumbsUp className="w-6 h-6 animate-bounce" />
                    </div>
                    <h4 className="text-xl font-extrabold text-slate-900 tracking-tight mb-2">Message Dispatched!</h4>
                    <p className="text-slate-500 text-xs max-w-sm mb-6 leading-relaxed">
                      Thank you for contacting InternDesk. Your inquiry has been logged inside our communication pipeline. A representative will contact you shortly.
                    </p>
                    <button
                      id="reset-contact-btn"
                      onClick={handleCloseSuccess}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 px-6 rounded-xl text-xs transition-colors"
                    >
                      Write Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4 text-left" id="coor-contact-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
                    />
                    {formErrors.name && (
                      <p className="text-xs text-red-650 font-medium mt-1">{formErrors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. aarav@gmail.com"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
                    />
                    {formErrors.email && (
                      <p className="text-xs text-red-650 font-medium mt-1">{formErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Subject Heading
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="e.g. Web Development Service Quote"
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors placeholder:text-slate-400"
                  />
                  {formErrors.subject && (
                    <p className="text-xs text-red-650 font-medium mt-1">{formErrors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label className="block text-[11px] font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                    Message Body
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Type detail specifications or onboarding queries here..."
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 transition-colors resize-none placeholder:text-slate-400"
                  />
                  {formErrors.message && (
                    <p className="text-xs text-red-650 font-medium mt-1">{formErrors.message}</p>
                  )}
                </div>

                <div className="pt-2" id="submit-payload-wrapper">
                  <button
                    type="submit"
                    id="submit-payload-btn"
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-600/10 w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" /> Send Dispatch
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
