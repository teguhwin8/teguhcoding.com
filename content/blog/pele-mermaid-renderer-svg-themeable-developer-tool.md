---
title: "Pele, Renderer Mermaid ke SVG yang Mengikuti Tema, Ramai Dibahas Developer"
source_url: "https://github.com/obsidianmd/pele"
tags: ["Developer Tools", "JavaScript", "Open Source"]
date: "2026-10-18T05:19:02.084Z"
cover_image: "/posts/pele-mermaid-themeable-svg-cover.svg"
---

Pele adalah library open source yang mengubah sintaks Mermaid menjadi SVG untuk disematkan di aplikasi web. Yang membuatnya menarik bagi developer adalah kombinasi renderer mandiri, pengaturan warna lewat CSS variables, dan layout yang dapat menyesuaikan lebar wadah. Proyek ini ramai dibahas di Hacker News pada 17 Oktober; saat diperiksa keesokan harinya, diskusinya mencatat 336 poin dan 30 komentar. ([repo Pele](https://github.com/obsidianmd/pele), [dokumentasi proyek](https://pele.run/), [diskusi Hacker News](https://news.ycombinator.com/item?id=50132193).)

![Ilustrasi alur sintaks Mermaid yang dirender Pele menjadi SVG bertema](/posts/pele-mermaid-themeable-svg-cover.svg)

*Ilustrasi konseptual buatan Teguhcoding, bukan tangkapan layar Pele.*

## Sintaks Mermaid, hasil SVG

Mermaid memungkinkan developer menulis diagram sebagai teks. Pele menerima sintaks tersebut lalu menghasilkan SVG yang dapat ditampilkan di halaman web. API dasarnya bisa dipakai melalui paket npm `pele`: fungsi `render()` mengembalikan SVG, sementara `mount()` menampilkan diagram di elemen halaman dan menyesuaikan layout dengan lebar kontainer. Pele dikembangkan sebagai proyek open source untuk Obsidian dan dilisensikan dengan MIT. ([panduan di GitHub](https://github.com/obsidianmd/pele), [API Pele](https://pele.run/api).)

![Diagram konseptual dari sintaks Mermaid melalui renderer Pele hingga SVG responsif yang mengikuti tema aplikasi](/posts/pele-mermaid-renderer-flow.svg)

*Alur konseptual berdasarkan dokumentasi Pele; bukan diagram resmi proyek.*

## Tema dan layout dibuat untuk tiap aplikasi

Warna diagram dapat diatur melalui CSS variables seperti `--pele-bg`, `--pele-fg`, dan `--pele-accent`. Karena SVG menggunakan nilai tersebut, perubahan tema terang ke gelap dapat diterapkan tanpa merender ulang diagram. Di layar sempit, Pele dapat menyusun ulang diagram supaya muat di kontainer, bukan sekadar mengecilkan gambar yang lebar.

Perbedaannya dengan Mermaid.js bukan hanya ukuran file. Pele memakai mesin layout dan gaya visualnya sendiri. Proyek menyebut dukungan untuk setiap jenis diagram bawaan Mermaid 12.1.0, tetapi diagram eksternal seperti plugin ZenUML tidak didukung. Posisi simpul dan jalur koneksi juga bisa berbeda dari hasil Mermaid.js, sehingga aplikasi yang ingin berpindah perlu membandingkan diagram pentingnya terlebih dahulu. ([catatan kompatibilitas](https://pele.run/compatibility).)

## Klaim performa perlu dibaca sebagai benchmark pembuatnya

Halaman Pele menyebut paket tanpa dependensi langsung, ukuran gzip 230 KB dibanding 1,6 MB untuk Mermaid.js, serta waktu render hingga 500 kali lebih cepat. Angka tersebut adalah hasil pembandingan yang dipublikasikan pembuat Pele; hasil di aplikasi nyata tetap bergantung pada ukuran diagram, perangkat, dan cara pengukuran. Jadi, angka itu memberi alasan untuk mencoba library ini, bukan jaminan bahwa semua halaman akan menjadi 500 kali lebih cepat. ([perbandingan Pele](https://pele.run/).)

Diskusi komunitas ikut menyoroti masalah yang lebih terasa daripada angka benchmark: tata letak diagram yang rumit. Beberapa peserta Hacker News mengatakan mereka tertarik dengan layout Pele, termasuk cara subgraph mempertahankan arahnya ketika terhubung dengan simpul lain. Itu adalah pengalaman dan preferensi para komentator, bukan evaluasi komparatif yang terkontrol. ([diskusi Hacker News](https://news.ycombinator.com/item?id=50132193).)

## Cocok untuk aplikasi yang banyak memakai diagram

Pele layak dicoba jika aplikasi perlu menampilkan diagram Mermaid di halaman yang responsif atau mengikuti tema antarmuka. Developer dapat memasang paket, memanggil `render()` dengan teks Mermaid, lalu menyematkan SVG yang dikembalikan. Sebelum migrasi, periksa diagram kompleks, font, label, serta ekstensi Mermaid yang dipakai: dokumentasi Pele menyebut dukungan untuk sintaks bawaan Mermaid 12.1.0, sementara HTML bebas di label dan plugin eksternal tidak termasuk. ([repo dan panduan](https://github.com/obsidianmd/pele), [batas kompatibilitas](https://pele.run/compatibility).)

Popularitas di Hacker News membuat Pele menarik untuk dipantau, tetapi ukuran minat komunitas tidak otomatis membuktikan performa atau kecocokan di setiap proyek. Nilai praktisnya ada pada alternatif yang dapat diuji: sintaks diagram yang sudah familier, hasil SVG, pengaturan tema lewat CSS, dan mesin layout yang berbeda.
