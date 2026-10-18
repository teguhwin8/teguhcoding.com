---
title: "Reflection Buka Bobot Beam 1.0, Dukungan llama.cpp Sudah Masuk"
source_url: "https://reflection.ai/blog/beam-is-available"
tags: ["AI", "Open Source", "Developer Tools"]
date: "2026-10-17T22:17:03.667Z"
cover_image: "/posts/reflection-beam-open-weights-cover.svg"
---

Pada 16 Oktober, Reflection AI membuka bobot Beam 1.0 dengan lisensi Apache 2.0. Model yang sebelumnya hanya bisa dicoba lewat pratinjau terbatas kini tersedia dalam format BF16, FP8, dan NVFP4. Dukungan Beam juga masuk ke `master` llama.cpp pada hari yang sama. Beam memakai arsitektur MoE dengan sekitar 23,4 miliar parameter aktif per token; checkpoint penuhnya berisi 501,3 miliar parameter.

## Dari pratinjau terbatas menjadi bobot yang bisa diunduh

Reflection memperkenalkan Beam pada 5 Oktober dan membuka bobotnya ke publik sebelas hari kemudian. [Model card di Hugging Face](https://huggingface.co/reflection/Beam-1.0-501B-A23B) mencantumkan lisensi Apache 2.0 serta tiga format bobot: BF16, FP8, dan NVFP4. Perusahaan menujukan model ini untuk coding, reasoning, dan tugas agent jangka panjang. Beam menerima dan menghasilkan teks, dengan jendela konteks hingga satu juta token menurut klaim Reflection.

![Ilustrasi konseptual Beam sebagai model MoE: bobot penuh berisi 501 miliar parameter, sementara sebagian parameter aktif untuk tiap token](/posts/reflection-beam-moe-parameters.svg)

*Skema konseptual, bukan diagram arsitektur internal Beam. Spesifikasi model merujuk pada model card Reflection.*

Bobot yang terbuka memberi tim pilihan untuk mengunduh dan meng-host Beam sendiri. Reflection juga mengumumkan integrasi dengan sejumlah alat serving dan agent. Menurut [SiliconANGLE](https://siliconangle.com/2026/10/16/reflection-ai-open-sources-beams-weights-post-training-recipes/), paket rilisnya mencakup konfigurasi untuk beberapa serving engine, resep fine-tuning, dan alat evaluasi.

## Dukungan llama.cpp sudah digabung

Ada perkembangan langsung dari komunitas pada hari yang sama. Pull request [“model: add Beam (Reflection)” di llama.cpp](https://github.com/ggml-org/llama.cpp/pull/30670) digabung pada 16 Oktober. Perubahan itu menambahkan converter, model graph, dan parser tool-call Beam. Menurut catatan pull request, bobot asli dapat dikonversi dan GGUF yang sudah dikuantisasi dapat dimuat untuk menghasilkan teks di CUDA.

Dengan dukungan itu, developer bisa mencoba menjalankan Beam lewat server lokal berbasis llama.cpp. Reflection juga menyebut Transformers, vLLM, SGLang, Unsloth, dan Axolotl sebagai alat yang didukung. Dukungan di cabang `master` belum tentu sudah tersedia di semua rilis stabil, jadi cek versi backend yang dipakai sebelum menyiapkan deployment.

## 23B aktif bukan berarti ringan dijalankan

Beam menggunakan arsitektur sparse Mixture-of-Experts (MoE). Sekitar 23,4 miliar parameter aktif memproses setiap token, sementara checkpoint-nya tetap menyimpan seluruh 501,3 miliar parameter. Angka aktif menggambarkan bagian model yang bekerja pada satu waktu; angka itu tidak menunjukkan ukuran bobot yang perlu disimpan untuk inference.

Panduan [deployment Beam di vLLM](https://recipes.vllm.ai/reflection/Beam-1.0-501B-A23B) memberi gambaran soal kebutuhan perangkatnya. Angka di bawah adalah estimasi total memori GPU yang direkomendasikan oleh konfigurasi tersebut, bukan patokan untuk semua backend:

| Format | Ukuran bobot | Memori GPU minimum menurut panduan vLLM |
| --- | ---: | ---: |
| NVFP4 | 294 GB | 353 GB |
| FP8 | 503 GB | 604 GB |
| BF16 | 1.003 GB | 1.204 GB |

Untuk NVFP4, panduan tersebut merekomendasikan empat GPU B200/B300 atau satu tray GB200/GB300. Ada juga konfigurasi delapan H100 dengan backend tertentu. Perkiraan memori vLLM sudah mencakup bobot dan ruang untuk aktivasi, CUDA graphs, serta KV cache. Kuantisasi memang mengurangi ukuran dibanding BF16, tetapi Beam tetap membutuhkan infrastruktur kelas server.

Pertanyaan yang sama muncul di [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1x7g4k3/reflectionbeam10501ba23b_hugging_face/): apakah label A23B berarti model ini muat di VRAM 8–16 GB? Kapasitas perangkat, format bobot, backend, dan panjang konteks semuanya ikut menentukan jawabannya.

## Terbuka untuk eksperimen, tetap butuh infrastruktur

Bobot terbuka dan dukungan llama.cpp membuat Beam lebih mudah diuji di toolchain sendiri. Tim yang ingin meng-host model perlu menyiapkan memori GPU dalam skala besar; tim tanpa perangkat tersebut tetap bisa mengevaluasinya lewat API Reflection atau penyedia lain yang mendukung Beam. Pilih jalur berdasarkan hasil, biaya, dan infrastruktur yang tersedia.
