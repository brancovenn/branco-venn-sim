import { motion } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const TYPING_TEXT = "Branco Venn";
/** Duration for "Logo Branco Venn" to fade out (phase 1) */
const CONTENT_FADE_MS = 600;
/** Duration for black screen to fade out after content is gone (phase 2) */
const BLACK_FADE_MS = 600;

interface IntroAnimationProps {
  onComplete: () => void;
}

const IntroAnimation = ({ onComplete }: IntroAnimationProps) => {
  const [typingStarted, setTypingStarted] = useState(false);
  const [exiting, setExiting] = useState(false);
  const [blackFading, setBlackFading] = useState(false);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [textWidth, setTextWidth] = useState(0);

  const handleComplete = useCallback(onComplete, [onComplete]);

  // Measure full text width on mount so "Branco Venn" is never clipped
  useEffect(() => {
    if (measureRef.current) setTextWidth(measureRef.current.offsetWidth);
  }, []);

  // Start exit: hold ends → phase 1 (content fade) → phase 2 (black fade) → site
  useEffect(() => {
    const startMoveAndTyping = setTimeout(() => {
      setTypingStarted(true);
    }, 700);

    const typingDurationMs = TYPING_TEXT.length * 60;
    const holdDuration = 1400;
    const startExit = setTimeout(() => {
      setExiting(true);
    }, 700 + typingDurationMs + holdDuration);

    // After content has faded, start black screen fade
    const startBlackFade = setTimeout(() => {
      setBlackFading(true);
    }, 700 + typingDurationMs + holdDuration + CONTENT_FADE_MS);

    // After black has faded, unmount intro and show site
    const callComplete = setTimeout(() => {
      handleComplete();
    }, 700 + typingDurationMs + holdDuration + CONTENT_FADE_MS + BLACK_FADE_MS);

    return () => {
      clearTimeout(startMoveAndTyping);
      clearTimeout(startExit);
      clearTimeout(startBlackFade);
      clearTimeout(callComplete);
    };
  }, [handleComplete]);

  const contentFadeSec = CONTENT_FADE_MS / 1000;
  const blackFadeSec = BLACK_FADE_MS / 1000;

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Phase 2: black screen fades out only after Logo + text are fully gone */}
      <motion.div
        className="absolute inset-0 bg-background"
        initial={false}
        animate={{ opacity: blackFading ? 0 : 1 }}
        transition={{ duration: blackFadeSec, ease: "easeInOut" }}
      />
      {/* Phase 1: Logo + "Branco Venn" fade out first (black stays) */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        initial={false}
        animate={{ opacity: exiting ? 0 : 1 }}
        transition={{ duration: contentFadeSec, ease: "easeInOut" }}
      >
            <motion.div
              className="relative flex flex-row items-center gap-3 sm:gap-6 md:gap-8 px-4 sm:px-6 max-w-full"
              layout
              transition={{ layout: { duration: 0.6, ease: "easeInOut" } }}
            >
              {/* Hidden measure element (same font/size) so we never clip "Venn" */}
              <span
                ref={measureRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 opacity-0 font-intro text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.08em] sm:tracking-[0.12em] whitespace-nowrap"
              >
                {TYPING_TEXT}
              </span>
              {/* Logo: fades in centered, then stays at left as text appears */}
              <motion.div
                className="flex shrink-0 items-center justify-center"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img
                  src="/BV.svg"
                  alt="Branco Venn"
                  className="h-16 sm:h-28 md:h-36 lg:h-40 xl:h-44 w-auto object-contain dark:invert"
                />
              </motion.div>

              {/* Text: typing reveal from left to right (character-by-character feel) */}
              <motion.div
                className="overflow-hidden whitespace-nowrap font-intro text-3xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-[0.08em] sm:tracking-[0.12em]"
                initial={{ width: 0, opacity: 0 }}
                animate={
                  typingStarted
                    ? { width: textWidth ? textWidth + 8 : "16ch", opacity: 1 }
                    : { width: 0, opacity: 0 }
                }
                transition={{
                  width: {
                    duration: TYPING_TEXT.length * 0.06,
                    delay: 0,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 0.2, delay: 0 },
                }}
              >
                {TYPING_TEXT}
              </motion.div>
            </motion.div>
      </motion.div>
    </div>
  );
};

export default IntroAnimation;
