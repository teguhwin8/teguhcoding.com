---
title: "Amazon Siapkan TorchNeuron agar Kode PyTorch Bisa Berjalan di Trainium"
source_url: "https://pytorch.org/blog/introducing-torchneuron-native-pytorch-backend-for-aws-trainium/"
tags: ["AI", "Developer Tools", "Cloud Computing"]
date: "2026-10-19T16:46:10.000Z"
cover_image: "/posts/torchneuron-trainium-cover.jpg"
---

Amazon memperkenalkan **TorchNeuron**, backend PyTorch untuk chip AI Trainium2 dan Trainium3. Perusahaan itu mengatakan developer bisa memindahkan model ke Trainium dengan perubahan kecil, seperti mengganti perangkat tujuan dari `cuda` ke `neuron`. Kodenya belum tersedia untuk umum saat pengumuman ini ditulis; beta publik berlisensi Apache 2.0 dijadwalkan mulai 20 Oktober.

*Foto sampul ilustrasi oleh [Panumas Nikhomkhai di Pexels](https://www.pexels.com/photo/light-on-computer-hardware-17489150/); bukan foto perangkat Amazon Trainium. Digunakan sesuai [lisensi Pexels](https://www.pexels.com/license/).*

## Yang berubah ada di lapisan software

PyTorch sudah punya cara untuk mendaftarkan perangkat keras baru. TorchNeuron memanfaatkan mekanisme itu agar Trainium dikenali sebagai perangkat `neuron` di dalam framework. Di [contoh kode yang dibagikan PyTorch](https://pytorch.org/blog/introducing-torchneuron-native-pytorch-backend-for-aws-trainium/), model diarahkan ke perangkat tersebut lewat `model.to("neuron")`. Kode yang memakai API `torch.accelerator` juga bisa berjalan tanpa perubahan khusus perangkat, menurut pengumuman itu.

Backend ini mendukung mode eager untuk eksperimen dan debugging, serta `torch.compile` untuk mengompilasi model. Developer yang perlu mengoptimalkan operasi tertentu masih bisa menulis kernel lewat Neuron Kernel Interface. Dukungan awalnya ditujukan untuk Trainium2 dan Trainium3.

![Diagram alur konseptual dari model PyTorch melalui TorchNeuron dan AWS Neuron menuju chip Trainium](/posts/torchneuron-alur-pytorch-trainium.svg)

*Alur sederhana berdasarkan dokumentasi PyTorch dan Amazon. Diagram ini menjelaskan posisi TorchNeuron, bukan jaminan bahwa semua model langsung kompatibel atau memiliki kinerja yang sama.*

## Amazon ingin menurunkan ongkos pindah dari CUDA

Selama ini, developer yang ingin menjalankan PyTorch di Trainium perlu menyesuaikan kode dengan antarmuka khusus AWS. [GeekWire](https://www.geekwire.com/2026/amazon-challenges-nvidias-software-advantage-with-new-tool-for-its-ai-chips/) mengutip Amazon bahwa TorchNeuron memangkas langkah itu menjadi perubahan konfigurasi sederhana. Sementara itu, [Reuters](https://www.reuters.com/business/retail-consumer/amazon-says-its-ai-chips-will-work-with-popular-coding-language-challenging-2026-10-19/) menempatkan pengumuman ini dalam persaingan dengan CUDA, ekosistem software Nvidia yang sudah lama menjadi pilihan utama untuk komputasi AI.

Amazon mengatakan lebih dari 30 pelanggan awal sudah mencoba TorchNeuron, termasuk perusahaan di bidang robotika, model dunia, dan AI suara. Angka itu berasal dari keterangan Amazon kepada Reuters, jadi belum menunjukkan seberapa luas perangkat lunak ini akan dipakai setelah dibuka untuk publik.

## Beta publiknya baru mulai 20 Oktober

Rilis terbuka akan memberi developer kesempatan untuk memeriksa kode dan mencoba backend tersebut tanpa program beta tertutup. Namun, istilah “open source” di sini berlaku untuk software-nya: menjalankan beban kerja tetap membutuhkan akses ke mesin Trainium di AWS.

Klaim “tanpa rewrite” juga perlu diuji pada model dan pustaka yang benar-benar dipakai. Contoh resmi menunjukkan perubahan perangkat yang kecil, tetapi perpustakaan tertentu, konfigurasi distribusi, atau kebutuhan optimasi bisa menambah pekerjaan. Beta publiknya akan memberi gambaran lebih jelas soal cakupan operasi dan performa di workload nyata.

Kalau pemindahan model ternyata semudah yang dijanjikan Amazon, Trainium akan lebih mudah dicoba oleh tim yang sudah bekerja dengan PyTorch. Pertanyaan berikutnya bukan hanya apakah modelnya bisa jalan, tetapi apakah hasil dan biayanya cukup baik untuk membuat tim mau berpindah dari GPU yang sudah mereka kenal.
