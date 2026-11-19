import React, { useState, useRef, useEffect } from 'react';
import {
  MessageSquare,
  X,
  Minimize2,
  Maximize2,
  Trash2,
  Send,
  Sparkles,
  Bot,
  User,
  ChevronRight,
  HelpCircle,
  Briefcase,
  GraduationCap
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { NavigationTab } from '../../types';

interface ChatMessage {
  id: string;
  sender: 'assistant' | 'user';
  text: string;
  timestamp: string;
}

export const CareerAIAssistant: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, profile } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isRecruiter = currentUser?.role === 'recruiter';
  const userName = currentUser?.name?.split(' ')[0] || (isRecruiter ? 'Recruiter' : 'Student');

  // Initial welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'msg-welcome',
      sender: 'assistant',
      text: isRecruiter
        ? `Hello ${userName}! I am your **Career AI Assistant** for the Recruiter Workspace. I can help you post job requirements, understand candidate matching scores, analyze talent pools, and navigate the recruiter portal. What would you like assistance with today?`
        : `Hello ${userName}! I am your **Career AI Assistant**. I can help you navigate your dashboard, upload resumes, understand your AI Career Engine match percentage, take skill assessments, and pick recommended projects. How can I guide you today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Scroll to bottom of chat
  useEffect(() => {
    if (isOpen && !isMinimized) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isMinimized, isTyping]);

  // Dynamic suggested questions based on current page
  const pageSuggestedQuestions: Record<string, string[]> = {
    'resume-analyzer': [
      'How do I upload my resume?',
      'Why was my resume not analyzed?',
      'How do I add extracted skills to my profile?'
    ],
    'skill-assessment': [
      'How are test percentages calculated?',
      'How can I improve my score?',
      'Where can I see my previous results?'
    ],
    'engine': [
      'How does career matching work?',
      'What formula calculates the match score?',
      'How do I improve my career compatibility?'
    ],
    'career-matching': [
      'How does career matching work?',
      'How do I change my target career?',
      'What do verified skills mean?'
    ],
    'projects': [
      'How do I find recommended projects?',
      'How do I add a project to my profile?',
      'What projects should a Data Scientist build?'
    ],
    'skill-gap': [
      'How can I check my missing skills?',
      'How are missing skills prioritized?',
      'Where can I practice missing skills?'
    ],
    'my-profile': [
      'How can I update my profile?',
      'What is the skill confidence overview?',
      'How do I add my GitHub and live project links?'
    ],
    'roadmap': [
      'How do I use the learning roadmap?',
      'How do I mark roadmap steps completed?',
      'Where are the recommended learning courses?'
    ],
    'recruiter-jobs': [
      'How do I create a job requirement?',
      'How can I edit required and preferred skills?',
      'Where can I view candidate matches?'
    ],
    'recruiter-matching': [
      'How does candidate matching work?',
      'How are candidates ranked by the Eightfold engine?',
      'How do I view candidate profiles?'
    ]
  };

  const currentSuggestions =
    pageSuggestedQuestions[activeTab] ||
    (isRecruiter
      ? ['How do I create a job?', 'How does candidate matching work?', 'How are candidates ranked?']
      : ['How does career matching work?', 'How do I upload my resume?', 'How can I take a skill assessment?']);

  // Website knowledge retrieval logic
  const generateAssistantResponse = (query: string): string => {
    const q = query.toLowerCase().trim();

    // STRICT OUT-OF-SCOPE GUARDRAIL
    const websiteKeywords = [
      'resume', 'upload', 'analyzer', 'skill', 'assessment', 'test', 'question',
      'engine', 'career', 'match', 'matching', 'formula', 'cosine', 'jaccard',
      'gap', 'missing', 'project', 'projects', 'recommend', 'roadmap', 'profile',
      'job', 'recruiter', 'candidate', 'dashboard', 'settings', 'tour', 'learn',
      'data science', 'ai', 'portal', 'score', 'percentage', 'login', 'account',
      'github', 'achievement', 'goal', 'history', 'navigate', 'how to', 'help'
    ];

    const isWebsiteQuery = websiteKeywords.some(keyword => q.includes(keyword));

    if (!isWebsiteQuery && !q.includes('hello') && !q.includes('hi') && !q.includes('hey')) {
      return 'I am your AI Career Assistant. I can help you with the features and services available on this website. Please ask me something about your career dashboard, resume analysis, skill assessment, project recommendations or recruiter tools.';
    }

    // 1. Resume Analyzer
    if (q.includes('upload') || q.includes('resume') || q.includes('extract') || q.includes('pdf') || q.includes('docx')) {
      if (q.includes('add') || q.includes('profile')) {
        return `**Adding Extracted Skills to Your Profile:**\n\n1. Go to the **Resume Analyzer** page.\n2. Upload your PDF or DOCX file (or click a sample resume) and click **"Extract Skills & Analyze Resume"**.\n3. In the results panel, click **"Update My Profile With Extracted Skills"**.\n4. A review modal will appear displaying all detected skills with checkboxes.\n5. Uncheck any inaccurate skills, keep the ones you want, and click **"Confirm & Update Profile"**.\n6. Your profile is instantly updated and the AI Career Engine recalculates your career matches!`;
      }
      if (q.includes('why') || q.includes('fail') || q.includes('not analyzed') || q.includes('error')) {
        return `**Troubleshooting Resume Analysis:**\n\n- **Supported formats**: PDF, DOCX, TXT, MD up to 10 MB.\n- **Image-only scans**: If your PDF is a scanned image without selectable text, text extraction cannot read the characters. Please upload a digital PDF with selectable text or a Word (.docx) document.\n- **Password protection**: Make sure your file is not encrypted or password-protected.\n- **Alternative**: You can also paste your resume text directly into the text box on the Resume Analyzer page!`;
      }
      return `**How the Resume Skill Analyzer Works:**\n\n1. Navigate to **Resume Analyzer** from the sidebar.\n2. Upload your **PDF**, **DOCX**, or **TXT** resume (up to 10MB).\n3. Our document parsing engine extracts text, normalizes aliases (e.g. *"Python programming"* → *"Python"*), and removes duplicates.\n4. It categorizes your competencies into **Programming Languages**, **Frameworks**, **Databases**, **Tools**, and identifies experience.\n5. Click **"Update My Profile With Extracted Skills"** to review before saving.`;
    }

    // 2. Skill Assessment
    if (q.includes('assessment') || q.includes('test') || q.includes('mcq') || q.includes('quiz') || q.includes('score')) {
      if (q.includes('percentage') || q.includes('calculate') || q.includes('formula')) {
        return `**How Assessment Scores are Calculated:**\n\n- **Skill Score**: \`Skill Score = (Correct Answers / Total Questions) × 100\`\n- **Overall Score**: \`Overall Score = (Total Correct / Total Questions) × 100\`\n- Each skill test consists of **5 practical multiple-choice questions**.\n- Scores are categorized as:\n  • **80–100%**: Strong Understanding (verified strength in AI Career Engine)\n  • **60–79%**: Good Understanding\n  • **40–59%**: Basic Understanding\n  • **0–39%**: Needs Improvement (flagged in Skill Gap Analysis)`;
      }
      if (q.includes('history') || q.includes('previous')) {
        return `**Viewing Assessment History:**\n\n1. Open the **Skill Assessment** page from the sidebar.\n2. In the top right corner, click the **"History"** button.\n3. You will see all your past assessments with dates, total questions evaluated, overall percentage, and individual skill breakdowns.\n4. Click **"View Report"** on any past test to view its charts and performance report.`;
      }
      return `**How to Take a Skill Assessment:**\n\n1. Click **"Skill Assessment"** in the sidebar.\n2. Check the skills you want to evaluate (or click **"Select My Profile Skills"** to test skills you've entered).\n3. Click **"Start Skill Assessment Test"**.\n4. Answer each question one at a time. You can move between questions with Previous/Next and the question palette.\n5. Click **"Submit Test"** to see your **Pie Chart** (accuracy ratio), **Bar Graph** (skill scores), and personalized learning recommendations!`;
    }

    // 3. AI Career Engine & Math
    if (q.includes('engine') || q.includes('career match') || q.includes('formula') || q.includes('cosine') || q.includes('jaccard') || q.includes('how does career')) {
      return `**How the AI Career Engine Works:**\n\nThe AI Career Engine calculates compatibility between your profile and industry benchmarks (Data Analyst, Data Scientist, ML Engineer, AI Engineer, Business Analyst).\n\n**Mathematical Scoring Formula:**\n\`Final Match Score = (60% × Cosine Similarity) + (40% × Weighted Jaccard Similarity)\`\n\n- **Cosine Similarity (60%)**: Measures the angular directional alignment between your multi-dimensional skill vector and the benchmark.\n- **Weighted Jaccard (40%)**: Measures intersection-over-union of competencies.\n- **Assessment Evidence**: Skills tested with score ≥70% receive a verified strength boost (1.4× weight), while scores <50% are weighted at 0.5× and highlighted in your gap analysis.\n- The engine is fully transparent and recalculates automatically when you update your profile or complete tests.`;
    }

    // 4. Missing Skills & Skill Gap
    if (q.includes('missing') || q.includes('gap') || q.includes('improve')) {
      return `**Checking and Closing Your Skill Gaps:**\n\n1. Open **"Skill Gap Analysis"** from the sidebar.\n2. You'll see high-priority missing skills required for your target role (${profile.careerGoal || 'Data Scientist'}) and competitive differentiators.\n3. Click **"Learn Missing Skills"** in the sidebar to access free interactive tutorials, books, and step-by-step practice exercises for each skill.\n4. As you complete exercises, mark them as *"Completed"* to track your learning progress and boost your career readiness score!`;
    }

    // 5. Recommended Projects
    if (q.includes('project') || q.includes('recommendation')) {
      return `**Recommended Projects System:**\n\n1. Click **"Recommended Projects"** from the sidebar.\n2. The system recommends **exactly 3 or 4 tailored projects** based on your technical skills, career goal, interests, and identified gaps.\n3. For each project, you can view the difficulty level, technologies required, skills developed, and expected outcome.\n4. Click **"View Project Details"** to see the complete 4-step implementation roadmap.\n5. Click **"Add to My Profile"** to simulate building it and showcase it in your portfolio!`;
    }

    // 6. Learning Roadmap
    if (q.includes('roadmap') || q.includes('learning')) {
      return `**Using the Personalized Learning Roadmap:**\n\n1. Click **"Learning Roadmap"** in the sidebar.\n2. The roadmap breaks down your journey into 4 sequential milestones: Foundations, Data Engineering, Advanced Algorithms, and Production Deployment.\n3. Each milestone includes curated courses, books, and practice links.\n4. You can update each milestone's status between *Not Started*, *In Progress*, and *Completed* to visualize your progress.`;
    }

    // 7. Profile & Portfolio
    if (q.includes('profile') || q.includes('update') || q.includes('github') || q.includes('goal')) {
      return `**Updating Your Student Profile:**\n\n1. Navigate to **"My Profile"** in the sidebar.\n2. You'll see your **Career Identity Card**, **Skill Portfolio** categorized with source tags (Manual, Resume, Assessment), and **Skill Confidence Overview**.\n3. Click **"Edit Profile"** to update your college, degree, year, programming languages, and career goal.\n4. In the **Project Portfolio** section, click **"Add Project"** to add your projects with GitHub repository links and live URLs.\n5. You can also add personal **Learning Goals** and unlock achievements!`;
    }

    // 8. Recruiter Features
    if (isRecruiter || q.includes('job') || q.includes('recruiter') || q.includes('candidate')) {
      if (q.includes('create') || q.includes('post')) {
        return `**Creating a Job Requirement (Recruiter):**\n\n1. Go to **"Job Management"** in the sidebar.\n2. Fill in the job title, company name, department, experience level, required skills, and preferred skills.\n3. Click **"Post Job Requirement"**.\n4. Your new job specification is saved and immediately available for candidate matching!`;
      }
      return `**Recruiter Candidate Matching Engine:**\n\n1. Open **"Candidate Matching"** from the sidebar.\n2. Select an active job requirement from the dropdown.\n3. The Eightfold-inspired candidate matching engine analyzes applicant profiles against the job's required competencies (60%), preferred skills (25%), and practical project depth (15%).\n4. Candidates are ranked as *Top Candidate*, *Strong Match*, or *Potential Match* with a transparent explanation of matched skills and missing competencies.`;
    }

    // Fallback friendly message
    return `I am here to guide you through the **AI Career Intelligence System**! You can ask me:\n\n- How to upload and analyze your resume\n- How skill assessment scores and charts work\n- How the AI Career Engine calculates your career match\n- How to check missing skills and recommended projects\n- How to update your profile and track learning goals`;
  };

  // Send message handler
  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userText = inputValue.trim();
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Realistic typing delay (400-800ms)
    setTimeout(() => {
      const responseText = generateAssistantResponse(userText);
      const assistantMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 600);
  };

  // Handle clicking a suggested question
  const handleQuickQuestionClick = (question: string) => {
    setInputValue(question);
    const userMsg: ChatMessage = {
      id: 'msg_' + Date.now(),
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const responseText = generateAssistantResponse(question);
      const assistantMsg: ChatMessage = {
        id: 'msg_bot_' + Date.now(),
        sender: 'assistant',
        text: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 500);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'msg-welcome-new',
        sender: 'assistant',
        text: `Chat history cleared. How can I help you navigate the ${isRecruiter ? 'Recruiter Portal' : 'AI Career System'}?`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <>
      {/* Floating Button (Cyan & Purple Glowing Effect) */}
      {!isOpen && (
        <button
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
          }}
          className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 text-white shadow-2xl shadow-cyan-500/40 hover:scale-110 active:scale-95 transition-all duration-300 group flex items-center gap-2 border border-cyan-400/30"
          title="Open Career AI Assistant"
        >
          <div className="relative">
            <Bot className="w-6 h-6 text-white group-hover:rotate-12 transition-transform" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full" />
          </div>
          <span className="text-xs font-bold pr-1 hidden sm:inline">AI Assistant</span>
        </button>
      )}

      {/* Floating Chatbot Window */}
      {isOpen && (
        <div
          className={`fixed right-4 sm:right-6 bottom-4 sm:bottom-6 z-50 rounded-2xl bg-[#090e1f] border border-cyan-500/30 shadow-2xl backdrop-blur-2xl transition-all duration-300 flex flex-col overflow-hidden ${
            isMinimized
              ? 'w-80 h-14'
              : 'w-[92vw] sm:w-[420px] h-[560px] max-h-[85vh]'
          }`}
        >
          {/* Header */}
          <div className="p-3.5 bg-gradient-to-r from-navy-950 via-slate-900 to-navy-900 border-b border-slate-800 flex items-center justify-between shrink-0">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-cyan-500/20">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Career AI Assistant</span>
                  <span className="text-[9px] font-semibold px-1.5 py-0.2 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                    Website Guide
                  </span>
                </h4>
                <p className="text-[10px] text-slate-400">
                  {isRecruiter ? 'Recruiter Knowledge Mode' : 'Student Knowledge Mode'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-1 text-slate-400">
              <button
                type="button"
                onClick={handleClearChat}
                className="p-1.5 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition"
                title="Clear Chat History"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title={isMinimized ? 'Expand' : 'Minimize'}
              >
                {isMinimized ? <Maximize2 className="w-3.5 h-3.5" /> : <Minimize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white rounded-lg hover:bg-slate-800 transition"
                title="Close Assistant"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Body (when not minimized) */}
          {!isMinimized && (
            <>
              {/* Messages viewport */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-xs">
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-2.5 ${
                      msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                    }`}
                  >
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-[10px] font-bold ${
                        msg.sender === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-cyan-950 text-cyan-400 border border-cyan-800'
                      }`}
                    >
                      {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>

                    <div
                      className={`p-3 rounded-2xl max-w-[82%] leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm'
                          : 'bg-slate-900/90 border border-slate-800 text-slate-200 rounded-tl-sm shadow-md'
                      }`}
                    >
                      {/* Render markdown bold and breaks simply */}
                      <div className="space-y-1.5 whitespace-pre-wrap">
                        {msg.text.split('\n').map((paragraph, idx) => (
                          <p key={idx} className="leading-snug">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      <span className="block text-[9px] text-slate-400 text-right mt-1 opacity-70">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex items-center space-x-2 text-slate-400 text-xs pl-8">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce [animation-delay:0.4s]" />
                    <span className="text-[10px] italic">Assistant is typing...</span>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Chips */}
              <div className="px-3 py-2 bg-slate-950/80 border-t border-slate-800/80">
                <p className="text-[10px] font-semibold text-slate-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span>Suggested for {activeTab.replace('-', ' ')}:</span>
                </p>
                <div className="flex flex-wrap gap-1.5 max-h-16 overflow-y-auto">
                  {currentSuggestions.map((sq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleQuickQuestionClick(sq)}
                      className="text-[10px] px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-300 border border-slate-800 hover:border-cyan-600/50 transition truncate max-w-full text-left"
                    >
                      {sq}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Bar */}
              <div className="p-3 bg-navy-950 border-t border-slate-800">
                <form
                  onSubmit={e => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    placeholder="Ask about resume, test, career engine..."
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className="p-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white transition disabled:opacity-40 disabled:cursor-not-allowed shrink-0 shadow-md shadow-cyan-600/25"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};
