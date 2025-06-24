
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

interface AIContextType {
  analyzeResume: (resumeText: string) => Promise<string>;
  generateMockInterviewQuestions: (jobDescription: string, resumeText: string) => Promise<string[]>;
  predictSelectionChance: (resumeText: string, jobDescription: string) => Promise<number>;
  askQuestion: (question: string) => Promise<string>;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Mock AI service functions
  const analyzeResume = async (resumeText: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return `
      ## Resume Analysis
      
      ### Strengths
      - Strong technical skills in React, Node.js
      - Good project experience with 2 major projects
      - Internship experience at a tech company
      
      ### Improvement Areas
      - Consider adding more quantifiable achievements
      - Expand on leadership experiences
      - Add section on soft skills
      
      ### Recommendations
      - Highlight problem-solving skills with specific examples
      - Add GitHub/portfolio links if available
      - Tailor resume to specific job descriptions
    `;
  };

  const generateMockInterviewQuestions = async (jobDescription: string, resumeText: string): Promise<string[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return [
      "Tell me about a challenging project you worked on and how you overcame the obstacles.",
      "How do you stay updated with the latest technologies in your field?",
      "Explain your experience with React and component-based architecture.",
      "How would you optimize a web application for performance?",
      "Describe a situation where you had to learn a new technology quickly.",
      "How do you approach debugging a complex issue?",
      "What experience do you have with agile methodologies?",
      "How do you handle conflicts in a team environment?",
      "What interests you about our company specifically?",
      "Where do you see yourself professionally in 5 years?"
    ];
  };

  const predictSelectionChance = async (resumeText: string, jobDescription: string): Promise<number> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Return a random percentage between 55 and 90
    return Math.floor(Math.random() * 36) + 55;
  };

  const askQuestion = async (question: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple rule-based responses
    if (question.toLowerCase().includes('resume')) {
      return "A good resume should be concise (1-2 pages), highlight your relevant skills and experiences, quantify achievements when possible, and be tailored to the specific job you're applying for. Make sure to proofread carefully and use a clean, professional format.";
    } else if (question.toLowerCase().includes('interview')) {
      return "To prepare for technical interviews, research the company, practice common interview questions, review your resume, prepare questions to ask the interviewer, and practice your communication skills. It's also helpful to do mock interviews and get feedback from peers or mentors.";
    } else if (question.toLowerCase().includes('dress code') || question.toLowerCase().includes('wear')) {
      return "For placement interviews, business formal attire is usually appropriate. For men, this means a suit or dress pants with a formal shirt and tie. For women, a formal dress, skirt and blouse, or pantsuit is suitable. When in doubt, it's better to be slightly overdressed than underdressed.";
    } else {
      return "I don't have specific information about that. Please ask about resume building, interview preparation, or the placement process for more detailed assistance.";
    }
  };

  return (
    <AIContext.Provider value={{
      analyzeResume,
      generateMockInterviewQuestions,
      predictSelectionChance,
      askQuestion,
    }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAI = () => {
  const context = useContext(AIContext);
  if (context === undefined) {
    throw new Error('useAI must be used within an AIProvider');
  }
  return context;
};
