"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { MessageCircle, RotateCcw, Send, X } from "lucide-react";
import { BOT_NAME, WHATSAPP_URL } from "@/lib/chatbot/constants";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const STORAGE_KEY = "teguh-chat-v1";
const MAX_CHARS = 500;
const GREETING: Message = {
  role: "assistant",
  content:
    "Halo, saya Asisten Teguh (asisten AI). Ada yang bisa saya bantu soal pembuatan website, aplikasi, atau keamanan website?",
};
const QUICK_REPLIES = ["Mau bikin website sekolah", "Website saya kena judol", "Berapa kisaran harganya?"];

function loadMessages(): Message[] {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Message[];
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {
    // sessionStorage bisa tidak tersedia (mode privat, dll.)
  }
  return [GREETING];
}

function saveMessages(messages: Message[]) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch {
    // abaikan
  }
}

// Ubah URL di jawaban bot jadi link yang bisa diklik, tanpa dangerouslySetInnerHTML.
function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 break-all"
          >
            {part}
          </a>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(loadMessages());
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => () => abortRef.current?.abort(), []);

  if (pathname?.startsWith("/bahlil")) return null;

  const send = async (text: string) => {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || loading) return;

    const history = [...messages.filter((m) => !m.error), { role: "user" as const, content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);

    const controller = new AbortController();
    abortRef.current = controller;
    let reply = "";
    let failed = false;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || `Maaf, asisten sedang bermasalah. Hubungi Teguh lewat WhatsApp: ${WHATSAPP_URL}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: reply }]);
      }
    } catch (error) {
      if (controller.signal.aborted) return;
      failed = true;
      reply = error instanceof Error ? error.message : "Maaf, terjadi kesalahan.";
    } finally {
      if (!controller.signal.aborted) {
        const final = [...history, { role: "assistant" as const, content: reply, error: failed }];
        setMessages(final);
        saveMessages(final);
        setLoading(false);
      }
    }
  };

  const reset = () => {
    abortRef.current?.abort();
    setLoading(false);
    setMessages([GREETING]);
    saveMessages([GREETING]);
    inputRef.current?.focus();
  };

  const showQuickReplies = messages.length === 1 && !loading;

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            key="chat-launcher"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[var(--text)] px-4 py-3 text-sm font-medium text-white shadow-lg hover:bg-[var(--accent-hover)] transition-colors"
            aria-label={`Buka chat ${BOT_NAME}`}
          >
            <MessageCircle size={18} />
            <span className="hidden sm:inline">Tanya {BOT_NAME}</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            key="chat-panel"
            role="dialog"
            aria-label={`Chat dengan ${BOT_NAME}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex flex-col bg-[var(--bg)] sm:inset-auto sm:bottom-5 sm:right-5 sm:h-[560px] sm:max-h-[calc(100vh-2.5rem)] sm:w-[380px] sm:rounded-2xl sm:border sm:border-[var(--border)] sm:shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{BOT_NAME}</p>
                <p className="text-xs text-[var(--text-muted)]">Asisten AI · harga final dikonfirmasi Teguh</p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  aria-label="Mulai obrolan baru"
                  title="Mulai obrolan baru"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded-lg p-2 text-[var(--text-muted)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  aria-label="Tutup chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      m.role === "user"
                        ? "bg-[var(--text)] text-white rounded-br-md"
                        : m.error
                          ? "border border-red-200 bg-red-50 text-red-700 rounded-bl-md"
                          : "bg-[var(--surface)] text-[var(--text)] rounded-bl-md"
                    }`}
                  >
                    {m.content ? (
                      <Linkified text={m.content} />
                    ) : (
                      <span className="inline-flex gap-1 py-1" aria-label="Sedang mengetik">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:150ms]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:300ms]" />
                      </span>
                    )}
                  </div>
                </div>
              ))}

              {showQuickReplies && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_REPLIES.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-[var(--border-strong)] px-3 py-1.5 text-xs text-[var(--text)] hover:bg-[var(--surface)]"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-[var(--border)] px-3 pb-3 pt-3"
            >
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value.slice(0, MAX_CHARS))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                      e.preventDefault();
                      send(input);
                    }
                  }}
                  rows={1}
                  placeholder="Tulis pesan…"
                  aria-label="Tulis pesan"
                  className="form-input max-h-28 min-h-[42px] flex-1 resize-none"
                />
                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="btn-primary h-[42px] px-3 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label="Kirim pesan"
                >
                  <Send size={16} />
                </button>
              </div>
              <p className="mt-2 text-center text-[11px] text-[var(--text-muted)]">
                Lebih suka chat langsung?{" "}
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="underline">
                  WhatsApp Teguh
                </a>
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
