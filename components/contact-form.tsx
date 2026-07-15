"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [formStartedAt] = useState<number>(Date.now());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formStartedAt }),
      });

      if (!response.ok) {
        const data = await response
          .json()
          .catch(() => ({ error: "Terjadi kesalahan saat mengirim pesan." }));
        throw new Error(data.error || "Terjadi kesalahan saat mengirim pesan.");
      }

      setFormData({ name: "", email: "", subject: "", message: "", website: "" });
      setFeedback({
        type: "success",
        message: "Pesan berhasil dikirim. Saya akan membalas secepatnya.",
      });
    } catch (error) {
      setFeedback({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengirim pesan. Silakan coba lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-widest mb-2">
            Contact
          </p>
          <h1 className="text-4xl font-semibold text-[var(--text)] tracking-tight mb-4">
            Mari berbicara
          </h1>
          <p className="text-[var(--text-muted)] max-w-lg">
            Ada proyek menarik? Butuh konsultasi teknis? Atau sekadar ingin
            berkenalan — saya selalu terbuka.
          </p>
        </div>

        <div className="grid md:grid-cols-[2fr_3fr] gap-12">
          {/* Info */}
          <div>
            <h2 className="text-base font-semibold text-[var(--text)] mb-6">
              Hubungi saya
            </h2>
            <address className="not-italic space-y-4">
              {[
                { icon: Mail, text: "teguhwin8@gmail.com" },
                { icon: Phone, text: "+6285868474405" },
                { icon: MapPin, text: "Yogyakarta, Indonesia" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-3 text-sm text-[var(--text-muted)]"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--surface)] border border-[var(--border)]">
                    <Icon size={14} className="text-[var(--text)]" />
                  </div>
                  {text}
                </div>
              ))}
            </address>

            <div className="mt-10 p-5 clean-card">
              <p className="text-xs font-semibold text-[var(--text)] uppercase tracking-widest mb-3">
                Respons time
              </p>
              <p className="text-sm text-[var(--text-muted)]">
                Biasanya saya membalas dalam 24 jam di hari kerja.
              </p>
            </div>
          </div>

          {/* Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Honeypot */}
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) =>
                  setFormData({ ...formData, website: e.target.value })
                }
                className="hidden"
                aria-hidden="true"
              />

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-xs font-medium text-[var(--text)] mb-1.5"
                  >
                    Nama
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    className="form-input"
                    placeholder="Nama Anda"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="block text-xs font-medium text-[var(--text)] mb-1.5"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className="form-input"
                    placeholder="email@domain.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block text-xs font-medium text-[var(--text)] mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  className="form-input"
                  placeholder="Perihal pesan Anda"
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-medium text-[var(--text)] mb-1.5"
                >
                  Pesan
                </label>
                <textarea
                  id="contact-message"
                  className="form-input resize-none"
                  rows={5}
                  placeholder="Ceritakan tentang proyek atau kebutuhan Anda..."
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <motion.button
                type="submit"
                className="btn-primary"
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
              >
                <Send size={15} />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </motion.button>

              {feedback && (
                <p
                  className={`text-sm px-4 py-3 rounded-lg border ${
                    feedback.type === "success"
                      ? "bg-green-50 border-green-200 text-green-700"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  {feedback.message}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
