---
title: "XERJ Bantu Coding Agent Cari Kode, tapi Klaim Hemat Token 40× Punya Syarat"
source_url: "https://github.com/xerj-org/xerj"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-18T07:18:32.383Z"
cover_image: "/posts/xerj-coding-agent-search-cover.svg"
---

XERJ muncul di [GitHub Trending](https://github.com/trending?since=daily) pada 18 Oktober dengan tawaran sederhana: indeks folder sekali, lalu biarkan coding agent mencari bagian kode yang dibutuhkan. [Deskripsi repositorinya](https://github.com/xerj-org/xerj) menyebut penghematan sampai 40× dibanding `grep`. Namun, [benchmark utama proyek](https://xerj.org/benchmarks/) mencatat angka 2,7× pada jenis tugas tertentu. Hasilnya paling menjanjikan saat model belum mengenal codebase yang sedang dikerjakan.

![Ilustrasi konseptual XERJ mengindeks kode lalu mengirim potongan yang relevan ke coding agent](/posts/xerj-coding-agent-search-cover.svg)

*Ilustrasi konseptual Teguhcoding, bukan tangkapan layar XERJ.*

## Mesin pencarian untuk konteks coding agent

XERJ bukan model AI. Ini mesin pencarian lokal berbasis Rust yang membuat indeks dari kode, dokumentasi, PDF, CSV, dan sejumlah format lain. Perintah `xerj autoindex ./proyek` memindai folder; setelah itu, agent bisa menanyakan simbol atau fungsi dan menerima potongan beserta nama file dan nomor baris, alih-alih membuka banyak file satu per satu.

Proyek ini juga menyediakan API yang kompatibel dengan Elasticsearch dan server MCP, sehingga bisa dihubungkan ke coding agent yang mendukung MCP. Keduanya bagian dari satu binary, dan lisensi repositorinya Apache 2.0. [Dokumentasi XERJ](https://github.com/xerj-org/xerj) menjelaskan cara kerjanya serta batas dukungan tiap integrasi.

![Alur kerja XERJ: indeks lokal menerima folder proyek, lalu mengembalikan fungsi dan lokasi kode untuk agent](/posts/xerj-coding-agent-search-flow.svg)

*Alur diringkas dari dokumentasi proyek; bukan rancangan internal mesin pencari.*

## Angka 40× bukan hasil umum benchmark utama

Angka di deskripsi repo mudah dibaca sebagai hasil yang akan didapat semua orang. Benchmark utama XERJ lebih spesifik: pada delapan tugas lintas Python, JavaScript, C, dan Java, pengujian membandingkan agent yang memakai memorinya sendiri, `grep`, atau hasil pencarian XERJ. Dengan XERJ, jumlah *output token* tercatat 9.982, dibanding 26.477 untuk pendekatan `grep`—sekitar 2,7× lebih sedikit. Kedua pendekatan menyelesaikan 16 dari 16 percobaan.

Tes tersebut memakai API dan pustaka yang sengaja tidak familier bagi model. Di situlah indeks paling berguna: agent bisa mengambil kontrak dan contoh dari kode yang sebelumnya belum pernah dilihatnya. Di pustaka publik yang sudah dikenal model, hasilnya berubah. Data XERJ sendiri menunjukkan bahwa pencarian dapat menambah biaya dan tidak selalu meningkatkan keberhasilan.

## Pencarian kode dan log belum sama kuat

Sebuah [laporan pengguna di issue GitHub](https://github.com/xerj-org/xerj/issues/1504), yang dibuka pada 16 Oktober, mencatat hasil campuran saat XERJ dicoba pada proyek PBX dengan 1.104 file. Ketika pencarian menemukan fungsi yang tepat, hasilnya menyertakan lokasi kode dan membantu dibanding pencarian baris biasa. Namun, dari lima pertanyaan agent yang diuji, dua tidak menemukan file jawaban yang diharapkan dan satu hanya memberi hasil sebagian.

Pengguna yang sama juga melaporkan bahwa pencarian log belum cocok untuk troubleshooting: hasilnya tidak mempertahankan waktu, host, dan tingkat keparahan sebagai kolom yang bisa difilter. Ini satu pengujian pada satu proyek, bukan evaluasi menyeluruh, tetapi cukup untuk menunjukkan bahwa klaim dukungan banyak format tidak berarti setiap jenis pencarian sudah matang.

Versi terbaru yang ditautkan proyek saat artikel ini ditulis masih berlabel *release candidate* ([`v1.0.0-rc.96`](https://github.com/xerj-org/xerj/releases/tag/v1.0.0-rc.96)). Untuk percobaan lokal, perhatikan pula konfigurasi `--insecure`: dokumentasi menyebut opsi itu mematikan TLS dan autentikasi API. Instance baru dibatasi ke `127.0.0.1`, jadi jangan membuka port tersebut ke jaringan tanpa mengatur autentikasi dan membaca [model keamanan XERJ](https://github.com/xerj-org/xerj/blob/main/docs/SECURITY_MODEL.md). Fitur *reranking* Jev yang opsional juga mengirim kueri dan teks hasil pencarian ke layanan eksternal jika diaktifkan; detailnya ada di [dokumentasi reranking](https://github.com/xerj-org/xerj/blob/main/docs/RERANK.md).

XERJ layak dicoba pada codebase privat atau API internal yang belum dikenal model—tempat jawaban berdasarkan tebakan dan pembacaan file berulang memang mahal. Untuk repositori populer, atau pencarian log produksi, ukur dulu apakah hasilnya lebih tepat dan apakah penghematan tokennya menutup biaya indeks serta pemakaian memorinya.
