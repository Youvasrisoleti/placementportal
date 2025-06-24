
import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Layout from '@/components/layout/Layout';

const Unauthorized: React.FC = () => {
  return (
    <Layout requireAuth={false}>
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] pt-16">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <AlertTriangle className="h-16 w-16 text-yellow-500" />
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Access Denied</h1>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            You don't have permission to access this page. Please contact the administrator if you believe this is an error.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            
            <Button asChild>
              <Link to="/">Go to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Unauthorized;
