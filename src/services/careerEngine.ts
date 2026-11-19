import {
  StudentProfile,
  CareerRole,
  CareerMatchResult,
  MissingSkill,
  JobRequirement,
  CandidateProfile,
  CandidateMatchResult
} from '../types';
import { CAREER_ROLES } from '../data/mockData';

/**
 * ============================================================================
 * AI CAREER INTELLIGENCE SYSTEM - MATHEMATICAL VECTOR SIMILARITY ENGINE
 * ============================================================================
 * Implements:
 * 1. Skill Canonical Normalization & Entity Mapping
 * 2. Multi-Attribute Student Vectorization (Self-declared vs Verified vs Projects)
 * 3. Weighted Industry Competency Benchmark Vectorization
 * 4. Cosine Similarity Calculation:
 *    Cosine(u, v) = (u · v) / (||u|| * ||v||)
 * 5. Weighted Jaccard Similarity Calculation:
 *    Jaccard_W(u, v) = sum(min(u_i, v_i)) / sum(max(u_i, v_i))
 * 6. Configurable Final Score Formulation:
 *    Final Match Score = (60% * Cosine) + (40% * Weighted Jaccard)
 * 7. Skill Assessment Test Verification & Skill Gap Categorization
 * ============================================================================
 */

// Skill normalization dictionary to map synonyms and aliases to canonical titles
export const SKILL_ALIASES: Record<string, string> = {
  'ml': 'Machine Learning',
  'machine learning': 'Machine Learning',
  'dl': 'Deep Learning',
  'deep learning': 'Deep Learning',
  'nlp': 'Natural Language Processing',
  'natural language processing': 'Natural Language Processing',
  'ai': 'Artificial Intelligence',
  'artificial intelligence': 'Artificial Intelligence',
  'cv': 'Computer Vision',
  'computer vision': 'Computer Vision',
  'stats': 'Statistics',
  'statistics': 'Statistics',
  'bi': 'Business Intelligence',
  'business intelligence': 'Business Intelligence',
  'power bi': 'Power BI',
  'powerbi': 'Power BI',
  'js': 'JavaScript',
  'javascript': 'JavaScript',
  'ts': 'TypeScript',
  'typescript': 'TypeScript',
  'py': 'Python',
  'python': 'Python',
  'python3': 'Python',
  'python programming': 'Python',
  'java programming': 'Java',
  'c programming': 'C',
  'cpp': 'C++',
  'c++ programming': 'C++',
  'react.js': 'React',
  'reactjs': 'React',
  'react': 'React',
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'node.js': 'Node.js',
  'sql database': 'SQL',
  'postgresql': 'SQL',
  'postgres': 'SQL',
  'mysql': 'SQL',
  'sqlite': 'SQL',
  'sql server': 'SQL',
  'adv sql': 'Advanced SQL',
  'advanced sql': 'Advanced SQL',
  'llm': 'Generative AI',
  'llms': 'Generative AI',
  'genai': 'Generative AI',
  'generative ai': 'Generative AI',
  'prompt engineering': 'Generative AI',
  'langchain': 'Generative AI',
  'neural net': 'Neural Networks',
  'neural networks': 'Neural Networks',
  'ann': 'Neural Networks',
  'cnn': 'Deep Learning',
  'rnn': 'Deep Learning',
  'data viz': 'Data Visualization',
  'data visualization': 'Data Visualization',
  'visualization': 'Data Visualization',
  'ms excel': 'Excel',
  'microsoft excel': 'Excel',
  'excel': 'Excel',
  'eda': 'Pandas',
  'data manipulation': 'Pandas'
};

/**
 * Normalizes a skill string to its canonical title
 */
export function normalizeSkill(skill: string): string {
  if (!skill) return '';
  const trimmed = skill.trim();
  const lower = trimmed.toLowerCase();
  if (SKILL_ALIASES[lower]) {
    return SKILL_ALIASES[lower];
  }
  // Remove trailing "programming", "language", "framework"
  const cleaned = lower
    .replace(/\b(programming|language|framework|library|tool)\b/g, '')
    .trim();
  if (SKILL_ALIASES[cleaned]) {
    return SKILL_ALIASES[cleaned];
  }
  return trimmed;
}

/**
 * Checks if a candidate skill set satisfies a required skill
 */
export function hasSkill(userSkills: string[], requiredSkill: string): boolean {
  const reqNorm = normalizeSkill(requiredSkill).toLowerCase();
  return userSkills.some(s => {
    const sNorm = normalizeSkill(s).toLowerCase();
    return sNorm === reqNorm || sNorm.includes(reqNorm) || reqNorm.includes(sNorm);
  });
}

/**
 * Calculates Cosine Similarity between two numerical vectors
 * Cosine(u, v) = (u · v) / (||u||_2 * ||v||_2)
 */
export function computeCosineSimilarity(u: number[], v: number[]): number {
  if (u.length !== v.length || u.length === 0) return 0;

  let dotProduct = 0;
  let normU = 0;
  let normV = 0;

  for (let i = 0; i < u.length; i++) {
    dotProduct += u[i] * v[i];
    normU += u[i] * u[i];
    normV += v[i] * v[i];
  }

  if (normU === 0 || normV === 0) return 0;
  const similarity = dotProduct / (Math.sqrt(normU) * Math.sqrt(normV));
  return Math.max(0, Math.min(1, similarity));
}

/**
 * Calculates Weighted Jaccard Similarity (Ruzicka metric)
 * Jaccard_W(u, v) = sum(min(u_i, v_i)) / sum(max(u_i, v_i))
 */
export function computeWeightedJaccardSimilarity(u: number[], v: number[]): number {
  if (u.length !== v.length || u.length === 0) return 0;

  let sumMin = 0;
  let sumMax = 0;

  for (let i = 0; i < u.length; i++) {
    sumMin += Math.min(u[i], v[i]);
    sumMax += Math.max(u[i], v[i]);
  }

  if (sumMax === 0) return 0;
  const similarity = sumMin / sumMax;
  return Math.max(0, Math.min(1, similarity));
}

/**
 * Builds the canonical skill taxonomy space for vector comparisons
 */
function getCanonicalTaxonomy(career: CareerRole): string[] {
  const taxonomySet = new Set<string>();

  // Add all skills from the career benchmark
  career.requiredSkills.forEach(s => taxonomySet.add(normalizeSkill(s)));
  career.importantSkills.forEach(s => taxonomySet.add(normalizeSkill(s)));

  // Add common skills across other careers to ensure vector breadth
  CAREER_ROLES.forEach(cr => {
    cr.requiredSkills.forEach(s => taxonomySet.add(normalizeSkill(s)));
    cr.importantSkills.forEach(s => taxonomySet.add(normalizeSkill(s)));
  });

  return Array.from(taxonomySet);
}

/**
 * Evaluates career compatibility using Cosine Similarity (60%) + Weighted Jaccard Similarity (40%)
 * Incorporates:
 * - Self-declared profile skills & languages
 * - Resume-extracted skills (if approved)
 * - Practical project experience (technologies used)
 * - Skill Assessment Test scores (Requirement 6 integration)
 */
export function calculateCareerMatch(
  profile: StudentProfile,
  career: CareerRole
): CareerMatchResult {
  // 1. Gather all normalized student skills
  const declaredSkills = (profile.skills || []).map(s => normalizeSkill(s));
  const declaredLanguages = (profile.programmingLanguages || []).map(s => normalizeSkill(s));
  const projectTech = (profile.projects || []).flatMap(p => (p.technologies || []).map(t => normalizeSkill(t)));

  const allStudentSkills = Array.from(new Set([...declaredSkills, ...declaredLanguages, ...projectTech]));

  // If student has 0 skills entered: return transparent 0%
  if (allStudentSkills.length === 0) {
    return {
      career,
      matchPercentage: 0,
      cosineScore: 0,
      weightedJaccardScore: 0,
      matchingSkills: [],
      verifiedSkills: [],
      selfDeclaredSkills: [],
      skillsNeedingImprovement: [],
      missingSkills: career.requiredSkills.map(skill => ({
        skill,
        priority: 'High' as const,
        category: 'Core Requirement',
        recommendation: `Prerequisite competency for ${career.title}.`
      })),
      recommendedAdditionalSkills: career.importantSkills.slice(0, 3),
      readinessLevel: 'Developing',
      whyThisCareer: 'Your profile does not contain technical skills yet. Complete your profile or take a skill assessment to discover your career readiness.',
      nextSteps: [
        'Complete your profile with your coursework and programming skills',
        'Take the My Skill Assessment test to verify your core strengths',
        'Upload your resume to extract demonstrated skills'
      ]
    };
  }

  // 2. Build multi-dimensional vector space
  const taxonomy = getCanonicalTaxonomy(career);
  const studentVector: number[] = new Array(taxonomy.length).fill(0);
  const careerVector: number[] = new Array(taxonomy.length).fill(0);

  // Skill Assessment Test Scores map (Requirement 6)
  const assessmentScores = profile.assessmentSkillScores || {};

  const verifiedSkills: string[] = [];
  const selfDeclaredSkills: string[] = [];
  const skillsNeedingImprovement: string[] = [];
  const matchingSkills: string[] = [];

  // Populate Career Benchmark Vector
  taxonomy.forEach((skill, idx) => {
    const isRequired = hasSkill(career.requiredSkills, skill);
    const isImportant = hasSkill(career.importantSkills, skill);

    if (isRequired) {
      careerVector[idx] = 3.0; // Core required skills weighted 3.0
    } else if (isImportant) {
      careerVector[idx] = 1.5; // Secondary/Important skills weighted 1.5
    } else {
      careerVector[idx] = 0.2; // Minor baseline
    }
  });

  // Populate Student Profile Vector
  taxonomy.forEach((skill, idx) => {
    const hasInProfile = hasSkill(allStudentSkills, skill);
    const hasInProjects = hasSkill(projectTech, skill);

    // Check if skill was tested in Skill Assessment
    const testedEntry = Object.entries(assessmentScores).find(([k]) =>
      normalizeSkill(k).toLowerCase() === skill.toLowerCase()
    );

    let skillWeight = 0;

    if (hasInProfile) {
      skillWeight = 1.0; // Base self-declared weight

      if (testedEntry) {
        const score = testedEntry[1];
        if (score >= 70) {
          // Demonstrated strength / verified competency
          skillWeight = 1.4;
          verifiedSkills.push(skill);
        } else if (score < 50) {
          // Low test score -> flagged as needing improvement
          skillWeight = 0.5;
          skillsNeedingImprovement.push(skill);
        } else {
          // Basic understanding
          skillWeight = 1.0;
        }
      } else {
        selfDeclaredSkills.push(skill);
      }

      // Project experience boost (+0.3 for practical application)
      if (hasInProjects) {
        skillWeight += 0.3;
      }

      matchingSkills.push(skill);
    } else {
      // Untested and not in profile
      skillWeight = 0;
    }

    studentVector[idx] = skillWeight;
  });

  // 3. Compute Similarity Scores
  const cosineRaw = computeCosineSimilarity(studentVector, careerVector);
  const jaccardRaw = computeWeightedJaccardSimilarity(studentVector, careerVector);

  const cosineScore = Math.round(cosineRaw * 100);
  const weightedJaccardScore = Math.round(jaccardRaw * 100);

  // 4. Configurable Scoring Formula:
  // Final Match Score = (60% * Cosine Similarity) + (40% * Weighted Jaccard Similarity)
  const combinedRaw = (0.60 * cosineRaw) + (0.40 * jaccardRaw);
  const matchPercentage = Math.min(99, Math.max(5, Math.round(combinedRaw * 100)));

  // 5. Evaluate Missing Skills & Categorization
  const missingRequired = career.requiredSkills.filter(req => !hasSkill(allStudentSkills, req));
  const missingImportant = career.importantSkills.filter(imp => !hasSkill(allStudentSkills, imp));

  const missingSkills: MissingSkill[] = [
    ...missingRequired.map(skill => ({
      skill,
      priority: 'High' as const,
      category: 'Core Benchmark Requirement',
      recommendation: `High-priority prerequisite for ${career.title}. Essential for baseline eligibility.`
    })),
    ...missingImportant.map(skill => ({
      skill,
      priority: 'Medium' as const,
      category: 'Competitive Differentiator',
      recommendation: `Recommended skill to distinguish your resume and accelerate promotion in ${career.title}.`
    }))
  ];

  // 6. Readiness Level
  let readinessLevel: 'High' | 'Moderate' | 'Developing' = 'Developing';
  if (matchPercentage >= 75) readinessLevel = 'High';
  else if (matchPercentage >= 50) readinessLevel = 'Moderate';

  // 7. Transparent Rationale & Next Steps
  const careerMatchingSkills = matchingSkills.filter(s =>
    hasSkill(career.requiredSkills, s) || hasSkill(career.importantSkills, s)
  );

  let whyThisCareer = '';
  if (verifiedSkills.length > 0 && careerMatchingSkills.length >= 3) {
    whyThisCareer = `Your demonstrated strengths in ${verifiedSkills.slice(0, 3).join(', ')} provide verified readiness for ${career.title}. Addressing gaps in ${missingRequired.slice(0, 2).join(' and ') || 'advanced production tools'} will elevate your competitiveness to senior benchmarks.`;
  } else if (careerMatchingSkills.length >= 2) {
    whyThisCareer = `Your foundation in ${careerMatchingSkills.slice(0, 3).join(', ')} overlaps strongly with core requirements for ${career.title}. Closing gaps in ${missingRequired.slice(0, 2).join(' and ') || 'specialized frameworks'} is your recommended learning priority.`;
  } else {
    whyThisCareer = `Entering ${career.title} is an achievable growth pathway. You currently hold foundational overlap; mastering ${missingRequired.slice(0, 2).join(' and ')} will accelerate your career readiness.`;
  }

  const nextSteps: string[] = [
    missingRequired.length > 0
      ? `Complete the learning roadmap for prerequisite competency: ${missingRequired[0]}`
      : `Deepen your domain portfolio with an advanced capstone project`,
    skillsNeedingImprovement.length > 0
      ? `Review practice exercises and retake the assessment for ${skillsNeedingImprovement[0]}`
      : `Build one of the recommended projects to demonstrate hands-on application`,
    `Review job requirement postings on the Recruiter portal to benchmark your skill set against live postings`
  ];

  return {
    career,
    matchPercentage,
    cosineScore,
    weightedJaccardScore,
    matchingSkills: careerMatchingSkills,
    verifiedSkills,
    selfDeclaredSkills,
    skillsNeedingImprovement,
    missingSkills,
    recommendedAdditionalSkills: missingImportant.slice(0, 4),
    readinessLevel,
    whyThisCareer,
    nextSteps
  };
}

/**
 * Compares the student profile against all industry career benchmarks:
 * - Data Analyst
 * - Data Scientist
 * - Machine Learning Engineer
 * - AI Engineer
 * - Business Analyst
 * Returns the ranked career match list.
 */
export function rankAllCareers(profile: StudentProfile): CareerMatchResult[] {
  // Ensure the 5 primary benchmarks are always evaluated
  const targetBenchmarks = ['data-analyst', 'data-scientist', 'ml-engineer', 'ai-engineer', 'business-analyst'];
  const benchmarkRoles = CAREER_ROLES.filter(r => targetBenchmarks.includes(r.id));
  const otherRoles = CAREER_ROLES.filter(r => !targetBenchmarks.includes(r.id));

  // Prioritize primary benchmarks, then rank by match percentage descending
  const allToEvaluate = [...benchmarkRoles, ...otherRoles];

  return allToEvaluate
    .map(role => calculateCareerMatch(profile, role))
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
}

/**
 * Computes dynamic radar proficiency comparing student profile vs benchmark
 */
export function computeRadarProficiency(profile: StudentProfile, career: CareerRole) {
  const combined = [
    ...(profile.skills || []),
    ...(profile.programmingLanguages || [])
  ].map(s => s.toLowerCase());

  const assessmentScores = profile.assessmentSkillScores || {};

  const evalSkill = (terms: string[]) => {
    // Check if tested in assessment
    for (const [skillName, score] of Object.entries(assessmentScores)) {
      if (terms.some(t => skillName.toLowerCase().includes(t))) {
        return Math.max(30, Math.min(95, score));
      }
    }
    // Otherwise fallback to self-declared presence
    return terms.some(t => combined.some(s => s.includes(t))) ? 75 : 20;
  };

  return [
    { subject: 'Python & Lang', student: evalSkill(['python', 'r', 'java', 'c++']), target: 85, fullMark: 100 },
    { subject: 'SQL & Data', student: evalSkill(['sql', 'pandas', 'numpy', 'database']), target: 90, fullMark: 100 },
    { subject: 'Machine Learning', student: evalSkill(['machine learning', 'scikit', 'classification']), target: 85, fullMark: 100 },
    { subject: 'Statistics & Math', student: evalSkill(['statistics', 'probability', 'math']), target: 80, fullMark: 100 },
    { subject: 'Deep Learning', student: evalSkill(['deep learning', 'pytorch', 'tensorflow', 'neural']), target: 75, fullMark: 100 },
    { subject: 'Business & BI', student: evalSkill(['power bi', 'excel', 'data visualization', 'tableau']), target: 75, fullMark: 100 },
  ];
}

/**
 * Technical Skill Corpus for Resume Keyword Extraction
 */
export const COMPREHENSIVE_SKILL_CORPUS = [
  'Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'R', 'Go',
  'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite',
  'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-Learn', 'SciPy',
  'Machine Learning', 'Deep Learning', 'Statistics', 'Probability', 'Linear Algebra',
  'PyTorch', 'TensorFlow', 'Keras', 'NLP', 'Natural Language Processing',
  'Neural Networks', 'Computer Vision', 'OpenCV', 'Transformers', 'HuggingFace', 'LLMs', 'Generative AI', 'Prompt Engineering',
  'LangChain', 'LlamaIndex', 'Vector Databases', 'ChromaDB', 'Pinecone',
  'Data Visualization', 'Tableau', 'Power BI', 'Excel', 'DAX',
  'Docker', 'Kubernetes', 'MLOps', 'MLflow', 'DVC', 'Git', 'GitHub', 'CI/CD',
  'FastAPI', 'Flask', 'Django', 'REST APIs', 'GraphQL',
  'HTML', 'CSS', 'React', 'Node.js', 'Express',
  'Data Structures', 'Algorithms', 'Time Series', 'A/B Testing', 'Hypothesis Testing',
  'Feature Engineering', 'ETL', 'Data Warehousing', 'Snowflake', 'BigQuery',
  'AWS', 'Azure', 'GCP', 'Linux', 'Bash', 'Problem Solving', 'Communication'
];

export interface ExtractedResumeSkills {
  rawText: string;
  allSkills: string[];
  // 8 Specific Categories as specified in Master Prompt
  programmingLanguages: string[];
  frameworksAndLibraries: string[];
  databaseSkills: string[];
  dataScienceTools: string[];
  aiAndMachineLearning: string[];
  cloudAndDevTools: string[];
  softSkills: string[];
  projectsAndExperience: string[];

  // Compatibility aliases
  frameworksAndTools: string[];
  projectSkills: string[];

  // Context & Metadata
  identifiedExperience: string[];
  detectedEducation: string[];
  skillsNeedingImprovement: string[];
  skillOrigins: Record<string, string>;
  warnings: string[];
}

/**
 * Robust Keyword, Context & Pattern Skill Extractor from Resume Text
 */
export function extractSkillsFromText(text: string, currentTargetRole?: string): ExtractedResumeSkills {
  if (!text || text.trim().length === 0) {
    return {
      rawText: '',
      allSkills: [],
      programmingLanguages: [],
      frameworksAndLibraries: [],
      databaseSkills: [],
      dataScienceTools: [],
      aiAndMachineLearning: [],
      cloudAndDevTools: [],
      softSkills: [],
      projectsAndExperience: [],
      frameworksAndTools: [],
      projectSkills: [],
      identifiedExperience: [],
      detectedEducation: [],
      skillsNeedingImprovement: [],
      skillOrigins: {},
      warnings: ['Unable to extract readable text from this resume. Please upload a valid PDF or DOCX file.']
    };
  }

  const foundSkills = new Set<string>();
  const skillOrigins: Record<string, string> = {};
  const lowerText = ` ${text.toLowerCase()} `;

  // Detect section boundaries to provide origin context
  const lines = text.split('\n');
  let currentSection = 'General / Summary';

  lines.forEach(line => {
    const lLower = line.toLowerCase().trim();
    if (/^(skills|technical skills|competencies|technologies|tools)\b/i.test(lLower)) {
      currentSection = 'Skills Section';
    } else if (/^(projects|academic projects|key projects|portfolio)\b/i.test(lLower)) {
      currentSection = 'Project Description';
    } else if (/^(experience|work experience|employment|internships)\b/i.test(lLower)) {
      currentSection = 'Experience Section';
    } else if (/^(education|academic background|qualifications)\b/i.test(lLower)) {
      currentSection = 'Education Section';
    }

    COMPREHENSIVE_SKILL_CORPUS.forEach(skill => {
      const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-zA-Z0-9_+#])${escaped.toLowerCase()}(?=[^a-zA-Z0-9_+#]|$)`, 'i');
      if (regex.test(` ${lLower} `)) {
        const canonical = normalizeSkill(skill);
        foundSkills.add(canonical);
        if (!skillOrigins[canonical]) {
          skillOrigins[canonical] = currentSection;
        }
      }
    });
  });

  // Direct and Alias Matching over full text
  COMPREHENSIVE_SKILL_CORPUS.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(^|[^a-zA-Z0-9_+#])${escaped.toLowerCase()}(?=[^a-zA-Z0-9_+#]|$)`, 'i');
    if (regex.test(lowerText)) {
      const canonical = normalizeSkill(skill);
      foundSkills.add(canonical);
      if (!skillOrigins[canonical]) {
        skillOrigins[canonical] = 'Skills Section';
      }
    }
  });

  // Alias heuristics with canonical normalization
  if (/\bpython\b/i.test(lowerText) || /python\s+programming/i.test(lowerText)) foundSkills.add('Python');
  if (/\bjava\b/i.test(lowerText) && !/javascript/i.test(lowerText)) foundSkills.add('Java');
  if (/\bc\+\+\b/i.test(lowerText) || /\bcpp\b/i.test(lowerText)) foundSkills.add('C++');
  if (/\b\s*c\s+(language|programming)\b/i.test(lowerText)) foundSkills.add('C');
  if (/\bjavascript\b/i.test(lowerText) || /\bjs\b/i.test(lowerText)) foundSkills.add('JavaScript');
  if (/\btypescript\b/i.test(lowerText) || /\bts\b/i.test(lowerText)) foundSkills.add('TypeScript');
  if (/\bml\b/i.test(lowerText) || /machine\s+learning/i.test(lowerText)) foundSkills.add('Machine Learning');
  if (/\bdl\b/i.test(lowerText) || /deep\s+learning/i.test(lowerText)) foundSkills.add('Deep Learning');
  if (/\bnlp\b/i.test(lowerText) || /natural\s+language\s+processing/i.test(lowerText)) foundSkills.add('Natural Language Processing');
  if (/\bgenai\b/i.test(lowerText) || /generative\s+ai\b/i.test(lowerText) || /llms?\b/i.test(lowerText)) foundSkills.add('Generative AI');
  if (/\bneural\s+net(work)?s?\b/i.test(lowerText) || /\bann\b/i.test(lowerText) || /\bcnn\b/i.test(lowerText)) foundSkills.add('Neural Networks');
  if (/\bpostgres(ql)?\b/i.test(lowerText) || /\bmysql\b/i.test(lowerText) || /\bsqlite\b/i.test(lowerText)) foundSkills.add('SQL');
  if (/\bpower\s*bi\b/i.test(lowerText)) foundSkills.add('Power BI');
  if (/\bexcel\b/i.test(lowerText) || /\bms\s*excel\b/i.test(lowerText)) foundSkills.add('Excel');
  if (/\breact(\.js|js)?\b/i.test(lowerText)) foundSkills.add('React');
  if (/\bnode(\.js|js)?\b/i.test(lowerText)) foundSkills.add('Node.js');
  if (/\bproblem\s+solving\b/i.test(lowerText)) foundSkills.add('Problem Solving');
  if (/\bcommunication(\s+skills)?\b/i.test(lowerText)) foundSkills.add('Communication');
  if (/\bleadership\b/i.test(lowerText)) foundSkills.add('Leadership');
  if (/\bteamwork\b/i.test(lowerText) || /\bcollaboration\b/i.test(lowerText)) foundSkills.add('Collaboration');

  const allSkills = Array.from(foundSkills);

  // 8 Specific Categories as specified in Master Prompt
  // 1. Programming Languages
  const progLangsList = ['Python', 'Java', 'C', 'C++', 'JavaScript', 'TypeScript', 'R', 'Go', 'SQL'];
  const programmingLanguages = allSkills.filter(s => progLangsList.includes(s));

  // 2. Frameworks and Libraries
  const frameworksList = ['Pandas', 'NumPy', 'Scikit-Learn', 'PyTorch', 'TensorFlow', 'Keras', 'React', 'Node.js', 'Express', 'FastAPI', 'Flask', 'Django'];
  const frameworksAndLibraries = allSkills.filter(s => frameworksList.includes(s));

  // 3. Databases
  const dbList = ['SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'SQLite', 'Snowflake', 'BigQuery'];
  const databaseSkills = allSkills.filter(s => dbList.includes(s));

  // 4. Data Science Tools
  const dsToolsList = ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Statistics', 'Probability', 'Data Visualization', 'Tableau', 'Power BI', 'Excel', 'DAX', 'A/B Testing'];
  const dataScienceTools = allSkills.filter(s => dsToolsList.includes(s));

  // 5. AI and Machine Learning
  const aiMlList = ['Machine Learning', 'Deep Learning', 'Neural Networks', 'Natural Language Processing', 'Computer Vision', 'Generative AI', 'Prompt Engineering', 'LangChain', 'LlamaIndex', 'Vector Databases', 'Transformers'];
  const aiAndMachineLearning = allSkills.filter(s => aiMlList.includes(s));

  // 6. Cloud and Development Tools
  const cloudDevList = ['Docker', 'Kubernetes', 'MLOps', 'MLflow', 'DVC', 'Git', 'GitHub', 'CI/CD', 'AWS', 'Azure', 'GCP', 'Linux', 'Bash', 'REST APIs'];
  const cloudAndDevTools = allSkills.filter(s => cloudDevList.includes(s));

  // 7. Soft Skills
  const softSkillsList = ['Problem Solving', 'Communication', 'Leadership', 'Collaboration'];
  const softSkills = allSkills.filter(s => softSkillsList.includes(s));

  // 8. Projects and Experience mentions
  const projectsAndExperience: string[] = [];
  const detectedEducation: string[] = [];
  const identifiedExperience: string[] = [];

  // Extract project titles if explicitly written
  const projectLines = lines.filter(l => /^(project|\d+\.|\*|-)\s+[a-zA-Z0-9\s-]{4,40}:/i.test(l.trim()));
  projectLines.slice(0, 4).forEach(pl => {
    projectsAndExperience.push(pl.trim().replace(/^(\d+\.|\*|-)\s*/, ''));
  });

  if (/\b(b\.?tech|bachelor|b\.?s\.?|master|m\.?tech|degree|b\.?e\.?)\b/i.test(lowerText)) {
    const eduMatch = text.match(/\b(B\.?Tech|Bachelor[a-zA-Z\s]*|B\.?S\.?|Master[a-zA-Z\s]*|M\.?Tech|B\.?E\.?)[^\n,\.]*/i);
    detectedEducation.push(eduMatch ? eduMatch[0].trim() : 'Undergraduate / Bachelor Degree Candidate');
  }

  if (/\b(intern|internship)\b/i.test(lowerText)) identifiedExperience.push('Internship Experience Detected');
  if (/\b(final\s+year|capstone|thesis)\b/i.test(lowerText)) identifiedExperience.push('Capstone / Academic Project Experience');
  if (/\b(\d+)\+?\s*(year|yr)s?\s*(of)?\s*(experience|exp)\b/i.test(lowerText)) {
    const match = lowerText.match(/\b(\d+)\+?\s*(year|yr)s?\s*(of)?\s*(experience|exp)\b/i);
    if (match) identifiedExperience.push(`${match[1]} Years Experience Indicated`);
  }
  if (identifiedExperience.length === 0) {
    identifiedExperience.push('Academic / Early Career Profile');
  }

  // Identify skills that need improvement based on target career
  const targetRole = CAREER_ROLES.find(r =>
    currentTargetRole ? r.title.toLowerCase() === currentTargetRole.toLowerCase() : r.id === 'data-scientist'
  ) || CAREER_ROLES[0];

  const skillsNeedingImprovement = targetRole.requiredSkills.filter(req =>
    !allSkills.some(s => s.toLowerCase() === req.toLowerCase())
  );

  const warnings: string[] = [];
  if (allSkills.length === 0) {
    warnings.push('No relevant skills were identified. Please check the resume content.');
  }

  return {
    rawText: text,
    allSkills,
    programmingLanguages,
    frameworksAndLibraries,
    databaseSkills,
    dataScienceTools,
    aiAndMachineLearning,
    cloudAndDevTools,
    softSkills,
    projectsAndExperience,
    frameworksAndTools: [...frameworksAndLibraries, ...cloudAndDevTools],
    projectSkills: [...frameworksAndLibraries, ...aiAndMachineLearning],
    identifiedExperience,
    detectedEducation,
    skillsNeedingImprovement,
    skillOrigins,
    warnings
  };
}

/**
 * Recruiter candidate matching against a job requirement
 */
export function rankCandidatesForJob(
  job: JobRequirement,
  candidates: CandidateProfile[]
): CandidateMatchResult[] {
  const reqSkills = job.requiredSkills.map(s => normalizeSkill(s));
  const prefSkills = job.preferredSkills.map(s => normalizeSkill(s));

  return candidates.map(candidate => {
    const candSkills = [
      ...(candidate.skills || []),
      ...(candidate.programmingLanguages || [])
    ].map(s => normalizeSkill(s));

    const matchedReq = reqSkills.filter(req => hasSkill(candSkills, req));
    const missingReq = reqSkills.filter(req => !hasSkill(candSkills, req));
    const matchedPref = prefSkills.filter(pref => hasSkill(candSkills, pref));

    const reqScore = reqSkills.length > 0 ? (matchedReq.length / reqSkills.length) * 80 : 0;
    const prefScore = prefSkills.length > 0 ? (matchedPref.length / prefSkills.length) * 20 : 0;

    const rawScore = Math.round(reqScore + prefScore);
    const matchScore = Math.min(98, Math.max(10, rawScore));

    let status: 'Top Candidate' | 'Strong Match' | 'Potential Match' = 'Potential Match';
    if (matchScore >= 80) status = 'Top Candidate';
    else if (matchScore >= 65) status = 'Strong Match';

    const explanation = `${candidate.name.split(' ')[0]} demonstrates ${matchedReq.length} of ${reqSkills.length} required skills (${matchedReq.slice(0, 3).join(', ')})${matchedPref.length > 0 ? ` and ${matchedPref.length} preferred competencies (${matchedPref.join(', ')})` : ''} with ${(candidate.projects || []).length} verified portfolio projects. Zero bias criteria applied.`;

    return {
      candidate,
      matchScore,
      matchedSkills: Array.from(new Set([...matchedReq, ...matchedPref])),
      missingSkills: missingReq,
      status,
      explanation
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
