import Navbar from '@/components/Navbar';
import RegisterForm from '@/components/auth/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-8">
          <RegisterForm />
        </div>
        
        {/* Right Side - Illustration */}
        <div className="hidden md:flex flex-1 flex-col justify-center gap-20 px-10 overflow-hidden">
                 <div className="flex flex-col items-center text-center">
                   <Image
                                src="/images/Ecohouse.png"
                                alt="Ecohouse"
                                width={140}
                                height={140}
                                className="mb-4"
                              />
                   <h2 className="text-xl font-semibold text-gray-900">Search perfect stays!</h2>
                   <p className="text-gray-500 mt-2">Search the best stays and capture your favorite moments.</p>
                 </div>
                 <div className="flex flex-col items-center text-center">
                   <Image
                               src="/images/Retirementestate.png"
                               alt="List your property"
                               width={140}
                               height={140}
                               className="mb-4"
                             />
                   <h2 className="text-xl font-semibold text-gray-900">List your property</h2>
                   <p className="text-gray-500 mt-2">List your property to earn and welcome travelers across the world.</p>
                 </div>
               </div>
      </div>
    </main>
  );
}