import Navbar from '@/components/Navbar';
import ProfilePage from '@/components/ProfilePage';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function Profile() {
  return (
    <main>
      <Navbar />
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>

      <Footer />
    </main>
  );
}