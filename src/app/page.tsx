import { About } from '@/components/About';
import { Certifications } from '@/components/Certifications';
import { Contact } from '@/components/Contact';
import { Education } from '@/components/Education';
import { Experience } from '@/components/Experience';
import { Footer } from '@/components/Footer';
import HeroMain from '@/components/HeroMain';
import { Navbar } from '@/components/Navbar';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';

export default function Home() {
  return (
    // FIX: Added "overflow-hidden" here to prevent horizontal scrollbars
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />
      <HeroMain/>
      <About/>
      <Skills/>
      <Experience/>
      <Projects/>
      <Certifications/>
      <Education/>
      <Contact/>
      <Footer />
    </div>
  );
}