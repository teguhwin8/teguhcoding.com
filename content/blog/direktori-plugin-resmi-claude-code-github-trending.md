---
title: "Direktori Plugin Claude Code Ramai di GitHub Trending"
source_url: "https://github.com/anthropics/claude-plugins-official"
tags: ["Claude Code", "AI", "Developer Tools"]
date: "2026-10-18T02:18:28.000Z"
cover_image: "/posts/claude-code-plugins-trending-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

Pada pagi 18 Oktober, [repositori plugin Claude Code milik Anthropic](https://github.com/anthropics/claude-plugins-official) berada di posisi pertama GitHub Trending harian. Saat diperiksa pukul 09.16 WIB, repo itu mendapat 4.467 bintang baru hari tersebut. Isinya beragam: plugin untuk menghubungkan layanan lain, menambahkan instruksi, dan mengatur pekerjaan coding. ([GitHub Trending harian](https://github.com/trending?since=daily).)

![Ilustrasi direktori plugin Claude Code yang menghubungkan kumpulan komponen pengembangan ke satu lingkungan kerja](/posts/claude-code-plugins-marketplace-flow.svg)

*Ilustrasi konseptual buatan Teguhcoding, bukan tangkapan layar Claude Code.*

## Satu katalog untuk beberapa jenis ekstensi

README membagi katalog ini menjadi plugin internal yang dibuat Anthropic dan plugin eksternal dari mitra atau komunitas. Satu plugin dapat menggabungkan skills, agents, hooks, server MCP, dan perintah slash. Isinya bisa berupa panduan untuk tugas tertentu, koneksi ke layanan lain, atau tindakan otomatis selama sesi Claude Code. ([README repositori](https://github.com/anthropics/claude-plugins-official#claude-code-plugins-directory), [dokumentasi plugin Claude Code](https://code.claude.com/docs/en/plugins).)

Pengguna bisa membuka `/plugin` di Claude Code, mencari plugin di tab Discover, lalu memasangnya dengan perintah seperti:

```text
/plugin install {nama-plugin}@claude-plugins-official
```

Direktori ini mengumpulkan tautan ke sumber plugin; komponen yang dipasang tetap datang dari repositori atau layanan masing-masing. Pengemasan dalam satu unit memudahkan developer memasang dan memperbarui alur kerja seperti review pull request, panduan framework, atau konektor layanan di beberapa proyek.

## Label resmi tidak menggantikan pemeriksaan kode

Label “resmi” pada repo tidak berarti Anthropic membuat atau mengaudit semua plugin yang tercantum. README membedakan plugin internal dan eksternal, serta mengingatkan bahwa isi MCP server, file, dan software dari plugin eksternal berada di luar kendali Anthropic. Plugin juga dapat menjalankan kode dengan hak akses akun yang memasangnya. ([Peringatan di README](https://github.com/anthropics/claude-plugins-official#claude-code-plugins-directory), [panduan keamanan dan kepercayaan plugin](https://code.claude.com/docs/en/plugins/security).)

Sebelum memasang, buka dokumentasi dan periksa berkas seperti `hooks/hooks.json`, `.mcp.json`, serta isi folder `bin/` bila ada. Hook dapat menjalankan perintah shell; konfigurasi MCP dapat memulai proses lokal atau menghubungkan Claude Code ke server lain. Periksa lebih teliti jika mesin kerja menyimpan repo privat atau kredensial.

## Mengapa repo ini ramai diperhatikan?

Posisi repo di GitHub Trending memperlihatkan besarnya minat terhadap ekosistem plugin Claude Code. Katalog ini memudahkan pencarian ekstensi, tetapi setiap tim tetap perlu memilih yang dibutuhkan dan memeriksa kode serta akses yang diminta sebelum memasangnya.
