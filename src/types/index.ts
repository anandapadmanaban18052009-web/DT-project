export type UserRole = 'student' | 'recruiter';

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface StudentProfile {
  name: string;
  education: string;
  collegeName: string;
  department: string;
  yearOfStudy: string;
  skills: string[];
  programmingLanguages: string[];
  projects: Project[];
  interests: string[];
  careerGoal: string;
  avatarUrl?: string;
  isCompleted: boolean;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  passwordHash?: string;
  createdAt: string;
  profile: StudentProfile | null;
  roadmapProgress: Record<number, 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'>;
  skillProgress?: Record<string, 'Not Started' | 'In Progress' | 'Completed'>;
  customProjects: Project[];
  token?: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed';
  category: string;
  estimatedWeeks: string;
  description: string;
  resources: { name: string; type: 'Course' | 'Book' | 'Practice' | 'Project'; linkText: string; url?: string }[];
}

export interface RecommendedProject {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  skills: string[];
  description: string;
  reason: string;
  impactMetrics: string;
}

export interface CareerRole {
  id: string;
  title: string;
  category: 'Data & Analytics' | 'Artificial Intelligence' | 'Software Engineering';
  shortDescription: string;
  fullDescription: string;
  requiredSkills: string[];
  importantSkills: string[];
  recommendedProjects: RecommendedProject[];
  learningRoadmap: RoadmapStep[];
  avgSalary: string;
  marketDemand: 'Very High' | 'High' | 'Moderate';
  growthRate: string;
  keyResponsibilities: string[];
}

export interface MissingSkill {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  category: string;
  recommendation: string;
}

export interface CareerMatchResult {
  career: CareerRole;
  matchPercentage: number;
  matchingSkills: string[];
  missingSkills: MissingSkill[];
  readinessLevel: 'High' | 'Moderate' | 'Developing';
  whyThisCareer: string;
}

export interface JobRequirement {
  id: string;
  title: string;
  company: string;
  department: string;
  experienceLevel: 'Entry Level' | 'Associate' | 'Mid-Senior' | 'Senior';
  experienceRequired?: string;
  educationRequired?: string;
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  postedDate: string;
  createdBy?: string;
}

export interface CandidateProfile extends StudentProfile {
  id: string;
  gpa: string;
  email: string;
}

export interface CandidateMatchResult {
  candidate: CandidateProfile;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  explanation: string;
  status: 'Top Candidate' | 'Strong Match' | 'Potential Match';
}

export interface LearningResourceItem {
  title: string;
  provider: string;
  url: string;
  type: 'Course' | 'Tutorial' | 'Interactive' | 'Docs';
  isFree: boolean;
}

export interface PracticeExerciseItem {
  title: string;
  prompt: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface MiniProjectItem {
  title: string;
  description: string;
  expectedOutcome: string;
}

export interface SkillLearningResource {
  skillName: string;
  category: string;
  importance: string;
  recommendedOrder: number;
  resources: LearningResourceItem[];
  practiceExercises: PracticeExerciseItem[];
  miniProjects: MiniProjectItem[];
}

export type NavigationTab =
  | 'login'
  | 'register'
  | 'forgot-password'
  | 'onboarding'
  | 'settings'
  | 'landing'
  | 'profile-form'
  | 'dashboard'
  | 'my-profile'
  | 'career-matching'
  | 'skill-gap'
  | 'learn-skills'
  | 'engine'
  | 'resume-analyzer'
  | 'roadmap'
  | 'projects'
  | 'recruiter-jobs'
  | 'recruiter-matching'
  | 'data-science'
  | 'about';
