---
title: "PS5LM Jadikan PS5 Server LLM Lokal untuk Laptop dan Coding Tools"
source_url: "https://github.com/cobanov/PS5LM"
tags: ["AI", "Open Source", "Developer Tools"]
date: "2026-10-17T19:15:52.000Z"
cover_image: "/posts/ps5lm-llm-local-server-cover.svg"
---

Sebuah proyek homebrew bernama **PS5LM** mengubah PlayStation 5 yang sudah di-jailbreak menjadi server model AI lokal. `llama.cpp` berjalan di GPU konsol, lalu laptop, ponsel, browser, dan coding tools di jaringan yang sama dapat mengakses model lewat API yang kompatibel dengan OpenAI dan Anthropic. Proyek ini sedang ramai dibicarakan di [Hacker News](https://news.ycombinator.com/item?id=50122431) dan mendapat liputan [Tom’s Hardware](https://www.tomshardware.com/video-games/playstation/jailbroken-ps5s-can-now-run-local-ai-models-at-over-100-tokens-per-second-fork-of-ps5lm-goes-native-and-accesses-gpu-and-more-ram).

## Konsol menjadi host model lokal

Menurut [README PS5LM](https://github.com/cobanov/PS5LM), proyek ini menjalankan backend Vulkan dari `llama.cpp` di GPU RDNA 2 PS5. Model berformat GGUF dimuat ke memori bersama konsol, lalu tersedia bagi perangkat lain melalui endpoint lokal seperti `/v1/chat/completions` dan `/v1/messages`. Dokumentasi proyek juga menyebut penggunaan dari coding tools seperti Claude Code, Codex, dan OpenCode.

Setelah model tersedia dan server berjalan, permintaan inferensi bisa diproses di konsol tanpa mengirim prompt ke layanan AI cloud. Laptop atau ponsel berfungsi sebagai klien; proses modelnya tetap berlangsung di PS5. Ini menjadikan konsol eksperimen menarik untuk developer yang ingin mencoba API model lokal dengan perangkat yang sudah dimiliki.

![Diagram konseptual PS5LM: PS5 menjalankan llama.cpp di GPU dan menyediakan API model lokal untuk laptop, browser, ponsel, serta coding tools](/posts/ps5lm-local-llm-architecture.svg)

*Ilustrasi orisinal tentang alur PS5LM, bukan tangkapan layar aplikasi. Angka performa berasal dari pengukuran yang dilaporkan pengembang dan kontributor proyek.*

## Angka kencang dengan catatan kuantisasi

README proyek mencantumkan sekitar 20 token per detik untuk model Qwen 3.8 27B pada PS5 Slim. Namun, angka ini adalah laporan pengembang, bukan hasil pengujian independen. Dalam [unggahan kontributor di r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1x4y61f/qwen_27b_at_20_toks_on_a_jailbroken_ps5s_gpu_i/), varian yang mencapai konteks 64K adalah IQ2_XXS berukuran sekitar 6,8 GiB. Kontributor itu menjelaskan bahwa file 9,2 GiB membutuhkan konteks lebih pendek, sekitar 32K, pada konfigurasi cache yang ia uji.

Keduanya memakai kuantisasi sangat rendah agar model 27B muat di memori konsol. Ukuran parameter saja tidak menggambarkan kualitas jawaban, dan hasil untuk satu model tidak menjamin model lain akan secepat itu. README yang sama melaporkan Qwen 3.5 9B dengan Q4_K_M pada sekitar 55 token per detik. Angka-angka ini tetap perlu dianggap sebagai hasil dari konfigurasi dan perangkat pengembang.

## Proyek untuk penggemar eksperimen

PS5LM bukan fitur resmi PlayStation. Petunjuk proyek mensyaratkan PS5 pada firmware 7.00–13.60 yang sudah di-jailbreak, ditambah komponen homebrew tertentu. Jadi, perangkat PS5 biasa tidak bisa langsung dipakai sebagai server AI dengan mengunduh aplikasinya saja. Proyek ini menggunakan lisensi GPL-3.0-or-later dan menyatakan tidak berafiliasi dengan Sony.

Diskusi [Hacker News](https://news.ycombinator.com/item?id=50122431) memperlihatkan minat sekaligus keraguan: pembaca tertarik pada pemakaian GPU konsol, sementara sebagian mempertanyakan manfaat praktisnya dibanding PC dan kualitas model yang dikecilkan lewat kuantisasi. Itu konteks yang pas untuk membaca pencapaian ini: bukan pengganti workstation AI, melainkan contoh komunitas memanfaatkan perangkat konsumen dengan cara baru.

Bagi developer, bagian menariknya adalah jalur integrasi yang sederhana setelah server tersedia: aplikasi lokal dapat berbicara dengan endpoint bergaya OpenAI tanpa harus mengirim setiap permintaan ke cloud. Proyek ini layak diikuti jika kamu tertarik pada inferensi lokal dan homebrew, dengan catatan bahwa instalasi membutuhkan perangkat serta konfigurasi khusus.
