"use client";

import { Fragment, useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { Clock3, Mail, MapPin, RotateCcw, Send, MessageCircle } from "lucide-react";
import { BOT_NAME, CONTACT_EMAIL, WHATSAPP_URL } from "@/lib/chatbot/constants";

type Message = { role: "user" | "assistant"; content: string; error?: boolean };

const MAX_CHARS = 500;
const GREETING: Message = {
  role: "assistant",
  content:
    "Halo, saya Asisten Teguh. Ceritakan sedikit apa yang ingin dibuat atau dibenahi, nanti saya bantu petakan kebutuhannya. Anda sedang mencari bantuan soal apa?",
};

function Linkified({ text }: { text: string }) {
  const parts = text.split(/(https?:\/\/[^\s)]+)/g);
  return (
    <>
      {parts.map((part, index) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className="break-all underline underline-offset-2"
          >
            {part}
          </a>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        ),
      )}
    </>
  );
}

export default function ContactChat() {
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionsLoading, setSuggestionsLoading] = useState(true);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const suggestionAbortRef = useRef<AbortController | null>(null);
  const suggestionRequestRef = useRef(0);

  const loadSuggestions = useCallback(async (assistantMessage: string, previousSuggestions: string[] = []) => {
    suggestionAbortRef.current?.abort();
    const controller = new AbortController();
    const requestId = ++suggestionRequestRef.current;
    suggestionAbortRef.current = controller;
    setSuggestionsLoading(true);
    try {
      const response = await fetch("/api/chat/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assistantMessage, previousSuggestions }),
        signal: controller.signal,
      });
      if (!response.ok) throw new Error("Saran tidak tersedia");
      const data = (await response.json()) as { suggestions?: unknown };
      if (requestId === suggestionRequestRef.current) {
        setSuggestions(
          Array.isArray(data.suggestions)
            ? data.suggestions.filter((item): item is string => typeof item === "string").slice(0, 4)
            : [],
        );
      }
    } catch {
      if (requestId === suggestionRequestRef.current) setSuggestions([]);
    } finally {
      if (requestId === suggestionRequestRef.current) setSuggestionsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSuggestions(GREETING.content);
    return () => {
      abortRef.current?.abort();
      suggestionAbortRef.current?.abort();
      suggestionRequestRef.current += 1;
    };
  }, [loadSuggestions]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, suggestions]);

  async function send(text: string) {
    const content = text.trim().slice(0, MAX_CHARS);
    if (!content || loading) return;

    const previousSuggestions = suggestions;
    suggestionAbortRef.current?.abort();
    suggestionRequestRef.current += 1;
    const history = [...messages.filter((message) => !message.error), { role: "user" as const, content }];
    setMessages([...history, { role: "assistant", content: "" }]);
    setSuggestions([]);
    setSuggestionsLoading(false);
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
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!response.ok || !response.body) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Chat sedang bermasalah. Anda bisa menghubungi Teguh lewat WhatsApp.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        reply += decoder.decode(value, { stream: true });
        setMessages([...history, { role: "assistant", content: reply }]);
      }
      reply += decoder.decode();
    } catch (error) {
      if (controller.signal.aborted) return;
      failed = true;
      reply = error instanceof Error ? error.message : "Maaf, terjadi kesalahan.";
    } finally {
      if (!controller.signal.aborted) {
        setMessages([...history, { role: "assistant", content: reply, error: failed }]);
        setLoading(false);
        if (!failed && reply.trim()) {
          void loadSuggestions(reply, previousSuggestions);
        }
      }
    }
  }

  function reset() {
    abortRef.current?.abort();
    suggestionAbortRef.current?.abort();
    suggestionRequestRef.current += 1;
    setLoading(false);
    setMessages([GREETING]);
    setSuggestions([]);
    setInput("");
    void loadSuggestions(GREETING.content);
    inputRef.current?.focus();
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  const latestMessage = messages[messages.length - 1];

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-5 pb-16 pt-24 sm:px-8 lg:pb-24 lg:pt-28">
      <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-[var(--text-muted)]">
        Kontak · Yogyakarta, Indonesia
      </p>
      <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-[var(--text)] sm:text-5xl">
        Mulai dari cerita singkat.
      </h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--text-muted)] sm:text-base">
        Ceritakan apa yang ingin dibuat atau dibenahi. Asisten Teguh akan membantu merangkum kebutuhan awal sebelum diteruskan ke Teguh.
      </p>

      <section className="mt-8 grid items-start gap-6 lg:mt-12 lg:grid-cols-[0.78fr_1.22fr] lg:gap-12">
        <aside className="pt-1">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--text-muted)]">
            <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
            Terbuka untuk proyek terpilih
          </div>
          <h2 className="mb-4 mt-8 hidden text-sm font-semibold text-[var(--text)] lg:block">Biasanya saya membantu untuk</h2>
          <ul className="hidden space-y-3 text-sm text-[var(--text-muted)] lg:block">
            {[
              "Website dan aplikasi web baru",
              "Perbaikan, performa, dan keamanan website",
              "Konsultasi teknis dan kolaborasi",
            ].map((item, index) => (
              <li key={item} className="flex items-start gap-3">
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-[var(--border)] text-[10px] text-[var(--text-subtle)]">
                  0{index + 1}
                </span>
                <span className="pt-0.5">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-8 hidden border-t border-[var(--border)] pt-5 lg:block">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--text-muted)]">
              Lebih nyaman kontak langsung?
            </p>
            <a className="flex items-center gap-2 py-1.5 text-sm text-[var(--text)] underline underline-offset-4" href={`mailto:${CONTACT_EMAIL}`}>
              <Mail size={15} /> {CONTACT_EMAIL}
            </a>
            <a className="flex items-center gap-2 py-1.5 text-sm text-[var(--text)] underline underline-offset-4" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <MessageCircle size={15} /> WhatsApp Teguh
            </a>
            <p className="mt-3 flex items-center gap-2 text-xs text-[var(--text-subtle)]">
              <MapPin size={14} /> Yogyakarta, Indonesia
            </p>
          </div>
          <p className="mt-3 flex items-start gap-2 text-xs leading-5 text-[var(--text-subtle)] lg:mt-5">
            <Clock3 size={14} className="mt-0.5 shrink-0" /> Biasanya dibalas di hari kerja, maksimal 1×24 jam.
          </p>
        </aside>

        <section className="flex min-h-[590px] flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-[0_16px_55px_rgba(17,17,17,0.07)] sm:min-h-[620px]" aria-label="Chat dengan Asisten Teguh">
          <header className="flex items-center justify-between border-b border-[var(--border)] px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--text)] text-xs font-bold tracking-wide text-white">TW</div>
              <div>
                <p className="text-sm font-semibold text-[var(--text)]">{BOT_NAME}</p>
                <p className="mt-0.5 text-[11px] text-[var(--text-muted)]">Asisten AI · harga final dikonfirmasi Teguh</p>
              </div>
            </div>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg p-2 text-[var(--text-muted)] transition hover:bg-[var(--surface)] hover:text-[var(--text)]"
              aria-label="Mulai percakapan baru"
              title="Mulai percakapan baru"
            >
              <RotateCcw size={17} />
            </button>
          </header>

          <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto bg-gradient-to-b from-white to-[#fdfdfd] px-4 py-5 sm:min-h-[390px] sm:px-6 sm:py-6" aria-live="polite">
            <p className="mb-5 text-center text-[10px] uppercase tracking-wider text-[var(--text-subtle)]">Mulai percakapan</p>
            {messages.map((message, index) => (
              <div key={`${index}-${message.role}`} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                {message.role === "assistant" && (
                  <div className="mr-2 mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-lg border border-[var(--border)] bg-white text-[8px] font-bold text-[var(--text)]">TW</div>
                )}
                <div className={`max-w-[88%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-[13px] leading-relaxed sm:max-w-[84%] sm:px-4 sm:py-3 ${
                  message.role === "user"
                    ? "rounded-br-md bg-[var(--text)] text-white"
                    : message.error
                      ? "rounded-bl-md border border-red-200 bg-red-50 text-red-700"
                      : "rounded-bl-md bg-[var(--surface)] text-[var(--text)]"
                }`}>
                  {message.content ? (
                    <Linkified text={message.content} />
                  ) : (
                    <span className="inline-flex gap-1 py-1" aria-label="Asisten sedang mengetik">
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:150ms]" />
                      <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-[var(--text-muted)] [animation-delay:300ms]" />
                    </span>
                  )}
                </div>
              </div>
            ))}

            {latestMessage?.role === "assistant" && !latestMessage.error && !loading && (
              <div className="ml-8 flex flex-wrap gap-2 pt-0.5">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => void send(suggestion)}
                    disabled={suggestionsLoading}
                    className="rounded-full border border-[var(--border-strong)] bg-white px-3 py-2 text-left text-[11px] text-[var(--text)] transition hover:bg-[var(--surface)] disabled:opacity-60 sm:py-2.5 sm:text-xs"
                  >
                    {suggestion}
                  </button>
                ))}
                {suggestionsLoading && <span className="py-2 text-[11px] text-[var(--text-subtle)]">Menyiapkan pilihan…</span>}
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="border-t border-[var(--border)] bg-white px-3 pb-3 pt-3 sm:px-4 sm:pb-4">
            <div className="flex items-end gap-2 rounded-xl border border-[var(--border-strong)] p-1.5 pl-3">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value.slice(0, MAX_CHARS))}
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey && !event.nativeEvent.isComposing) {
                    event.preventDefault();
                    void send(input);
                  }
                }}
                rows={1}
                maxLength={MAX_CHARS}
                placeholder="Tulis kebutuhanmu…"
                aria-label="Tulis pesan untuk Asisten Teguh"
                className="max-h-28 min-h-10 flex-1 resize-none border-0 bg-transparent py-2 text-sm text-[var(--text)] outline-none placeholder:text-[var(--text-subtle)] focus:ring-0"
              />
              <button type="submit" disabled={loading || !input.trim()} className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-[var(--text)] text-white transition hover:bg-[var(--accent-hover)] disabled:cursor-not-allowed disabled:opacity-40" aria-label="Kirim pesan">
                <Send size={15} />
              </button>
            </div>
            <p className="mt-2.5 px-1 text-[10px] leading-relaxed text-[var(--text-subtle)] sm:text-[11px]">
              Asisten akan meminta izin sebelum meneruskan nama dan kontak Anda ke Teguh. Ingin bicara langsung?{" "}
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-[var(--text-muted)] underline underline-offset-2">WhatsApp Teguh</a>
            </p>
          </form>
        </section>
      </section>
    </div>
  );
}
