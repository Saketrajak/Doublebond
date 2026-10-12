import React from 'react';
import { Link, useLocation, Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { 
  Users, 
  BookOpen, 
  MessageSquare, 
  Star, 
  Settings, 
  LogOut,
  LayoutDashboard,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  // Protect Admin Route
  if (!user || (user.role !== 'ADMIN' && user.role !== 'STAFF')) {
    return <Navigate to="/login" replace />;
  }

  const hasPerm = (perm: string) => {
    if (user.role === 'ADMIN') return true;
    return user.permissions && user.permissions.includes(perm);
  };

  const allNavItems = [
    { name: 'CRM / Leads', icon: <LayoutDashboard className="w-5 h-5" />, path: '/admin', reqPerm: 'VIEW_LEADS' },
    { name: 'Subjects', icon: <BookOpen className="w-5 h-5" />, path: '/admin/subjects', reqPerm: 'EDIT_CMS' },
    { name: 'FAQs', icon: <MessageSquare className="w-5 h-5" />, path: '/admin/faqs', reqPerm: 'EDIT_CMS' },
    { name: 'Reviews & Stories', icon: <Star className="w-5 h-5" />, path: '/admin/reviews', reqPerm: 'EDIT_CMS' },
    { name: 'User Management', icon: <Users className="w-5 h-5" />, path: '/admin/users', reqPerm: 'MANAGE_USERS' },
  ];

  const navItems = allNavItems.filter(item => hasPerm(item.reqPerm));

  // If they are on a route they don't have permission for, redirect to the first available one
  const isAuthorizedForCurrentPath = allNavItems.find(i => i.path === location.pathname)?.reqPerm 
    ? hasPerm(allNavItems.find(i => i.path === location.pathname)!.reqPerm) 
    : true; // Allow index or unknown routes if they get past App.tsx

  if (!isAuthorizedForCurrentPath && navItems.length > 0) {
    return <Navigate to={navItems[0].path} replace />;
  }
  if (!isAuthorizedForCurrentPath && navItems.length === 0) {
    return <div className="p-8 text-center text-red-500">You have no permissions assigned. Please contact an admin.</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed h-full z-10">
        <div className="h-16 flex items-center px-6 border-b border-slate-100">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-md bg-brand-500 flex items-center justify-center text-white">
              <span className="font-extrabold text-lg tracking-tight">L</span>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Admin
            </span>
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <div className="mb-4 px-3">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Dashboard</p>
          </div>
          
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive 
                    ? 'bg-brand-50 text-brand-600' 
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <div className={isActive ? 'text-brand-500' : 'text-slate-400'}>
                  {item.icon}
                </div>
                {item.name}
                {isActive && <ChevronRight className="w-4 h-4 ml-auto text-brand-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-slate-50 border border-slate-100 mb-2">
            <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-brand-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-slate-900 truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.role}</p>
            </div>
          </div>
          <button 
            onClick={logout}
            className="flex items-center justify-center w-full gap-2 px-4 py-2 text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-lg font-semibold text-slate-800">
            {navItems.find(i => i.path === location.pathname)?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </header>
        
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};
