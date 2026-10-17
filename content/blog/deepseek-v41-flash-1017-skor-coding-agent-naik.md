---
title: "DeepSeek Perbarui V4.1-Flash, Skor Coding Agent Naik di Benchmark"
source_url: "https://api-docs.deepseek.com/updates/"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-17T17:10:39.000Z"
cover_image: "/posts/deepseek-v41-flash-1017-cover.svg"
---

DeepSeek merilis pembaruan **V4.1-Flash-1017** pada 17 Oktober 2026. Perusahaan mengklaim checkpoint ini lebih baik pada sejumlah tugas coding dan agent; skor Terminal-Bench 4.0, misalnya, naik dari 31,2 menjadi 42,3 dibanding versi V4.1-Flash sebelumnya. Angka itu berasal dari evaluasi DeepSeek sendiri, jadi menarik sebagai sinyal kemajuan, tetapi belum menjadi validasi independen.

## Pembaruan checkpoint, bukan model API baru

DeepSeek menyebutnya sebagai pembaruan minor untuk V4.1-Flash. Model di web dan aplikasi resminya sudah diperbarui, sedangkan pengguna API tetap memanggil `deepseek-flash` dengan metode dan harga yang sama. Artinya, integrasi yang sudah menggunakan nama model tersebut tidak perlu mengubah endpoint hanya untuk mendapat versi terbaru.

Nama `1017` merujuk pada tanggal pembaruan, 17 Oktober. Bagi developer, perubahan paling relevan ada pada klaim peningkatan untuk coding berbasis terminal, perbaikan repo, dan alur agent yang menjalankan beberapa langkah.

## Kenaikan terbesar ada di tugas terminal

Dalam tabel [changelog dan kartu model DeepSeek](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017), skor Terminal-Bench 4.0 meningkat dari 31,2 ke 42,3. DeepSeek juga melaporkan kenaikan ProgramBench dari 20,3 ke 29,1 dan DeepSWE v1.1 dari 74,2 ke 77,0. Pada Agents’ Last Exam, skornya berubah dari 31,8 ke 35,4.

![Perbandingan skor benchmark coding dan agent DeepSeek V4.1-Flash dengan checkpoint 1017](/posts/deepseek-v41-flash-benchmark.svg)

*Perbandingan berdasarkan tabel yang diterbitkan DeepSeek. Hasil ini merupakan klaim pembuat model, bukan pengukuran independen.*

DeepSeek mencatat Terminal-Bench dijalankan menggunakan framework Claude Code, sementara DeepSWE memakai Mini-SWE-V2. Detail harness tersebut penting karena skor agent bisa berubah tergantung alat dan konfigurasi yang membungkus model. Angka benchmark memberi petunjuk untuk memilih model yang layak dicoba, tetapi belum menjamin hasil yang sama pada proyek atau lingkungan kerja setiap developer.

## API praktis, bobot terbuka untuk yang punya infrastruktur

Untuk mencoba versi baru, jalur paling sederhana adalah API DeepSeek dengan nama model `deepseek-flash`; changelog menyatakan pemanggilan dan harga tetap sama. Checkpoint-nya juga tersedia di [Hugging Face dengan lisensi MIT](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017), sehingga tim dapat mengunduh bobot dan mengatur deployment sendiri. Kartu model mencantumkan ukuran 763 miliar parameter dan menyatakan model itu belum tersedia lewat hosted Inference Provider Hugging Face saat diperiksa. Bobot terbuka memberi kendali, tetapi bukan berarti menjalankannya di laptop menjadi ringan.

## Ramai dibahas, tetapi benchmark tetap perlu diuji

Pembaruan ini cepat menarik perhatian komunitas: diskusi [DeepSeek V4.1 Flash 1017 di Hacker News](https://news.ycombinator.com/item?id=50129121) telah mengumpulkan lebih dari 500 poin saat diperiksa. Itu menunjukkan banyak developer mengikuti kabar ini, bukan bukti bahwa hasil benchmark sudah direplikasi pihak lain.

Untuk tim yang sedang memilih model coding, V4.1-Flash-1017 layak masuk daftar uji, terutama jika pekerjaan banyak melibatkan terminal dan perubahan lintas file. Sebelum memindahkan workflow, jalankan beberapa tugas representatif milik sendiri dan bandingkan tingkat keberhasilan, waktu, serta biaya. Klaim DeepSeek memberi alasan untuk mencoba checkpoint ini; keputusan produksi sebaiknya tetap bertumpu pada evaluasi di repo dan toolchain tim sendiri.
