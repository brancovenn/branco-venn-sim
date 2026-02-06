import { motion } from "framer-motion";
import { Download, Monitor, Apple, Terminal } from "lucide-react";

const platforms = [
  {
    name: "Windows",
    icon: Monitor,
    file: "simgamepad.exe",
    ext: ".exe",
    href: "/downloads/simgamepad.exe",
  },
  {
    name: "macOS",
    icon: Apple,
    file: "simgamepad.dmg",
    ext: ".dmg",
    href: "/downloads/simgamepad.dmg",
  },
  {
    name: "Linux",
    icon: Terminal,
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
            const Icon = platform.icon;
            return (
              <motion.a
                key={platform.name}
                href={platform.href}
                className="group relative flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-10 transition-colors hover:border-muted-foreground/30"
                variants={cardVariants}
                whileHover={{ y: -4 }}
              >
                <Icon
                  size={48}
                  strokeWidth={1}
                  className="text-muted-foreground transition-colors group-hover:text-foreground"
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
