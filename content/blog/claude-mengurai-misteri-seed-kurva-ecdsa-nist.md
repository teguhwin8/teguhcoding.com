---
title: "Claude Mengurai Misteri Seed Kurva ECDSA NIST"
source_url: "https://www.anthropic.com/research/ecdsa-curve-origins"
tags: ["AI", "Kriptografi", "Developer Tools"]
date: "2026-10-17T16:07:03.176Z"
cover_image: "/posts/claude-ecdsa-curve-seeds-cover.svg"
---

Selama puluhan tahun, asal-usul seed pada sejumlah kurva eliptik NIST belum jelas. Anthropic mengatakan model riset internal Claude menemukan petunjuk yang mengarah ke generator angka pseudorandom di pustaka C lama, dijalankan dengan timestamp Unix pada 1997–1998. Temuan ini memberi jawaban baru untuk teka-teki sejarah kriptografi; kunci pengguna dan ECDSA tidak dibobol.

## Angka publik yang lama tak punya cerita

Kurva seperti P-256 dipakai dalam banyak sistem kriptografi. Standar NIST memublikasikan seed yang digunakan untuk menghasilkan koefisien kurva itu, jadi nilainya bukan rahasia. Pertanyaan yang belum terjawab adalah bagaimana NSA memilih seed tersebut sebelum NIST memasukkannya ke [FIPS 186-2 pada 2000](https://csrc.nist.gov/pubs/fips/186-2/final). Dalam aturan ANSI X9.62, seed di-hash untuk menghasilkan salah satu koefisien kurva.

Karena proses pemilihannya tidak dijelaskan, sebagian kriptografer bertanya apakah kurva tersebut mungkin menyimpan kelemahan tersembunyi. Neal Koblitz dan Alfred Menezes membahas kontroversi itu dalam makalah 2015, [“A Riddle Wrapped in an Enigma”](https://eprint.iacr.org/2014/318). Filippo Valsorda, yang mengelola bounty untuk memecahkan teka-teki seed, mengatakan jawabannya kini ditemukan dan hadiah terkumpul akan disumbangkan kepada Internet Security Research Group, organisasi di balik Let’s Encrypt.

## Jejaknya mengarah ke generator C lawas

Dalam [penjelasannya](https://www.anthropic.com/research/ecdsa-curve-origins), Anthropic mengatakan seorang karyawan meminta model riset internal menyelidiki asal seed tanpa memberinya petunjuk tentang teori-teori lama. Dalam waktu kurang dari setengah jam, model menemukan pola yang cocok dengan `lrand48`, generator pseudorandom 48-bit yang tersedia di pustaka C era 1990-an. Generator itu dimulai dari timestamp Unix, lalu menghasilkan angka yang dipotong menjadi kandidat seed.

Untuk P-256, misalnya, timestamp 16 Agustus 1997 menghasilkan seed yang tercantum di standar pada urutan kandidat ke-1.842. Anthropic menyertakan kode untuk mengulang prosesnya. [Valsorda juga menulis ulang pencarian tersebut dalam Go](https://words.filippo.io/seeds-solved/) dan mendapat urutan seed yang sama. Ia menemukan beberapa kandidat valid yang dilewati proses lama, serta satu kriteria penyaringan yang alasannya belum diketahui.

![Diagram konseptual bagaimana timestamp Unix dapat memulai generator rand48 dan menghasilkan seed publik untuk parameter kurva](/posts/claude-ecdsa-seed-discovery.svg)

*Ilustrasi konseptual alur yang direkonstruksi; bukan visualisasi dari proses asli NSA.*

## Apa artinya bagi keamanan?

Penelusuran ini tidak membuka kunci privat. Seed tersebut memang sudah menjadi parameter publik, sedangkan keamanan tanda tangan ECDSA bergantung pada kunci privat dan persoalan matematika yang berbeda. Anthropic menyebut temuan ini bukan serangan kriptografi; pengguna kurva NIST tidak perlu mengubah konfigurasi.

Masih ada bagian yang belum terjawab. Anthropic mencatat beberapa kandidat kurva valid dilewati tanpa alasan yang diketahui. Valsorda menilai rentang timestamp dan kandidat yang tersedia terlalu sempit untuk salah satu teknik hipotetis yang pernah dikhawatirkan, tetapi ia juga menemukan kriteria penyaringan yang belum bisa dijelaskan. Temuan ini memberi petunjuk kuat tentang cara seed dihasilkan, bukan catatan lengkap setiap keputusan pada 1990-an.

## Mengapa ceritanya ramai dibicarakan?

Temuan ini masuk ke halaman depan [Hacker News](https://news.ycombinator.com/item?id=50122800), dengan lebih dari 900 poin dan 300 komentar saat diperiksa pada 17 Oktober. Pembahasannya menarik karena menyatukan pola bit, generator pseudorandom lama, dan urutan kandidat—lalu menghasilkan kode yang dapat diperiksa peneliti lain.

Model yang digunakan adalah model riset internal Anthropic; perusahaan tidak menyebutnya sebagai fitur Claude publik tertentu. Replikasi Valsorda dan kode yang dibagikan memberi peneliti lain cara untuk memeriksa hasilnya.

Untuk developer, tak ada perubahan yang perlu dilakukan pada implementasi ECDSA. Nilai temuan ini ada pada catatan sejarah yang lebih lengkap dan proses teknis yang dapat direproduksi.
