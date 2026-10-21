---
title: "Respan Rilis Gateway AI Rust, tetapi Plugin Kustom Tetap Harus Di-compile"
source_url: "https://github.com/respanai/respan-gateway"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-21T08:56:54.000Z"
cover_image: "/posts/respan-rust-gateway-cover.jpg"
---

Respan membuka kode **Respan Gateway**, perantara yang menyatukan API berbagai model AI dalam satu endpoint. Proyek berbasis Rust ini bisa menerjemahkan format OpenAI, Anthropic, dan Gemini, lalu menambahkan routing, fallback, serta akses MCP. Namun, kata “plugin” di sini bukan berarti modul bisa dipasang dan dimuat begitu saja saat gateway sedang berjalan.

![Deretan rak server sebagai ilustrasi infrastruktur di balik gateway AI](/posts/respan-rust-gateway-cover.jpg)

*Foto ilustrasi, bukan perangkat milik Respan. Foto oleh [Brett Sayles di Pexels](https://www.pexels.com/photo/server-racks-on-data-center-5480781/), digunakan sesuai [lisensi Pexels](https://www.pexels.com/legal-pages/license/).*

Di [repositori GitHub-nya](https://github.com/respanai/respan-gateway), Respan juga mencantumkan dukungan untuk suara realtime, gambar, transkripsi, embeddings, video, dan server MCP. Tujuannya: aplikasi bisa berpindah model atau penyedia tanpa perlu menulis ulang seluruh integrasi setiap kali kebutuhan berubah.

![Alur request melalui Respan Gateway dan catatan bahwa plugin kustom dikompilasi bersama aplikasi](/posts/respan-gateway-rust-architecture.svg)

*Alur disederhanakan dari [README Respan Gateway](https://github.com/respanai/respan-gateway) dan keterangan pendirinya di [Hacker News](https://news.ycombinator.com/item?id=50167583).*

## Berawal dari tumpukan kode pembungkus LiteLLM

Respan mengatakan gateway sebelumnya dibangun di atas LiteLLM. Kebutuhan tiap pelanggan membuat tim menambah lapisan kode hingga, menurut pendirinya, jumlah kode pembungkus itu pernah melewati 100.000 baris. Pembaruan LiteLLM pada Januari lalu kemudian memicu gangguan koneksi yang belum berhasil mereka jelaskan, sehingga mereka membatalkan pembaruan tersebut. [The New Stack](https://thenewstack.io/respan-rust-ai-gateway/?p=22841154) juga melaporkan alasan peralihan ini.

Versi baru membagi fungsi gateway menjadi modul-modul kecil di sekitar inti yang mengatur alur request. Contohnya, routing, fallback, penerjemahan format API, dan integrasi MCP masing-masing bisa dibuat sebagai modul tersendiri. Ini desain yang dipilih Respan; belum ada data uji independen yang membuktikan gateway tersebut lebih cepat atau lebih andal daripada alternatifnya.

## “Plugin” di sini tetap masuk ke proses build

Ada satu detail yang mudah terlewat: plugin Respan ditulis sebagai crate Rust dan dikompilasi ke dalam aplikasi. Jadi, plugin kustom bukan skrip yang bisa diunduh lalu diaktifkan tanpa menyentuh proses build. Pendirinya menjelaskan di [diskusi peluncuran Hacker News](https://news.ycombinator.com/item?id=50167583) bahwa konfigurasi untuk template umum bisa diubah tanpa build ulang, tetapi logika kustom tetap perlu dikompilasi.

Pilihan ini memberi tim batas modul yang jelas, tetapi konsekuensinya developer yang membuat ekstensi sendiri perlu menyiapkan proses build dan rilis gateway. Di Hacker News, beberapa orang juga mempertanyakan risiko rantai pasok dan apakah plugin yang dikompilasi bersama aplikasi cukup mudah diaudit. Itu pertanyaan komunitas, bukan laporan adanya celah keamanan di Respan.

Respan menyebut proyeknya masih **pre-alpha** saat peluncuran dan merilis kode dengan lisensi MIT atau Apache 2.0. Thread [Launch HN](https://news.ycombinator.com/item?id=50167583) mencatat 49 poin dan 20 komentar ketika diperiksa pada 21 Oktober; repositorinya mencatat 72 stars. Angka tersebut menunjukkan perhatian awal, bukan bukti bahwa gateway sudah siap menggantikan layanan produksi.

Untuk tim yang sedang merapikan banyak integrasi model, bagian menariknya ada pada rancangan inti dan modul yang bisa dipilih. Namun, karena proyek masih sangat awal dan ekstensi kustom ikut dikompilasi ke aplikasi, coba dulu dengan beban kerja nonkritis sebelum menaruh trafik produksi di sana.
