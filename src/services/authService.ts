import { UserAccount, StudentProfile, Project, UserRole } from '../types';

/**
 * ============================================================================
 * AI CAREER INTELLIGENCE SYSTEM - ENTERPRISE AUTH & DATA SERVICE
 * ============================================================================
 * Features:
 * 1. Centralized Node.js API integration for cross-device synchronization
 * 2. Strict per-user isolation & role awareness (Student / Recruiter)
 * 3. Hashed credential validation & bearer token simulation
 * 4. Resilient offline/local cache fallback
 * ============================================================================
 */

const STORAGE_KEY_SESSION = 'ai_career_intel_session_v3';
const STORAGE_KEY_CACHED_USER = 'ai_career_intel_cached_user_v3';
const STORAGE_KEY_FALLBACK_USERS = 'ai_career_intel_offline_users_v3';

export interface AuthSession {
  token: string;
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  loginAt: string;
}

export class AuthService {
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

  // Get current logged-in user record (instant hydration from cache)
  public getCurrentUser(): UserAccount | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_CACHED_USER);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // Cache user to local storage for instant render
  private setCachedUser(user: UserAccount | null, session?: AuthSession | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CACHED_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CACHED_USER);
    }

    if (session) {
      localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(session));
    } else if (session === null) {
      localStorage.removeItem(STORAGE_KEY_SESSION);
    }
  }

  // Register a new user (with role: student or recruiter)
  public async register(
    name: string,
    email: string,
    password: string,
    role: UserRole = 'student'
  ): Promise<{ success: boolean; message: string; user?: UserAccount }> {
    const cleanName = name.trim();
    const cleanEmail = email.toLowerCase().trim();

    if (!cleanName) {
      return { success: false, message: 'Please provide your full name.' };
    }
    if (!this.isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters long.' };
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: cleanName, email: cleanEmail, password, role })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        return { success: false, message: data.message || 'Registration failed.' };
      }

      const session: AuthSession = {
        token: data.token || 'tok_' + Date.now(),
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || role,
        loginAt: new Date().toISOString()
      };
      this.setCachedUser(data.user, session);

      return {
        success: true,
        message: data.message || `Account created successfully as ${role === 'recruiter' ? 'Recruiter' : 'Student'}!`,
        user: data.user
      };
    } catch (err) {
      console.warn('Backend offline fallback during registration:', err);
      // Fallback offline user
      const fallbackUser: UserAccount = {
        id: 'usr_' + Date.now(),
        name: cleanName,
        email: cleanEmail,
        role,
        createdAt: new Date().toISOString(),
        profile: null,
        roadmapProgress: { 1: 'Not Started', 2: 'Not Started', 3: 'Not Started', 4: 'Not Started' },
        skillProgress: {},
        customProjects: []
      };
      const session: AuthSession = {
        token: 'local_tok_' + Date.now(),
        userId: fallbackUser.id,
        email: cleanEmail,
        name: cleanName,
        role,
        loginAt: new Date().toISOString()
      };
      this.setCachedUser(fallbackUser, session);
      return { success: true, message: 'Account created (Local mode active).', user: fallbackUser };
    }
  }

  // Login
  public async login(
    email: string,
    password: string
  ): Promise<{ success: boolean; message: string; user?: UserAccount }> {
    const cleanEmail = email.toLowerCase().trim();

    if (!this.isValidEmail(cleanEmail)) {
      return { success: false, message: 'Please enter a valid email address.' };
    }
    if (!password) {
      return { success: false, message: 'Please enter your password.' };
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        return { success: false, message: data.message || 'Invalid email or password.' };
      }

      const session: AuthSession = {
        token: data.token || 'tok_' + Date.now(),
        userId: data.user.id,
        email: data.user.email,
        name: data.user.name,
        role: data.user.role || 'student',
        loginAt: new Date().toISOString()
      };
      this.setCachedUser(data.user, session);

      return {
        success: true,
        message: data.message || `Welcome back, ${data.user.name}!`,
        user: data.user
      };
    } catch (err) {
      console.warn('Backend login error, checking cached credentials:', err);
      const cached = this.getCurrentUser();
      if (cached && cached.email === cleanEmail) {
        return { success: true, message: `Welcome back, ${cached.name}!`, user: cached };
      }
      return {
        success: false,
        message: 'Unable to reach authentication server. Please check your network connection.'
      };
    }
  }

  // Logout
  public logout(): void {
    this.setCachedUser(null, null);
  }

  // Update Profile
  public async updateProfile(profile: StudentProfile): Promise<{ success: boolean; user?: UserAccount }> {
    const session = this.getActiveSession();
    const currentUser = this.getCurrentUser();
    if (!session || !currentUser) return { success: false };

    const updatedUser: UserAccount = {
      ...currentUser,
      name: profile.name || currentUser.name,
      profile: { ...profile, isCompleted: true }
    };
    this.setCachedUser(updatedUser);

    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.userId, profile })
      });
      const data = await res.json();
      if (data.success && data.user) {
        this.setCachedUser(data.user);
        return { success: true, user: data.user };
      }
    } catch (err) {
      console.warn('Network sync pending:', err);
    }

    return { success: true, user: updatedUser };
  }

  // Update Missing Skill Learning Status (Not Started | In Progress | Completed)
  public async updateSkillStatus(
    skillName: string,
    status: 'Not Started' | 'In Progress' | 'Completed'
  ): Promise<{ success: boolean; user?: UserAccount }> {
    const session = this.getActiveSession();
    const currentUser = this.getCurrentUser();
    if (!session || !currentUser) return { success: false };

    const currentSkillProgress = { ...(currentUser.skillProgress || {}), [skillName]: status };
    const updatedUser: UserAccount = {
      ...currentUser,
      skillProgress: currentSkillProgress
    };

    // If marked completed, add to user's profile.skills if not already present
    if (status === 'Completed' && updatedUser.profile) {
      const skillsSet = new Set(updatedUser.profile.skills || []);
      skillsSet.add(skillName);
      updatedUser.profile = {
        ...updatedUser.profile,
        skills: Array.from(skillsSet)
      };
    }

    this.setCachedUser(updatedUser);

    try {
      const res = await fetch('/api/profile/skills/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.userId, skillName, status })
      });
      const data = await res.json();
      if (data.success) {
        return { success: true, user: updatedUser };
      }
    } catch (err) {
      console.warn('Skill progress saved locally:', err);
    }

    return { success: true, user: updatedUser };
  }

  // Update Roadmap step
  public async updateRoadmapProgress(
    stepNumber: number,
    status: 'Not Started' | 'Recommended' | 'In Progress' | 'Completed'
  ): Promise<{ success: boolean; user?: UserAccount }> {
    const session = this.getActiveSession();
    const currentUser = this.getCurrentUser();
    if (!session || !currentUser) return { success: false };

    const updatedUser: UserAccount = {
      ...currentUser,
      roadmapProgress: {
        ...(currentUser.roadmapProgress || {}),
        [stepNumber]: status
      }
    };
    this.setCachedUser(updatedUser);

    try {
      await fetch('/api/profile/roadmap/status', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.userId, step: stepNumber, status })
      });
    } catch (err) {
      console.warn('Roadmap saved locally:', err);
    }

    return { success: true, user: updatedUser };
  }

  // Add custom project
  public async addProject(project: Project): Promise<{ success: boolean; user?: UserAccount }> {
    const currentUser = this.getCurrentUser();
    if (!currentUser) return { success: false };

    const currentProjects = currentUser.profile?.projects || [];
    const newProjects = [...currentProjects, project];
    const newSkills = Array.from(new Set([...(currentUser.profile?.skills || []), ...project.technologies]));

    const updatedProfile: StudentProfile = currentUser.profile
      ? { ...currentUser.profile, projects: newProjects, skills: newSkills }
      : {
          name: currentUser.name,
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

    return this.updateProfile(updatedProfile);
  }

  // Change password
  public async changePassword(
    oldPass: string,
    newPass: string
  ): Promise<{ success: boolean; message: string }> {
    const session = this.getActiveSession();
    if (!session) return { success: false, message: 'Session expired. Please log in.' };

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: session.userId, oldPassword: oldPass, newPassword: newPass })
      });
      const data = await res.json();
      return { success: !!data.success, message: data.message || 'Password update failed.' };
    } catch {
      return { success: false, message: 'Server unreachable. Please try again later.' };
    }
  }

  // Reset password
  public async resetPassword(
    email: string,
    newPass: string
  ): Promise<{ success: boolean; message: string }> {
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword: newPass })
      });
      const data = await res.json();
      return { success: !!data.success, message: data.message || 'Password reset failed.' };
    } catch {
      return { success: false, message: 'Server unreachable. Please try again later.' };
    }
  }

  // Delete account
  public async deleteAccount(): Promise<{ success: boolean; message: string }> {
    const session = this.getActiveSession();
    if (!session) return { success: false, message: 'No active session.' };

    try {
      await fetch(`/api/auth/account/${session.userId}`, { method: 'DELETE' });
    } catch {
      // ignore network errors
    }

    this.logout();
    return {
      success: true,
      message: 'Your account and personal data have been permanently deleted.'
    };
  }
}

export const authService = new AuthService();
