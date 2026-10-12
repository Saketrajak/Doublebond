import React, { useState } from 'react';
import { Phone, Mail, Clock, MapPin, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, message })
      });
    } catch (err) {
      console.error(err);
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Contact Our Education Team</h1>
          <p className="text-slate-600 mt-3 text-base">
            Have questions about tutoring, pricing, or our matching process? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xl">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="text-2xl font-bold text-slate-900">Direct Support</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Our academic directors are available 7 days a week to assist parents and students with curriculum planning and tutor matching.
            </p>

            <div className="space-y-4 pt-4">
              <a
                href="tel:8884052553"
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 hover:border-brand-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Call Us Toll-Free</div>
                  <div className="text-sm font-bold text-slate-900">888.405.2553</div>
                </div>
              </a>

              <a
                href="mailto:contact@doublebond.com"
                className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800 hover:border-brand-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Email Support</div>
                  <div className="text-sm font-bold text-slate-900">contact@doublebond.com</div>
                </div>
              </a>

              <div className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-800">
                <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-semibold uppercase">Hours</div>
                  <div className="text-sm font-bold text-slate-900">Mon - Sun: 8:00 AM - 9:00 PM EST</div>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            {!sent ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Send Us a Message</h3>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                    placeholder="Sarah Miller"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                      placeholder="sarah@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                      placeholder="(555) 000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">How can we help?</label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 border border-slate-200 rounded-xl text-sm"
                    placeholder="Tell us about your student's grade, subject, and goals..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  Send Inquiry
                </button>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto" />
                <h3 className="text-2xl font-bold text-slate-900">Message Received!</h3>
                <p className="text-sm text-slate-600 max-w-sm mx-auto">
                  Thank you, {name}. An Academic Director will review your note and contact you within 2 business hours.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
