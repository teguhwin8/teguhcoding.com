---
title: "Hugging Face Rilis Carbon-X untuk Ngobrol soal DNA, tapi Belum untuk Diagnosis"
source_url: "https://huggingface.co/HuggingFaceBio/Carbon-X"
tags: ["AI", "Open Source", "Bioinformatika"]
date: "2026-10-23T09:58:23.000Z"
cover_image: "/posts/huggingface-carbon-x-dna-cover.jpg"
---

Hugging Face merilis Carbon-X pada 22 Oktober: model terbuka yang menerima urutan DNA dan pertanyaan sehari-hari dalam satu percakapan. Versi 4-bit-nya tersedia sebagai berkas sekitar 9,6 GB untuk llama.cpp, meski pemakaian nyata butuh memori tambahan. Model ini masih alat riset, belum untuk keputusan medis, dan prediksinya belum diuji di laboratorium menurut [laporan WIRED](https://www.wired.com/story/hugging-face-new-ai-biology-model-chat-with-dna/).

![Ilustrasi heliks DNA berwarna putih dan biru di atas latar gelap](/posts/huggingface-carbon-x-dna-cover.jpg)

*Foto ilustrasi, bukan tampilan Carbon-X. Foto oleh [Warren Umoh](https://unsplash.com/@warrenumoh) di [Unsplash](https://unsplash.com/photos/dna-double-helix-structure--qycBqByWIY), digunakan sesuai [Unsplash License](https://unsplash.com/license).*

Carbon-X dikembangkan tim Hugging Face bersama Zhongguancun Academy di China serta Telethon Institute of Genetics and Medicine dan University of Naples Federico II di Italia. Bobot modelnya tersedia dengan lisensi Apache 2.0 di [Hugging Face](https://huggingface.co/HuggingFaceBio/Carbon-X). Rincian tokenisasi, benchmark, dan contoh pemakaian juga tersedia di [model card Carbon-X](https://huggingface.co/HuggingFaceBio/Carbon-X).

## DNA masuk ke chat dalam potongan enam basa

Carbon-X berangkat dari Qwen3-14B, lalu dilatih lagi menggunakan 302 miliar token yang mencampur urutan DNA, teks biologi, bahasa Inggris, dan contoh instruksi. Tokenizer-nya membaca DNA dalam kelompok enam huruf—misalnya `ACGTAC`—sementara teks pertanyaan masuk di pesan yang sama.

![Skema cara Carbon-X memproses pertanyaan dan urutan DNA dalam percakapan yang sama](/posts/carbon-x-alur-dna.svg)

*Skema dibuat untuk artikel ini berdasarkan [dokumentasi model Carbon-X](https://huggingface.co/HuggingFaceBio/Carbon-X).*

> Dari satu percakapan, Carbon-X dapat diminta memperkirakan dampak varian, mengenali bagian yang mengatur aktivitas gen, mengelompokkan organisme, atau memprediksi basa berikutnya. Timnya juga menyediakan contoh untuk menghubungkan model ini ke agent, sehingga hasil analisis DNA bisa dipanggil sebagai salah satu tool dalam alur kerja riset.

## Bisa dicoba lokal, dengan catatan perangkat

Bobot Carbon-X dalam format BF16 memerlukan satu GPU 80 GB menurut model card-nya. Untuk eksperimen lokal, tim Hugging Face juga menyediakan [varian GGUF](https://huggingface.co/HuggingFaceBio/Carbon-X-GGUF): berkas Q4_K_M berukuran sekitar 9,6 GB, sedangkan Q8_0 sekitar 15,8 GB. Angka itu adalah ukuran berkas, bukan total memori yang dibutuhkan saat model berjalan. Varian GGUF memerlukan [llama.cpp pada commit b11742 atau yang lebih baru](https://github.com/ggml-org/llama.cpp/commit/b11742); versi sebelumnya dapat membaca token DNA secara keliru.

Menjalankannya sendiri memberi tim riset kendali lebih besar atas data genom yang sensitif. Itu tidak otomatis berlaku kalau urutan DNA dikirim ke layanan inferensi pihak ketiga—cara penyimpanan dan pemrosesannya bergantung pada penyedia yang dipakai.

## Angka awalnya menarik, tapi belum jadi bukti klinis

Dalam lima benchmark yang dipilih Hugging Face, Carbon-X meraih rata-rata 66,7 persen tanpa mode reasoning. Model card membandingkannya dengan 67,5 persen untuk GPT-6.1 Sol pada mode reasoning maksimal. Angkanya berasal dari evaluasi tim pembuat model, dan cara pengujiannya berbeda, jadi ini bukan perbandingan langsung.

Rata-rata itu juga menutupi kelemahan di beberapa jenis soal: skor Carbon-X pada pengenalan splice site tercatat 29,8 persen, dan pada tanda histon 34,6 persen. Dokumentasinya memperingatkan model bisa salah menghitung posisi basa atau mengarang fungsi urutan jika konteksnya kurang. Untuk operasi yang perlu presisi, tim Hugging Face menyarankan memakai kode.

Carbon-X juga dibahas di [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1xcew36/carbonx_the_best_open_dna_language_model_runs/) dan [r/MachineLearning](https://www.reddit.com/r/MachineLearning/comments/1xchayq/carbonx_is_an_open_148b_model_trained_jointly_on/). Buat developer bioinformatika, bagian paling menariknya mungkin bukan chatbot DNA itu sendiri, melainkan kemungkinan menaruh model khusus ini di dalam agent yang berjalan di infrastruktur sendiri. Untuk sekarang, keluaran Carbon-X tetap perlu dicek dengan metode bioinformatika dan eksperimen yang sudah tervalidasi.
