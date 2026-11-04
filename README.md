# AI CAREER INTELLIGENCE SYSTEM
### AI-Powered Career & Skill Gap Analyzer

> **Artificial Intelligence & Data Science College Project**  
> Inspired by the Eightfold problem statement:  
> *“Enhancing talent acquisition and management with AI-driven recruitment and workforce solutions.”*

---

## 🌟 Executive Summary & New Authentication Architecture

The **AI Career Intelligence System** has been completely updated to feature a **Fresh User Login & Registration System with Strict Multi-User Data Isolation**.

### Key Additions & Updates:
1. **Reset Legacy Test Data**: All previous hardcoded demo user data, test names, and test session caches have been purged. Every student now starts with a clean slate.
2. **First-Screen Login**: Visitors are immediately greeted by a professional AI SaaS sign-in screen.
   - **Title**: *AI CAREER INTELLIGENCE SYSTEM*
   - **Subtitle**: *Discover Your Skills. Explore Your Career. Build Your Future.*
   - Includes email/password inputs, Show/Hide password toggles, Create Account switch, and Forgot Password recovery.
3. **Registration & Validation**:
   - Collects Full Name, Email, Password, and Password Confirmation.
   - Validates email syntax, ensures passwords match (minimum 6 characters), and checks for duplicate registrations.
4. **10-Point Student Onboarding Wizard**:
   Welcomes the student with *"Welcome to Your Career Journey!"* and collects:
   1. Full Name
   2. Education Qualification
   3. College / University Name
   4. Academic Department
   5. Current Year of Study
   6. Technical Competencies
   7. Programming Languages
   8. Projects Completed
   9. Areas of Interest
   10. Preferred Career Goal Target
5. **Personalized Dashboard & Empty State**:
   - Displays a friendly empty state if the user has not yet completed their profile:
     *"Your career journey starts here. Complete your profile to discover your career opportunities."*
   - Displays real computed readiness, identified skills, and missing competencies strictly for the authenticated user once completed.
6. **Strict Multi-User Data Isolation**:
   - User A sees **only** User A's profile, custom projects, roadmap progress, and career compatibility scores.
   - User B sees **only** User B's records.
   - User accounts are stored independently by unique user IDs.
7. **Profile & Account Settings**:
   - View and update personal information, college, skills, and languages.
   - Change account password.
   - Permanently delete account and all personal data.
   - Sign Out to clear session and return to the Login screen.
8. **Optional Node.js Backend Server**:
   - Pure Node.js REST server in `server/server.js` with persistence in `server/data/users.json`. Run via `npm run server`.

---

## 🚀 Quick Start Guide

### 1. Start Development Server
```bash
npm run dev
```
Open your browser at:
```
http://localhost:5173
```

### 2. Optional: Run Backend Server
```bash
npm run server
```
Runs at `http://localhost:5000` with REST endpoints for `/api/auth/register`, `/api/auth/login`, and `/api/profile`.

### 3. Build for Production
```bash
npm run build
```

---

## 📂 Project Architecture

```
DT-project/
├── index.html                   # HTML entry point with dark navy aesthetic
├── package.json                 # Dependencies & scripts (dev, server, build)
├── server/
│   └── server.js                # Dedicated Node.js backend server with REST endpoints
├── src/
│   ├── main.tsx                 # DOM mounting
│   ├── App.tsx                  # Root component with auth-aware page router
│   ├── index.css                # Glassmorphism utilities & Tailwind styling
│   │
│   ├── types/
│   │   └── index.ts             # Strict TypeScript definitions (UserAccount, StudentProfile, CareerRole)
│   │
│   ├── services/
│   │   ├── authService.ts       # Multi-user data isolation, hashing, registration & session manager
│   │   └── careerEngine.ts      # Multi-attribute scoring, dynamic radar calculations & NLP extractor
│   │
│   ├── data/
│   │   └── mockData.ts          # Career benchmarks (Data Scientist, Analyst, ML, AI, BA, SWE) & Market telemetry
│   │
│   ├── context/
│   │   └── AppContext.tsx       # Global state provider maintaining isolated user sessions
│   │
│   └── components/
│       ├── auth/
│       │   └── AuthPages.tsx    # Login, Registration & Forgot Password screens
│       ├── onboarding/
│       │   └── OnboardingPage.tsx # 10-field first-time user profile setup wizard
│       ├── common/
│       │   ├── Header.tsx       # Auth-aware navbar with user badge and logout
│       │   ├── Sidebar.tsx      # Sidebar with dynamic career goal & settings
│       │   └── ProfileModal.tsx # Profile edit modal
│       └── pages/
│           ├── StudentDashboard.tsx     # Personalized dashboard with empty state & dynamic metrics
│           ├── CareerMatchingPage.tsx   # Compatibility rankings against 6 industry roles
│           ├── SkillGapPage.tsx         # Diagnostic gap matrix with Recharts dynamic comparison
│           ├── RoadmapPage.tsx          # Step-by-step sequential learning curriculum
│           ├── ProjectsPage.tsx         # Portfolio project recommendations
│           ├── ResumeAnalyzerPage.tsx   # Text & file skill extractor
│           ├── SettingsPage.tsx         # Account settings, password change & account deletion
│           ├── RecruiterPage.tsx        # Recruiter talent matching & job posting
│           ├── DataSciencePage.tsx      # Market analytics charts
│           ├── AIEnginePage.tsx         # Visual AI architecture flow
│           ├── LandingPage.tsx          # Public overview page
│           └── AboutPage.tsx            # Project documentation & Eightfold motivation
```
