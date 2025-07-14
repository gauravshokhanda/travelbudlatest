'use client';

import { useSelector } from 'react-redux';
import { RootState } from '@/store'; // adjust this path based on your setup
import Link from 'next/link';
import Image from 'next/image';
import { Home, List, User, LogIn } from 'lucide-react';

export default function Navbar() {
  const user = useSelector((state: RootState) => state.auth.user); // or whatever your slice is

  return (
    <>
      {/* Top Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/TravelBud.png"
                alt="TravelBud Logo"
                width={120}
                height={40}
                className="object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-10 ml-auto">
              {user ? (
                <>
                  <Link href="/booking" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Booking
                  </Link>
                  <Link href="/listing" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Listing
                  </Link>
                  <Link href="/profile" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                    Profile
                  </Link>
                </>
              ) : (
                <Link href="/login" className="text-gray-600 hover:text-blue-600 text-sm font-medium">
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Nav */}
      <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-50">
        {user ? (
          <>
            <Link href="/booking" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600">
              <Home size={20} />
              <span>Booking</span>
            </Link>
            <Link href="/listing" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600">
              <List size={20} />
              <span>Listing</span>
            </Link>
            <Link href="/profile" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600">
              <User size={20} />
              <span>Profile</span>
            </Link>
          </>
        ) : (
          <Link href="/login" className="flex flex-col items-center text-sm text-gray-600 hover:text-blue-600">
            <LogIn size={20} />
            <span>Log in</span>
          </Link>
        )}
      </div>
    </>
  );
}
