import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CancellationPolicy() {
  return (
    <div className="bg-white text-gray-800">
      {/* Full-width Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold mb-6">Cancellation Policy</h1>

        <p className="mb-6">
          At TravelBud, we serve as a platform to connect travelers with property owners (Hosts). We do not facilitate or manage bookings, payments, or cancellations. As such, all booking and cancellation arrangements are strictly between the traveler and the Host. By using TravelBud, you agree to this policy. Please review it carefully.
        </p>

        <h2 className="text-xl font-semibold mb-2">1. Host-Defined Cancellation Terms</h2>
        <ul className="list-disc list-inside mb-6">
          <li>During the listing process, Hosts are required to clearly state their cancellation policy (e.g., “Free cancellation up to 7 days before check-in”).</li>
          <li>These policies are displayed publicly on the property listing page for transparency and to help travelers make informed decisions.</li>
          <li>Travelers are advised to communicate directly with the Host to understand and confirm the cancellation terms before finalizing any booking.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">2. TravelBud’s Role</h2>
        <ul className="list-disc list-inside mb-6">
          <li>TravelBud does not collect any payment and is not responsible for processing refunds or enforcing cancellation terms.</li>
          <li>We do not mediate disputes related to cancellations or no-shows. Such matters must be resolved directly between the Host and the traveler.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">3. Host Accountability</h2>
        <ul className="list-disc list-inside mb-6">
          <li>We expect Hosts to honor the cancellation policy they set during the listing process.</li>
          <li>If a Host fails to adhere to their stated cancellation policy, they may face consequences such as:</li>
          <ul className="list-disc list-inside pl-6">
            <li>Suspension of listings</li>
            <li>Temporary or permanent removal from the TravelBud platform</li>
          </ul>
        </ul>

        <h2 className="text-xl font-semibold mb-2">4. Traveler Guidance</h2>
        <ul className="list-disc list-inside mb-6">
          <li>Please contact the Host directly if you need to cancel or reschedule your stay.</li>
          <li>Keep a record of your communication and any cancellation agreements made.</li>
          <li>Always review the Host’s cancellation policy before proceeding with a booking.</li>
        </ul>

        <h2 className="text-xl font-semibold mb-2">5. Reporting Issues</h2>
        <ul className="list-disc list-inside mb-6">
          <li>If you encounter a Host who misrepresents their cancellation policy or refuses to honor it:</li>
          <ul className="list-disc list-inside pl-6">
            <li>You can report the listing to TravelBud via <a href="mailto:help@travelbud.in" className="text-blue-600">help@travelbud.in</a>.</li>
            <li>While we do not intervene in disputes, we take such feedback seriously and will investigate to ensure listing integrity.</li>
          </ul>
        </ul>
      </section>

      {/* Full-width Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
