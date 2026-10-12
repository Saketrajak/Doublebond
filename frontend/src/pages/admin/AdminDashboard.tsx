import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Mail, Phone, Calendar, User, BookOpen, ExternalLink, Filter } from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  targetSubject: string | null;
  gradeLevel: string | null;
  studentType: string | null;
  status: string;
  createdAt: string;
}

export const AdminDashboard: React.FC = () => {
  const { token } = useAuthStore();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/admin/leads', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const data = await response.json();
        if (response.ok) {
          setLeads(data.leads);
        } else {
          setError(data.error || 'Failed to fetch leads');
        }
      } catch (err) {
        setError('Network error connecting to API');
      } finally {
        setLoading(false);
      }
    };

    fetchLeads();
  }, [token]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-100 text-[#31035c] border border-purple-200">New</span>;
      case 'CONTACTED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">Contacted</span>;
      case 'CONVERTED':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700 border border-green-200">Converted</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-700 border border-slate-200">{status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
        <p className="text-red-600 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Total Leads</p>
          <p className="text-3xl font-bold text-slate-900">{leads.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">New Leads</p>
          <p className="text-3xl font-bold text-brand-600">
            {leads.filter(l => l.status === 'NEW').length}
          </p>
        </div>
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <p className="text-sm font-medium text-slate-500 mb-1">Conversion Rate</p>
          <p className="text-3xl font-bold text-green-600">
            {leads.length > 0 ? Math.round((leads.filter(l => l.status === 'CONVERTED').length / leads.length) * 100) : 0}%
          </p>
        </div>
      </div>

      {/* CRM Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Incoming Leads</h2>
            <p className="text-sm text-slate-500 mt-1">Manage inquiries from parents and students.</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 shadow-sm transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Needs / Subject</th>
                <th className="px-6 py-4">Student Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{lead.name}</span>
                      <a href={`mailto:${lead.email}`} className="text-sm text-slate-500 hover:text-brand-600 flex items-center gap-1 mt-1">
                        <Mail className="w-3.5 h-3.5" /> {lead.email}
                      </a>
                      {lead.phone && (
                        <a href={`tel:${lead.phone}`} className="text-sm text-slate-500 hover:text-brand-600 flex items-center gap-1 mt-0.5">
                          <Phone className="w-3.5 h-3.5" /> {lead.phone}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <BookOpen className="w-4 h-4 text-brand-500" />
                      <span className="font-medium">{lead.targetSubject || 'General Inquiry'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-slate-400" />
                        {lead.studentType === 'MY_CHILD' ? 'Parent' : 'Student'}
                      </div>
                      <span className="mt-1 text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md inline-flex w-max">
                        {lead.gradeLevel || 'Unknown Grade'}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col text-sm">
                      <span className="text-slate-900">{new Date(lead.createdAt).toLocaleDateString()}</span>
                      <span className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(lead.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(lead.status)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100">
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
              {leads.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-500">
                    No leads found. When users submit the "Find a Tutor" form, they will appear here.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
