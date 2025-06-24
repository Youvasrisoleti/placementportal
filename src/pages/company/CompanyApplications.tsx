
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, UserCheck, UserMinus, Clock } from 'lucide-react';
import { usePlacement } from '@/contexts/PlacementContext';
import { useAuth } from '@/contexts/AuthContext';

const CompanyApplications: React.FC = () => {
  const { user } = useAuth();
  const { applications, students, getStudentById, updateApplicationStatus } = usePlacement();
  
  // Filter applications for the current company
  const companyApplications = applications.filter(app => app.companyId === user?.id);
  
  return (
    <Layout requireAuth={true} allowedRoles={['company']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Applications</h1>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="w-full pl-9"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-500" />
                <span>Pending</span>
                <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {companyApplications.filter(app => app.status === 'pending').length}
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="h-5 w-5 text-green-500" />
                <span>Approved</span>
                <span className="ml-auto bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {companyApplications.filter(app => app.status === 'approved' || app.status === 'interview').length}
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <UserMinus className="h-5 w-5 text-red-500" />
                <span>Rejected</span>
                <span className="ml-auto bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {companyApplications.filter(app => app.status === 'rejected').length}
                </span>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>All Applications</CardTitle>
          </CardHeader>
          <CardContent>
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
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {companyApplications.map((application) => {
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            application.status === 'approved' || application.status === 'interview' ? 'bg-green-100 text-green-800' : 
                            application.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex space-x-2">
                            {application.status === 'pending' && (
                              <>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={() => updateApplicationStatus(application.id, 'approved')}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-600 border-red-600 hover:bg-red-50"
                                  onClick={() => updateApplicationStatus(application.id, 'rejected')}
                                >
                                  Reject
                                </Button>
                              </>
                            )}
                            {application.status === 'approved' && (
                              <Button 
                                variant="outline" 
                                size="sm"
                              >
                                Schedule Interview
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                            >
                              View Details
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CompanyApplications;
