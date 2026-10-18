---
title: "Direktori Plugin Resmi Claude Code Puncaki GitHub Trending"
source_url: "https://github.com/anthropics/claude-plugins-official"
tags: ["Claude Code", "AI", "Developer Tools"]
date: "2026-10-18T02:18:28.000Z"
cover_image: "/posts/claude-code-plugins-trending-cover.svg"
---

Repositori [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) menempati urutan pertama GitHub Trending harian saat diperiksa sekitar pukul 09.16 WIB pada 18 Oktober, dengan 4.467 bintang baru tercatat hari itu. Repo yang dikelola Anthropic tersebut mengumpulkan plugin untuk Claude Code, dari integrasi layanan eksternal hingga komponen yang membantu mengatur pekerjaan coding. Angka trending adalah cuplikan perhatian komunitas pada saat pemeriksaan, bukan ukuran mutu atau keamanan setiap plugin. ([GitHub Trending harian](https://github.com/trending?since=daily).)

![Ilustrasi direktori plugin Claude Code yang menghubungkan kumpulan komponen pengembangan ke satu lingkungan kerja](/posts/claude-code-plugins-marketplace-flow.svg)

*Ilustrasi konseptual buatan Teguhcoding, bukan tangkapan layar Claude Code.*

## Satu katalog untuk beberapa jenis ekstensi

README repo membagi isinya menjadi dua kelompok: plugin internal yang dibuat dan dipelihara Anthropic, serta plugin eksternal dari mitra dan komunitas. Plugin dapat mengemas beberapa bagian sekaligus, seperti skills, agents, hooks, server MCP, dan perintah slash. Karena itu, sebuah plugin bisa menambahkan instruksi untuk tugas tertentu, menghubungkan tool eksternal, atau menjalankan tindakan otomatis pada tahap tertentu dalam sesi Claude Code. ([README repositori](https://github.com/anthropics/claude-plugins-official#claude-code-plugins-directory), [dokumentasi plugin Claude Code](https://code.claude.com/docs/en/plugins).)

Katalog ini tersedia dari antarmuka Claude Code. Pengguna dapat membuka `/plugin`, mencari pilihan di tab Discover, atau memasang plugin dengan perintah seperti:

```text
/plugin install {nama-plugin}@claude-plugins-official
```

Marketplace di sini berfungsi sebagai daftar sumber plugin; komponen plugin tetap berasal dari repositori atau layanan yang ditautkan oleh entri tersebut. Dokumentasi Anthropic menjelaskan bahwa plugin mengemas komponen dalam satu unit agar dapat dipasang dan diperbarui bersama. Ini berguna bagi developer yang ingin memakai ulang alur kerja seperti pemeriksaan pull request, panduan framework, atau konektor layanan di beberapa proyek.

## Label resmi tidak menggantikan pemeriksaan kode

Nama repositorinya dapat memberi kesan bahwa setiap plugin di dalamnya sepenuhnya dibuat atau diaudit Anthropic. README justru membedakan plugin internal dan eksternal, serta memperingatkan bahwa Anthropic tidak mengendalikan atau dapat memastikan isi MCP server, file, dan software lain yang dibawa plugin eksternal. Dokumentasi keamanan juga menyatakan plugin dapat menjalankan kode dengan hak pengguna yang memasangnya. ([Peringatan di README](https://github.com/anthropics/claude-plugins-official#claude-code-plugins-directory), [panduan keamanan dan kepercayaan plugin](https://code.claude.com/docs/en/plugins/security).)

Sebelum memasang, developer dapat memeriksa komponen yang akan ditambahkan, membaca dokumentasi plugin, lalu meninjau konfigurasi seperti `hooks/hooks.json`, `.mcp.json`, dan isi folder `bin/` jika tersedia. Hook bisa menjalankan perintah shell, sedangkan konfigurasi MCP dapat memulai proses lokal atau menghubungkan Claude Code ke server lain. Review itu penting terutama pada mesin kerja yang memiliki akses ke repositori privat, kredensial, atau berkas proyek.

## Mengapa repo ini ramai diperhatikan?

Claude Code mendukung plugin sebagai cara membagikan konfigurasi dan tool yang sebelumnya mungkin dipasang satu per satu. Posisi repo ini di GitHub Trending menunjukkan minat developer yang besar terhadap ekosistem ekstensi tersebut. Namun, bintang GitHub hanya mencerminkan interaksi komunitas; jumlah itu tidak membuktikan bahwa semua plugin cocok untuk setiap tim.

Bagi developer, katalog Anthropic memberi titik awal untuk menemukan dan memasang ekstensi Claude Code. Pilih plugin yang benar-benar dibutuhkan, periksa sumber dan komponen yang dijalankannya, lalu kelola akses sesuai kebutuhan proyek. Dengan cara itu, kemudahan memasang paket tidak menghilangkan kendali atas apa yang berjalan di lingkungan pengembangan.
