---
title: "AI Job Search di GitHub: Claude Code Bantu Menyiapkan Lamaran Kerja"
source_url: "https://github.com/MadsLorentzen/ai-job-search"
tags: ["AI", "GitHub", "Karier"]
date: "2026-10-17T00:00:00.000Z"
cover_image: "/posts/ai-job-search-claude-code-cover.svg"
---

Repositori **AI Job Search** merangkai pencarian lowongan, penilaian kecocokan, penyesuaian CV, surat lamaran, hingga persiapan wawancara dalam alur berbasis Claude Code. Saat diperiksa pada 17 Oktober 2026, halaman [GitHub proyek ini](https://github.com/MadsLorentzen/ai-job-search) menampilkan sekitar 49,3 ribu stars dan 16,8 ribu fork. Angka itu menunjukkan besarnya perhatian komunitas, tetapi bukan jaminan bahwa AI akan meningkatkan peluang seseorang mendapat pekerjaan.

## Dari profil sampai persiapan wawancara

Proyek buatan Mads Lorentzen ini bukan situs lowongan atau bot yang otomatis mengirim lamaran. Ia menyediakan rangkaian perintah yang membantu pengguna mengelola prosesnya sendiri di dalam workspace Claude Code. Proyeknya bersifat open source dan independen; README menegaskan bahwa AI Job Search tidak dibuat, didukung, atau dikelola oleh Anthropic.

Perintah `/setup` membangun profil kandidat dari CV dan dokumen pendukung, teks yang diberikan pengguna, atau sesi tanya jawab. `/scrape` mencari lowongan di portal yang tersedia, menghapus hasil duplikat, lalu menyajikan posisi berdasarkan kecocokan. Jika hasil pencarian banyak, `/rank` bisa membantu membuat daftar prioritas.

Untuk posisi yang dipilih, `/apply` menilai kecocokan kandidat dengan deskripsi pekerjaan, menyiapkan CV dan surat lamaran yang disesuaikan, lalu menjalankan proses drafter-reviewer: draf dikritik dan direvisi sebelum hasilnya diberikan kepada pengguna. Ada pula `/interview` untuk menyusun persiapan wawancara. Detail perintah dan hasilnya dijelaskan di [README AI Job Search](https://github.com/MadsLorentzen/ai-job-search/blob/master/README.md).

![Diagram alur AI Job Search dari pengaturan profil hingga persiapan wawancara](/posts/ai-job-search-workflow.svg)

## Cerita pribadi di balik proyeknya

Lorentzen menulis bahwa ia membuat framework ini setelah kehilangan pekerjaannya pada akhir 2025. Dalam [README proyek](https://github.com/MadsLorentzen/ai-job-search/blob/master/README.md), ia menceritakan telah mengirim 69 lamaran yang disesuaikan, mendapat 20 wawancara pertama, lalu menandatangani satu kontrak sebelum mulai bekerja sebagai AI engineer pada Juni 2026.

Itu adalah pengalaman pribadi maintainer, bukan studi yang membuktikan framework ini akan memberi hasil serupa bagi pengguna lain. Nilai yang lebih mudah dinilai dari repositorinya adalah struktur kerja yang terbuka: kriteria evaluasi, berkas profil, templat dokumen, dan langkah review dapat dibaca serta diubah sendiri.

Proyeknya juga masih diperbarui. Rilis terbaru yang tercantum saat artikel ini ditulis adalah [v1.7.2, terbit 29 September 2026](https://github.com/MadsLorentzen/ai-job-search/releases/tag/v1.7.2). Catatan rilisnya mencakup pemeriksaan tata letak PDF yang lebih terukur, validasi input pada alat pencarian portal, dan perbaikan agar beberapa alat lebih tahan terhadap teks non-ASCII.

## Bisa dipakai untuk pencarian kerja di Indonesia?

README menyebut alur inti seperti penyusunan profil, evaluasi kecocokan, dan penulisan dokumen dirancang agar tidak terikat pada satu bahasa atau negara. Namun, sejumlah portal bawaan berfokus pada pasar Denmark. Proyek ini juga menyertakan pencarian LinkedIn dan FreeHire yang lebih mudah digunakan lintas negara serta perintah `/add-portal` untuk menambahkan portal lain.

Artinya, pengguna Indonesia mungkin perlu menyesuaikan pencarian dengan situs lowongan lokal dan mengecek sendiri apakah hasilnya relevan. Setup-nya juga lebih teknis daripada memakai layanan web siap pakai: repo mencantumkan Claude Code, Python, Bun, serta LaTeX sebagai prasyarat untuk alur lengkap. Rilis dan fitur yang tercantum dapat berubah, jadi periksa [panduan instalasi terbaru](https://github.com/MadsLorentzen/ai-job-search/blob/master/SETUP.md) sebelum mencoba.

## Jangan abaikan privasi dan batas keamanan

Repositori ini memberi peringatan jelas: fork dari proyek publik akan tetap publik, sementara `/setup` dapat menulis nama, kontak, riwayat kerja, dan ekspektasi gaji ke berkas yang dilacak Git. Untuk pencarian pribadi, maintainer menyarankan memakai repo privat dengan proyek ini sebagai upstream, bukan menyimpan profil di fork publik. Lihat bagian terkait di [README](https://github.com/MadsLorentzen/ai-job-search/blob/master/README.md) dan [panduan setup](https://github.com/MadsLorentzen/ai-job-search/blob/master/SETUP.md).

Menurut [kebijakan keamanan proyek](https://github.com/MadsLorentzen/ai-job-search/blob/master/SECURITY.md), profil dan tracker yang sudah diisi dilindungi oleh aturan `gitignore`, sedangkan agent tetap membaca konten postingan kerja yang tidak tepercaya bersama data kandidat. Proyek memakai aturan instruksi untuk membatasi pengaruh teks di lowongan, tetapi maintainer menegaskan pertahanan itu bukan sandbox. Pengguna tetap perlu meninjau input dan hasil agent, terutama saat memproses posting dari situs yang tidak dikenal.

AI Job Search menarik karena memperlakukan pencarian kerja sebagai workflow yang bisa diinspeksi dan disesuaikan, bukan sekadar meminta AI “buatkan CV”. Bagi developer Indonesia, repo ini layak dipelajari sebagai kerangka kerja. Tetapi portal lokal, klaim dalam dokumen lamaran, serta keamanan profil tetap perlu diperiksa manusia sebelum setiap aplikasi dikirim.
