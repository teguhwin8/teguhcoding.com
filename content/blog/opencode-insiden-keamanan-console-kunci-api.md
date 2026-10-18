---
title: "OpenCode Akui Insiden Keamanan Console, 1,4% Pengguna Terdampak"
source_url: "https://x.com/opencode/status/2111516673953935833"
tags: ["AI", "Keamanan", "Developer Tools"]
date: "2026-10-18T01:20:00.000Z"
cover_image: "/posts/opencode-console-security-cover.svg"
---

OpenCode mengatakan insiden keamanan baru-baru ini berdampak pada 1,4% pengguna OpenCode Console. Perusahaan menyebut kelompok yang terdampak sebagai sebagian pengguna yang menghubungkan provider eksternal, dan mengatakan mereka telah diberi tahu melalui email. OpenCode menyebut insiden itu berkaitan dengan “serangan distilasi skala besar” dan mengatakan sedang bekerja bersama Anthropic, OpenAI, serta Google untuk menanganinya. Rincian teknis dan cara kunci digunakan belum dijelaskan secara publik dalam pernyataan tersebut. ([Pernyataan OpenCode di X](https://x.com/opencode/status/2111516673953935833), disalin dalam [diskusi komunitas OpenCode](https://www.reddit.com/r/opencodeCLI/comments/1x8gp72/opencode_security_breach_rotate_your_keys/).)

Angka 1,4% merujuk pada pengguna **Console**, layanan opsional OpenCode yang menyediakan workspace dan dapat meneruskan permintaan ke provider eksternal. Ini bukan pengumuman bahwa seluruh pengguna aplikasi atau CLI OpenCode terkena dampak. Dokumentasi membedakan penggunaan Console dari koneksi provider langsung di lingkungan pengguna. Karena itu, konteks tempat kunci disimpan menjadi penting saat menilai risiko. ([Dokumentasi Console](https://dev.opencode.ai/v2/docs/console/), [panduan provider](https://dev.opencode.ai/v2/docs/console/providers/).)

![Ilustrasi konseptual workspace Console dengan kunci provider eksternal dan langkah pencabutan akses](/posts/opencode-console-key-rotation.svg)

*Ilustrasi konseptual buatan Teguhcoding; bukan diagram internal OpenCode atau gambaran forensik insiden.*

## Apa yang diketahui sejauh ini?

Dalam pernyataan publiknya pada 17 Oktober, OpenCode menyebut kebocoran keamanan dan mengatakan 1,4% pengguna Console terdampak. Mereka menyatakan pengguna terdampak telah dihubungi lewat email, insiden masih ditangani, dan perusahaan berkoordinasi dengan Anthropic, OpenAI, serta Google. Istilah “serangan distilasi” berasal dari OpenCode; perusahaan belum menjelaskan siapa pelakunya, sistem apa yang diakses, maupun bukti bahwa kunci tertentu digunakan untuk mengambil keluaran model.

Salinan pemberitahuan pelanggan yang dibagikan di Reddit menyebut ada akses tidak sah ke sistem lama yang sedang dihentikan. Email itu memperingatkan bahwa kunci provider pihak ketiga yang disimpan di workspace mungkin terekspos, lalu meminta penerima mencabut dan menggantinya melalui dashboard provider, memperbarui aplikasi yang memakai kunci tersebut, dan memeriksa penggunaan terbaru. Ini adalah isi pemberitahuan yang dibagikan seorang pengguna, bukan laporan forensik lengkap. ([Salinan pemberitahuan di Reddit](https://www.reddit.com/r/opencode/comments/1x8bas3/they_fd_up_breach/), [ulasan independen CellCog](https://cellcog.ai/blog/opencode-breach-api-keys/).)

## Bedakan Console dari kunci lokal

OpenCode menyediakan beberapa cara menghubungkan model. Console dapat menyimpan kredensial provider di workspace dan bertindak sebagai gateway. Sebaliknya, pengguna juga dapat menghubungkan provider langsung dari klien atau lingkungan yang mereka kelola sendiri. Pengumuman OpenCode secara khusus menyebut pengguna Console dengan provider eksternal yang tertaut; jadi, jangan menyimpulkan bahwa semua konfigurasi lokal otomatis bocor hanya karena memakai OpenCode.

Namun, nama “kunci lokal” saja belum cukup untuk memastikan posisi kredensial. Pengguna yang tidak yakin pernah menyimpan kunci ke workspace Console sebaiknya memeriksa email dari OpenCode dan halaman kredensial pada provider terkait. Diskusi di [Hacker News](https://news.ycombinator.com/item?id=50133401) dan Reddit memperlihatkan kebingungan tentang perbedaan jalur login, kunci API, dan Console. Komentar komunitas membantu memahami kebingungan itu, tetapi bukan konfirmasi teknis tentang akun tertentu.

## Apa yang sebaiknya dilakukan pengguna?

Jika menerima pemberitahuan OpenCode atau pernah menyimpan kunci provider eksternal di Console, ikuti arahan emailnya: cabut kunci lama dari dashboard provider, buat pengganti, lalu perbarui aplikasi atau secret store yang menggunakannya. Periksa catatan pemakaian dan tagihan untuk aktivitas yang tidak dikenal. Pencabutan perlu dilakukan di provider asal; menghapus kredensial dari workspace saja tidak membatalkan salinan yang mungkin sudah terekspos.

Sejumlah pengguna juga melaporkan di Reddit bahwa mereka melihat kunci kedaluwarsa, akses terputus, atau pemakaian provider yang tak mereka kenali. Itu merupakan laporan individual dan belum memberi ukuran dampak keseluruhan. Bila muncul biaya yang mencurigakan, simpan catatan waktu dan pemakaian lalu hubungi dukungan provider serta OpenCode. ([Laporan pengguna tentang pemakaian tak dikenal](https://www.reddit.com/r/ClaudeAI/comments/1x8o35r/psa_opencode_breach_my_stored_anthropic_key_was/), [laporan kunci kedaluwarsa](https://www.reddit.com/r/opencode/comments/1x8p3rj/api_key_has_expired_opencode_desktop/).)

## Banyak detail masih belum terbuka

OpenCode belum memublikasikan postmortem yang menjelaskan celah masuk, rentang waktu paparan, jumlah kunci, penggunaan aktual, atau nilai biaya yang timbul. Angka 1,4% pun belum dapat diterjemahkan menjadi jumlah akun tanpa mengetahui jumlah total pengguna Console. Sampai ada pembaruan teknis, pembaca perlu membedakan fakta yang diumumkan perusahaan dari dugaan yang beredar di media sosial.

Insiden ini menjadi pengingat bagi tim developer yang menghubungkan layanan AI ke tool pihak ketiga: inventarisasi tempat kunci disimpan, gunakan kredensial terpisah dengan batas biaya, dan cabut kunci ketika tidak lagi diperlukan. Untuk kasus OpenCode ini, langkah paling relevan adalah mengikuti pemberitahuan resmi dan memeriksa kunci yang pernah ditautkan ke Console.
