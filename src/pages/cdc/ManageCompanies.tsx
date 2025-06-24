
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ManageCompanies: React.FC = () => {
  return (
    <Layout requireAuth={true} allowedRoles={['cdc']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Manage Companies</h1>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample company cards */}
          {['Microsoft', 'Google', 'Amazon'].map((company) => (
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
                <CardDescription>Technology</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <span className="font-medium text-green-600">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Positions:</span>
                    <span className="font-medium">Software Engineer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Eligible Students:</span>
                    <span className="font-medium">120</span>
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

export default ManageCompanies;
