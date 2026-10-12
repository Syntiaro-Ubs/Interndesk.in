/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MockCertificate } from '../types';

export const CERTIFICATES: Record<string, MockCertificate> = {
  'ID-FRONTEND-2026': {
    id: 'ID-FRONTEND-2026',
    studentName: 'Aarav Sharma',
    domain: 'Frontend Web Development',
    startDate: 'March 1, 2026',
    endDate: 'April 26, 2026',
    grade: 'A+',
    issueDate: 'April 28, 2026',
    verificationHash: 'sha256-a4f6e3c2b1d0e5f9g7h8i9j0k1l2m3n4'
  },
  'ID-PYTHON-2026': {
    id: 'ID-PYTHON-2026',
    studentName: 'Priya Patel',
    domain: 'Python Development',
    startDate: 'February 15, 2026',
    endDate: 'April 15, 2026',
    grade: 'A',
    issueDate: 'April 18, 2026',
    verificationHash: 'sha256-c2b1d0e5f9g7h8i9j0k1l2m3n4a4f6e3'
  },
  'ID-DATASCIENCE-2026': {
    id: 'ID-DATASCIENCE-2026',
    studentName: 'Rohan Deshmukh',
    domain: 'Data Science & Analytics',
    startDate: 'January 10, 2026',
    endDate: 'March 10, 2026',
    grade: 'O (Outstanding)',
    issueDate: 'March 12, 2026',
    verificationHash: 'sha256-d0e5f9g7h8i9j0k1l2m3n4a4f6e3c2b1'
  },
  'ID-UIUX-2026': {
    id: 'ID-UIUX-2026',
    studentName: 'Meera Nair',
    domain: 'UI/UX Design',
    startDate: 'April 1, 2026',
    endDate: 'May 15, 2026',
    grade: 'A',
    issueDate: 'May 18, 2026',
    verificationHash: 'sha256-f9g7h8i9j0k1l2m3n4a4f6e3c2b1d0e5'
  }
};
