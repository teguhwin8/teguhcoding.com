---
title: "Sphinx Menyisipkan Kuis Sebelum Kode AI Di-push"
source_url: "https://github.com/parthh01/sphinx"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-19T02:30:24.000Z"
cover_image: "/posts/sphinx-ai-code-quiz-cover.svg"
---

Begitu developer menjalankan `git push`, Sphinx bisa menghentikan proses itu sejenak dan mengajukan pertanyaan tentang perubahan yang hendak dikirim. Jawaban yang tepat akan meneruskan push; jawaban yang meleset memunculkan penjelasan dan skenario baru untuk dijawab. Proyek open source ini ditujukan untuk alur kerja dengan coding agent, tetapi hook-nya memeriksa setiap push yang cocok dengan aturan cabang—ia tidak tahu apakah perubahan ditulis AI atau manusia.

Tautan Sphinx masuk posisi ketiga halaman Hacker News edisi 18 Oktober, dengan 241 poin dan 85 komentar saat diperiksa. Di [repositori resminya](https://github.com/parthh01/sphinx), pengembang menyebutnya sebagai checkpoint pemahaman: sebelum kode sampai ke cabang yang dijaga, manusia diminta menunjukkan bahwa ia mengikuti perubahan tersebut.

![Ilustrasi Sphinx menahan Git push sambil developer menjawab kuis tentang perubahan kode yang dibuat dengan bantuan AI](/posts/sphinx-ai-code-quiz-cover.svg)

*Ilustrasi konseptual Teguhcoding, bukan tangkapan layar Sphinx.*

## Kuisnya bertolak dari diff, bukan percakapan

Perintah `sphinx install` memasang Git hook secara global. Secara bawaan, hook memeriksa push ke cabang `main` atau `master` di semua repositori pada komputer itu; `sphinx init` bisa mengatur cabang dan aturan berbeda untuk tiap repo.

Saat push cocok dengan aturan, model pemeriksa terpisah membaca commit lewat alat Git yang hanya-baca. Ia tidak melihat percakapan saat kode dibuat. Pertanyaannya menyorot apa yang dikerjakan perubahan, bagaimana perubahan itu bisa gagal, dan syarat sistem yang tidak boleh rusak—bukan sekadar nama berkas atau fungsi.

![Alur kerja Sphinx: perubahan di Git memicu pertanyaan model reviewer; jawaban developer yang lolos melanjutkan push, jawaban keliru membuka penjelasan dan skenario baru](/posts/sphinx-ai-code-quiz-flow.svg)

*Alur diringkas dari [dokumentasi repositori Sphinx](https://github.com/parthh01/sphinx). Developer tetap boleh membuka kode atau meminta coding agent menjelaskan perubahan saat menjawab.*

Jika jawaban keliru, Sphinx menjelaskan bagian yang terlewat lalu memberi skenario baru tentang konsep yang sama. Jika lolos, push yang tadi tertahan diteruskan. Paket [sphinx-understand tersedia di npm](https://www.npmjs.com/package/sphinx-understand). Instal paket dan hook global, lalu jalankan `sphinx init` dari repositori yang ingin diatur:

```sh
npm install -g sphinx-understand
sphinx install
# jalankan dari dalam repositori yang ingin diatur
sphinx init
```

Sphinx memerlukan Node.js 22.19 atau lebih baru dan Git. Sistem yang didukung meliputi macOS, Linux, dan WSL; Windows tanpa WSL belum didukung.

## Kuisnya bukan audit keamanan

Sphinx sendiri menyebut fitur ini sebagai latihan, bukan gerbang keamanan. Siapa pun yang punya akses lokal—termasuk coding agent—bisa melewati hook. Kuis juga tidak membuktikan siapa yang menulis kode atau bahwa orang yang menjawab benar-benar memahaminya. Pemeriksanya model AI, yang bisa salah.

Perhatikan juga ke mana kode dikirim. Sphinx tidak menyediakan model atau layanan review sendiri: pertanyaan dijalankan lewat akun Claude Code atau Codex, OpenRouter, maupun endpoint yang kompatibel dengan OpenAI. Penyedia model yang dipilih menerima kode dan berkas terkait dari commit, jawaban developer, serta konteks repositori. Berkas tertentu dikecualikan secara bawaan, tetapi dokumentasi menyarankan pemilik repo mengatur `.sphinxignore` sendiri; rahasia yang tersimpan di berkas sumber biasa belum tentu terdeteksi.

Respons di [diskusi Hacker News](https://news.ycombinator.com/item?id=50137950) beragam. Sebagian developer menyukai ide jeda untuk membaca ulang perubahan dari agent; yang lain ragu orang tidak akan menyalin pertanyaan ke agent untuk mendapat jawaban, atau khawatir kuis di setiap push menambah gangguan. Diskusi itu menunjukkan minat dan keberatan, belum membuktikan kuis ini meningkatkan pemahaman atau kualitas kode.

Sphinx menaruh checkpoint tepat di alur Git yang sudah dipakai developer. Itu bisa membantu tim membahas perubahan besar dari coding agent, tetapi hook lokal tetap bisa dilewati dan kode akan dikirim ke penyedia model yang dipilih. Apakah jeda itu terasa berguna atau malah memperlambat kerja baru bisa dijawab setelah dicoba pada repositori dan kebijakan data tim sendiri.
