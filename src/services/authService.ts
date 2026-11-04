import { UserAccount, StudentProfile, Project } from '../types';

/**
 * ============================================================================
 * AI CAREER INTELLIGENCE SYSTEM - USER AUTHENTICATION & DATA ISOLATION SERVICE
 * ============================================================================
 * Implements strict per-user data isolation.
 * User A logs in -> sees ONLY User A's data.
 * User B logs in -> sees ONLY User B's data.
 * Old test data is automatically wiped to guarantee a fresh, secure environment.
 * ============================================================================
 */

const STORAGE_KEY_USERS = 'ai_career_intel_users_v2';
const STORAGE_KEY_SESSION = 'ai_career_intel_session_v2';
const STORAGE_LEGACY_KEYS = [
  'ai_career_intel_users',
  'ai_career_intel_session',
  'ai_career_profile',
  'ai_career_demo_user',
  'career_intel_alex',
  'ai_career_candidate_pool'
];

// Clean legacy test data on initial load
export function purgeLegacyTestData(): void {
  try {
    STORAGE_LEGACY_KEYS.forEach(key => localStorage.removeItem(key));
  } catch (err) {
    console.warn('Storage purge notice:', err);
  }
}

// Simple deterministic hash for prototype credential integrity
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return 'h_' + Math.abs(hash).toString(36) + '_' + input.length;
}

// Helper: load all users
function loadAllUsers(): Record<string, UserAccount> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_USERS);
    if (!raw) return {};
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

// Helper: save all users
function saveAllUsers(users: Record<string, UserAccount>): void {
  try {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  } catch (err) {
    console.error('Failed to save user records:', err);
  }
}

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  loginAt: string;
}

export class AuthService {
  constructor() {
    purgeLegacyTestData();
  }

  // Check email validity
  public isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  // Get active session
  public getActiveSession(): AuthSession | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_SESSION);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // Get current logged-in user record
  public getCurrentUser(): UserAccount | null {
    const session = this.getActiveSession();
    if (!session) return null;

    const users = loadAllUsers();
    return users[session.userId] || null;
  }

  // Register a new user
  public register(
    name: string,
    email: string,
    password: string
  ): { success: boolean; message: string; user?: UserAccount } {
    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanName) {
      return { success: false, message: 'Please provide your full name.' };
    }

    if (!this.isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: 'Password must be at least 6 characters long.'
      };
    }

    const users = loadAllUsers();

    // Prevent duplicate email registration
    const existing = Object.values(users).find(u => u.email === cleanEmail);
    if (existing) {
      return {
        success: false,
        message: 'An account with this email already exists. Please log in.'
      };
    }

    const newUserId = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const newUser: UserAccount = {
      id: newUserId,
      name: cleanName,
      email: cleanEmail,
      passwordHash: simpleHash(password),
      createdAt: new Date().toISOString(),
      profile: null, // First-time user: needs onboarding
      roadmapProgress: {
        1: 'Not Started',
        2: 'Not Started',
        3: 'Not Started',
        4: 'Not Started'
      },
      customProjects: []
    };

    users[newUserId] = newUser;
    saveAllUsers(users);

    // Create session
    const session: AuthSession = {
      token: 'tok_' + Math.random().toString(36).substring(2) + Date.now(),
      userId: newUserId,
      email: cleanEmail,
      name: cleanName,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));

    return {
      success: true,
      message: 'Account created successfully! Welcome to your career journey.',
      user: newUser
    };
  }

  // Login
  public login(
    email: string,
    password: string
  ): { success: boolean; message: string; user?: UserAccount } {
    const cleanEmail = email.toLowerCase().trim();

    if (!this.isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    if (!password) {
      return { success: false, message: 'Please enter your password.' };
    }

    const users = loadAllUsers();
    const user = Object.values(users).find(u => u.email === cleanEmail);

    if (!user) {
      return {
        success: false,
        message: 'No account found with this email. Please register first.'
      };
    }

    if (user.passwordHash !== simpleHash(password)) {
      return {
        success: false,
        message: 'Incorrect password. Please try again.'
      };
    }

    // Set active session
    const session: AuthSession = {
      token: 'tok_' + Math.random().toString(36).substring(2) + Date.now(),
      userId: user.id,
      email: user.email,
      name: user.name,
      loginAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));

    return {
      success: true,
      message: `Welcome back, ${user.name}!`,
      user
    };
  }

  // Logout
  public logout(): void {
    localStorage.removeItem(STORAGE_KEY_SESSION);
  }

  // Update profile for current user
  public updateProfile(
    profile: StudentProfile
  ): { success: boolean; user?: UserAccount } {
    const session = this.getActiveSession();
    if (!session) return { success: false };

    const users = loadAllUsers();
    const user = users[session.userId];
    if (!user) return { success: false };

    user.profile = {
      ...profile,
      isCompleted: true
    };
    user.name = profile.name || user.name;
    users[session.userId] = user;
    saveAllUsers(users);

    return { success: true, user };
  }

  // Update roadmap progress for current user
  public updateRoadmapProgress(
    stepNumber: number,
    status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'
  ): { success: boolean; user?: UserAccount } {
    const session = this.getActiveSession();
    if (!session) return { success: false };

    const users = loadAllUsers();
    const user = users[session.userId];
    if (!user) return { success: false };

    user.roadmapProgress = {
      ...user.roadmapProgress,
      [stepNumber]: status
    };
    users[session.userId] = user;
    saveAllUsers(users);

    return { success: true, user };
  }

  // Add custom project for current user
  public addProject(project: Project): { success: boolean; user?: UserAccount } {
    const session = this.getActiveSession();
    if (!session) return { success: false };

    const users = loadAllUsers();
    const user = users[session.userId];
    if (!user) return { success: false };

    if (!user.profile) {
      user.profile = {
        name: user.name,
        education: '',
        collegeName: '',
        department: '',
        yearOfStudy: '',
        skills: project.technologies,
        programmingLanguages: [],
        projects: [project],
        interests: [],
        careerGoal: 'Data Scientist',
        isCompleted: false
      };
    } else {
      user.profile.projects = [...(user.profile.projects || []), project];
      user.profile.skills = Array.from(
        new Set([...user.profile.skills, ...project.technologies])
      );
    }

    users[session.userId] = user;
    saveAllUsers(users);
    return { success: true, user };
  }

  // Change password
  public changePassword(
    oldPass: string,
    newPass: string
  ): { success: boolean; message: string } {
    const session = this.getActiveSession();
    if (!session) return { success: false, message: 'Session expired. Please log in.' };

    const users = loadAllUsers();
    const user = users[session.userId];
    if (!user) return { success: false, message: 'User not found.' };

    if (user.passwordHash !== simpleHash(oldPass)) {
      return { success: false, message: 'Current password is incorrect.' };
    }

    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters long.' };
    }

    user.passwordHash = simpleHash(newPass);
    users[session.userId] = user;
    saveAllUsers(users);

    return { success: true, message: 'Password updated successfully!' };
  }

  // Reset password (Forgot password flow)
  public resetPassword(
    email: string,
    newPass: string
  ): { success: boolean; message: string } {
    const cleanEmail = email.toLowerCase().trim();
    const users = loadAllUsers();
    const user = Object.values(users).find(u => u.email === cleanEmail);

    if (!user) {
      return { success: false, message: 'No registered account found with this email.' };
    }

    if (newPass.length < 6) {
      return { success: false, message: 'New password must be at least 6 characters.' };
    }

    user.passwordHash = simpleHash(newPass);
    users[user.id] = user;
    saveAllUsers(users);

    return { success: true, message: 'Password has been reset successfully! You can now log in.' };
  }

  // Delete account and all personal data
  public deleteAccount(): { success: boolean; message: string } {
    const session = this.getActiveSession();
    if (!session) return { success: false, message: 'No active session.' };

    const users = loadAllUsers();
    delete users[session.userId];
    saveAllUsers(users);

    this.logout();
    return {
      success: true,
      message: 'Your account and all associated personal records have been permanently deleted.'
    };
  }
}

export const authService = new AuthService();
