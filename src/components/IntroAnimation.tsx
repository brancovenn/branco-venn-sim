import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [exiting, setExiting] = useState(false);

  const handleComplete = useCallback(onComplete, [onComplete]);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 2800);
    const t3 = setTimeout(() => setExiting(true), 3600);
    const t4 = setTimeout(() => handleComplete(), 4200);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [handleComplete]);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <div className="flex flex-col items-center gap-2 md:gap-4">
            {/* Branco line */}
            <motion.div
              className="font-intro text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light tracking-[0.15em]"
              animate={
                phase === 3
                  ? { y: -140, opacity: 0, filter: "blur(14px)" }
                  : {}
              }
              transition={{ duration: 0.8, ease: [0.45, 0, 0.15, 1] }}
            >
              <span className="inline-flex items-baseline">
                <span>B</span>
                <motion.span
                  className="inline-block overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    phase >= 2
                      ? { width: "auto", opacity: 1 }
                      : { width: 0, opacity: 0 }
                  }
                  transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <span className="inline-block">ranco</span>
                </motion.span>
              </span>
            </motion.div>

            {/* Venn line */}
            <motion.div
              className="font-intro text-6xl sm:text-7xl md:text-8xl lg:text-[9rem] font-light tracking-[0.15em]"
              animate={
                phase === 3
                  ? { y: 140, opacity: 0, filter: "blur(14px)" }
                  : {}
              }
              transition={{ duration: 0.8, ease: [0.45, 0, 0.15, 1] }}
            >
              <span className="inline-flex items-baseline">
                <span>V</span>
                <motion.span
                  className="inline-block overflow-hidden"
                  initial={{ width: 0, opacity: 0 }}
                  animate={
                    phase >= 2
                      ? { width: "auto", opacity: 1 }
                      : { width: 0, opacity: 0 }
                  }
                  transition={{
                    duration: 0.9,
                    ease: [0.25, 0.1, 0.25, 1],
                    delay: 0.1,
                  }}
                >
                  <span className="inline-block">enn</span>
                </motion.span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroAnimation;
