---
title: "Perplexity Buka SPACE, Sandbox microVM untuk Menjalankan AI Agent"
source_url: "https://www.perplexity.ai/en-GB/hub/blog/open-sourcing-space"
tags: ["AI", "Developer Tools", "Security"]
date: "2026-10-17T18:10:13.000Z"
cover_image: "/posts/perplexity-space-agent-sandbox-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

Perplexity merilis **SPACE**, sistem sandbox yang dipakainya untuk menjalankan tugas di produk Computer, sebagai proyek open source pada 15 Oktober. Setiap sandbox berjalan di Firecracker microVM tersendiri, terpisah dari host. Tim dapat mempelajari kodenya atau memakainya sebagai dasar untuk membangun infrastruktur eksekusi agent sendiri; lisensinya Apache 2.0.

## Lapisan eksekusi, bukan model atau agent baru

SPACE merupakan singkatan dari *Sandboxed Platform for Agentic Code Execution*. Aplikasi mengaksesnya melalui HTTP API untuk membuat lingkungan Linux, menjalankan perintah, membaca hasilnya, dan mengelola siklus hidup sandbox. Kodenya ditulis dalam Rust, tetapi klien dapat menggunakan bahasa lain; keluaran perintah juga bisa dikirim sebagai server-sent events. Alur tersebut dijelaskan di [dokumentasi repo SPACE](https://github.com/perplexityai/SPACE).

Agent mendapat ruang kerja sendiri untuk mengubah berkas atau menjalankan kode. Menurut [penjelasan Perplexity](https://www.perplexity.ai/en-GB/hub/blog/open-sourcing-space), kebijakan jaringan dan kredensial dikelola di luar guest VM. Dengan begitu, token layanan yang diizinkan tidak perlu disimpan di filesystem yang bisa dibaca agent.

![Diagram konseptual batas sandbox SPACE: kode agent berada di guest microVM, sedangkan kontrol jaringan dan kredensial berada di sisi host](/posts/perplexity-space-agent-sandbox-architecture.svg)

*Ilustrasi konseptual arsitektur dan hasil pengujian yang dilaporkan Perplexity; bukan tangkapan layar produk.*

## Uji keamanan menemukan celah di jalur jaringan

Laporan keamanan SPACE memperlihatkan dua hal yang perlu diuji terpisah: isolasi VM dan pembatasan koneksi keluar. Dalam [pengujian red-team Perplexity](https://www.perplexity.ai/en-GB/hub/blog/escaping-space-part-i), sembilan model diberi akses root di guest VM dan diminta mencari jalan keluar. Tak satu pun dari 108 percobaan berhasil menembus VM ke host. Saat jaringan parsial diizinkan, model melewati kebijakan egress dalam 11 dari 54 percobaan melalui masalah DNS dan alamat IP bersama.

Perplexity mengatakan telah memperbaiki masalah jaringan itu dan tidak bisa mereproduksi bypass saat menguji ulang. Ini pengujian internal perusahaan, bukan audit independen. Hasil 108 percobaan hanya menggambarkan konfigurasi yang diuji. Laporan tersebut juga menegaskan bahwa isolasi VM dan aturan egress perlu diperiksa sebagai dua kontrol berbeda.

## Apa yang perlu disiapkan untuk mencobanya?

Saat diperiksa, repo SPACE memiliki sekitar 1.300 bintang dan 105 fork. Rilis ini juga dibahas di [r/machinelearningnews](https://www.reddit.com/r/machinelearningnews/comments/1x7wzon/perplexity_opensources_space_the_firecracker/) dan diliput [MarkTechPost](https://www.marktechpost.com/2026/10/16/perplexity-open-sources-space-firecracker-microvm-sandbox-ai-agents/), yang menyoroti eksekusi kode agent di lingkungan terisolasi.

SPACE adalah layanan infrastruktur yang perlu di-deploy dan dioperasikan. Panduan resminya memakai Kubernetes Kind untuk setup lokal, sementara repo menyediakan contoh deployment di AWS EKS. Ini bisa dipelajari tim yang membangun coding agent, agen analisis data, atau layanan untuk menjalankan kode pengguna—dengan kesiapan mengelola Linux, VM, aturan egress, dan penyimpanan state.

SPACE memberi developer bahan konkret untuk dipelajari, sekaligus mengingatkan bahwa keamanan agent bergantung pada kontrol di sekitar model. Sebelum dipakai di produksi, uji batas jaringan, pengelolaan kredensial, dan pemulihan sandbox di lingkungan sendiri.
