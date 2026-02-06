import { motion } from "framer-motion";
import {
  Zap,
  Navigation,
  Settings,
  Fingerprint,
  Wifi,
  Bluetooth,
  Usb,
} from "lucide-react";
import PageTransition from "@/components/PageTransition";

const features = [
  {
    icon: Zap,
    title: "Low Latency",
    desc: "Ultra-responsive input with sub-millisecond delay for competitive gameplay.",
  },
  {
    icon: Navigation,
    title: "Gyro Steering",
    desc: "Precision motion control using your phone's gyroscope for immersive racing.",
  },
  {
    icon: Settings,
    title: "Custom Mapping",
    desc: "Fully remappable buttons and layouts tailored to every game.",
  },
  {
    icon: Fingerprint,
    title: "Touch Controls",
    desc: "Intuitive on-screen gamepad with haptic feedback and pressure sensitivity.",
  },
  {
    icon: Wifi,
    title: "Wi-Fi",
    desc: "Wireless connection over your local network for cable-free gaming.",
  },
  {
    icon: Bluetooth,
    title: "Bluetooth",
    desc: "Direct Bluetooth pairing for portable and on-the-go setups.",
  },
  {
    icon: Usb,
    title: "USB",
    desc: "Wired USB connection for zero-latency competitive play.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

const Product = () => {
  return (
    <PageTransition>
      <section className="min-h-screen pt-32 pb-24 md:pt-44 md:pb-40">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          {/* Header */}
          <motion.div
            className="mb-20 max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="mb-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Built for
              <br />
              Performance
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed">
              SIM Gamepad connects your phone to your PC with precision input,
              multiple connectivity options, and fully customizable controls.
            </p>
          </motion.div>

          {/* Feature grid */}
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  className="group rounded-2xl border border-border bg-card p-8 transition-colors hover:border-muted-foreground/30"
                  variants={itemVariants}
                  whileHover={{ y: -4 }}
                >
                  <Icon
                    size={36}
                    strokeWidth={1.2}
                    className="mb-5 text-muted-foreground transition-colors group-hover:text-foreground"
                  />
                  <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground font-light leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Product;
