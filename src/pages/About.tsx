import { motion } from "framer-motion";
import PageTransition from "@/components/PageTransition";

const About = () => {
  return (
    <PageTransition>
      <section className="flex min-h-screen items-center justify-center px-6 md:px-12">
        <div className="max-w-3xl text-center">
          <motion.p
            className="mb-8 font-logo text-xs tracking-[0.4em] text-muted-foreground uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Our Manifesto
          </motion.p>
          <motion.h1
            className="mb-8 text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We build immersive interfaces
            <br />
            <span className="text-muted-foreground">
              between humans and machines.
            </span>
          </motion.h1>
          <motion.div
            className="mx-auto max-w-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="text-lg text-muted-foreground font-light leading-relaxed">
              At Branco Venn, we believe technology should feel invisible. Our
              products dissolve the boundary between intention and action—
              creating seamless connections between you and your digital world.
            </p>
          </motion.div>

          {/* Decorative line */}
          <motion.div
            className="mx-auto mt-16 h-px w-24 bg-border"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          />
        </div>
      </section>
    </PageTransition>
  );
};

export default About;
