---
title: "Agen AI Mulai Mentok di Situs Besar, dari Pesan Tiket sampai Akses Rekening"
source_url: "https://www.theverge.com/ai-artificial-intelligence/1013195/ai-agents-blocked-web"
tags: ["AI", "AI Agent", "Developer"]
date: "2026-10-19T14:48:06.000Z"
cover_image: "/posts/agen-ai-situs-tertutup-cover.jpg"
---

Agen AI yang diminta memesan tiket atau mengurus belanja belum tentu bisa menuntaskan tugasnya. Dalam laporan 17 Oktober, [The Verge](https://www.theverge.com/ai-artificial-intelligence/1013195/ai-agents-blocked-web) mencatat pengguna Meta Muse, OpenAI Dots, xAI Grok, dan Instinct menemui hambatan di sejumlah situs. Alasannya beragam: Yelp mensyaratkan lisensi data untuk trafik non-manusia, Delta belum punya integrasi pemesanan untuk agen pihak ketiga, sedangkan JPMorgan Chase dan Charles Schwab membatasi akses agen ke rekening atas pertimbangan keamanan.

![Seseorang bekerja menggunakan laptop di kantor, sebagai ilustrasi agen AI yang berinteraksi dengan situs web](/posts/agen-ai-situs-tertutup-cover.jpg)

*Foto ilustrasi oleh [Vitaly Gariev di Pexels](https://www.pexels.com/photo/man-working-on-laptop-in-modern-office-setting-36713016/), digunakan sesuai [Lisensi Pexels](https://www.pexels.com/license/). Foto stok ini tidak menampilkan agen AI atau layanan yang dibahas.*

## Satu tugas, aturan tiap situs berbeda

Untuk urusan reservasi dan informasi bisnis, Yelp menyatakan kepada [TechCrunch](https://techcrunch.com/2026/10/06/the-next-hurdle-for-ai-agents-getting-websites-to-let-them-in/) bahwa trafik non-manusia hanya diizinkan jika agen membayar akses melalui program lisensi datanya. Dokumentasi [API mitra Yelp](https://docs.developer.yelp.com/docs/yelp-partner-apis) juga menyebut akses tidak aktif secara default dan hanya tersedia bagi mitra yang sudah membuat perjanjian.

Posisi Delta lebih spesifik: maskapai itu mengatakan belum memiliki kemitraan atau integrasi yang memungkinkan agen pihak ketiga mencari dan memesan penerbangan melalui platform digitalnya. Delta masih mengevaluasi teknologi baru. Jadi, laporan tersebut tidak menyebut adanya larangan menyeluruh terhadap semua agen; saat ini jalur integrasinya memang belum tersedia.

Bank punya alasan lain. The Verge melaporkan JPMorgan Chase dan Charles Schwab mengonfirmasi pembatasan akses agen ke rekening nasabah karena risiko keamanan. [Ketentuan Chase](https://www.chase.com/digital/resources/terms-of-use) kini menyebut agen AI secara langsung: agen harus mengidentifikasi dirinya, sementara nasabah bertanggung jawab atas tindakan atau kesalahan agen yang mereka izinkan.

![Diagram tiga jenis hambatan yang dapat dialami agen AI saat mengakses situs web](/posts/peta-hambatan-agen-ai.svg)

*Ringkasan laporan The Verge dan TechCrunch. Tidak semua kegagalan akses berarti situs sengaja melarang agen.*

## Tidak semua kegagalan berarti diblokir sengaja

Pemeriksaan keamanan juga bisa menjadi penghalang tanpa kebijakan khusus untuk agen. Walmart, misalnya, sudah bekerja sama dengan Meta untuk Muse, tetapi sejumlah pengguna tetap gagal menyelesaikan pembelian. TechCrunch melaporkan masalahnya bisa muncul ketika agen tidak berhasil melewati tombol verifikasi manusia di situs Walmart.

Zillow juga memberi contoh kebalikannya. Setelah menerbitkan laporan tentang keluhan pengguna, TechCrunch menerima keterangan bahwa Zillow mengizinkan agen yang bertindak untuk konsumen, tetapi sistem anti-botnya kadang tetap memblokir agen tertentu. Dari sisi pengguna, kegagalan seperti ini mudah terlihat sama dengan larangan resmi, padahal penyebabnya berbeda.

## Demo lancar belum menjamin tugas selesai

Buat developer, kemampuan mengendalikan browser baru separuh pekerjaan. Agen juga perlu jalur akses yang diizinkan, identitas yang jelas, dan cara pulih ketika situs meminta verifikasi atau menolak tindakannya. Untuk layanan seperti perjalanan, belanja, dan perbankan, API atau integrasi resmi lebih bisa diandalkan daripada menganggap setiap halaman web terbuka untuk otomatisasi.

Pada akhirnya, agen yang bisa mengklik tombol belum tentu berwenang menyelesaikan transaksi. Ukuran keberhasilannya bukan hanya apakah browser bergerak sesuai instruksi, tetapi apakah situs menerima akses itu dan hasilnya benar-benar tercatat.
