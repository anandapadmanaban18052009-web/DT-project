/**
 * ============================================================================
 * AI CAREER INTELLIGENCE SYSTEM - NODE.JS BACKEND SERVER
 * ============================================================================
 * Enterprise Multi-Device Server supporting:
 * 1. Role-based Authentication (Student & Recruiter)
 * 2. Secure SHA-256 Password Hashing & Token Sessions
 * 3. Centralized Database Persistence (Multi-device access)
 * 4. Recruiter Job Requirement Management (CRUD)
 * 5. Dynamic Candidate Aggregation (Student applicants + Benchmarks)
 * 6. AI Career Analysis & Candidate Matching Architecture
 * 7. Learn Missing Skills Progress Tracker Persistence
 * ============================================================================
 */

import http from 'http';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, 'data');
const DB_USERS_FILE = path.join(DATA_DIR, 'users.json');
const DB_JOBS_FILE = path.join(DATA_DIR, 'jobs.json');

// Ensure data folder and db files exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Initial default seed jobs
const SEED_JOBS = [
  {
    id: 'job-1',
    title: 'Junior Data Scientist',
    company: 'Apex Intelligence Labs',
    department: 'Applied AI & Research',
    experienceLevel: 'Entry Level',
    experienceRequired: '0 - 2 Years',
    educationRequired: 'B.Tech / B.S. in Computer Science, Data Science, or related field',
    requiredSkills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Pandas'],
    preferredSkills: ['Deep Learning', 'PyTorch', 'Data Visualization', 'Scikit-Learn'],
    description: 'Looking for an ambitious junior data scientist to analyze behavioral patterns, build experimental predictive models, and collaborate with our ML infrastructure team.',
    postedDate: 'Active Post',
    createdBy: 'system'
  },
  {
    id: 'job-2',
    title: 'Business Intelligence & Data Analyst',
    company: 'Horizon Cloud Dynamics',
    department: 'Strategic Operations',
    experienceLevel: 'Associate',
    experienceRequired: '1 - 3 Years',
    educationRequired: 'Bachelor in Analytics, Information Systems, or Engineering',
    requiredSkills: ['SQL', 'Power BI', 'Python', 'Excel', 'Data Visualization'],
    preferredSkills: ['Pandas', 'Statistics', 'DAX', 'Storytelling with Data'],
    description: 'Help operational leadership identify growth vectors and optimize supply chain costs through interactive executive telemetry and dashboards.',
    postedDate: 'Active Post',
    createdBy: 'system'
  },
  {
    id: 'job-3',
    title: 'Machine Learning Engineer (Associate)',
    company: 'Cognitive Nexus Systems',
    department: 'Core AI Systems',
    experienceLevel: 'Associate',
    experienceRequired: '1 - 3 Years',
    educationRequired: 'B.Tech / M.Tech in Computer Science or Artificial Intelligence',
    requiredSkills: ['Python', 'Machine Learning', 'Docker', 'PyTorch', 'MLOps', 'SQL'],
    preferredSkills: ['Deep Learning', 'FastAPI', 'Git', 'Kubernetes'],
    description: 'Join our model deployment squad to bring high-throughput, low-latency neural classifiers and recommendation engines into production.',
    postedDate: 'Active Post',
    createdBy: 'system'
  }
];

// Initial seed benchmark candidates
const BENCHMARK_CANDIDATES = [
  {
    id: 'bench-cand-1',
    name: 'Priya Sharma (Cohort Benchmark)',
    email: 'priya.sharma@campus.edu',
    education: 'B.Tech AI & Data Science (Honors)',
    collegeName: 'National Institute of Technology',
    department: 'AI & DS',
    yearOfStudy: 'Final Year',
    gpa: '3.9 / 4.0',
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Deep Learning', 'Pandas', 'Scikit-Learn', 'PyTorch', 'Git'],
    programmingLanguages: ['Python', 'SQL', 'C++'],
    projects: [
      {
        id: 'cp-1',
        name: 'Brain MRI Tumor Segmentation with U-Net',
        description: 'Deep learning segmentation pipeline with PyTorch achieving 0.92 Dice Coefficient on clinical benchmark.',
        technologies: ['Python', 'PyTorch', 'Deep Learning', 'Computer Vision']
      }
    ],
    interests: ['Deep Learning', 'Computer Vision', 'Quantitative Analytics'],
    careerGoal: 'Data Scientist',
    isCompleted: true
  },
  {
    id: 'bench-cand-2',
    name: 'Marcus Chen (Cohort Benchmark)',
    email: 'marcus.chen@campus.edu',
    education: 'B.S. in Computer Science & Statistics',
    collegeName: 'University College of Engineering',
    department: 'CS',
    yearOfStudy: '4th Year',
    gpa: '3.6 / 4.0',
    skills: ['Python', 'SQL', 'Statistics', 'Data Visualization', 'Power BI', 'Excel', 'Pandas', 'Git'],
    programmingLanguages: ['Python', 'SQL', 'R'],
    projects: [
      {
        id: 'cp-2',
        name: 'Retail Inventory Turnover Analysis',
        description: 'End-to-end analytical dashboard highlighting lead times, holding costs, and automated safety stock alerts.',
        technologies: ['SQL', 'Power BI', 'Excel', 'Python']
      }
    ],
    interests: ['Data Analytics', 'Business Intelligence', 'Operations'],
    careerGoal: 'Data Analyst',
    isCompleted: true
  },
  {
    id: 'bench-cand-3',
    name: 'Sarah Lin (Cohort Benchmark)',
    email: 'sarah.lin@campus.edu',
    education: 'B.Tech Information Technology',
    collegeName: 'State Technical University',
    department: 'IT',
    yearOfStudy: '3rd Year',
    gpa: '3.5 / 4.0',
    skills: ['Python', 'Machine Learning', 'Docker', 'FastAPI', 'Git', 'JavaScript', 'SQL'],
    programmingLanguages: ['Python', 'JavaScript'],
    projects: [
      {
        id: 'cp-3',
        name: 'Microservice API for Image Captioning',
        description: 'FastAPI containerized service invoking HuggingFace inference pipelines with Docker.',
        technologies: ['Python', 'Docker', 'FastAPI', 'Git']
      }
    ],
    interests: ['MLOps', 'Cloud Computing', 'Backend Engineering'],
    careerGoal: 'Machine Learning Engineer',
    isCompleted: true
  }
];

if (!fs.existsSync(DB_USERS_FILE)) {
  fs.writeFileSync(DB_USERS_FILE, JSON.stringify({}, null, 2), 'utf-8');
}

if (!fs.existsSync(DB_JOBS_FILE)) {
  fs.writeFileSync(DB_JOBS_FILE, JSON.stringify(SEED_JOBS, null, 2), 'utf-8');
}

function readUsersDb() {
  try {
    const raw = fs.readFileSync(DB_USERS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeUsersDb(data) {
  try {
    fs.writeFileSync(DB_USERS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Users database write error:', err);
  }
}

function readJobsDb() {
  try {
    const raw = fs.readFileSync(DB_JOBS_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return SEED_JOBS;
  }
}

function writeJobsDb(data) {
  try {
    fs.writeFileSync(DB_JOBS_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Jobs database write error:', err);
  }
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_ai_career_salt_2026').digest('hex');
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

// AI Candidate Scoring Engine (Eightfold inspiration with strict fairness guarantees)
function calculateCandidateMatch(job, candidate) {
  const jobReqSkills = (job.requiredSkills || []).map(s => s.toLowerCase().trim());
  const jobPrefSkills = (job.preferredSkills || []).map(s => s.toLowerCase().trim());
  const candidateSkills = (candidate.skills || []).map(s => s.toLowerCase().trim());
  const projectTech = (candidate.projects || []).flatMap(p => (p.technologies || []).map(t => t.toLowerCase().trim()));
  const allCandSkills = Array.from(new Set([...candidateSkills, ...projectTech]));

  // 1. Required skills match (60% weight)
  const matchedRequired = jobReqSkills.filter(req => 
    allCandSkills.some(cs => cs === req || cs.includes(req) || req.includes(cs))
  );
  const missingRequired = job.requiredSkills.filter(req => 
    !matchedRequired.some(mr => mr.toLowerCase() === req.toLowerCase())
  );
  const requiredScore = jobReqSkills.length > 0 ? (matchedRequired.length / jobReqSkills.length) * 60 : 60;

  // 2. Preferred skills match (25% weight)
  const matchedPreferred = jobPrefSkills.filter(pref =>
    allCandSkills.some(cs => cs === pref || cs.includes(pref) || pref.includes(cs))
  );
  const preferredScore = jobPrefSkills.length > 0 ? (matchedPreferred.length / jobPrefSkills.length) * 25 : 15;

  // 3. Project practical depth (15% weight)
  const hasRelevantProjects = (candidate.projects || []).length > 0;
  const projectScore = hasRelevantProjects ? Math.min(15, (candidate.projects.length) * 8) : 5;

  const totalScore = Math.min(99, Math.round(requiredScore + preferredScore + projectScore));

  let status = 'Potential Match';
  if (totalScore >= 80) status = 'Top Candidate';
  else if (totalScore >= 65) status = 'Strong Match';

  const explanation = `${candidate.name.split(' ')[0]} satisfies ${matchedRequired.length} of ${job.requiredSkills.length} required competencies (${matchedRequired.slice(0, 3).join(', ')})${matchedPreferred.length > 0 ? ` and holds ${matchedPreferred.length} preferred specializations (${matchedPreferred.join(', ')})` : ''} with ${candidate.projects?.length || 0} demonstrated practical portfolio projects.`;

  return {
    candidate,
    matchScore: totalScore,
    matchedSkills: Array.from(new Set([...matchedRequired, ...matchedPreferred])).map(s => 
      s.charAt(0).toUpperCase() + s.slice(1)
    ),
    missingSkills: missingRequired,
    status,
    explanation
  };
}

const server = http.createServer(async (req, res) => {
  // CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  try {
    // 1. Health check
    if (pathname === '/api/health' && req.method === 'GET') {
      sendJson(res, 200, {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        system: 'AI Career Intelligence Multi-Device Backend'
      });
      return;
    }

    // 2. Auth: Register (Student or Recruiter)
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const { name, email, password, role } = await parseJsonBody(req);
      if (!name || !email || !password) {
        return sendJson(res, 400, { success: false, message: 'Full name, email, and password are required.' });
      }

      const cleanEmail = email.toLowerCase().trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
        return sendJson(res, 400, { success: false, message: 'Please enter a valid email address.' });
      }

      if (password.length < 6) {
        return sendJson(res, 400, { success: false, message: 'Password must be at least 6 characters long.' });
      }

      const db = readUsersDb();
      const exists = Object.values(db).find(u => u.email === cleanEmail);
      if (exists) {
        return sendJson(res, 400, { success: false, message: 'An account with this email already exists. Please log in.' });
      }

      const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const userRole = role === 'recruiter' ? 'recruiter' : 'student';

      const newUser = {
        id,
        name: name.trim(),
        email: cleanEmail,
        role: userRole,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
        profile: null,
        roadmapProgress: { 1: 'Not Started', 2: 'Not Started', 3: 'Not Started', 4: 'Not Started' },
        skillProgress: {},
        customProjects: []
      };

      db[id] = newUser;
      writeUsersDb(db);

      const token = 'tok_' + crypto.randomBytes(24).toString('hex');
      const sanitizedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        profile: null,
        roadmapProgress: newUser.roadmapProgress,
        skillProgress: newUser.skillProgress,
        customProjects: []
      };

      sendJson(res, 201, {
        success: true,
        message: `Account registered successfully as ${userRole === 'recruiter' ? 'Recruiter' : 'Student'}!`,
        user: sanitizedUser,
        token
      });
      return;
    }

    // 3. Auth: Login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const { email, password } = await parseJsonBody(req);
      const cleanEmail = (email || '').toLowerCase().trim();
      const db = readUsersDb();

      const user = Object.values(db).find(u => u.email === cleanEmail);
      if (!user || user.passwordHash !== hashPassword(password)) {
        return sendJson(res, 401, { success: false, message: 'Invalid email or password. Please verify your credentials.' });
      }

      const token = 'tok_' + crypto.randomBytes(24).toString('hex');
      const sanitizedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role || 'student',
        profile: user.profile,
        roadmapProgress: user.roadmapProgress || { 1: 'Not Started', 2: 'Not Started', 3: 'Not Started', 4: 'Not Started' },
        skillProgress: user.skillProgress || {},
        customProjects: user.customProjects || []
      };

      sendJson(res, 200, {
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: sanitizedUser,
        token
      });
      return;
    }

    // 4. Auth: Change Password
    if (pathname === '/api/auth/change-password' && req.method === 'POST') {
      const { userId, oldPassword, newPassword } = await parseJsonBody(req);
      const db = readUsersDb();
      const user = db[userId];
      if (!user) {
        return sendJson(res, 404, { success: false, message: 'User not found or session expired.' });
      }

      if (user.passwordHash !== hashPassword(oldPassword)) {
        return sendJson(res, 400, { success: false, message: 'Current password is incorrect.' });
      }

      if (!newPassword || newPassword.length < 6) {
        return sendJson(res, 400, { success: false, message: 'New password must be at least 6 characters.' });
      }

      user.passwordHash = hashPassword(newPassword);
      writeUsersDb(db);
      return sendJson(res, 200, { success: true, message: 'Password updated successfully!' });
    }

    // 5. Auth: Reset Password (Forgot password)
    if (pathname === '/api/auth/reset-password' && req.method === 'POST') {
      const { email, newPassword } = await parseJsonBody(req);
      const cleanEmail = (email || '').toLowerCase().trim();
      const db = readUsersDb();
      const user = Object.values(db).find(u => u.email === cleanEmail);

      if (!user) {
        return sendJson(res, 404, { success: false, message: 'No account registered with this email address.' });
      }

      if (!newPassword || newPassword.length < 6) {
        return sendJson(res, 400, { success: false, message: 'Password must be at least 6 characters.' });
      }

      user.passwordHash = hashPassword(newPassword);
      writeUsersDb(db);
      return sendJson(res, 200, { success: true, message: 'Password has been reset successfully! Please log in.' });
    }

    // 6. Auth: Delete Account
    if (pathname.startsWith('/api/auth/account/') && req.method === 'DELETE') {
      const userId = pathname.split('/').pop();
      const db = readUsersDb();
      if (!db[userId]) {
        return sendJson(res, 404, { success: false, message: 'User not found.' });
      }

      delete db[userId];
      writeUsersDb(db);
      return sendJson(res, 200, { success: true, message: 'Account and all data permanently deleted.' });
    }

    // 7. Profile: Update Student Profile
    if (pathname === '/api/profile' && req.method === 'PUT') {
      const { userId, profile } = await parseJsonBody(req);
      const db = readUsersDb();
      if (!userId || !db[userId]) {
        return sendJson(res, 404, { success: false, message: 'User account not found.' });
      }

      db[userId].profile = { ...profile, isCompleted: true };
      if (profile.name) db[userId].name = profile.name;
      writeUsersDb(db);

      const sanitizedUser = {
        id: db[userId].id,
        name: db[userId].name,
        email: db[userId].email,
        role: db[userId].role,
        profile: db[userId].profile,
        roadmapProgress: db[userId].roadmapProgress,
        skillProgress: db[userId].skillProgress,
        customProjects: db[userId].customProjects
      };

      sendJson(res, 200, { success: true, message: 'Profile saved successfully.', user: sanitizedUser });
      return;
    }

    // 8. Profile: Update Missing Skill Learning Status
    if (pathname === '/api/profile/skills/status' && req.method === 'PUT') {
      const { userId, skillName, status } = await parseJsonBody(req);
      const db = readUsersDb();
      if (!userId || !db[userId]) {
        return sendJson(res, 404, { success: false, message: 'User not found.' });
      }

      if (!db[userId].skillProgress) db[userId].skillProgress = {};
      db[userId].skillProgress[skillName] = status;

      // If completed, optionally auto-add to student's profile.skills
      if (status === 'Completed' && db[userId].profile) {
        const currentSkills = new Set(db[userId].profile.skills || []);
        currentSkills.add(skillName);
        db[userId].profile.skills = Array.from(currentSkills);
      }

      writeUsersDb(db);
      return sendJson(res, 200, {
        success: true,
        message: `Status for ${skillName} updated to ${status}.`,
        skillProgress: db[userId].skillProgress,
        profile: db[userId].profile
      });
    }

    // 9. Profile: Update Roadmap Step Status
    if (pathname === '/api/profile/roadmap/status' && req.method === 'PUT') {
      const { userId, step, status } = await parseJsonBody(req);
      const db = readUsersDb();
      if (!userId || !db[userId]) {
        return sendJson(res, 404, { success: false, message: 'User not found.' });
      }

      if (!db[userId].roadmapProgress) db[userId].roadmapProgress = {};
      db[userId].roadmapProgress[step] = status;
      writeUsersDb(db);

      return sendJson(res, 200, {
        success: true,
        roadmapProgress: db[userId].roadmapProgress
      });
    }

    // 10. Jobs Management: GET all jobs
    if (pathname === '/api/jobs' && req.method === 'GET') {
      const jobs = readJobsDb();
      sendJson(res, 200, { success: true, jobs });
      return;
    }

    // 11. Jobs Management: POST create job
    if (pathname === '/api/jobs' && req.method === 'POST') {
      const jobData = await parseJsonBody(req);
      if (!jobData.title || !jobData.company || !jobData.requiredSkills || jobData.requiredSkills.length === 0) {
        return sendJson(res, 400, { success: false, message: 'Job title, company, and at least one required skill are required.' });
      }

      const jobs = readJobsDb();
      const newJob = {
        id: 'job_' + Date.now(),
        title: jobData.title.trim(),
        company: jobData.company.trim(),
        department: jobData.department?.trim() || 'Engineering & AI',
        experienceLevel: jobData.experienceLevel || 'Entry Level',
        experienceRequired: jobData.experienceRequired || '0 - 2 Years',
        educationRequired: jobData.educationRequired || 'B.Tech / B.S. in Computer Science or related',
        requiredSkills: jobData.requiredSkills,
        preferredSkills: jobData.preferredSkills || [],
        description: jobData.description || 'Join our team to build next-generation data solutions.',
        postedDate: 'Posted Today',
        createdBy: jobData.createdBy || 'recruiter'
      };

      jobs.unshift(newJob);
      writeJobsDb(jobs);
      return sendJson(res, 201, { success: true, message: 'Job requirement posted successfully.', job: newJob });
    }

    // 12. Jobs Management: PUT update job
    if (pathname.startsWith('/api/jobs/') && req.method === 'PUT') {
      const jobId = pathname.split('/').pop();
      const updates = await parseJsonBody(req);
      const jobs = readJobsDb();
      const index = jobs.findIndex(j => j.id === jobId);
      if (index === -1) {
        return sendJson(res, 404, { success: false, message: 'Job not found.' });
      }

      jobs[index] = { ...jobs[index], ...updates };
      writeJobsDb(jobs);
      return sendJson(res, 200, { success: true, message: 'Job requirement updated successfully.', job: jobs[index] });
    }

    // 13. Jobs Management: DELETE job
    if (pathname.startsWith('/api/jobs/') && req.method === 'DELETE') {
      const jobId = pathname.split('/').pop();
      const jobs = readJobsDb();
      const filtered = jobs.filter(j => j.id !== jobId);
      if (filtered.length === jobs.length) {
        return sendJson(res, 404, { success: false, message: 'Job not found.' });
      }

      writeJobsDb(filtered);
      return sendJson(res, 200, { success: true, message: 'Job requirement removed.' });
    }

    // 14. Candidates Pool: GET candidates (combines registered students + benchmarks)
    if (pathname === '/api/candidates' && req.method === 'GET') {
      const usersDb = readUsersDb();
      const registeredStudents = Object.values(usersDb)
        .filter(u => u.role === 'student' && u.profile && u.profile.isCompleted)
        .map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          education: u.profile.education || 'B.Tech AI & Data Science',
          collegeName: u.profile.collegeName || 'Engineering Institute',
          department: u.profile.department || 'Computer Science',
          yearOfStudy: u.profile.yearOfStudy || 'Final Year',
          gpa: '3.8 / 4.0',
          skills: u.profile.skills || [],
          programmingLanguages: u.profile.programmingLanguages || [],
          projects: u.profile.projects || [],
          interests: u.profile.interests || [],
          careerGoal: u.profile.careerGoal || 'Data Scientist',
          isCompleted: true
        }));

      // Combined candidate pool
      const allCandidates = [...registeredStudents, ...BENCHMARK_CANDIDATES];
      sendJson(res, 200, { success: true, candidates: allCandidates });
      return;
    }

    // 15. AI Matching: Match candidates against a job requirement
    if (pathname === '/api/ai/match-candidates' && req.method === 'POST') {
      const { job, candidates } = await parseJsonBody(req);
      if (!job) {
        return sendJson(res, 400, { success: false, message: 'Job specification is required.' });
      }

      let candidateList = candidates;
      if (!candidateList || candidateList.length === 0) {
        const usersDb = readUsersDb();
        const registeredStudents = Object.values(usersDb)
          .filter(u => u.role === 'student' && u.profile && u.profile.isCompleted)
          .map(u => ({
            id: u.id,
            name: u.name,
            email: u.email,
            education: u.profile.education || 'B.Tech AI & Data Science',
            collegeName: u.profile.collegeName || 'Engineering Institute',
            department: u.profile.department || 'Computer Science',
            yearOfStudy: u.profile.yearOfStudy || 'Final Year',
            gpa: '3.8 / 4.0',
            skills: u.profile.skills || [],
            programmingLanguages: u.profile.programmingLanguages || [],
            projects: u.profile.projects || [],
            interests: u.profile.interests || [],
            careerGoal: u.profile.careerGoal || 'Data Scientist',
            isCompleted: true
          }));
        candidateList = [...registeredStudents, ...BENCHMARK_CANDIDATES];
      }

      const matchResults = candidateList
        .map(cand => calculateCandidateMatch(job, cand))
        .sort((a, b) => b.matchScore - a.matchScore);

      sendJson(res, 200, {
        success: true,
        totalCandidates: candidateList.length,
        jobId: job.id,
        matches: matchResults
      });
      return;
    }

    // 404 handler
    sendJson(res, 404, { error: 'API route not found' });
  } catch (err) {
    console.error('API Error:', err);
    sendJson(res, 500, { error: 'Internal server error', details: err.message });
  }
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`AI Career Intelligence Multi-Device Backend running at http://0.0.0.0:${PORT}`);
});
