import { Clock } from 'lucide-react';

export default function LaunchNotice() {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl text-center">
      <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
        <Clock className="w-8 h-8 text-white" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        We are getting ready to Launch! Stay tuned!
      </h2>
      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
        TravelBud.in is coming soon with an amazing homestay experience. 
        Be the first to know when we launch and enjoy exclusive early access benefits.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <input 
          type="email" 
          placeholder="Enter your email for updates"
          className="px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-80"
        />
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors w-full sm:w-auto">
          Notify Me
        </button>
      </div>
    </div>
  );
}