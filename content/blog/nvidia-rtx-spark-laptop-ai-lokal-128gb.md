---
title: "Laptop RTX Spark Mulai Dijual dengan Memori Terpadu hingga 128 GB"
source_url: "https://nvidianews.nvidia.com/news/nvidia-rtx-spark-pcs-available-today-a-new-beginning-for-windows-pcs"
tags: ["AI", "Developer Tools", "Hardware"]
date: "2026-10-19T07:40:25.000Z"
cover_image: "/posts/nvidia-rtx-spark-ai-laptop-cover.jpg"
---

ASUS, Dell, HP, Lenovo, Microsoft, dan MSI mulai menjual laptop Windows berbasis NVIDIA RTX Spark pada 16 Oktober. [Konfigurasi tertingginya](https://nvidianews.nvidia.com/news/nvidia-rtx-spark-pcs-available-today-a-new-beginning-for-windows-pcs) menawarkan memori terpadu hingga 128 GB; NVIDIA menyebut komputasi AI-nya mencapai 1 petaflop pada presisi FP4. Ruang memori sebesar ini ditujukan bagi developer yang ingin memuat model lebih besar dan menguji agent di perangkat sendiri. Data tetap di laptop hanya jika model dan integrasinya memang berjalan lokal.

![Visual resmi ASUS yang menampilkan laptop ProArt dan PC ringkas untuk workflow kreator berbasis RTX Spark](/posts/nvidia-rtx-spark-asus-proart-workflow.jpg)

*Visual skenario resmi dari [ASUS IFA 2026 Media Kit](https://press.asus.com/media/media-kit/ifa-2026-media-kit/).*

## Satu chip, memori bersama

RTX Spark menggabungkan prosesor Grace dan GPU Blackwell dalam satu sistem. CPU dan GPU memakai pool memori yang sama, jadi developer tidak hanya mengandalkan VRAM khusus yang terpasang pada kartu grafis. NVIDIA menawarkan kapasitas hingga 128 GB, tetapi jumlah pastinya bergantung pada model laptop yang dibeli.

NVIDIA menempatkan perangkat ini untuk kerja AI lokal. Perusahaan juga menyiapkan panduan pemasangan agent seperti GitHub Copilot, Hermes, dan OpenClaw. Daftar integrasi itu tidak berarti semua modelnya berjalan lokal; developer tetap perlu memilih model dan layanan yang sesuai. Laptop ini membawa CUDA, ekosistem yang banyak dipakai untuk mengembangkan dan menjalankan aplikasi AI.

![Hasil uji workload agent Qwen 3.8 27B di beberapa perangkat menurut Artificial Analysis](/posts/nvidia-rtx-spark-agentperf-benchmark.svg)

*Artificial Analysis menguji replay tugas agent yang sama di beberapa perangkat. Konfigurasi model dan software berbeda antarperangkat, dan waktu menjalankan tool tidak dihitung.*

## Tes awal: satu workload selesai dalam 18,7 menit

[Artificial Analysis menguji laptop RTX Spark 128 GB](https://artificialanalysis.ai/articles/nvidia-rtx-spark-agentperf-local) dengan Qwen 3.8 27B dalam rangkaian delapan tugas, total 168 giliran model. Replay itu selesai dalam 18,7 menit. DGX Spark mencatat 17,3 menit, sementara MacBook Pro M5 Pro dengan memori 64 GB menyelesaikannya dalam 37,6 menit.

Angka itu hanya menggambarkan satu konfigurasi dan satu jenis pekerjaan. Artificial Analysis memakai runtime dan format bobot yang berbeda pada tiap perangkat, dan waktu tool seperti membuka berkas atau menjalankan perintah tidak masuk hitungan. Pengujian ini mengukur waktu model menjawab rangkaian prompt agent; durasi developer menuntaskan pekerjaan dari awal sampai akhir bisa berbeda.

## Linux native masih dirintis komunitas

Jalur yang NVIDIA siapkan saat peluncuran berpusat pada Windows on Arm dan WSL. Jika tim mengandalkan Linux yang terpasang langsung di laptop, statusnya belum setara: [daftar komunitas RTX Spark di GitHub](https://github.com/Th0rgal/awesome-rtx-spark) menyebut dukungan native N1X masih tahap uji awal, dengan kernel dan driver yang dimodifikasi. Pengujian yang dicatat baru mencakup dua laptop, ASUS ProArt P14 dan Dell XPS 16.

Diskusi [r/LocalLLaMA tentang konfigurasi RTX Spark 128 GB](https://www.reddit.com/r/LocalLLaMA/comments/1x6trqq/128gb_rtx_spark_laptop_for_3832/) juga berputar pada pertanyaan praktis: seberapa cepat model berjalan di laptop, seberapa berguna kapasitas besar itu, dan apakah harganya masuk akal. Komentar forum bukan pengujian performa, tetapi menunjukkan hal yang ingin diketahui calon pengguna setelah angka kapasitas diumumkan.

## Menarik untuk AI lokal, mahal untuk kebutuhan umum

Dalam [ulasan awal Windows Central](https://www.windowscentral.com/hardware/nvidia/rtx-spark-review-benchmarks-2026), GPU RTX Spark dinilai kuat untuk model AI lokal, sementara kinerja CPU-nya berada di bawah beberapa chip laptop kelas atas. Harga dan kapasitas memori berbeda antarprodusen. Artificial Analysis memperkirakan konfigurasi Surface Laptop Ultra 128 GB yang mereka uji berharga sekitar US$5.899,99 pada Oktober; harga itu bukan patokan untuk semua laptop RTX Spark. Bagi developer yang rutin menguji model besar atau agent secara lokal, memori bersama dan dukungan CUDA bisa mengurangi kebutuhan mengirim beban inferensi ke API berbayar.

Untuk coding harian yang sebagian besar berjalan di cloud, 128 GB memori lokal mungkin berlebihan. Cek kapasitas SKU, dukungan tool, dan benchmark pada model yang benar-benar dipakai tim. Bagi pengguna Linux native, keputusan membeli juga bergantung pada kapan dukungan N1X masuk ke kernel dan driver standar; jalur yang disiapkan saat peluncuran masih Windows on Arm dan WSL.

### Sumber

- [NVIDIA: RTX Spark PCs Available Today](https://nvidianews.nvidia.com/news/nvidia-rtx-spark-pcs-available-today-a-new-beginning-for-windows-pcs)
- [NVIDIA Developer Blog: Code, Test, and Deploy on One Machine with NVIDIA RTX Spark](https://developer.nvidia.com/blog/code-test-and-deploy-on-one-machine-with-nvidia-rtx-spark)
- [Artificial Analysis: Hasil awal AgentPerf-Local untuk laptop RTX Spark](https://artificialanalysis.ai/articles/nvidia-rtx-spark-agentperf-local)
- [Windows Central: Ulasan dan benchmark RTX Spark](https://www.windowscentral.com/hardware/nvidia/rtx-spark-review-benchmarks-2026)
- [GitHub: Daftar komunitas untuk Linux, driver, dan benchmark RTX Spark](https://github.com/Th0rgal/awesome-rtx-spark)
- [Diskusi r/LocalLLaMA soal laptop RTX Spark 128 GB](https://www.reddit.com/r/LocalLLaMA/comments/1x6trqq/128gb_rtx_spark_laptop_for_3832/)

### Kredit gambar

- Sampul: visual produk NVIDIA RTX Spark dari [NVIDIA Newsroom Media Assets](https://nvidianews.nvidia.com/file/nvidia-rtx-spark).
- Gambar dalam artikel: visual skenario ProArt dari [ASUS IFA 2026 Media Kit](https://press.asus.com/media/media-kit/ifa-2026-media-kit/).
