
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart, LineChart, PieChart } from '@/components/ui/charts';

const PlacementStatistics: React.FC = () => {
  return (
    <Layout requireAuth={true} allowedRoles={['cdc']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Placement Statistics</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Students</CardTitle>
              <CardDescription>Registered for placements</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">450</div>
              <p className="text-sm text-gray-500 mt-1">+15% from last year</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Placed Students</CardTitle>
              <CardDescription>Successfully placed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">320</div>
              <p className="text-sm text-green-600 mt-1">71% placement rate</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Highest Package</CardTitle>
              <CardDescription>Annual CTC</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">₹42 LPA</div>
              <p className="text-sm text-gray-500 mt-1">Microsoft</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="by-branch">By Branch</TabsTrigger>
            <TabsTrigger value="by-company">By Company</TabsTrigger>
            <TabsTrigger value="trend">Yearly Trend</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Placement Overview</CardTitle>
                <CardDescription>Distribution of placements by package range</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <PieChart
                  data={[
                    { name: '> 20 LPA', value: 50 },
                    { name: '15-20 LPA', value: 80 },
                    { name: '10-15 LPA', value: 120 },
                    { name: '5-10 LPA', value: 70 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="by-branch" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Placements by Branch</CardTitle>
                <CardDescription>Number of students placed from each branch</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={[
                    { name: 'CSE', total: 120 },
                    { name: 'ECE', total: 90 },
                    { name: 'IT', total: 80 },
                    { name: 'Mech', total: 30 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="by-company" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Top Recruiting Companies</CardTitle>
                <CardDescription>Number of students hired by each company</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <BarChart
                  data={[
                    { name: 'Microsoft', total: 25 },
                    { name: 'Google', total: 15 },
                    { name: 'Amazon', total: 20 },
                    { name: 'TCS', total: 40 },
                    { name: 'Wipro', total: 35 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trend" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Placement Trend (2019-2023)</CardTitle>
                <CardDescription>Placement rate over the last 5 years</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart
                  data={[
                    { name: '2019', value: 65 },
                    { name: '2020', value: 68 },
                    { name: '2021', value: 70 },
                    { name: '2022', value: 72 },
                    { name: '2023', value: 75 },
                  ]}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default PlacementStatistics;
