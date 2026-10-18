---
title: "DeepSeek Perbarui V4.1-Flash, Skor Coding Agent Naik di Benchmark"
source_url: "https://api-docs.deepseek.com/updates/"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-17T17:10:39.000Z"
cover_image: "/posts/deepseek-v41-flash-1017-cover.svg"
---

DeepSeek memperbarui model **V4.1-Flash** pada 17 Oktober. Pada evaluasi internal perusahaan, skor Terminal-Bench 4.0 naik dari 31,2 menjadi 42,3 dibanding checkpoint sebelumnya. DeepSeek juga melaporkan kenaikan di beberapa tes coding dan agent lainnya. Hasil ini belum direplikasi secara independen.

## Pembaruan checkpoint, bukan model API baru

DeepSeek menyebut rilis ini pembaruan minor. Model di situs dan aplikasi resminya sudah memakai checkpoint baru, sementara nama API tetap `deepseek-flash` dengan metode pemanggilan dan harga yang sama. Integrasi yang ada tidak perlu mengganti nama model atau endpoint.

Angka `1017` pada nama model merujuk ke tanggal rilis, 17 Oktober. DeepSeek menyoroti peningkatan untuk tugas terminal, perbaikan repo, dan alur agent bertahap.

## Kenaikan terbesar ada di tugas terminal

Di [changelog dan model card DeepSeek](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017), skor Terminal-Bench 4.0 berubah dari 31,2 menjadi 42,3. Skor ProgramBench naik dari 20,3 ke 29,1, DeepSWE v1.1 dari 74,2 ke 77,0, dan Agents’ Last Exam dari 31,8 ke 35,4.

![Perbandingan skor benchmark coding dan agent DeepSeek V4.1-Flash dengan checkpoint 1017](/posts/deepseek-v41-flash-benchmark.svg)

*Perbandingan berdasarkan tabel yang diterbitkan DeepSeek. Hasil ini merupakan klaim pembuat model, bukan pengukuran independen.*

DeepSeek menjalankan Terminal-Bench dengan framework Claude Code dan DeepSWE dengan Mini-SWE-V2. Pilihan alat dan konfigurasinya dapat memengaruhi hasil benchmark agent. Karena itu, angka ini bisa menjadi alasan untuk mencoba modelnya, tetapi hasil pada proyek sendiri mungkin berbeda.

## API praktis, bobot terbuka untuk yang punya infrastruktur

Untuk mencoba versi API, gunakan nama model `deepseek-flash`; cara pemanggilan dan harganya tetap sama menurut changelog. Checkpoint juga tersedia di [Hugging Face dengan lisensi MIT](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017). Model card mencantumkan 763 miliar parameter dan, saat diperiksa, belum menawarkan hosted Inference Provider di Hugging Face. Tim bisa mengunduh bobotnya sendiri, tetapi perlu memperhitungkan kebutuhan perangkat untuk model sebesar itu.

## Ramai dibahas, tetapi benchmark tetap perlu diuji

Pembaruan ini ramai dibicarakan di [Hacker News](https://news.ycombinator.com/item?id=50129121), dengan lebih dari 500 poin saat diperiksa. Antusiasme komunitas belum menggantikan pengujian independen atas angka benchmark.

Jika pekerjaan tim banyak melibatkan terminal atau perubahan lintas file, V4.1-Flash-1017 layak dicoba pada beberapa tugas nyata. Bandingkan tingkat keberhasilan, waktu, dan biaya dengan model yang sedang dipakai sebelum mengubah alur kerja.
