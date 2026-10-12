import React, { useState, useEffect } from 'react';
import { ClinicProvider } from './context/ClinicContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { TrustBar } from './components/TrustBar';
import { AboutSection } from './components/AboutSection';
import { SpecialtySection } from './components/SpecialtySection';
import { BookingSteps } from './components/BookingSteps';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { MobileActionBar } from './components/MobileActionBar';
import { InteractiveMapModal } from './components/InteractiveMapModal';
import { AdminDashboard } from './components/AdminDashboard';

const MainLandingContent: React.FC = () => {
  const [mapModalOpen, setMapModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-cream text-slateText flex flex-col font-sans selection:bg-turquoise/20 selection:text-navy">
      {/* Top Header Navigation */}
      <Header />

      {/* Main Content Area */}
      <main className="flex-grow pb-12 md:pb-0">
        <Hero />
        <TrustBar />
        <AboutSection />
        <SpecialtySection />
        <BookingSteps />
        <LocationSection onOpenMapScreenshot={() => setMapModalOpen(true)} />
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Bottom Fixed Action Bar (Call & WhatsApp) */}
      <MobileActionBar />

      {/* Interactive Map Landmark Preview Modal */}
      <InteractiveMapModal
        isOpen={mapModalOpen}
        onClose={() => setMapModalOpen(false)}
      />
    </div>
  );
};

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'site' | 'admin'>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        return 'admin';
      }
    }
    return 'site';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname.toLowerCase();
      const hash = window.location.hash.toLowerCase();
      if (path === '/admin' || path.startsWith('/admin/') || hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('site');
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  const backToSite = () => {
    setCurrentView('site');
    window.history.pushState(null, '', '/');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <ClinicProvider>
      {currentView === 'admin' ? (
        <AdminDashboard onBackToSite={backToSite} />
      ) : (
        <MainLandingContent />
      )}
    </ClinicProvider>
  );
};

export default App;
