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
 * AI CAREER INTELLIGENCE SYSTEM - PROTOTYPE INTELLIGENCE ENGINE
 * ============================================================================
 * NOTE FOR ACADEMIC EVALUATION & EXTENSIBILITY:
 * This module isolates all scoring, skill-gap detection, and keyword extraction logic.
 * Currently it implements a transparent weighted heuristic matching model suitable for
 * prototype demonstration. To integrate a trained Machine Learning model (e.g.,
 * Scikit-Learn TF-IDF Cosine Similarity, or Sentence-Transformers BERT embeddings):
 *   1. Replace `calculateCareerMatch` with an API call to a FastAPI/Flask inference endpoint.
 *   2. Supply the vector embeddings of student profile features vs job role embeddings.
 * ============================================================================
 */

// Skill normalization map for robust fuzzy matching
const SKILL_ALIASES: Record<string, string> = {
  'ml': 'Machine Learning',
  'machine learning': 'Machine Learning',
  'dl': 'Deep Learning',
  'deep learning': 'Deep Learning',
  'nlp': 'NLP',
  'natural language processing': 'NLP',
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
  'react.js': 'React',
  'reactjs': 'React',
  'node': 'Node.js',
  'nodejs': 'Node.js',
  'postgresql': 'SQL',
  'mysql': 'SQL',
  'sql server': 'SQL',
  'adv sql': 'Advanced SQL',
  'advanced sql': 'Advanced SQL'
};

/**
 * Normalizes a skill string to its canonical title
 */
export function normalizeSkill(skill: string): string {
  const trimmed = skill.trim();
  const lower = trimmed.toLowerCase();
  if (SKILL_ALIASES[lower]) {
    return SKILL_ALIASES[lower];
  }
  // Title-case single words or preserve capitalization
  return trimmed;
}

/**
 * Checks if a candidate skill set satisfies a required skill
 */
function hasSkill(userSkills: string[], requiredSkill: string): boolean {
  const reqNorm = normalizeSkill(requiredSkill).toLowerCase();
  return userSkills.some(s => {
    const sNorm = normalizeSkill(s).toLowerCase();
    return sNorm === reqNorm || sNorm.includes(reqNorm) || reqNorm.includes(sNorm);
  });
}

/**
 * Calculates career match percentage, matching skills, and missing skills
 */
export function calculateCareerMatch(
  profile: StudentProfile,
  career: CareerRole
): CareerMatchResult {
  const userSkills = profile.skills.map(s => normalizeSkill(s));

  // 1. Evaluate Core Required Skills
  const matchedRequired: string[] = [];
  const missingRequired: string[] = [];

  career.requiredSkills.forEach(req => {
    if (hasSkill(userSkills, req)) {
      matchedRequired.push(req);
    } else {
      missingRequired.push(req);
    }
  });

  // 2. Evaluate Secondary / Important Skills
  const matchedImportant: string[] = [];
  const missingImportant: string[] = [];

  career.importantSkills.forEach(imp => {
    if (hasSkill(userSkills, imp)) {
      matchedImportant.push(imp);
    } else {
      missingImportant.push(imp);
    }
  });

  // Combine matching skills
  const matchingSkills = Array.from(new Set([...matchedRequired, ...matchedImportant]));

  // Categorize missing skills with priority levels
  const missingSkills: MissingSkill[] = [
    ...missingRequired.map(skill => ({
      skill,
      priority: 'High' as const,
      category: 'Core Requirement',
      recommendation: `High priority prerequisite for ${career.title}. Essential for baseline interviews.`
    })),
    ...missingImportant.map(skill => ({
      skill,
      priority: 'Medium' as const,
      category: 'Specialization Bonus',
      recommendation: `Recommended skill to distinguish your resume and accelerate growth in this role.`
    }))
  ];

  // 3. Project synergy boost (check if student built projects with related tech)
  let projectBonus = 0;
  if (profile.projects && profile.projects.length > 0) {
    const projectTechs = profile.projects.flatMap(p => p.technologies.map(t => normalizeSkill(t).toLowerCase()));
    const matchingProjectTech = career.requiredSkills.filter(req =>
      projectTechs.some(tech => tech.includes(req.toLowerCase()) || req.toLowerCase().includes(tech))
    );
    projectBonus = Math.min(10, matchingProjectTech.length * 3);
  }

  // 4. Mathematical transparent scoring formula:
  // Required skills weight: 70%
  // Important skills weight: 20%
  // Applied project bonus: 10%
  const reqRatio = career.requiredSkills.length > 0 ? (matchedRequired.length / career.requiredSkills.length) : 0;
  const impRatio = career.importantSkills.length > 0 ? (matchedImportant.length / career.importantSkills.length) : 0;

  const rawScore = Math.round(reqRatio * 70 + impRatio * 20 + projectBonus);
  const matchPercentage = Math.min(96, Math.max(15, rawScore));

  // Determine readiness category
  let readinessLevel: 'High' | 'Moderate' | 'Developing' = 'Developing';
  if (matchPercentage >= 75) readinessLevel = 'High';
  else if (matchPercentage >= 55) readinessLevel = 'Moderate';

  // 5. Generate human-readable AI rationale
  let whyThisCareer = '';
  if (matchedRequired.length >= 3) {
    whyThisCareer = `Your strong foundation in ${matchedRequired.slice(0, 3).join(', ')} provides a formidable starting point for ${career.title}. Closing gaps in ${missingRequired.slice(0, 2).join(' and ') || 'advanced tools'} will make you highly competitive.`;
  } else if (matchedRequired.length > 0) {
    whyThisCareer = `Your existing familiarity with ${matchedRequired.join(', ')} demonstrates relevant aptitude. Developing core requirements such as ${missingRequired.slice(0, 2).join(' & ')} is suggested to unlock this pathway.`;
  } else {
    whyThisCareer = `While your current background is distinct, entering ${career.title} is an exciting pivoting pathway that builds on your foundational technical acumen.`;
  }

  return {
    career,
    matchPercentage,
    matchingSkills,
    missingSkills,
    readinessLevel,
    whyThisCareer
  };
}

/**
 * Ranks all available career roles for a given student profile
 */
export function rankAllCareers(profile: StudentProfile): CareerMatchResult[] {
  return CAREER_ROLES.map(role => calculateCareerMatch(profile, role)).sort(
    (a, b) => b.matchPercentage - a.matchPercentage
  );
}

/**
 * Comprehensive Technical Skill Corpus for Resume Keyword Extraction
 */
export const COMPREHENSIVE_SKILL_CORPUS = [
  'Python', 'R', 'SQL', 'PostgreSQL', 'MySQL', 'MongoDB', 'Redis',
  'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-Learn', 'SciPy',
  'Machine Learning', 'Deep Learning', 'Statistics', 'Probability', 'Linear Algebra',
  'PyTorch', 'TensorFlow', 'Keras', 'NLP', 'Natural Language Processing',
  'Computer Vision', 'OpenCV', 'Transformers', 'HuggingFace', 'LLMs', 'Prompt Engineering',
  'LangChain', 'LlamaIndex', 'Vector Databases', 'ChromaDB', 'Pinecone',
  'Data Visualization', 'Tableau', 'Power BI', 'Excel', 'DAX',
  'Docker', 'Kubernetes', 'MLOps', 'MLflow', 'DVC', 'Git', 'GitHub', 'CI/CD',
  'FastAPI', 'Flask', 'Django', 'REST APIs', 'GraphQL',
  'JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Node.js', 'Express',
  'Data Structures', 'Algorithms', 'Time Series', 'A/B Testing', 'Hypothesis Testing',
  'Feature Engineering', 'ETL', 'Data Warehousing', 'Snowflake', 'BigQuery',
  'AWS', 'Azure', 'GCP', 'Linux', 'Bash'
];

/**
 * Keyword-based simulated NLP skill extractor from raw resume or portfolio text.
 * Clearly structured so it can be swapped with a real NER / NLP model later.
 */
export function extractSkillsFromText(text: string): string[] {
  if (!text || text.trim().length === 0) return [];

  const foundSkills: Set<string> = new Set();
  const lowerText = ` ${text.toLowerCase()} `;

  // Test against our corpus
  COMPREHENSIVE_SKILL_CORPUS.forEach(skill => {
    const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // Match word boundaries so 'R' doesn't match every 'r' in a word
    const regex = new RegExp(`(^|[^a-zA-Z0-9_+#])${escaped.toLowerCase()}(?=[^a-zA-Z0-9_+#]|$)`, 'i');
    if (regex.test(lowerText)) {
      foundSkills.add(skill);
    }
  });

  // Check common aliases
  if (/\bml\b/i.test(lowerText)) foundSkills.add('Machine Learning');
  if (/\bdl\b/i.test(lowerText)) foundSkills.add('Deep Learning');
  if (/\bnlp\b/i.test(lowerText)) foundSkills.add('NLP');
  if (/\bgenai\b/i.test(lowerText) || /\bgenerative ai\b/i.test(lowerText)) foundSkills.add('LLMs');
  if (/\bpostgres\b/i.test(lowerText)) foundSkills.add('SQL');

  return Array.from(foundSkills);
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
    const candSkills = candidate.skills.map(s => normalizeSkill(s));

    const matchedReq = reqSkills.filter(req => hasSkill(candSkills, req));
    const missingReq = reqSkills.filter(req => !hasSkill(candSkills, req));

    const matchedPref = prefSkills.filter(pref => hasSkill(candSkills, pref));

    // Transparent candidate match score:
    // Core requirements: 80% weight
    // Preferred skills: 20% weight
    const reqScore = reqSkills.length > 0 ? (matchedReq.length / reqSkills.length) * 80 : 0;
    const prefScore = prefSkills.length > 0 ? (matchedPref.length / prefSkills.length) * 20 : 0;

    const rawScore = Math.round(reqScore + prefScore);
    const matchScore = Math.min(98, Math.max(20, rawScore));

    let status: 'Top Candidate' | 'Strong Match' | 'Potential Match' = 'Potential Match';
    if (matchScore >= 85) status = 'Top Candidate';
    else if (matchScore >= 70) status = 'Strong Match';

    return {
      candidate,
      matchScore,
      matchedSkills: Array.from(new Set([...matchedReq, ...matchedPref])),
      missingSkills: missingReq,
      status
    };
  }).sort((a, b) => b.matchScore - a.matchScore);
}
