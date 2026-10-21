---
title: "OpenAI Bawa Model dan Codex ke Google Cloud, Akses Awal Masih Terbatas"
source_url: "https://openai.com/index/openai-models-google-cloud/"
tags: ["AI", "OpenAI", "Google Cloud"]
date: "2026-10-21T13:03:13.000Z"
cover_image: "/posts/openai-google-cloud-cover.jpg"
---

Pada 21 Oktober, OpenAI dan Google Cloud mengumumkan model OpenAI dan workflow agen Codex masuk ke Model Garden Google. Preview modelnya baru dibuka untuk pelanggan enterprise terpilih. Google juga mengatakan developer dapat menghubungkan Codex CLI dan Desktop ke Gemini platform untuk inferensi.

![Deretan server sebagai ilustrasi infrastruktur cloud di balik layanan AI](/posts/openai-google-cloud-cover.jpg)

*Foto ilustrasi, bukan pusat data Google Cloud. Foto oleh [Domaintechnik](https://www.domaintechnik.at/) melalui [Unsplash](https://unsplash.com/photos/server-rack-with-blinking-green-lights-VHmBX7FnXw0), digunakan sesuai [Lisensi Unsplash](https://unsplash.com/license).*

## Codex tetap berjalan dari workflow developer

Menurut [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers), tiga model yang mulai masuk preview tertutup adalah **GPT-6 Astra**, **GPT-6.1 Sol**, dan **GPT-6 Luna**. Pelanggan terpilih dapat mengaksesnya lewat API di Model Garden. Workflow lokal dari Codex CLI dan Desktop juga bisa terhubung langsung ke Gemini platform untuk menjalankan inferensi.

Developer tetap menjalankan Codex CLI dan Desktop dari workflow yang sudah ada; yang berubah adalah jalur inferensinya, yang dapat diarahkan ke layanan Google Cloud. OpenAI menyebut model dan workflow agen Codex akan tersedia melalui Model Garden. Model OpenAI juga direncanakan hadir di Google Antigravity dan Gemini for Business, tetapi belum tersedia sekarang.

![Diagram akses model OpenAI lewat Google Cloud Model Garden, termasuk workflow Codex CLI dan Desktop serta tagihan melalui Google Cloud Marketplace](/posts/openai-google-cloud-model-garden.svg)

*Alur akses berdasarkan pengumuman [OpenAI](https://openai.com/index/openai-models-google-cloud/) dan [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers).*

## Tagihan masuk ke Google Cloud

Model OpenAI dibeli lewat Google Cloud Marketplace. Jika perusahaan sudah punya komitmen belanja GCP, biaya model dapat memakai komitmen tersebut dan muncul di tagihan Google Cloud yang sama.

Bagi perusahaan yang sudah berkomitmen belanja ke GCP, jalur ini bisa mengurangi urusan pengadaan terpisah untuk mencoba model OpenAI. [Axios](https://www.axios.com/2026/10/21/openai-google-cloud-ai-models) melihat kerja sama ini sebagai cara OpenAI menjangkau pelanggan Google Cloud, sementara Google bisa menawarkan model pesaingnya berdampingan dengan Gemini.

Menurut [Google Cloud](https://cloud.google.com/blog/products/ai-machine-learning/google-cloud-brings-openai-models-to-customers), prompt, konteks, dan output pelanggan tetap berada dalam data perimeter yang ditentukan dan tidak dipakai untuk melatih model; opsi zero data retention disebut akan menyusul. Microsoft tetap menjadi mitra cloud utama OpenAI menurut [pengumuman resminya](https://openai.com/index/openai-models-google-cloud/). Kerja sama baru ini memperluas pilihan cloud tanpa menggeser Azure.

## Harga dan wilayah layanan belum diumumkan

Saat ini, akses baru diberikan lewat preview tertutup untuk sebagian pelanggan enterprise. OpenAI merencanakan ketersediaan umum dalam beberapa pekan, menurut [pengumumannya](https://openai.com/index/openai-models-google-cloud/). Rilis tersebut belum merinci harga atau wilayah layanan, jadi tim di Indonesia masih perlu menunggu sebelum bisa menilai biaya dan ketersediaannya.

Setelah akses meluas, perusahaan bisa membandingkan model OpenAI dan Gemini dari lingkungan cloud serta jalur pengadaan yang sama. Itu yang membuat pengumuman ini menarik bagi developer: pilihan model bertambah tanpa harus lebih dulu memindahkan data dan workflow ke cloud lain.
