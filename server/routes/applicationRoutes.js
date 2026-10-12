import express from 'express';
import {
  applyForInternship,
  getStudentApplications,
  getCompanyApplications,
  updateApplicationStatus,
  deleteApplication
} from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getStudentApplications);
router.get('/company', getCompanyApplications);
router.post('/apply/:id', applyForInternship);
router.patch('/:id/status', updateApplicationStatus);
router.delete('/:id', deleteApplication);

export default router;
