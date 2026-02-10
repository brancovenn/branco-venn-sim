import { motion } from "framer-motion";
import { Download, Smartphone } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useRef } from "react";
import heroImage from "@/assets/hero-gamepad.png";

const HeroSection = () => {
  const location = useLocation();
  const previousPathRef = useRef<string | null>(null);
  
  // Detect if we're navigating from another page
  // location.key changes on navigation, 'default' on initial load/refresh
  // Also check if we came from a different path
  const isNavigating = location.key !== 'default' && 
                       location.key !== null && 
                       previousPathRef.current !== null && 
                       previousPathRef.current !== location.pathname;
  
  // Update previous path for next render
  previousPathRef.current = location.pathname;
  
  // CASE 1: Initial page load/refresh (isNavigating = false)
  //   → Use full delays (5.0s, 5.2s, 5.6s, 5.8s) to wait for intro animation
  // CASE 2: Navigating between pages (isNavigating = true)
  //   → Use instant delays (0s, 0.05s, 0.1s, 0.15s) for immediate appearance
  const isInitialPageLoad = !isNavigating;
  const delay = isInitialPageLoad ? 5.0 : 0;
  const delay2 = isInitialPageLoad ? 5.2 : 0.05;
  const delay3 = isInitialPageLoad ? 5.6 : 0.1;
  const delay4 = isInitialPageLoad ? 5.8 : 0.15;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background product image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="SIM Gamepad — phone as controller"
          className="h-full w-full object-cover object-center"
          loading="eager"
        />
      </div>

      {/* Cinematic gradient overlay: black left → transparent right */}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-transparent" />

      {/* Bottom vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />

      {/* Hero content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
          <div className="max-w-2xl">
            {/* Title */}
            <div className="mb-6 flex flex-col">
              <motion.h1
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold leading-[0.85] tracking-tighter"
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: delay,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                SIM
              </motion.h1>
              <motion.h1
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-extrabold leading-[0.85] tracking-tighter"
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: delay2,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                GAMEPAD
              </motion.h1>
            </div>

            {/* Subtitle */}
            <motion.p
              className="mb-10 text-lg md:text-xl font-light text-muted-foreground tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delay3 }}
            >
              Turn Your Phone Into a PC Controller
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: delay4 }}
            >
              <motion.a
                href="#downloads"
                className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={20} />
                Download Desktop
              </motion.a>
              <motion.a
                href="#mobile"
                className="inline-flex items-center justify-center gap-3 rounded-lg border border-border px-8 py-4 text-lg font-medium text-foreground transition-colors hover:bg-secondary"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Smartphone size={20} />
                Get Mobile App
              </motion.a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
