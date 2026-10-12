import React, { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/authStore';
import { Plus, Edit2, Trash2, Star, CheckCircle } from 'lucide-react';

interface Review {
  id: string;
  author: string;
  rating: number;
  headline: string | null;
  content: string;
  verified: boolean;
  date: string;
}

export const AdminReviews: React.FC = () => {
  const { token } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<Review | null>(null);

  // Form State
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(5);
  const [headline, setHeadline] = useState('');
  const [content, setContent] = useState('');
  const [verified, setVerified] = useState(true);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/admin/reviews', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (response.ok) setReviews(data.reviews);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [token]);

  const openAddModal = () => {
    setEditingReview(null);
    setAuthor('');
    setRating(5);
    setHeadline('');
    setContent('');
    setVerified(true);
    setIsModalOpen(true);
  };

  const openEditModal = (review: Review) => {
    setEditingReview(review);
    setAuthor(review.author);
    setRating(review.rating);
    setHeadline(review.headline || '');
    setContent(review.content);
    setVerified(review.verified);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const method = editingReview ? 'PUT' : 'POST';
    const url = editingReview 
      ? `http://localhost:5000/api/admin/reviews/${editingReview.id}` 
      : `http://localhost:5000/api/admin/reviews`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author, rating, headline, content, verified })
      });
      if (response.ok) {
        setIsModalOpen(false);
        fetchReviews();
      }
    } catch (error) {
      console.error("Failed to save Review", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this Review?")) return;
    try {
      const response = await fetch(`http://localhost:5000/api/admin/reviews/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) fetchReviews();
    } catch (error) {
      console.error("Failed to delete Review", error);
    }
  };

  if (loading) return <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-500 mx-auto mt-20"></div>;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Manage Reviews</h2>
          <p className="text-slate-500 text-sm mt-1">Add, edit, or remove student and parent testimonials.</p>
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Review
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider font-semibold border-b border-slate-200">
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Content</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {reviews.map((review) => (
              <tr key={review.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900">{review.author}</p>
                  <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString()}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-1 text-yellow-400">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-semibold text-slate-700 ml-1">{review.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-slate-900">{review.headline}</p>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 max-w-md">{review.content}</p>
                </td>
                <td className="px-6 py-4">
                  {review.verified ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-700">
                      <CheckCircle className="w-3 h-3" /> Verified
                    </span>
                  ) : (
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-100 text-slate-600">Pending</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEditModal(review)} className="p-2 text-slate-400 hover:text-brand-600 bg-slate-50 hover:bg-brand-50 rounded-lg transition-colors">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(review.id)} className="p-2 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reviews.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                  <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p>No reviews found. Click "Add Review" to create one.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-fadeIn">
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900">{editingReview ? 'Edit Review' : 'Add New Review'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">✕</button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Author Name</label>
                  <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Rating (1-5)</label>
                  <input required type="number" min="1" max="5" step="0.1" value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Headline (Optional)</label>
                <input type="text" value={headline} onChange={e => setHeadline(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Review Content</label>
                <textarea required rows={4} value={content} onChange={e => setContent(e.target.value)} className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none" />
              </div>

              <div className="flex items-center gap-2 mt-4">
                <input type="checkbox" id="verified" checked={verified} onChange={e => setVerified(e.target.checked)} className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500" />
                <label htmlFor="verified" className="text-sm font-medium text-slate-700">Verified Reviewer</label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 mt-6">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors">Save Review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
