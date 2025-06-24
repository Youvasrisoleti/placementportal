
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Bot, FileText, MessageSquare, BarChart } from 'lucide-react';

const AIAssistant: React.FC = () => {
  const { analyzeResume, generateMockInterviewQuestions, predictSelectionChance, askQuestion } = useAI();
  
  // Resume Analysis Tab
  const [resumeText, setResumeText] = useState('');
  const [resumeAnalysis, setResumeAnalysis] = useState('');
  const [isAnalyzingResume, setIsAnalyzingResume] = useState(false);
  
  // Mock Interview Tab
  const [jobDescription, setJobDescription] = useState('');
  const [interviewResumeText, setInterviewResumeText] = useState('');
  const [mockQuestions, setMockQuestions] = useState<string[]>([]);
  const [isGeneratingQuestions, setIsGeneratingQuestions] = useState(false);
  
  // Selection Prediction Tab
  const [predictionJobDesc, setPredictionJobDesc] = useState('');
  const [predictionResumeText, setPredictionResumeText] = useState('');
  const [predictionScore, setPredictionScore] = useState<number | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  
  // Chatbot Tab
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAsking, setIsAsking] = useState(false);
  
  const handleAnalyzeResume = async () => {
    if (!resumeText.trim()) return;
    
    setIsAnalyzingResume(true);
    try {
      const analysis = await analyzeResume(resumeText);
      setResumeAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing resume:', error);
    } finally {
      setIsAnalyzingResume(false);
    }
  };
  
  const handleGenerateQuestions = async () => {
    if (!jobDescription.trim() || !interviewResumeText.trim()) return;
    
    setIsGeneratingQuestions(true);
    try {
      const questions = await generateMockInterviewQuestions(jobDescription, interviewResumeText);
      setMockQuestions(questions);
    } catch (error) {
      console.error('Error generating questions:', error);
    } finally {
      setIsGeneratingQuestions(false);
    }
  };
  
  const handlePredictChance = async () => {
    if (!predictionJobDesc.trim() || !predictionResumeText.trim()) return;
    
    setIsPredicting(true);
    try {
      const score = await predictSelectionChance(predictionResumeText, predictionJobDesc);
      setPredictionScore(score);
    } catch (error) {
      console.error('Error predicting selection chance:', error);
    } finally {
      setIsPredicting(false);
    }
  };
  
  const handleAskQuestion = async () => {
    if (!question.trim()) return;
    
    setIsAsking(true);
    try {
      const response = await askQuestion(question);
      setAnswer(response);
    } catch (error) {
      console.error('Error asking question:', error);
    } finally {
      setIsAsking(false);
    }
  };
  
  return (
    <Layout>
      <div className="py-6">
        <div className="flex items-center mb-6">
          <Bot className="h-6 w-6 mr-2 text-placement-primary" />
          <h1 className="text-2xl font-bold">AI Assistant</h1>
        </div>
        
        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </TabsTrigger>
            <TabsTrigger value="resume" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span>Resume Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="interview" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              <span>Mock Interview</span>
            </TabsTrigger>
            <TabsTrigger value="prediction" className="flex items-center gap-2">
              <BarChart className="h-4 w-4" />
              <span>Selection Prediction</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Chatbot Tab */}
          <TabsContent value="chat">
            <Card>
              <CardHeader>
                <CardTitle>Ask AI Assistant</CardTitle>
                <CardDescription>
                  Get help with resume building, interview preparation, or placement process
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Ask a question about placements, resume building, or interview preparation..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button onClick={handleAskQuestion} disabled={isAsking || !question.trim()}>
                    {isAsking ? 'Processing...' : 'Ask Question'}
                  </Button>
                </div>
                
                {answer && (
                  <Card className="mt-4 bg-muted/50">
                    <CardContent className="pt-6">
                      <p className="whitespace-pre-line">{answer}</p>
                    </CardContent>
                  </Card>
                )}
                
                <div className="mt-4">
                  <p className="text-sm font-medium mb-2">Suggested Questions:</p>
                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => setQuestion("How can I improve my resume for tech companies?")}
                    >
                      How can I improve my resume for tech companies?
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => setQuestion("What should I wear to a placement interview?")}
                    >
                      What should I wear to a placement interview?
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left h-auto py-2"
                      onClick={() => setQuestion("How do I prepare for technical interviews?")}
                    >
                      How do I prepare for technical interviews?
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Resume Analysis Tab */}
          <TabsContent value="resume">
            <Card>
              <CardHeader>
                <CardTitle>Resume Analysis</CardTitle>
                <CardDescription>
                  Get AI-powered feedback on your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Textarea
                    placeholder="Paste your resume text here..."
                    value={resumeText}
                    onChange={(e) => setResumeText(e.target.value)}
                    className="min-h-[200px]"
                  />
                  <Button 
                    onClick={handleAnalyzeResume} 
                    disabled={isAnalyzingResume || !resumeText.trim()}
                  >
                    {isAnalyzingResume ? 'Analyzing...' : 'Analyze Resume'}
                  </Button>
                </div>
                
                {resumeAnalysis && (
                  <Card className="mt-4 bg-muted/50">
                    <CardContent className="pt-6">
                      <div className="prose prose-sm max-w-none">
                        <div dangerouslySetInnerHTML={{ __html: resumeAnalysis.replace(/\n/g, '<br>') }} />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Mock Interview Tab */}
          <TabsContent value="interview">
            <Card>
              <CardHeader>
                <CardTitle>Mock Interview Questions</CardTitle>
                <CardDescription>
                  Generate interview questions based on job description and your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Description</label>
                    <Textarea
                      placeholder="Paste the job description here..."
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Resume</label>
                    <Textarea
                      placeholder="Paste your resume text here..."
                      value={interviewResumeText}
                      onChange={(e) => setInterviewResumeText(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handleGenerateQuestions} 
                  disabled={isGeneratingQuestions || !jobDescription.trim() || !interviewResumeText.trim()}
                  className="mt-2"
                >
                  {isGeneratingQuestions ? 'Generating...' : 'Generate Interview Questions'}
                </Button>
                
                {mockQuestions.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium mb-2">Interview Questions:</h3>
                    <div className="space-y-3">
                      {mockQuestions.map((question, index) => (
                        <Card key={index} className="bg-muted/50">
                          <CardContent className="pt-6">
                            <p className="font-medium">Q{index + 1}: {question}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Selection Prediction Tab */}
          <TabsContent value="prediction">
            <Card>
              <CardHeader>
                <CardTitle>Selection Prediction</CardTitle>
                <CardDescription>
                  Analyze your chances of selection based on the job description and your resume
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Job Description</label>
                    <Textarea
                      placeholder="Paste the job description here..."
                      value={predictionJobDesc}
                      onChange={(e) => setPredictionJobDesc(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Your Resume</label>
                    <Textarea
                      placeholder="Paste your resume text here..."
                      value={predictionResumeText}
                      onChange={(e) => setPredictionResumeText(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                </div>
                
                <Button 
                  onClick={handlePredictChance} 
                  disabled={isPredicting || !predictionJobDesc.trim() || !predictionResumeText.trim()}
                  className="mt-2"
                >
                  {isPredicting ? 'Analyzing...' : 'Predict Selection Chance'}
                </Button>
                
                {predictionScore !== null && (
                  <Card className="mt-4 bg-muted/50">
                    <CardContent className="pt-6">
                      <h3 className="text-lg font-medium mb-2">Your Selection Prediction:</h3>
                      <div className="mb-2">
                        <Progress value={predictionScore} className="h-2.5" />
                      </div>
                      <p className="text-center font-bold text-2xl">{predictionScore}%</p>
                      
                      <div className="mt-4 space-y-2 text-sm">
                        <p className="font-medium">Analysis:</p>
                        {predictionScore >= 80 ? (
                          <p>Your profile is a strong match for this position. You have an excellent chance of selection.</p>
                        ) : predictionScore >= 65 ? (
                          <p>Your profile is a good match for this position. Consider highlighting relevant skills to improve your chances.</p>
                        ) : (
                          <p>Your profile may need improvement to match this position's requirements. Focus on gaining relevant skills and experience.</p>
                        )}
                        
                        <p className="font-medium mt-3">Improvement Tips:</p>
                        <ul className="list-disc list-inside space-y-1">
                          <li>Tailor your resume to match the specific job requirements</li>
                          <li>Highlight relevant projects and achievements</li>
                          <li>Acquire certifications related to the required skills</li>
                          <li>Practice for technical interviews in the required domains</li>
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default AIAssistant;
