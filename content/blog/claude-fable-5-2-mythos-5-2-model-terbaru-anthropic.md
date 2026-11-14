---
title: "Claude Fable 5.2 dan Mythos 5.2: Model Terbaru Anthropic yang Lebih Cepat dan Lebih Murah"
source_url: "https://thenextweb.com/news/claude-fable-5-2-mythos-5-2-anthropic-launch-price"
tags: ["AI", "Developer Tools", "Anthropic"]
date: "2026-11-14T10:00:00.000Z"
cover_image: "/posts/claude-fable-mythos-5-2-cover.png"
updated: "2026-11-14T12:00:00.000Z"
---

Anthropic merilis Claude Fable 5.2 dan Claude Mythos 5.2 pada 9 November 2026. Keduanya merupakan model yang sama secara arsitektur, tapi berbeda di level safeguard: Fable 5.2 tersedia untuk semua pengguna berbayar, sementara Mythos 5.2 hanya bisa diakses oleh organisasi terverifikasi di bidang keamanan siber dan life sciences. Fable 5.2 hadir 30% lebih cepat dari versi 5.1, dengan harga 20% lebih murah di $8/$40 per juta token input/output. ([The Next Web](https://thenextweb.com/news/claude-fable-5-2-mythos-5-2-anthropic-launch-price), [WriteHuman](https://writehuman.ai/blog/claude-fable-5-2), [MarkTechPost](https://www.marktechpost.com/2026/11/10/anthropic-claude-fable-5-2-mythos-5-2-release).)

## Apa Spesifikasi Claude Fable 5.2?

| Spesifikasi | Detail |
|---|---|
| Context window | 1 juta token |
| Max output | 128.000 token (menurut MarkTechPost; tidak disebut di pengumuman Anthropic) |
| Modalitas | Teks, kode, dan vision |
| Harga input | $8 per juta token (turun dari $10) |
| Harga output | $40 per juta token (turun dari $50) |
| Fast mode | 2,5x lebih cepat di $16/$80 |
| Kecepatan | Hingga 30% lebih cepat dari Fable 5.1 |
| Model ID | `claude-fable-5-2` |
| Arsitektur | Proprietary, closed-weight |

Penurunan harga 20% ini cukup signifikan, terutama bagi developer yang menjalankan workload berat di API.

## Bagaimana Performa Benchmark-nya?

Anthropic melaporkan hasil benchmark berikut (catatan: ini dari pengujian internal Anthropic, belum diverifikasi independen):

| Benchmark | Fable 5.2 | Opus 5.5 | GPT-6 Astra | Gemini 4 Carbon |
|---|---|---|---|---|
| FrontierCode 2.0 (coding) | **49,1%** | 45,5% | 42,8% | 41,1% |
| FrontierSWE v2 | **69,9%** | 62,3% | 65,5% | 61,2% |
| RoboDojo Sim (robotics) | **64,9%** | 39,4% | 29,8% | — |
| AutomationBench (business) | 51,4% | 42,5% | 41,4% | **53,9%** |
| Chartography (visual) | **73,4%** | 64,4% | 71,0% | 72,5% |
| Humanity's Last Exam (w/ tools) | **74,2%** | 67,7% | 57,2% | — |
| OSWorld 2.1 (computer use) | **89,3%** | 87,2% | 79,5% | 81,5% |

![Ilustrasi dekoratif diagram batang tentang perbandingan model AI](/posts/claude-fable-benchmark-chart.png)

*Ilustrasi konseptual buatan Teguhcoding; bukan grafik benchmark resmi Anthropic. Angka sebenarnya ada di tabel di atas.*

Fable 5.2 unggul di hampir semua kategori. Skor coding 49,1% di FrontierCode 2.0 melampaui Opus 5.5 (45,5%) dan GPT-6 Astra (42,8%). Di RoboDojo Sim, Fable 5.2 lebih dari dua kali lipat skor GPT-6 Astra (64,9% vs 29,8%). Tapi Gemini 4 Carbon masih unggul di AutomationBench (53,9% vs 51,4%).

Beberapa pencapaian notable yang diklaim Anthropic:
- Mendesain prototipe OS dari nol menggunakan 1.000+ sub-agent dalam 8 hari, bisa boot di laptop sungguhan
- Migrasi layanan produksi dari Python ke Rust (startup 26x lebih cepat)
- Memecahkan 2 masalah terbuka di fisika teoretis (black holes / holographic duality)
- Memformalisasi Fermat's Last Theorem dalam 30 jam dengan 1.000 agen (sebelumnya butuh 11 hari)

## Apa Bedanya Fable dan Mythos?

Keduanya secara teknis adalah model yang sama. Perbedaannya ada di level keamanan:

**Claude Fable 5.2:**
- Tersedia untuk semua pengguna Claude berbayar dan developer
- Menyertakan classifier yang memblokir tugas keamanan siber berisiko tinggi dan sebagian besar riset biologi
- Memblokir sekitar 55% lebih sedikit request dibanding Fable 5.1 (sekitar 60% lebih sedikit di cybersecurity dan 40% lebih sedikit di biologi)
- Jika Fable memblokir query, pengguna menerima respons dari Opus 4.8 (untuk cyber) atau Opus 5 (untuk biologi) sebagai gantinya
- Tersedia di Claude Platform, AWS, Google Cloud, dan Azure

**Claude Mythos 5.2:**
- Model yang sama dengan safeguard yang lebih longgar
- Hanya tersedia untuk organisasi terverifikasi melalui:
  - **Cyber Verification Program** (organisasi keamanan siber)
  - **Life Sciences Verification Program** (organisasi biomedis)
- Pelanggan Claude Enterprise mendapat kapabilitas Mythos terintegrasi di Claude Security

## Di Mana Posisi Fable 5.2 dalam Lineup Claude?

Anthropic masih merekomendasikan **Opus 5.5 untuk pekerjaan sehari-hari** dan kebanyakan tugas coding. Fable 5.2 diposisikan untuk "proyek teknis paling menantang" — engineering kompleks, riset ilmiah, matematika tingkat lanjut, dan pemecahan masalah otonom.

Secara sederhana:

| Model | Untuk Apa | Harga (input/output per juta token) |
|---|---|---|
| Opus 5.5 | Pekerjaan harian, coding umum | Tidak disebut di pengumuman |
| Fable 5.2 | Proyek teknis paling berat | $8/$40 (standard), $16/$80 (fast) |

Menariknya, Anthropic menyebut Fable 5.2 sebagai "Opus-level coding at roughly half the cost per task."

## Kapan Anthropic IPO?

Peluncuran Fable 5.2 dan Mythos 5.2 jelas dirancang bersamaan dengan jadwal IPO Anthropic. Timeline-nya:

- **26 Oktober 2026**: Anthropic mengajukan S-1 ke SEC untuk IPO saham Class A
- **9 November 2026**: Fable 5.2 dan Mythos 5.2 dirilis — satu hari sebelum roadshow
- **10 November 2026**: Roadshow IPO dimulai

Detail IPO yang diketahui: ticker "ANT" di Nasdaq, 825 juta lembar saham Class A, kisaran harga $70–$78 per lembar, dengan Goldman Sachs dan Morgan Stanley sebagai underwriter. Rilis model terkuat tepat sehari sebelum presentasi ke investor bukan kebetulan.

## Catatan Teguh

Beberapa hal yang menarik dari rilis ini untuk developer Indonesia:

**Harga turun, performa naik — tren yang bagus.** Dari $10/$50 menjadi $8/$40 per juta token berarti penghematan 20% langsung di biaya API. Kalau kamu menjalankan aplikasi AI yang intensif di Claude API, ini langsung terasa di tagihan bulanan.

**Fable vs Opus: kapan pakai yang mana?** Anthropic sendiri masih merekomendasikan Opus 5.5 untuk kebanyakan pekerjaan. Fable 5.2 cocok untuk tugas yang benar-benar berat secara teknis — debug kode yang sangat kompleks, riset matematika, atau agentic workflow yang butuh penalaran panjang. Untuk chatbot customer service atau content generation, Opus 5.5 (atau bahkan Sonnet) kemungkinan sudah lebih dari cukup.

**Tren model "dual-track" makin jelas.** Sama seperti OpenAI dengan model cyber-nya yang dibatasi, Anthropic juga membedakan antara model publik (Fable) dan model khusus (Mythos). Ini sinyal bahwa kemampuan AI frontier mulai terlalu kuat untuk dirilis tanpa batasan — terutama di domain keamanan siber dan biologi.

**Anthropic makan dogfood sendiri.** Menurut pengumuman resmi, lebih dari 90% perubahan kode di Anthropic sekarang ditulis oleh Claude. Kalau pembuat model-nya sendiri sudah segitu bergantung pada produknya, itu sinyal kepercayaan yang kuat.

**Benchmark perlu dibaca dengan konteks.** Semua angka benchmark di atas berasal dari pengujian internal Anthropic dan belum diverifikasi secara independen. Performa di benchmark tidak selalu mencerminkan performa di kasus penggunaan nyata. Uji sendiri di workflow kamu sebelum migrasi model.

**Fast mode menarik untuk aplikasi real-time.** Dengan harga $16/$80 tapi kecepatan 2,5x, fast mode Fable 5.2 bisa jadi pilihan menarik untuk aplikasi yang butuh respons cepat seperti coding assistant atau tool interaktif.

## FAQ

### Apakah Claude Fable 5.2 gratis?
Tidak. Fable 5.2 tersedia untuk pengguna Claude berbayar (subscriber) dan developer melalui API dengan harga $8 per juta token input dan $40 per juta token output.

### Apa bedanya Fable 5.2 dengan Opus 5.5?
Fable 5.2 unggul di benchmark teknis berat seperti FrontierCode 2.0 (49,1% vs 45,5%) dan lebih murah per task. Tapi Anthropic masih merekomendasikan Opus 5.5 untuk pekerjaan harian dan coding umum.

### Bagaimana cara mengakses Claude Mythos 5.2?
Mythos 5.2 hanya tersedia untuk organisasi yang diverifikasi melalui Cyber Verification Program atau Life Sciences Verification Program Anthropic. Akses tidak terbuka untuk pengguna umum.

### Apakah Fable 5.2 mendukung vision?
Ya. Fable 5.2 mendukung modalitas teks, kode, dan vision dengan akurasi 73,4% pada benchmark Chartography tanpa menggunakan tools.
