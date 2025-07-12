import Link from 'next/link';
import { Instagram, PlayCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#f1f2f4] text-black">
      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Top Row of Links */}
        <div className="flex flex-wrap justify-between items-center border-b border-gray-300 pb-4">
          <div className="flex flex-wrap gap-6 text-sm font-medium">
            <Link href="/about" className="hover:underline">About us</Link>
            <Link href="/terms&condition" className="hover:underline">Terms & Conditions</Link>
            <Link href="/privacyPolicy" className="hover:underline">Privacy Policy</Link>
            <Link href="/hostCancellation&Refund" className="hover:underline">Cancellation & Refund</Link>
            <Link href="/contact" className="hover:underline">Contact Us</Link>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <Link href="#" className="border border-black p-1.5 rounded-md hover:bg-gray-100">
              <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" className="border border-black p-1.5 rounded-md hover:bg-gray-100">
              <PlayCircle className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-4 text-sm text-gray-600">
          <p>TravelBud.in © 2025 | All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
