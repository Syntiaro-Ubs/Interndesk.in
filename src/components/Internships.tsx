/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { INTERNSHIPS } from '../data/internships';
import { InternshipPost, ApplicationForm } from '../types';
import {
  Calendar,
  Layers,
  Award,
  Sparkles,
  ChevronRight,
  CheckCircle,
  FileText,
  User,
  Mail,
  Phone,
  School,
  GraduationCap,
  X,
  FileCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Internships() {
  const [selectedInternship, setSelectedInternship] = useState<InternshipPost | null>(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [applyDomain, setApplyDomain] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [appId, setAppId] = useState('');

  const [formData, setFormData] = useState<ApplicationForm>({
    name: '',
    email: '',
    phone: '',
    college: '',
    department: '',
    graduationYear: '2027',
    internshipDomain: '',
    statementOfPurpose: ''
  });

  const [formErrors, setFormErrors] = useState<Partial<ApplicationForm>>({});

  const handleApplyClick = (post: InternshipPost) => {
    setFormData({
      ...formData,
      internshipDomain: post.title
    });
    setApplyDomain(post.title);
    setFormErrors({});
    setIsSubmitted(false);
    setIsApplyModalOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    // Clear error
    if (formErrors[name as keyof ApplicationForm]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<ApplicationForm> = {};
    if (!formData.name.trim()) errors.name = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Invalid email address configuration';
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (formData.phone.trim().length < 8) {
      errors.phone = 'Minimum 8 digits required';
    }
    if (!formData.college.trim()) errors.college = 'College or University name is required';
    if (!formData.department.trim()) errors.department = 'Branch or Specialization is required';
    if (!formData.statementOfPurpose.trim()) {
      errors.statementOfPurpose = 'Please write a brief background statement representing interest';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Simulate database save
      const generatedId = `IDD-${Math.floor(1000 + Math.random() * 9000)}-${Date.now().toString().slice(-4)}`;
      setAppId(generatedId);
      setIsSubmitted(true);
    }
  };

  const handleCloseApplyModal = () => {
    setIsApplyModalOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: '',
      department: '',
      graduationYear: '2027',
      internshipDomain: '',
      statementOfPurpose: ''
    });
    setIsSubmitted(false);
    setAppId('');
  };

  return (
    <section id="internships" className="py-24 bg-white relative overflow-hidden border-t border-slate-200/50">
      {/* Background blobs */}
      <div className="absolute top-1/3 left-1/3 w-[450px] h-[450px] bg-teal-500/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        <div className="text-center mb-16" id="internships-header-wrapper">
          <span className="text-xs font-mono text-teal-800 uppercase tracking-widest font-semibold border border-teal-200 px-3 py-1 bg-teal-50 rounded-full inline-block mb-3">
            Build Hands-On Credentials
          </span>
          <h2 className="text-3xl sm:text-4xl font-sans font-bold text-slate-900 tracking-tight">
            Virtual Internship <span className="text-teal-600">Programs</span>
          </h2>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-base">
            Equip yourself with structured engineering sprints. Tackle production tasks, get certified, and unlock elite Letters of Recommendation.
          </p>
        </div>

        {/* Internships grid */}
        <div id="internships-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {INTERNSHIPS.map((post) => (
            <div
              key={post.id}
              id={`internship-card-${post.id}`}
              className="group p-6 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col justify-between hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 transform hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono font-semibold text-slate-600 bg-white border border-slate-200/80 px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {post.category}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-md uppercase border ${
                      post.difficulty === 'Beginner'
                        ? 'text-teal-700 bg-teal-50 border-teal-200'
                        : post.difficulty === 'Intermediate'
                        ? 'text-blue-700 bg-blue-50 border-blue-200'
                        : 'text-amber-700 bg-amber-50 border-amber-200'
                    }`}
                  >
                    {post.difficulty}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-950 tracking-tight mb-3 group-hover:text-teal-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-3">
                  {post.description}
                </p>

                {/* Scope points */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {post.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 bg-white border border-slate-200 text-[10px] text-slate-500 font-medium rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                  {post.skills.length > 3 && (
                    <span className="px-2 py-0.5 bg-white border border-slate-200 text-[10px] text-slate-500 font-medium rounded-md">
                      +{post.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 border-t border-slate-100 pt-4">
                <button
                  id={`details-btn-${post.id}`}
                  onClick={() => setSelectedInternship(post)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-200 cursor-pointer"
                >
                  Full Syllabus
                </button>
                <button
                  id={`apply-btn-${post.id}`}
                  onClick={() => handleApplyClick(post)}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-xl text-xs font-bold tracking-wide shadow-lg shadow-teal-600/15 transition-all duration-200 cursor-pointer"
                >
                  Apply Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Syllabus details modal */}
      <AnimatePresence>
        {selectedInternship && (
          <div
            id="internship-detail-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md"
            onClick={() => setSelectedInternship(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              id="internship-detail-modal"
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="close-internship-modal"
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg transition-colors"
                onClick={() => setSelectedInternship(null)}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-start gap-4 mb-6">
                <div>
                  <span className="text-[10px] font-mono font-semibold text-teal-600 tracking-wider uppercase block mb-1">
                    {selectedInternship.category}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                    {selectedInternship.title}
                  </h4>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-4 h-4 text-teal-600" />
                      Duration: {selectedInternship.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Layers className="w-4 h-4 text-teal-600" />
                      Level: {selectedInternship.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-100 py-5">
                <h5 className="text-sm font-bold text-slate-900 mb-2">Program Overview</h5>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedInternship.description}
                </p>
              </div>

              {/* Tasks / Modules */}
              <div className="border-t border-slate-100 py-5">
                <h5 className="text-sm font-bold text-slate-900 mb-3">Key Project Modules</h5>
                <div className="space-y-2.5">
                  {selectedInternship.tasks.map((task, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-650 leading-relaxed">
                      <span className="w-5 h-5 rounded-md bg-teal-50 text-teal-750 font-mono flex items-center justify-center shrink-0 mt-0.5 border border-teal-100">
                        {idx + 1}
                      </span>
                      {task}
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills and perks dual columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-slate-100 py-5">
                <div>
                  <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-600" /> Core Tech Covered
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedInternship.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-slate-50 border border-slate-200 text-xs text-slate-600 font-medium rounded-lg"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-teal-600" /> Professional Perks
                  </h5>
                  <ul className="space-y-1.5">
                    {selectedInternship.perks.map((per, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 text-xs text-slate-605">
                        <ChevronRight className="w-3.5 h-3.5 text-teal-600 shrink-0 mt-0.5" />
                        {per}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                <button
                  id="modal-apply-btn"
                  onClick={() => {
                    const post = selectedInternship;
                    setSelectedInternship(null);
                    handleApplyClick(post);
                  }}
                  className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3.5 rounded-xl text-sm font-bold tracking-wide text-center block transition-colors cursor-pointer"
                >
                  Begin Academic Application
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main interactive application modal */}
      <AnimatePresence>
        {isApplyModalOpen && (
          <div
            id="apply-form-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-md"
            onClick={handleCloseApplyModal}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              id="apply-form-modal"
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                id="close-apply-modal"
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-lg transition-colors"
                onClick={handleCloseApplyModal}
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  <div className="mb-6">
                    <span className="text-xs font-mono text-teal-600 uppercase tracking-widest font-semibold mb-1 block">
                      Enrollment Gateway
                    </span>
                    <h4 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight">
                      Enroll in <span className="text-teal-600">{applyDomain}</span>
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Complete all fields to verify registration for our upcoming virtual cohort.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4" id="internship-application-form">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-teal-600" /> Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Aarav Sharma"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                      />
                      {formErrors.name && (
                        <p className="text-xs text-red-600 font-medium mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    {/* Dual Email & Phone column */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Email */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-teal-600" /> Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="e.g. aaravsharma@gmail.com"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                        />
                        {formErrors.email && (
                          <p className="text-xs text-red-600 font-medium mt-1">{formErrors.email}</p>
                        )}
                      </div>

                      {/* Phone */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-teal-600" /> Contact Number
                        </label>
                        <input
                          type="text"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="e.g. +91 98765 43210"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                        />
                        {formErrors.phone && (
                          <p className="text-xs text-red-600 font-medium mt-1">{formErrors.phone}</p>
                        )}
                      </div>
                    </div>

                    {/* College & Department */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* College */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <School className="w-3.5 h-3.5 text-teal-600" /> College / University
                        </label>
                        <input
                          type="text"
                          name="college"
                          value={formData.college}
                          onChange={handleInputChange}
                          placeholder="e.g. IIT Bengaluru"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                        />
                        {formErrors.college && (
                          <p className="text-xs text-red-650 font-medium mt-1">{formErrors.college}</p>
                        )}
                      </div>

                      {/* Branch */}
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                          <GraduationCap className="w-3.5 h-3.5 text-teal-600" /> Specialization
                        </label>
                        <input
                          type="text"
                          name="department"
                          value={formData.department}
                          onChange={handleInputChange}
                          placeholder="e.g. Computer Science Engineering"
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all"
                        />
                        {formErrors.department && (
                          <p className="text-xs text-red-650 font-medium mt-1">{formErrors.department}</p>
                        )}
                      </div>
                    </div>

                    {/* Domain Select & Graduation Year */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Internship Domain
                        </label>
                        <select
                          name="internshipDomain"
                          value={formData.internshipDomain}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-teal-500 focus:bg-white transition-all appearance-none"
                        >
                          {INTERNSHIPS.map((post) => (
                            <option key={post.id} value={post.title} className="bg-white text-slate-900">
                              {post.title}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5">
                          Graduation Year
                        </label>
                        <select
                          name="graduationYear"
                          value={formData.graduationYear}
                          onChange={handleInputChange}
                          className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 focus:outline-none focus:border-teal-500 focus:bg-white transition-all appearance-none"
                        >
                          <option value="2025" className="bg-white text-slate-900">2025</option>
                          <option value="2026" className="bg-white text-slate-900">2026</option>
                          <option value="2027" className="bg-white text-slate-900">2027</option>
                          <option value="2028" className="bg-white text-slate-900">2028</option>
                          <option value="2029" className="bg-white text-slate-900">2029</option>
                        </select>
                      </div>
                    </div>

                    {/* Statement of purpose */}
                    <div>
                      <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <FileText className="w-3.5 h-3.5 text-teal-600" /> SOP / Code Interest Statement
                      </label>
                      <textarea
                        name="statementOfPurpose"
                        rows={3}
                        value={formData.statementOfPurpose}
                        onChange={handleInputChange}
                        placeholder="Write 2-3 sentences explaining why you want to enroll in this specific technical stream..."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:border-teal-500 focus:bg-white transition-all resize-none"
                      />
                      {formErrors.statementOfPurpose && (
                        <p className="text-xs text-red-650 font-medium mt-1">{formErrors.statementOfPurpose}</p>
                      )}
                    </div>

                    <div className="pt-4" id="submit-application-wrapper">
                      <button
                        type="submit"
                        id="submit-applicant-btn"
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-teal-600/10"
                      >
                        Submit Technical Registration
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                <div className="flex flex-col items-center text-center py-8" id="application-success-banner">
                  {/* Animation circle success */}
                  <div className="w-16 h-16 rounded-full bg-teal-50 border-2 border-teal-552 text-teal-600 flex items-center justify-center mb-6 animate-pulse">
                    <FileCheck className="w-8 h-8" />
                  </div>

                  <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
                    Application Filed!
                  </h4>
                  <p className="text-slate-600 text-sm max-w-sm mb-6">
                    Congratulations, your digital slot in our <span className="text-teal-600 font-semibold">{formData.name}</span> cohort ({formData.internshipDomain}) has been temporarily reserved.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 w-full max-w-xs mb-8">
                    <span className="text-[10px] font-mono font-semibold text-slate-500 uppercase tracking-wider block">
                      Registration Reference
                    </span>
                    <span className="text-lg font-mono font-bold text-teal-600 tracking-wider">
                      {appId}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-6">
                    Our cohort onboarding coordinators will send a welcome package guide and syllabus roadmap to <span className="text-slate-900 font-medium">{formData.email}</span> within 24 working hours.
                  </p>

                  <button
                    id="finish-apply-btn"
                    onClick={handleCloseApplyModal}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-colors"
                  >
                    Return to Portal
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
