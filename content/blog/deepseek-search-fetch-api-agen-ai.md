---
title: "DeepSeek Buka API Search dan Fetch untuk Agen AI"
source_url: "https://api-docs.deepseek.com/updates/"
tags: ["AI", "Developer Tools", "API"]
date: "2026-10-19T00:20:41.000Z"
cover_image: "/posts/deepseek-search-fetch-api-cover.svg"
---

DeepSeek membuka dua endpoint API untuk memberi agen AI akses ke web: Search menemukan halaman dari kueri, sedangkan Fetch mengambil satu URL dan mengembalikan isinya dalam Markdown. Pengumuman mesin pencari buatannya tercatat di [changelog DeepSeek pada 17 Oktober](https://api-docs.deepseek.com/updates/). Tarif tiap endpoint US$0,75 per 1.000 permintaan sukses. Panggilan tool sisi server melalui DeepSeek Harness, Claude Code, atau Codex masih gratis sampai 1 November, menurut [halaman harga DeepSeek](https://api-docs.deepseek.com/quick_start/pricing/).

![Ilustrasi alur Search dan Fetch API DeepSeek untuk agen AI: mencari halaman web lalu mengambil kontennya sebagai Markdown](/posts/deepseek-search-fetch-api-cover.svg)

*Ilustrasi editorial Teguhcoding; bukan tangkapan layar antarmuka DeepSeek.*

## Satu endpoint mencari, satu lagi membaca halaman

Search mengirim daftar hasil terstruktur—seperti judul, URL, cuplikan, dan ringkasan. Kuerinya bisa dibatasi dengan operator seperti `site:`, `lang:`, `after:`, dan `before:`. Kalau agent perlu isi halaman juga, parameter `need_content` dapat memintanya langsung dari Search.

Fetch dipakai saat agent sudah punya URL tertentu. Endpoint ini mengambil halaman itu lalu mengembalikan teks dalam format Markdown, yang lebih mudah diteruskan ke model dibanding HTML mentah. DeepSeek mencatat bahwa hasil Fetch tetap bergantung pada ketersediaan dan kebijakan akses situs tujuan; jadi, jangan anggap semua halaman bisa dibaca.

![Alur dua endpoint: Search menemukan URL, Fetch mengubah halaman terpilih menjadi Markdown untuk dibaca agen](/posts/deepseek-search-fetch-api-flow.svg)

*Alur disederhanakan dari [panduan resmi Search & Fetch](https://api-docs.deepseek.com/guides/search/). Search juga bisa diminta mengembalikan konten tanpa panggilan Fetch terpisah.*

Keduanya merupakan API JSON dengan autentikasi bearer dan API key DeepSeek. Alamatnya berada di `api.deepseek.com/v1/tools/search` dan `api.deepseek.com/v1/tools/fetch`, jadi developer dapat menghubungkannya ke agent atau aplikasi RAG tanpa menambahkan format autentikasi baru.

## Tarifnya per permintaan yang sukses

DeepSeek mengenakan US$0,75 untuk setiap 1.000 permintaan Search yang berhasil, dan tarif yang sama untuk setiap 1.000 permintaan Fetch. Biaya dihitung per panggilan, bukan berdasarkan jumlah hasil yang dikembalikan. Panggilan baru masuk tagihan jika server memberi respons HTTP 200 dan hasilnya berisi sesuatu: daftar hasil yang tidak kosong untuk Search atau konten halaman untuk Fetch. Kegagalan, hasil kosong, dan timeout tidak ditagih.

Artinya, 10.000 pencarian sukses ditambah 10.000 pengambilan halaman sukses berbiaya US$15, di luar biaya pemakaian model. Dokumentasi juga membatasi Search dan Fetch masing-masing hingga lima permintaan per detik per akun; Fetch punya batas tambahan untuk setiap domain.

Ada masa gratis untuk panggilan tool sisi server melalui DeepSeek Harness, Claude Code, dan Codex. DeepSeek menjadwalkan penagihan mulai pukul 00.00 waktu Beijing pada 1 November 2026. Ketentuan itu merujuk pada penggunaan melalui integrasi tersebut; endpoint API langsung tetap memiliki tarif yang tercantum di [halaman harga](https://api-docs.deepseek.com/quick_start/pricing/).

## Ramai di Hacker News, tetapi kualitasnya tetap perlu diuji

Tautan pengumuman DeepSeek sempat berada di posisi teratas Hacker News dan mendapat lebih dari 500 poin serta 250 komentar saat diperiksa. Diskusinya menyinggung pilihan antara layanan pencarian terkelola dan opsi self-hosted, juga soal latensi serta konsistensi mengambil halaman. Antusiasme komunitas menunjukkan topik ini menarik perhatian developer; itu belum membuktikan kualitas hasilnya.

Dokumentasi DeepSeek menjelaskan endpoint, format hasil, biaya, dan batas laju, tetapi tidak menyertakan angka latensi atau perbandingan kualitas pencarian dengan layanan lain. Tim yang mempertimbangkan migrasi sebaiknya menguji kueri dan situs yang benar-benar dipakai agent mereka—termasuk halaman yang dilindungi bot atau punya struktur rumit. Kueri yang dikirim juga tetap sampai ke penyedia API, jadi hindari memasukkan informasi sensitif yang tidak perlu.

Yang berubah di sini bukan model DeepSeek, melainkan perangkat di sekelilingnya: developer kini bisa meminta DeepSeek mencari web dan mengambil halaman lewat API yang sama-sama memakai kredensial DeepSeek. Itu bisa merapikan satu bagian infrastruktur agent, selama hasil, batas domain, dan biaya panggilan cocok dengan kebutuhan aplikasinya.
