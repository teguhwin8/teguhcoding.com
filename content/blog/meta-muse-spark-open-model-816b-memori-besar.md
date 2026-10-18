---
title: "Meta Rilis Muse Spark Open: Model 816B yang Butuh Memori Besar"
source_url: "https://research.meta.ai/blog/muse-spark-open"
tags: ["AI", "Open Weight", "Developer Tools"]
date: "2026-10-18T06:19:02.257Z"
cover_image: "/posts/meta-muse-spark-open-cover.svg"
---

Meta [membuka bobot **Muse Spark Open**](https://research.meta.ai/blog/muse-spark-open) pada 15 Oktober. Model multimodal ini punya 816 miliar parameter total, 42 miliar di antaranya aktif untuk tiap token, serta jendela konteks hingga satu juta token. Bobotnya sudah didukung sejumlah runtime, termasuk vLLM, SGLang, `llama.cpp`, MLX, Transformers, dan Unsloth. [Diskusi Hacker News tentang rilis ini](https://news.ycombinator.com/item?id=50107379) mengumpulkan 914 poin dan 477 komentar saat diperiksa pada 18 Oktober.

Menjalankan model sebesar ini secara lokal perlu memori dalam jumlah besar. Lisensinya juga punya syarat khusus, termasuk kewajiban atribusi bagi produk yang menggunakan model. Dua hal itu perlu dicek sebelum memilih cara untuk mencobanya.

![Ilustrasi konsep Muse Spark Open, model multimodal Meta dengan 816 miliar parameter total](/posts/meta-muse-spark-open-cover.svg)

*Ilustrasi konseptual buatan Teguhcoding, bukan gambar atau diagram resmi Meta.*

## Apa yang dirilis Meta?

Meta merilis bobot model yang sebelumnya hanya tersedia melalui produk dan API mereka. Muse Spark Open memakai arsitektur *mixture of experts* (MoE): totalnya 816 miliar parameter, tetapi sekitar 42 miliar aktif saat memproses satu token. Angka aktif itu menjelaskan beban komputasi per token, bukan ukuran penuh bobot yang perlu disimpan.

Model ini menerima teks, gambar, audio, dan video, lalu menghasilkan teks. Meta menujukannya untuk coding, penggunaan tool, dan tugas agent yang berjalan dalam beberapa langkah. Meta menyebutnya model open-weight terkuat asal AS sejauh ini. Rincian benchmark yang dipublikasikan perusahaan ada di [model card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B).

![Diagram alur Muse Spark Open dari masukan multimodal ke pilihan deployment](/posts/meta-muse-spark-open-deployment.svg)

*Alur deployment diringkas dari dokumentasi Meta dan Hugging Face; diagram ini bukan rancangan arsitektur internal model.*

## Bisa dicoba lewat toolchain yang sudah dikenal

Developer tidak harus menulis integrasi dari nol. [Dokumentasi deployment Meta](https://dev.meta.ai/resources/blog/build-with-muse-spark-open) mencantumkan dukungan untuk SGLang, vLLM, Transformers, TensorRT-LLM, MLX, `llama.cpp`, dan Unsloth. Modelnya juga tersedia lewat API sejumlah penyedia inference, seperti Baseten, Fireworks AI, Groq, Modal, Nebius, OpenRouter, dan Together AI.

## Menjalankan modelnya perlu banyak memori

Kalau ingin menjalankannya sendiri, format resmi yang tersedia adalah BF16 dan NVFP4. [Model card Meta](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B) memperkirakan NVFP4 memerlukan sedikitnya 700 GB VRAM, sedangkan BF16 perlu sekitar 2 TB. Meta juga mendokumentasikan setup dua Mac Studio M5 Ultra lewat MLX.

Apple menguji Muse Spark Open pada beberapa Mac Studio. Dalam [pengujian Apple](https://machinelearning.apple.com/research/mlx-distributed-inference), konfigurasi dua unit M5 Ultra menghasilkan sekitar 25 token per detik, sedangkan empat unit sekitar 37 token per detik. Angka itu diukur dengan konteks 8.192 token dan 128 token keluaran; perangkat serta prompt lain bisa memberi hasil berbeda.

Ada pilihan kuantisasi komunitas dengan kebutuhan lebih rendah. [Panduan Hugging Face](https://huggingface.co/blog/meta-muse-spark-open) melaporkan varian oQ3e berjalan di satu M3 Ultra dengan memori 512 GB, memakai sekitar 344 GB, dan menghasilkan sekitar 21 token per detik. Pengujian itu memakai prompt 1.024 token dan menghasilkan 128 token. Varian 3-bit tersebut berbeda dari bobot BF16 atau NVFP4 resmi Meta.

## “Open weight” dengan syarat lisensi

Meta merilis bobot ini di bawah **Muse Model License**, bukan lisensi umum seperti MIT atau Apache 2.0. Lisensinya mengizinkan penggunaan, modifikasi, fine-tuning, distribusi, dan penjualan, dengan sejumlah ketentuan. Produk yang memakai model harus menampilkan tulisan “Built with Muse Spark Open” di antarmuka, dokumentasi, situs, atau pengaturan.

Ada aturan khusus untuk layanan model. Jika sebuah perusahaan dan afiliasinya memiliki pendapatan kotor gabungan lebih dari US$20 juta dalam periode 12 bulan berturut-turut dan menawarkan Muse Spark Open sebagai layanan model lewat API atau antarmuka serupa, lisensi meminta perusahaan itu memberi tahu Meta dan meneken perjanjian terpisah sebelum menawarkan layanan tersebut. Ketentuan ini tidak berlaku untuk penggunaan internal, riset, kegiatan komersial yang bukan layanan model, atau model yang menjadi komponen produk perusahaan sendiri.

Untuk mengajukan akses ke bobot di Hugging Face, formulirnya meminta nama lengkap, tanggal lahir, dan nama organisasi. Jadi, sebelum mengunduh atau memasukkannya ke produk, baca [lisensi dan model card](https://huggingface.co/meta-models/Muse-Spark-Open-816B-A42B), lalu pastikan kebutuhan perangkat dan aturan penggunaan cocok dengan rencana tim.

Developer bisa mulai lewat API atau mencoba varian terkuantisasi yang sesuai dengan perangkat mereka. Menjalankan bobot resmi sendiri perlu memori besar, dan produk yang memakai model perlu mengikuti ketentuan lisensinya.
