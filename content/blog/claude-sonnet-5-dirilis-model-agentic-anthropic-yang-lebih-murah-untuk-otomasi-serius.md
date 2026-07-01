---
title: "Claude Sonnet 5 Dirilis: Model Agentic Anthropic yang Lebih Murah untuk Otomasi Serius"
source_url: "https://techcrunch.com/2026/06/30/anthropic-launches-claude-sonnet-5-as-a-cheaper-way-to-run-agents/?ref=dailydev"
tags: ["AI","Anthropic","AI Agents"]
date: "2026-07-01T10:33:56.149Z"
cover_image: "https://techcrunch.com/wp-content/uploads/2026/06/Claude-photo.jpg?w=1024"
---

## Anthropic Membawa Kemampuan Agentic ke Kelas yang Lebih Terjangkau

Anthropic resmi meluncurkan **Claude Sonnet 5**, versi terbaru dari model kelas menengahnya yang kini dirancang lebih kuat untuk menjalankan tugas-tugas agentic. Dengan kata lain, model ini tidak hanya menjawab pertanyaan, tetapi juga bisa membuat rencana, memakai tools seperti browser dan terminal, lalu menjalankan pekerjaan secara lebih mandiri.

Yang menarik, Anthropic memosisikan Sonnet 5 sebagai opsi yang mendekati kemampuan model premium seperti **Claude Opus 4.8**, tetapi dengan biaya jauh lebih rendah. Ini penting karena persaingan AI saat ini mulai bergeser: bukan lagi sekadar siapa yang punya model paling pintar, melainkan siapa yang bisa menjalankan agen AI secara murah, stabil, dan aman dalam skala besar.

## Agentic AI Kini Jadi Standar Baru

Peluncuran Sonnet 5 datang di tengah tren besar di industri foundation model. OpenAI baru saja memperkenalkan GPT-5.6 Sol dalam preview, sementara Google sebelumnya merilis Gemini 3.5 Flash dengan narasi serupa: chatbot mulai berevolusi menjadi alat kerja agentic yang bisa merencanakan, membangun, dan mengulang proses dengan input manusia yang semakin minim.

Artinya, kemampuan agentic kini bukan lagi fitur premium yang eksotis. Ia mulai menjadi ekspektasi dasar di berbagai tier harga. Untuk developer dan perusahaan, pertanyaannya berubah menjadi: seberapa jauh model bisa bekerja sendiri tanpa terlalu sering diawasi, dan berapa biaya yang harus dibayar untuk itu?

## Harga Claude Sonnet 5: Lebih Murah dari Model Premium

Mulai Selasa, Claude Sonnet 5 menjadi model default untuk pengguna paket **Free** dan **Pro**, serta tersedia untuk semua jenis langganan Claude.

Untuk fase peluncuran hingga **31 Agustus**, harganya adalah:

- **$2 per 1 juta input token**
- **$10 per 1 juta output token**

Setelah periode tersebut, harga naik menjadi:

- **$3 per 1 juta input token**
- **$15 per 1 juta output token**

Dengan pricing ini, Sonnet 5 lebih murah dibandingkan Opus 4.8, OpenAI GPT-5.5, dan Google Gemini 3.1 Pro. Namun, ia masih lebih mahal daripada Gemini 3.5 Flash.

Bagi tim yang membangun workflow berbasis AI agent, selisih biaya seperti ini bisa sangat berarti. Tugas agentic biasanya memakan banyak token karena model perlu membaca konteks, merencanakan langkah, memakai tools, mengecek hasil, dan kadang memperbaiki outputnya sendiri.

## Performa: Mendekati Opus, Jauh Meningkat dari Sonnet Sebelumnya

Menurut Anthropic, Claude Sonnet 5 membawa peningkatan signifikan dibanding **Sonnet 4.6**, terutama untuk reasoning, tool use, coding, dan knowledge work.

Pada benchmark agentic coding, misalnya:

- **Claude Opus 4.8:** 69,2%
- **Claude Sonnet 5:** 63,2%
- **Claude Sonnet 4.6:** 58,1%

Angka ini menunjukkan Sonnet 5 memang belum sepenuhnya menyamai Opus 4.8 untuk tugas coding agentic yang sulit, tetapi jaraknya semakin dekat. Bahkan pada benchmark knowledge work, Sonnet 5 disebut sedikit mengungguli Opus 4.8.

Anthropic tetap menekankan bahwa Opus 4.8 masih menjadi pilihan utama untuk akurasi tertinggi, terutama pada pekerjaan yang membutuhkan penilaian halus, riset mendalam, atau penyelesaian masalah yang sangat kompleks. Namun, Sonnet 5 memberi developer opsi yang lebih ekonomis dengan kualitas yang jauh lebih baik dibanding generasi sebelumnya.

## Lebih Andal untuk Workflow Otomatis

Salah satu poin yang cukup menonjol dari Sonnet 5 adalah kemampuannya menyelesaikan tugas kompleks sampai tuntas. Beberapa tester menyebut model ini lebih jarang berhenti di tengah jalan dan mampu mengecek outputnya sendiri tanpa perlu diminta secara eksplisit.

Contohnya, Zapier menguji Claude Sonnet 5 untuk pekerjaan dua tahap: memperbarui tier akun Salesforce dan mengirim pengumuman peluncuran ke kontak enterprise. Menurut Daniel Shepard, senior engineer di Zapier, model ini berhasil menyelesaikan proses dari awal sampai akhir — sesuatu yang sebelumnya sering terhenti di tengah jalan.

Untuk otomasi harian, peningkatan seperti ini sangat praktis. Banyak workflow bisnis tidak hanya butuh jawaban yang benar, tetapi juga eksekusi yang konsisten: mengambil data, memperbarui sistem, mengirim pesan, dan memastikan tidak ada langkah yang terlewat.

## Keamanan: Lebih Baik, Meski Belum Sekuat Model Tertinggi

Anthropic juga menyoroti aspek safety pada Sonnet 5. Model ini disebut memiliki tingkat perilaku tidak diinginkan yang lebih rendah dibanding pendahulunya, termasuk dalam hal kerja sama terhadap penyalahgunaan, deception, hallucination, dan sikap terlalu menyetujui pengguna atau sycophancy.

Sonnet 5 juga diklaim lebih baik dalam menolak permintaan berbahaya dan menghadapi upaya prompt injection. Ini penting karena model agentic biasanya punya akses ke tools, data, atau sistem eksternal. Jika model mudah dibajak oleh instruksi tersembunyi, risikonya bisa jauh lebih besar dibanding chatbot biasa.

Meski begitu, Anthropic mengakui Sonnet 5 belum berada di level Opus 4.8 dan Claude Mythos Preview dalam hal penanganan perilaku misaligned. Di sisi lain, evaluasi internal menunjukkan Sonnet 5 punya kemampuan yang jauh lebih rendah untuk melakukan tugas cybersecurity berbahaya dibanding model Opus saat ini.

## Kenapa Peluncuran Ini Penting?

Claude Sonnet 5 memperlihatkan arah pasar AI yang semakin jelas. Model terbaik tidak selalu harus menjadi pilihan utama untuk setiap pekerjaan. Banyak organisasi justru membutuhkan model yang cukup kuat, cukup aman, dan cukup murah untuk dijalankan berulang kali dalam workflow produksi.

Dengan Sonnet 5, Anthropic mencoba mengisi celah tersebut: model yang lebih agentic dari generasi sebelumnya, lebih ekonomis daripada flagship model, tetapi tetap cukup mumpuni untuk otomasi bisnis, coding, dan pekerjaan pengetahuan.

Jika klaim Anthropic terbukti konsisten di dunia nyata, Claude Sonnet 5 bisa menjadi pilihan menarik bagi developer yang ingin membangun AI agent tanpa langsung membakar anggaran pada model paling mahal.
