---
title: "Pele: Renderer Mermaid ke SVG yang Mengikuti Tema Aplikasi"
source_url: "https://github.com/obsidianmd/pele"
tags: ["Developer Tools", "JavaScript", "Open Source"]
date: "2026-10-18T05:19:02.084Z"
cover_image: "/posts/pele-mermaid-themeable-svg-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

Kalau pernah membuat diagram dengan Mermaid, kamu mungkin tahu bahwa mengatur tampilannya bisa merepotkan. Pele menangani bagian itu: tulis sintaks Mermaid seperti biasa, lalu render menjadi SVG yang warnanya bisa mengikuti tema aplikasi. Proyek open source yang dibuat untuk Obsidian ini ramai di Hacker News; saat diperiksa pada 18 Oktober, diskusinya mencatat 336 poin dan 30 komentar. ([repo Pele](https://github.com/obsidianmd/pele), [dokumentasi proyek](https://pele.run/), [diskusi Hacker News](https://news.ycombinator.com/item?id=50132193).)

![Ilustrasi alur sintaks Mermaid yang dirender Pele menjadi SVG bertema](/posts/pele-mermaid-themeable-svg-cover.svg)

*Ilustrasi konseptual buatan Teguhcoding, bukan tangkapan layar Pele.*

## Sintaks Mermaid, hasil SVG

Mermaid membuat diagram dari teks. Pele membaca sintaks itu dan menghasilkan SVG yang bisa dipasang di halaman web. Di paket npm `pele`, `render()` mengembalikan SVG, sedangkan `mount()` langsung menampilkannya di elemen halaman dan menyesuaikan susunan diagram saat lebar elemen berubah. Kodenya berlisensi MIT. ([panduan di GitHub](https://github.com/obsidianmd/pele), [API Pele](https://pele.run/api).)

![Diagram konseptual dari sintaks Mermaid melalui renderer Pele hingga SVG responsif yang mengikuti tema aplikasi](/posts/pele-mermaid-renderer-flow.svg)

*Alur konseptual berdasarkan dokumentasi Pele; bukan diagram resmi proyek.*

## Tema dan layout dibuat untuk tiap aplikasi

Warna diagram diatur lewat CSS variables seperti `--pele-bg`, `--pele-fg`, dan `--pele-accent`. Saat tema aplikasi berubah dari terang ke gelap, SVG dapat mengikuti warna baru tanpa dirender ulang. Pada layar sempit, Pele juga bisa mengatur ulang susunan diagram agar muat di area yang tersedia.

Pele punya mesin tata letak sendiri, jadi posisi simpul dan jalur koneksinya bisa berbeda dari hasil Mermaid.js. Dokumentasinya menyebut semua jenis diagram bawaan Mermaid 12.1.0 didukung, tetapi plugin eksternal seperti ZenUML tidak. Kalau ingin mengganti renderer, bandingkan dulu diagram yang paling penting di aplikasi. ([catatan kompatibilitas](https://pele.run/compatibility).)

## Ukuran paket dan klaim kecepatan

Pembuatnya mengklaim Pele tidak punya dependensi langsung, ukuran gzip-nya 230 KB dibanding 1,6 MB untuk Mermaid.js, dan proses render bisa sampai 500 kali lebih cepat. Itu angka dari pembandingan mereka sendiri; hasil di proyekmu bisa berbeda tergantung diagram, perangkat, dan cara mengukurnya. ([perbandingan Pele](https://pele.run/).)

Di Hacker News, beberapa developer menyoroti tata letak diagram yang lebih mudah dibaca, termasuk arah subgraph yang tetap dipertahankan saat terhubung ke simpul lain. Komentar itu juga yang membuat proyek ini banyak dibicarakan. ([diskusi Hacker News](https://news.ycombinator.com/item?id=50132193).)

## Cocok untuk aplikasi yang banyak memakai diagram

Jika aplikasimu memakai banyak diagram, Pele patut dicoba terutama untuk tampilan responsif dan pergantian tema. Uji dulu diagram yang kompleks, font, label, dan ekstensi yang dipakai tim. Pele menerima banyak sintaks bawaan Mermaid, tetapi HTML bebas di label dan plugin eksternal belum didukung. ([repo dan panduan](https://github.com/obsidianmd/pele), [batas kompatibilitas](https://pele.run/compatibility).)

Intinya, Pele memberi developer pilihan lain untuk menampilkan Mermaid di aplikasi: hasilnya SVG, warnanya bisa mengikuti CSS, dan tata letaknya ditangani oleh mesin berbeda. Cocok atau tidaknya tetap paling mudah diketahui dengan mencobanya pada diagram milik sendiri.
