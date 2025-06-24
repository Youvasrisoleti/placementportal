
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { Building, MapPin, Users, Briefcase } from 'lucide-react';
import { toast } from 'sonner';

const CompanyProfile: React.FC = () => {
  const { user } = useAuth();
  
  // Placeholder company data (in a real app, this would come from the database)
  const [companyData, setCompanyData] = useState({
    name: user?.name || '',
    industry: user?.details?.industry || 'Technology',
    location: user?.details?.location || 'Hyderabad',
    website: user?.details?.website || 'https://example.com',
    description: 'A leading technology company focused on innovation and growth.',
    foundedYear: '2005',
    employeeCount: '1000+',
    contactEmail: 'hr@example.com',
    contactPhone: '+91 9876543210'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSave = () => {
    // In a real app, this would save to the database
    setIsEditing(false);
    toast.success('Profile updated successfully');
  };
  
  return (
    <Layout requireAuth={true} allowedRoles={['company']}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Company Profile</h1>
          <Button
            variant={isEditing ? "outline" : "default"}
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Company Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center justify-center pb-4">
                <div className="h-24 w-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-12 w-12 text-placement-primary" />
                </div>
                <h2 className="text-xl font-semibold">{companyData.name}</h2>
                <p className="text-gray-500">{companyData.industry}</p>
              </div>
              
              <div className="space-y-4 mt-4">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span>{companyData.location}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span>{companyData.employeeCount} employees</span>
                </div>
                <div className="flex items-center gap-3">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                  <span>Founded {companyData.foundedYear}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">Profile Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {isEditing ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Company Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        value={companyData.name} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="industry">Industry</Label>
                      <Input 
                        id="industry" 
                        name="industry" 
                        value={companyData.industry} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input 
                        id="location" 
                        name="location" 
                        value={companyData.location} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input 
                        id="website" 
                        name="website" 
                        value={companyData.website} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description" 
                        name="description" 
                        value={companyData.description} 
                        onChange={handleInputChange}
                        rows={4}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="foundedYear">Founded Year</Label>
                        <Input 
                          id="foundedYear" 
                          name="foundedYear" 
                          value={companyData.foundedYear} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="employeeCount">Employee Count</Label>
                        <Input 
                          id="employeeCount" 
                          name="employeeCount" 
                          value={companyData.employeeCount} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="contactEmail">Contact Email</Label>
                        <Input 
                          id="contactEmail" 
                          name="contactEmail" 
                          value={companyData.contactEmail} 
                          onChange={handleInputChange} 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="contactPhone">Contact Phone</Label>
                        <Input 
                          id="contactPhone" 
                          name="contactPhone" 
                          value={companyData.contactPhone} 
                          onChange={handleInputChange} 
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-500">Description</h3>
                        <p className="mt-1">{companyData.description}</p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Website</h3>
                          <p className="mt-1">{companyData.website}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Founded</h3>
                          <p className="mt-1">{companyData.foundedYear}</p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Email</h3>
                          <p className="mt-1">{companyData.contactEmail}</p>
                        </div>
                        
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Contact Phone</h3>
                          <p className="mt-1">{companyData.contactPhone}</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyProfile;
