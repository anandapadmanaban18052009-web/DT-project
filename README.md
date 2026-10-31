# AI CAREER INTELLIGENCE SYSTEM
### AI-Powered Career & Skill Gap Analyzer

> **Artificial Intelligence & Data Science College Project**  
> Inspired by the Eightfold problem statement:  
> *“Enhancing talent acquisition and management with AI-driven recruitment and workforce solutions.”*

---

## 🌟 Executive Summary

The **AI Career Intelligence System** addresses the critical disconnect between university education and industry hiring demands. Rather than operating as a conventional keyword search or static job board, the system models career development through an integrated AI & Data Science framework:
1. **Dynamic Student Profiling:** Ingests academic department, verified skills, and portfolio projects.
2. **Multi-Attribute Career Matching:** Calculates compatibility scores across 6 core industry pathways.
3. **Diagnostic Skill Gap Detection:** Prioritizes missing competencies into High, Medium, and Bonus tiers.
4. **Actionable Learning Roadmap:** Serves structured sequential learning steps with status management.
5. **Resume & NLP Text Extractor:** Tokenizes unstructured text to extract relevant technical keywords.
6. **Recruiter Talent Solutions:** Enables enterprise recruiters to post job requirements and audit ranked candidate pools with transparent match scoring.

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have **Node.js (v18 or higher)** installed on your machine.

### 2. Installation
Open your terminal in VS Code inside the project directory:

```bash
# If using PowerShell on Windows:
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to:
```
http://localhost:5173
```

### 4. Build for Production
```bash
npm run build
npm run preview
```

---

## 📂 Project Architecture & Folder Structure

```
DT-project/
├── index.html                   # HTML entry point with dark theme & Inter typography
├── package.json                 # Dependencies (React, Lucide, Recharts, Tailwind)
├── tailwind.config.js           # Custom dark navy AI theme & neon accent palette
├── tsconfig.json                # TypeScript strict configuration
├── vite.config.ts               # Vite bundler configuration
├── src/
│   ├── main.tsx                 # React DOM mount point
│   ├── App.tsx                  # Root component & page router
│   ├── index.css                # Tailwind base styles & glassmorphism utilities
│   │
│   ├── types/
│   │   └── index.ts             # Strict TypeScript definitions for Profiles, Roles, Gaps & Jobs
│   │
│   ├── data/
│   │   └── mockData.ts          # Master benchmark database of Careers, Demo Student, Recruiter Jobs & Market Metrics
│   │
│   ├── services/
│   │   └── careerEngine.ts      # Prototype Intelligence Engine: Scoring, Fuzzy Normalization, NLP Extractor
│   │
│   ├── context/
│   │   └── AppContext.tsx       # Centralized state provider (Active Profile, Match Engine, Roadmap Progress)
│   │
│   └── components/
│       ├── common/
│       │   ├── Header.tsx       # System navbar, Mode switcher (Student/Recruiter), Demo reset button
│       │   ├── Sidebar.tsx      # Dark AI SaaS navigation drawer
│       │   └── ProfileModal.tsx # Interactive Profile Creation & Editing Form
│       │
│       └── pages/
│           ├── LandingPage.tsx          # Hero page, Eightfold mission, and pipeline flow graphic
│           ├── StudentDashboard.tsx     # 4 KPI cards, readiness gauge, top match bars, radar preview
│           ├── CareerMatchingPage.tsx   # Detailed career cards, progress bars, have vs need breakdown
│           ├── SkillGapPage.tsx         # Acquired strengths, missing competencies, Recharts Bar & Radar
│           ├── AIEnginePage.tsx         # Central AI Engine graphic with 5 interactive satellite nodes
│           ├── ResumeAnalyzerPage.tsx   # Unstructured text & resume file keyword extractor
│           ├── RoadmapPage.tsx          # Step-by-step sequential learning curriculum with progress tracking
│           ├── ProjectsPage.tsx         # Curated portfolio projects to bridge missing skills
│           ├── RecruiterPage.tsx        # Job requirement creator & ranked candidate talent matching
│           ├── DataSciencePage.tsx      # 4 Recharts industry analytics charts (Prevalence, Demand, Gaps)
│           └── AboutPage.tsx            # Academic documentation, problem statement & ML roadmap
```

---

## 🧠 Core Intelligence Logic

### 1. Where the Career & Skill Data is Stored
All career benchmarks, required competencies, recommended projects, and learning curricula are maintained in:
👉 [`src/data/mockData.ts`](file:///c:/Users/anand/OneDrive/Desktop/DT-project/src/data/mockData.ts)

Key data structures include:
- `CAREER_ROLES`: Benchmark profiles for Data Scientist, Data Analyst, Machine Learning Engineer, AI Engineer, Business Analyst, and Full-Stack Developer.
- `DEMO_STUDENT`: Pre-loaded profile for Alex Rivera (3rd Year, AI & DS department).
- `RECRUITER_JOBS`: Enterprise job specifications for talent acquisition simulations.
- `CANDIDATE_POOL`: Multi-candidate cohort for recruiter ranking.

### 2. Where the Matching Algorithm is Implemented
The prototype intelligence engine is completely isolated in:
👉 [`src/services/careerEngine.ts`](file:///c:/Users/anand/OneDrive/Desktop/DT-project/src/services/careerEngine.ts)

The prototype implements a **transparent weighted multi-attribute compatibility formula**:
$$\text{Match Score} = \left(\frac{M_{\text{req}}}{N_{\text{req}}} \times 70\right) + \left(\frac{M_{\text{imp}}}{N_{\text{imp}}} \times 20\right) + \text{ProjectBonus} \times 10$$

Where:
- $M_{\text{req}}$ = Number of matched core required skills.
- $N_{\text{req}}$ = Total core requirements for the role.
- $M_{\text{imp}}$ = Matched secondary / specialization skills.
- $\text{ProjectBonus}$ = Alignment of past portfolio projects with the target tech stack.

---

## 🔬 How to Replace the Demo Scoring with a Real ML Model

The architecture has been designed so that the client-side heuristic engine can be replaced with a live machine learning inference pipeline without altering any UI components:

```
┌─────────────────────┐       HTTP REST       ┌────────────────────────┐
│  React App (UI)     │  ──────────────────>  │  FastAPI / Flask ML    │
│  AppContext.tsx     │  <──────────────────  │  Inference Service     │
└─────────────────────┘   JSON Embeddings/    └────────────────────────┘
                          Cosine Similarity                │
                                                           ▼
                                              ┌────────────────────────┐
                                              │ Sentence-Transformers  │
                                              │ (BERT / all-MiniLM-L6) │
                                              └────────────────────────┘
```

### Step-by-Step Transition:
1. **Train / Embed with Python:**
   ```python
   from sentence_transformers import SentenceTransformer
   from sklearn.metrics.pairwise import cosine_similarity

   model = SentenceTransformer('all-MiniLM-L6-v2')
   
   student_text = "Python, SQL, Pandas, Machine Learning, Student Performance Prediction"
   role_text = "Data Scientist requiring Python, SQL, Statistics, Deep Learning, ML"

   emb_student = model.encode([student_text])
   emb_role = model.encode([role_text])
   similarity = float(cosine_similarity(emb_student, emb_role)[0][0])
   # similarity score scaled 0 - 100
   ```

2. **Deploy as REST API (FastAPI):**
   ```python
   from fastapi import FastAPI
   app = FastAPI()

   @app.post("/predict-career-fit")
   def predict_fit(profile: dict):
       # Compute vector similarity or invoke XGBoost / Neural ranker
       return {"matchPercentage": 82, "missingSkills": ["Deep Learning", "Statistics"]}
   ```

3. **Update `src/services/careerEngine.ts`:**
   Simply change `calculateCareerMatch` into an asynchronous call that queries `fetch('/api/predict-career-fit')`.

---

## 🛡️ Responsible AI & Ethical Design
- The system adheres to ethical AI principles by framing all metrics as non-deterministic estimations: **“Estimated Fit”**, **“Recommended Career”**, and **“Diagnostic Skill Gap”**.
- Transparent rationale explanations are provided for every recommendation so users understand why a specific match score was computed.
