
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from 'sonner';

export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  eligibilityCriteria: {
    cgpa: number;
    branches: string[];
    backlogAllowed: boolean;
  };
  deadlineDate: string;
  jobTitle: string;
  jobDescription: string;
  package: string;
  location: string;
  rounds: string[];
}

export interface Application {
  id: string;
  studentId: string;
  companyId: string;
  status: 'pending' | 'approved' | 'rejected' | 'selected' | 'interview';
  appliedDate: string;
  currentRound?: number;
  feedback?: string[];
  interviewDate?: string;
  interviewTime?: string;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  branch: string;
  cgpa: number;
  year: number;
  hasBacklog: boolean;
  resumeUrl: string;
}

interface PlacementContextType {
  companies: Company[];
  applications: Application[];
  students: Student[];
  addCompany: (company: Omit<Company, 'id'>) => void;
  editCompany: (id: string, company: Partial<Company>) => void;
  applyToCompany: (studentId: string, companyId: string) => void;
  withdrawApplication: (applicationId: string) => void;
  updateApplicationStatus: (applicationId: string, status: Application['status'], feedback?: string) => void;
  scheduleInterview: (applicationId: string, date: string, time: string) => void;
  getEligibleCompanies: (student: Student) => Company[];
  getStudentApplications: (studentId: string) => Application[];
  getCompanyApplications: (companyId: string) => Application[];
  getStudentById: (id: string) => Student | undefined;
  getCompanyById: (id: string) => Company | undefined;
  getApplicationById: (id: string) => Application | undefined;
}

// Mock data
const MOCK_COMPANIES: Company[] = [
  {
    id: '1',
    name: 'Microsoft',
    logo: 'https://logo.clearbit.com/microsoft.com',
    description: 'Microsoft Corporation is an American multinational technology company producing software, consumer electronics, and related services.',
    eligibilityCriteria: {
      cgpa: 7.5,
      branches: ['CSE', 'IT', 'ECE'],
      backlogAllowed: false,
    },
    deadlineDate: '2025-05-15',
    jobTitle: 'Software Development Engineer',
    jobDescription: 'Developing and maintaining Microsoft software and services.',
    package: '24 LPA',
    location: 'Hyderabad',
    rounds: ['Online Assessment', 'Technical Interview', 'HR Interview']
  },
  {
    id: '2',
    name: 'Google',
    logo: 'https://logo.clearbit.com/google.com',
    description: 'Google LLC is an American multinational technology company that focuses on search engine technology, online advertising, cloud computing, and more.',
    eligibilityCriteria: {
      cgpa: 8.0,
      branches: ['CSE', 'IT'],
      backlogAllowed: false,
    },
    deadlineDate: '2025-05-20',
    jobTitle: 'Software Engineer',
    jobDescription: 'Working on Google products and services.',
    package: '28 LPA',
    location: 'Bangalore',
    rounds: ['Online Assessment', 'Technical Interview 1', 'Technical Interview 2', 'HR Interview']
  },
  {
    id: '3',
    name: 'Amazon',
    logo: 'https://logo.clearbit.com/amazon.com',
    description: 'Amazon.com, Inc. is an American multinational technology company focusing on e-commerce, cloud computing, digital streaming, and artificial intelligence.',
    eligibilityCriteria: {
      cgpa: 7.0,
      branches: ['CSE', 'IT', 'ECE', 'EEE', 'MECH'],
      backlogAllowed: true,
    },
    deadlineDate: '2025-05-25',
    jobTitle: 'SDE Intern',
    jobDescription: 'Internship opportunity with Amazon.',
    package: '15 LPA',
    location: 'Hyderabad',
    rounds: ['Online Test', 'Technical Interview', 'Bar Raiser']
  }
];

const MOCK_STUDENTS: Student[] = [
  {
    id: '1',
    name: 'John Student',
    rollNumber: '19A91A0500',
    branch: 'CSE',
    cgpa: 8.5,
    year: 4,
    hasBacklog: false,
    resumeUrl: '/resume.pdf'
  },
  {
    id: '2',
    name: 'Jane Doe',
    rollNumber: '19A91A0501',
    branch: 'IT',
    cgpa: 7.8,
    year: 4,
    hasBacklog: false,
    resumeUrl: '/resume2.pdf'
  },
  {
    id: '3',
    name: 'Bob Smith',
    rollNumber: '19A91A0502',
    branch: 'ECE',
    cgpa: 6.9,
    year: 4,
    hasBacklog: true,
    resumeUrl: '/resume3.pdf'
  }
];

const MOCK_APPLICATIONS: Application[] = [
  {
    id: '1',
    studentId: '1',
    companyId: '1',
    status: 'approved',
    appliedDate: '2025-04-05',
    currentRound: 1,
    feedback: ['Good aptitude skills', 'Needs improvement in problem-solving'],
    interviewDate: '2025-04-20',
    interviewTime: '10:00 AM'
  },
  {
    id: '2',
    studentId: '1',
    companyId: '2',
    status: 'pending',
    appliedDate: '2025-04-07'
  },
  {
    id: '3',
    studentId: '2',
    companyId: '1',
    status: 'interview',
    appliedDate: '2025-04-06',
    currentRound: 2,
    interviewDate: '2025-04-22',
    interviewTime: '2:00 PM'
  }
];

const PlacementContext = createContext<PlacementContextType | undefined>(undefined);

export const PlacementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [companies, setCompanies] = useState<Company[]>(MOCK_COMPANIES);
  const [applications, setApplications] = useState<Application[]>(MOCK_APPLICATIONS);
  const [students, setStudents] = useState<Student[]>(MOCK_STUDENTS);

  const addCompany = (company: Omit<Company, 'id'>) => {
    const newCompany = {
      ...company,
      id: Date.now().toString(),
    };
    setCompanies([...companies, newCompany]);
    toast.success(`Added ${company.name} successfully`);
  };

  const editCompany = (id: string, company: Partial<Company>) => {
    setCompanies(companies.map(c => 
      c.id === id ? { ...c, ...company } : c
    ));
    toast.success(`Updated company successfully`);
  };

  const applyToCompany = (studentId: string, companyId: string) => {
    // Check if student already applied
    const existingApplication = applications.find(
      app => app.studentId === studentId && app.companyId === companyId
    );
    
    if (existingApplication) {
      toast.error('You have already applied to this company');
      return;
    }

    const newApplication: Application = {
      id: Date.now().toString(),
      studentId,
      companyId,
      status: 'pending',
      appliedDate: new Date().toISOString().split('T')[0],
    };

    setApplications([...applications, newApplication]);
    toast.success('Application submitted successfully');
  };

  const withdrawApplication = (applicationId: string) => {
    setApplications(applications.filter(app => app.id !== applicationId));
    toast.success('Application withdrawn successfully');
  };

  const updateApplicationStatus = (applicationId: string, status: Application['status'], feedback?: string) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        const updatedApp = { ...app, status };
        
        if (feedback) {
          updatedApp.feedback = [...(app.feedback || []), feedback];
        }
        
        return updatedApp;
      }
      return app;
    }));
    
    toast.success(`Application status updated to ${status}`);
  };

  const scheduleInterview = (applicationId: string, date: string, time: string) => {
    setApplications(applications.map(app => {
      if (app.id === applicationId) {
        return {
          ...app,
          status: 'interview',
          interviewDate: date,
          interviewTime: time,
        };
      }
      return app;
    }));
    
    toast.success('Interview scheduled successfully');
  };

  const getEligibleCompanies = (student: Student): Company[] => {
    return companies.filter(company => {
      const criteria = company.eligibilityCriteria;
      return (
        student.cgpa >= criteria.cgpa &&
        criteria.branches.includes(student.branch) &&
        (criteria.backlogAllowed || !student.hasBacklog)
      );
    });
  };

  const getStudentApplications = (studentId: string): Application[] => {
    return applications.filter(app => app.studentId === studentId);
  };

  const getCompanyApplications = (companyId: string): Application[] => {
    return applications.filter(app => app.companyId === companyId);
  };

  const getStudentById = (id: string): Student | undefined => {
    return students.find(student => student.id === id);
  };

  const getCompanyById = (id: string): Company | undefined => {
    return companies.find(company => company.id === id);
  };

  const getApplicationById = (id: string): Application | undefined => {
    return applications.find(app => app.id === id);
  };

  return (
    <PlacementContext.Provider value={{
      companies,
      applications,
      students,
      addCompany,
      editCompany,
      applyToCompany,
      withdrawApplication,
      updateApplicationStatus,
      scheduleInterview,
      getEligibleCompanies,
      getStudentApplications,
      getCompanyApplications,
      getStudentById,
      getCompanyById,
      getApplicationById,
    }}>
      {children}
    </PlacementContext.Provider>
  );
};

export const usePlacement = () => {
  const context = useContext(PlacementContext);
  if (context === undefined) {
    throw new Error('usePlacement must be used within a PlacementProvider');
  }
  return context;
};
