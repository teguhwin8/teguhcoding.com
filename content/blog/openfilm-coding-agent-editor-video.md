---
title: "OpenFilm Ubah Coding Agent Jadi Editor Video, Hasilnya Tetap Bisa Diedit"
source_url: "https://github.com/openfilm/openfilm"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-21T05:54:20.000Z"
cover_image: "/posts/openfilm-video-editor-cover.jpg"
---

[OpenFilm](https://github.com/openfilm/openfilm) meminta coding agent membuat film sebagai proyek web—berisi HTML, CSS, gambar, video, dan audio—lalu menampilkannya di editor yang bisa dipakai untuk mengubah hasilnya. Pendekatan ini menarik perhatian developer pekan ini: per 21 Oktober, repositorinya sudah memiliki sekitar 1.600 stars dan 159 forks di GitHub.

![Monitor berisi perangkat lunak penyunting video sebagai ilustrasi](/posts/openfilm-video-editor-cover.jpg)

*Foto ilustrasi, bukan tampilan OpenFilm. Foto oleh [abdo alshreef di Pexels](https://www.pexels.com/photo/a-computer-monitor-displaying-a-video-editing-program-24497392/), digunakan sesuai [lisensi Pexels](https://www.pexels.com/license/).*

Proyek ini mulai mendapat perhatian lebih luas setelah pembuatnya membagikan demo di [r/BuildWithClaude](https://www.reddit.com/r/BuildWithClaude/comments/1x9h0kx/to_never_edit_a_video_again_i_built_an_opensource/). Post itu meraih sekitar 589 upvotes saat diperiksa pada 21 Oktober. Yang ditawarkan bukan model text-to-video baru. OpenFilm memberi coding agent cara untuk menyusun, memeriksa, lalu mengedit film lewat file yang tetap bisa dibaca developer.

![Alur OpenFilm: coding agent menulis file proyek film, Studio menampilkan dan mengeditnya, lalu CLI merender video](/posts/openfilm-editable-video-workflow.svg)

*Ringkasan alur dari [README OpenFilm](https://github.com/openfilm/openfilm) dan [situs proyek](https://openfilm.dev).*

### Filmnya berbentuk proyek web

Coding agent seperti Codex atau Claude Code menulis film sebagai folder proyek. File `film.html` menyusun adegan dan klip di beberapa track. Adegan bisa berupa halaman web, sedangkan video, gambar, dan audio menjadi klip yang ditempatkan di timeline. Tampilan motion graphics dapat dibuat dengan teknologi web seperti HTML, CSS, SVG, canvas, atau WebGL.

Struktur ini memberi developer akses langsung ke bahan pembuat filmnya. Posisi elemen diatur lewat CSS, durasi dan titik potong disimpan di file proyek, sementara gambar atau suara tetap menjadi aset terpisah. Kalau hasilnya belum pas, perubahan tidak terkunci di dalam satu berkas video jadi.

### Bisa dikoreksi tanpa mengulang dari awal

OpenFilm Studio menampilkan preview dan timeline proyek. Pengguna dapat memilih bagian yang ingin diubah lalu memperbaikinya sendiri, atau meminta coding agent mengeditnya. Perubahan manual disimpan sebagai *override*, sehingga agent bisa melanjutkan proyek tanpa menimpa koreksi tadi.

Ada juga perintah [`look` di CLI OpenFilm](https://github.com/openfilm/openfilm#commands) untuk memeriksa hasil render. Menurut README, alat itu menggambar ulang frame dalam urutan berbeda untuk mendeteksi hasil yang berubah-ubah, lalu melaporkan masalah seperti aset yang hilang, kesalahan halaman, font yang gagal dimuat, atau teks yang terpotong. Ini berguna untuk menangkap masalah visual sebelum video diekspor.

### Gratis dipakai, layanan media tetap punya biaya

OpenFilm memakai [lisensi MIT](https://github.com/openfilm/openfilm/blob/main/LICENSE) dan proses edit serta render berjalan secara lokal. Proyeknya bisa dipasang ke coding agent dengan `npx skills add openfilm/openfilm`, atau dijalankan lewat CLI. Untuk membuat footage, musik, gambar, atau suara dengan layanan AI, pengguna perlu menghubungkan akun dan API key sendiri; biaya layanan tersebut tetap ditagihkan oleh penyedianya.

Jadi, OpenFilm lebih tepat dilihat sebagai editor dan workflow video yang bisa dikendalikan lewat kode maupun agent. Ia cocok dicoba untuk motion graphics, video penjelasan, atau materi produk yang butuh teks dan komposisi presisi. Untuk footage generatif, pengguna masih perlu membawa model atau layanan lain. Proyeknya masih di tahap awal: [rilis publik terbaru yang tercatat adalah v0.1.3](https://github.com/openfilm/openfilm/releases), jadi alur kerja dan kestabilan hasilnya masih layak diuji sebelum dipakai untuk produksi rutin.
