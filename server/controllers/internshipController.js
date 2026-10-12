import { Op } from 'sequelize';
import { Internship, Application, Notification, Company, User } from '../models/index.js';

// ── HELPER: resolve company from request ──────────────────────
async function resolveCompany(req) {
  const userEmail = req.headers['x-user-email'];
  let comp = null;
  if (userEmail) {
    const user = await User.findOne({ where: { email: userEmail.toLowerCase().trim() } });
    if (user?.companyId) {
      comp = await Company.findByPk(user.companyId);
    }
    if (!comp) {
      comp = await Company.findOne({ where: { recruiterEmail: userEmail.toLowerCase().trim() } });
    }
  }
  if (!comp && req.query.companyId) comp = await Company.findByPk(req.query.companyId);
  if (!comp && req.body?.companyId) comp = await Company.findByPk(req.body.companyId);
  return comp;
}

// ── GET ALL / SEARCH ──────────────────────────────────────────
export const getAllInternships = async (req, res) => {
  try {
    const { q, location, category, department, workMode, minStipend } = req.query;
    const where = {};

    if (q) {
      where[Op.or] = [
        { title: { [Op.like]: `%${q}%` } },
        { company: { [Op.like]: `%${q}%` } },
        { department: { [Op.like]: `%${q}%` } },
        { category: { [Op.like]: `%${q}%` } }
      ];
    }
    if (location) {
      where[Op.or] = [
        ...(where[Op.or] || []),
        { location: { [Op.like]: `%${location}%` } },
        { mode: { [Op.like]: `%${location}%` } }
      ];
    }
    if (category) {
      const cats = category.split(',').map(c => c.trim().toUpperCase());
      where.category = { [Op.in]: cats };
    }
    if (department) {
      const depts = department.split(',').map(d => d.trim());
      where.department = { [Op.in]: depts };
    }
    if (workMode) {
      const modes = workMode.split(',').map(m => m.trim());
      where.workMode = { [Op.in]: modes };
    }
    if (minStipend) {
      const min = Number(minStipend);
      if (!isNaN(min) && min > 0) where.stipendNum = { [Op.gte]: min };
    }

    const list = await Internship.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json(list.map(i => i.toJSON()));
  } catch (err) {
    console.error('getAllInternships error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── GET BY ID ─────────────────────────────────────────────────
export const getInternshipById = async (req, res) => {
  try {
    const { id } = req.params;
    let job = null;
    if (id && !isNaN(Number(id))) {
      job = await Internship.findByPk(id);
    }
    if (!job) return res.status(404).json({ error: 'Internship not found' });
    return res.json(job.toJSON());
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// ── CREATE ────────────────────────────────────────────────────
export const createInternship = async (req, res) => {
  try {
    const comp = await resolveCompany(req);
    if (!comp) return res.status(400).json({ error: 'Company not found' });

    const stipendNum = Number(req.body.stipendAmount ?? req.body.stipend ?? 0) || 0;
    const stipendFormatted = stipendNum > 0 ? `₹${stipendNum.toLocaleString('en-IN')} / month` : 'Unpaid';

    const skills = Array.isArray(req.body.skills)
      ? req.body.skills
      : typeof req.body.skills === 'string'
      ? req.body.skills.split(',').map(s => s.trim()).filter(Boolean)
      : [];

    const perks = Array.isArray(req.body.perks) ? req.body.perks : ['Certificate', 'Flexible Hours'];

    const newJob = await Internship.create({
      title: req.body.title,
      company: comp.name,
      companyId: comp.id,
      logo: comp.name.split(/\s+/).map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'CO',
      logoColor: comp.logoColor || '#0a66c2',
      location: req.body.location || comp.location || 'Remote',
      workMode: req.body.mode || req.body.workMode || 'Remote',
      mode: req.body.mode || req.body.workMode || 'Remote',
      stipend: req.body.stipend && isNaN(req.body.stipend) ? req.body.stipend : stipendFormatted,
      stipendNum,
      stipendAmount: stipendNum,
      stipendCurrency: 'INR',
      stipendPeriod: 'month',
      duration: req.body.duration || '3 Months',
      category: req.body.category || 'IT',
      department: req.body.department || 'Software Development',
      skills,
      perks,
      postedDate: 'Just now',
      posted: 'Today',
      ago: 'Just now',
      openings: Number(req.body.openings) || 1,
      deadline: req.body.deadline || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      description: req.body.description || '',
      responsibilities: req.body.responsibilities || '',
      eligibility: req.body.eligibility || '',
      status: 'Active',
      applicants: 0
    });

    // Increment company open position count
    await comp.increment('openPositionsCount');

    return res.status(201).json(newJob.toJSON());
  } catch (err) {
    console.error('createInternship error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── UPDATE ────────────────────────────────────────────────────
export const updateInternship = async (req, res) => {
  try {
    const job = await Internship.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Internship not found' });

    const newStatus = req.body.status
      ? req.body.status.toLowerCase() === 'published' ? 'Active' : req.body.status
      : job.status;

    const skills = Array.isArray(req.body.skills)
      ? req.body.skills
      : typeof req.body.skills === 'string'
      ? req.body.skills.split(',').map(s => s.trim()).filter(Boolean)
      : job.skills;

    const { internships, recruiters, companyInfo, applications, ...safeBody } = req.body;
    await job.update({ ...safeBody, status: newStatus, skills });

    // Notify students who applied to this job
    const applicants = await Application.findAll({ where: { jobId: job.id } });
    if (applicants.length > 0) {
      const notifs = applicants.map(app => ({
        userId: app.studentId,
        userEmail: app.candidateEmail,
        title: `Internship Status Update: ${job.title}`,
        message: `${job.company} has updated the status of "${job.title}" to "${newStatus}".`,
        status: newStatus,
        jobId: job.id,
        company: job.company,
        isRead: false
      }));
      await Notification.bulkCreate(notifs);
      req.app?.locals?.emit?.('notifications_created', notifs);
    }

    req.app?.locals?.emit?.('internship_updated', job.toJSON());
    return res.json(job.toJSON());
  } catch (err) {
    console.error('updateInternship error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── CLOSE ─────────────────────────────────────────────────────
export const closeInternship = async (req, res) => {
  try {
    const job = await Internship.findByPk(req.params.id);
    if (!job) return res.status(404).json({ error: 'Internship not found' });

    await job.update({ status: 'Closed' });

    const applicants = await Application.findAll({ where: { jobId: job.id } });
    if (applicants.length > 0) {
      const notifs = applicants.map(app => ({
        userId: app.studentId,
        userEmail: app.candidateEmail,
        title: `Job Post Closed: ${job.title}`,
        message: `${job.company} has closed applications for the ${job.title} internship.`,
        status: 'Closed',
        jobId: job.id,
        company: job.company,
        isRead: false
      }));
      await Notification.bulkCreate(notifs);
    }

    return res.json({ success: true, message: 'Internship closed successfully', job: job.toJSON() });
  } catch (err) {
    console.error('closeInternship error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── COMPANY INTERNSHIPS ───────────────────────────────────────
export const getCompanyInternships = async (req, res) => {
  try {
    const comp = await resolveCompany(req);
    if (!comp) return res.json([]);

    const jobs = await Internship.findAll({
      where: { companyId: comp.id },
      order: [['createdAt', 'DESC']]
    });
    return res.json(jobs.map(j => j.toJSON()));
  } catch (err) {
    console.error('getCompanyInternships error:', err);
    return res.status(500).json({ error: err.message });
  }
};

// ── DYNAMIC INTERNSHIP FILTERS ───────────────────────────────
export const getInternshipFilters = async (req, res) => {
  try {
    const jobs = await Internship.findAll({
      attributes: ['category', 'department', 'workMode', 'duration']
    });
    const categories = [...new Set(jobs.map(j => j.category).filter(Boolean))];
    const departments = [...new Set(jobs.map(j => j.department).filter(Boolean))];
    const workModes = [...new Set(jobs.map(j => j.workMode).filter(Boolean))];
    const durations = [...new Set(jobs.map(j => j.duration).filter(Boolean))];

    return res.json({
      categories: categories.length ? categories : ['IT', 'NON IT'],
      departments: departments.length ? departments : ['Software Development', 'Data Science & AI', 'Full Stack Development', 'Business Development'],
      workModes: workModes.length ? workModes : ['Remote', 'Hybrid', 'On-site'],
      durations: durations.length ? durations : ['2 Months', '3 Months', '6 Months']
    });
  } catch (err) {
    console.error('getInternshipFilters error:', err);
    return res.status(500).json({ error: err.message });
  }
};
