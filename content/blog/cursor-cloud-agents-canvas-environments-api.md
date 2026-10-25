---
title: "Cursor Cloud Agent Kini Bisa Membuat Canvas Interaktif, Environments API Masuk Beta"
source_url: "https://cursor.com/changelog/cloud-agent-canvases-and-environments"
tags: ["AI", "Developer Tools", "Cursor"]
date: "2026-10-17T21:15:03.596Z"
cover_image: "/posts/cursor-cloud-agents-canvas-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

Pembaruan Cloud Agents dari Cursor pada 16 Oktober menghadirkan canvas yang bisa dibuat agen, Environments API dalam versi beta, serta dukungan hingga 300 repositori di lingkungan cloud. Cursor juga mengatakan lingkungan besar kini dimuat lima kali lebih cepat. Canvas sudah tersedia sebelumnya; perubahan kali ini memungkinkan cloud agent membuatnya sebagai bagian dari tugas.

## Hasil kerja agen bisa berupa canvas

Hasil kerja coding agent biasanya berupa percakapan, ringkasan, atau perubahan kode. Kini [Cloud Agents Cursor dapat membuat canvas interaktif](https://cursor.com/changelog/cloud-agent-canvases-and-environments), misalnya untuk menyajikan dashboard, laporan, atau analisis dalam bentuk visual.

Di [dokumentasi Cursor](https://cursor.com/docs/agent/tools/canvas), canvas dijelaskan dapat memuat teks, statistik, dan tabel. Pengguna bisa membukanya lagi, meminta revisi, atau memperbarui datanya. Canvas yang diterbitkan dapat dibagikan lewat tautan kepada anggota tim dalam mode hanya-baca. Fitur berbagi memerlukan paket berbayar yang memenuhi syarat dan izin penyimpanan data dari organisasi.

![Diagram konseptual: Cloud Agent mengubah pekerjaan coding menjadi canvas interaktif yang dapat dibuka anggota tim](/posts/cursor-cloud-agents-canvas-workflow.svg)

*Ilustrasi konseptual, bukan tangkapan layar produk Cursor.*

Cursor lebih dulu memperkenalkan canvas yang bisa dibagikan lewat [changelog Mei](https://cursor.com/changelog/shared-canvases). Pembaruan Oktober membawa format tersebut ke tugas yang dijalankan Cloud Agents.

## Lingkungan agent mulai bisa dikelola lewat API

Pembaruan ini juga membawa [Environments API ke tahap beta](https://cursor.com/changelog/cloud-agent-canvases-and-environments). Developer bisa memakai [API Cloud Agents](https://cursor.com/docs/cloud-agent/api/endpoints) untuk membuat dan mengelola lingkungan, repositori, serta konfigurasinya lewat kode. Dengan begitu, penyiapan ruang kerja agent dapat dimasukkan ke otomasi internal.

Menurut Cursor, satu lingkungan kini dapat memuat hingga 300 repositori dan lingkungan besar dimuat lima kali lebih cepat. Changelog tidak menyertakan tolok ukur atau konfigurasi pembanding untuk klaim kecepatan tersebut. API-nya masih beta, jadi uji dulu kestabilannya sebelum memasukkannya ke otomasi produksi.

## Perubahan kecil pada alur kerja agent

Canvas membantu tim meninjau hasil tugas dalam bentuk visual, sedangkan API memberi cara untuk menyiapkan lingkungan agent lewat kode. Tim yang mengelola banyak repositori bisa mengurangi langkah manual dengan pengaturan terprogram, lalu memakai canvas untuk memudahkan orang lain membaca laporan atau audit.

Tim tetap perlu mencocokkan isi canvas dengan kode dan data sumbernya. Seberapa berguna pembaruan ini akan bergantung pada kebutuhan tim, terutama apakah mereka sudah memakai Cloud Agents dan siap menguji API yang masih beta.
