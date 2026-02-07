import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-20 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse" />
    );
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-20 rounded-full bg-slate-200 dark:bg-slate-700 p-1 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
      aria-label="Toggle theme"
    >
      {/* Sun icon on the left */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2">
        <Sun 
          className={`h-5 w-5 transition-opacity duration-300 ${
            isDark ? "text-slate-400 opacity-50" : "text-slate-600 opacity-100"
          }`}
          strokeWidth={2}
        />
      </div>

      {/* Moon icon on the right */}
      <div className="absolute right-2 top-1/2 -translate-y-1/2">
        <Moon 
          className={`h-5 w-5 transition-opacity duration-300 ${
            isDark ? "text-slate-300 opacity-100" : "text-slate-400 opacity-50"
          }`}
          strokeWidth={2}
        />
      </div>

      {/* Sliding toggle button */}
      <motion.div
        className="absolute top-1 h-8 w-8 rounded-full bg-teal-500 shadow-md flex items-center justify-center z-10"
        initial={false}
        animate={{
          x: isDark ? 40 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      >
        <Moon 
          className="h-4 w-4 text-black"
          strokeWidth={2.5}
        />
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
