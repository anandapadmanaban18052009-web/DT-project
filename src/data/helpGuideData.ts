export interface FeatureGuideItem {
  id: string;
  tab: string;
  featureName: string;
  stickerNote: string;
  explanation: string;
  instructions: string[];
  example: string;
  badgeVariant: 'cyan' | 'purple' | 'amber' | 'emerald';
}

export const FEATURE_GUIDES: Record<string, FeatureGuideItem> = {
  'dashboard': {
    id: 'dashboard',
    tab: 'dashboard',
    featureName: 'Student Dashboard',
    stickerNote: 'Welcome! Your career journey starts here. Explore your skills, career matches and learning progress.',
    explanation:
      'The Student Dashboard provides a central hub of your career intelligence. It synthesizes your academic background, verified coursework skills, and project experience into real-time readiness metrics and radar competency charts.',
    instructions: [
      'Complete your profile with your engineering department, programming languages, and skills.',
      'Inspect your top 4 career role matches with calculated readiness scores.',
      'Review your skill radar chart to visualize balanced competency across foundational domains.',
      'Track daily learning goals and mark your projects as in-progress or completed.'
    ],
    example:
      'A student with Python, SQL, and Pandas sees a 78% match for Junior Data Analyst and a 62% match for Data Scientist, with direct links to bridge missing competencies.',
    badgeVariant: 'cyan'
  },
  'resume-analyzer': {
    id: 'resume-analyzer',
    tab: 'resume-analyzer',
    featureName: 'Resume Skill Analyzer',
    stickerNote: 'Upload your PDF or DOCX resume. Review the extracted skills before adding them to your profile.',
    explanation:
      'The Resume Skill Analyzer parses text from uploaded PDF and Word (.docx) resumes using document parsing libraries. It normalizes aliases, eliminates duplicates, and organizes skills into 8 technical domains without hallucinating fake skills.',
    instructions: [
      'Upload a text-based PDF or DOCX resume (up to 10MB).',
      'Inspect the extracted text preview and detected skills across the 8 technical categories.',
      'Click "Review Your Extracted Skills" to open the verification modal.',
      'Check or uncheck skills, add any missing skills manually, and click "Confirm & Update Profile".'
    ],
    example:
      'Uploading a resume containing "Python 3, Scikit-learn, and React.js" extracts them as "Python", "Scikit-Learn", and "React" under Programming Languages, AI & ML, and Frameworks respectively.',
    badgeVariant: 'purple'
  },
  'engine': {
    id: 'engine',
    tab: 'engine',
    featureName: 'AI Career Engine',
    stickerNote: 'This engine compares your skills with career requirements to identify suitable career paths.',
    explanation:
      'The AI Career Engine employs a multi-dimensional vector space model combining 60% Cosine Similarity and 40% Weighted Jaccard Similarity. It matches your verified and self-declared skills against standardized industry benchmarks.',
    instructions: [
      'Select any of the 5 core career benchmarks (Data Scientist, Data Analyst, ML Engineer, AI Engineer, Business Analyst).',
      'Inspect the final match percentage, Cosine score, and Weighted Jaccard score.',
      'Check which skills are verified through assessments (1.4x weight) vs self-declared (1.0x weight).',
      'Follow the personalized recommendation and recommended next steps.'
    ],
    example:
      'Selecting "Machine Learning Engineer" calculates a 74% match score based on strong Python and Math fundamentals, while highlighting PyTorch and MLOps as essential next steps.',
    badgeVariant: 'cyan'
  },
  'skill-gap': {
    id: 'skill-gap',
    tab: 'skill-gap',
    featureName: 'Skill Gap Analysis',
    stickerNote: 'Discover which skills you already have and which skills you need to improve.',
    explanation:
      'Skill Gap Analysis compares your acquired skills with target career prerequisites. It categorizes gaps into High Priority Core Requirements, Medium Priority Secondary Skills, and Differentiators so you can prioritize what to learn next.',
    instructions: [
      'Choose your target career path to analyze specific requirements.',
      'Review your "Acquired Strengths" versus "Critical Skill Gaps".',
      'Click "Learn Missing Skills" to access curated learning resources for any gap.',
      'Update learning statuses ("In Progress" or "Completed") to automatically update your profile.'
    ],
    example:
      'Targeting "Data Scientist" flags "Machine Learning" and "Deep Learning" as High Priority gaps with recommended tutorials and documentation to acquire them.',
    badgeVariant: 'amber'
  },
  'skill-assessment': {
    id: 'skill-assessment',
    tab: 'skill-assessment',
    featureName: 'Skill Assessment Tests',
    stickerNote: 'Choose the skills you want to test and answer questions to measure your knowledge.',
    explanation:
      'The Skill Assessment platform tests your technical knowledge through 5 multiple-choice questions per selected skill. Results are visualized in an overall accuracy Pie Chart and a skill-wise Bar Graph, boosting your verified career matching score.',
    instructions: [
      'Select 1 to 5 skills you want to evaluate (e.g. Python, SQL, Machine Learning).',
      'Answer the 5 questions generated for each skill with instant feedback.',
      'Submit the assessment to view your accuracy percentage and performance tier.',
      'Scores >= 70% automatically grant a verified competency boost in the Career Engine.'
    ],
    example:
      'Scoring 4/5 (80%) in SQL and 5/5 (100%) in Python marks both as "Verified Strengths", increasing your career compatibility score by up to 15%.',
    badgeVariant: 'emerald'
  },
  'projects': {
    id: 'projects',
    tab: 'projects',
    featureName: 'Project Recommendations',
    stickerNote: 'Explore projects recommended according to your skills and career goals.',
    explanation:
      'The Project Recommendation system analyzes your career goals, active skills, and identified skill gaps to suggest exactly 3 or 4 tailored portfolio projects with detailed implementation steps, required tech stacks, and estimated durations.',
    instructions: [
      'Review the 3 to 4 recommended projects tailored to your target career.',
      'Click "View Project Details" to view the 4-phase implementation roadmap and outcomes.',
      'Click "Start This Project" or "Save Project" to add it to your tracking list.',
      'Attach GitHub repository and live demo URLs to showcase practical proof of work.'
    ],
    example:
      'An aspiring AI Engineer with gaps in computer vision is recommended the "Image Classification & Detection System" project with step-by-step guidance using PyTorch and OpenCV.',
    badgeVariant: 'purple'
  },
  'roadmap': {
    id: 'roadmap',
    tab: 'roadmap',
    featureName: 'Learning Roadmap',
    stickerNote: 'Follow your personalized learning plan and track your completed skills.',
    explanation:
      'The Learning Roadmap organizes your career path into 4 progressive phases: Foundations, Core Concepts, Advanced Specialization, and Capstone Projects. Each phase provides curated courses, documentation, and practice platforms.',
    instructions: [
      'Follow milestones in sequential order from foundational tools to advanced topics.',
      'Click on step status buttons to update your progress (Not Started, In Progress, Completed).',
      'Review recommended resources, project assignments, and industry best practices.',
      'Your roadmap progress syncs automatically across your devices.'
    ],
    example:
      'Completing Phase 1 (Python & Mathematical Foundations) prepares you for Phase 2 (Data Preprocessing, Feature Engineering, and Scikit-Learn pipelines).',
    badgeVariant: 'cyan'
  },
  'recruiter-jobs': {
    id: 'recruiter-jobs',
    tab: 'recruiter-jobs',
    featureName: 'Recruiter Job Management',
    stickerNote: 'Manage job requirements and discover suitable candidates.',
    explanation:
      'The Recruiter Job Management portal enables hiring teams to publish and manage hiring requisitions, define required vs preferred skills, and connect requisitions to the AI candidate matching pipeline.',
    instructions: [
      'Click "Post New Job Requirement" to define a new requisition.',
      'Set title, department, experience requirements, and core technical skills.',
      'Select any job to inspect active candidate matches and compatibility scores.',
      'Edit or remove outdated requisitions anytime.'
    ],
    example:
      'Creating a "Junior Data Scientist" requisition with Python, SQL, and Machine Learning automatically searches student profiles and ranks qualified candidates.',
    badgeVariant: 'emerald'
  },
  'candidate-matching': {
    id: 'candidate-matching',
    tab: 'recruiter-matching',
    featureName: 'Candidate Matching Engine',
    stickerNote: 'Create a job requirement before matching candidates.',
    explanation:
      'The Candidate Matching Engine evaluates student applicants and benchmark talent against your active job requisitions. It computes skill overlap, assessment verification weights, and practical project alignment.',
    instructions: [
      'Select the active job requirement you want to match candidates against.',
      'Review candidates sorted by overall match compatibility percentage.',
      'Inspect each candidate\'s matching skills, missing skills, and verified test scores.',
      'Review candidate contact details, university, and portfolio projects.'
    ],
    example:
      'Matching against a "Business Intelligence Analyst" role ranks candidates with verified SQL and Power BI skills at 85%+ compatibility.',
    badgeVariant: 'purple'
  }
};
