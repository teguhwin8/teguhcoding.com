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
    const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
    const [formStartedAt] = useState<number>(Date.now());

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setFeedback(null);

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...formData,
                    formStartedAt,
                }),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({ error: "Terjadi kesalahan saat mengirim pesan." }));
                throw new Error(data.error || "Terjadi kesalahan saat mengirim pesan.");
            }

            setFormData({
                name: "",
                email: "",
                subject: "",
                message: "",
                website: "",
            });
            setFeedback({
                type: "success",
                message: "Pesan berhasil dikirim. Saya akan membalas secepatnya.",
            });
        } catch (error) {
            setFeedback({
                type: "error",
                message: error instanceof Error ? error.message : "Gagal mengirim pesan. Silakan coba lagi.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 px-4">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl font-bold mb-2">Contact</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-12">Hubungi saya untuk kolaborasi atau kesempatan kerja.</p>

                <div className="grid md:grid-cols-2 gap-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
                        <address className="not-italic">
                            <div className="space-y-4 mb-8">
                                <div className="flex items-center space-x-3">
                                    <Mail className="text-gray-600 dark:text-gray-300" />
                                    <span>teguhwin8@gmail.com</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <Phone className="text-gray-600 dark:text-gray-300" />
                                    <span>+6285868474405</span>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <MapPin className="text-gray-600 dark:text-gray-300" />
                                    <span>Yogyakarta, Indonesia</span>
                                </div>
                            </div>
                        </address>
                    </div>

                    <div>
                        <form onSubmit={handleSubmit} className="space-y-4">
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
                            <div>
                                <label htmlFor="contact-name" className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    id="contact-name"
                                    type="text"
                                    className="w-full p-2 border-2 border-black dark:border-white rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-email" className="block text-sm font-medium mb-1">Email</label>
                                <input
                                    id="contact-email"
                                    type="email"
                                    className="w-full p-2 border-2 border-black dark:border-white rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-subject" className="block text-sm font-medium mb-1">
                                    Subject
                                </label>
                                <input
                                    id="contact-subject"
                                    type="text"
                                    className="w-full p-2 border-2 border-black dark:border-white rounded bg-white dark:bg-gray-800 text-black dark:text-white"
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subject: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="contact-message" className="block text-sm font-medium mb-1">
                                    Message
                                </label>
                                <textarea
                                    id="contact-message"
                                    className="w-full p-2 border-2 border-black dark:border-white rounded h-32 bg-white dark:bg-gray-800 text-black dark:text-white"
                                    value={formData.message}
                                    onChange={(e) =>
                                        setFormData({ ...formData, message: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <motion.button
                                type="submit"
                                className="retro-button px-6 py-2 flex items-center"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={isSubmitting}
                            >
                                <Send size={20} className="mr-2" />
                                {isSubmitting ? "Sending..." : "Send Message"}
                            </motion.button>
                            {feedback && (
                                <p
                                    className={`text-sm ${feedback.type === "success"
                                        ? "text-green-600 dark:text-green-400"
                                        : "text-red-600 dark:text-red-400"
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
