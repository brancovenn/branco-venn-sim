import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

// Platform logo SVGs - Latest official designs
const WindowsLogo = ({ className }: { className?: string }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoSvg, setLogoSvg] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch("/windows-logo.svg");
        const svgText = await response.text();
        setLogoSvg(svgText);
      } catch (error) {
        console.error("Failed to load Windows logo:", error);
      }
    };

    if (mounted) {
      loadSvg();
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !logoSvg || !containerRef.current) return;

    const currentTheme = resolvedTheme || theme || "dark";
    const fillColor = currentTheme === "dark" ? "#ffffff" : "#000000";

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(logoSvg, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Update all path elements to use the theme color
    const paths = svgElement.querySelectorAll("path");
    paths.forEach((path) => {
      path.setAttribute("fill", fillColor);
    });

    // Set SVG size and ensure proper viewBox
    svgElement.setAttribute("width", "48");
    svgElement.setAttribute("height", "48");
    svgElement.setAttribute("viewBox", "0 0 88 88");
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgElement.style.width = "100%";
    svgElement.style.height = "100%";

    const serializer = new XMLSerializer();
    const updatedSvg = serializer.serializeToString(svgElement);

    if (containerRef.current) {
      containerRef.current.innerHTML = updatedSvg;
    }
  }, [theme, resolvedTheme, mounted, logoSvg]);

  if (!mounted) {
    return (
      <div
        className={className}
        aria-label="Windows Logo"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className} flex items-center justify-center`}
      style={{ width: '48px', height: '48px' }}
      aria-label="Windows Logo"
    />
  );
};

const MacOSLogo = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const LinuxLogo = ({ className }: { className?: string }) => {
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [logoSvg, setLogoSvg] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const loadSvg = async () => {
      try {
        const response = await fetch("/linux-logo.svg");
        const svgText = await response.text();
        setLogoSvg(svgText);
      } catch (error) {
        console.error("Failed to load Linux logo:", error);
      }
    };

    if (mounted) {
      loadSvg();
    }
  }, [mounted]);

  useEffect(() => {
    if (!mounted || !logoSvg || !containerRef.current) return;

    const currentTheme = resolvedTheme || theme || "dark";
    const fillColor = currentTheme === "dark" ? "#ffffff" : "#000000";

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(logoSvg, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Update all path and shape elements to use the theme color
    const updateFills = (element: Element) => {
      if (element.hasAttribute("fill") && element.getAttribute("fill") !== "none") {
        const currentFill = element.getAttribute("fill");
        // Only update if it's a color (not gradients, patterns, etc.)
        if (currentFill && currentFill !== "none" && !currentFill.startsWith("url(")) {
          element.setAttribute("fill", fillColor);
        }
      }
      Array.from(element.children).forEach(updateFills);
    };

    updateFills(svgElement);

    // Set SVG size and ensure proper viewBox
    if (!svgElement.hasAttribute("viewBox")) {
      svgElement.setAttribute("viewBox", "0 0 512 512");
    }
    svgElement.setAttribute("width", "48");
    svgElement.setAttribute("height", "48");
    svgElement.setAttribute("preserveAspectRatio", "xMidYMid meet");
    svgElement.style.width = "100%";
    svgElement.style.height = "100%";

    const serializer = new XMLSerializer();
    const updatedSvg = serializer.serializeToString(svgElement);

    if (containerRef.current) {
      containerRef.current.innerHTML = updatedSvg;
    }
  }, [theme, resolvedTheme, mounted, logoSvg]);

  if (!mounted) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{ width: '48px', height: '48px' }}
        aria-label="Linux Logo"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`${className} flex items-center justify-center`}
      style={{ width: '48px', height: '48px' }}
      aria-label="Linux Logo"
    />
  );
};

const platforms = [
  {
    name: "Windows",
    logo: WindowsLogo,
    file: "SimGamepad.exe",
    ext: ".exe",
    href: "/downloads/SimGamepad.exe",
    download: true,
  },
  {
    name: "macOS",
    logo: MacOSLogo,
    file: "simgamepad.dmg",
    ext: ".dmg",
    href: "/downloads/simgamepad.dmg",
  },
  {
    name: "Linux",
    logo: LinuxLogo,
    file: "simgamepad.AppImage",
    ext: ".AppImage",
    href: "/downloads/simgamepad.AppImage",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const DownloadSection = () => {
  return (
    <section id="downloads" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Download for Desktop
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Available for all major platforms
          </p>
        </motion.div>

        {/* Platform cards */}
        <motion.div
          className="grid gap-6 md:grid-cols-3 md:gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {platforms.map((platform) => {
            const Logo = platform.logo;
            return (
              <motion.a
                key={platform.name}
                href={platform.href}
                download={platform.download ? true : undefined}
                className="group relative flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 transition-colors hover:border-muted-foreground/30"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <Logo
                  className="h-12 w-12 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:drop-shadow-[0_0_8px_currentColor]"
                />
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-1">
                    {platform.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {platform.ext}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-secondary px-5 py-2.5 text-sm font-medium transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Download size={16} />
                  Download
                </div>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadSection;
