import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { LangProvider } from './context/LangContext';
import Cursor from './components/Cursor';
import Loader from './components/Loader';
import Nav from './components/Nav';
import Hero from './components/Hero';
import ProjectIntro from './components/ProjectIntro';
import ArchStory from './components/ArchStory';
import VisualJourney from './components/VisualJourney';
import Highlights from './components/Highlights';
import Stats from './components/Stats';
import Location from './components/Location';
import Floorplan from './components/Floorplan';
import Trust from './components/Trust';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

import './styles.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;

    // Init Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, [loaded]);

  return (
    <LangProvider>
      {!loaded && <Loader onComplete={() => setLoaded(true)} />}
      <div style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.4s ease 0.1s' }}>
        <Cursor />
        <Nav />
        <Hero />
        <ProjectIntro />
        <ArchStory />
        <VisualJourney />
        <Highlights />
        <Stats />
        <Location />
        <Floorplan />
        <Trust />
        <FAQ />
        <Contact />
        <Footer />
      </div>
    </LangProvider>
  );
}
