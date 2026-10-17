---
title: "Cursor Cloud Agent Kini Bisa Membuat Canvas Interaktif, Environments API Masuk Beta"
source_url: "https://cursor.com/changelog/cloud-agent-canvases-and-environments"
tags: ["AI", "Developer Tools", "Cursor"]
date: "2026-10-17T21:15:03.596Z"
cover_image: "/posts/cursor-cloud-agents-canvas-cover.svg"
---

Pembaruan Cursor pada 16 Oktober membawa tiga perubahan untuk Cloud Agents: agen kini dapat menyusun hasil kerja sebagai canvas interaktif, Environments API mulai tersedia dalam beta, dan lingkungan cloud yang lebih besar mendapat dukungan hingga 300 repositori. Cursor juga mengklaim lingkungan besar kini dimuat lima kali lebih cepat. Canvas sendiri bukan fitur yang sepenuhnya baru—Cursor sudah menyediakan canvas untuk agen sebelumnya—tetapi kini cloud agent dapat membuatnya sebagai bagian dari pekerjaannya.

## Hasil kerja agen bisa berupa canvas

Selama ini keluaran coding agent biasanya hadir sebagai percakapan, ringkasan, atau perubahan kode. Dengan pembaruan ini, [Cloud Agents Cursor dapat membuat canvas interaktif](https://cursor.com/changelog/cloud-agent-canvases-and-environments) saat mengerjakan tugas. Canvas cocok untuk hasil seperti dashboard, laporan, atau analisis yang lebih mudah dibaca dalam bentuk visual daripada deretan teks.

Menurut [dokumentasi Cursor](https://cursor.com/docs/agent/tools/canvas), canvas dapat berisi bagian, statistik, dan tabel; pengguna bisa membuka kembali hasilnya, meminta revisi kepada agent, atau memperbarui data. Canvas yang diterbitkan dapat dibagikan lewat tautan, tetapi aksesnya terbatas untuk anggota tim dan bersifat hanya-baca. Fitur berbagi tersedia pada paket berbayar yang memenuhi syarat, dan pengaturan privasi organisasi harus mengizinkan penyimpanan data.

![Diagram konseptual: Cloud Agent mengubah pekerjaan coding menjadi canvas interaktif yang dapat dibuka anggota tim](/posts/cursor-cloud-agents-canvas-workflow.svg)

*Ilustrasi konseptual, bukan tangkapan layar produk Cursor.*

Perlu dibedakan bahwa canvas dan berbagi hasilnya sudah hadir lebih dulu. Dalam [changelog Mei](https://cursor.com/changelog/shared-canvases), Cursor memperkenalkan canvas sebagai artefak interaktif yang bisa dibagikan kepada rekan satu tim. Perubahan Oktober memperluas alur tersebut ke cloud agent, sehingga hasil tugas yang berjalan di lingkungan cloud juga bisa disajikan dalam format itu.

## Lingkungan agent mulai bisa dikelola lewat API

Pembaruan yang sama menandai [Environments API masuk beta](https://cursor.com/changelog/cloud-agent-canvases-and-environments). Melalui [dokumentasi API Cloud Agents](https://cursor.com/docs/cloud-agent/api/endpoints), developer dapat membuat dan mengelola lingkungan cloud secara terprogram, termasuk mengatur repositori dan konfigurasi lingkungan. Ini membuka jalan untuk menghubungkan penyiapan ruang kerja agent ke otomasi internal, alih-alih mengatur semuanya satu per satu melalui dashboard.

Cursor menyebut satu lingkungan kini dapat memuat hingga 300 repositori dan lingkungan besar dimuat lima kali lebih cepat. Angka kinerja tersebut berasal dari pengumuman Cursor; perusahaan tidak merinci tolok ukur atau konfigurasi pembanding pada changelog-nya. Karena API masih beta, tim sebaiknya menguji alur dan kestabilan API sebelum menjadikannya bagian penting dari otomasi produksi.

## Perubahan kecil pada alur kerja agent

Kedua kemampuan ini menyentuh bagian yang berbeda dari pekerjaan coding agent. Canvas memberi tim hasil visual yang bisa diperiksa dan dibagikan setelah tugas selesai, sementara API memberi developer cara untuk menyiapkan lingkungan agent lewat kode. Untuk tim yang menjalankan agent pada banyak repositori, pengelolaan lingkungan secara terprogram bisa mengurangi langkah manual; canvas juga dapat membuat laporan atau audit lebih mudah ditinjau.

Namun, pembaruan ini tidak menghilangkan kebutuhan untuk memeriksa hasil agent. Canvas tetap perlu ditinjau terhadap kode dan data sumbernya, dan angka percepatan pemuatan masih merupakan klaim Cursor. Nilai praktisnya akan bergantung pada apakah tim memang menjalankan Cloud Agents, membutuhkan hasil visual, dan siap mengadopsi API yang masih dalam tahap beta.
