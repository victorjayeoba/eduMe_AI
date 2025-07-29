export interface QuizOption {
  code: 'A' | 'B' | 'C' | 'D';
  text: string;
  weight: number;
}

export interface QuizQuestion {
  id: string;
  text: string;
  options: QuizOption[];
  batch: 'core' | 'tech' | 'business' | 'arts' | 'health' | 'final';
  category: string;
}

export const quizQuestions: QuizQuestion[] = [
  // BATCH 1: CORE QUESTIONS (Always asked first)
  {
    id: 'core_01',
    text: 'Which activities do you enjoy most?',
    options: [
      { code: 'A', text: 'Art, writing, music, drama', weight: 1 },
      { code: 'B', text: 'Maths, coding, science experiments', weight: 1 },
      { code: 'C', text: 'Leading projects, organizing events, selling', weight: 1 },
      { code: 'D', text: 'Helping others, teaching, counselling', weight: 1 }
    ],
    batch: 'core',
    category: 'interests'
  },
  {
    id: 'core_02',
    text: 'What matters most in a job?',
    options: [
      { code: 'A', text: 'High salary over ₦300k/month', weight: 1 },
      { code: 'B', text: 'Flexible hours, work-life balance', weight: 1 },
      { code: 'C', text: 'Helping people or society', weight: 1 },
      { code: 'D', text: 'Security and steady income', weight: 1 }
    ],
    batch: 'core',
    category: 'values'
  },
  {
    id: 'core_03',
    text: 'Would you like to run your own business someday?',
    options: [
      { code: 'A', text: 'Yes, I\'d love to be my own boss', weight: 1 },
      { code: 'B', text: 'No, I prefer working for others', weight: 1 },
      { code: 'C', text: 'Maybe freelance or side hustle', weight: 1 },
      { code: 'D', text: 'Not sure yet', weight: 1 }
    ],
    batch: 'core',
    category: 'entrepreneurship'
  },
  {
    id: 'core_04',
    text: 'Where can you afford to study?',
    options: [
      { code: 'A', text: 'Federal university (low fees)', weight: 1 },
      { code: 'B', text: 'State university', weight: 1 },
      { code: 'C', text: 'Private university or specialist college', weight: 1 },
      { code: 'D', text: 'Study abroad', weight: 1 }
    ],
    batch: 'core',
    category: 'budget'
  },
  {
    id: 'core_05',
    text: 'What JAMB score range do you expect?',
    options: [
      { code: 'A', text: 'Below 200', weight: 1 },
      { code: 'B', text: '200-250', weight: 1 },
      { code: 'C', text: '250-300', weight: 1 },
      { code: 'D', text: 'Above 300', weight: 1 }
    ],
    batch: 'core',
    category: 'academic'
  },
  {
    id: 'core_06',
    text: 'Do you prefer working with...',
    options: [
      { code: 'A', text: 'Creative ideas or designs', weight: 1 },
      { code: 'B', text: 'Numbers, data or machines', weight: 1 },
      { code: 'C', text: 'Teams and people', weight: 1 },
      { code: 'D', text: 'Caring or teaching others', weight: 1 }
    ],
    batch: 'core',
    category: 'work_style'
  },
  {
    id: 'core_07',
    text: 'What are your strongest skills? (select one)',
    options: [
      { code: 'A', text: 'Drawing, writing, designing', weight: 1 },
      { code: 'B', text: 'Maths, logic, data', weight: 1 },
      { code: 'C', text: 'Communication and persuasion', weight: 1 },
      { code: 'D', text: 'Organizing and planning', weight: 1 }
    ],
    batch: 'core',
    category: 'skills'
  },
  {
    id: 'core_08',
    text: 'Would you like early work experience before university?',
    options: [
      { code: 'A', text: 'Yes, through internship or apprenticeship', weight: 1 },
      { code: 'B', text: 'No, I\'d go directly to a degree', weight: 1 },
      { code: 'C', text: 'I\'d like a diploma or NYSC route first', weight: 1 },
      { code: 'D', text: 'I\'d prefer online or vocational training', weight: 1 }
    ],
    batch: 'core',
    category: 'education_path'
  },
  {
    id: 'core_09',
    text: 'How do you study best?',
    options: [
      { code: 'A', text: 'Reading, writing, and solo learning', weight: 1 },
      { code: 'B', text: 'Experiments, labs or hands-on practice', weight: 1 },
      { code: 'C', text: 'Group projects or discussions', weight: 1 },
      { code: 'D', text: 'Real-world experience and practice', weight: 1 }
    ],
    batch: 'core',
    category: 'learning_style'
  },
  {
    id: 'core_10',
    text: 'What is more exciting to you?',
    options: [
      { code: 'A', text: 'Building products, apps, or solutions', weight: 1 },
      { code: 'B', text: 'Solving science or technical problems', weight: 1 },
      { code: 'C', text: 'Planning or managing events and people', weight: 1 },
      { code: 'D', text: 'Teaching or supporting others', weight: 1 }
    ],
    batch: 'core',
    category: 'motivation'
  },

  // BATCH 2: TECH/SCIENCE BRANCH
  {
    id: 'tech_01',
    text: 'Which subject do you enjoy most in school?',
    options: [
      { code: 'A', text: 'Mathematics', weight: 1 },
      { code: 'B', text: 'Physics or Chemistry', weight: 1 },
      { code: 'C', text: 'Biology or Agricultural Science', weight: 1 },
      { code: 'D', text: 'Technical Drawing or ICT', weight: 1 }
    ],
    batch: 'tech',
    category: 'subject_preference'
  },
  {
    id: 'tech_02',
    text: 'What kind of problem do you like solving?',
    options: [
      { code: 'A', text: 'Writing code or algorithms', weight: 1 },
      { code: 'B', text: 'Fixing machines or electronics', weight: 1 },
      { code: 'C', text: 'Understanding life and environment', weight: 1 },
      { code: 'D', text: 'Designing structures or systems', weight: 1 }
    ],
    batch: 'tech',
    category: 'problem_solving'
  },
  {
    id: 'tech_03',
    text: 'How do you prefer to learn?',
    options: [
      { code: 'A', text: 'Hands-on experiments or labs', weight: 1 },
      { code: 'B', text: 'Coding on a computer', weight: 1 },
      { code: 'C', text: 'Working in the field (farms, labs)', weight: 1 },
      { code: 'D', text: 'Building or prototyping', weight: 1 }
    ],
    batch: 'tech',
    category: 'learning_method'
  },

  // BATCH 3: BUSINESS BRANCH
  {
    id: 'business_01',
    text: 'Which type of project excites you most?',
    options: [
      { code: 'A', text: 'Starting or running a small business', weight: 1 },
      { code: 'B', text: 'Managing teams or departments', weight: 1 },
      { code: 'C', text: 'Creating marketing or sales campaigns', weight: 1 },
      { code: 'D', text: 'Financial planning and analysis', weight: 1 }
    ],
    batch: 'business',
    category: 'project_type'
  },
  {
    id: 'business_02',
    text: 'How do you prefer to work?',
    options: [
      { code: 'A', text: 'Independently—own business or freelancing', weight: 1 },
      { code: 'B', text: 'Leading groups or coordinating tasks', weight: 1 },
      { code: 'C', text: 'Designing promotions and outreach', weight: 1 },
      { code: 'D', text: 'Analyzing budgets and financial reports', weight: 1 }
    ],
    batch: 'business',
    category: 'work_preference'
  },

  // BATCH 4: ARTS BRANCH
  {
    id: 'arts_01',
    text: 'Which creative activity energizes you most?',
    options: [
      { code: 'A', text: 'Drawing, painting, visual design', weight: 1 },
      { code: 'B', text: 'Writing stories, blogs, scripts', weight: 1 },
      { code: 'C', text: 'Singing, playing music, performing', weight: 1 },
      { code: 'D', text: 'Designing clothes, textiles, craft', weight: 1 }
    ],
    batch: 'arts',
    category: 'creative_medium'
  },
  {
    id: 'arts_02',
    text: 'How do you prefer to communicate your ideas?',
    options: [
      { code: 'A', text: 'Visual: images, layouts, graphics', weight: 1 },
      { code: 'B', text: 'Words: written or spoken storytelling', weight: 1 },
      { code: 'C', text: 'Audio/performance: singing, acting', weight: 1 },
      { code: 'D', text: 'Style: fashion, craftsmanship, styling', weight: 1 }
    ],
    batch: 'arts',
    category: 'communication_style'
  },

  // BATCH 5: HEALTH/SOCIAL BRANCH
  {
    id: 'health_01',
    text: 'Which activity do you most enjoy?',
    options: [
      { code: 'A', text: 'Helping others learn or grow (teaching)', weight: 1 },
      { code: 'B', text: 'Caring for people\'s health (nursing, medicine)', weight: 1 },
      { code: 'C', text: 'Listening and supporting others (counseling)', weight: 1 },
      { code: 'D', text: 'Planning community health or social programs', weight: 1 }
    ],
    batch: 'health',
    category: 'helping_preference'
  },
  {
    id: 'health_02',
    text: 'How do you prefer to learn?',
    options: [
      { code: 'A', text: 'Reading and teaching', weight: 1 },
      { code: 'B', text: 'Practical care or lab-based tasks', weight: 1 },
      { code: 'C', text: 'Conversation and empathy-based work', weight: 1 },
      { code: 'D', text: 'Planning health initiatives or policies', weight: 1 }
    ],
    batch: 'health',
    category: 'learning_approach'
  }
];

export const careerRecommendations = {
  tech: {
    courses: ['Computer Science', 'Software Engineering', 'Data Science', 'Cybersecurity', 'Information Technology'],
    institutions: ['UNILAG', 'Covenant University', 'AUST', 'Federal Universities'],
    salaryRange: '₦200,000 - ₦400,000/month',
    admissionTips: 'Focus on Mathematics and Physics. JAMB scores above 250 recommended.'
  },
  business: {
    courses: ['Business Administration', 'Accounting', 'Marketing', 'Economics', 'Project Management'],
    institutions: ['Lagos Business School', 'State Universities', 'Private Business Schools'],
    salaryRange: '₦150,000 - ₦300,000/month',
    admissionTips: 'Strong performance in Mathematics and English. Consider professional certifications.'
  },
  arts: {
    courses: ['Mass Communication', 'Fine Arts', 'Graphic Design', 'Theatre Arts', 'Creative Writing'],
    institutions: ['Private Art Colleges', 'Universities with Strong Arts Programs'],
    salaryRange: '₦80,000 - ₦200,000/month + freelance opportunities',
    admissionTips: 'Portfolio development is crucial. Consider both degree and skill-based training.'
  },
  health: {
    courses: ['Medicine', 'Nursing', 'Public Health', 'Psychology', 'Health Education'],
    institutions: ['Federal Medical Colleges', 'State Universities', 'Private Medical Schools'],
    salaryRange: '₦100,000 - ₦250,000/month',
    admissionTips: 'Strong science background required. High JAMB scores essential for Medicine.'
  }
}; 