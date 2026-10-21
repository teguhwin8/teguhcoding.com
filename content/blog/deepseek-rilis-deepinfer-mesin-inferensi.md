---
title: "DeepSeek Buka Kode Mesin Inferensi, tetapi Rilisnya Belum Lengkap untuk Layanan Online"
source_url: "https://github.com/deepseek-ai/DeepInfer"
tags: ["AI", "DeepSeek", "Developer Tools"]
date: "2026-10-21T00:51:50.000Z"
cover_image: "/posts/deepseek-deepinfer-server-rack-cover.jpg"
---

DeepSeek membuka kode [DeepInfer](https://github.com/deepseek-ai/DeepInfer), framework inferensi yang menurut perusahaan dipakai untuk menjalankan layanan berskala besar. Rilis Apache 2.0 ini baru mendukung DeepSeek-V4.1-Flash dan inferensi offline. Untuk melayani banyak pengguna lewat API, beberapa bagian penting seperti sistem cache dan load balancing belum disertakan.

![Deretan server di ruang data center sebagai ilustrasi mesin inferensi DeepSeek](/posts/deepseek-deepinfer-server-rack-cover.jpg)

*Foto ilustrasi, bukan fasilitas milik DeepSeek. Foto: [Kevin Ache/Unsplash](https://unsplash.com/photos/a-rack-of-servers-in-a-server-room-2JJ3wBHu4_0), digunakan sesuai [Unsplash License](https://unsplash.com/license).*

## Yang dibuka DeepSeek

Inferensi adalah tahap ketika model yang sudah dilatih menerima permintaan lalu menghasilkan jawaban. Framework seperti DeepInfer mengatur cara komputasi itu dijalankan: dari kernel yang digunakan sampai pembagian pekerjaan ke banyak akselerator. Pilihan di lapisan ini berpengaruh pada kecepatan dan biaya layanan.

DeepSeek menyebut DeepInfer sebagai framework yang menopang layanan produksinya. [README GitHub](https://github.com/deepseek-ai/DeepInfer) merinci mesin inferensi offline, optimasi kernel, pemrosesan paralel, dan format keluaran terstruktur. Perusahaan juga mengatakan framework ini awalnya dibangun terutama di atas vLLM, dengan inspirasi dari SGLang dan TensorRT-LLM.

![Bagian yang tersedia di rilis DeepInfer dan komponen layanan online yang belum disertakan](/posts/deepseek-deepinfer-release-scope.svg)

*Ringkasan cakupan rilis berdasarkan [README DeepInfer](https://github.com/deepseek-ai/DeepInfer) dan [dokumen tanya jawab deployment](https://github.com/deepseek-ai/DeepInfer/blob/main/doc/inference_deployment_qa.md).*

## Bukan paket siap pasang untuk API publik

README DeepInfer hanya mencantumkan DeepSeek-V4.1-Flash sebagai model yang didukung, serta akselerator NVIDIA SM100 dan Huawei Ascend 950. Untuk layanan online lengkap, repo itu menyebut sistem KV cache, pemisahan tahap prefill dan decode, serta load balancing antarreplika belum disertakan. DeepSeek menjelaskan dalam [dokumen deployment](https://github.com/deepseek-ai/DeepInfer/blob/main/doc/inference_deployment_qa.md) bahwa sebagian komponen layanan produksinya masih terikat pada infrastruktur internal.

Persyaratan perangkatnya juga tinggi: proyek ini meminta Linux, Python 3.12, dan CUDA 13 untuk NVIDIA atau CANN 9.2 untuk Ascend. Snapshot [model V4.1-Flash-1017 di Hugging Face](https://huggingface.co/deepseek-ai/DeepSeek-V4.1-Flash-1017) berukuran sekitar 510 GB. Lisensinya pun terpisah: kode DeepInfer memakai Apache 2.0, sementara bobot modelnya memakai MIT.

## Kenapa developer memperhatikannya

Repo ini memberi developer kesempatan mempelajari cara DeepSeek mengatur inferensi skala besar. Saat diperiksa pada 21 Oktober, repo tersebut sudah mengumpulkan lebih dari 12.000 stars, sementara thread di [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1xanm55/deepseek_released_deepinfer_open_source/) mencatat 764 upvotes. Komentator membahas perbandingan dengan vLLM dan SGLang serta meminta dukungan untuk GPU yang lebih umum. Angka itu menunjukkan minat komunitas, bukan bukti performa.

Namun, angka kecepatan yang dibagikan DeepSeek belum diuji secara independen, menurut [The Next Web](https://thenextweb.com/news/deepseek-deepinfer-open-source-inference-engine). Jadi, untuk saat ini nilai praktisnya paling jelas bagi tim yang memiliki akselerator yang didukung dan ingin mempelajari implementasinya. Seberapa jauh ia bisa menekan biaya atau mempercepat layanan baru akan terlihat setelah pengujian di luar DeepSeek dan dukungan komponen layanan online bertambah.
