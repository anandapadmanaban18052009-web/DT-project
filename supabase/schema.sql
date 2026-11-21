-- ============================================================================
-- AI CAREER INTELLIGENCE SYSTEM - SUPABASE POSTGRESQL SCHEMA
-- ============================================================================
-- This schema establishes a centralized, cross-device PostgreSQL database
-- with Row Level Security (RLS) policies for user data isolation.
-- ============================================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'recruiter')),
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  education TEXT DEFAULT '',
  college_name TEXT DEFAULT '',
  department TEXT DEFAULT '',
  year_of_study TEXT DEFAULT '',
  skills TEXT[] DEFAULT '{}',
  programming_languages TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  career_goal TEXT DEFAULT 'Data Scientist',
  is_public BOOLEAN NOT NULL DEFAULT TRUE,
  has_completed_tour BOOLEAN NOT NULL DEFAULT FALSE,
  assessment_skill_scores JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. USER PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.user_projects (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT DEFAULT '',
  technologies TEXT[] DEFAULT '{}',
  github_url TEXT DEFAULT '',
  live_url TEXT DEFAULT '',
  status TEXT DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Saved', 'Completed')),
  saved_date TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. SKILL ASSESSMENTS TABLE
CREATE TABLE IF NOT EXISTS public.skill_assessments (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  date TEXT NOT NULL,
  selected_skills TEXT[] DEFAULT '{}',
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  incorrect_answers INTEGER NOT NULL DEFAULT 0,
  overall_percentage NUMERIC NOT NULL DEFAULT 0,
  skill_scores JSONB DEFAULT '{}'::jsonb,
  user_answers JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. LEARNING GOALS TABLE
CREATE TABLE IF NOT EXISTS public.learning_goals (
  id TEXT PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. LEARNING SKILL PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.learning_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  skill_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'In Progress', 'Completed')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_name)
);

-- 6. ROADMAP PROGRESS TABLE
CREATE TABLE IF NOT EXISTS public.roadmap_progress (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  step_number INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'Not Started' CHECK (status IN ('Not Started', 'Recommended', 'In Progress', 'Completed')),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, step_number)
);

-- 7. RECRUITER JOB REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS public.recruiter_jobs (
  id TEXT PRIMARY KEY,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  department TEXT DEFAULT 'Engineering & AI',
  experience_level TEXT DEFAULT 'Entry Level',
  experience_required TEXT DEFAULT '0 - 2 Years',
  education_required TEXT DEFAULT 'B.Tech / B.S. in Computer Science or related degree',
  required_skills TEXT[] DEFAULT '{}',
  preferred_skills TEXT[] DEFAULT '{}',
  description TEXT DEFAULT '',
  posted_date TEXT DEFAULT 'Active Post',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roadmap_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recruiter_jobs ENABLE ROW LEVEL SECURITY;

-- PROFILES POLICIES:
-- 1. Users can read their own profile
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- 2. Recruiters can view public student profiles
CREATE POLICY "Recruiters can view public student profiles"
  ON public.profiles FOR SELECT
  USING (
    is_public = TRUE
    AND EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'recruiter'
    )
  );

-- 3. Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- 4. Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

-- USER PROJECTS POLICIES:
CREATE POLICY "Users can manage own projects"
  ON public.user_projects FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- SKILL ASSESSMENTS POLICIES:
CREATE POLICY "Users can manage own assessments"
  ON public.skill_assessments FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- LEARNING GOALS POLICIES:
CREATE POLICY "Users can manage own goals"
  ON public.learning_goals FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- LEARNING PROGRESS POLICIES:
CREATE POLICY "Users can manage own skill progress"
  ON public.learning_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ROADMAP PROGRESS POLICIES:
CREATE POLICY "Users can manage own roadmap progress"
  ON public.roadmap_progress FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- RECRUITER JOBS POLICIES:
-- All authenticated users can view active jobs
CREATE POLICY "Authenticated users can view jobs"
  ON public.recruiter_jobs FOR SELECT
  USING (auth.role() = 'authenticated');

-- Only recruiters can insert, update, or delete jobs
CREATE POLICY "Recruiters can insert jobs"
  ON public.recruiter_jobs FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE id = auth.uid() AND role = 'recruiter'
    )
  );

CREATE POLICY "Recruiters can update own jobs"
  ON public.recruiter_jobs FOR UPDATE
  USING (created_by = auth.uid() OR created_by IS NULL);

CREATE POLICY "Recruiters can delete own jobs"
  ON public.recruiter_jobs FOR DELETE
  USING (created_by = auth.uid() OR created_by IS NULL);
