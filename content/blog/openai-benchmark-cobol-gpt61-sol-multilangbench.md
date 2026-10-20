---
title: "Di Tes OpenAI, GPT-6.1 Sol Capai Akurasi 86,6% untuk Migrasi COBOL"
source_url: "https://openai.com/index/low-resource-programming-languages/"
tags: ["AI", "Developer Tools", "Programming"]
date: "2026-10-20T08:23:54.104Z"
cover_image: "/posts/openai-cobol-legacy-terminal-cover.jpg"
---

OpenAI merilis **MultiLangBench** pada 19 Oktober dan memaparkan tes terpisah untuk memindahkan program COBOL ke bahasa lain. Dalam [evaluasi yang diumumkan OpenAI](https://openai.com/index/low-resource-programming-languages/), GPT-6.1 Sol mencatat akurasi 86,6% pada reasoning rendah, sedangkan GPT-5.6 Sol mendapat 5,4% dengan pengaturan yang sama. Angka ini berasal dari evaluasi OpenAI sendiri; belum ada replikasi independen yang menyertai pengumuman.

*Foto arsip Lt. Cmdr. R.A. Payton menggunakan terminal komputer pada 1974. Foto oleh [Navy Medicine di Unsplash](https://unsplash.com/photos/man-in-uniform-types-on-vintage-computer-terminal-oaPhR4_967Q), digunakan sesuai [lisensi Unsplash](https://unsplash.com/license). Foto ini memberi konteks sejarah komputasi, bukan gambar sistem COBOL atau tes OpenAI.*

## Dua tes yang mengukur hal berbeda

MultiLangBench meminta model membuat mesin basis data yang kompatibel dengan SQLite dari nol dalam 20 bahasa pemrograman. OpenAI mengukur berapa banyak tes yang lolos. Pada reasoning maksimum, GPT-6 Astra mencatat rata-rata pass rate 87,4%, dibanding 26,8% untuk GPT-5.6 Sol. GPT-6 Luna meraih 40,3%; OpenAI memperkirakan biaya rata-rata per sampelnya US$0,77, sekitar 78% lebih rendah daripada US$3,48 untuk GPT-5.6 Sol.

![Perbandingan hasil dua evaluasi OpenAI: pass rate MultiLangBench untuk tiga model dan akurasi tes migrasi COBOL pada reasoning rendah](/posts/openai-multilangbench-hasil-cobol.svg)

*Angka pada grafik berasal dari dua evaluasi yang berbeda. MultiLangBench menguji pembuatan mesin SQLite kompatibel; tes migrasi menguji apakah perilaku program COBOL tetap sama setelah dipindahkan.*

Tes migrasi COBOL punya ukuran yang lebih ketat. Program dipindahkan ke C++, Java, Kotlin, Python, atau Rust, lalu diuji dengan kasus tersembunyi. Migrasi baru dianggap berhasil jika hasil yang terlihat dari program cocok persis. Pada reasoning tinggi, GPT-6.1 Sol mencapai akurasi 97,9%, menurut OpenAI. Biaya API pada pengaturan reasoning rendah juga dilaporkan 39% lebih murah daripada model pembandingnya.

## Yang perlu dijaga saat memindahkan kode lama

Tes itu menyorot masalah yang sering luput saat orang hanya mengecek apakah hasil migrasi bisa dikompilasi. Dalam COBOL, operasi angka desimal bisa membuang digit berlebih jika pembulatan tidak diminta. Program hasil terjemahan mungkin berjalan tanpa error, tetapi menghasilkan angka transaksi yang berbeda.

OpenAI juga membuka [kode dan test suite MultiLangBench di GitHub](https://github.com/openai/MultiLangBench) dengan lisensi Apache 2.0. README-nya menjelaskan bahwa sekitar 24 ribu dari 51 ribu tes SQLite berhasil diubah untuk evaluasi ini; untuk pemakaian rutin, repo menyarankan subset 272 tes. Ini memberi developer cara untuk memeriksa bentuk pengujiannya, meski belum membuktikan hasil yang sama akan muncul pada sistem perusahaan lain.

Jadi, hasil ini lebih cocok dibaca sebagai alasan untuk mulai menguji AI pada tugas pemeliharaan kode lama—bukan lampu hijau untuk langsung memigrasikan sistem produksi. Tim yang ingin mencoba tetap perlu menyiapkan regression test dari sistem mereka sendiri, memeriksa aturan bisnis dan hasil hitung, lalu meminta engineer meninjau setiap perubahan. Pertanyaan berikutnya sederhana: apakah hasil OpenAI akan bertahan ketika diuji pada kode dan data yang benar-benar dipakai tim lain?
