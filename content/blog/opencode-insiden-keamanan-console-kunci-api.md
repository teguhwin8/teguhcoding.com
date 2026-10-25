---
title: "OpenCode: Insiden Keamanan Console Menyentuh 1,4% Pengguna"
source_url: "https://x.com/opencode/status/2111516673953935833"
tags: ["AI", "Keamanan", "Developer Tools"]
date: "2026-10-18T01:20:00.000Z"
cover_image: "/posts/opencode-console-security-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

OpenCode menyatakan insiden keamanan di Console berdampak pada 1,4% penggunanya. Menurut perusahaan, yang terdampak adalah sebagian pengguna yang menautkan provider eksternal; mereka sudah diberi tahu lewat email. OpenCode menyebut insiden itu terkait “serangan distilasi skala besar” dan mengatakan sedang menanganinya bersama Anthropic, OpenAI, serta Google. Pernyataan publiknya belum merinci bagaimana kunci API terlibat. ([Pernyataan OpenCode di X](https://x.com/opencode/status/2111516673953935833), disalin dalam [diskusi komunitas OpenCode](https://www.reddit.com/r/opencodeCLI/comments/1x8gp72/opencode_security_breach_rotate_your_keys/).)

Angka 1,4% itu khusus untuk pengguna **Console**, layanan opsional OpenCode yang menyediakan workspace dan meneruskan permintaan ke provider eksternal. Pengumuman tersebut tidak menyebut semua pengguna aplikasi atau CLI OpenCode terdampak. Console juga berbeda dari koneksi provider yang disiapkan langsung di lingkungan pengguna. ([Dokumentasi Console](https://dev.opencode.ai/v2/docs/console/), [panduan provider](https://dev.opencode.ai/v2/docs/console/providers/).)

![Ilustrasi konseptual workspace Console dengan kunci provider eksternal dan langkah pencabutan akses](/posts/opencode-console-key-rotation.svg)

*Ilustrasi konseptual buatan Teguhcoding; bukan diagram internal OpenCode atau gambaran forensik insiden.*

## Apa yang diketahui sejauh ini?

Dalam pernyataan 17 Oktober itu, OpenCode belum menyebut pelaku, sistem yang diakses, atau bukti bahwa kunci tertentu dipakai untuk mengambil keluaran model. Istilah “serangan distilasi” juga berasal dari perusahaan tersebut.

Salinan email yang dibagikan seorang pengguna di Reddit menyebut akses tak sah ke sistem lama yang sedang dihentikan. Email itu memperingatkan bahwa kunci provider eksternal di workspace mungkin terekspos. Penerima diminta mencabut kunci lewat dashboard provider, membuat pengganti, memperbarui aplikasi yang memakainya, dan memeriksa aktivitas terbaru. ([Salinan pemberitahuan di Reddit](https://www.reddit.com/r/opencode/comments/1x8bas3/they_fd_up_breach/), [ulasan independen CellCog](https://cellcog.ai/blog/opencode-breach-api-keys/).)

## Bedakan Console dari kunci lokal

OpenCode menyediakan beberapa cara untuk menghubungkan model. Console menyimpan kredensial provider di workspace dan bertindak sebagai gateway; pengguna juga bisa mengatur koneksi provider langsung di klien atau lingkungan sendiri. Karena pemberitahuan menyasar pengguna Console dengan provider eksternal tertaut, pengguna perlu memeriksa jalur mana yang mereka pakai.

Jika tidak yakin pernah menyimpan kunci di Console, cari email dari OpenCode dan periksa halaman kredensial di provider yang digunakan. Diskusi di [Hacker News](https://news.ycombinator.com/item?id=50133401) dan Reddit menunjukkan masih ada kebingungan soal perbedaan login, kunci API, dan Console.

## Apa yang sebaiknya dilakukan pengguna?

Jika menerima email OpenCode atau pernah menyimpan kunci provider di Console, cabut kunci lama langsung dari dashboard provider dan buat yang baru. Setelah itu, perbarui aplikasi atau secret store yang memakainya dan periksa catatan penggunaan serta tagihan. Menghapus kunci dari workspace saja tidak membatalkan kredensial di provider.

Beberapa pengguna Reddit melaporkan akses terputus, kunci kedaluwarsa, atau pemakaian provider yang tidak mereka kenali. Laporan itu bersifat individual dan belum menunjukkan besarnya dampak secara keseluruhan. Jika melihat biaya mencurigakan, simpan catatan pemakaian lalu hubungi provider dan OpenCode. ([Laporan pengguna tentang pemakaian tak dikenal](https://www.reddit.com/r/ClaudeAI/comments/1x8o35r/psa_opencode_breach_my_stored_anthropic_key_was/), [laporan kunci kedaluwarsa](https://www.reddit.com/r/opencode/comments/1x8p3rj/api_key_has_expired_opencode_desktop/).)

## Banyak detail masih belum terbuka

OpenCode belum menerbitkan postmortem yang menjelaskan jalur akses, lama paparan, jumlah kunci, atau pemakaian yang terjadi. Persentase 1,4% juga belum bisa diterjemahkan ke jumlah akun tanpa angka total pengguna Console. Untuk pengguna, langkah sekarang adalah mengikuti email resmi dan memeriksa kunci yang pernah ditautkan ke Console.
