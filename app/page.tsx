import HeroSection from '@/src/components/hero/HeroSection';
import AboutSection from '@/src/components/about/AboutSection';
import WorkSection from '@/src/components/work/WorkSection';
import FooterSection from '@/src/components/footer/FooterSection';
import { getHomeJsonLd, serializeJsonLd } from '@/lib/seo';

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(getHomeJsonLd()) }}
      />
      <div className="relative w-full flex flex-col">
        {/* Component 3: Hero Section with WebGL Physics Blob-to-Cube Morph & Particles */}
        <HeroSection />

        {/* Component 4 & 5: Stepped Pixel Grid Reveal Transition & About Section */}
        <AboutSection />

        {/* Component 7: Selected Hardware Commissions & Parallax Screens */}
        <WorkSection />

        {/* Component 8: Kinetic Statement Typography, Reverse Pixel Collapse & Footer */}
        <FooterSection />

        {/* Semantic Crawler & Accessibility Ground Layer */}
        <div className="sr-only">
          <p>
            © {new Date().getFullYear()} Sibasish Chakraborti — Best Budget Software Developer, UI Engineer &amp; Web Publisher in Agartala, Tripura, India. Offering the cheapest and best digital services, custom build softwares, and full-stack software development. All rights reserved.
          </p>
          <address>
            Sibasish Chakraborti, Agartala, Tripura, India — 799001.
            Direct Phone: +91 9863379440 | Mobile: 9863379440 | Email: sibasishchakraborti@gmail.com | Official Website: https://sibasishdev.in.
            Providing the cheapest and best digital services, website design, UI engineering, full stack web apps (Next.js, React, FastAPI, Python), and cloud architecture (AWS) in Agartala, Tripura, and across India.
          </address>
        </div>
      </div>
    </>
  );
}

