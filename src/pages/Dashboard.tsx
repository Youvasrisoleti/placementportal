
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/layout/Layout';
import { usePlacement } from '@/contexts/PlacementContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Users, Calendar, FileText, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    companies, 
    applications, 
    students, 
    getStudentApplications, 
    getCompanyApplications 
  } = usePlacement();

  const renderStudentDashboard = () => {
    const studentId = user?.id || '';
    const studentApplications = getStudentApplications(studentId);
    const pendingApplications = studentApplications.filter(app => app.status === 'pending').length;
    const interviewApplications = studentApplications.filter(app => app.status === 'interview').length;
    const selectedApplications = studentApplications.filter(app => app.status === 'selected').length;
    
    const upcomingInterviews = studentApplications
      .filter(app => app.status === 'interview' && app.interviewDate && new Date(app.interviewDate) >= new Date())
      .sort((a, b) => new Date(a.interviewDate || '').getTime() - new Date(b.interviewDate || '').getTime());
    
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eligible Companies</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companies.length}</div>
              <p className="text-xs text-muted-foreground">
                Companies you are eligible to apply for
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentApplications.length}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <span>{pendingApplications} pending</span>
                <span>•</span>
                <span>{interviewApplications} interviews</span>
                <span>•</span>
                <span>{selectedApplications} selected</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingInterviews.length}</div>
              <p className="text-xs text-muted-foreground">
                Scheduled in the next 7 days
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Prepare for your scheduled interviews</CardDescription>
            </CardHeader>
            <CardContent>
              {upcomingInterviews.length > 0 ? (
                <div className="space-y-4">
                  {upcomingInterviews.slice(0, 3).map(interview => {
                    const company = companies.find(c => c.id === interview.companyId);
                    return (
                      <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            {company?.logo ? (
                              <img src={company.logo} alt={company.name} className="w-6 h-6" />
                            ) : (
                              <Building className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{company?.name}</p>
                            <p className="text-sm text-gray-500">
                              {interview.interviewDate} at {interview.interviewTime}
                            </p>
                          </div>
                        </div>
                        <Link 
                          to={`/interview-prep/${interview.id}`}
                          className="text-sm text-placement-primary hover:underline"
                        >
                          Prepare
                        </Link>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No upcoming interviews scheduled
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Applications</CardTitle>
              <CardDescription>Track your application status</CardDescription>
            </CardHeader>
            <CardContent>
              {studentApplications.length > 0 ? (
                <div className="space-y-4">
                  {studentApplications.slice(0, 5).map(application => {
                    const company = companies.find(c => c.id === application.companyId);
                    return (
                      <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            {company?.logo ? (
                              <img src={company.logo} alt={company.name} className="w-6 h-6" />
                            ) : (
                              <Building className="w-5 h-5 text-gray-500" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{company?.name}</p>
                            <p className="text-xs text-gray-500">Applied on {application.appliedDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span 
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              application.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                              application.status === 'interview' ? 'bg-purple-100 text-purple-800' :
                              application.status === 'selected' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}
                          >
                            {application.status === 'pending' && <Clock className="mr-1 h-3 w-3" />}
                            {application.status === 'approved' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {application.status === 'rejected' && <XCircle className="mr-1 h-3 w-3" />}
                            {application.status === 'interview' && <Calendar className="mr-1 h-3 w-3" />}
                            {application.status === 'selected' && <CheckCircle className="mr-1 h-3 w-3" />}
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No applications submitted yet
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant</CardTitle>
              <CardDescription>Your placement preparation companion</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Link 
                  to="/ai-assistant" 
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">Resume Analysis</h3>
                  <p className="text-sm text-gray-500">Get feedback on your resume</p>
                </Link>
                
                <Link 
                  to="/ai-assistant" 
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">Mock Interview</h3>
                  <p className="text-sm text-gray-500">Practice with AI-generated questions</p>
                </Link>
                
                <Link 
                  to="/ai-assistant" 
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-medium">Selection Prediction</h3>
                  <p className="text-sm text-gray-500">Analyze your chances with companies</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCompanyDashboard = () => {
    const companyId = user?.id || '';
    const companyApplications = getCompanyApplications(companyId);
    const pendingReview = companyApplications.filter(app => app.status === 'pending').length;
    const scheduledInterviews = companyApplications.filter(app => app.status === 'interview').length;
    const selectedCandidates = companyApplications.filter(app => app.status === 'selected').length;
    
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companyApplications.length}</div>
              <p className="text-xs text-muted-foreground">
                Students applied to your company
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Interviews</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{scheduledInterviews}</div>
              <p className="text-xs text-muted-foreground">
                Upcoming candidate interviews
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Selected Candidates</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{selectedCandidates}</div>
              <p className="text-xs text-muted-foreground">
                Students selected for hiring
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Applications Pending Review</CardTitle>
              <CardDescription>Review and schedule interviews with candidates</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReview > 0 ? (
                <div className="space-y-4">
                  {companyApplications
                    .filter(app => app.status === 'pending')
                    .slice(0, 5)
                    .map(application => {
                      const student = students.find(s => s.id === application.studentId);
                      return (
                        <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{student?.name}</p>
                              <p className="text-xs text-gray-500">
                                {student?.branch} • CGPA: {student?.cgpa}
                              </p>
                            </div>
                          </div>
                          <Link 
                            to={`/review-application/${application.id}`}
                            className="text-sm text-placement-primary hover:underline"
                          >
                            Review
                          </Link>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No pending applications to review
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Interviews</CardTitle>
              <CardDescription>Scheduled candidate interviews</CardDescription>
            </CardHeader>
            <CardContent>
              {scheduledInterviews > 0 ? (
                <div className="space-y-4">
                  {companyApplications
                    .filter(app => app.status === 'interview')
                    .slice(0, 5)
                    .map(interview => {
                      const student = students.find(s => s.id === interview.studentId);
                      return (
                        <div key={interview.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{student?.name}</p>
                              <p className="text-sm text-gray-500">
                                {interview.interviewDate} at {interview.interviewTime}
                              </p>
                            </div>
                          </div>
                          <Link 
                            to={`/conduct-interview/${interview.id}`}
                            className="text-sm text-placement-primary hover:underline"
                          >
                            View Details
                          </Link>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No interviews scheduled yet
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Selected Candidates</CardTitle>
              <CardDescription>Students selected for hiring</CardDescription>
            </CardHeader>
            <CardContent>
              {selectedCandidates > 0 ? (
                <div className="space-y-4">
                  {companyApplications
                    .filter(app => app.status === 'selected')
                    .slice(0, 5)
                    .map(application => {
                      const student = students.find(s => s.id === application.studentId);
                      return (
                        <div key={application.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                              <Users className="w-5 h-5 text-gray-500" />
                            </div>
                            <div>
                              <p className="font-medium">{student?.name}</p>
                              <p className="text-xs text-gray-500">
                                {student?.branch} • CGPA: {student?.cgpa}
                              </p>
                            </div>
                          </div>
                          <Link 
                            to={`/student-profile/${student?.id}`}
                            className="text-sm text-placement-primary hover:underline"
                          >
                            View Profile
                          </Link>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-6 text-gray-500">
                  No candidates selected yet
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  const renderCdcDashboard = () => {
    const companyCount = companies.length;
    const studentCount = students.length;
    const applicationCount = applications.length;
    const placedStudents = applications.filter(app => app.status === 'selected').length;
    
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <Building className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{companyCount}</div>
              <p className="text-xs text-muted-foreground">
                Participating in placements
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentCount}</div>
              <p className="text-xs text-muted-foreground">
                Registered for placements
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Applications</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{applicationCount}</div>
              <p className="text-xs text-muted-foreground">
                Total applications submitted
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Placed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{placedStudents}</div>
              <p className="text-xs text-muted-foreground">
                Students with job offers
              </p>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Companies</CardTitle>
              <CardDescription>Companies added to the placement portal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companies.slice(0, 5).map(company => (
                  <div key={company.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                        {company.logo ? (
                          <img src={company.logo} alt={company.name} className="w-6 h-6" />
                        ) : (
                          <Building className="w-5 h-5 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{company.name}</p>
                        <p className="text-xs text-gray-500">
                          {company.jobTitle} • {company.location}
                        </p>
                      </div>
                    </div>
                    <Link 
                      to={`/edit-company/${company.id}`}
                      className="text-sm text-placement-primary hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Placement Statistics</CardTitle>
              <CardDescription>Overview of current placement cycle</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-medium">Application Status</p>
                    <span className="text-xs text-gray-500">Total: {applicationCount}</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Pending</span>
                        <span>{applications.filter(a => a.status === 'pending').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-yellow-500 h-1.5 rounded-full" 
                          style={{ width: `${(applications.filter(a => a.status === 'pending').length / applicationCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Interview</span>
                        <span>{applications.filter(a => a.status === 'interview').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full" 
                          style={{ width: `${(applications.filter(a => a.status === 'interview').length / applicationCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Selected</span>
                        <span>{applications.filter(a => a.status === 'selected').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          style={{ width: `${(applications.filter(a => a.status === 'selected').length / applicationCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Rejected</span>
                        <span>{applications.filter(a => a.status === 'rejected').length}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className="bg-red-500 h-1.5 rounded-full" 
                          style={{ width: `${(applications.filter(a => a.status === 'rejected').length / applicationCount) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/placement-statistics" 
                  className="block text-center text-sm text-placement-primary hover:underline"
                >
                  View detailed statistics
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Manage the placement process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/add-company" 
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <Building className="h-8 w-8 mx-auto mb-2 text-placement-primary" />
                  <h3 className="font-medium">Add Company</h3>
                </Link>
                
                <Link 
                  to="/manage-students" 
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <Users className="h-8 w-8 mx-auto mb-2 text-placement-secondary" />
                  <h3 className="font-medium">Manage Students</h3>
                </Link>
                
                <Link 
                  to="/schedule-drives" 
                  className="block p-4 border rounded-lg hover:bg-gray-50 transition-colors text-center"
                >
                  <Calendar className="h-8 w-8 mx-auto mb-2 text-placement-info" />
                  <h3 className="font-medium">Schedule Drives</h3>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        
        {user?.role === 'student' && renderStudentDashboard()}
        {user?.role === 'company' && renderCompanyDashboard()}
        {user?.role === 'cdc' && renderCdcDashboard()}
      </div>
    </Layout>
  );
};

export default Dashboard;
