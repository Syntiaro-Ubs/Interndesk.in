/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { InternshipPost } from '../types';

export const INTERNSHIPS: InternshipPost[] = [
  {
    id: 'frontend-web',
    title: 'Frontend Web Development',
    category: 'Web Development',
    duration: '4-8 Weeks',
    difficulty: 'Beginner',
    description: 'Master interactive web experiences. Direct hands-on building of dynamic websites using modern technologies like React, Tailwind CSS, TypeScript, and state management.',
    skills: ['HTML5 & CSS3', 'JavaScript ES6+', 'React.js', 'Tailwind CSS', 'Vite', 'Git & GitHub'],
    tasks: [
      'Deconstruct and code pixel-perfect responsive layouts',
      'Integrate client-side routing, hooks, and dynamic data binding',
      'Design comprehensive state management solutions (Context/Zustand)',
      'Optimize bundle size and asset rendering speeds',
      'Leverage Tailwind UI libraries and Framer Motion transitions'
    ],
    perks: [
      'Digital Certificate of Internship',
      'Letter of Recommendation based on performance',
      'Dedicated Slack & Discord channel mentorship',
      'Practical, production-level hands-on tasks',
      'Flexible remote work hours'
    ]
  },
  {
    id: 'backend-web',
    title: 'Backend Node.js Development',
    category: 'Web Development',
    duration: '6-8 Weeks',
    difficulty: 'Intermediate',
    description: 'Design robust, scalable server architectures. Build RESTful APIs, master relational and document database structures, and implement state-of-the-art authentication pipelines.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'JWT Auth', 'REST APIs', 'Postman'],
    tasks: [
      'Establish robust MVC structured Express applications',
      'Implement multi-level security middlewares (CORS, Rate Limiting, Helmet)',
      'Integrate MongoDB or PostgreSQL database layers using modern ORMs/ODMs',
      'Build scalable user authentication utilizing OAuth and JWT',
      'Write optimized API endpoints with custom validation frameworks'
    ],
    perks: [
      'Valid Digital Credentials & Verification Link',
      'Letter of Recommendation & Performance Stars',
      'Flexible schedule tailored for academic students',
      'Weekly architectural design review calls',
      'Direct industry mentor feedback'
    ]
  },
  {
    id: 'python-dev',
    title: 'Python Development',
    category: 'Software Engineering',
    duration: '4-8 Weeks',
    difficulty: 'Beginner',
    description: 'Leverage Python’s versatility from scripting and web scraping to enterprise application backends. Build secure CLI solutions, automate complex routines, and deploy fast.',
    skills: ['Python 3', 'OOP Concepts', 'Flask / Django', 'SQLAlchemy', 'BeautifulSoup', 'Automation Scripts'],
    tasks: [
      'Architect utility command-line tools utilizing click or argparse',
      'Construct scrapers to index complex web portals with robust exception Handling',
      'Write backend APIs in Flask or Django featuring database migrations',
      'Build asynchronous scripts to execute repetitive bulk systems automation',
      'Debug legacy code databases and provide unit test architectures'
    ],
    perks: [
      'Official Industry-Accredited Internship Certificate',
      'LOR (Letter of Recommendation) and Performance badge',
      'Active learning support sessions',
      'High-level code reviews',
      'Practical project exposure'
    ]
  },
  {
    id: 'data-science',
    title: 'Data Science & Analytics',
    category: 'Data Science',
    duration: '8 Weeks',
    difficulty: 'Intermediate',
    description: 'Transform raw datasets into high-fidelity business intelligence. Build models, construct complex statistical validations, and tell compelling stories with dynamic dashboards.',
    skills: ['Python', 'Pandas & NumPy', 'Matplotlib & Seaborn', 'Scikit-Learn', 'Data Cleaning', 'PowerBI / Tableau'],
    tasks: [
      'Clean complex, high-dimensionality raw tabular and structured data databases',
      'Perform rigorous Exploratory Data Analysis (EDA) on client datasets',
      'Train, fine-tune, and validate supervised machine learning models',
      'Create interactive dashboard metrics and charts for business decision-makers',
      'Build statistical correlations and probability hypotheses reports'
    ],
    perks: [
      'Verifiable InternDesk Internship Certificate',
      'LOR highlighting analytical and problem-solving excellence',
      'Collaboration in a technical squad of data enthusiasts',
      'Access to premium database catalogs and resources',
      'Mentorship from Senior Data Scientists'
    ]
  },
  {
    id: 'android-dev',
    title: 'Android App Development',
    category: 'Mobile Apps',
    duration: '8 Weeks',
    difficulty: 'Intermediate',
    description: 'Craft native fluid Android applications. Master Kotlin, Jetpack Compose, localized databases, and integrations with third-party web endpoints and animations.',
    skills: ['Kotlin', 'Android Studio', 'Jetpack Compose', 'Retrofit API', 'Room SQLite', 'MVVM Architecture'],
    tasks: [
      'Build rich user interfaces with declarative declarative Kotlin DSL Compose code',
      'Integrate networking layers for dynamic JSON API requests using Retrofit',
      'Establish native SQLite repositories with Room and LiveData/Flow properties',
      'Implement responsive layouts that scale to tablets and diverse screen configurations',
      'Integrate basic material notification assets and hardware sensor controllers'
    ],
    perks: [
      'Verifiable Digital Android Internship Certificate',
      'A personal performance letter (LOR) signed by management',
      'Hands-on experience with native mobile design paradigms',
      'Flexible self-paced targets',
      'Direct guidance in publishing and deploying applications'
    ]
  },
  {
    id: 'uiux-design',
    title: 'UI/UX Design',
    category: 'Design & Creative',
    duration: '4-6 Weeks',
    difficulty: 'Beginner',
    description: 'Discover the principles of high-fidelity empathy-driven user interfaces. Translate complex workflows into simple, elegant, wireframes and interactive prototypes.',
    skills: ['Figma', 'Wireframing', 'User Research', 'Information Architecture', 'Prototyping', 'Design Systems'],
    tasks: [
      'Conduct user interviews, persona clustering, and empathy charting maps',
      'Draft low-fidelity paper and functional digital structural wireframes',
      'Construct a complete responsive atomic design system containing components',
      'Develop clickable high-fidelity app interactive presentation mockups',
      'Test animations, user journeys, and micro-interactions layouts'
    ],
    perks: [
      'Official Certificate of Completion',
      'A glowing Letter of Recommendation for excellent UI layouts',
      'Exclusive design circles access',
      'Personal portfolio review by tech lead',
      'Real critique parameters'
    ]
  },
  {
    id: 'cyber-security',
    title: 'Cybersecurity Analyst',
    category: 'Infrastructure & Security',
    duration: '6-8 Weeks',
    difficulty: 'Advanced',
    description: 'Protect cloud services and enterprise infrastructure. Understand penetration testing schemes, OWASP vulnerabilities, threat modeling architectures, and identity access rules.',
    skills: ['Linux Admin', 'Nmap & Wireshark', 'OWASP Top 10', 'Penetration Testing', 'Identity Management', 'Threat Analysis'],
    tasks: [
      'Identify critical vulnerabilities in mock web applications (OWASP)',
      'Analyze network traffic logs using Wireshark to isolate malware traces',
      'Formulate comprehensive incident response templates and vulnerability mitigation plans',
      'Implement mock cryptographic protection hashes on data pipelines',
      'Draft risk matrices and threat-modeling reports for servers'
    ],
    perks: [
      'Accredited Cybersecurity Intern Verification Badge',
      'Letter of Recommendation & Security Badging',
      'Practical virtual cyber lab sandboxes',
      'Peer cybersecurity networking sessions',
      'Specialist security training reviews'
    ]
  }
];
