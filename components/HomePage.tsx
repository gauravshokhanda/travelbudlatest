import { Home, Users, DollarSign, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import PrimaryButton from '@/components/PrimaryButton';
import LaunchNotice from '@/components/LaunchNotice';
import journey from '@/assets/images/journeys.png';
import gateway from '@/assets/images/gateway.png';
import paradise from '@/assets/images/paradise.png';
import inspiration from '@/assets/images/inspiration.png';
import cars from '@/assets/images/cars.png';
import contact_us from '@/assets/images/contact_us.png';
import '@/app/globals.css';

export default function HomePage() {
  const offerings = [
    { img: journey, text: 'Your Passport to Memorable Journeys' },
    { img: paradise, text: 'For Travellers, Find Your Perfect Getaway' },
    { img: gateway, text: 'For Hosts, Share Your Slice of Paradise' },
    { img: inspiration, text: 'Curate travel stories, tips, and inspiration' },
    { img: cars, text: 'Explore Hidden Gems Across India' },
  ];

  return (
    <div className="min-h-screen font-poppins">
      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-2xl text-primary mb-2">
            Open your home and heart to the world!
          </h2>
          <p className="text-text text-lg max-w-3xl mx-auto mb-12">
            List your property and open doors to travelers seeking authentic connections and unforgettable stays
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {[
              {
                Icon: Home,
                title: 'List',
                desc: 'Sign up & create a compelling listing with photos and details. Keep your calendar & pricing updated.',
              },
              {
                Icon: Users,
                title: 'Connect',
                desc: 'Travelers contact you directly—no middleman involved',
              },
              {
                Icon: DollarSign,
                title: 'Earn',
                desc: 'Keep all your earnings—no commission fees!',
              },
            ].map(({ Icon, title, desc }, idx) => (
              <div key={idx} className="text-center">
                <Icon className="mx-auto mb-4 text-primary" size={36} />
                <h3 className="text-xl mb-2">{title}</h3>
                <p className="text-text">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-secondary rounded-xl p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-heading mb-8">How It Will Work</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
              {["Browse", "Connect", "Book"].map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="text-accent mt-1" />
                  <div>
                    {step === "Browse" && <p><strong>Browse:</strong> Travelers discover properties with transparent pricing as set by host</p>}
                    {step === "Connect" && <p><strong>Connect:</strong> Travelers would contact property owners directly.</p>}
                    {step === "Book" && <p><strong>Book:</strong> Direct payment to hosts with no extra commission fees to guests or host.</p>}
                  </div>
                </div>
              ))}
            </div>
            <PrimaryButton>Start Hosting Today</PrimaryButton>
          </div>
        </div>
      </section>

      {/* Offerings Coming Soon */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-3xl text-primary mb-10">TravelBud Offerings Coming soon!</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {offerings.slice(0, 4).map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="rounded-xl overflow-hidden shadow">
                  <Image src={item.img} alt={item.text} className="w-full h-auto" placeholder="blur" />
                </div>
                <p className="mt-4">{item.text}</p>
              </div>
            ))}
            <div className="sm:col-span-2 md:col-span-4 text-center">
              <div className="inline-block rounded-xl overflow-hidden shadow w-1/2">
                <Image src={offerings[4].img} alt={offerings[4].text} className="w-full h-auto" placeholder="blur" />
              </div>
              <p className="mt-4">{offerings[4].text}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl text-primary mb-2">About us</h2>
          <div className="w-12 h-1 mx-auto bg-accent rounded mb-8"></div>
          <p className="text-text text-lg leading-relaxed mb-6">
            At TravelBud, we're your trusted companion for unforgettable travel experiences. Whether you're seeking a cozy home away from home, eager to open your doors to curious explorers, or simply looking for inspiration through captivating travel stories, we've got you covered.
          </p>
          <p className="text-text text-lg leading-relaxed">
            TravelBud was born from the passion and expertise of a dynamic trio of founders, each bringing a unique blend of experience to the table. They bring a wealth of experience from fintech, IT, and sales. Together, they're reshaping the way you discover and experience travel.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl text-primary">Contact Us</h2>
          <div className="w-12 h-1 mx-auto bg-accent rounded mt-2"></div>
        </div>
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-secondary rounded-3xl p-6 md:p-10 gap-6">
            <div className="rounded-3xl overflow-hidden">
              <Image src={contact_us} alt="contact" className="rounded-3xl w-full h-auto" placeholder="blur" />
            </div>
            <div className="text-center md:text-left">
              <p className="text-lg mb-2 text-heading">For any queries reach out to us at</p>
              <p className="text-primary text-lg">info@travelbud.in</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
