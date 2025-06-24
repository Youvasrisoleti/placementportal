
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Building, GraduationCap, Briefcase } from 'lucide-react';
import Layout from '@/components/layout/Layout';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const success = await login(username, password, role);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout requireAuth={false}>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] pt-16">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              CampusPlacement<span className="text-placement-primary">Hub</span>
            </CardTitle>
            <CardDescription>
              Sign in to access the placement portal
            </CardDescription>
          </CardHeader>
          
          <Tabs defaultValue="student" onValueChange={(value) => setRole(value as UserRole)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="student" className="flex items-center gap-2">
                <GraduationCap className="h-4 w-4" />
                <span className="hidden sm:inline">Student</span>
              </TabsTrigger>
              <TabsTrigger value="company" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                <span className="hidden sm:inline">Company</span>
              </TabsTrigger>
              <TabsTrigger value="cdc" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="hidden sm:inline">CDC</span>
              </TabsTrigger>
            </TabsList>
            
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">
                      {role === 'student' ? 'Roll Number' : 'Username'}
                    </Label>
                    <Input
                      id="username"
                      placeholder={role === 'student' ? 'Enter your JNTU roll number' : 'Enter your username'}
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <TabsContent value="student" className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    Use your JNTU roll number (e.g., 19A91A0500) and password to sign in.
                  </p>
                </TabsContent>
                
                <TabsContent value="company" className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    Use your company credentials provided by the CDC to sign in.
                  </p>
                </TabsContent>
                
                <TabsContent value="cdc" className="mt-4 space-y-4">
                  <p className="text-sm text-gray-500">
                    Use your CDC admin credentials to sign in and manage the placement process.
                  </p>
                </TabsContent>
                
                <Button 
                  type="submit" 
                  className="w-full mt-6"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </CardContent>
          </Tabs>
          
          <CardFooter className="flex justify-center text-sm text-gray-500 mt-4">
            <p>For demo: student/company/cdc with password student123/company123/cdc123</p>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default Login;
