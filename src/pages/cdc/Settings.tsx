
import React from 'react';
import Layout from '@/components/layout/Layout';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

const Settings: React.FC = () => {
  return (
    <Layout requireAuth={true} allowedRoles={['cdc']}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-gray-500 mt-2">
            Manage your placement portal settings and preferences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Placement Portal Settings</CardTitle>
                <CardDescription>Configure general placement portal settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="portalName">Placement Portal Name</Label>
                  <Input id="portalName" defaultValue="JNTU Career Development Cell" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="collegeWebsite">College Website URL</Label>
                  <Input id="collegeWebsite" defaultValue="https://jntuceh.ac.in" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="placementEmail">Placement Email Address</Label>
                  <Input id="placementEmail" defaultValue="cdc@jntuceh.ac.in" />
                </div>
                
                <Separator />
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="placementActive">Placement Season Active</Label>
                    <div className="text-sm text-gray-500">
                      Enable or disable the current placement season
                    </div>
                  </div>
                  <Switch id="placementActive" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowStudentRegistration">Allow Student Registration</Label>
                    <div className="text-sm text-gray-500">
                      Allow students to register for placement
                    </div>
                  </div>
                  <Switch id="allowStudentRegistration" defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="allowCompanyRegistration">Allow Company Registration</Label>
                    <div className="text-sm text-gray-500">
                      Allow companies to register for campus drive
                    </div>
                  </div>
                  <Switch id="allowCompanyRegistration" defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Changes</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>Configure email notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Company Registration Notification</Label>
                    <div className="text-sm text-gray-500">
                      Receive email when a new company registers
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Student Application Notification</Label>
                    <div className="text-sm text-gray-500">
                      Receive email when students apply to companies
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Selection Result Notification</Label>
                    <div className="text-sm text-gray-500">
                      Receive email when companies update selection results
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Notification Settings</Button>
              </CardFooter>
            </Card>
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Academic Year</CardTitle>
                <CardDescription>Configure current academic year</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="academicYear">Current Academic Year</Label>
                  <Input id="academicYear" defaultValue="2023-2024" />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Lock Academic Year</Label>
                    <div className="text-sm text-gray-500">
                      Prevent changes to academic year
                    </div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
              <CardFooter>
                <Button>Update Academic Year</Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>Destructive actions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h3 className="font-medium">Reset Placement Data</h3>
                  <p className="text-sm text-gray-500">
                    Reset all placement data for the current academic year. This action cannot be undone.
                  </p>
                  <Button variant="destructive" className="w-full">
                    Reset Data
                  </Button>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="font-medium">Export All Data</h3>
                  <p className="text-sm text-gray-500">
                    Export all placement data to a CSV file.
                  </p>
                  <Button variant="outline" className="w-full">
                    Export Data
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
