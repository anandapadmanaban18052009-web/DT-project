/**
 * ============================================================================
 * AI CAREER INTELLIGENCE SYSTEM - NODE.JS BACKEND SERVER
 * ============================================================================
 * Provides dedicated user authentication & isolated user data storage.
 * Runs on http://localhost:5000 with CORS and JSON database file persistence.
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
const DB_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data folder and db file exist
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({}, null, 2), 'utf-8');
}

function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error('Database write error:', err);
  }
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password).digest('hex');
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

const server = http.createServer(async (req, res) => {
  // Handle CORS Preflight
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
      sendJson(res, 200, { status: 'healthy', system: 'AI Career Intelligence Backend' });
      return;
    }

    // 2. Register
    if (pathname === '/api/auth/register' && req.method === 'POST') {
      const { name, email, password } = await parseJsonBody(req);
      if (!name || !email || !password) {
        return sendJson(res, 400, { success: false, message: 'All fields are required.' });
      }

      const cleanEmail = email.toLowerCase().trim();
      const db = readDb();

      const exists = Object.values(db).find(u => u.email === cleanEmail);
      if (exists) {
        return sendJson(res, 400, { success: false, message: 'An account with this email already exists.' });
      }

      const id = 'usr_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
      const newUser = {
        id,
        name: name.trim(),
        email: cleanEmail,
        passwordHash: hashPassword(password),
        createdAt: new Date().toISOString(),
        profile: null,
        roadmapProgress: { 1: 'Not Started', 2: 'Not Started', 3: 'Not Started', 4: 'Not Started' },
        customProjects: []
      };

      db[id] = newUser;
      writeDb(db);

      const token = 'tok_' + crypto.randomBytes(16).toString('hex');
      sendJson(res, 201, {
        success: true,
        message: 'Account registered successfully.',
        user: { id, name: newUser.name, email: newUser.email, profile: null },
        token
      });
      return;
    }

    // 3. Login
    if (pathname === '/api/auth/login' && req.method === 'POST') {
      const { email, password } = await parseJsonBody(req);
      const cleanEmail = (email || '').toLowerCase().trim();
      const db = readDb();

      const user = Object.values(db).find(u => u.email === cleanEmail);
      if (!user || user.passwordHash !== hashPassword(password)) {
        return sendJson(res, 401, { success: false, message: 'Invalid email or password.' });
      }

      const token = 'tok_' + crypto.randomBytes(16).toString('hex');
      sendJson(res, 200, {
        success: true,
        message: `Welcome back, ${user.name}!`,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          roadmapProgress: user.roadmapProgress
        },
        token
      });
      return;
    }

    // 4. Update Profile
    if (pathname === '/api/profile' && req.method === 'PUT') {
      const { userId, profile } = await parseJsonBody(req);
      const db = readDb();
      if (!userId || !db[userId]) {
        return sendJson(res, 404, { success: false, message: 'User not found.' });
      }

      db[userId].profile = { ...profile, isCompleted: true };
      if (profile.name) db[userId].name = profile.name;
      writeDb(db);

      sendJson(res, 200, { success: true, user: db[userId] });
      return;
    }

    // Default 404
    sendJson(res, 404, { error: 'Endpoint not found' });
  } catch (err) {
    console.error('Server error:', err);
    sendJson(res, 500, { error: 'Internal server error' });
  }
});

server.listen(PORT, () => {
  console.log(`AI Career Intelligence Backend running at http://localhost:${PORT}`);
});
