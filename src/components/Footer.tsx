const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto max-w-7xl px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-logo text-sm font-light tracking-[0.3em] uppercase">
          BRANCO VENN
        </span>
        <p className="text-xs text-muted-foreground font-light">
          © {new Date().getFullYear()} Branco Venn. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
