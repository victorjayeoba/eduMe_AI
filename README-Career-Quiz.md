# 🎯 Nigerian Career Guidance Quiz System

A comprehensive, branched career assessment tool designed specifically for Nigerian students to discover their ideal career paths, get personalized course recommendations, and understand admission likelihood with salary expectations.

## 🌟 System Overview

### Key Features
- **Smart Branching Logic**: Adaptive quiz flow that shows only relevant questions (~12-15 total)
- **Nigerian Context**: Aligned with JAMB scores, local universities, and job market data
- **Personalized Results**: Course recommendations, institution fit, admission chances, salary expectations
- **Multiple Pathways**: Tech, Business, Arts, Health/Social career tracks
- **Modern UI**: Built with React, Next.js, and Tailwind CSS

### Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Core Questions │───▶│  Branch Analysis │───▶│ Targeted Branch │
│   (10 Questions)│    │  (Interest Tally)│    │  (3-5 Questions)│
└─────────────────┘    └──────────────────┘    └─────────────────┘
                                │
                                ▼
                        ┌─────────────────┐
                        │ Final Questions │
                        │  (2-3 Questions)│
                        └─────────────────┘
                                │
                                ▼
                        ┌─────────────────┐
                        │ Personalized    │
                        │ Results Report  │
                        └─────────────────┘
```

## 📊 Branching Logic

### 1. Core Assessment (Always First)
**10 questions covering:**
- Interest areas (arts, science, business, social)
- Values and priorities
- Budget constraints
- Expected JAMB scores
- Learning preferences
- Career aspirations

### 2. Interest Analysis
After core questions, system tallies responses:
- **A responses (Arts/Creative)** → Arts Branch
- **B responses (Science/Tech)** → Tech Branch  
- **C responses (Business/Leadership)** → Business Branch
- **D responses (Health/Social)** → Health Branch

### 3. Branch-Specific Questions
Each branch asks 3-5 targeted questions:

#### Tech Branch
- Subject preferences (Math, Physics, Biology, ICT)
- Problem-solving approach (coding, hardware, research, design)
- Learning methods (labs, programming, field work)
- Work environment preferences
- Analytical strengths

#### Business Branch
- Project types (startups, management, marketing, finance)
- Work preferences (independent, team leadership, creative, analytical)
- Learning approaches (entrepreneurship, group projects, campaigns, budgets)
- Leadership styles
- College faculty interests

#### Arts Branch
- Creative mediums (visual, writing, performance, fashion)
- Communication styles (visual, verbal, audio, tactile)
- Work environments (studios, media houses, stages, workshops)
- Subject enjoyment
- Creative strengths

#### Health Branch
- Helping preferences (teaching, healthcare, counseling, community programs)
- Learning approaches (reading/teaching, practical care, empathy work, planning)
- Subject interests (education, sciences, social sciences, civic studies)
- Scenario preferences
- Work motivations

### 4. Final Specialization (2-3 Questions)
Deep-dive into specific career paths within chosen field

## 🏗️ Implementation

### File Structure
```
├── contexts/
│   └── quiz-context.tsx          # State management
├── components/career-quiz/
│   ├── QuestionCard.tsx          # Question display component
│   └── ResultsPage.tsx           # Results analysis & display
├── app/career-quiz/
│   └── page.tsx                  # Main quiz page
├── lib/
│   └── quiz-data.ts             # Question bank & recommendations
└── data/
    └── career-quiz-questions.csv # Complete 100+ question database
```

### Key Components

#### 1. Quiz Context (`contexts/quiz-context.tsx`)
- Manages quiz state (answers, current step, branch)
- Handles branching logic
- Calculates dominant interests
- Tracks progress

#### 2. Question Card (`components/career-quiz/QuestionCard.tsx`)
- Displays questions with multiple choice options
- Visual feedback and progress tracking
- Branch-specific styling and categorization
- Smooth transitions between questions

#### 3. Results Analysis (`components/career-quiz/ResultsPage.tsx`)
- Analyzes answer patterns
- Generates personalized recommendations
- Calculates admission likelihood
- Displays salary expectations
- Provides next steps guidance

#### 4. Question Data (`lib/quiz-data.ts`)
- Structured question bank
- Career recommendation templates
- Institution and salary data
- Branching logic rules

### 5. Complete Question Database (`data/career-quiz-questions.csv`)
- 100+ questions organized by batch and category
- Supports import/export for question management
- Includes weighting and targeting information

## 📈 Results Generation

### Analysis Process
1. **Interest Classification**: Tally A/B/C/D responses from core questions
2. **Confidence Calculation**: Percentage of dominant interest responses
3. **JAMB Score Extraction**: From academic expectation question
4. **Budget Analysis**: From affordability question  
5. **Career Readiness**: Composite score based on multiple factors

### Recommendation Categories

#### Course Suggestions
Based on dominant field + branch responses:
- **Tech**: Computer Science, Software Engineering, Data Science, Cybersecurity
- **Business**: Business Administration, Accounting, Marketing, Economics
- **Arts**: Mass Communication, Fine Arts, Graphic Design, Theatre Arts
- **Health**: Medicine, Nursing, Public Health, Psychology

#### Institution Fit
- **Federal Universities**: Low-cost, competitive admission
- **State Universities**: Moderate cost, regional focus
- **Private Universities**: Higher cost, specialized programs
- **International**: Study abroad options

#### Admission Likelihood
Based on JAMB score expectations and budget:
- **Excellent (85%)**: JAMB 300+, strong O-levels
- **Good (70%)**: JAMB 250-300, decent background
- **Moderate (55%)**: JAMB 200-250, average performance
- **Challenging (35%)**: JAMB <200, needs improvement

#### Salary Expectations
Research-backed Nigerian market data:
- **Tech**: ₦200k-₦400k/month entry-level
- **Business**: ₦150k-₦300k/month entry-level  
- **Arts**: ₦80k-₦200k/month + freelance opportunities
- **Health**: ₦100k-₦250k/month entry-level

## 🚀 Usage Instructions

### For Students
1. **Start Assessment**: Answer core questions honestly
2. **Follow Branching**: System automatically routes to relevant questions
3. **Complete Flow**: Answer ~12-15 questions total
4. **Review Results**: Get personalized recommendations
5. **Take Action**: Follow suggested next steps

### For Developers
1. **Clone Repository**: Set up Next.js project
2. **Install Dependencies**: `npm install` or `pnpm install`
3. **Add UI Components**: Ensure shadcn/ui components are available
4. **Configure Context**: Wrap app with QuizProvider
5. **Customize Data**: Modify questions and recommendations as needed

### For Educators/Counselors
1. **Question Management**: Use CSV for bulk question updates
2. **Custom Weighting**: Adjust question weights for different populations
3. **Result Interpretation**: Use confidence scores and detailed breakdowns
4. **Follow-up Guidance**: Leverage next steps recommendations

## 📊 Question Bank Statistics

### Total Questions: 100+
- **Core Questions**: 10 (always asked)
- **Tech Branch**: 15 questions
- **Business Branch**: 15 questions  
- **Arts Branch**: 15 questions
- **Health Branch**: 15 questions
- **Final Specialization**: 30+ questions

### Categories Covered
- Interest assessment
- Skills evaluation
- Values clarification
- Budget constraints
- Academic preparation
- Career aspirations
- Learning preferences
- Work environment fit

## 🔧 Customization Options

### Adding Questions
1. Update `quiz-data.ts` with new questions
2. Add corresponding entries to CSV
3. Ensure proper batch and category assignment
4. Test branching logic

### Modifying Recommendations
1. Edit `careerRecommendations` object in `quiz-data.ts`
2. Update course lists, institutions, salary ranges
3. Adjust admission tips and requirements

### Styling Changes
1. Modify Tailwind classes in components
2. Update color schemes in `getBranchColor()` functions
3. Customize progress indicators and animations

## 🎯 Success Metrics

### User Engagement
- Completion rate >80%
- Average session time: 5-7 minutes
- Return rate for additional assessments

### Accuracy Measures
- Student satisfaction with recommendations
- Actual course enrollment alignment
- Career path satisfaction post-graduation

### Educational Impact
- Reduced decision delay
- Increased career awareness
- Better academic preparation

## 🛠️ Technical Requirements

### Dependencies
- React 18+
- Next.js 14+
- TypeScript
- Tailwind CSS
- shadcn/ui components
- Lucide React (icons)

### Browser Support
- Modern browsers with ES6+ support
- Mobile responsive design
- Progressive Web App capabilities

### Performance
- Fast initial load (<2 seconds)
- Smooth transitions between questions
- Efficient state management
- Optimized for mobile devices

## 📝 Future Enhancements

### Planned Features
- **AI-Powered Analysis**: Machine learning for better predictions
- **Video Integration**: Career professional interviews
- **Skill Assessments**: Practical skill testing
- **Alumni Network**: Connect with graduates in chosen fields
- **Progress Tracking**: Long-term career development monitoring

### Advanced Analytics
- **Cohort Analysis**: Compare results across schools/regions
- **Trend Identification**: Popular career shifts over time
- **Outcome Tracking**: Follow-up on student progress
- **Recommendation Optimization**: Continuous improvement based on feedback

## 📞 Support & Contact

For questions about implementation, customization, or educational use, please refer to the documentation or submit an issue in the repository.

---

*This career guidance system is designed to empower Nigerian students with data-driven insights for their educational and career decisions, addressing the critical need for personalized, culturally relevant guidance in the Nigerian educational context.* 