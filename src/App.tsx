import { useState, useCallback, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@/components/ThemeProvider";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Product from "./pages/Product";
import SimGamepad from "./pages/SimGamepad";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Use simple local state. When the user hard refreshes, App remounts and showIntro is true.
  // When they navigate via React Router (e.g., Home -> About -> Home), App does NOT remount, 
  // so showIntro remains false and the intro does not play again.
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false);
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence>
              {showIntro && (
                <IntroAnimation
                  key="intro"
                  onComplete={handleIntroComplete}
                />
              )}
            </AnimatePresence>
            <Navbar />
            <Routes>
              {/* Pass whether the intro is currently showing down so HeroSection can delay its animation perfectly */}
              <Route path="/" element={<Index isInitialVisit={showIntro} />} />
              <Route path="/product" element={<Product />} />
              <Route path="/product/sim-gamepad" element={<SimGamepad isInitialVisit={showIntro} />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
