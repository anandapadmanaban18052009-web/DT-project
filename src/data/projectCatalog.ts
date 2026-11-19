import { RecommendedProject, StudentProfile, MissingSkill } from '../types';

export interface CatalogProject extends RecommendedProject {
  domain: 'Data Science' | 'AI & ML' | 'Data Analytics' | 'Business Analytics' | 'Software Engineering';
  targetRoles: string[];
  prerequisites?: string[];
  skillsDeveloped: string[];
  expectedOutcome: string;
  implementationSteps: { step: number; title: string; description: string }[];
}

export const COMPREHENSIVE_PROJECT_CATALOG: CatalogProject[] = [
  // Data Science Projects
  {
    id: 'proj-ds-churn',
    title: 'Customer Churn Prediction Engine',
    domain: 'Data Science',
    targetRoles: ['Data Scientist', 'Machine Learning Engineer', 'Data Analyst'],
    difficulty: 'Intermediate',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'Statistics', 'Machine Learning'],
    skillsDeveloped: ['Feature Engineering', 'XGBoost Modeling', 'Precision-Recall Tradeoff', 'Model Evaluation'],
    description: 'Build an end-to-end machine learning classifier to identify telecom subscribers at high risk of churning, analyzing contract types, tenure, and monthly charges.',
    reason: 'Addresses your skill gap in practical Machine Learning and statistical hypothesis testing on tabular datasets.',
    impactMetrics: 'Helps retention marketing teams proactively mitigate customer churn with actionable risk scores.',
    expectedOutcome: 'Trained gradient boosting model with >85% ROC-AUC, interactive feature importance analysis, and customer risk scoring pipeline.',
    implementationSteps: [
      { step: 1, title: 'Exploratory Data Analysis', description: 'Analyze customer demographic distributions, tenure curves, and correlation matrices to detect early churn indicators.' },
      { step: 2, title: 'Data Cleaning & Preprocessing', description: 'Handle missing values, encode categorical variables (One-Hot / Target Encoding), and scale numerical features using StandardScaler.' },
      { step: 3, title: 'Model Training & Hyperparameter Tuning', description: 'Train Logistic Regression, Random Forest, and XGBoost classifiers; tune hyperparameters using GridSearchCV with Stratified K-Fold.' },
      { step: 4, title: 'Evaluation & Explainability', description: 'Evaluate Precision-Recall AUC and calculate SHAP (SHapley Additive exPlanations) values to interpret why specific customers churn.' }
    ]
  },
  {
    id: 'proj-ds-student-perf',
    title: 'Student Performance Prediction & Early Warning System',
    domain: 'Data Science',
    targetRoles: ['Data Scientist', 'Data Analyst', 'Business Analyst'],
    difficulty: 'Beginner',
    skills: ['Python', 'Pandas', 'NumPy', 'Data Visualization', 'Machine Learning'],
    skillsDeveloped: ['Exploratory Data Analysis', 'Multivariate Regression', 'Correlation Analysis', 'Dashboard Reporting'],
    description: 'Analyze student academic records, attendance logs, and study habits to predict final semester grades and identify students who need academic counseling early.',
    reason: 'Matches your background in academic analytics and strengthens fundamental regression and data visualization skills.',
    impactMetrics: 'Empowers academic advisors to intervene before midterms, boosting student graduation rates.',
    expectedOutcome: 'Predictive regression pipeline achieving R² > 0.82 and an interactive visual dashboard tracking at-risk student cohorts.',
    implementationSteps: [
      { step: 1, title: 'Data Gathering & Integration', description: 'Synthesize attendance logs, internal test scores, and socioeconomic study habits into a clean analytical DataFrame.' },
      { step: 2, title: 'Correlation & Outlier Analysis', description: 'Visualize grade distributions with box plots and identify key drivers of academic performance with Seaborn heatmaps.' },
      { step: 3, title: 'Model Development', description: 'Implement Ridge Regression, Random Forest Regressor, and evaluate Mean Absolute Error (MAE) and Root Mean Squared Error (RMSE).' },
      { step: 4, title: 'Risk Tier Categorization', description: 'Segment students into Green (Safe), Yellow (Moderate), and Red (Critical Attention) intervention tiers with automated alert reports.' }
    ]
  },
  {
    id: 'proj-ds-sales-dash',
    title: 'Sales Data Analysis & Executive BI Dashboard',
    domain: 'Data Analytics',
    targetRoles: ['Data Analyst', 'Business Analyst', 'Data Scientist'],
    difficulty: 'Beginner',
    skills: ['SQL', 'Power BI', 'Excel', 'Data Visualization', 'Python'],
    skillsDeveloped: ['Star Schema Data Modeling', 'DAX Calculations', 'Executive KPI Reporting', 'SQL Window Functions'],
    description: 'Transform multi-million row transaction histories into an interactive executive business intelligence dashboard revealing regional growth vectors and margins.',
    reason: 'Directly bridges critical prerequisites in SQL, Business Intelligence, and KPI storytelling demanded by employers.',
    impactMetrics: 'Enables C-suite leaders to track regional profit velocities, return rates, and month-over-month sales trends in real time.',
    expectedOutcome: 'Multi-page Power BI dashboard with drill-down filters, year-over-year revenue comparisons, and automated summary reports.',
    implementationSteps: [
      { step: 1, title: 'Data Extraction with SQL', description: 'Write SQL queries using JOINs, CTEs, and Window Functions (LAG, ROW_NUMBER) to extract clean aggregated sales facts.' },
      { step: 2, title: 'Star Schema Modeling', description: 'Design Fact and Dimension tables (Customer, Product, Region, Calendar) with one-to-many relationships in Power BI.' },
      { step: 3, title: 'DAX Measures Formulation', description: 'Create calculated measures for Year-over-Year Growth, Rolling 90-Day Moving Average, and Customer Lifetime Value (CLV).' },
      { step: 4, title: 'Visual Dashboard Design', description: 'Assemble clean, accessible visualizations with interactive slicers, KPI summary cards, and regional heat maps.' }
    ]
  },
  {
    id: 'proj-ds-movie-rec',
    title: 'Movie & Content Recommendation System',
    domain: 'Data Science',
    targetRoles: ['Data Scientist', 'Machine Learning Engineer', 'AI Engineer'],
    difficulty: 'Intermediate',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-Learn', 'Statistics'],
    skillsDeveloped: ['Collaborative Filtering', 'Cosine Similarity Vector Matching', 'Matrix Factorization (SVD)', 'Evaluation via MAP@K'],
    description: 'Build a personalized movie recommendation engine combining content-based feature filtering with user-item collaborative matrix factorization.',
    reason: 'Strengthens practical mathematical vector similarity computation and recommendation algorithms used across industry platforms.',
    impactMetrics: 'Directly mirrors recommendation ranking architectures employed by Netflix, Spotify, and Amazon.',
    expectedOutcome: 'Hybrid recommendation service returning top-10 personalized movie recommendations with similarity rationale and rating predictions.',
    implementationSteps: [
      { step: 1, title: 'Content Vectorization', description: 'Compute TF-IDF vectors over genre tags, plot synopses, and director metadata to build a content similarity matrix.' },
      { step: 2, title: 'Collaborative Matrix Factorization', description: 'Decompose user-movie rating matrices using Singular Value Decomposition (SVD) to unearth latent user preference factors.' },
      { step: 3, title: 'Hybrid Scoring Function', description: 'Combine content similarity scores with collaborative prediction weights into an ensemble ranking function.' },
      { step: 4, title: 'Interactive CLI / Web Interface', description: 'Build an interactive query interface where users rate 3 films and receive instant personalized recommendations.' }
    ]
  },

  // AI & ML Projects
  {
    id: 'proj-ai-resume-extractor',
    title: 'Resume Skill Extraction & Entity Recognition System',
    domain: 'AI & ML',
    targetRoles: ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist'],
    difficulty: 'Intermediate',
    skills: ['Python', 'Natural Language Processing', 'Machine Learning', 'FastAPI'],
    skillsDeveloped: ['Named Entity Recognition (NER)', 'Tokenization & Regex Taxonomy', 'REST API Packaging', 'Text Preprocessing'],
    description: 'Develop an automated NLP system that parses unstructured resume PDFs and Word documents to extract verified skills, job titles, and experience duration.',
    reason: 'Directly demonstrates how NLP and text parsing power automated recruitment screening in platforms like Eightfold and LinkedIn.',
    impactMetrics: 'Automates manual candidate screening, cutting resume review time from minutes to milliseconds per application.',
    expectedOutcome: 'Containerized API endpoint accepting PDF resumes and returning normalized JSON representations of skills, education, and years of experience.',
    implementationSteps: [
      { step: 1, title: 'Document Text Extraction', description: 'Extract raw text streams from multi-page PDF and DOCX files handling multi-column layouts and font encodings.' },
      { step: 2, title: 'Entity Extraction Pipeline', description: 'Implement tokenization, phrase-matching dictionaries, and Spacy custom NER pipeline to classify technical entities.' },
      { step: 3, title: 'Taxonomy Normalization', description: 'Map variant candidate strings (e.g. "ReactJS", "react.js") to canonical industry taxonomy entries.' },
      { step: 4, title: 'API Endpoint Deployment', description: 'Package the inference pipeline into a FastAPI service with OpenAPI interactive documentation.' }
    ]
  },
  {
    id: 'proj-ai-chatbot',
    title: 'AI-Powered Campus & Career Advisor Chatbot',
    domain: 'AI & ML',
    targetRoles: ['AI Engineer', 'Machine Learning Engineer'],
    difficulty: 'Advanced',
    skills: ['Python', 'Generative AI', 'Natural Language Processing', 'Vector Databases'],
    skillsDeveloped: ['Retrieval-Augmented Generation (RAG)', 'Semantic Embeddings', 'Prompt Engineering', 'LangChain Workflows'],
    description: 'Create an intelligent conversational career mentor that answers student questions regarding course prerequisites, career benchmarks, and roadmap steps using RAG.',
    reason: 'Bridges modern Generative AI engineering, vector databases, and contextual prompt engineering required for enterprise AI roles.',
    impactMetrics: 'Provides 24/7 personalized academic guidance with zero hallucinated course policies via grounded document retrieval.',
    expectedOutcome: 'Functional conversational chatbot UI grounded with career and curriculum documentation achieving sub-second responses.',
    implementationSteps: [
      { step: 1, title: 'Curriculum Document Ingestion', description: 'Parse curriculum guidelines and career benchmark specifications into structured semantic markdown chunks.' },
      { step: 2, title: 'Vector Embedding & Indexing', description: 'Generate high-dimensional vector embeddings and store them in an index (e.g. ChromaDB or FAISS) for fast cosine retrieval.' },
      { step: 3, title: 'RAG Pipeline & Prompt Guardrails', description: 'Design structured system prompts with few-shot examples and inject retrieved context to guarantee grounded answers.' },
      { step: 4, title: 'Streaming Web UI Integration', description: 'Connect the backend to a React chat window with streaming tokens and source document citations.' }
    ]
  },
  {
    id: 'proj-ai-image-classifier',
    title: 'Deep Learning Medical Image Classification System',
    domain: 'AI & ML',
    targetRoles: ['Machine Learning Engineer', 'AI Engineer', 'Data Scientist'],
    difficulty: 'Advanced',
    skills: ['Python', 'Deep Learning', 'Neural Networks', 'PyTorch'],
    skillsDeveloped: ['Convolutional Neural Networks (CNNs)', 'Transfer Learning (ResNet/EfficientNet)', 'Data Augmentation', 'Confusion Matrix Analysis'],
    description: 'Train a deep convolutional neural network using transfer learning to detect pathological abnormalities (e.g. pneumonia in chest X-rays or skin lesions).',
    reason: 'Proves high-level proficiency in PyTorch, tensor computations, GPU model training, and computer vision architectures.',
    impactMetrics: 'Delivers diagnostic assistance with high sensitivity to minimize false-negative clinical misclassifications.',
    expectedOutcome: 'PyTorch deep neural network achieving >92% test accuracy with Grad-CAM heatmaps showing image regions that influenced predictions.',
    implementationSteps: [
      { step: 1, title: 'Dataset Curation & Augmentation', description: 'Apply random rotations, flips, and color jitters using torchvision transforms to expand training sample diversity.' },
      { step: 2, title: 'Transfer Learning Architecture', description: 'Instantiate a pretrained ResNet-50 backbone, freeze initial feature extraction layers, and append a custom dense classifier head.' },
      { step: 3, title: 'Training with Learning Rate Scheduling', description: 'Train with Cross-Entropy Loss, AdamW optimizer, and Cosine Annealing learning rate schedule over 25 epochs.' },
      { step: 4, title: 'Interpretability with Grad-CAM', description: 'Generate gradient-weighted class activation heatmaps to highlight anatomical regions guiding model inferences.' }
    ]
  },
  {
    id: 'proj-ai-career-engine',
    title: 'Career Recommendation & Skill Gap Optimization Engine',
    domain: 'Data Science',
    targetRoles: ['Data Scientist', 'AI Engineer', 'Machine Learning Engineer', 'Data Analyst'],
    difficulty: 'Intermediate',
    skills: ['Python', 'Machine Learning', 'Statistics', 'SQL', 'Data Visualization'],
    skillsDeveloped: ['Cosine & Jaccard Vector Space Models', 'Multi-Criteria Decision Analysis', 'Skill Graph Representation', 'Dynamic Scoring Algorithms'],
    description: 'Implement a transparent mathematical career matching engine that computes Cosine and Weighted Jaccard similarities to recommend suitable career paths and detect gaps.',
    reason: 'Directly mirrors the core intelligence engine powering this platform, proving end-to-end algorithmic and data structure competency.',
    impactMetrics: 'Eliminates black-box bias in career advising, providing students with fully explainable recommendations and roadmap milestones.',
    expectedOutcome: 'Mathematical scoring engine providing 0-100% career compatibility rankings, gap identification, and personalized next-step curricula.',
    implementationSteps: [
      { step: 1, title: 'Taxonomy & Competency Benchmark Matrix', description: 'Structure career competency benchmarks with weighted vectors for core required skills and optional differentiators.' },
      { step: 2, title: 'Vector Generation & Normalization', description: 'Transform student self-declared, resume-extracted, and assessment-verified competencies into normalized student vectors.' },
      { step: 3, title: 'Similarity Formulation (Cosine + Jaccard)', description: 'Calculate Cosine angle distance (60%) and Weighted Jaccard intersection-over-union (40%) to derive final match scores.' },
      { step: 4, title: 'Skill Gap Breakdown & Reporting', description: 'Isolate set differences between target benchmarks and student vectors to generate prioritized learning roadmaps.' }
    ]
  },

  // Business Analytics Projects
  {
    id: 'proj-ba-churn-risk',
    title: 'Customer Lifetime Value & Churn Risk Financial Model',
    domain: 'Business Analytics',
    targetRoles: ['Business Analyst', 'Data Analyst'],
    difficulty: 'Intermediate',
    skills: ['Excel', 'SQL', 'Data Visualization', 'Statistics', 'Power BI'],
    skillsDeveloped: ['Cohort Analysis', 'Financial Sensitivity Modeling', 'Scenario Planning', 'Executive Storytelling'],
    description: 'Model customer retention cohorts, revenue churn rates, and discounted cash flows in Excel and Power BI to project 3-year recurring revenue sensitivity.',
    reason: 'Builds commercial acumen and quantitative modeling skills required for top business consulting and strategy positions.',
    impactMetrics: 'Quantifies revenue impacts of customer retention initiatives, justifying investment ROI to finance leadership.',
    expectedOutcome: 'Dynamic Excel workbook with Monte Carlo scenario tables and an executive dashboard summarizing commercial churn exposure.',
    implementationSteps: [
      { step: 1, title: 'Cohort Retention Matrix', description: 'Structure monthly customer acquisition cohorts and track retention curves across 12-month operating windows.' },
      { step: 2, title: 'Revenue Modeling with XLOOKUP & DAX', description: 'Calculate Average Revenue Per User (ARPU), Customer Acquisition Cost (CAC), and CLV-to-CAC ratios.' },
      { step: 3, title: 'Sensitivity & Scenario Tables', description: 'Use Excel Data Tables to model Worst, Base, and Best-case scenarios varying churn and expansion revenue.' },
      { step: 4, title: 'Executive Stakeholder Summary', description: 'Synthesize findings into an executive briefing deck with data storytelling charts and recommended strategic interventions.' }
    ]
  },
  {
    id: 'proj-ba-process-optimization',
    title: 'Business Process Optimization & Supply Chain Dashboard',
    domain: 'Business Analytics',
    targetRoles: ['Business Analyst', 'Data Analyst'],
    difficulty: 'Beginner',
    skills: ['Power BI', 'Excel', 'SQL', 'Data Visualization'],
    skillsDeveloped: ['BPMN Workflow Mapping', 'Bottleneck Identification', 'Cycle Time Analytics', 'SLA Monitoring'],
    description: 'Analyze procurement order lead times, vendor delivery variances, and warehouse holding costs to streamline operational workflows.',
    reason: 'Develops process analysis capabilities, SLA tracking, and operational analytics highly prized by business intelligence teams.',
    impactMetrics: 'Identifies inventory logjams and late vendor dispatches, reducing average fulfillment cycle times by up to 22%.',
    expectedOutcome: 'Operational dashboard tracking vendor fulfillment SLAs, lead-time standard deviations, and automated reorder triggers.',
    implementationSteps: [
      { step: 1, title: 'Current State Process Mapping', description: 'Document order-to-delivery lifecycle milestones and pinpoint manual inspection bottleneck delays.' },
      { step: 2, title: 'SQL Variance Calculations', description: 'Query dispatch and delivery timestamps to compute lead-time deviations against contracted vendor SLAs.' },
      { step: 3, title: 'Interactive BI Monitoring', description: 'Build Power BI visuals highlighting at-risk shipments with color-coded operational threshold alerts.' },
      { step: 4, title: 'Process Improvement Recommendations', description: 'Formulate automated reorder heuristics to minimize warehouse safety stock holding expenses.' }
    ]
  },

  // Software & Web Projects
  {
    id: 'proj-se-task-kanban',
    title: 'Full-Stack Task & Collaborative Kanban Board',
    domain: 'Software Engineering',
    targetRoles: ['Software Developer (Full Stack)', 'AI Engineer'],
    difficulty: 'Intermediate',
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'SQL', 'Node.js'],
    skillsDeveloped: ['State Management', 'Drag-and-Drop UX', 'RESTful API Integration', 'Relational Database Schema Design'],
    description: 'Design and build a responsive full-stack task management application featuring drag-and-drop workflow stages, user authentication, and persistent SQL storage.',
    reason: 'Demonstrates end-to-end software development lifecycle, responsive UI mechanics, and clean component architecture.',
    impactMetrics: 'Showcases clean production-grade code structure, modular component hierarchies, and resilient error boundary handling.',
    expectedOutcome: 'Interactive React web application with persistent task states, filterable tags, and responsive multi-column boards.',
    implementationSteps: [
      { step: 1, title: 'Relational Schema Design', description: 'Model Users, Boards, Columns, and Tasks with foreign key relationships and status constraints in SQL.' },
      { step: 2, title: 'Backend REST API', description: 'Implement Node/Express routes for CRUD operations with token authentication and request validation.' },
      { step: 3, title: 'React Frontend & State Hooks', description: 'Develop modular React components utilizing useState, useEffect, and custom context hooks for global state.' },
      { step: 4, title: 'Drag-and-Drop & Responsive Styling', description: 'Integrate accessible drag-and-drop mechanics with responsive Tailwind CSS styling across desktop and mobile screens.' }
    ]
  }
];

/**
 * Intelligently recommends exactly 3 or 4 tailored projects for a student based on:
 * - Career Goal
 * - Current Technical Skills
 * - Programming Languages
 * - Identified Skill Gaps (Missing Skills)
 * - Student Interests
 * - Existing Projects (excludes duplicates)
 */
export function getRecommendedProjectsForStudent(
  profile: StudentProfile,
  missingSkills: MissingSkill[] = []
): CatalogProject[] {
  const goalLower = (profile.careerGoal || 'Data Scientist').toLowerCase();
  const studentSkills = new Set(
    [...(profile.skills || []), ...(profile.programmingLanguages || [])].map(s => s.toLowerCase().trim())
  );
  const existingProjectNames = new Set((profile.projects || []).map(p => p.name.toLowerCase().trim()));
  const missingSkillNames = new Set(missingSkills.map(m => m.skill.toLowerCase().trim()));
  const interests = new Set((profile.interests || []).map(i => i.toLowerCase().trim()));

  // Score each project in catalog
  const scored = COMPREHENSIVE_PROJECT_CATALOG.filter(project => {
    // Exclude projects the student has already built or attached
    return !existingProjectNames.has(project.title.toLowerCase().trim());
  }).map(project => {
    let score = 0;

    // 1. Direct Target Role Alignment (Very High Weight: 40 pts)
    const matchesTargetRole = project.targetRoles.some(r => r.toLowerCase().includes(goalLower) || goalLower.includes(r.toLowerCase()));
    if (matchesTargetRole) {
      score += 40;
    }

    // 2. Closes Identified Skill Gap (High Weight: 25 pts)
    const closesGap = project.skills.filter(s => missingSkillNames.has(s.toLowerCase()));
    score += closesGap.length * 20;

    // 3. Leverages Skills Student Already Has (Feasibility: 15 pts)
    const hasPrereq = project.skills.filter(s => studentSkills.has(s.toLowerCase()));
    score += hasPrereq.length * 8;

    // 4. Matches Student Interests (10 pts)
    const matchesInterest = Array.from(interests).some(interest =>
      project.title.toLowerCase().includes(interest) ||
      project.description.toLowerCase().includes(interest) ||
      project.domain.toLowerCase().includes(interest)
    );
    if (matchesInterest) {
      score += 15;
    }

    // 5. Difficulty Balance
    if (studentSkills.size <= 2 && project.difficulty === 'Beginner') {
      score += 15;
    } else if (studentSkills.size > 5 && project.difficulty === 'Advanced') {
      score += 10;
    } else if (project.difficulty === 'Intermediate') {
      score += 8;
    }

    // Personalize the recommendation rationale dynamically
    let personalizedReason = project.reason;
    if (closesGap.length > 0) {
      personalizedReason = `Targeted for your goal of ${profile.careerGoal || 'your target role'}: Directly builds hands-on competency in ${closesGap.slice(0, 2).join(' & ')}, closing key skill gaps identified by the career engine.`;
    } else if (hasPrereq.length > 0) {
      personalizedReason = `Leverages your foundation in ${hasPrereq.slice(0, 2).join(' & ')} to advance your portfolio toward ${profile.careerGoal || 'industry benchmark standards'}.`;
    }

    return {
      ...project,
      reason: personalizedReason,
      _score: score
    };
  });

  // Sort descending by calculated score
  scored.sort((a, b) => b._score - a._score);

  // Return exactly 3 or 4 top recommended projects
  const selected = scored.slice(0, 4);

  // Guarantee at least 3 projects
  if (selected.length < 3) {
    const fallback = COMPREHENSIVE_PROJECT_CATALOG.slice(0, 4);
    return fallback;
  }

  return selected;
}
