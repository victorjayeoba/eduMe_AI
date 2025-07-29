'use client';

import { useQuiz } from '@/contexts/quiz-context';
import { careerRecommendations } from '@/lib/quiz-data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  GraduationCap, 
  TrendingUp, 
  MapPin, 
  DollarSign, 
  Target, 
  BookOpen,
  Users,
  Award,
  Download,
  Share
} from 'lucide-react';

interface CareerAnalysis {
  dominantField: 'tech' | 'business' | 'arts' | 'health';
  confidence: number;
  recommendedCourses: string[];
  institutions: string[];
  salaryRange: string;
  admissionTips: string;
  jamb_score_from_answers: number;
  budget_level: 'federal' | 'state' | 'private' | 'abroad';
  career_readiness: number;
}

export function ResultsPage() {
  const { state, resetQuiz } = useQuiz();

  const analyzeAnswers = (): CareerAnalysis => {
    const coreAnswers = state.answers.filter(a => a.questionId.startsWith('core'));
    const branchAnswers = state.answers.filter(a => !a.questionId.startsWith('core'));
    
    // Count option codes to determine dominant interest
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    coreAnswers.forEach(answer => {
      counts[answer.optionCode]++;
    });

    // Determine field based on dominant interest
    const maxCount = Math.max(...Object.values(counts));
    const confidence = (maxCount / coreAnswers.length) * 100;
    
    let dominantField: 'tech' | 'business' | 'arts' | 'health' = 'tech';
    if (counts.A === maxCount) dominantField = 'arts';
    else if (counts.B === maxCount) dominantField = 'tech';
    else if (counts.C === maxCount) dominantField = 'business';
    else if (counts.D === maxCount) dominantField = 'health';

    // Extract JAMB score expectation
    const jambAnswer = state.answers.find(a => a.questionId === 'core_05');
    let jamb_score = 250; // default
    if (jambAnswer) {
      switch (jambAnswer.optionCode) {
        case 'A': jamb_score = 180; break;
        case 'B': jamb_score = 225; break;
        case 'C': jamb_score = 275; break;
        case 'D': jamb_score = 320; break;
      }
    }

    // Extract budget level
    const budgetAnswer = state.answers.find(a => a.questionId === 'core_04');
    let budget: 'federal' | 'state' | 'private' | 'abroad' = 'federal';
    if (budgetAnswer) {
      switch (budgetAnswer.optionCode) {
        case 'A': budget = 'federal'; break;
        case 'B': budget = 'state'; break;
        case 'C': budget = 'private'; break;
        case 'D': budget = 'abroad'; break;
      }
    }

    // Calculate career readiness based on various factors
    const career_readiness = Math.min(
      (confidence + (jamb_score / 350 * 100) + 50) / 3,
      100
    );

    const fieldData = careerRecommendations[dominantField];
    
    return {
      dominantField,
      confidence,
      recommendedCourses: fieldData.courses,
      institutions: fieldData.institutions,
      salaryRange: fieldData.salaryRange,
      admissionTips: fieldData.admissionTips,
      jamb_score_from_answers: jamb_score,
      budget_level: budget,
      career_readiness
    };
  };

  const analysis = analyzeAnswers();

  const getFieldIcon = (field: string) => {
    switch (field) {
      case 'tech': return '💻';
      case 'business': return '💼';
      case 'arts': return '🎨';
      case 'health': return '🏥';
      default: return '🎯';
    }
  };

  const getFieldColor = (field: string) => {
    switch (field) {
      case 'tech': return 'from-green-500 to-emerald-600';
      case 'business': return 'from-purple-500 to-violet-600';
      case 'arts': return 'from-pink-500 to-rose-600';
      case 'health': return 'from-orange-500 to-amber-600';
      default: return 'from-blue-500 to-indigo-600';
    }
  };

  const getAdmissionLikelihood = () => {
    const score = analysis.jamb_score_from_answers;
    const budget = analysis.budget_level;
    
    if (score >= 300) return { level: 'Excellent', percentage: 85, color: 'bg-green-500' };
    if (score >= 250) return { level: 'Good', percentage: 70, color: 'bg-blue-500' };
    if (score >= 200) return { level: 'Moderate', percentage: 55, color: 'bg-yellow-500' };
    return { level: 'Challenging', percentage: 35, color: 'bg-red-500' };
  };

  const admissionLikelihood = getAdmissionLikelihood();

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center">
        <div className={`inline-block p-6 rounded-full bg-gradient-to-r ${getFieldColor(analysis.dominantField)} mb-4`}>
          <span className="text-6xl">{getFieldIcon(analysis.dominantField)}</span>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Your Career Path: {analysis.dominantField.charAt(0).toUpperCase() + analysis.dominantField.slice(1)}
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Based on your responses, here are your personalized recommendations
        </p>
        <div className="flex justify-center space-x-4">
          <Badge variant="secondary" className="px-4 py-2">
            {Math.round(analysis.confidence)}% Match Confidence
          </Badge>
          <Badge variant="outline" className="px-4 py-2">
            {state.answers.length} Questions Answered
          </Badge>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Career Readiness</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(analysis.career_readiness)}%</div>
            <Progress value={analysis.career_readiness} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Expected JAMB Score</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analysis.jamb_score_from_answers}</div>
            <p className="text-xs text-muted-foreground">Based on your confidence level</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Admission Likelihood</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{admissionLikelihood.level}</div>
            <div className="flex items-center mt-2">
              <div className={`h-2 rounded-full ${admissionLikelihood.color} mr-2`} 
                   style={{ width: `${admissionLikelihood.percentage}%` }}></div>
              <span className="text-xs">{admissionLikelihood.percentage}%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recommended Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Recommended Courses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {analysis.recommendedCourses.map((course, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                <h4 className="font-semibold text-gray-800">{course}</h4>
                <div className="flex items-center mt-2 text-sm text-gray-600">
                  <GraduationCap className="h-4 w-4 mr-1" />
                  <span>4-5 years</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Institution & Financial Info */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MapPin className="h-5 w-5" />
              <span>Suitable Institutions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analysis.institutions.map((institution, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">{institution}</span>
                  <Badge variant="outline" className="text-xs">
                    {analysis.budget_level.charAt(0).toUpperCase() + analysis.budget_level.slice(1)}
                  </Badge>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>💡 Admission Tip:</strong> {analysis.admissionTips}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5" />
              <span>Expected Earnings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center mb-4">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {analysis.salaryRange}
              </div>
              <p className="text-sm text-gray-600">Entry-level salary range</p>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">1st Year</span>
                <span className="font-medium">₦120k - ₦200k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">3-5 Years</span>
                <span className="font-medium">₦250k - ₦500k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Senior Level</span>
                <span className="font-medium">₦500k - ₦1M+</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button 
          onClick={resetQuiz}
          variant="outline"
          size="lg"
          className="min-w-[200px]"
        >
          Take Quiz Again
        </Button>
        <Button 
          size="lg"
          className="min-w-[200px] bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          onClick={() => window.print()}
        >
          <Download className="h-4 w-4 mr-2" />
          Save Results
        </Button>
        <Button 
          variant="secondary"
          size="lg"
          className="min-w-[200px]"
          onClick={() => {
            if (navigator.share) {
              navigator.share({
                title: 'My Career Quiz Results',
                text: `I discovered my ideal career path: ${analysis.dominantField}!`,
                url: window.location.href
              });
            }
          }}
        >
          <Share className="h-4 w-4 mr-2" />
          Share Results
        </Button>
      </div>

      {/* Next Steps */}
      <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
        <CardHeader>
          <CardTitle>🚀 Next Steps</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="font-medium">Research Your Chosen Courses</p>
              <p className="text-sm text-gray-600">Look deeper into curriculum, entry requirements, and career prospects</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="font-medium">Prepare for JAMB/Admissions</p>
              <p className="text-sm text-gray-600">Focus on relevant subjects and aim for your target score of {analysis.jamb_score_from_answers}+</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <span className="w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="font-medium">Build Relevant Skills</p>
              <p className="text-sm text-gray-600">Start developing skills in your chosen field through online courses or practical projects</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 