'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import {
  Edit3,
  Phone,
  FileText,
  HelpCircle,
  MessageSquare,
  Shield,
  Info,
  LogOut,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProfilePage() {
  const dispatch = useDispatch();
  const [tab, setTab] = useState<'traveling' | 'hosting'>('traveling');
  const user = useSelector((state: RootState) => state.auth.user);

  const supportItems = [
    { label: 'Contact us or Feedback', icon: Phone },
    { label: 'Terms & Conditions', icon: FileText },
    { label: 'FAQs', icon: HelpCircle },
    { label: 'Cancellation & Refund', icon: MessageSquare },
    { label: 'Legal & Privacy', icon: Shield },
    { label: 'About us', icon: Info },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-8 max-w-5xl mx-auto">

      {/* Toggle Tabs */}
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-200 rounded-full overflow-hidden">
          <Button
            
            className={`px-6 py-1 rounded-full text-sm font-medium ${
              tab === 'traveling' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
            onClick={() => setTab('traveling')}
          >
            Traveling
          </Button>
          <Button
            
            className={`px-6 py-1 rounded-full text-sm font-medium ${
              tab === 'hosting' ? 'bg-primary text-white' : 'text-gray-600'
            }`}
            onClick={() => setTab('hosting')}
          >
            Hosting
          </Button>
        </div>
      </div>

      {/* Personal Info */}
      <section className="bg-white rounded-xl p-6 relative mb-6">
        <h2 className="text-lg text-black mb-6">Personal Information</h2>
        <button className="absolute top-6 right-6 text-primary hover:text-blue-700">
          <Edit3 className="w-4 h-4" />
        </button>
        <div className="flex flex-col md:flex-row gap-6 items-start">
          <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center text-primary text-3xl">
            👤
          </div>
          <div className="flex-1 space-y-3 text-sm">
            <div>
              <p className="text-text font-medium">Name</p>
              <p className="text-black">{user?.name}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <p className="text-text font-medium">Mobile No.</p>
                <p className="text-black">{user?.phone_number || 'Not Added'}</p>
              </div>
              {user?.isMobileVerified ? (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-primary">Verified</span>
              ) : (
                <>
                  <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-500">Not Verified</span>
                  <button className="text-primary text-xs font-medium underline">Verify</button>
                </>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <p className="text-text font-medium">Email</p>
                <p className="text-black">{user?.email}</p>
              </div>
              <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-primary">Verified</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bg-white rounded-xl p-6 relative mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg  text-black">Bio Details</h2>
          <button className="text-primary hover:text-blue-700">
            <Edit3 className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-5 text-sm text-text">
          <div>
            <p className="text-xs text-accent mb-1">More about me</p>
            <p className="text-black leading-relaxed">
              {user?.bio || 'Tell us more about yourself...'}
            </p>
          </div>
          <div>
            <p className="text-xs text-accent mb-1">Favorite Movies/TV shows</p>
            <p className="text-black">Hanuman, Vincenzo, Start-Up</p>
          </div>
          <Button  className="p-0 text-primary text-sm">
            View all
          </Button>
        </div>
      </section>

      {/* ID Verification */}
      <section className="bg-white rounded-xl p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg  text-gray-800">Identity Verification (Hosts only)</h2>
          <Edit3 className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
        <div className="grid grid-cols-2 text-sm text-gray-700 gap-4">
          <div>
            <p className="text-accent">ID Type</p>
            <p className="text-gray-800">Not Uploaded</p>
          </div>
          <div>
            <p className="text-accent">ID Verification Status</p>
            <p className="text-red-500">Not Verified</p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-white rounded-xl p-6">
        <h2 className="text-lg  text-black mb-6">Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportItems.map((item, idx) => (
            <Button
              key={idx}
            
              className="w-full justify-start flex items-center gap-3 text-text hover:bg-gray-50"
            >
              <item.icon className="w-4 h-4 text-primary" />
              {item.label}
            </Button>
          ))}
          <Button
      
            onClick={handleLogout}
            className="w-full justify-start flex items-center gap-3 text-red-600 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            Logout
          </Button>
        </div>
      </section>
    </div>
  );
}
