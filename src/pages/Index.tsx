
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Briefcase, Users, BarChart, BookCheck, Bot, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Automated College Placement Portal
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connecting students, companies, and career development cells in one seamless platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link to="/dashboard">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              ) : (
                <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                  <Link to="/login">
                    Sign In <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Empowering the Placement Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our platform streamlines every aspect of the college placement journey, from registration to final selection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="text-placement-primary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Company Integration</h3>
              <p className="text-gray-600">
                Companies can seamlessly post job openings, view eligible candidates, schedule interviews, and provide feedback all in one place.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Users className="text-placement-secondary h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Student Dashboard</h3>
              <p className="text-gray-600">
                Students can register, browse eligible companies, apply for positions, track their application status, and receive interview feedback.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BarChart className="text-green-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">CDC Management</h3>
              <p className="text-gray-600">
                Career Development Cell can manage companies, set eligibility criteria, schedule placement drives, and track placement statistics.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <BookCheck className="text-yellow-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Eligibility Management</h3>
              <p className="text-gray-600">
                Automatically filter and match students to companies based on CGPA, branch, backlog status, and other custom criteria.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Bot className="text-red-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Assistant</h3>
              <p className="text-gray-600">
                Get resume feedback, interview preparation, selection predictions, and answers to placement-related questions with our AI assistant.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <Calendar className="text-indigo-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Interview Management</h3>
              <p className="text-gray-600">
                Schedule interviews, receive notifications, provide feedback, and track the entire selection process from application to offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-placement-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Placement Process?</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join our platform to streamline the placement process, improve student-company matching, and enhance the overall placement experience.
          </p>
          {isAuthenticated ? (
            <Button asChild size="lg" variant="secondary">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild size="lg" variant="secondary">
              <Link to="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">CampusPlacementHub</h3>
              <p className="text-gray-300">
                Streamlining the college placement process for students, companies, and career development cells.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
                <li><Link to="/login" className="text-gray-300 hover:text-white">Sign In</Link></li>
                <li><a href="#features" className="text-gray-300 hover:text-white">Features</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <address className="not-italic text-gray-300">
                JNTU College of Engineering<br />
                Hyderabad, Telangana, India<br />
                <a href="mailto:cdc@jntu.ac.in" className="hover:text-white">cdc@jntu.ac.in</a>
              </address>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} CampusPlacementHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
