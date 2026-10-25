---
title: "PS5LM Jadikan PS5 Server LLM Lokal untuk Laptop dan Coding Tools"
source_url: "https://github.com/cobanov/PS5LM"
tags: ["AI", "Open Source", "Developer Tools"]
date: "2026-10-17T19:15:52.000Z"
cover_image: "/posts/ps5lm-llm-local-server-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

PS5LM memanfaatkan GPU PlayStation 5 untuk menjalankan model AI secara lokal. Proyek homebrew ini memasang `llama.cpp` di konsol yang sudah di-jailbreak, lalu membuka akses ke model melalui API yang kompatibel dengan OpenAI dan Anthropic. Laptop, ponsel, browser, dan coding tools di jaringan yang sama bisa menjadi kliennya. Proyek ini ramai dibahas di [Hacker News](https://news.ycombinator.com/item?id=50122431) dan diliput [Tom’s Hardware](https://www.tomshardware.com/video-games/playstation/jailbroken-ps5s-can-now-run-local-ai-models-at-over-100-tokens-per-second-fork-of-ps5lm-goes-native-and-accesses-gpu-and-more-ram).

## Konsol menjadi host model lokal

Menurut [README PS5LM](https://github.com/cobanov/PS5LM), proyek ini menjalankan backend Vulkan `llama.cpp` di GPU RDNA 2 PS5. Model GGUF dimuat ke memori konsol, lalu dapat diakses perangkat lain lewat endpoint lokal seperti `/v1/chat/completions` dan `/v1/messages`. README juga mencantumkan Claude Code, Codex, dan OpenCode sebagai klien yang bisa digunakan.

Setelah server aktif, prompt diproses di konsol tanpa perlu dikirim ke layanan AI cloud. Laptop atau ponsel hanya menjadi klien, sedangkan model berjalan di PS5. Buat developer yang ingin bereksperimen dengan inferensi lokal, ini cara tak biasa untuk mengubah konsol menjadi host API.

![Diagram konseptual PS5LM: PS5 menjalankan llama.cpp di GPU dan menyediakan API model lokal untuk laptop, browser, ponsel, serta coding tools](/posts/ps5lm-local-llm-architecture.svg)

*Ilustrasi orisinal tentang alur PS5LM, bukan tangkapan layar aplikasi. Angka performa berasal dari pengukuran yang dilaporkan pengembang dan kontributor proyek.*

## Angka kencang dengan catatan kuantisasi

README proyek melaporkan kecepatan sekitar 20 token per detik untuk Qwen 3.8 27B di PS5 Slim. Angka ini berasal dari pengembang, belum diuji secara independen. Dalam [unggahan di r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1x4y61f/qwen_27b_at_20_toks_on_a_jailbroken_ps5s_gpu_i/), seorang kontributor menjelaskan bahwa varian IQ2_XXS berukuran sekitar 6,8 GiB dapat menangani konteks 64K. Berkas 9,2 GiB yang ia uji memerlukan konteks lebih pendek, sekitar 32K.

Kedua konfigurasi itu memakai kuantisasi rendah agar model 27B muat di memori konsol. README yang sama melaporkan Qwen 3.5 9B dengan format Q4_K_M berjalan sekitar 55 token per detik. Kecepatan dan mutu jawaban akan bergantung pada model, kuantisasi, dan konfigurasi yang dipakai.

## Proyek untuk penggemar eksperimen

PS5LM adalah proyek komunitas, bukan fitur resmi PlayStation. Untuk mencobanya, README mensyaratkan PS5 dengan firmware 7.00–13.60 yang sudah di-jailbreak serta beberapa komponen homebrew. Konsol biasa belum bisa menjalankannya hanya dengan memasang aplikasi. Proyek ini berlisensi GPL-3.0-or-later dan menyatakan tidak berafiliasi dengan Sony.

Di [Hacker News](https://news.ycombinator.com/item?id=50122431), pembaca tertarik pada pemakaian GPU konsol, sekaligus mempertanyakan manfaatnya dibanding PC dan dampak kuantisasi pada kualitas model. PS5LM lebih tepat dilihat sebagai eksperimen homebrew daripada pengganti workstation AI.

Yang menarik bagi developer adalah akses API lokalnya: aplikasi dapat mengirim permintaan ke model di jaringan sendiri, tanpa meneruskan setiap prompt ke cloud. Namun, instalasinya membutuhkan konsol dan konfigurasi khusus, jadi proyek ini terutama cocok untuk penggemar inferensi lokal dan homebrew.
