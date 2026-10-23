---
title: "Liquid AI Luncurkan RIPL untuk Respons Cepat, Aksesnya Masih Khusus Enterprise"
source_url: "https://www.liquid.ai/blog/low-latency"
tags: ["AI", "Developer Tools", "Infrastruktur AI"]
date: "2026-10-23T08:55:11.000Z"
cover_image: "/posts/liquid-ai-ripl-datacenter-cover.jpg"
---

Liquid AI merilis RIPL, mesin inferensi untuk fitur yang tak bisa menunggu beberapa detik—misalnya pencarian produk atau pemeriksaan transaksi. Perusahaan menyebut sebagian pengujian menghasilkan jawaban dalam kurang dari 50 ms. Angka itu masih berasal dari benchmark Liquid sendiri, sementara RIPL baru ditawarkan lewat deployment enterprise.

![Ruang data center dengan deretan rak server; foto ilustrasi, bukan fasilitas Liquid AI](/posts/liquid-ai-ripl-datacenter-cover.jpg)

*Foto ilustrasi, bukan fasilitas Liquid AI. Foto oleh [Taylor Vick](https://unsplash.com/@tvick) di [Unsplash](https://unsplash.com/photos/server-room-with-network-cabinets-aWslrFhs1w4), digunakan sesuai [Unsplash License](https://unsplash.com/license).*

RIPL adalah singkatan dari *Real-time Inference Pipeline*. Liquid AI merancangnya untuk membawa model generatif ke alur seperti pemeringkatan hasil dan pemeriksaan risiko pembayaran—tugas yang sering memakai model klasifikasi lebih ringan karena harus menjawab cepat. Pengumuman RIPL terbit pada [22 Oktober](https://www.liquid.ai/blog/low-latency).

## Angka cepatnya datang dari skenario tertentu

Pada beban pendek—32 token masuk dan 32 token keluar, dengan 1.000 permintaan per detik—LFM2.5-1.2B lewat RIPL mencatat latensi p95 34,6 ms. Qwen3.5-0.8B lewat vLLM mencatat 498 ms. P95 berarti 95 persen permintaan dalam pengujian itu selesai dalam waktu tersebut.

![Perbandingan latensi p95 RIPL dan vLLM pada dua beban uji yang dilaporkan Liquid AI](/posts/liquid-ai-ripl-benchmark.svg)

*Angka berasal dari pengujian Liquid AI pada satu GPU NVIDIA B200. Perbandingan mengganti model dan mesin inferensi sekaligus, dan belum menjadi benchmark independen. Rincian skenario dilaporkan [MarkTechPost](https://www.marktechpost.com/2026/10/22/liquid-ai-ripl-real-time-inference-engine/) berdasarkan pengumuman Liquid AI.*

Pada skenario yang lebih panjang—256 token masuk dan 128 token keluar, dengan laju 400 permintaan per detik—latensi p95 LFM di RIPL naik menjadi 155,8 ms. Jadi, angka di bawah 50 ms berlaku pada bentuk permintaan tertentu, bukan jaminan untuk semua model dan panjang konteks.

Selisih 14,4 kali itu juga tidak mengukur RIPL saja: model Liquid dipasangkan dengan RIPL, sedangkan Qwen dijalankan di vLLM. [MarkTechPost mencatat](https://www.marktechpost.com/2026/10/22/liquid-ai-ripl-real-time-inference-engine/) Liquid turut menguji model LFM yang sama di dua mesin, tetapi hasil yang tersedia tetap berasal dari pengujian perusahaan.

## Belum jadi paket yang bisa dipasang bebas

RIPL tersedia untuk deployment enterprise di GPU NVIDIA H100, H200, B200, dan RTX PRO 6000. Liquid mengarahkan calon pengguna untuk menghubungi timnya; [MarkTechPost menyebut engine ini belum terbuka untuk umum](https://www.marktechpost.com/2026/10/22/liquid-ai-ripl-real-time-inference-engine/). Liquid juga menyebut Shopify memakai LFM pada pencarian produksi dengan inferensi di bawah 20 ms. Klaim penggunaan dan hasil itu berasal dari Liquid AI.

Di [thread r/machinelearningnews](https://www.reddit.com/r/machinelearningnews/comments/1xcpf42/liquid_ai_releases_a_realtime_inference/), seorang komentator mengingatkan bahwa model klasifikasi biasa mungkin lebih masuk akal untuk tugas pendek. Itu pendapat, bukan hasil pengujian, tetapi pertanyaannya penting: apakah fitur memang membutuhkan kemampuan generatif, atau cukup dengan model yang lebih sederhana?

RIPL bisa masuk daftar uji bagi tim yang butuh model generatif dengan respons cepat dan bersedia memakai deployment enterprise. Sebelum mengandalkan angka benchmark, ukur latensi dan kualitas jawaban pada bentuk permintaan serta trafik yang benar-benar dipakai produk sendiri.
