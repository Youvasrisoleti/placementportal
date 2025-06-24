
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarIcon, Clock, UserCheck } from 'lucide-react';
import { usePlacement } from '@/contexts/PlacementContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const ScheduleInterviews: React.FC = () => {
  const { user } = useAuth();
  const { applications, getStudentById, scheduleInterview } = usePlacement();
  
  // Filter applications for the current company that have been approved but not scheduled for interview
  const approvedApplications = applications.filter(
    app => app.companyId === user?.id && app.status === 'approved'
  );
  
  // Filter applications for the current company that have scheduled interviews
  const scheduledInterviews = applications.filter(
    app => app.companyId === user?.id && app.status === 'interview'
  );
  
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedApplication, setSelectedApplication] = useState<string | null>(null);
  
  const handleSchedule = (applicationId: string) => {
    if (!selectedDate || !selectedTime) {
      toast.error('Please select both date and time');
      return;
    }
    
    scheduleInterview(applicationId, selectedDate, selectedTime);
    setSelectedApplication(null);
    setSelectedDate('');
    setSelectedTime('');
  };
  
  return (
    <Layout requireAuth={true} allowedRoles={['company']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Schedule Interviews</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-placement-primary" />
              <span>Approved Candidates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {approvedApplications.length === 0 ? (
              <p className="text-gray-500">No approved candidates ready for interview scheduling.</p>
            ) : (
              <div className="border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Branch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        CGPA
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Applied On
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {approvedApplications.map((application) => {
                      const student = getStudentById(application.studentId);
                      return (
                        <tr key={application.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student?.branch}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student?.cgpa}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {application.appliedDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {selectedApplication === application.id ? (
                              <div className="flex flex-col space-y-2">
                                <div className="flex space-x-2">
                                  <div className="relative flex items-center">
                                    <CalendarIcon className="absolute left-2 h-4 w-4 text-gray-500" />
                                    <Input
                                      type="date"
                                      value={selectedDate}
                                      onChange={(e) => setSelectedDate(e.target.value)}
                                      className="pl-8"
                                    />
                                  </div>
                                  <div className="relative flex items-center">
                                    <Clock className="absolute left-2 h-4 w-4 text-gray-500" />
                                    <Input
                                      type="time"
                                      value={selectedTime}
                                      onChange={(e) => setSelectedTime(e.target.value)}
                                      className="pl-8"
                                    />
                                  </div>
                                </div>
                                <div className="flex space-x-2">
                                  <Button 
                                    variant="default" 
                                    size="sm"
                                    className="w-full"
                                    onClick={() => handleSchedule(application.id)}
                                  >
                                    Confirm
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="w-full"
                                    onClick={() => setSelectedApplication(null)}
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => setSelectedApplication(application.id)}
                              >
                                Schedule Interview
                              </Button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            {scheduledInterviews.length === 0 ? (
              <p className="text-gray-500">No interviews have been scheduled yet.</p>
            ) : (
              <div className="border rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Branch
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {scheduledInterviews.map((interview) => {
                      const student = getStudentById(interview.studentId);
                      return (
                        <tr key={interview.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {student?.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student?.branch}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {interview.interviewDate}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {interview.interviewTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              Reschedule
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ScheduleInterviews;
