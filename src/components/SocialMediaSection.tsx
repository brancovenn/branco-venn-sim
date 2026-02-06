import { motion } from "framer-motion";
import { useState } from "react";

const socials = [
  {
    name: "Instagram",
    handle: "@brancovenn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    handle: "Branco Venn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ),
  },
  {
    name: "Twitter",
    handle: "@brancovenn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "Discord",
    handle: "Branco Venn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" className="h-8 w-8" fill="currentColor">
        <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z" />
      </svg>
    ),
  },
];

const rotations = [-12, -4, 4, 12];
const xOffsets = [-200, -70, 70, 200];
const mobileXOffsets = [-100, -35, 35, 100];

const SocialMediaSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative py-32 md:py-40 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Follow Us
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Stay connected across platforms
          </p>
        </motion.div>

        {/* Fan-style cards */}
        <div className="relative flex items-center justify-center h-[380px] md:h-[420px]">
          {socials.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              className="absolute w-48 h-64 md:w-60 md:h-80 rounded-2xl border border-border bg-card p-6 md:p-8 cursor-pointer flex flex-col items-center justify-center gap-4 md:gap-6"
              style={{
                zIndex: hoveredIndex === i ? 50 : socials.length - Math.abs(i - 1.5),
              }}
              initial={{
                rotate: rotations[i],
                x: mobileXOffsets[i],
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                rotate: rotations[i],
                x: typeof window !== "undefined" && window.innerWidth > 768 ? xOffsets[i] : mobileXOffsets[i],
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              whileHover={{
                scale: 1.12,
                rotate: 0,
                zIndex: 50,
                boxShadow: "0 25px 60px -15px rgba(255,255,255,0.08)",
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
            >
              <div className="text-muted-foreground transition-colors group-hover:text-foreground">
                {social.icon}
              </div>
              <div className="text-center">
                <h3 className="text-lg md:text-xl font-semibold mb-1">
                  {social.name}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {social.handle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialMediaSection;
