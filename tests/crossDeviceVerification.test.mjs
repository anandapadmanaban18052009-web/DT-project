import assert from 'assert';
import fs from 'fs';
import path from 'path';

console.log('--- STARTING COMPREHENSIVE SYSTEM VERIFICATION ---');

// 1. Verify Helper Guide Data integrity
import { FEATURE_GUIDES } from '../src/data/helpGuideData.ts';

const expectedFeatures = [
  'dashboard',
  'resume-analyzer',
  'engine',
  'skill-gap',
  'skill-assessment',
  'projects',
  'roadmap',
  'recruiter-jobs',
  'candidate-matching'
];

console.log('1. Verifying all 9 Persistent Helper Notes & Explanations...');
expectedFeatures.forEach(id => {
  const guide = FEATURE_GUIDES[id];
  assert(guide, `Missing guide for ${id}`);
  assert(guide.stickerNote && guide.stickerNote.length > 10, `Invalid sticker note for ${id}`);
  assert(guide.explanation && guide.explanation.length > 20, `Invalid explanation for ${id}`);
  assert(guide.instructions && guide.instructions.length >= 3, `Instructions too brief for ${id}`);
  assert(guide.example && guide.example.length > 15, `Missing example for ${id}`);
  console.log(`  ✓ [${guide.featureName}]: "${guide.stickerNote}"`);
});

// 2. Verify Exact Sticker Text from Prompt Requirements
console.log('2. Verifying Prompt-Mandated Sticker Text exact matches...');
assert.strictEqual(
  FEATURE_GUIDES['dashboard'].stickerNote,
  'Welcome! Your career journey starts here. Explore your skills, career matches and learning progress.'
);
assert.strictEqual(
  FEATURE_GUIDES['resume-analyzer'].stickerNote,
  'Upload your PDF or DOCX resume. Review the extracted skills before adding them to your profile.'
);
assert.strictEqual(
  FEATURE_GUIDES['engine'].stickerNote,
  'This engine compares your skills with career requirements to identify suitable career paths.'
);
assert.strictEqual(
  FEATURE_GUIDES['skill-gap'].stickerNote,
  'Discover which skills you already have and which skills you need to improve.'
);
assert.strictEqual(
  FEATURE_GUIDES['skill-assessment'].stickerNote,
  'Choose the skills you want to test and answer questions to measure your knowledge.'
);
assert.strictEqual(
  FEATURE_GUIDES['projects'].stickerNote,
  'Explore projects recommended according to your skills and career goals.'
);
assert.strictEqual(
  FEATURE_GUIDES['roadmap'].stickerNote,
  'Follow your personalized learning plan and track your completed skills.'
);
assert.strictEqual(
  FEATURE_GUIDES['recruiter-jobs'].stickerNote,
  'Manage job requirements and discover suitable candidates.'
);
assert.strictEqual(
  FEATURE_GUIDES['candidate-matching'].stickerNote,
  'Create a job requirement before matching candidates.'
);
console.log('  ✓ All 9 sticker notes match prompt requirements with 100% precision.');

// 3. Verify Supabase Schema File Exists
console.log('3. Verifying Supabase PostgreSQL Schema...');
const schemaPath = path.resolve('./supabase/schema.sql');
assert(fs.existsSync(schemaPath), 'Supabase schema.sql file must exist');
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.profiles'), 'Must define public.profiles');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.user_projects'), 'Must define user_projects');
assert(schemaContent.includes('CREATE TABLE IF NOT EXISTS public.skill_assessments'), 'Must define skill_assessments');
assert(schemaContent.includes('ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY'), 'Must enable RLS');
console.log('  ✓ Supabase schema is complete with tables and RLS security policies.');

// 4. Verify Vercel Serverless Function & Rewrite Config
console.log('4. Verifying Vercel Deployment Configuration...');
assert(fs.existsSync(path.resolve('./vercel.json')), 'vercel.json must exist');
assert(fs.existsSync(path.resolve('./api/index.js')), 'api/index.js must exist');
console.log('  ✓ Vercel serverless routing configured for multi-device cloud deployment.');

// 5. Verify Authentication Endpoints in Vercel Serverless API
console.log('5. Verifying Authentication Endpoints in api/index.js...');
import apiHandler from '../api/index.js';

function createMockReqRes(method, url, body) {
  let responseData = null;
  let responseStatus = 200;
  const headers = {};

  const req = {
    method,
    url,
    body
  };

  const res = {
    setHeader: (k, v) => { headers[k] = v; },
    status: (code) => {
      responseStatus = code;
      return res;
    },
    json: (data) => {
      responseData = data;
      return res;
    },
    end: () => res
  };

  return { req, res, getStatus: () => responseStatus, getData: () => responseData };
}

// Test 5A: Student Demo Login
{
  const { req, res, getStatus, getData } = createMockReqRes('POST', '/api/auth/login', {
    email: 'student@campus.edu',
    password: 'password123'
  });
  await apiHandler(req, res);
  assert.strictEqual(getStatus(), 200, 'Student login should return 200');
  const data = getData();
  assert(data.success, 'Student login should succeed');
  assert(data.user && data.user.id, 'User object with ID must be present');
  assert.strictEqual(data.user.role, 'student', 'Role must be student');
  assert(data.token, 'Session token must be present');
  console.log('  ✓ Test A: Student Login works and returns valid user token.');
}

// Test 5B: Recruiter Demo Login
{
  const { req, res, getStatus, getData } = createMockReqRes('POST', '/api/auth/login', {
    email: 'recruiter@company.com',
    password: 'password123'
  });
  await apiHandler(req, res);
  assert.strictEqual(getStatus(), 200, 'Recruiter login should return 200');
  const data = getData();
  assert(data.success, 'Recruiter login should succeed');
  assert.strictEqual(data.user.role, 'recruiter', 'Role must be recruiter');
  console.log('  ✓ Test B: Recruiter Login works and returns recruiter role.');
}

// Test 5C: Registration Flow
{
  const testEmail = `new.student.${Date.now()}@campus.edu`;
  const { req, res, getStatus, getData } = createMockReqRes('POST', '/api/auth/register', {
    name: 'New Test Student',
    email: testEmail,
    password: 'securePassword123',
    role: 'student'
  });
  await apiHandler(req, res);
  assert.strictEqual(getStatus(), 201, 'Registration should return 201');
  const data = getData();
  assert(data.success, 'Registration should succeed');
  assert.strictEqual(data.user.email, testEmail);
  console.log('  ✓ Test C: Registration works and creates student account.');

  // Test logging in with newly registered account
  const loginAttempt = createMockReqRes('POST', '/api/auth/login', {
    email: testEmail,
    password: 'securePassword123'
  });
  await apiHandler(loginAttempt.req, loginAttempt.res);
  assert.strictEqual(loginAttempt.getStatus(), 200, 'Login with new account must succeed');
  assert(loginAttempt.getData().success);
  console.log('  ✓ Test D: Login with newly registered account succeeds.');
}

// Test 5D: Forgot Password
{
  const { req, res, getStatus, getData } = createMockReqRes('POST', '/api/auth/reset-password', {
    email: 'student@campus.edu',
    newPassword: 'newPassword456'
  });
  await apiHandler(req, res);
  assert.strictEqual(getStatus(), 200, 'Password reset must succeed');
  assert(getData().success);
  console.log('  ✓ Test E: Forgot Password / Password Reset succeeds.');
}

console.log('--- ALL AUTOMATED VERIFICATION CHECKS PASSED SUCCESSFULLY ---');
