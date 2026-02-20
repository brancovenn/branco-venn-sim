import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";
import iconImage from "@/assets/icon.png";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Product", path: "/product" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductDropdownOpen(false);
  }, [location.pathname]);

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${scrolled ? "bg-background/80 backdrop-blur-xl" : "bg-transparent"
          }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 4.0 }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo className="cursor-pointer w-12 h-12 md:w-16 md:h-16" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.label === "Product" ? (
                <div
                  key={link.path}
                  className="relative"
                  onMouseEnter={() => setProductDropdownOpen(true)}
                  onMouseLeave={() => setProductDropdownOpen(false)}
                >
                  <button className={`flex outline-none items-center gap-1 text-sm font-light tracking-widest uppercase transition-opacity duration-300 hover:opacity-100 ${location.pathname.startsWith('/product') ? "opacity-100" : "opacity-50"}`}>
                    {link.label}
                  </button>
                  <AnimatePresence>
                    {productDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 15, filter: "blur(4px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: 10, filter: "blur(2px)", transition: { duration: 0.15 } }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-2"
                      >
                        {/* The `pt-2` creates a transparent invisible hover bridge, preventing the menu from closing when moving mouse down */}
                        <div className="w-56 bg-background/30 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-2xl p-2.5 overflow-hidden flex flex-col relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-white/5 before:to-transparent before:pointer-events-none before:rounded-2xl">
                          <Link
                            to="/product"
                            className="w-full tracking-widest text-sm uppercase px-4 py-3.5 rounded-xl hover:bg-white/10 transition-colors duration-300 z-10 font-medium text-foreground relative group overflow-hidden"
                            onClick={() => setProductDropdownOpen(false)}
                          >
                            <span className="relative z-10">Overview</span>
                          </Link>

                          <div className="h-[1px] w-full bg-border/50 my-1" />

                          <Link
                            to="/product/sim-gamepad"
                            className="w-full tracking-widest text-sm uppercase px-4 py-3.5 rounded-xl hover:bg-white/10 transition-colors duration-300 z-10 font-bold text-primary flex items-center justify-between group"
                            onClick={() => setProductDropdownOpen(false)}
                          >
                            <span>Sim Gamepad</span>
                            <img src={iconImage} alt="Sim Gamepad Logo" className="w-7 h-7 object-contain group-hover:scale-110 transition-transform opacity-80 group-hover:opacity-100" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-light tracking-widest uppercase transition-opacity duration-300 hover:opacity-100 ${location.pathname === link.path
                    ? "opacity-100"
                    : "opacity-50"
                    }`}
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Desktop: Theme Toggle and Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <button
              className="md:hidden relative z-50"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.1 }}
                >
                  {link.label === "Product" ? (
                    <div className="flex flex-col items-center gap-6">
                      <span className="font-logo text-2xl tracking-[0.2em] opacity-40">PRODUCT</span>
                      <Link
                        to="/product"
                        className="font-logo text-xl tracking-[0.15em] opacity-80 hover:opacity-100 transition-opacity"
                        onClick={() => setMobileOpen(false)}
                      >
                        OVERVIEW
                      </Link>
                      <Link
                        to="/product/sim-gamepad"
                        className="font-logo text-xl tracking-[0.15em] text-primary hover:opacity-100 transition-opacity"
                        onClick={() => setMobileOpen(false)}
                      >
                        SIM GAMEPAD
                      </Link>
                    </div>
                  ) : (
                    <Link
                      to={link.path}
                      className={`font-logo text-2xl tracking-[0.2em] transition-opacity duration-300 hover:opacity-100 ${location.pathname === link.path
                        ? "opacity-100"
                        : "opacity-50"
                        }`}
                      onClick={() => setMobileOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navLinks.length * 0.1 + 0.1 }}
                className="mt-4"
              >
                <ThemeToggle />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
