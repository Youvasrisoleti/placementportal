
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { usePlacement } from '@/contexts/PlacementContext';
import { Building, Plus } from 'lucide-react';
import { toast } from 'sonner';

const AddCompany: React.FC = () => {
  const { addCompany } = usePlacement();
  const [companyName, setCompanyName] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [description, setDescription] = useState('');
  const [packageValue, setPackageValue] = useState('');
  const [location, setLocation] = useState('');
  const [cgpaRequired, setCgpaRequired] = useState('');
  const [branches, setBranches] = useState('');
  const [deadlineDate, setDeadlineDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!companyName || !jobTitle || !description || !packageValue || !location || !cgpaRequired || !branches || !deadlineDate) {
      toast.error('Please fill all required fields');
      return;
    }

    const branchesArray = branches.split(',').map(branch => branch.trim());
    
    addCompany({
      name: companyName,
      logo: `https://logo.clearbit.com/${companyName.toLowerCase().replace(/\s+/g, '')}.com`,
      description,
      eligibilityCriteria: {
        cgpa: parseFloat(cgpaRequired),
        branches: branchesArray,
        backlogAllowed: false,
      },
      deadlineDate,
      jobTitle,
      jobDescription: description,
      package: packageValue,
      location,
      rounds: ['Online Assessment', 'Technical Interview', 'HR Interview']
    });

    // Reset form
    setCompanyName('');
    setJobTitle('');
    setDescription('');
    setPackageValue('');
    setLocation('');
    setCgpaRequired('');
    setBranches('');
    setDeadlineDate('');
  };

  return (
    <Layout requireAuth={true} allowedRoles={['cdc']}>
      <div className="space-y-6">
        <div className="flex items-center">
          <Building className="h-6 w-6 mr-2 text-placement-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Add New Company</h1>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name</Label>
                  <Input 
                    id="companyName" 
                    value={companyName} 
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Microsoft"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="jobTitle">Job Title</Label>
                  <Input 
                    id="jobTitle" 
                    value={jobTitle} 
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Software Engineer"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="packageValue">Package (LPA)</Label>
                  <Input 
                    id="packageValue" 
                    value={packageValue} 
                    onChange={(e) => setPackageValue(e.target.value)}
                    placeholder="e.g. 15 LPA"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input 
                    id="location" 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Hyderabad"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cgpa">Minimum CGPA</Label>
                  <Input 
                    id="cgpa" 
                    type="number" 
                    min="0" 
                    max="10" 
                    step="0.1"
                    value={cgpaRequired} 
                    onChange={(e) => setCgpaRequired(e.target.value)}
                    placeholder="e.g. 7.5"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="branches">Eligible Branches (comma separated)</Label>
                  <Input 
                    id="branches" 
                    value={branches} 
                    onChange={(e) => setBranches(e.target.value)}
                    placeholder="e.g. CSE, IT, ECE"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="deadline">Application Deadline</Label>
                  <Input 
                    id="deadline" 
                    type="date" 
                    value={deadlineDate} 
                    onChange={(e) => setDeadlineDate(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea 
                  id="description" 
                  value={description} 
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter job description and requirements"
                  rows={5}
                />
              </div>
              
              <Button type="submit" className="flex gap-2 items-center">
                <Plus className="h-4 w-4" />
                Add Company
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AddCompany;
