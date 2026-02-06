import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTransition from "@/components/PageTransition";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({
        title: "Missing fields",
        description: "Please fill in all fields before submitting.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setSending(true);

    // Simulate sending (replace with real API endpoint)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    toast({
      title: "Message sent",
      description: "We'll get back to you soon.",
    });

    setForm({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <PageTransition>
      <section className="flex min-h-screen items-center justify-center px-6 py-32 md:px-12">
        <div className="w-full max-w-lg">
          <motion.div
            className="mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4 text-4xl md:text-5xl font-bold tracking-tight">
              Get in Touch
            </h1>
            <p className="text-muted-foreground font-light">
              Have a question? We'd love to hear from you.
            </p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-xs font-light uppercase tracking-widest text-muted-foreground"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                maxLength={100}
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-card px-5 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-muted-foreground/40 focus:outline-none focus:ring-0 transition-colors"
                placeholder="Your name"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-xs font-light uppercase tracking-widest text-muted-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                value={form.email}
                onChange={handleChange}
                className="w-full rounded-lg border border-border bg-card px-5 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-muted-foreground/40 focus:outline-none focus:ring-0 transition-colors"
                placeholder="you@email.com"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-light uppercase tracking-widest text-muted-foreground"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                maxLength={1000}
                value={form.message}
                onChange={handleChange}
                className="w-full resize-none rounded-lg border border-border bg-card px-5 py-3.5 text-foreground placeholder:text-muted-foreground/50 focus:border-muted-foreground/40 focus:outline-none focus:ring-0 transition-colors"
                placeholder="Tell us what's on your mind..."
              />
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={sending}
              className="mt-2 flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-lg font-medium text-primary-foreground transition-opacity disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Send size={18} />
              {sending ? "Sending…" : "Send Message"}
            </motion.button>
          </motion.form>
        </div>
      </section>
    </PageTransition>
  );
};

export default Contact;
