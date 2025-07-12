import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function TermsAndConditions() {
  return (
    <div className="bg-white text-gray-800">
      <div className="w-full">
        <Navbar />
      </div>

      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Terms & Conditions</h1>

        <p className="mb-6">
          Welcome to TravelBud! These Terms & Conditions outline the rules and obligations for using our website and app for listing and booking properties. By using TravelBud, you agree to these terms. Please read them carefully before proceeding.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Acceptance of Terms</h2>
        <p className="mb-6">
          By accessing TravelBud, you confirm your acceptance of these Terms & Conditions. If you do not agree, please refrain from using our services. These terms apply to all users, including hosts, guests, and visitors.
        </p>

        <h2 className="text-xl font-semibold mb-2">2. Eligibility</h2>
        <p className="mb-6">
          You must be at least 18 years old to use TravelBud. By creating an account, you verify that all the information provided is accurate and agree to update it as necessary.
        </p>

        <h2 className="text-xl font-semibold mb-2">3. Account Registration</h2>
        <ul className="list-disc list-inside mb-6">
          <li>To use TravelBud’s features, such as hosting or booking, you must register an account.</li>
          <li>You are responsible for maintaining the confidentiality of your login details and ensuring all activities under your account comply with these terms.</li>
          <li>Inform us immediately if you suspect unauthorized access to your account.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. Hosting Responsibilities</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Ensure your property complies with all local laws, regulations, and safety standards.</li>
          <li>Provide accurate details about your property, including amenities, pricing, and availability.</li>
          <li>You are responsible for collecting and remitting taxes (e.g., GST) as required by Indian laws.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">5. TravelBud’s Role</h2>
        <ul className="list-disc list-inside mb-6">
          <li>TravelBud is only a listing and communication platform that connects travelers with property owners.</li>
          <li>TravelBud does not facilitate bookings, payments, or transactions, nor is it a party to any rental agreement.</li>
          <li>All communications, bookings, and payments must be handled directly between travelers and property owners.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">6. Booking & Cancellations</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Any booking-related terms (such as availability, pricing, or cancellation policies) are set and enforced solely by the host.</li>
          <li>TravelBud is not responsible for cancellations, refunds, or any agreements between the host and the traveler.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">7. User Conduct</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Use the platform for lawful purposes and in compliance with these terms.</li>
          <li>Provide accurate information and refrain from fraudulent activities.</li>
          <li>Respect the rights and property of other users.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">8. Prohibited Activities</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Violate any local, state, or national laws.</li>
          <li>Misrepresent information about your property or identity.</li>
          <li>Disrupt, damage, or interfere with the platform’s functionality or security.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">9. Taxes and GST Compliance</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Hosts are solely responsible for understanding and fulfilling their tax obligations under Indian regulations, including GST.</li>
          <li>TravelBud does not collect, withhold, or remit any taxes on behalf of users.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">10. Disputes and Liability</h2>
        <ul className="list-disc list-inside mb-6">
          <li>TravelBud does not own, operate, or manage any property listed on the platform.</li>
          <li>TravelBud is not liable for any issues, damages, losses, or disputes that may arise from stays, transactions, or interactions between hosts and travelers.</li>
          <li>All disputes must be resolved directly between the concerned parties.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">11. Termination of Service</h2>
        <p className="mb-6">
          TravelBud reserves the right to suspend or terminate your account if you violate these terms or engage in activities harmful to the platform or its users.
        </p>

        <h2 className="text-xl font-semibold mb-2">12. Modifications to Terms</h2>
        <p className="mb-6">
          We may update these Terms & Conditions periodically. Changes will be notified on our platform, and continued use constitutes acceptance of the updated terms.
        </p>

        <h2 className="text-xl font-semibold mb-2">13. Governing Law and Jurisdiction</h2>
        <p className="mb-6">
          These Terms & Conditions are governed by Indian law. Any disputes arising from these terms will fall under the jurisdiction of courts in Delhi, India.
        </p>

        <h2 className="text-xl font-semibold mb-2">14. Contact Us</h2>
        <p className="mb-6">
          For any questions or support, contact us at <a href="mailto:help@travelbud.in" className="text-blue-600">help@travelbud.in</a>.
        </p>

        <p className="font-medium">
          By using TravelBud, you confirm your understanding and agreement to these Terms & Conditions.
        </p>
      </section>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
