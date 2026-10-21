---
title: "Laporan Keamanan ke OpenSSL Naik Hampir 8 Kali Lipat, Tim Peninjau Kewalahan"
source_url: "https://www.axios.com/2026/10/20/ai-bug-reports-overwhelm-openssl-maintainers"
tags: ["AI", "Keamanan", "Open Source"]
date: "2026-10-21T01:47:15.000Z"
cover_image: "/posts/openssl-ai-security-reports-cover.jpg"
---

OpenSSL menerima rata-rata 71 laporan keamanan dan pertanyaan per bulan pada Mei–Juli 2026, hampir delapan kali angka pada periode yang sama tahun sebelumnya. Pada Agustus, jumlah pertanyaan mencapai 108. Direktur OpenSSL Foundation Matt Caswell menyampaikan angka itu kepada [Axios](https://www.axios.com/2026/10/20/ai-bug-reports-overwhelm-openssl-maintainers).

Axios tidak merinci berapa bagian dari kiriman tersebut yang dibuat dengan AI. Namun laporan itu menggambarkan dua hal yang terjadi bersamaan: AI membantu mencari masalah di kode, sementara banyak laporan yang masuk ternyata duplikat atau hanya membahas bug kecil. OpenSSL ikut mengamankan komunikasi di banyak layanan internet, dan tiap laporan tetap perlu ditinjau.

![Layar terminal konfigurasi jaringan sebagai ilustrasi pekerjaan teknis yang perlu diperiksa](/posts/openssl-ai-security-reports-cover.jpg)

*Foto ilustrasi, bukan layar atau sistem milik OpenSSL. Foto: [Cong Long Vu](https://unsplash.com/photos/computer-screen-displaying-network-configuration-RUyWmB5e-00), sesuai [Unsplash License](https://unsplash.com/license).*

## Laporan masuk lebih cepat

Grafik ini membandingkan rata-rata laporan dan pertanyaan per bulan pada Mei–Juli 2025 dengan periode yang sama tahun ini. Angka Agustus adalah jumlah pertanyaan dalam satu bulan, bukan rata-rata tiga bulan.

![Perbandingan laporan keamanan dan pertanyaan yang masuk ke OpenSSL: rata-rata bulanan pada Mei–Juli 2025 dan 2026, serta total pertanyaan pada Agustus 2026](/posts/openssl-security-report-volume.svg)

*Angka yang disampaikan Caswell kepada Axios. Nilai Agustus adalah total pertanyaan untuk satu bulan.*

Dalam setahun terakhir, OpenSSL menerima sekitar 500 laporan kerentanan; 63 di antaranya berujung pada pengungkapan kerentanan. Itu tidak berarti semua laporan lainnya palsu. Status sisanya tidak dirinci; sebagian bisa berupa laporan duplikat, bug kecil, atau masalah yang tak membutuhkan peringatan keamanan.

AI juga membantu peneliti menemukan masalah di bagian kode yang luput dari pemeriksaan sebelumnya. Caswell mengatakan mayoritas kerentanan yang ditemukan alat AI sejauh ini berlevel rendah. Karena itu, jumlah kiriman saja belum menunjukkan berapa banyak ancaman serius yang ditemukan atau seberapa berat dampaknya.

## Temuan tetap perlu diperiksa manusia

Menurut [laporan Axios](https://www.axios.com/2026/10/20/ai-bug-reports-overwhelm-openssl-maintainers), OpenSSL juga memakai AI untuk membantu meninjau kode, menyelidiki laporan, dan menulis pengujian. Hasilnya tetap membutuhkan persetujuan manusia. Menyelidiki kerentanan, menyiapkan perbaikan, lalu menerbitkan peringatan keamanan dapat memakan waktu enam sampai delapan minggu.

Jumlah peninjau bertambah, tetapi belum mengimbangi laju laporan. OpenSSL kini punya 30 insinyur yang berwenang menyetujui perubahan kode, naik dari 18 pada Juli 2024. Caswell mengatakan proyek itu menerima kontribusi lebih banyak daripada sebelumnya, tetapi kiriman baru masih datang lebih cepat.

Masalah ini sudah dibahas di GitHub pada Agustus. Mounir Idrassi menulis bahwa OpenSSL menerima 16 issue dalam 30 menit dan 15 issue sehari sebelumnya; menurutnya, laporan-laporan itu tampak dibuat dari pemindaian AI otomatis. Caswell membalas bahwa kiriman massal membebani tim dan ia mempertimbangkan batas jumlah laporan per pengirim. [Diskusi OpenSSL](https://github.com/openssl/openssl/discussions/32378) itu juga menekankan perlunya pelapor memeriksa dan memprioritaskan temuannya.

Bagi developer yang memakai pemindai berbantuan AI, laporan yang paling membantu adalah laporan yang bisa diuji: sebutkan versi terdampak, langkah untuk mengulang bug, dan bukti dampaknya. Kalau detail itu tidak ada, kerja mencari bug memang lebih cepat, tetapi beban memastikan hasilnya nyata jatuh ke peninjau.
