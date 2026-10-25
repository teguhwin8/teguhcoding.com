---
title: "PHP2Shell Sudah Dicoba Sebelum Diungkap, AWS Minta Audit Mulai 17 Oktober"
source_url: "https://www.tenable.com/blog/php2shell-cve-2026-109618-cve-2026-109619-frequently-asked-questions-about-critical-php-remote"
tags: ["PHP", "Keamanan Siber", "Developer"]
date: "2026-10-23T10:53:19.000Z"
cover_image: "/posts/php2shell-server-rack.jpg"
updated: "2026-10-23T10:54:30.000Z"
---

**Pembaruan 23 Oktober 2026:** Amazon Threat Intelligence menemukan upaya eksploitasi PHP2Shell di jaringan honeypot MadPot pada 17 Oktober, empat hari sebelum dua celah PHP ini diumumkan. AWS menyarankan tim keamanan memeriksa aktivitas sejak tanggal itu. Temuan di honeypot bukan bukti bahwa situs produksi sudah berhasil ditembus, tetapi jadi alasan untuk tidak membatasi pemeriksaan pada log setelah patch dirilis.

![Deretan rak server sebagai ilustrasi infrastruktur web yang menjalankan PHP](/posts/php2shell-server-rack.jpg)

*Foto ilustrasi, bukan server yang terdampak. Foto oleh [Brett Sayles di Pexels](https://www.pexels.com/photo/server-racks-on-data-center-5480781/), digunakan sesuai [lisensi Pexels](https://www.pexels.com/license/).*

## Apa yang ditemukan AWS?

AWS mencatat percobaan pada 17 Oktober yang menyasar honeypot, lalu melihat upaya lain pada 21 Oktober. Perusahaan itu belum bisa memastikan apakah percobaan pada tanggal 21 akan berhasil menyerang server sungguhan. AWS juga melaporkan upaya eksploitasi makin luas setelah detail teknis dan kode contoh beredar.

Ada perbedaan waktu dan cakupan pengamatan yang perlu diperhatikan: [CISA menulis dalam alert 21 Oktober](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching) bahwa mereka belum mengamati eksploitasi saat alert diterbitkan. Sementara itu, AWS melaporkan aktivitas di sensor honeypot miliknya, termasuk yang terjadi sebelum pengungkapan publik. Kedua laporan itu tidak membuktikan bahwa server tertentu sudah berhasil diambil alih.

Meski begitu, administrator sebaiknya memeriksa log web mulai 17 Oktober. AWS menyarankan untuk mencari permintaan POST yang memuat `PHP_SESSION_UPLOAD_PROGRESS`, proses PHP yang tiba-tiba menjalankan shell atau mengunduh alat, serta perubahan file yang tidak dikenal. Alamat IP yang dicantumkan peneliti bukan indikator pasti: beberapa berasal dari infrastruktur anonimisasi bersama, jadi jangan langsung memblokir atau menyimpulkan insiden hanya dari kecocokan IP.

## Dua celah ada di runtime PHP

CVE-2026-109618 dan CVE-2026-109619 adalah bug di inti PHP, bukan di WordPress, Laravel, atau plugin tertentu. Keduanya mendapat skor CVSS 4.0 sebesar 9,2. Celah pertama berkaitan dengan kondisi kehabisan memori yang membuat data internal belum selesai disiapkan. Celah kedua dapat membuat worker PHP memakai kembali rujukan memori yang sudah dilepas.

[PHP menyatakan](https://www.php.net/archive/2026.php#2026-10-21-5) instalasi yang melayani permintaan web berisiko, termasuk PHP-FPM, Apache `mod_php`, `php-cgi`, FrankenPHP, dan LiteSpeed. Risiko tertinggi yang ditunjukkan sejauh ini ada pada `mod_php`, tetapi pengguna PHP-FPM tetap perlu memasang pembaruan. Memperbarui CMS atau plugin saja tidak memperbaiki runtime PHP di server.

![Versi PHP yang sudah memperbaiki dua celah PHP2Shell](/posts/php2shell-patch-versions.svg)

*Daftar versi perbaikan berdasarkan [advisori resmi PHP](https://www.php.net/archive/2026.php#2026-10-21-5).*

Versi yang menutup celah:

| Cabang PHP | Versi perbaikan |
| --- | --- |
| 8.5 | 8.5.12 |
| 8.4 | 8.4.27 |
| 8.3 | 8.3.36 |
| 8.2 | 8.2.35 |

Untuk PHP 7.4, 8.0, dan 8.1, tim PHP menyediakan backport kode minimal bagi yang membangun PHP sendiri atau tidak mendapatkannya dari vendor. Cabang-cabang itu sudah tidak menerima rilis keamanan rutin dari proyek PHP. Jika PHP berasal dari paket Linux atau layanan hosting, cek advisori vendor dan pastikan paketnya memang membawa patch; nomor versi vendor bisa berbeda dari rilis upstream. PHP 8.2 juga dijadwalkan berakhir masa dukungannya pada 31 Desember 2026.

## Yang perlu dilakukan sekarang

Pasang versi yang sudah diperbaiki atau paket vendor yang memuat patch, lalu mulai ulang seluruh worker PHP agar proses baru memakai kode yang diperbarui. Pastikan runtime yang melayani situs benar-benar berubah—versi PHP untuk CLI bisa berbeda dari PHP-FPM yang menerima trafik. Jika menggunakan hosting terkelola, tanyakan versi PHP aktif dan status patch kepada penyedia.

Kalau pembaruan belum bisa dipasang, [CISA menyarankan](https://www.cisa.gov/news-events/alerts/2026/10/21/critical-vulnerabilities-php-require-immediate-patching) agar organisasi mempertimbangkan menonaktifkan sistem berbasis PHP sampai bisa diperbarui, terutama jika masih memakai PHP 8.1 atau versi lebih lama yang tidak didukung. WAF dapat membantu menyaring sebagian permintaan; [Cloudflare mengatakan](https://blog.cloudflare.com/php-vulnerabilities-waf-protection/) aturan untuk pelanggan WAF-nya tersedia termasuk di paket gratis. Namun, penyedia PHP maupun Cloudflare menegaskan bahwa proteksi sementara tidak menggantikan patch runtime.

Kode yang mengaku sebagai proof of concept juga beredar. [Tenable belum memverifikasi apakah kode-kode itu benar-benar bekerja untuk dua CVE ini](https://www.tenable.com/blog/php2shell-cve-2026-109618-cve-2026-109619-frequently-asked-questions-about-critical-php-remote); unduhan yang tidak jelas dapat berisi malware. Untuk admin, urutannya sederhana: cek versi dan patch, mulai audit log dari 17 Oktober, lalu selidiki proses atau perubahan file yang tidak semestinya.
