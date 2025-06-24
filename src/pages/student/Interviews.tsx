
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, MapPin, Video } from 'lucide-react';

const Interviews: React.FC = () => {
  return (
    <Layout requireAuth={true} allowedRoles={['student']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Upcoming Interviews</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { 
              company: 'Microsoft', 
              position: 'Software Engineer', 
              date: '15 Apr 2023', 
              time: '10:00 AM',
              type: 'Virtual',
              round: 'Technical Round'
            },
            { 
              company: 'Google', 
              position: 'Data Scientist', 
              date: '18 Apr 2023', 
              time: '2:30 PM',
              type: 'In-person',
              round: 'HR Round'
            },
          ].map((interview, idx) => (
            <Card key={idx}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{interview.company}</CardTitle>
                    <p className="text-gray-500">{interview.position}</p>
                  </div>
                  <Button variant="outline" size="sm">Prepare</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>{interview.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span>{interview.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    {interview.type === 'Virtual' ? (
                      <Video className="h-4 w-4 text-gray-500" />
                    ) : (
                      <MapPin className="h-4 w-4 text-gray-500" />
                    )}
                    <span>{interview.type} Interview</span>
                  </div>
                  <div className="pt-2">
                    <span className="text-xs text-gray-500 font-medium">{interview.round}</span>
                    <div className="mt-2 flex gap-2">
                      {interview.type === 'Virtual' ? (
                        <Button className="w-full">Join Meeting</Button>
                      ) : (
                        <Button className="w-full">View Location</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Past Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { company: 'TCS', position: 'Web Developer', date: '02 Apr 2023', type: 'Technical', status: 'completed' },
                    { company: 'Infosys', position: 'Java Developer', date: '28 Mar 2023', type: 'HR', status: 'completed' },
                  ].map((interview, idx) => (
                    <tr key={idx}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{interview.company}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{interview.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                          Completed
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Interviews;
