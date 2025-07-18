'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Edit3,
  Phone,
  FileText,
  HelpCircle,
  MessageSquare,
  Shield,
  Info,
  LogOut,
  User,
} from 'lucide-react';

import { RootState } from '@/store';
import { logout } from '@/store/slices/authSlice';
import { Button } from '@/components/ui/button';
import PrimaryButton from '@/components/PrimaryButton';

type User = {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  isMobileVerified: boolean;
  isEmailVerified: boolean;
  bio?: string;
  profileImage?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  role?: 'user' | 'host' | 'admin';
  createdAt?: string;
  updatedAt?: string;
  idProofType?: string;
  idProofStatus?: 'verified' | 'pending' | 'rejected' | 'not_uploaded';
};

export default function ProfilePage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [tab, setTab] = useState<'traveling' | 'hosting'>('traveling');

  const user = useSelector((state: RootState) => state.auth.user) as User | null;

  const supportItems = [
    { label: 'Contact Us or Feedback', icon: Phone },
    { label: 'FAQs', icon: HelpCircle },
    { label: 'Legal & Privacy', icon: Shield },
    { label: 'About us', icon: Info },
    { label: 'Terms & Conditions', icon: FileText },
  ];

  const handleLogout = () => {
    dispatch(logout());
    localStorage.clear();
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 pt-12 pb-16">
        <div className="flex flex-col items-center mb-12">
          <div className="bg-blue-50 p-5 rounded-full mb-4">
            <User className="w-12 h-12 text-primary" />
          </div>
          <p className="text-center text-gray-700 text-sm sm:text-base max-w-md mb-4">
            Login to list your property as well as search and book wonderful stays
          </p>
          <PrimaryButton onClick={() => router.push('/login')}>
            Login
          </PrimaryButton>
        </div>

        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-md hover:bg-gray-50"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-10 px-4 sm:px-8 max-w-5xl mx-auto">
      <div className="flex justify-center mb-10">
        <div className="flex bg-gray-200 rounded-full overflow-hidden">
          <Button
            className={`px-6 py-1 rounded-full text-sm font-medium ${tab === 'traveling' ? 'bg-primary text-white' : 'text-gray-600'}`}
            onClick={() => setTab('traveling')}
          >
            Traveling
          </Button>
          <Button
            className={`px-6 py-1 rounded-full text-sm font-medium ${tab === 'hosting' ? 'bg-primary text-white' : 'text-gray-600'}`}
            onClick={() => setTab('hosting')}
          >
            Hosting
          </Button>
        </div>
      </div>

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
              <p className="text-black">{user?.name || '-'}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <p className="text-text font-medium">Mobile No.</p>
                <p className="text-black">{user?.phone_number || 'Not Added'}</p>
              </div>
              {user?.isMobileVerified ? (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-primary">Verified</span>
              ) : (
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-500">Not Verified</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div>
                <p className="text-text font-medium">Email</p>
                <p className="text-black">{user?.email || '-'}</p>
              </div>
              {user?.isEmailVerified ? (
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-primary">Verified</span>
              ) : (
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-100 text-red-500">Not Verified</span>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 relative mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg text-black">Bio Details</h2>
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
        </div>
      </section>

      <section className="bg-white rounded-xl p-6 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-lg text-gray-800">Identity Verification (Hosts only)</h2>
          <Edit3 className="text-gray-400 cursor-pointer hover:text-gray-600" />
        </div>
        <div className="grid grid-cols-2 text-sm text-gray-700 gap-4">
          <div>
            <p className="text-accent">ID Type</p>
            <p className="text-gray-800">{user?.idProofType || 'Not Uploaded'}</p>
          </div>
          <div>
            <p className="text-accent">ID Verification Status</p>
            <p className={
              user?.idProofStatus === 'verified' ? 'text-green-600' :
              user?.idProofStatus === 'pending' ? 'text-yellow-500' :
              'text-red-500'
            }>
              {user?.idProofStatus || 'Not Verified'}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6">
        <h2 className="text-lg text-black mb-6">Support</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {supportItems.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <item.icon className="w-5 h-5 text-primary" />
              <span className="text-base font-medium text-gray-700">{item.label}</span>
            </div>
          ))}

          {user && (
            <div
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 border border-red-200 rounded-lg hover:bg-red-50 text-red-600 cursor-pointer transition-colors"
            >
              <LogOut className="w-5 h-5 text-red-500" />
              <span className="text-base font-medium">Logout</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
