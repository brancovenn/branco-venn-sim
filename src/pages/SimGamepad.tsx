import { motion } from "framer-motion";
import { Download, Smartphone, Gamepad2, Wifi, Zap, Monitor } from "lucide-react";
import { useRef } from "react";
import heroImage from "@/assets/hero-gamepad.png";
import PageTransition from "@/components/PageTransition";

const features = [
    {
        icon: <Wifi className="w-8 h-8 text-primary" />,
        title: "Ultra-Low Latency",
        description: "Connect via Wi-Fi or USB for an instantaneous, lag-free gaming experience locally on your network."
    },
    {
        icon: <Gamepad2 className="w-8 h-8 text-primary" />,
        title: "Customizable Layouts",
        description: "Adjust button sizes, layouts, and mappings to match any game or your personal preference."
    },
    {
        icon: <Zap className="w-8 h-8 text-primary" />,
        title: "Haptic Feedback",
        description: "Feel every action with advanced haptic vibration synchronization right in the palm of your hand."
    },
    {
        icon: <Monitor className="w-8 h-8 text-primary" />,
        title: "PC Integration",
        description: "Seamlessly pairs with the SimGamepad Desktop client, recognized natively as a standard PC gamepad."
    }
];

interface SimGamepadProps {
    isInitialVisit?: boolean;
}

const SimGamepad = ({ isInitialVisit = false }: SimGamepadProps) => {
    // Lock the prop value on mount so framer-motion delays don't abruptly change to 0
    const lockedInitialVisit = useRef(isInitialVisit).current;

    // Sync the animation delays identically to HeroSection
    const baseDelay = lockedInitialVisit ? 4.5 : 0;

    return (
        <PageTransition>
            <div className="min-h-screen bg-background pt-24 pb-16">

                {/* Dynamic Header Section */}
                <section className="relative overflow-hidden w-full max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-24 flex flex-col-reverse md:flex-row items-center gap-12">

                    <div className="flex-1 z-10">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ duration: 0.8, delay: baseDelay, ease: "easeOut" }}
                            className="inline-block px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium mb-6 tracking-wide"
                        >
                            Ultimate Mobile Control
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: baseDelay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                            className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6"
                        >
                            Sim Gamepad.
                            <br />
                            <span className="text-muted-foreground font-light">Your Phone is the Player 1.</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: baseDelay + 0.4, ease: "easeOut" }}
                            className="text-xl text-muted-foreground/80 leading-relaxed max-w-xl mb-10"
                        >
                            Don't have a controller? No problem. Sim Gamepad instantly transforms your smartphone into a high-performance PC controller with customizable layouts and ultra-low latency.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: baseDelay + 0.6 }}
                            className="flex flex-col sm:flex-row gap-4"
                        >
                            <a
                                href="https://brancovenn.com/downloads/SimGamepad.exe"
                                download
                                className="inline-flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground shadow-2xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                            >
                                <Download size={20} />
                                Get Desktop App
                            </a>
                            <a
                                href="#download-mobile"
                                className="inline-flex items-center justify-center gap-3 rounded-lg border border-border bg-background/50 backdrop-blur-md px-8 py-4 text-lg font-medium text-foreground transition-all hover:bg-secondary hover:scale-105 active:scale-95"
                            >
                                <Smartphone size={20} />
                                Get Mobile App
                            </a>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: baseDelay + 0.4, ease: "easeOut" }}
                        className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[600px] flex items-center justify-center"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-50 dark:opacity-30 rounded-full" />
                        <img
                            src={heroImage}
                            alt="Sim Gamepad App UI"
                            className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float-slow"
                        />
                    </motion.div>

                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                        {features.map((feature, i) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className="group p-8 rounded-3xl bg-secondary/30 border border-border hover:bg-secondary/60 transition-colors duration-500"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-background flex items-center justify-center shadow-lg shadow-black/5 mb-6 group-hover:scale-110 transition-transform duration-500">
                                    {feature.icon}
                                </div>
                                <h3 className="text-2xl font-semibold mb-4">{feature.title}</h3>
                                <p className="text-muted-foreground leading-relaxed text-lg">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </div>
        </PageTransition>
    );
};

export default SimGamepad;
