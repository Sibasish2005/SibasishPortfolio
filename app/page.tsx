import HeroSection from '@/src/components/hero/HeroSection';
import AboutSection from '@/src/components/about/AboutSection';
import WorkSection from '@/src/components/work/WorkSection';
import FooterSection from '@/src/components/footer/FooterSection';

export default function Home() {
  return (
    <div className="relative w-full flex flex-col">
      {/* Component 3: Hero Section with WebGL Physics Blob-to-Cube Morph & Particles */}
      <HeroSection />

      {/* Component 4 & 5: Stepped Pixel Grid Reveal Transition & About Section */}
      <AboutSection />

      {/* Component 7: Selected Hardware Commissions & Parallax Screens */}
      <WorkSection />

      {/* Component 8: Kinetic Statement Typography, Reverse Pixel Collapse & Footer */}
      <FooterSection />
    </div>
  );
}
