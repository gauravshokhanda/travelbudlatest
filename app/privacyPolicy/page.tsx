import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <div className="bg-white text-gray-800">
      {/* Full-width Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Centered Content Section */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy and Legal</h1>

        <p className="mb-6">
          Welcome to TravelBud! We value your trust and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data. By using TravelBud, you agree to this policy.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>

        <h3 className="font-semibold mt-4 mb-1">a. Personal Information</h3>
        <ul className="list-disc list-inside mb-4">
          <li>Name, email, phone number, and address</li>
          <li>Payment details (bank/card for transactions)</li>
          <li>Identification documents (for verification)</li>
        </ul>

        <p className="font-semibold text-sm text-black mb-6">
          Note: TravelBud does not handle bookings or payments. All transactions occur outside the platform.
        </p>

        <h3 className="font-semibold mt-4 mb-1">b. Non-Personal Information</h3>
        <ul className="list-disc list-inside mb-6">
          <li>Device info (IP, browser, OS)</li>
          <li>Usage data (pages viewed, time on site)</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
        <ul className="list-disc list-inside mb-6">
          <li>To list properties and manage bookings</li>
          <li>To process and manage transactions</li>
          <li>To send confirmations and updates</li>
          <li>To personalize your experience</li>
          <li>To comply with legal requirements</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Sharing Your Information</h2>
        <ul className="list-disc list-inside mb-6">
          <li>With hosts/guests to enable communication</li>
          <li>With service providers (e.g., payments, support)</li>
          <li>With legal authorities when required</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
        <p className="mb-6">
          We take steps to secure your data. However, no method is 100% secure. Please protect your login credentials.
        </p>

        <h2 className="text-xl font-semibold mb-2">5. Cookies</h2>
        <p className="mb-6">
          We use cookies to improve your experience. You can control cookies in your browser settings.
        </p>

        <h2 className="text-xl font-semibold mb-2">6. Your Rights</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Access your data</li>
          <li>Request corrections or deletion</li>
          <li>Opt-out of marketing emails</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">7. Data Retention</h2>
        <p className="mb-6">
          We retain your data only as long as necessary or as required by law.
        </p>

        <h2 className="text-xl font-semibold mb-2">8. Third-Party Links</h2>
        <p className="mb-6">
          We’re not responsible for the privacy practices of linked websites.
        </p>

        <h2 className="text-xl font-semibold mb-2">9. Children’s Privacy</h2>
        <p className="mb-6">
          We don’t knowingly collect data from anyone under 18. Contact us if you believe a child has shared info.
        </p>

        <h2 className="text-xl font-semibold mb-2">10. Policy Changes</h2>
        <p className="mb-6">
          We may update this policy. Continued use of TravelBud means you accept the updated version.
        </p>

        <h2 className="text-xl font-semibold mb-2">11. Contact Us</h2>
        <p>
          Email: <a href="mailto:support@travelbud.in" className="text-blue-600">support@travelbud.in</a>
        </p>
      </section>

      {/* Full-width Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
