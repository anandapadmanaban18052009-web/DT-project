import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  StudentProfile,
  CareerRole,
  CareerMatchResult,
  JobRequirement,
  CandidateProfile,
  CandidateMatchResult,
  NavigationTab,
  UserAccount,
  Project
} from '../types';
import { EMPTY_STUDENT_PROFILE, CAREER_ROLES, RECRUITER_JOBS, CANDIDATE_POOL } from '../data/mockData';
import { rankAllCareers, rankCandidatesForJob } from '../services/careerEngine';
import { authService } from '../services/authService';

interface AppContextType {
  // Authentication & User State
  currentUser: UserAccount | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  register: (name: string, email: string, pass: string) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  changePassword: (oldPass: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  resetPassword: (email: string, newPass: string) => Promise<{ success: boolean; message: string }>;
  deleteAccount: () => Promise<{ success: boolean; message: string }>;

  // Navigation & Mode
  activeTab: NavigationTab;
  setActiveTab: (tab: NavigationTab) => void;
  viewMode: 'student' | 'recruiter';
  setViewMode: (mode: 'student' | 'recruiter') => void;

  // Student Profile State
  profile: StudentProfile;
  updateProfile: (profile: StudentProfile) => void;
  isProfileCompleted: boolean;

  // Career Intelligence Engine State
  careerMatches: CareerMatchResult[];
  selectedCareerId: string;
  setSelectedCareerId: (id: string) => void;
  selectedCareer: CareerRole;
  currentCareerMatch: CareerMatchResult;

  // Interactive Roadmap State
  roadmapStepStatuses: Record<number, 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'>;
  updateRoadmapStep: (step: number, status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed') => void;

  // Project Adding
  addCustomProject: (project: Project) => void;

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
  // Current user state (isolated per user)
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(() => authService.getCurrentUser());
  const isAuthenticated = !!currentUser;

  // Navigation tab: if logged in, go to dashboard (or onboarding if incomplete); if not, login screen
  const [activeTab, setActiveTab] = useState<NavigationTab>(() => {
    const user = authService.getCurrentUser();
    if (!user) return 'login';
    if (!user.profile || !user.profile.isCompleted) return 'onboarding';
    return 'dashboard';
  });

  const [viewMode, setViewMode] = useState<'student' | 'recruiter'>('student');
  const [selectedCareerId, setSelectedCareerId] = useState<string>('data-scientist');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  // Recruiter state
  const [recruiterJobs, setRecruiterJobs] = useState<JobRequirement[]>(RECRUITER_JOBS);
  const [selectedJobId, setSelectedJobId] = useState<string>(RECRUITER_JOBS[0].id);
  const [candidates] = useState<CandidateProfile[]>(CANDIDATE_POOL);

  // Derived current user's profile
  const profile: StudentProfile = useMemo(() => {
    if (!currentUser || !currentUser.profile) {
      return {
        ...EMPTY_STUDENT_PROFILE,
        name: currentUser ? currentUser.name : ''
      };
    }
    return currentUser.profile;
  }, [currentUser]);

  const isProfileCompleted = !!(currentUser && currentUser.profile && currentUser.profile.isCompleted);

  // Roadmap progress overrides from current user record
  const roadmapStepStatuses = useMemo(() => {
    if (!currentUser || !currentUser.roadmapProgress) {
      return {
        1: 'Not Started',
        2: 'Not Started',
        3: 'Not Started',
        4: 'Not Started'
      } as const;
    }
    return currentUser.roadmapProgress;
  }, [currentUser]);

  // Synchronize target career when user's goal changes
  useEffect(() => {
    if (profile.careerGoal) {
      const match = CAREER_ROLES.find(
        c => c.title.toLowerCase() === profile.careerGoal.toLowerCase()
      );
      if (match) setSelectedCareerId(match.id);
    }
  }, [profile.careerGoal]);

  // Calculate career matches dynamically based on current user's actual profile
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

  // Ranked candidates for recruiter job
  const candidateMatches = useMemo(() => {
    if (!selectedJob) return [];
    return rankCandidatesForJob(selectedJob, candidates);
  }, [selectedJob, candidates]);

  // Auth: Login
  const login = async (email: string, pass: string) => {
    const res = authService.login(email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      if (!res.user.profile || !res.user.profile.isCompleted) {
        setActiveTab('onboarding');
      } else {
        setActiveTab('dashboard');
      }
    }
    return res;
  };

  // Auth: Register
  const register = async (name: string, email: string, pass: string) => {
    const res = authService.register(name, email, pass);
    if (res.success && res.user) {
      setCurrentUser(res.user);
      setActiveTab('onboarding');
    }
    return res;
  };

  // Auth: Logout
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setActiveTab('login');
  };

  // Auth: Change Password
  const changePassword = async (oldPass: string, newPass: string) => {
    return authService.changePassword(oldPass, newPass);
  };

  // Auth: Reset Password
  const resetPassword = async (email: string, newPass: string) => {
    return authService.resetPassword(email, newPass);
  };

  // Auth: Delete Account
  const deleteAccount = async () => {
    const res = authService.deleteAccount();
    if (res.success) {
      setCurrentUser(null);
      setActiveTab('login');
    }
    return res;
  };

  // Update Profile for current user
  const updateProfile = (newProfile: StudentProfile) => {
    const res = authService.updateProfile(newProfile);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
    }
  };

  // Update Roadmap step
  const updateRoadmapStep = (
    step: number,
    status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'
  ) => {
    const res = authService.updateRoadmapProgress(step, status);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
    }
  };

  // Add custom project
  const addCustomProject = (project: Project) => {
    const res = authService.addProject(project);
    if (res.success && res.user) {
      setCurrentUser({ ...res.user });
    }
  };

  // Recruiter: add new job
  const addJobRequirement = (newJob: Omit<JobRequirement, 'id' | 'postedDate'>) => {
    const created: JobRequirement = {
      ...newJob,
      id: `job-${Date.now()}`,
      postedDate: 'Active Post'
    };
    setRecruiterJobs(prev => [created, ...prev]);
    setSelectedJobId(created.id);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        login,
        register,
        logout,
        changePassword,
        resetPassword,
        deleteAccount,
        activeTab,
        setActiveTab,
        viewMode,
        setViewMode,
        profile,
        updateProfile,
        isProfileCompleted,
        careerMatches,
        selectedCareerId,
        setSelectedCareerId,
        selectedCareer,
        currentCareerMatch,
        roadmapStepStatuses,
        updateRoadmapStep,
        addCustomProject,
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
