
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  Building, 
  Users, 
  Calendar, 
  MessageSquare,
  FileText,
  Settings,
  BookOpen,
  BriefcaseBusiness,
  FolderPlus
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Role-based menu items
  const getMenuItems = () => {
    const commonItems = [
      {
        name: 'Dashboard',
        path: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
    ];

    const studentItems = [
      {
        name: 'Companies',
        path: '/companies',
        icon: <Building className="h-5 w-5" />,
      },
      {
        name: 'My Applications',
        path: '/my-applications',
        icon: <FileText className="h-5 w-5" />,
      },
      {
        name: 'Interviews',
        path: '/interviews',
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: 'AI Assistant',
        path: '/ai-assistant',
        icon: <MessageSquare className="h-5 w-5" />,
      },
      {
        name: 'Resources',
        path: '/resources',
        icon: <BookOpen className="h-5 w-5" />,
      },
    ];

    const companyItems = [
      {
        name: 'Applications',
        path: '/company-applications',
        icon: <FileText className="h-5 w-5" />,
      },
      {
        name: 'Schedule Interviews',
        path: '/schedule-interviews',
        icon: <Calendar className="h-5 w-5" />,
      },
      {
        name: 'Company Profile',
        path: '/company-profile',
        icon: <BriefcaseBusiness className="h-5 w-5" />,
      },
    ];

    const cdcItems = [
      {
        name: 'Manage Companies',
        path: '/manage-companies',
        icon: <Building className="h-5 w-5" />,
      },
      {
        name: 'Add Company',
        path: '/add-company',
        icon: <FolderPlus className="h-5 w-5" />,
      },
      {
        name: 'Manage Students',
        path: '/manage-students',
        icon: <Users className="h-5 w-5" />,
      },
      {
        name: 'Placement Statistics',
        path: '/placement-statistics',
        icon: <FileText className="h-5 w-5" />,
      },
      {
        name: 'Settings',
        path: '/settings',
        icon: <Settings className="h-5 w-5" />,
      },
    ];

    switch (user?.role) {
      case 'student':
        return [...commonItems, ...studentItems];
      case 'company':
        return [...commonItems, ...companyItems];
      case 'cdc':
        return [...commonItems, ...cdcItems];
      default:
        return commonItems;
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className="bg-white border-r border-gray-200 w-64 min-h-screen pt-16 hidden md:block">
      <div className="overflow-y-auto py-4 px-3 h-full">
        <div className="mt-4 mb-6 px-4">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-placement-primary text-white flex items-center justify-center font-semibold">
              {user?.name?.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700 truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 capitalize">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center p-2 text-base font-normal rounded-lg ${
                  isActive(item.path)
                    ? 'bg-gray-100 text-placement-primary'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className={isActive(item.path) ? 'text-placement-primary' : 'text-gray-500'}>
                  {item.icon}
                </span>
                <span className="ml-3">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
