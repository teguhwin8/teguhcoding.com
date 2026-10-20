---
title: "Instruksi Chatbot WhatsApp Sempat Tersembunyi di 80 Halaman Bantuan"
source_url: "https://redact.dev/blog/whatsapp-help-pages-hidden-ai-instructions"
tags: ["AI", "WhatsApp", "Privasi"]
date: "2026-10-20T09:32:12.000Z"
cover_image: "/posts/whatsapp-hidden-chatbot-instructions-cover.jpg"
---

Kode sumber 80 halaman bantuan WhatsApp sempat memuat 102 blok instruksi untuk chatbot AI. Salah satunya meminta bot agar tidak menyarankan pengguna yang kehilangan akses ke nomor atau perangkatnya untuk menghubungi regulator saat ingin menghapus akun. WhatsApp mengatakan kepada WIRED bahwa catatan itu ditujukan untuk chatbot dukungannya dan muncul di halaman publik karena bug.

Foto sampul hanya ilustrasi chat grup WhatsApp di ponsel; bukan tampilan halaman bantuan atau chatbot yang diteliti. Foto oleh [Swello](https://unsplash.com/@getswello) di [Unsplash](https://unsplash.com/photos/hand-holding-a-smartphone-displaying-a-mobile-application-IRWj0hdSbM4), digunakan sesuai [lisensi Unsplash](https://unsplash.com/license).

## 102 blok di 80 halaman

Temuan itu berasal dari [Redact](https://redact.dev/blog/whatsapp-help-pages-hidden-ai-instructions), perusahaan privasi yang memeriksa 545 halaman di pusat bantuan WhatsApp. Teksnya berada di kode halaman, bukan di bagian yang terlihat saat orang membaca artikel bantuan. Redact mengarsipkan halaman-halaman tersebut; WhatsApp kemudian menghapus seluruh blok itu.

![Ringkasan pemindaian Redact: 545 halaman bantuan diperiksa, 80 memuat instruksi tersembunyi, dan 102 blok ditemukan](/posts/whatsapp-hidden-instructions-counts.svg)

*Angka dari pemindaian Redact. Temuan ini menunjukkan teks instruksi ikut terkirim bersama halaman; bukan bukti bahwa chatbot mengikuti setiap instruksi.*

Sebagian besar catatan membahas cara menjawab pertanyaan yang rancu atau mengarahkan pengguna ke halaman bantuan yang tepat. Dua kelompok instruksi menimbulkan pertanyaan lebih besar. Untuk pengguna yang kehilangan akses ke nomor atau perangkat, salah satu blok melarang chatbot menyarankan mereka menghubungi otoritas perlindungan data atau regulator. Blok lain meminta bot tidak membahas aturan privasi seperti GDPR, LGPD, atau CCPA ketika pengguna menyebut gugatan, pengacara, maupun proses hukum.

Meta menyampaikan kepada [WIRED](https://www.wired.com/story/whatsapp-help-pages-leaked-hidden-instructions-for-a-meta-chatbot/) bahwa catatan itu memang dibuat untuk chatbot dukungan WhatsApp, agar jawabannya tetap terkait produk dan tidak memberi nasihat hukum. Menurut perusahaan, sebuah bug membuat instruksi itu tampil di kode halaman bantuan. Teksnya sudah dihapus setelah WIRED menanyakan soal temuan tersebut.

## Apakah chatbot benar-benar mengikuti instruksi itu?

Belum ada bukti untuk menyimpulkan demikian. Redact menemukan catatan dalam sumber halaman dan mengatakan crawler Google serta Bing menerimanya. Saat menguji identitas crawler OpenAI, Anthropic, dan Perplexity, Redact tidak melihat catatan itu terkirim. Perusahaan tersebut juga tidak menguji apakah chatbot WhatsApp atau asisten AI lain pernah menjawab pengguna berdasarkan instruksi tadi. WIRED turut melaporkan bahwa belum jelas berapa lama catatan itu berada di halaman publik.

> Ini baru mengungkap apa yang tertulis di halaman, belum membuktikan bagaimana bot menjawab. Perbedaan itu penting: instruksi chatbot memang bisa membatasi jawaban, tetapi kita belum tahu apakah catatan ini pernah dipakai dalam percakapan nyata.

Kasus ini ramai dibahas di [Hacker News](https://news.ycombinator.com/item?id=50159341), dengan 420 poin dan 113 komentar saat artikel ini disusun. Diskusinya berkisar dari cara mengarahkan bot dukungan agar tidak memberi nasihat hukum sampai pertanyaan soal informasi yang sengaja tidak disampaikan kepada pengguna.

Bagi tim yang memakai halaman web sebagai sumber jawaban AI, ada satu pelajaran teknis yang jelas: pisahkan materi untuk pembaca dari instruksi khusus model, lalu periksa apa yang benar-benar dikirim di HTML publik. Dalam kasus WhatsApp, batas itu hilang dari halaman yang bisa dibaca siapa pun—meski belum diketahui apakah ada bot lain yang memakai catatan tersebut.
