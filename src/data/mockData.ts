import { StudentProfile, CareerRole, JobRequirement, CandidateProfile } from '../types';

export const DEMO_STUDENT: StudentProfile = {
  name: 'Alex Rivera',
  education: 'B.Tech in Artificial Intelligence & Data Science',
  department: 'AI & DS',
  yearOfStudy: '3rd Year',
  skills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'NumPy', 'Git', 'Data Visualization'],
  projects: [
    {
      id: 'proj-1',
      name: 'Student Performance Prediction',
      description: 'End-to-end regression model analyzing academic history, attendance, and socio-economic indicators with 89% accuracy.',
      technologies: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib']
    },
    {
      id: 'proj-2',
      name: 'Movie Recommendation System',
      description: 'Collaborative filtering and content-based recommendation engine built on MovieLens dataset with cosine similarity metric.',
      technologies: ['Python', 'Pandas', 'Machine Learning', 'Streamlit']
    }
  ],
  interests: ['Data Science', 'Machine Learning', 'Predictive Modeling', 'AI Ethics'],
  careerGoal: 'Data Scientist',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'
};

export const CAREER_ROLES: CareerRole[] = [
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    category: 'Artificial Intelligence',
    shortDescription: 'Transforms raw data into predictive insights using statistical modeling and machine learning algorithms.',
    fullDescription: 'Data Scientists formulate questions that can be answered with data and then collect, clean, and model datasets to unveil hidden patterns, build predictive algorithms, and advise executive stakeholders.',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'Statistics', 'Deep Learning', 'Advanced SQL'],
    importantSkills: ['Data Visualization', 'Scikit-Learn', 'Feature Engineering', 'Hypothesis Testing', 'Docker'],
    avgSalary: '$126,500 / yr',
    marketDemand: 'Very High',
    growthRate: '+36% by 2031',
    keyResponsibilities: [
      'Architect predictive statistical and machine learning models',
      'Cleanse and structure complex unstructured multi-modal datasets',
      'Translate business hypotheses into reproducible experimental pipelines',
      'Deploy and monitor models in production environments'
    ],
    recommendedProjects: [
      {
        id: 'p-ds-1',
        title: 'Customer Churn Prediction Engine',
        difficulty: 'Intermediate',
        skills: ['Python', 'Pandas', 'Machine Learning', 'Statistics'],
        description: 'Predict telecommunication subscriber churn using gradient boosting (XGBoost/LightGBM) with precision-recall trade-off analysis.',
        reason: 'Directly validates practical Machine Learning, exploratory analysis, and statistical significance testing.',
        impactMetrics: 'Tackles real-world business retention metric with actionable feature importance.'
      },
      {
        id: 'p-ds-2',
        title: 'Retail Sales Forecasting Pipeline',
        difficulty: 'Intermediate',
        skills: ['Python', 'Statistics', 'Time Series', 'Pandas'],
        description: 'Multi-store demand forecasting using Prophet, ARIMA, and LSTM to account for seasonal spikes, holidays, and promotions.',
        reason: 'Addresses your skill gap in Advanced Statistics, time series decomposition, and error metrics (MAPE, RMSE).',
        impactMetrics: 'Industry-standard portfolio project for data science interviews.'
      },
      {
        id: 'p-ds-3',
        title: 'E-Commerce Recommendation System',
        difficulty: 'Advanced',
        skills: ['Python', 'Deep Learning', 'Machine Learning', 'PyTorch'],
        description: 'Hybrid neural collaborative filtering model combining user-item matrix factorisation with item metadata embeddings.',
        reason: 'Helps close the Deep Learning gap while extending your machine learning project repertoire.',
        impactMetrics: 'Directly mirrors recommendation architectures used by Netflix and Amazon.'
      }
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Mathematical Statistics & Probability',
        status: 'In Progress',
        category: 'Foundational',
        estimatedWeeks: '3-4 Weeks',
        description: 'Master hypothesis testing, p-values, Bayes theorem, confidence intervals, and distributions essential for model evaluation.',
        resources: [
          { name: 'Khan Academy Statistics & Probability', type: 'Course', linkText: 'Interactive Modules' },
          { name: 'Practical Statistics for Data Scientists (O’Reilly)', type: 'Book', linkText: 'Reference Guide' }
        ]
      },
      {
        step: 2,
        title: 'Advanced SQL & Analytical Queries',
        status: 'Recommended',
        category: 'Data Engineering',
        estimatedWeeks: '2-3 Weeks',
        description: 'Dive into Window Functions (ROW_NUMBER, LAG, LEAD), CTEs, query plan optimization, and recursive relational joins.',
        resources: [
          { name: 'Mode Analytics Advanced SQL Tutorial', type: 'Practice', linkText: 'Interactive SQL Sandbox' },
          { name: 'LeetCode Database Problem Set', type: 'Practice', linkText: 'Medium/Hard SQL Queries' }
        ]
      },
      {
        step: 3,
        title: 'Deep Learning & Neural Networks',
        status: 'Recommended',
        category: 'Advanced ML',
        estimatedWeeks: '4-5 Weeks',
        description: 'Understand backpropagation, activation functions, CNNs for computer vision, Transformers for text, and PyTorch tensors.',
        resources: [
          { name: 'DeepLearning.AI Deep Learning Specialization', type: 'Course', linkText: 'Andrew Ng Curriculum' },
          { name: 'PyTorch 60-Minute Blitz Tutorial', type: 'Practice', linkText: 'Official Documentation' }
        ]
      },
      {
        step: 4,
        title: 'Production Capstone Project & Deployment',
        status: 'Not Started',
        category: 'Engineering & MLOps',
        estimatedWeeks: '3 Weeks',
        description: 'Containerize your model with Docker, serve REST inference endpoints with FastAPI, and deploy live on cloud infrastructure.',
        resources: [
          { name: 'FastAPI for Machine Learning Microservices', type: 'Project', linkText: 'Hands-on Repository' },
          { name: 'MLflow & Docker Containerization Walkthrough', type: 'Practice', linkText: 'Production Setup' }
        ]
      }
    ]
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Collects, cleans, and explores data to help organizations make informed business decisions.',
    fullDescription: 'Data Analysts bridge the gap between raw database tables and strategic decision makers. They write complex analytical queries, build automated interactive dashboards, and explain quantitative findings to non-technical partners.',
    requiredSkills: ['SQL', 'Python', 'Pandas', 'Data Visualization', 'Power BI', 'Excel', 'Statistics'],
    importantSkills: ['Tableau', 'Business Intelligence', 'A/B Testing', 'Storytelling with Data', 'ETL Basics'],
    avgSalary: '$89,400 / yr',
    marketDemand: 'Very High',
    growthRate: '+25% by 2031',
    keyResponsibilities: [
      'Write structured SQL queries to extract data from data warehouses',
      'Design executive-ready business dashboards in Power BI or Tableau',
      'Identify key performance indicators (KPIs) and operational anomalies',
      'Perform cohort and churn segmentation on customer behaviors'
    ],
    recommendedProjects: [
      {
        id: 'p-da-1',
        title: 'Executive Sales & Revenue KPI Dashboard',
        difficulty: 'Beginner',
        skills: ['Power BI', 'SQL', 'Data Visualization'],
        description: 'Build an interactive dashboard with drill-down filters analyzing regional sales velocity, customer lifetime value, and profit margins.',
        reason: 'Demonstrates end-to-end reporting capability using business analytics tooling.',
        impactMetrics: 'Directly showcases enterprise reporting capability.'
      },
      {
        id: 'p-da-2',
        title: 'Customer Segmentation & RFM Analysis',
        difficulty: 'Intermediate',
        skills: ['Python', 'Pandas', 'SQL', 'Statistics'],
        description: 'Calculate Recency, Frequency, and Monetary scores to identify VIP clients, at-risk buyers, and dormant segments.',
        reason: 'Bridges Python analysis with clear commercial marketing strategy.',
        impactMetrics: 'Standard high-value analytical case study.'
      }
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Power BI & Advanced Data Modeling (DAX)',
        status: 'Recommended',
        category: 'BI Tools',
        estimatedWeeks: '2 Weeks',
        description: 'Learn star schemas, calculated measures with DAX, and storytelling visualizations.',
        resources: [{ name: 'Microsoft Power BI Data Analyst Certification Path', type: 'Course', linkText: 'PL-300 Material' }]
      },
      {
        step: 2,
        title: 'Business Statistics & A/B Testing',
        status: 'Recommended',
        category: 'Analytics',
        estimatedWeeks: '3 Weeks',
        description: 'Sample sizing, statistical significance, conversion rates, and variance estimation.',
        resources: [{ name: 'Experimentation for Product Analytics', type: 'Book', linkText: 'Case Studies' }]
      }
    ]
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    category: 'Artificial Intelligence',
    shortDescription: 'Bridges data science and software engineering to deploy scalable ML models into live production systems.',
    fullDescription: 'ML Engineers focus on scaling models, building automated feature stores, training pipelines, and real-time inference microservices with latency and throughput constraints.',
    requiredSkills: ['Python', 'Machine Learning', 'Deep Learning', 'Docker', 'MLOps', 'PyTorch', 'Data Structures', 'SQL'],
    importantSkills: ['FastAPI', 'Kubernetes', 'CI/CD', 'Git', 'Model Monitoring', 'C++ / CUDA'],
    avgSalary: '$142,000 / yr',
    marketDemand: 'Very High',
    growthRate: '+40% by 2031',
    keyResponsibilities: [
      'Scale ML training jobs on distributed GPU clusters',
      'Build resilient automated retraining and validation pipelines',
      'Optimize neural models for low-latency inference (ONNX, TensorRT)',
      'Monitor production model drift and data distribution shifts'
    ],
    recommendedProjects: [
      {
        id: 'p-ml-1',
        title: 'Real-Time Fraud Detection Microservice',
        difficulty: 'Advanced',
        skills: ['Python', 'Machine Learning', 'Docker', 'FastAPI'],
        description: 'Stream transaction payloads into a containerized classifier responding in under 35ms with automated latency benchmarks.',
        reason: 'Proves both data modeling expertise and low-latency API design.',
        impactMetrics: 'Production-ready benchmark demo.'
      }
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Deep Learning Foundations (PyTorch)',
        status: 'Recommended',
        category: 'Algorithms',
        estimatedWeeks: '4 Weeks',
        description: 'Tensors, autograd, custom Dataset and DataLoader pipelines, multi-layer perceptrons, and GPU acceleration.',
        resources: [{ name: 'Deep Learning with PyTorch', type: 'Course', linkText: 'PyTorch Org' }]
      },
      {
        step: 2,
        title: 'Containerization & REST APIs with Docker & FastAPI',
        status: 'Not Started',
        category: 'DevOps',
        estimatedWeeks: '3 Weeks',
        description: 'Dockerfiles, multi-stage builds, Pydantic schemas, asynchronous routing, and health checks.',
        resources: [{ name: 'Docker for Machine Learning Practitioners', type: 'Practice', linkText: 'Interactive Labs' }]
      },
      {
        step: 3,
        title: 'MLOps & Model Registry (MLflow & DVC)',
        status: 'Not Started',
        category: 'Infrastructure',
        estimatedWeeks: '3 Weeks',
        description: 'Artifact versioning, automated metric logging, model staging, and hyperparameter experiment tracking.',
        resources: [{ name: 'Full Stack Deep Learning Course', type: 'Course', linkText: 'FSDL 2024' }]
      }
    ]
  },
  {
    id: 'ai-engineer',
    title: 'AI Engineer',
    category: 'Artificial Intelligence',
    shortDescription: 'Builds intelligent generative AI systems, agentic architectures, and LLM-powered applications.',
    fullDescription: 'AI Engineers utilize foundational LLMs, vector embeddings, retrieval-augmented generation (RAG), and agentic workflows to build enterprise-grade reasoning systems and automation tools.',
    requiredSkills: ['Python', 'Machine Learning', 'LLMs', 'Vector Databases', 'LangChain', 'Prompt Engineering', 'API Integration', 'Deep Learning'],
    importantSkills: ['TypeScript', 'FastAPI', 'RAG Architectures', 'Semantic Search', 'Evaluation Frameworks'],
    avgSalary: '$148,000 / yr',
    marketDemand: 'Very High',
    growthRate: '+45% by 2031',
    keyResponsibilities: [
      'Design multi-stage RAG pipelines over enterprise knowledge graphs',
      'Optimize LLM prompts, temperature calibrations, and tool-calling schemas',
      'Fine-tune small language models (SLMs) with LoRA/QLoRA',
      'Implement safety guardrails, evaluations, and token cost optimizations'
    ],
    recommendedProjects: [
      {
        id: 'p-ai-1',
        title: 'Multi-Document RAG Knowledge Assistant',
        difficulty: 'Advanced',
        skills: ['Python', 'Vector Databases', 'LangChain', 'LLMs'],
        description: 'Ingest research PDFs, chunk with semantic boundaries, store in Chroma/Pinecone, and synthesize answers with citations.',
        reason: 'Demonstrates modern GenAI orchestration, embeddings, and context window management.',
        impactMetrics: 'Modern core enterprise AI application architecture.'
      }
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Foundations of Modern LLMs & Prompt Engineering',
        status: 'Recommended',
        category: 'GenAI',
        estimatedWeeks: '2 Weeks',
        description: 'Tokenization, attention mechanisms, zero-shot/few-shot prompting, and structured output generation.',
        resources: [{ name: 'Prompt Engineering for Developers', type: 'Course', linkText: 'DeepLearning.AI' }]
      },
      {
        step: 2,
        title: 'Vector Databases & RAG Pipelines',
        status: 'Not Started',
        category: 'GenAI',
        estimatedWeeks: '3 Weeks',
        description: 'Embedding models, cosine distance vs dot product, chunking strategies, hybrid search, and reranking.',
        resources: [{ name: 'LangChain & LlamaIndex Bootcamps', type: 'Practice', linkText: 'Tutorial Docs' }]
      }
    ]
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    category: 'Data & Analytics',
    shortDescription: 'Evaluates business processes, conducts market research, and bridges organizational strategy with tech teams.',
    fullDescription: 'Business Analysts synthesize stakeholder interviews, financial statements, and operational telemetry to design workflow enhancements, evaluate feasibility, and quantify ROI on digital transformations.',
    requiredSkills: ['SQL', 'Data Visualization', 'Excel', 'Communication', 'Business Intelligence', 'Problem Solving'],
    importantSkills: ['Python', 'Process Mapping (BPMN)', 'Agile / Scrum', 'Jira', 'Financial Modeling'],
    avgSalary: '$84,000 / yr',
    marketDemand: 'High',
    growthRate: '+14% by 2031',
    keyResponsibilities: [
      'Analyze workflow bottlenecks and map current vs future state architectures',
      'Draft functional specifications, user stories, and acceptance criteria',
      'Build revenue projection sensitivity tables and scenario analyses',
      'Facilitate sprint planning and cross-functional stakeholder alignments'
    ],
    recommendedProjects: [
      {
        id: 'p-ba-1',
        title: 'Supply Chain Bottleneck & Cost-Benefit Analysis',
        difficulty: 'Beginner',
        skills: ['Excel', 'Data Visualization', 'Problem Solving'],
        description: 'Interactive workbook calculating lead time variances, inventory holding costs, and automated purchase recommendations.',
        reason: 'Highlights quantitative commercial acumen and stakeholder presentation.',
        impactMetrics: 'Real-world operations analysis framework.'
      }
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Financial & Operational Modeling in Excel',
        status: 'Recommended',
        category: 'Business',
        estimatedWeeks: '2 Weeks',
        description: 'INDEX-MATCH, XLOOKUP, pivot tables, data tables, Goal Seek, and Monte Carlo scenarios.',
        resources: [{ name: 'Financial Modeling & Valuation', type: 'Course', linkText: 'Corporate Finance Institute' }]
      }
    ]
  },
  {
    id: 'software-developer',
    title: 'Software Developer (Full Stack)',
    category: 'Software Engineering',
    shortDescription: 'Designs, develops, tests, and maintains robust web applications and backend service APIs.',
    fullDescription: 'Software Developers engineer user-facing interactive interfaces and scalable backend services, database migrations, authentication systems, and cloud deployments.',
    requiredSkills: ['Python', 'JavaScript', 'HTML', 'CSS', 'SQL', 'Git', 'Data Structures'],
    importantSkills: ['React', 'Node.js', 'REST APIs', 'Docker', 'Testing (Jest/Pytest)', 'TypeScript'],
    avgSalary: '$112,000 / yr',
    marketDemand: 'Very High',
    growthRate: '+22% by 2031',
    keyResponsibilities: [
      'Implement responsive UI components and state management',
      'Design and document RESTful and GraphQL endpoints',
      'Write comprehensive unit and integration test suites',
      'Maintain database schemas, migrations, and indexing strategies'
    ],
    recommendedProjects: [
      {
        id: 'p-sd-1',
        title: 'Collaborative Task & Kanban Board Web App',
        difficulty: 'Intermediate',
        skills: ['JavaScript', 'HTML', 'CSS', 'SQL', 'Git'],
        description: 'Full-stack application featuring drag-and-drop workflow columns, user authentication, and persistent database storage.',
        reason: 'Demonstrates complete full-stack lifecycle and responsive UI mechanics.',
        impactMetrics: 'Core foundational web development benchmark.'
      }
    ],
    learningRoadmap: [
      {
        step: 1,
        title: 'Modern Frontend Architecture (React & TypeScript)',
        status: 'Recommended',
        category: 'Web Tech',
        estimatedWeeks: '4 Weeks',
        description: 'Component lifecycles, hooks, typed props, state machines, and CSS framework styling.',
        resources: [{ name: 'Full Stack Open', type: 'Course', linkText: 'University of Helsinki' }]
      }
    ]
  }
];

export const RECRUITER_JOBS: JobRequirement[] = [
  {
    id: 'job-1',
    title: 'Junior Data Scientist',
    company: 'Apex Intelligence Labs',
    department: 'Predictive Analytics',
    experienceLevel: 'Entry Level',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Deep Learning'],
    preferredSkills: ['Pandas', 'Scikit-Learn', 'Git', 'FastAPI'],
    description: 'Looking for a passionate junior data scientist to analyze behavioral patterns, build experimental predictive models, and collaborate with our ML infrastructure team.',
    postedDate: '2 days ago'
  },
  {
    id: 'job-2',
    title: 'Business Intelligence Analyst',
    company: 'Horizon Cloud Dynamics',
    department: 'Strategic Operations',
    experienceLevel: 'Associate',
    requiredSkills: ['SQL', 'Power BI', 'Python', 'Excel', 'Data Visualization'],
    preferredSkills: ['Pandas', 'Statistics', 'DAX', 'Storytelling with Data'],
    description: 'Help operational leadership identify growth vectors and optimize supply chain costs through interactive executive telemetry and dashboards.',
    postedDate: '5 days ago'
  },
  {
    id: 'job-3',
    title: 'Machine Learning Engineer (Associate)',
    company: 'Cognitive Nexus Systems',
    department: 'Core AI Systems',
    experienceLevel: 'Associate',
    requiredSkills: ['Python', 'Machine Learning', 'Docker', 'PyTorch', 'MLOps', 'SQL'],
    preferredSkills: ['Deep Learning', 'FastAPI', 'Git', 'Kubernetes'],
    description: 'Join our model deployment squad to bring high-throughput, low-latency neural classifiers and recommendation engines into production.',
    postedDate: '1 week ago'
  }
];

export const CANDIDATE_POOL: CandidateProfile[] = [
  {
    id: 'cand-1',
    name: 'Priya Sharma',
    email: 'priya.sharma@campus.edu',
    education: 'B.Tech AI & Data Science (Honors)',
    department: 'AI & DS',
    yearOfStudy: 'Final Year',
    gpa: '3.9 / 4.0',
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Deep Learning', 'Pandas', 'Scikit-Learn', 'PyTorch', 'Git'],
    projects: [
      {
        id: 'cp-1',
        name: 'Brain MRI Tumor Segmentation with U-Net',
        description: 'Deep learning segmentation pipeline with PyTorch achieving 0.92 Dice Coefficient on clinical benchmark.',
        technologies: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision']
      },
      {
        id: 'cp-2',
        name: 'Algorithmic Financial Trend Forecaster',
        description: 'Time series forecasting utilizing LSTM and Bayesian optimization for feature selection.',
        technologies: ['Python', 'Statistics', 'Pandas', 'Machine Learning']
      }
    ],
    interests: ['Deep Learning', 'Computer Vision', 'Quantitative Analytics'],
    careerGoal: 'Data Scientist'
  },
  {
    id: 'cand-2',
    name: 'Alex Rivera (Demo Student)',
    email: 'alex.rivera@campus.edu',
    education: 'B.Tech in Artificial Intelligence & Data Science',
    department: 'AI & DS',
    yearOfStudy: '3rd Year',
    gpa: '3.8 / 4.0',
    skills: ['Python', 'SQL', 'Pandas', 'Machine Learning', 'NumPy', 'Git', 'Data Visualization'],
    projects: [
      {
        id: 'cp-3',
        name: 'Student Performance Prediction',
        description: 'Regression model evaluating multi-variate factors impacting academic graduation velocity.',
        technologies: ['Python', 'Pandas', 'Scikit-Learn']
      },
      {
        id: 'cp-4',
        name: 'Movie Recommendation System',
        description: 'Collaborative filtering model with cosine similarity and interactive Streamlit web dashboard.',
        technologies: ['Python', 'Pandas', 'Machine Learning']
      }
    ],
    interests: ['Data Science', 'Machine Learning', 'Predictive Analytics'],
    careerGoal: 'Data Scientist'
  },
  {
    id: 'cand-3',
    name: 'Marcus Chen',
    email: 'marcus.chen@campus.edu',
    education: 'B.S. in Computer Science & Statistics',
    department: 'CS',
    yearOfStudy: '4th Year',
    gpa: '3.6 / 4.0',
    skills: ['Python', 'SQL', 'Statistics', 'Data Visualization', 'Power BI', 'Excel', 'Pandas', 'Git'],
    projects: [
      {
        id: 'cp-5',
        name: 'Retail Inventory Turnover Analysis',
        description: 'End-to-end analytical dashboard highlighting lead times, holding costs, and automated safety stock alerts.',
        technologies: ['SQL', 'Power BI', 'Excel', 'Python']
      }
    ],
    interests: ['Data Analytics', 'Business Intelligence', 'Operations'],
    careerGoal: 'Data Analyst'
  },
  {
    id: 'cand-4',
    name: 'Sarah Lin',
    email: 'sarah.lin@campus.edu',
    education: 'B.Tech Information Technology',
    department: 'IT',
    yearOfStudy: '3rd Year',
    gpa: '3.5 / 4.0',
    skills: ['Python', 'Machine Learning', 'Docker', 'FastAPI', 'Git', 'JavaScript', 'SQL'],
    projects: [
      {
        id: 'cp-6',
        name: 'Microservice API for Image Captioning',
        description: 'FastAPI containerized service invoking HuggingFace inference pipelines with Docker.',
        technologies: ['Python', 'Docker', 'FastAPI', 'Git']
      }
    ],
    interests: ['MLOps', 'Cloud Computing', 'Backend Engineering'],
    careerGoal: 'ML Engineer'
  },
  {
    id: 'cand-5',
    name: 'David Kim',
    email: 'david.kim@campus.edu',
    education: 'B.S. in Software Engineering',
    department: 'SE',
    yearOfStudy: '3rd Year',
    gpa: '3.4 / 4.0',
    skills: ['JavaScript', 'HTML', 'CSS', 'Python', 'Git', 'SQL'],
    projects: [
      {
        id: 'cp-7',
        name: 'E-Commerce Marketplace Web App',
        description: 'Interactive storefront with payment integration, responsive mobile UI, and SQL product catalog.',
        technologies: ['JavaScript', 'HTML', 'CSS', 'SQL']
      }
    ],
    interests: ['Web Development', 'UI/UX Engineering'],
    careerGoal: 'Software Developer'
  }
];

// Data Science Analytics Datasets for charts
export const SKILL_DISTRIBUTION_DATA = [
  { skill: 'Python', candidatesCount: 84, demandIndex: 94 },
  { skill: 'SQL', candidatesCount: 78, demandIndex: 91 },
  { skill: 'Machine Learning', candidatesCount: 52, demandIndex: 88 },
  { skill: 'Pandas', candidatesCount: 65, demandIndex: 75 },
  { skill: 'Statistics', candidatesCount: 38, demandIndex: 86 },
  { skill: 'Deep Learning', candidatesCount: 29, demandIndex: 82 },
  { skill: 'Power BI', candidatesCount: 41, demandIndex: 72 },
  { skill: 'Docker / MLOps', candidatesCount: 21, demandIndex: 79 },
  { skill: 'Advanced SQL', candidatesCount: 26, demandIndex: 84 },
  { skill: 'LLMs & GenAI', candidatesCount: 18, demandIndex: 92 }
];

export const CAREER_DEMAND_DATA = [
  { role: 'Data Scientist', openJobs: 1420, avgSalary: 126, growthPct: 36 },
  { role: 'AI Engineer', openJobs: 1780, avgSalary: 148, growthPct: 45 },
  { role: 'ML Engineer', openJobs: 1310, avgSalary: 142, growthPct: 40 },
  { role: 'Data Analyst', openJobs: 2100, avgSalary: 89, growthPct: 25 },
  { role: 'Software Dev', openJobs: 3400, avgSalary: 112, growthPct: 22 },
  { role: 'Business Analyst', openJobs: 1150, avgSalary: 84, growthPct: 14 }
];

export const SKILL_GAP_PREVALENCE = [
  { name: 'Statistics & Math', gapFrequency: 68, category: 'Academic Gap' },
  { name: 'Deep Learning', gapFrequency: 62, category: 'Advanced Tech' },
  { name: 'Docker / MLOps', gapFrequency: 74, category: 'Production Tools' },
  { name: 'Advanced SQL', gapFrequency: 54, category: 'Data Engineering' },
  { name: 'Model Deployment', gapFrequency: 71, category: 'Production Tools' },
  { name: 'Time Series / Forecasting', gapFrequency: 49, category: 'Domain Specialization' }
];

export const CAREER_MATCH_SPREAD = [
  { matchRange: '90-100%', count: 12 },
  { matchRange: '80-89%', count: 28 },
  { matchRange: '70-79%', count: 34 },
  { matchRange: '60-69%', count: 19 },
  { matchRange: 'Below 60%', count: 7 }
];
