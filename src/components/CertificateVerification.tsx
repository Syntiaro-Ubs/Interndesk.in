/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CERTIFICATES } from '../data/certificates';
import { MockCertificate } from '../types';
import { Search, Award, CheckCircle, ShieldCheck, Download, AlertTriangle, RefreshCw, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

export default function CertificateVerification() {
  const [searchId, setSearchId] = useState('');
  const [typedId, setTypedId] = useState('');
  const [certificate, setCertificate] = useState<MockCertificate | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedId.trim()) return;

    setIsSearching(true);
    setHasSearched(false);
    setCertificate(null);

    // Simulate search latency for realism
    setTimeout(() => {
      const match = CERTIFICATES[typedId.trim().toUpperCase()];
      if (match) {
        setCertificate(match);
        setSearchId(match.id);
      } else {
        setCertificate(null);
        setSearchId(typedId);
      }
      setIsSearching(false);
      setHasSearched(true);
    }, 800);
  };

  const handleQuickTest = (id: string) => {
    setTypedId(id);
    setIsSearching(true);
    setHasSearched(false);
    setCertificate(null);

    setTimeout(() => {
      const match = CERTIFICATES[id];
      setCertificate(match || null);
      setSearchId(id);
      setIsSearching(false);
      setHasSearched(true);
    }, 450);
  };

  const handleReset = () => {
    setTypedId('');
    setSearchId('');
    setCertificate(null);
    setHasSearched(false);
  };

  return (
    <section id="verify-certificate" className="py-24 bg-slate-50 relative overflow-hidden border-t border-slate-200/50">
      {/* Background glowing effects */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16" id="certificate-header">
          <span className="text-xs font-mono text-teal-800 uppercase tracking-widest font-semibold border border-teal-200 px-3 py-1 bg-teal-50 rounded-full inline-block mb-3">
            Secure Cryptographic Service
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            Verify Intern <span className="text-teal-600">Credentials</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base">
            Every technical completion credential can be audited in real-time. Enter the certificate reference ID to instantly inspect authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Certificate Input Control Panel */}
          <div className="lg:col-span-4 bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-sm" id="verification-panel">
            <h3 className="text-lg font-bold text-slate-950 mb-2 tracking-tight">Credential Audit</h3>
            <p className="text-slate-500 text-xs leading-relaxed mb-6">
              Enter the unique reference printed on any official InternDesk (or legacy Zidio) completion certificate.
            </p>

            <form onSubmit={handleSearch} className="space-y-4" id="certificate-query-form">
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. ID-FRONTEND-2026"
                  value={typedId}
                  onChange={(e) => setTypedId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-4 pr-10 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all uppercase font-mono tracking-widest"
                />
                <button
                  type="submit"
                  id="search-btn-inside-input"
                  className="absolute right-3 top-3.5 text-slate-400 hover:text-teal-600 transition-colors"
                >
                  <Search className="w-4 h-4" />
                </button>
              </div>

              <button
                type="submit"
                id="verify-portal-btn"
                disabled={isSearching || !typedId.trim()}
                className="w-full bg-teal-600 hover:bg-teal-700 disabled:bg-slate-100 disabled:text-slate-400 text-white font-bold py-3.5 rounded-xl text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-teal-600/10"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    Querying Ledger...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    Validate Signature
                  </>
                )}
              </button>
            </form>

            {/* Micro Quick Tests */}
            <div className="mt-8 border-t border-slate-150 pt-6" id="quick-leads-panel">
              <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-3">
                Quick Validation Sandbox Codes
              </span>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                Click any pre-configured registration reference below to evaluate certificate UI layout models:
              </p>
              <div className="flex flex-col gap-2">
                {Object.keys(CERTIFICATES).map((id) => (
                  <button
                    key={id}
                    id={`quick-code-${id}`}
                    onClick={() => handleQuickTest(id)}
                    className="w-full text-left p-3 bg-slate-50 border border-slate-200/80 rounded-xl hover:border-teal-500/30 hover:bg-white font-mono text-xs text-slate-700 hover:text-teal-700 flex items-center justify-between transition-all group"
                  >
                    <span>{id}</span>
                    <span className="text-[9px] uppercase tracking-wider font-semibold text-slate-400 group-hover:text-teal-600">
                      Run Audit &rarr;
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Certificate Render Stage */}
          <div className="lg:col-span-8 flex flex-col items-center justify-center min-h-[400px]" id="verification-preview-box">
            {isSearching ? (
              <div className="flex flex-col items-center text-center p-8 bg-white border border-slate-200 rounded-2xl w-full max-w-xl shadow-xl">
                <RefreshCw className="w-12 h-12 text-teal-600 animate-spin mb-4" />
                <h4 className="text-base font-bold text-slate-900 tracking-tight">Locating Credential Registry...</h4>
                <p className="text-xs text-slate-500 mt-1 max-w-xs leading-relaxed">
                  Cryptographically checking hash signatures and verification indexes against static ledger entries.
                </p>
              </div>
            ) : hasSearched ? (
              certificate ? (
                /* Beautiful High Fidelity CSS-Driven Certificate */
                <div className="w-full flex flex-col items-center" id="active-printable-credential">
                  {/* Outer Frame with Gold Bordering */}
                  <div className="w-full max-w-3xl aspect-[1.414/1] bg-white border-8 border-double border-teal-600/30 p-6 sm:p-10 rounded-2xl shadow-2xl relative overflow-hidden text-center flex flex-col justify-between border-slate-200">
                    {/* Corner Borders */}
                    <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-teal-550/40" />
                    <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-teal-550/40" />
                    <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-teal-550/40" />
                    <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-teal-550/40" />

                    {/* Watermark Logo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
                      <Award className="w-[30%] h-[30%] text-teal-600" />
                    </div>

                    {/* Header */}
                    <div className="flex flex-col items-center">
                      <div className="flex items-center gap-2 mb-2">
                        <Award className="w-8 h-8 text-teal-600" />
                        <span className="text-xs font-mono font-bold tracking-widest text-teal-600 uppercase">
                          InternDesk Development & Training
                        </span>
                      </div>
                      <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 uppercase tracking-wider mb-2">
                        Certificate of Internship Completion
                      </h4>
                      <div className="w-40 h-0.5 bg-gradient-to-r from-transparent via-teal-550 to-transparent" />
                    </div>

                    {/* Body */}
                    <div className="my-4 sm:my-6 space-y-4">
                      <p className="text-xs sm:text-sm font-sans italic text-slate-500">
                        This document and cryptographic record serves to certify that
                      </p>
                      <h3 className="text-xl sm:text-3xl font-serif font-extrabold text-slate-900 tracking-wide underline decoration-teal-600/30 decoration-double">
                        {certificate.studentName}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
                        has successfully finished a dedicated, performance-reviewed technical Virtual Internship in the stream of{' '}
                        <span className="text-teal-600 font-bold">{certificate.domain}</span> organized by InternDesk Development & Training.
                      </p>
                      <p className="text-[11px] sm:text-xs text-slate-500">
                        The candidate maintained dynamic code updates and compiled milestone pipelines from{' '}
                        <span className="text-slate-800 font-medium">{certificate.startDate}</span> to{' '}
                        <span className="text-slate-800 font-medium">{certificate.endDate}</span>, securing an overall performance grade index of{' '}
                        <span className="text-teal-600 font-bold uppercase">{certificate.grade}</span>.
                      </p>
                    </div>

                    {/* Footer / Signatures block */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 items-end pt-4 sm:pt-6 border-t border-slate-100 relative">
                      {/* Left Sign */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-teal-700/90 italic font-serif mb-1">Amit Kumar</span>
                        <div className="w-24 h-px bg-slate-200" />
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1 font-mono font-semibold">
                          Director of Training
                        </span>
                      </div>

                      {/* Golden verified stamp in center (hidden on small mobile grid layout) */}
                      <div className="hidden md:flex flex-col items-center justify-center relative">
                        <div className="w-12 h-12 rounded-full border border-teal-200 bg-teal-50 flex items-center justify-center text-teal-600 absolute -top-8 animate-pulse shadow-lg shadow-teal-600/5">
                          <ShieldCheck className="w-7 h-7" />
                        </div>
                        <span className="text-[8px] uppercase tracking-widest text-slate-400 mt-5 font-mono font-extrabold">
                          Verified Audit
                        </span>
                      </div>

                      {/* Right Sign */}
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-teal-700/90 italic font-serif mb-1">Nikhil K.</span>
                        <div className="w-24 h-px bg-slate-200" />
                        <span className="text-[9px] uppercase tracking-wider text-slate-400 mt-1 font-mono font-semibold">
                          Lead Tech Architect
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Cryptographic Auditing metadata panel */}
                  <div className="w-full max-w-3xl mt-4 p-4 bg-white border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-teal-50 text-teal-600 rounded-lg border border-teal-100">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div className="text-left">
                        <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest block">
                          Security Sign Verification Hash SHA-256
                        </span>
                        <code className="text-[10px] text-slate-600 font-mono break-all font-semibold">
                          {certificate.verificationHash}
                        </code>
                      </div>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto shrink-0">
                      <button
                        id="audit-reset-btn"
                        onClick={handleReset}
                        className="flex-1 sm:flex-none justify-center bg-slate-50 border border-slate-200 text-slate-500 hover:text-slate-800 hover:bg-slate-100 py-2 px-3 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all"
                      >
                        Reset Audit
                      </button>
                      <button
                        id="print-certificate-btn"
                        onClick={() => window.print()}
                        className="flex-1 sm:flex-none justify-center bg-teal-600 hover:bg-teal-700 text-white py-2 px-4.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-md shadow-teal-600/10 cursor-pointer"
                      >
                        <Download className="w-4 h-4" /> Download PDF
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Failed audit warning card */
                <div className="w-full max-w-md bg-white border border-red-200 p-8 rounded-2xl flex flex-col items-center text-center shadow-md" id="failed-record-banner">
                  <div className="w-12 h-12 rounded-full bg-red-50 border-2 border-red-500 text-red-650 flex items-center justify-center mb-5">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 tracking-tight">Audit Failed: Record Not Found</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-sm">
                    No matching internships completion record matches the ID <span className="text-red-700 font-mono font-bold">{searchId}</span> inside our system ledger.
                  </p>
                  <p className="text-xs text-slate-400 mt-5 leading-relaxed max-w-sm">
                    Please correct typographical issues or confirm with onboarding support at <span className="text-teal-700 font-semibold font-mono">support@interndesk.com</span>.
                  </p>
                  <div className="mt-8 flex gap-3 w-full">
                    <button
                      id="reset-fail-btn"
                      onClick={handleReset}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-700 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-100 transition-colors"
                    >
                      Clear Portal Query
                    </button>
                  </div>
                </div>
              )
            ) : (
              /* Default State: Waiting for Audit trigger */
              <div className="w-full max-w-md bg-white border border-slate-200 p-8 rounded-2xl flex flex-col items-center text-center relative shadow-sm" id="credential-state-empty">
                <div className="absolute top-3 right-3 text-teal-600/40">
                  <Sparkles className="w-4 h-4 animate-ping" />
                </div>
                <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mb-5 border border-teal-105">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-slate-900 tracking-tight">Idle State: Audits Module Powered</h4>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-xs">
                  To audit credential hashes, write (or click) any active reference from the validator pane. Verified results render dynamically.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
