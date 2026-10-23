---
title: "Dua Celah Kritis PHP Bisa Jalankan Kode di Server, Patch Darurat Sudah Rilis"
source_url: "https://www.php.net/archive/2026.php#2026-10-21-5"
tags: ["PHP", "Keamanan Siber", "AI"]
date: "2026-10-23T04:32:17.000Z"
cover_image: "/posts/php2shell-server-rack.jpg"
---

PHP merilis empat pembaruan keamanan pada 21 Oktober untuk menutup dua celah yang bisa membuat penyerang tanpa akun menjalankan kode di server. PHP menyebut semua instalasi yang melayani permintaan web perlu diperiksa; bukti serangan paling kuat sejauh ini ada pada Apache `mod_php`. Versi perbaikannya: PHP 8.5.12, 8.4.27, 8.3.36, dan 8.2.35.

![Deretan rak server sebagai ilustrasi infrastruktur web yang menjalankan PHP](/posts/php2shell-server-rack.jpg)

*Foto ilustrasi, bukan server yang terdampak. Foto oleh [Brett Sayles di Pexels](https://www.pexels.com/photo/server-racks-on-data-center-5480781/), digunakan sesuai [lisensi Pexels](https://www.pexels.com/license/).*

## Masalahnya ada di mesin PHP

Kedua bug berada di inti PHP, bukan di plugin WordPress atau satu aplikasi tertentu. Keduanya memanfaatkan kondisi saat PHP menangani kesalahan dan memori. Salah satunya bisa meninggalkan data internal dalam keadaan setengah terbentuk setelah proses kehabisan memori; yang lain membuat worker memakai kembali data dari request sebelumnya yang semestinya sudah dilepas. Keduanya terdaftar sebagai [CVE-2026-109618](https://github.com/php/php-src/security/advisories/GHSA-w8hw-w9fx-j79w) dan [CVE-2026-109619](https://github.com/php/php-src/security/advisories/GHSA-6wmf-4rv5-p3rp), dengan skor CVSS 9,2 dari 10.

Peneliti menunjukkan eksekusi kode tanpa autentikasi pada beberapa konfigurasi. PHP menyebut risiko tertinggi ada pada Apache `mod_php`, dengan serangan yang bisa berjalan sebelum kode aplikasi mulai diproses. Eksekusi kode juga dikonfirmasi melalui jalur aplikasi di PHP-FPM, jadi pengguna FPM tetap perlu memasang pembaruan. Jalur serangannya bergantung pada konfigurasi dan jenis server; tidak berarti semua situs PHP bisa diambil alih dengan cara yang sama.

![Diagram dua celah PHP2Shell dan versi PHP yang sudah memuat perbaikan](/posts/php2shell-patch-versions.svg)

*Versi perbaikan berdasarkan [advisori PHP](https://www.php.net/archive/2026.php#2026-10-21-5).*

## Cek versi runtime, bukan hanya CMS

| Cabang PHP | Versi perbaikan |
| --- | --- |
| 8.5 | 8.5.12 |
| 8.4 | 8.4.27 |
| 8.3 | 8.3.36 |
| 8.2 | 8.2.35 |

Gunakan versi tersebut atau pembaruan yang lebih baru di cabang yang sama. Jika PHP dipasang lewat distro Linux atau paket dari penyedia hosting, cek apakah mereka sudah menerbitkan paket yang memuat patch. PHP 8.1 dan versi lebih lama tak lagi menerima pembaruan upstream rutin, tetapi sebagian vendor menyediakan backport. Untuk versi lama, minta konfirmasi ke penyedia sebelum menganggapnya sudah aman.

PHP menyebut pembaruan adalah satu-satunya perbaikan lengkap. Pengaturan sementara bisa mengurangi jalur serangan tertentu, tetapi tidak menghilangkan seluruh risikonya. Setelah memasang paket, pastikan layanan PHP yang menerima trafik benar-benar memuat versi baru. Pembaruan CMS saja tidak otomatis memperbarui runtime; untuk hosting terkelola, tanyakan versi PHP yang aktif kepada penyedia.

## AI membantu mengurai bug lama

Bug memori yang pertama sudah menunjukkan gejala saat audit PHP pada 2024, tetapi tim belum memiliki jalur eksploit yang konkret. Menurut [PHP Foundation](https://thephp.foundation/blog/2026/10/21/todays-php-security-release-and-how-were-strengthening-php-security/), perbaikannya sempat tertunda karena sejumlah pilihan teknis punya konsekuensi pada kompatibilitas dan ekstensi yang sudah ada.

AI ikut membantu peneliti membuktikan bahwa bug tersebut bisa dieksploitasi. [OpenAI menyebut](https://openai.com/index/coordinated-disclosure-of-critical-vulnerabilities/) firma Calif memakai GPT-5.6 Sol untuk mengidentifikasi satu celah, sementara [Wiz menjelaskan](https://www.wiz.io/blog/php2shell-php-rce) bahwa timnya juga memakai model AI dalam riset dan pengujian. Liputan [Associated Press](https://apnews.com/article/php-vulnerabilities-security-threat-38d37c4c18bf8355b02d85b5a73ed642) menekankan bahwa peneliti manusia lebih dulu menemukan masalahnya; agen AI membantu menelusuri cara mengeksploitasi dan menguji perbaikannya. Tim PHP tetap memimpin peninjauan kode serta penerbitan patch.

Diskusi di [komunitas PHP di Reddit](https://www.reddit.com/r/PHP/comments/1xbno6r/php_8512_8427_8336_and_8235_fix_two_critical/) ikut ramai, terutama soal kapan paket Debian dan Ubuntu menerima perbaikan serta apa yang harus dilakukan oleh pengguna versi lama. Untuk administrator, langkah pertama tetap sama: identifikasi runtime yang melayani situs, pasang versi yang sudah ditambal dari sumber paket tepercaya, lalu pastikan layanan memuat pembaruan tersebut.
