/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface InternshipPost {
  id: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  skills: string[];
  tasks: string[];
  perks: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface MockCertificate {
  id: string;
  studentName: string;
  domain: string;
  startDate: string;
  endDate: string;
  grade: string;
  issueDate: string;
  verificationHash: string;
}

export interface ApplicationForm {
  name: string;
  email: string;
  phone: string;
  college: string;
  department: string;
  graduationYear: string;
  internshipDomain: string;
  statementOfPurpose: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}
