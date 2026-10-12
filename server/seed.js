/**
 * seed.js – Seeds initial companies, internships, and one sample application.
 * Run once: node server/seed.js
 * Safe to re-run – uses findOrCreate / upsert.
 */
import dotenv from 'dotenv';
dotenv.config();

import { sequelize, Company, Internship, Application, Notification } from './models/index.js';

const COMPANIES = [
  {
    name: 'TechCorp Solutions',
    domain: 'techcorp.example.com',
    industry: 'Software & Cloud Services',
    location: 'Bengaluru, India',
    rating: 4.8,
    reviewsCount: 142,
    openPositionsCount: 4,
    description: 'Leading global provider of cloud enterprise software and AI solutions.',
    tagline: 'Empowering enterprise agility with modern cloud technology',
    logoColor: '#0A66C2',
    isVerified: true,
    verificationStatus: 'verified',
    website: 'https://techcorp.example.com',
    recruiterName: 'Anil Sharma',
    recruiterEmail: 'hr@techcorp.example.com',
    recruiterDesignation: 'Talent Acquisition Director'
  },
  {
    name: 'Innovate Labs',
    domain: 'innovatelabs.example.com',
    industry: 'Artificial Intelligence & Analytics',
    location: 'Hyderabad, India',
    rating: 4.6,
    reviewsCount: 98,
    openPositionsCount: 3,
    description: 'Pioneering generative AI and data intelligence models for modern businesses.',
    tagline: 'Next generation intelligence models and research labs',
    logoColor: '#10B981',
    isVerified: true,
    verificationStatus: 'verified',
    website: 'https://innovatelabs.example.com',
    recruiterName: 'Priya Verma',
    recruiterEmail: 'recruiting@innovatelabs.example.com',
    recruiterDesignation: 'Head of Campus Hiring'
  },
  {
    name: 'Apex Digital Media',
    domain: 'apexdigital.example.com',
    industry: 'Marketing & Creative Design',
    location: 'Mumbai, India',
    rating: 4.5,
    reviewsCount: 76,
    openPositionsCount: 2,
    description: 'Full-service digital branding, growth marketing, and creative production studio.',
    tagline: 'Brand narrative and creative digital performance',
    logoColor: '#F59E0B',
    isVerified: true,
    verificationStatus: 'verified',
    website: 'https://apexdigital.example.com',
    recruiterName: 'Rohan Mehta',
    recruiterEmail: 'careers@apexdigital.example.com',
    recruiterDesignation: 'Creative Talent Partner'
  },
  {
    name: 'FinPulse Systems',
    domain: 'finpulse.example.com',
    industry: 'FinTech & Wealth Management',
    location: 'Pune, India',
    rating: 4.7,
    reviewsCount: 110,
    openPositionsCount: 3,
    description: 'Building secure, high-frequency banking infrastructure and payment rails.',
    tagline: 'Reliable next-gen payment and banking infrastructure',
    logoColor: '#6366F1',
    isVerified: true,
    verificationStatus: 'verified',
    website: 'https://finpulse.example.com',
    recruiterName: 'Neha Deshmukh',
    recruiterEmail: 'hiring@finpulse.example.com',
    recruiterDesignation: 'Lead Technical Recruiter'
  }
];

const INTERNSHIPS = (companies) => [
  {
    title: 'Frontend Developer Intern',
    company: companies[0].name, companyId: companies[0].id,
    logo: 'TC', logoColor: '#0A66C2',
    location: 'Bengaluru, India', workMode: 'Hybrid', mode: 'Hybrid',
    stipend: '₹25,000 / month', stipendNum: 25000, stipendAmount: 25000,
    stipendCurrency: 'INR', stipendPeriod: 'month', duration: '3 Months',
    category: 'IT', department: 'Software Development',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    postedDate: '2 days ago', posted: '2 days ago', ago: '2 days ago',
    openings: 3, deadline: '2026-11-15',
    description: 'Join our core platform engineering team to build intuitive, responsive web experiences used by millions.',
    responsibilities: 'Build performant UI components using React.\nCollaborate with UX designers.\nWrite unit and integration tests.',
    eligibility: 'B.Tech / B.E / MCA in CS or related.\nStrong JS, HTML5, CSS3 fundamentals.',
    perks: ['Certificate of Completion', 'Letter of Recommendation', 'Flexible Hours', 'Pre-Placement Offer (PPO)'],
    status: 'Active', applicants: 1
  },
  {
    title: 'Data Science & ML Intern',
    company: companies[1].name, companyId: companies[1].id,
    logo: 'IL', logoColor: '#10B981',
    location: 'Hyderabad, India', workMode: 'Remote', mode: 'Remote',
    stipend: '₹30,000 / month', stipendNum: 30000, stipendAmount: 30000,
    stipendCurrency: 'INR', stipendPeriod: 'month', duration: '6 Months',
    category: 'IT', department: 'Data Science & AI',
    skills: ['Python', 'Pandas', 'Machine Learning', 'SQL', 'Scikit-Learn'],
    postedDate: '1 day ago', posted: '1 day ago', ago: '1 day ago',
    openings: 2, deadline: '2026-11-20',
    description: 'Work alongside data scientists on EDA, predictive modeling, and ML pipelines.',
    responsibilities: 'Analyze datasets.\nTrain ML algorithms.\nVisualize insights.',
    eligibility: 'CS, Statistics, or Data Science degree.\nPython proficiency.',
    perks: ['Mentorship from Senior ML Engineers', 'Certificate', 'Remote Work Stipend'],
    status: 'Active', applicants: 0
  },
  {
    title: 'UI/UX Design Intern',
    company: companies[2].name, companyId: companies[2].id,
    logo: 'AD', logoColor: '#F59E0B',
    location: 'Mumbai, India', workMode: 'On-site', mode: 'On-site',
    stipend: '₹18,000 / month', stipendNum: 18000, stipendAmount: 18000,
    stipendCurrency: 'INR', stipendPeriod: 'month', duration: '3 Months',
    category: 'IT', department: 'UI/UX Design',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    postedDate: '3 days ago', posted: '3 days ago', ago: '3 days ago',
    openings: 2, deadline: '2026-11-10',
    description: 'Create digital product interfaces, wireframes, and design system components.',
    responsibilities: 'Design wireframes in Figma.\nConduct usability testing.\nMaintain design libraries.',
    eligibility: 'Portfolio demonstrating design work.\nFigma proficiency.',
    perks: ['Workstation Provided', 'Informal Dress Code', 'Certificate', 'Networking'],
    status: 'Active', applicants: 0
  },
  {
    title: 'Business Development & Growth Intern',
    company: companies[3].name, companyId: companies[3].id,
    logo: 'FP', logoColor: '#6366F1',
    location: 'Pune, India', workMode: 'Hybrid', mode: 'Hybrid',
    stipend: '₹20,000 / month', stipendNum: 20000, stipendAmount: 20000,
    stipendCurrency: 'INR', stipendPeriod: 'month', duration: '2 Months',
    category: 'NON IT', department: 'Business Development',
    skills: ['Market Research', 'Lead Generation', 'Sales', 'Communication', 'CRM'],
    postedDate: '4 days ago', posted: '4 days ago', ago: '4 days ago',
    openings: 4, deadline: '2026-11-25',
    description: 'Identify partnership opportunities and assist in client relationship management.',
    responsibilities: 'Conduct market analysis.\nEngage prospects via email/LinkedIn.\nPrepare pitch decks.',
    eligibility: 'BBA / MBA / Commerce with excellent communication.',
    perks: ['Performance-Based Incentives', 'Certificate', 'PPO Opportunity'],
    status: 'Active', applicants: 0
  },
  {
    title: 'Full Stack Engineering Intern',
    company: companies[0].name, companyId: companies[0].id,
    logo: 'TC', logoColor: '#0A66C2',
    location: 'Bengaluru, India', workMode: 'Remote', mode: 'Remote',
    stipend: '₹28,000 / month', stipendNum: 28000, stipendAmount: 28000,
    stipendCurrency: 'INR', stipendPeriod: 'month', duration: '6 Months',
    category: 'IT', department: 'Full Stack Development',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
    postedDate: '5 days ago', posted: '5 days ago', ago: '5 days ago',
    openings: 3, deadline: '2026-11-18',
    description: 'Develop full-stack features from database schema to REST APIs and React interfaces.',
    responsibilities: 'Write backend routes.\nConnect frontend with APIs.\nParticipate in code reviews.',
    eligibility: 'Proficiency in Node.js and React.',
    perks: ['Certificate', 'Monthly Team Outings', 'Mentorship'],
    status: 'Active', applicants: 0
  }
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');

    // Disable FK checks and drop all existing tables cleanly
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
    const [tables] = await sequelize.query('SHOW TABLES;');
    for (const row of tables) {
      const tableName = Object.values(row)[0];
      await sequelize.query(`DROP TABLE IF EXISTS \`${tableName}\`;`);
    }
    await sequelize.sync({ force: true });
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('✅ Tables synced and initialized.');

    // Seed Companies
    const seededCompanies = [];
    for (const c of COMPANIES) {
      const [comp] = await Company.findOrCreate({
        where: { recruiterEmail: c.recruiterEmail },
        defaults: c
      });
      seededCompanies.push(comp);
    }
    console.log(`✅ ${seededCompanies.length} companies seeded.`);

    // Seed Internships
    const existingCount = await Internship.count();
    let seededJobs = [];
    if (existingCount === 0) {
      seededJobs = await Internship.bulkCreate(INTERNSHIPS(seededCompanies));
      console.log(`✅ ${seededJobs.length} internships seeded.`);
    } else {
      seededJobs = await Internship.findAll();
      console.log(`ℹ️  Internships already exist (${existingCount}), skipping seed.`);
    }

    // Seed one sample application
    const sampleJob = seededJobs[0];
    if (sampleJob) {
      await Application.findOrCreate({
        where: { candidateEmail: 'student@example.com', jobId: sampleJob.id },
        defaults: {
          jobId: sampleJob.id,
          jobTitle: sampleJob.title,
          title: sampleJob.title,
          company: sampleJob.company,
          companyId: sampleJob.companyId,
          logoColor: sampleJob.logoColor,
          category: sampleJob.category,
          status: 'Under Review',
          nextStep: 'The hiring team is currently reviewing your application portfolio.',
          appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
          studentName: 'Khushi Sharma',
          name: 'Khushi Sharma',
          candidateEmail: 'student@example.com',
          candidatePhone: '+91 98765 43210',
          phone: '+91 98765 43210',
          college: 'State Technical University',
          course: 'B.Tech Computer Science',
          score: 92,
          resumeKey: 'khushi_resume.pdf'
        }
      });
      console.log('✅ Sample application seeded.');
    }

    // Welcome notification
    await Notification.findOrCreate({
      where: { title: 'Welcome to InternDesk!' },
      defaults: {
        title: 'Welcome to InternDesk!',
        message: 'Browse verified company internship openings and launch your career.',
        isRead: false
      }
    });
    console.log('✅ Welcome notification seeded.');

    console.log('\n🎉 Database seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed error:', err.message);
    process.exit(1);
  }
}

seed();
