---
title: "Claude Mengurai Misteri Seed Kurva ECDSA NIST"
source_url: "https://www.anthropic.com/research/ecdsa-curve-origins"
tags: ["AI", "Kriptografi", "Developer Tools"]
date: "2026-10-17T16:07:03.176Z"
cover_image: "/posts/claude-ecdsa-curve-seeds-cover.svg"
---

Anthropic mengatakan model riset internal Claude berhasil menelusuri asal-usul seed pada sejumlah kurva eliptik NIST yang selama puluhan tahun tidak dijelaskan. Jejaknya mengarah ke generator angka pseudorandom dari pustaka C lama yang dijalankan dengan timestamp Unix pada 1997–1998. Temuan ini membantu menjawab pertanyaan sejarah kriptografi, tetapi bukan berarti ECDSA berhasil dibobol atau kunci pengguna bocor.

## Angka publik yang lama tak punya cerita

Kurva seperti P-256 dipakai sebagai dasar beberapa implementasi kriptografi. Saat parameter kurva NIST dipublikasikan, seed yang dipakai untuk menghasilkan koefisien kurva juga disertakan. Seed itu bukan kata sandi atau kunci rahasia; nilainya sudah terbuka sejak standar dirilis. Yang tidak dijelaskan adalah bagaimana NSA memilih seed tersebut sebelum NIST memasukkannya ke [FIPS 186-2 pada 2000](https://csrc.nist.gov/pubs/fips/186-2/final). Dalam aturan ANSI X9.62 yang dipakai standar itu, nilai seed di-hash untuk menurunkan salah satu koefisien kurva.

Ketiadaan penjelasan memicu pertanyaan apakah pilihan kurva bisa saja dibuat dengan proses yang menyisakan kelemahan tersembunyi. Pada 2015, kriptografer Neal Koblitz dan Alfred Menezes membahas kontroversi itu dalam makalah [“A Riddle Wrapped in an Enigma”](https://eprint.iacr.org/2014/318). Pengelola bounty untuk asal-usul seed, Filippo Valsorda, mencatat bahwa jawaban atas teka-teki ini akhirnya ditemukan dan hadiah yang terkumpul akan disumbangkan ke Internet Security Research Group, organisasi di balik Let’s Encrypt.

## Jejaknya mengarah ke generator C lawas

Menurut [penjelasan Anthropic](https://www.anthropic.com/research/ecdsa-curve-origins), seorang karyawan meminta model riset internal menyelidiki asal seed tanpa memberi petunjuk teori lama tentang frasa rahasia. Dalam kurang dari setengah jam, model itu menemukan pola yang cocok dengan `lrand48`, generator pseudorandom dengan keadaan internal 48-bit yang tersedia di pustaka C era 1990-an. Generator tersebut dimulai dari timestamp Unix, lalu mengeluarkan angka-angka yang dipotong menjadi kandidat seed.

Salah satu kecocokan yang bisa diperiksa adalah P-256: timestamp 16 Agustus 1997 menghasilkan seed yang tercantum di standar pada kandidat ke-1.842. Anthropic menyertakan kode reproduksi di artikelnya. Secara terpisah, [Filippo Valsorda—pengelola bounty tersebut—menulis ulang prosesnya dalam Go](https://words.filippo.io/seeds-solved/) dan memperoleh urutan seed yang sama. Ia juga membahas kandidat valid yang dilewati oleh proses lama, serta satu kriteria penyaringan tambahan yang belum bisa dipastikan.

![Diagram konseptual bagaimana timestamp Unix dapat memulai generator rand48 dan menghasilkan seed publik untuk parameter kurva](/posts/claude-ecdsa-seed-discovery.svg)

*Ilustrasi konseptual alur yang direkonstruksi; bukan visualisasi dari proses asli NSA.*

## Apa artinya bagi keamanan?

Penemuan asal seed tidak membuka kunci privat. Seed tersebut memang parameter publik, sementara keamanan tanda tangan ECDSA bergantung pada kunci privat dan masalah matematika yang berbeda. Anthropic secara eksplisit menyatakan temuan ini bukan serangan kriptografi dan pengguna kurva NIST tidak perlu mengubah apa pun.

Rekonstruksi proses pembuatan seed juga belum menjawab setiap detail pemilihan parameter. Tim Anthropic mencatat ada beberapa kandidat kurva valid yang dilewati dan belum bisa menerangkan alasan lengkapnya. Analisis Valsorda menyimpulkan bahwa ruang pilihan timestamp dan kandidat yang tersedia terlalu sempit untuk salah satu teknik hipotetis yang pernah dikhawatirkan, meski ia juga mengakui masih ada kriteria yang belum terjelaskan. Jadi, temuan ini memperkuat penjelasan bahwa seed dibuat secara biasa; ia tidak mengungkap semua keputusan yang terjadi pada 1990-an.

## Mengapa ceritanya ramai dibicarakan?

Diskusi tentang temuan ini masuk ke halaman depan [Hacker News](https://news.ycombinator.com/item?id=50122800), dengan lebih dari 900 poin dan 300 komentar saat diperiksa pada 17 Oktober. Daya tariknya bukan hanya karena sebuah pertanyaan kriptografi lama mendapat jawaban, tetapi juga karena model mampu merangkai jejak dari pola bit, generator pseudorandom lawas, dan kandidat yang berulang—lalu menghasilkan kode yang bisa diverifikasi peneliti lain.

Tetap penting membedakan klaim kemampuan model dari pemeriksaan hasilnya. Anthropic mengungkap bahwa model tersebut adalah model riset internal, bukan menyebutnya sebagai fitur Claude publik tertentu. Replikasi Valsorda memberi pemeriksaan tambahan atas angka dan urutan generator, sementara kode yang dibagikan memungkinkan orang lain menguji hasilnya.

Bagi developer, kesimpulan praktisnya sederhana: tidak perlu mengganti implementasi ECDSA hanya karena berita ini. Nilai utamanya adalah dokumentasi sejarah yang lebih lengkap dan contoh bagaimana AI dapat membantu menelusuri masalah teknis lama—dengan hasil yang tetap perlu direproduksi dan ditinjau manusia.
