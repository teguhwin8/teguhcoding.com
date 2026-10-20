---
title: "Space Bunny Ternyata Versi Awal MiniMax M3.1 Flash, API Mulai US$0,15"
source_url: "https://www.minimax.io/blog/minimax-m31f"
tags: ["AI", "Developer Tools", "Open Models"]
date: "2026-10-20T03:23:49.000Z"
cover_image: "/posts/minimax-m31-flash-cover.jpg"
---

MiniMax [merilis M3.1 Flash pada 19 Oktober](https://www.minimax.io/blog/minimax-m31f) untuk dipakai lewat API, paket M Plan, dan MiniMax Code. Dalam pengumuman yang sama, perusahaan itu mengungkap bahwa **Space Bunny**, model anonim yang sempat dicoba para developer, adalah versi awal M3.1 Flash. MiniMax menyebut Space Bunny telah memproses lebih dari 200 triliun token sebelum identitasnya dibuka; angka tersebut berasal dari perusahaan.

*Foto sampul ilustrasi pusat data oleh [Brett Sayles di Pexels](https://www.pexels.com/photo/modern-computer-placed-near-server-racks-5092815/). Foto ini bukan fasilitas MiniMax; digunakan sesuai [lisensi Pexels](https://www.pexels.com/license/).*

## Dari nama samaran ke layanan resmi

Selama beberapa pekan, orang mencoba Space Bunny lewat layanan model pihak ketiga tanpa tahu siapa pembuatnya, seperti terlihat di [diskusi saat model itu masih anonim](https://www.reddit.com/r/openrouter/comments/1wo94d5/space_bunny_is_the_latest_mystery_model_on/). Setelah MiniMax mengonfirmasi hubungan itu, sekarang nama M3.1 Flash tersedia di kanal resmi perusahaan. Tapi ada satu batas yang penting buat developer yang ingin menjalankannya sendiri: MiniMax baru mengumumkan akses API dan aplikasi, sementara bobot model disebut akan dirilis belakangan tanpa tanggal pasti.

Tarif API yang dicantumkan MiniMax adalah **US$0,15 per sejuta token input**, **US$0,60 per sejuta token output**, dan **US$0,015 untuk input yang dibaca dari cache**.

![Ringkasan tarif API MiniMax M3.1 Flash per satu juta token dan klaim penghematan biaya](/posts/minimax-m31-flash-api-pricing.svg)

*Tarif token dan klaim biaya tugas agent berasal dari pengumuman MiniMax. Angka 70 persen adalah klaim penghematan untuk tugas agentic, bukan potongan langsung 70 persen pada setiap tarif token.*

## Klaim hemat 70 persen perlu dibaca dengan konteks

MiniMax mengatakan biaya penggunaan untuk tugas agent turun 70 persen dibanding model sebelumnya, dan kecepatan inferensi hampir tiga kali lebih tinggi. Itu klaim perusahaan; hasilnya bisa bergantung pada berapa banyak token dan langkah yang dibutuhkan sebuah tugas. Jadi, tarif per token pada gambar di atas tidak otomatis berarti tagihan semua aplikasi turun sebesar 70 persen.

Untuk kemampuan coding, MiniMax menonjolkan skor 73,7 persen di DeepSWE v1.1. Ada catatan penting: [Epoch AI menilai benchmark itu “flawed”](https://epoch.ai/benchmarks/deepswe/review) setelah menemukan masalah pada setidaknya 23 dari 113 tugas, termasuk kesalahan grader. Skor M3.1 Flash tetap bagian dari pengumuman MiniMax, tetapi angka itu sebaiknya tidak berdiri sendiri sebagai bukti bahwa model pasti lebih jago mengerjakan kode.

Reaksi awal pengguna juga beragam. Di [diskusi Hacker News](https://news.ycombinator.com/item?id=50154540), beberapa orang meminta pengujian independen sebelum menyimpulkan kualitasnya. Seorang pengguna [Reddit yang mencoba Space Bunny untuk pekerjaan assembly Z80](https://www.reddit.com/r/LocalLLaMA/comments/1x9uzv9/minimax_m31_flash_released_model_weights_oct_23/) menilai modelnya cepat, tetapi hasil codingnya belum menandingi DeepSeek V4.1 Flash pada tugas tersebut. Itu pengalaman satu orang pada bidang yang sempit, bukan uji menyeluruh terhadap rilis baru.

M3.1 Flash sekarang bisa dicoba lewat layanan MiniMax, sedangkan developer yang menunggu model lokal perlu menanti bobotnya. Untuk menilai apakah tarif murahnya terasa di aplikasi sendiri, ukuran yang paling berguna adalah biaya dan hasil pada tugas nyata—bukan satu angka benchmark dari materi peluncuran.
