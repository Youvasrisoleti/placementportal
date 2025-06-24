
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Building, Search } from 'lucide-react';

const Companies: React.FC = () => {
  return (
    <Layout requireAuth={true} allowedRoles={['student']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Companies</h1>
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="Search companies..."
              className="w-full pl-9"
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {['Microsoft', 'Google', 'Amazon', 'TCS', 'Wipro', 'Infosys'].map((company, index) => (
            <Card key={company} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    <div className="bg-blue-100 p-2 rounded-full">
                      <Building className="h-5 w-5 text-placement-primary" />
                    </div>
                    <CardTitle>{company}</CardTitle>
                  </div>
                </div>
                <CardDescription>{['Technology', 'Software', 'IT Services'][index % 3]}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Position:</span>
                    <span className="font-medium">{['Software Engineer', 'Data Scientist', 'Full Stack Developer'][index % 3]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Location:</span>
                    <span className="font-medium">{['Hyderabad', 'Bangalore', 'Chennai'][index % 3]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Package:</span>
                    <span className="font-medium">₹{[12, 15, 18, 8, 7, 9][index]} LPA</span>
                  </div>
                  <div className="pt-4">
                    <Button variant="outline" className="w-full">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Companies;
