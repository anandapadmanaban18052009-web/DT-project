import { SkillLearningResource } from '../types';

export const SKILL_LEARNING_RESOURCES: Record<string, SkillLearningResource> = {
  'Statistics': {
    skillName: 'Statistics',
    category: 'Mathematics & Data Foundations',
    importance: 'Statistics forms the mathematical backbone of data science and machine learning. It allows you to design valid experiments, interpret model evaluation metrics, and avoid false conclusions.',
    recommendedOrder: 1,
    resources: [
      {
        title: 'Khan Academy: Statistics and Probability',
        provider: 'Khan Academy',
        url: 'https://www.khanacademy.org/math/statistics-probability',
        type: 'Course',
        isFree: true
      },
      {
        title: 'W3Schools: Statistics Tutorial with Python Examples',
        provider: 'W3Schools',
        url: 'https://www.w3schools.com/python/python_ml_getting_started.asp',
        type: 'Tutorial',
        isFree: true
      },
      {
        title: 'Kaggle: Intro to Game AI and Probability in Data',
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn',
        type: 'Interactive',
        isFree: true
      },
      {
        title: 'freeCodeCamp: Statistics for Data Science Full Course',
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/news/learn-statistics-for-data-science/',
        type: 'Tutorial',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Central Tendency & Variance Calculations',
        prompt: 'Calculate Mean, Median, Mode, Variance, and Standard Deviation on a sample housing price dataset using NumPy and SciPy.',
        difficulty: 'Beginner'
      },
      {
        title: 'Hypothesis Testing & P-Value Interpretation',
        prompt: 'Formulate a two-sample t-test comparing web conversion rates between variant A and variant B. Determine statistical significance at alpha = 0.05.',
        difficulty: 'Intermediate'
      },
      {
        title: 'Confidence Intervals & Bootstrap Sampling',
        prompt: 'Generate 1,000 bootstrap resamples of customer spend distributions and plot the 95% confidence intervals.',
        difficulty: 'Advanced'
      }
    ],
    miniProjects: [
      {
        title: 'E-Commerce A/B Experimentation Suite',
        description: 'Build a statistical test harness that ingests raw telemetry logs, checks normality with Shapiro-Wilk, and computes statistical power.',
        expectedOutcome: 'Clear decision report stating whether the new checkout layout improved conversion with 95% confidence.'
      }
    ]
  },

  'Advanced SQL': {
    skillName: 'Advanced SQL',
    category: 'Data Engineering & Querying',
    importance: 'Modern data analysts and data scientists spend a majority of their time writing SQL to aggregate, clean, and extract features from massive relational databases and data warehouses.',
    recommendedOrder: 2,
    resources: [
      {
        title: 'W3Schools: SQL Tutorial & Database Reference',
        provider: 'W3Schools',
        url: 'https://www.w3schools.com/sql/',
        type: 'Tutorial',
        isFree: true
      },
      {
        title: 'Kaggle: Advanced SQL Course (Window Functions & CTEs)',
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn/advanced-sql',
        type: 'Interactive',
        isFree: true
      },
      {
        title: 'Mode Analytics: Advanced SQL Tutorial for Data Analysis',
        provider: 'Mode Analytics',
        url: 'https://mode.com/sql-tutorial/sql-window-functions/',
        type: 'Course',
        isFree: true
      },
      {
        title: 'Microsoft Learn: Query Data with Transact-SQL',
        provider: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/en-us/training/paths/query-data-with-transact-sql/',
        type: 'Course',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Window Functions for Running Totals & Ranking',
        prompt: 'Write queries using ROW_NUMBER(), RANK(), DENSE_RANK(), and SUM() OVER (PARTITION BY ... ORDER BY ...).',
        difficulty: 'Intermediate'
      },
      {
        title: 'Common Table Expressions (CTEs) & Subqueries',
        prompt: 'Refactor complex multi-level nested queries into readable, reusable WITH clauses.',
        difficulty: 'Intermediate'
      },
      {
        title: 'Recursive Hierarchical Queries',
        prompt: 'Write a recursive SQL query to traverse an organizational tree and calculate total team headcounts.',
        difficulty: 'Advanced'
      }
    ],
    miniProjects: [
      {
        title: 'Financial SaaS Monthly Recurring Revenue (MRR) Cohort Query',
        description: 'Write an analytical SQL pipeline computing user retention, monthly expansion MRR, churned MRR, and lifetime value.',
        expectedOutcome: 'An enterprise-grade cohort table ready for executive dashboard ingestion.'
      }
    ]
  },

  'Deep Learning': {
    skillName: 'Deep Learning',
    category: 'Advanced Artificial Intelligence',
    importance: 'Deep learning powers state-of-the-art computer vision, natural language processing, and generative AI models through multi-layer neural networks.',
    recommendedOrder: 3,
    resources: [
      {
        title: 'Google: Machine Learning Crash Course with TensorFlow',
        provider: 'Google Machine Learning Education',
        url: 'https://developers.google.com/machine-learning/crash-course',
        type: 'Course',
        isFree: true
      },
      {
        title: 'PyTorch: Official 60-Minute Deep Learning Blitz',
        provider: 'PyTorch Documentation',
        url: 'https://pytorch.org/tutorials/beginner/deep_learning_60min_blitz.html',
        type: 'Docs',
        isFree: true
      },
      {
        title: 'Kaggle: Intro to Deep Learning & Neural Networks',
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn/intro-to-deep-learning',
        type: 'Interactive',
        isFree: true
      },
      {
        title: 'freeCodeCamp: Deep Learning with PyTorch for Beginners',
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/news/deep-learning-with-pytorch-full-course/',
        type: 'Course',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Build a Multi-Layer Perceptron (MLP) from Scratch',
        prompt: 'Implement forward propagation, cross-entropy loss, and backpropagation using PyTorch autograd.',
        difficulty: 'Intermediate'
      },
      {
        title: 'Image Classification with Convolutional Networks (CNN)',
        prompt: 'Train a ConvNet on the CIFAR-10 image dataset achieving greater than 85% validation accuracy.',
        difficulty: 'Intermediate'
      },
      {
        title: 'Transfer Learning with Pre-Trained ResNet/Vision Transformer',
        prompt: 'Fine-tune a pre-trained backbone for specialized medical or satellite imagery classification.',
        difficulty: 'Advanced'
      }
    ],
    miniProjects: [
      {
        title: 'Autonomous Road Sign Recognition System',
        description: 'Train and deploy a lightweight convolutional neural network capable of real-time traffic sign classification.',
        expectedOutcome: 'PyTorch model weights, confusion matrix evaluation, and real-time webcam test script.'
      }
    ]
  },

  'Machine Learning': {
    skillName: 'Machine Learning',
    category: 'Core AI & Predictive Modeling',
    importance: 'Machine learning enables software to learn patterns from historical observations to predict outcomes on unseen data without explicit procedural programming.',
    recommendedOrder: 1,
    resources: [
      {
        title: 'Google: Machine Learning Education Guides',
        provider: 'Google Machine Learning Education',
        url: 'https://developers.google.com/machine-learning/crash-course',
        type: 'Course',
        isFree: true
      },
      {
        title: 'Scikit-Learn: Official Getting Started Machine Learning Guide',
        provider: 'Scikit-Learn Docs',
        url: 'https://scikit-learn.org/stable/getting_started.html',
        type: 'Docs',
        isFree: true
      },
      {
        title: 'Kaggle: Intro to Machine Learning Hands-on',
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn/intro-to-machine-learning',
        type: 'Interactive',
        isFree: true
      },
      {
        title: 'freeCodeCamp: Machine Learning with Python Course',
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/learn/machine-learning-with-python/',
        type: 'Course',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Train-Test Split & Cross-Validation Validation',
        prompt: 'Implement 5-fold cross-validation on a credit risk classification dataset to measure F1-Score variance.',
        difficulty: 'Beginner'
      },
      {
        title: 'Ensemble Modeling with Random Forests & XGBoost',
        prompt: 'Compare performance and ROC-AUC curves between standard Decision Trees and Gradient Boosted Trees.',
        difficulty: 'Intermediate'
      }
    ],
    miniProjects: [
      {
        title: 'Customer Churn Predictor with Feature Explanations',
        description: 'Build a classification pipeline utilizing SHAP values to explain which features drive customer cancellation.',
        expectedOutcome: 'Model evaluated with precision-recall trade-offs and interactive SHAP summary plots.'
      }
    ]
  },

  'Data Visualization': {
    skillName: 'Data Visualization',
    category: 'Communication & Business Intelligence',
    importance: 'Clear visual communication translates raw numeric tables into strategic insights that technical and executive partners can immediately act upon.',
    recommendedOrder: 1,
    resources: [
      {
        title: 'Kaggle: Data Visualization with Seaborn Course',
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn/data-visualization',
        type: 'Interactive',
        isFree: true
      },
      {
        title: 'W3Schools: Python Matplotlib and Plotting Tutorial',
        provider: 'W3Schools',
        url: 'https://www.w3schools.com/python/matplotlib_intro.asp',
        type: 'Tutorial',
        isFree: true
      },
      {
        title: 'freeCodeCamp: Data Visualization Certification',
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/learn/data-visualization/',
        type: 'Course',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Distributions & Multi-Variate Scatter Plots',
        prompt: 'Construct violin plots, box plots, and facet grids to uncover demographic anomalies in customer telemetry.',
        difficulty: 'Beginner'
      }
    ],
    miniProjects: [
      {
        title: 'Interactive Executive Health Telemetry Dashboard',
        description: 'Build a multi-tab analytical report visualizing patient vitals, admissions trends, and hospital bed occupancy.',
        expectedOutcome: 'A clean interactive web dashboard with filters, date ranges, and KPI cards.'
      }
    ]
  },

  'Power BI': {
    skillName: 'Power BI',
    category: 'Enterprise Business Intelligence',
    importance: 'Power BI is the leading enterprise business analytics platform used to model multi-table star schemas, author DAX calculations, and deliver automated executive telemetry.',
    recommendedOrder: 2,
    resources: [
      {
        title: 'Microsoft Learn: Power BI Data Analyst Learning Path (PL-300)',
        provider: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/en-us/training/paths/power-bi-data-analyst/',
        type: 'Course',
        isFree: true
      },
      {
        title: 'Microsoft Learn: Model Data in Power BI with DAX',
        provider: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/en-us/training/modules/create-measures-dax-power-bi/',
        type: 'Tutorial',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Authoring Complex DAX Measures (CALCULATE, FILTER, DATESYTD)',
        prompt: 'Create Year-over-Year (YoY) revenue comparison measures using time-intelligence DAX functions.',
        difficulty: 'Intermediate'
      }
    ],
    miniProjects: [
      {
        title: 'Global Supply Chain Lead-Time & Logistics Report',
        description: 'Design a drill-through Power BI workbook detailing supplier fulfillment delays, inventory holding costs, and automated safety stock alerts.',
        expectedOutcome: 'Published interactive dashboard with cross-filtering and automated KPI scorecards.'
      }
    ]
  },

  'Docker': {
    skillName: 'Docker',
    category: 'Cloud, Infrastructure & DevOps',
    importance: 'Containerization guarantees that machine learning pipelines and microservices run identically across local development machines, testing servers, and distributed cloud clusters.',
    recommendedOrder: 3,
    resources: [
      {
        title: 'Docker: Official Getting Started Curriculum',
        provider: 'Docker Documentation',
        url: 'https://docs.docker.com/get-started/',
        type: 'Docs',
        isFree: true
      },
      {
        title: 'freeCodeCamp: Docker Tutorial for Beginners',
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/news/what-is-docker-used-for-a-docker-container-tutorial-for-beginners/',
        type: 'Tutorial',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Write a Multi-Stage Dockerfile for Python ML Services',
        prompt: 'Containerize a FastAPI model endpoint with minimal image footprint using python:3.11-slim.',
        difficulty: 'Intermediate'
      }
    ],
    miniProjects: [
      {
        title: 'Containerized Microservice with Docker Compose',
        description: 'Spin up a FastAPI inference service, Redis cache, and PostgreSQL database with a single docker-compose.yml configuration.',
        expectedOutcome: 'Fully reproducible local cloud architecture running with one CLI command.'
      }
    ]
  },

  'MLOps': {
    skillName: 'MLOps',
    category: 'Machine Learning Operations',
    importance: 'MLOps bridges experimental data modeling and production software engineering, governing model versioning, experiment tracking, continuous deployment, and drift monitoring.',
    recommendedOrder: 4,
    resources: [
      {
        title: 'Google Cloud: Architecture for MLOps with Vertex AI',
        provider: 'Google Cloud Guides',
        url: 'https://cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning',
        type: 'Docs',
        isFree: true
      },
      {
        title: 'MLflow: Quickstart Guide to Model Experiment Tracking',
        provider: 'MLflow Documentation',
        url: 'https://mlflow.org/docs/latest/getting-started/index.html',
        type: 'Docs',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'Automated Experiment Logging with MLflow',
        prompt: 'Log parameters, metrics (accuracy, F1), and model artifacts automatically during hyperparameter search.',
        difficulty: 'Intermediate'
      }
    ],
    miniProjects: [
      {
        title: 'End-to-End Retraining Pipeline with GitHub Actions',
        description: 'Set up automated data validation, model retraining upon dataset changes, and Docker image publishing via CI/CD.',
        expectedOutcome: 'Continuous integration workflow that deploys new model versions without manual downtime.'
      }
    ]
  },

  'Python': {
    skillName: 'Python',
    category: 'Programming & Data Science',
    importance: 'Python is the universal language of artificial intelligence, scientific computing, data engineering, and automation.',
    recommendedOrder: 1,
    resources: [
      {
        title: 'Official Python Tutorial',
        provider: 'Python Software Foundation',
        url: 'https://docs.python.org/3/tutorial/',
        type: 'Docs',
        isFree: true
      },
      {
        title: 'W3Schools: Python Full Course & Exercises',
        provider: 'W3Schools',
        url: 'https://www.w3schools.com/python/',
        type: 'Tutorial',
        isFree: true
      },
      {
        title: 'Kaggle: Python for Data Science Bootcamp',
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn/python',
        type: 'Interactive',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: 'List Comprehensions, Generators, and Decorators',
        prompt: 'Write memory-efficient generator expressions and custom timing decorators for data batch processing.',
        difficulty: 'Beginner'
      }
    ],
    miniProjects: [
      {
        title: 'Multi-Threaded Web Scraper & Data Pipeline',
        description: 'Extract product catalog listings, parse JSON structures, and save structured records to SQLite.',
        expectedOutcome: 'Automated extraction pipeline with error handling and rate limiting.'
      }
    ]
  }
};

/**
 * Helper to retrieve skill resource or generate fallback
 */
export function getLearningResourceForSkill(skillName: string): SkillLearningResource {
  if (SKILL_LEARNING_RESOURCES[skillName]) {
    return SKILL_LEARNING_RESOURCES[skillName];
  }

  // Check case-insensitive
  const matchKey = Object.keys(SKILL_LEARNING_RESOURCES).find(
    k => k.toLowerCase() === skillName.toLowerCase() ||
         k.toLowerCase().includes(skillName.toLowerCase()) ||
         skillName.toLowerCase().includes(k.toLowerCase())
  );

  if (matchKey) {
    return SKILL_LEARNING_RESOURCES[matchKey];
  }

  // Fallback structure with reliable educational links
  return {
    skillName,
    category: 'Technical Specialization',
    importance: `Mastering ${skillName} directly bridges a key competency required for your target career role, enhancing your technical portfolio and interview readiness.`,
    recommendedOrder: 2,
    resources: [
      {
        title: `W3Schools: Learn ${skillName}`,
        provider: 'W3Schools',
        url: `https://www.w3schools.com/`,
        type: 'Tutorial',
        isFree: true
      },
      {
        title: `freeCodeCamp: ${skillName} Guides & Curriculum`,
        provider: 'freeCodeCamp',
        url: 'https://www.freecodecamp.org/learn/',
        type: 'Course',
        isFree: true
      },
      {
        title: `Kaggle Learn: Hands-on Tutorials`,
        provider: 'Kaggle Learn',
        url: 'https://www.kaggle.com/learn',
        type: 'Interactive',
        isFree: true
      },
      {
        title: `Microsoft Learn: Official Skills Path`,
        provider: 'Microsoft Learn',
        url: 'https://learn.microsoft.com/',
        type: 'Docs',
        isFree: true
      }
    ],
    practiceExercises: [
      {
        title: `Foundations of ${skillName}`,
        prompt: `Review the syntax, core classes, and standard conventions of ${skillName} and construct a minimal working prototype.`,
        difficulty: 'Beginner'
      },
      {
        title: `Applied Use Case in ${skillName}`,
        prompt: `Solve a practical data processing or modeling challenge integrating ${skillName} into a multi-step workflow.`,
        difficulty: 'Intermediate'
      }
    ],
    miniProjects: [
      {
        title: `${skillName} Portfolio Showcase Project`,
        description: `Design and implement an end-to-end mini project demonstrating your proficiency in ${skillName}.`,
        expectedOutcome: `Documented GitHub repository with clear instructions, tests, and demo results.`
      }
    ]
  };
}

export const getFallbackLearningResource = getLearningResourceForSkill;

