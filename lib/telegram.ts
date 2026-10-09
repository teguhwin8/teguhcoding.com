// Kirim pesan teks biasa (tanpa parse_mode, supaya input pengunjung tidak
// diperlakukan sebagai format) ke bot Telegram khusus calon klien.
export async function sendLeadToTelegram(text: string): Promise<boolean> {
  const token = process.env.TELEGRAM_LEADS_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_LEADS_CHAT_ID;
  if (!token || !chatId) {
    console.error("[telegram] missing TELEGRAM_LEADS_BOT_TOKEN or TELEGRAM_LEADS_CHAT_ID");
    return false;
  }

  try {
    const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text.slice(0, 4000),
        disable_web_page_preview: true,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(`[telegram] status=${response.status} body=${body.slice(0, 300)}`);
    }
    return response.ok;
  } catch (error) {
    console.error("[telegram] request failed", error);
    return false;
  }
}
