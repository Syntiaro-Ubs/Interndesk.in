import { Application, Internship, Company, Notification } from '../models/index.js';
import { Op } from 'sequelize';

export const applyForInternship = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      candidateName,
      candidateEmail,
      candidatePhone,
      phone,
      resumeKey,
      coverNote = '',
      college = 'State Technical University',
      course = 'B.Tech Computer Science'
    } = req.body;

    const job = await Internship.findByPk(id);
    if (!job) {
      return res.status(404).json({ error: 'Internship not found' });
    }

    const email = (candidateEmail || req.headers['x-user-email'] || 'student@example.com').toLowerCase();

    // Check if already applied
    const existingApp = await Application.findOne({
      where: {
        jobId: id,
        candidateEmail: email
      }
    });

    if (existingApp) {
      return res.status(400).json({ error: 'You have already applied for this internship.' });
    }

    const newApp = await Application.create({
      jobId: job.id,
      jobTitle: job.title || 'Internship',
      title: job.title || 'Internship',
      company: job.company || 'Company',
      companyId: job.companyId || null,
      logoColor: job.logoColor || '#0a66c2',
      category: job.category || 'IT',
      status: 'Under Review',
      nextStep: 'Application submitted. The hiring team will review your profile shortly.',
      appliedAt: new Date(),
      studentName: candidateName || 'Student Applicant',
      name: candidateName || 'Student Applicant',
      candidateEmail: email,
      candidatePhone: phone || candidatePhone || '+91 98765 43210',
      phone: phone || candidatePhone || '+91 98765 43210',
      college,
      course,
      score: Math.floor(Math.random() * 12) + 87, // 87% to 98%
      resumeKey: resumeKey || 'resume.pdf',
      coverNote
    });

    // Increment applicant count on job
    job.applicants = (job.applicants || 0) + 1;
    await job.save();

    // Send confirmation notification to student
    const confirmationNotif = await Notification.create({
      userEmail: email,
      title: `Application Sent: ${newApp.jobTitle}`,
      message: `Your application for "${newApp.jobTitle}" at ${newApp.company} has been received.`,
      status: 'Under Review',
      jobId: job.id,
      company: newApp.company,
      isRead: false
    });

    // Real-Time SSE emission
    req.app?.locals?.emit?.('application_created', newApp.toJSON());
    req.app?.locals?.emit?.('notification_created', confirmationNotif.toJSON());

    return res.status(201).json(newApp);
  } catch (err) {
    console.error('applyForInternship error:', err);
    return res.status(500).json({ error: err.message || 'Failed to submit application' });
  }
};

export const getStudentApplications = async (req, res) => {
  try {
    const userEmail = req.headers['x-user-email'];
    const where = {};

    if (userEmail) {
      where.candidateEmail = userEmail.toLowerCase();
    }

    const list = await Application.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    return res.json(list);
  } catch (err) {
    console.error('getStudentApplications error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch student applications' });
  }
};

export const getCompanyApplications = async (req, res) => {
  try {
    const userEmail = req.headers['x-user-email'];
    const { jobId } = req.query;

    let where = {};

    if (jobId) {
      where.jobId = jobId;
    } else if (userEmail) {
      const currentComp = await Company.findOne({
        where: { recruiterEmail: userEmail.toLowerCase() }
      });

      if (currentComp) {
        where = {
          [Op.or]: [
            { companyId: currentComp.id },
            { company: currentComp.name }
          ]
        };
      }
    }

    const applications = await Application.findAll({
      where,
      order: [['createdAt', 'DESC']]
    });

    const result = applications.map((app) => ({
      id: app.id,
      name: app.name || app.studentName || 'Student Applicant',
      email: app.candidateEmail || 'student@example.com',
      phone: app.phone || app.candidatePhone || '+91 98765 43210',
      college: app.college || 'State Technical University',
      course: app.course || 'B.Tech Computer Science',
      internship: app.jobTitle || app.title || 'Internship',
      internshipId: app.jobId,
      status: app.status === 'Applied' ? 'Review' : app.status,
      applied: app.appliedAt ? new Date(app.appliedAt).toLocaleDateString() : 'Today',
      appliedAt: app.appliedAt,
      resumeKey: app.resumeKey || 'resume.pdf',
      score: app.score || 88
    }));

    return res.json(result);
  } catch (err) {
    console.error('getCompanyApplications error:', err);
    return res.status(500).json({ error: err.message || 'Failed to fetch company applications' });
  }
};

export const updateApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, statusLabel } = req.body;

    const app = await Application.findByPk(id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }

    const statusMap = {
      IN_REVIEW: 'Under Review',
      Review: 'Under Review',
      INTERVIEW: 'Interview Scheduled',
      'Interview Scheduled': 'Interview Scheduled',
      SHORTLISTED: 'Shortlisted',
      Shortlisted: 'Shortlisted',
      OFFERED: 'Offer Received',
      Hired: 'Offer Received',
      REJECTED: 'Rejected',
      Rejected: 'Rejected'
    };
    const cleanStatus = statusMap[status] || statusLabel || status;

    const nextStepsMap = {
      'Under Review': 'The hiring team is currently reviewing your application portfolio.',
      'Interview Scheduled': 'Congratulations! You have an upcoming interview. Check your email for call links.',
      Shortlisted: 'You have been shortlisted for final evaluation by the hiring committee.',
      'Offer Received': 'Congratulations! You have received an internship offer letter.',
      Rejected: 'Thank you for your interest. The company has decided to proceed with other candidates.'
    };

    app.status = cleanStatus;
    app.nextStep = nextStepsMap[cleanStatus] || `Application status updated to ${cleanStatus}.`;
    await app.save();

    // Real-Time Notification for the student
    const newNotif = await Notification.create({
      userEmail: app.candidateEmail,
      title: `Application Status: ${app.jobTitle || app.title}`,
      message: `${app.company} updated your application status to "${cleanStatus}". ${nextStepsMap[cleanStatus] || ''}`,
      status: cleanStatus,
      jobId: app.jobId,
      company: app.company,
      isRead: false
    });

    req.app?.locals?.emit?.('application_status_updated', {
      application: app.toJSON(),
      notification: newNotif.toJSON()
    });

    return res.json({
      success: true,
      message: 'Application status updated and student notified',
      application: app,
      notification: newNotif
    });
  } catch (err) {
    console.error('updateApplicationStatus error:', err);
    return res.status(500).json({ error: err.message || 'Failed to update application status' });
  }
};

export const deleteApplication = async (req, res) => {
  try {
    const { id } = req.params;
    const app = await Application.findByPk(id);
    if (!app) {
      return res.status(404).json({ error: 'Application not found' });
    }
    await app.destroy();
    req.app?.locals?.emit?.('application_deleted', { id });
    return res.json({ success: true, message: 'Application deleted successfully' });
  } catch (err) {
    console.error('deleteApplication error:', err);
    return res.status(500).json({ error: err.message || 'Failed to delete application' });
  }
};
