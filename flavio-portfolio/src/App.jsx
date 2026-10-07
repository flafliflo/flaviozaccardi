import { useCallback, useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import useSmoothScroll, { setScrollLocked } from "./hooks/useSmoothScroll";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import About from "./components/About";
import Skills from "./components/Skills";
import Work from "./components/Work";
import Hobbies from "./components/Hobbies";
import Goal from "./components/Goal";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  const [ready, setReady] = useState(false);
  const handleLoaded = useCallback(() => setReady(true), []);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  useSmoothScroll();

  useEffect(() => {
    setScrollLocked(!ready);
    document.documentElement.classList.toggle("is-loading", !ready);
  }, [ready]);

  return (
    <>
      <Preloader onDone={handleLoaded} />
      <Cursor />
      <div className="grain" aria-hidden="true" />
      <motion.div className="scrollProgress" style={{ scaleX: progress }} aria-hidden="true" />

      <Nav ready={ready} />
      <main>
        <Hero ready={ready} />
        <Marquee />
        <About />
        <Skills />
        <Work />
        <Hobbies />
        <Goal />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
