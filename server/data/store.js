import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, 'db.json');

const INITIAL_COMPANIES = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

const INITIAL_INTERNSHIPS = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    companyId: 1,
    companyLogo: null,
    logo: 'TC',
    logoColor: '#0A66C2',
    location: 'Bengaluru, India',
    workMode: 'Hybrid',
    mode: 'Hybrid',
    stipend: '₹25,000 / month',
    stipendNum: 25000,
    stipendAmount: 25000,
    stipendCurrency: 'INR',
    stipendPeriod: 'month',
    duration: '3 Months',
    category: 'IT',
    department: 'Software Development',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    postedDate: '2 days ago',
    posted: '2 days ago',
    ago: '2 days ago',
    openings: 3,
    deadline: '2026-11-15',
    description: 'Join our core platform engineering team to build intuitive, responsive web experiences used by millions of enterprise users worldwide.',
    responsibilities: 'Build performant UI components using React and Tailwind CSS.\nCollaborate with UX designers to translate Figma prototypes into pixel-perfect code.\nWrite unit and integration tests for frontend features.',
    eligibility: 'B.Tech / B.E / MCA in Computer Science or related degree.\nStrong fundamentals in JavaScript, HTML5, and CSS3.\nFamiliarity with Git and modern frontend tooling.',
    perks: ['Certificate of Completion', 'Letter of Recommendation', 'Flexible Hours', 'Pre-Placement Offer (PPO)'],
    status: 'Active',
    applicants: 1
  },
  {
    id: 2,
    title: 'Data Science & ML Intern',
    company: 'Innovate Labs',
    companyId: 2,
    companyLogo: null,
    logo: 'IL',
    logoColor: '#10B981',
    location: 'Hyderabad, India',
    workMode: 'Remote',
    mode: 'Remote',
    stipend: '₹30,000 / month',
    stipendNum: 30000,
    stipendAmount: 30000,
    stipendCurrency: 'INR',
    stipendPeriod: 'month',
    duration: '6 Months',
    category: 'IT',
    department: 'Data Science & AI',
    skills: ['Python', 'Pandas', 'Machine Learning', 'SQL', 'Scikit-Learn'],
    postedDate: '1 day ago',
    posted: '1 day ago',
    ago: '1 day ago',
    openings: 2,
    deadline: '2026-11-20',
    description: 'Work alongside data scientists on exploratory data analysis, predictive modeling, and deploying ML pipelines into production.',
    responsibilities: 'Analyze structured and unstructured datasets to identify patterns.\nTrain and fine-tune baseline machine learning algorithms.\nVisualize insights and present findings to product stakeholders.',
    eligibility: 'Degree in Computer Science, Statistics, Mathematics, or Data Science.\nProficiency in Python and numerical libraries.\nUnderstanding of fundamental statistical techniques.',
    perks: ['Mentorship from Senior ML Engineers', 'Certificate', 'Remote Work Stipend'],
    status: 'Active',
    applicants: 0
  },
  {
    id: 3,
    title: 'UI/UX Design Intern',
    company: 'Apex Digital Media',
    companyId: 3,
    companyLogo: null,
    logo: 'AD',
    logoColor: '#F59E0B',
    location: 'Mumbai, India',
    workMode: 'On-site',
    mode: 'On-site',
    stipend: '₹18,000 / month',
    stipendNum: 18000,
    stipendAmount: 18000,
    stipendCurrency: 'INR',
    stipendPeriod: 'month',
    duration: '3 Months',
    category: 'IT',
    department: 'UI/UX Design',
    skills: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
    postedDate: '3 days ago',
    posted: '3 days ago',
    ago: '3 days ago',
    openings: 2,
    deadline: '2026-11-10',
    description: 'Create delightful digital product interfaces, user journeys, wireframes, and design system components for client web and mobile apps.',
    responsibilities: 'Design low-fidelity wireframes and interactive prototypes in Figma.\nConduct usability testing sessions with real users.\nMaintain design token libraries and style guides.',
    eligibility: 'Portfolio demonstrating web/mobile product design work.\nProficiency with Figma and component libraries.\nPassionate about typography, color theory, and accessibility.',
    perks: ['Workstation Provided', 'Informal Dress Code', 'Certificate', 'Networking Opportunities'],
    status: 'Active',
    applicants: 0
  },
  {
    id: 4,
    title: 'Business Development & Growth Intern',
    company: 'FinPulse Systems',
    companyId: 4,
    companyLogo: null,
    logo: 'FP',
    logoColor: '#6366F1',
    location: 'Pune, India',
    workMode: 'Hybrid',
    mode: 'Hybrid',
    stipend: '₹20,000 / month',
    stipendNum: 20000,
    stipendAmount: 20000,
    stipendCurrency: 'INR',
    stipendPeriod: 'month',
    duration: '2 Months',
    category: 'NON IT',
    department: 'Business Development',
    skills: ['Market Research', 'Lead Generation', 'Sales', 'Communication', 'CRM'],
    postedDate: '4 days ago',
    posted: '4 days ago',
    ago: '4 days ago',
    openings: 4,
    deadline: '2026-11-25',
    description: 'Identify new partnership opportunities, qualify enterprise B2B inbound leads, and assist in client relationship management.',
    responsibilities: 'Conduct market analysis across FinTech ecosystems.\nEngage target client prospects via email and LinkedIn outreach.\nPrepare proposal pitch decks and track conversion metrics.',
    eligibility: 'BBA / MBA / Commerce students with excellent written and oral communication.\nHigh energy, proactive attitude, and interest in startup growth.',
    perks: ['Performance-Based Incentives', 'Certificate', 'PPO Opportunity'],
    status: 'Active',
    applicants: 0
  }
];

const INITIAL_APPLICATIONS = [
  {
    id: 1,
    jobId: 1,
    jobTitle: 'Frontend Developer Intern',
    title: 'Frontend Developer Intern',
    company: 'TechCorp Solutions',
    companyId: 1,
    category: 'IT',
    logoColor: '#0A66C2',
    status: 'Under Review',
    nextStep: 'The hiring team is currently reviewing your application portfolio.',
    appliedAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    studentId: 101,
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
];

const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    title: 'Welcome to InternDesk!',
    message: 'Browse verified company internship openings and launch your career.',
    isRead: false,
    createdAt: new Date().toISOString()
  }
];

class Store {
  constructor() {
    this.data = {
      users: {},
      companies: INITIAL_COMPANIES,
      internships: INITIAL_INTERNSHIPS,
      applications: INITIAL_APPLICATIONS,
      notifications: INITIAL_NOTIFICATIONS,
      savedInternships: {}
    };
    this.listeners = [];
    this.load();
  }

  load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        this.data = {
          ...this.data,
          ...parsed
        };
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error loading db.json:', err.message);
    }
  }

  save() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(DATA_FILE, JSON.stringify(this.data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving db.json:', err.message);
    }
  }

  subscribe(callback) {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter((cb) => cb !== callback);
    };
  }

  emit(event, payload) {
    for (const listener of this.listeners) {
      try {
        listener(event, payload);
      } catch (err) {
        console.error('Error in store listener:', err);
      }
    }
  }
}

export const store = new Store();
