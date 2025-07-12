'use client';

import { useState } from 'react';
import { User, Edit3, Phone, Mail, LogOut, HelpCircle, FileText, Shield } from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'traveling' | 'hosting'>('traveling');
  const [bio, setBio] = useState("I love exploring new cultures and meeting people from around the world. Currently working as a software developer and passionate about sustainable travel.");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* User Info Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-blue-600" />
            </div>
            <div className="text-center md:text-left flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">John Doe</h1>
              <div className="flex flex-col md:flex-row gap-4 text-gray-600 mb-4">
                <div className="flex items-center justify-center md:justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  john.doe@example.com
                </div>
                <div className="flex items-center justify-center md:justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  +91 98765 43210
                </div>
              </div>
              <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium">
                <Edit3 className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Traveling/Hosting Toggle */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('traveling')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'traveling'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Traveling
              </button>
              <button
                onClick={() => setActiveTab('hosting')}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === 'hosting'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Hosting
              </button>
            </div>
          </div>

          {activeTab === 'traveling' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Travel Preferences</h3>
              <p className="text-gray-600 mb-4">
                You haven&rsquo;t booked any trips yet. Start exploring amazing homestays around the world!
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Browse Stays
              </button>
            </div>
          )}

          {activeTab === 'hosting' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Hosting Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Ready to welcome guests? Start by creating your first listing.
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors">
                Create Listing
              </button>
            </div>
          )}
        </div>

        {/* Bio Section */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">More about me</h3>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Edit
            </button>
          </div>
          <p className="text-gray-600 mb-4">{bio}</p>
          
          <div className="mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Favorite Movies</h4>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">The Shawshank Redemption</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Inception</span>
              <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">Pulp Fiction</span>
            </div>
          </div>
          
          <button className="text-blue-600 hover:text-blue-700 font-medium">
            View All →
          </button>
        </div>

        {/* Support Links */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Support & Settings</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <HelpCircle className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Contact Support</div>
                <div className="text-sm text-gray-500">Get help with your account</div>
              </div>
            </button>
            
            <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <HelpCircle className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium text-gray-900">FAQs</div>
                <div className="text-sm text-gray-500">Find answers to common questions</div>
              </div>
            </button>
            
            <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <FileText className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Terms of Service</div>
                <div className="text-sm text-gray-500">Review our terms</div>
              </div>
            </button>
            
            <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-left">
              <Shield className="w-5 h-5 text-gray-500 mr-3" />
              <div>
                <div className="font-medium text-gray-900">Privacy Policy</div>
                <div className="text-sm text-gray-500">How we protect your data</div>
              </div>
            </button>
            
            <button className="flex items-center p-4 rounded-lg hover:bg-gray-50 transition-colors text-left text-red-600 md:col-span-2">
              <LogOut className="w-5 h-5 mr-3" />
              <div>
                <div className="font-medium">Logout</div>
                <div className="text-sm text-red-500">Sign out of your account</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}