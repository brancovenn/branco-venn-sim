import { motion } from "framer-motion";

const MobileAppSection = () => {
  return (
    <section id="mobile" className="relative py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Get the Mobile App
          </h2>
          <p className="text-lg text-muted-foreground font-light">
            Transform your smartphone into a controller
          </p>
        </motion.div>

        {/* App Store Badges */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Google Play Badge */}
          <motion.a
            href="#"
            className="group flex items-center gap-4 rounded-xl border border-border bg-card px-8 py-4 transition-colors hover:border-muted-foreground/30"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-foreground" fill="currentColor">
              <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a1 1 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.8 8.99l-2.3 2.3L5.863 2.658z" />
            </svg>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Get it on
              </p>
              <p className="text-lg font-semibold -mt-0.5">Google Play</p>
            </div>
          </motion.a>

          {/* App Store Badge */}
          <motion.a
            href="#"
            className="group flex items-center gap-4 rounded-xl border border-border bg-card px-8 py-4 transition-colors hover:border-muted-foreground/30"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg viewBox="0 0 24 24" className="h-10 w-10 text-foreground" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Download on the
              </p>
              <p className="text-lg font-semibold -mt-0.5">App Store</p>
            </div>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileAppSection;
