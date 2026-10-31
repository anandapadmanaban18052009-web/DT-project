export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
}

export interface StudentProfile {
  name: string;
  education: string;
  department: string;
  yearOfStudy: string;
  skills: string[];
  projects: Project[];
  interests: string[];
  careerGoal: string;
  avatarUrl?: string;
}

export interface RoadmapStep {
  step: number;
  title: string;
  status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed';
  category: string;
  estimatedWeeks: string;
  description: string;
  resources: { name: string; type: 'Course' | 'Book' | 'Practice' | 'Project'; linkText: string }[];
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
  experienceLevel: 'Entry Level' | 'Associate' | 'Mid-Senior';
  requiredSkills: string[];
  preferredSkills: string[];
  description: string;
  postedDate: string;
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
  status: 'Top Candidate' | 'Strong Match' | 'Potential Match';
}

export type NavigationTab =
  | 'landing'
  | 'profile-form'
  | 'dashboard'
  | 'career-matching'
  | 'skill-gap'
  | 'engine'
  | 'resume-analyzer'
  | 'roadmap'
  | 'projects'
  | 'recruiter'
  | 'candidate-matching'
  | 'data-science'
  | 'about';
