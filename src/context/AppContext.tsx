import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  StudentProfile,
  CareerRole,
  CareerMatchResult,
  JobRequirement,
  CandidateProfile,
  CandidateMatchResult,
  NavigationTab
} from '../types';
import { DEMO_STUDENT, CAREER_ROLES, RECRUITER_JOBS, CANDIDATE_POOL } from '../data/mockData';
import { rankAllCareers, rankCandidatesForJob } from '../services/careerEngine';

interface AppContextType {
  // Navigation & Mode
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  viewMode: 'student' | 'recruiter';
  setViewMode: (mode: 'student' | 'recruiter') => void;

  // Student Profile State
  profile: StudentProfile;
  updateProfile: (profile: StudentProfile) => void;
  resetToDemo: () => void;
  isCustomProfile: boolean;

  // Career Intelligence Engine State
  careerMatches: CareerMatchResult[];
  selectedCareerId: string;
  setSelectedCareerId: (id: string) => void;
  selectedCareer: CareerRole;
  currentCareerMatch: CareerMatchResult;

  // Interactive Roadmap State
  roadmapStepStatuses: Record<number, 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'>;
  updateRoadmapStep: (step: number, status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed') => void;

  // Recruiter Mode State
  recruiterJobs: JobRequirement[];
  selectedJobId: string;
  setSelectedJobId: (id: string) => void;
  selectedJob: JobRequirement;
  candidates: CandidateProfile[];
  candidateMatches: CandidateMatchResult[];
  addJobRequirement: (newJob: Omit<JobRequirement, 'id' | 'postedDate'>) => void;

  // Profile Form Modal State
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('landing');
  const [viewMode, setViewMode] = useState<'student' | 'recruiter'>('student');
  const [profile, setProfile] = useState<StudentProfile>(DEMO_STUDENT);
  const [isCustomProfile, setIsCustomProfile] = useState<boolean>(false);
  const [selectedCareerId, setSelectedCareerId] = useState<string>('data-scientist');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Recruiter state
  const [recruiterJobs, setRecruiterJobs] = useState<JobRequirement[]>(RECRUITER_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>(RECRUITER_JOBS[0].id);
  const [candidates] = useState<CandidateProfile[]>(CANDIDATE_POOL);

  // Roadmap progress overrides
  const [roadmapStepStatuses, setRoadmapStepStatuses] = useState<
    Record<number, 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'>
  >({
    1: 'In Progress',
    2: 'Recommended',
    3: 'Recommended',
    4: 'Not Started'
  });

  // Calculate career matches dynamically when profile changes
  const careerMatches = useMemo(() => {
    return rankAllCareers(profile);
  }, [profile]);

  // Selected career
  const selectedCareer = useMemo(() => {
    return CAREER_ROLES.find(c => c.id === selectedCareerId) || CAREER_ROLES[0];
  }, [selectedCareerId]);

  // Selected career match result
  const currentCareerMatch = useMemo(() => {
    return (
      careerMatches.find(m => m.career.id === selectedCareerId) ||
      careerMatches[0]
    );
  }, [careerMatches, selectedCareerId]);

  // Selected recruiter job
  const selectedJob = useMemo(() => {
    return recruiterJobs.find(j => j.id === selectedJobId) || recruiterJobs[0];
  }, [recruiterJobs, selectedJobId]);

  // Ranked candidates for selected recruiter job
  const candidateMatches = useMemo(() => {
    if (!selectedJob) return [];
    return rankCandidatesForJob(selectedJob, candidates);
  }, [selectedJob, candidates]);

  const updateProfile = (newProfile: StudentProfile) => {
    setProfile(newProfile);
    setIsCustomProfile(true);

    // Auto-match selected career goal if matching role exists
    const matchedRole = CAREER_ROLES.find(
      c => c.title.toLowerCase() === newProfile.careerGoal.toLowerCase()
    );
    if (matchedRole) {
      setSelectedCareerId(matchedRole.id);
    }
  };

  const resetToDemo = () => {
    setProfile(DEMO_STUDENT);
    setIsCustomProfile(false);
    setSelectedCareerId('data-scientist');
    setRoadmapStepStatuses({
      1: 'In Progress',
      2: 'Recommended',
      3: 'Recommended',
      4: 'Not Started'
    });
  };

  const updateRoadmapStep = (
    step: number,
    status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'
  ) => {
    setRoadmapStepStatuses(prev => ({
      ...prev,
      [step]: status
    }));
  };

  const addJobRequirement = (newJob: Omit<JobRequirement, 'id' | 'postedDate'>) => {
    const created: JobRequirement = {
      ...newJob,
      id: `job-${Date.now()}`,
      postedDate: 'Just now'
    };
    setRecruiterJobs(prev => [created, ...prev]);
    setSelectedJobId(created.id);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        profile,
        updateProfile,
        resetToDemo,
        isCustomProfile,
        careerMatches,
        selectedCareerId,
        setSelectedCareerId,
        selectedCareer,
        currentCareerMatch,
        roadmapStepStatuses,
        updateRoadmapStep,
        recruiterJobs,
        selectedJobId,
        setSelectedJobId,
        selectedJob,
        candidates,
        candidateMatches,
        addJobRequirement,
        isProfileModalOpen,
        setIsProfileModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
