import { useTheme } from "next-themes";
import { useEffect, useState, useRef } from "react";

interface LogoProps {
  className?: string;
  width?: number | string;
  height?: number | string;
}

const Logo = ({ className = "", width = 40, height = 40 }: LogoProps) => {
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
        const response = await fetch("/BV.svg");
        const svgText = await response.text();
        setLogoSvg(svgText);
      } catch (error) {
        console.error("Failed to load logo:", error);
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

    // Parse and update SVG
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(logoSvg, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Update all fill attributes
    const updateFills = (element: Element) => {
      if (element.hasAttribute("fill")) {
        const currentFill = element.getAttribute("fill");
        if (currentFill === "#000000" || currentFill === "#000" || currentFill === "black") {
          element.setAttribute("fill", fillColor);
        } else if (currentFill === "#ffffff" || currentFill === "#fff" || currentFill === "white") {
          element.setAttribute("fill", fillColor);
        }
      }
      Array.from(element.children).forEach(updateFills);
    };

    updateFills(svgElement);

    // Serialize and update
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
        style={{ width, height }}
        aria-label="Branco Venn Logo"
      />
    );
  }

  // Check if className has width/height classes, if so don't use inline styles
  const hasSizeClasses = className.includes('w-') || className.includes('h-');
  
  return (
    <div
      ref={containerRef}
      className={`inline-flex items-center justify-center ${className}`}
      style={hasSizeClasses ? {} : { width, height }}
      aria-label="Branco Venn Logo"
    />
  );
};

export default Logo;
