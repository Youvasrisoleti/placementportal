
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { PlacementProvider } from "@/contexts/PlacementContext";
import { AIProvider } from "@/contexts/AIContext";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Unauthorized from "./pages/Unauthorized";
import AIAssistant from "./pages/AIAssistant";
import NotFound from "./pages/NotFound";
import ManageCompanies from "./pages/cdc/ManageCompanies";
import ManageStudents from "./pages/cdc/ManageStudents";
import PlacementStatistics from "./pages/cdc/PlacementStatistics";
import Settings from "./pages/cdc/Settings";

// Student pages
import Companies from "./pages/student/Companies";
import MyApplications from "./pages/student/MyApplications";
import Interviews from "./pages/student/Interviews";
import Resources from "./pages/student/Resources";

// Company pages
import CompanyApplications from "./pages/company/CompanyApplications";
import ScheduleInterviews from "./pages/company/ScheduleInterviews";
import CompanyProfile from "./pages/company/CompanyProfile";

// Add this new page
import AddCompany from "./pages/cdc/AddCompany";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <PlacementProvider>
          <AIProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/unauthorized" element={<Unauthorized />} />
                <Route path="/ai-assistant" element={<AIAssistant />} />
                
                {/* CDC Routes */}
                <Route path="/manage-companies" element={<ManageCompanies />} />
                <Route path="/add-company" element={<AddCompany />} />
                <Route path="/manage-students" element={<ManageStudents />} />
                <Route path="/placement-statistics" element={<PlacementStatistics />} />
                <Route path="/settings" element={<Settings />} />
                
                {/* Student Routes */}
                <Route path="/companies" element={<Companies />} />
                <Route path="/my-applications" element={<MyApplications />} />
                <Route path="/interviews" element={<Interviews />} />
                <Route path="/resources" element={<Resources />} />
                
                {/* Company Routes */}
                <Route path="/company-applications" element={<CompanyApplications />} />
                <Route path="/schedule-interviews" element={<ScheduleInterviews />} />
                <Route path="/company-profile" element={<CompanyProfile />} />
                
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </AIProvider>
        </PlacementProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
