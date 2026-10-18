---
title: "AI Job Search di GitHub: Claude Code Bantu Menyiapkan Lamaran Kerja"
source_url: "https://github.com/MadsLorentzen/ai-job-search"
tags: ["AI", "GitHub", "Karier"]
date: "2026-10-17T00:00:00.000Z"
cover_image: "/posts/ai-job-search-claude-code-cover.svg"
---

**AI Job Search** adalah rangkaian perintah Claude Code untuk mencari lowongan, menilai kecocokan, menyiapkan CV dan surat lamaran, lalu berlatih wawancara. Saat diperiksa pada 17 Oktober 2026, repositorinya memiliki sekitar 49,3 ribu stars dan 16,8 ribu fork. Proyek ini jelas menarik perhatian komunitas, meski jumlah tersebut tak menjamin hasil pencarian kerja penggunanya.

## Dari profil sampai persiapan wawancara

Mads Lorentzen membuatnya sebagai alat bantu di workspace Claude Code, bukan situs lowongan atau bot yang mengirim lamaran secara otomatis. Kodenya open source dan independen. README juga menegaskan bahwa AI Job Search tidak dibuat, didukung, atau dikelola oleh Anthropic.

Alurnya dimulai dari `/setup`, yang menyusun profil kandidat dari CV, dokumen, atau jawaban pengguna. Lalu `/scrape` mencari lowongan di portal yang didukung, menghapus duplikat, dan menampilkan posisi yang paling cocok. Jika daftar hasilnya panjang, `/rank` membantu menentukan mana yang perlu dilihat lebih dulu.

Setelah memilih posisi, pengguna bisa menjalankan `/apply` untuk membandingkan profil dengan deskripsi pekerjaan dan menyiapkan CV serta surat lamaran yang disesuaikan. Drafnya melewati tahap review sebelum dikembalikan. Perintah `/interview` membantu menyiapkan sesi wawancara. Contoh dan detail tiap perintah ada di [README AI Job Search](https://github.com/MadsLorentzen/ai-job-search/blob/master/README.md).

![Diagram alur AI Job Search dari pengaturan profil hingga persiapan wawancara](/posts/ai-job-search-workflow.svg)

## Cerita pribadi di balik proyeknya

Lorentzen mulai membuat alat ini setelah kehilangan pekerjaan pada akhir 2025. Dalam [README](https://github.com/MadsLorentzen/ai-job-search/blob/master/README.md), ia bercerita sudah mengirim 69 lamaran yang disesuaikan, mendapat 20 wawancara tahap awal, dan menandatangani satu kontrak sebelum mulai bekerja sebagai AI engineer pada Juni 2026.

Angka tersebut adalah pengalaman pribadi maintainer, bukan hasil studi tentang peluang pengguna lain. Yang bisa dinilai langsung dari repo adalah cara kerjanya: kriteria evaluasi, berkas profil, templat dokumen, dan tahap review terbuka untuk dibaca maupun diubah.

Repo ini masih menerima pembaruan. Rilis terbaru saat artikel ini ditulis adalah [v1.7.2 pada 29 September 2026](https://github.com/MadsLorentzen/ai-job-search/releases/tag/v1.7.2). Isinya antara lain pemeriksaan tata letak PDF, validasi input pencarian portal, dan dukungan yang lebih baik untuk teks non-ASCII.

## Bisa dipakai untuk pencarian kerja di Indonesia?

Penyusunan profil, penilaian kecocokan, dan penulisan dokumennya dirancang agar bisa dipakai lintas bahasa dan negara. Namun, beberapa portal bawaan berfokus pada pasar Denmark. Ada juga pencarian LinkedIn dan FreeHire, serta perintah `/add-portal` untuk menambahkan sumber lowongan lain.

Pengguna di Indonesia mungkin perlu menambahkan portal lokal dan memeriksa relevansi hasilnya sendiri. Setup-nya juga perlu beberapa alat: Claude Code, Python, Bun, dan LaTeX untuk menjalankan alur lengkap. Cek [panduan instalasi](https://github.com/MadsLorentzen/ai-job-search/blob/master/SETUP.md) sebelum mencoba karena prasyarat dapat berubah.

## Jangan abaikan privasi dan batas keamanan

Ada satu hal yang perlu diperhatikan sebelum mengisi profil. Fork dari repo publik tetap publik, sedangkan `/setup` dapat menyimpan nama, kontak, riwayat kerja, dan ekspektasi gaji di berkas yang dilacak Git. Untuk penggunaan pribadi, maintainer menyarankan repo privat dengan proyek ini sebagai upstream. Detailnya ada di [README](https://github.com/MadsLorentzen/ai-job-search/blob/master/README.md) dan [panduan setup](https://github.com/MadsLorentzen/ai-job-search/blob/master/SETUP.md).

Menurut [kebijakan keamanan](https://github.com/MadsLorentzen/ai-job-search/blob/master/SECURITY.md), aturan `gitignore` melindungi profil dan tracker yang sudah diisi. Namun, agent tetap membaca isi lowongan—yang bisa saja memuat instruksi tak tepercaya—bersama data kandidat. Aturan prompt membantu membatasi pengaruh teks tersebut, tetapi bukan sandbox. Tinjau lowongan dan hasil agent, terutama jika sumbernya tidak dikenal.

AI Job Search menawarkan alur pencarian kerja yang bisa diperiksa dan disesuaikan, dari memilih posisi sampai menyiapkan dokumen. Developer Indonesia bisa mempelajari strukturnya atau menambahkan portal lokal. Sebelum mengirim lamaran, periksa kembali isi dokumen, lowongan, dan tempat profil disimpan.
