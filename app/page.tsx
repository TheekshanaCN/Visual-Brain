import InputSection from '@/components/InputSection';
import VisualMap from '@/components/VisualMap';
import InsightsPanel from '@/components/InsightsPanel';
import Toolbar from '@/components/Toolbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-neutral-950 text-white selection:bg-blue-500/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Main Components */}
      <InputSection />
      <VisualMap />
      <InsightsPanel />
      <Toolbar />
      <Footer />
      
      {/* Overlay for small screens (optional) */}
      <div className="md:hidden absolute inset-0 z-50 bg-black/80 flex items-center justify-center p-8 text-center backdrop-blur-sm">
        <p className="text-white/70">
          Please use a larger screen for the best Visual Brain experience.
        </p>
      </div>
    </main>
  );
}
