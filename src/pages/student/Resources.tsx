
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Code, FileText, Video } from 'lucide-react';

const Resources: React.FC = () => {
  return (
    <Layout requireAuth={true} allowedRoles={['student']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Resources</h1>
        </div>
        
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="technical">Technical Prep</TabsTrigger>
            <TabsTrigger value="aptitude">Aptitude</TabsTrigger>
            <TabsTrigger value="interview">Interview Tips</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Data Structures & Algorithms', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'Resume Building Workshop', type: 'Video', icon: <Video className="h-10 w-10 text-placement-primary" /> },
                { title: 'Mock Technical Interview', type: 'Practice', icon: <Code className="h-10 w-10 text-placement-primary" /> },
                { title: 'Aptitude Test Questions', type: 'Practice', icon: <FileText className="h-10 w-10 text-placement-primary" /> },
                { title: 'Interview Etiquette', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'Common HR Questions', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
              ].map((resource, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center items-center h-16">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-center">{resource.title}</CardTitle>
                    <CardDescription className="text-center">{resource.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Access Resource</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="technical" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Data Structures & Algorithms', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'System Design Basics', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'Mock Technical Interview', type: 'Practice', icon: <Code className="h-10 w-10 text-placement-primary" /> },
              ].map((resource, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center items-center h-16">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-center">{resource.title}</CardTitle>
                    <CardDescription className="text-center">{resource.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Access Resource</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="aptitude" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Aptitude Test Questions', type: 'Practice', icon: <FileText className="h-10 w-10 text-placement-primary" /> },
                { title: 'Logical Reasoning', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'Quantitative Aptitude', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
              ].map((resource, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center items-center h-16">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-center">{resource.title}</CardTitle>
                    <CardDescription className="text-center">{resource.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Access Resource</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="interview" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: 'Interview Etiquette', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'Common HR Questions', type: 'Guide', icon: <BookOpen className="h-10 w-10 text-placement-primary" /> },
                { title: 'Resume Building Workshop', type: 'Video', icon: <Video className="h-10 w-10 text-placement-primary" /> },
              ].map((resource, idx) => (
                <Card key={idx} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-center items-center h-16">
                      {resource.icon}
                    </div>
                    <CardTitle className="text-center">{resource.title}</CardTitle>
                    <CardDescription className="text-center">{resource.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full">Access Resource</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Resources;
