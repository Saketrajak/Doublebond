import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Shield, Users, User, Edit2, ShieldAlert } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'STAFF' | 'TUTOR' | 'USER';
  permissions: string[];
  createdAt: string;
}

const AVAILABLE_PERMISSIONS = [
  { id: 'VIEW_LEADS', label: 'View Leads & CRM', desc: 'Can see incoming form submissions' },
  { id: 'EDIT_CMS', label: 'Edit Content (CMS)', desc: 'Can add/edit FAQs, Subjects, Reviews' },
  { id: 'MANAGE_USERS', label: 'Manage Users', desc: 'Can change user roles and permissions' }
];

export const AdminUsers: React.FC = () => {
  const { token, user: currentUser } = useAuthStore();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);

  // Form State
  const [role, setRole] = useState<'ADMIN' | 'STAFF' | 'TUTOR' | 'USER'>('USER');
  const [permissions, setPermissions] = useState<string[]>([]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setUsers(data.users);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const openEditModal = (user: UserData) => {
    if (user.id === currentUser?.id) {
      alert("You cannot edit your own role or permissions here.");
      return;
    }
    setEditingUser(user);
    setRole(user.role);
    setPermissions(user.permissions || []);
    setIsModalOpen(true);
  };

  const togglePermission = (permId: string) => {
    if (permissions.includes(permId)) {
      setPermissions(permissions.filter(p => p !== permId));
    } else {
      setPermissions([...permissions, permId]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    try {
      const response = await fetch(`http://localhost:5000/api/admin/users/${editingUser.id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ role, permissions })
      });
      if (response.ok) {
        setIsModalOpen(false);
        fetchUsers();
      }
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  const renderUserColumn = (title: string, roleFilter: string, icon: React.ReactNode, bgColor: string) => {
    const filteredUsers = users.filter(u => u.role === roleFilter);
    return (
      <div className={`rounded-2xl border border-slate-200 bg-white flex flex-col h-[600px] shadow-sm overflow-hidden`}>
        <div className={`p-4 border-b border-slate-200 flex items-center gap-2 ${bgColor}`}>
          {icon}
          <h3 className="font-bold text-slate-800">{title}</h3>
          <span className="ml-auto bg-white/50 px-2 py-0.5 rounded-full text-xs font-semibold text-slate-700">
            {filteredUsers.length}
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50/50">
          {filteredUsers.map(user => (
            <div key={user.id} className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5 break-all">{user.email}</p>
                </div>
                <button 
                  onClick={() => openEditModal(user)}
                  className="p-1.5 text-slate-400 hover:text-brand-600 bg-slate-50 hover:bg-brand-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
              </div>
              {user.permissions && user.permissions.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1">
                  {user.permissions.map(p => (
                    <span key={p} className="text-[10px] uppercase font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded">
                      {p.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-slate-400 text-sm">
              No users in this role
            </div>
          )}
        </div>
      </div>
    );
  };

  if (loading) return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mt-20"></div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-slate-900">User & Role Management</h2>
        <p className="text-slate-500 text-sm mt-1">Manage platform access, roles, and granular staff permissions.</p>
      </div>

      {/* Columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {renderUserColumn('Admins', 'ADMIN', <ShieldAlert className="w-5 h-5 text-red-500" />, 'bg-red-50')}
        {renderUserColumn('Staff', 'STAFF', <Shield className="w-5 h-5 text-brand-accent" />, 'bg-purple-50')}
        {renderUserColumn('Tutors', 'TUTOR', <User className="w-5 h-5 text-purple-500" />, 'bg-purple-50')}
        {renderUserColumn('Users / Parents', 'USER', <Users className="w-5 h-5 text-slate-500" />, 'bg-slate-100')}
      </div>

      {/* Edit Modal */}
      {isModalOpen && editingUser && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-fadeIn">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">Edit User Access</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="font-semibold text-slate-900">{editingUser.name}</p>
                <p className="text-sm text-slate-500">{editingUser.email}</p>
              </div>

              {/* Role Selection */}
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Platform Role</label>
                <select 
                  value={role} 
                  onChange={e => setRole(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none font-medium text-slate-700"
                >
                  <option value="USER">User / Parent (Standard)</option>
                  <option value="TUTOR">Tutor</option>
                  <option value="STAFF">Staff (Requires Permissions)</option>
                  <option value="ADMIN">Admin (Full Access)</option>
                </select>
              </div>

              {/* Granular Permissions (iOS Toggles) */}
              {role === 'STAFF' && (
                <div className="space-y-4">
                  <label className="block text-sm font-bold text-slate-700 border-b border-slate-100 pb-2">
                    Staff Permissions
                  </label>
                  
                  {AVAILABLE_PERMISSIONS.map(perm => {
                    const isON = permissions.includes(perm.id);
                    return (
                      <div key={perm.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{perm.label}</p>
                          <p className="text-xs text-slate-500">{perm.desc}</p>
                        </div>
                        
                        {/* iOS Style Toggle */}
                        <button 
                          type="button"
                          onClick={() => togglePermission(perm.id)}
                          className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            isON ? 'bg-green-500' : 'bg-slate-200'
                          }`}
                        >
                          <span 
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              isON ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}

              {role === 'ADMIN' && (
                <div className="bg-purple-50 border border-purple-100 p-4 rounded-xl">
                  <p className="text-sm text-[#31035c] font-medium flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-brand-accent" />
                    Admins automatically have all permissions.
                  </p>
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
