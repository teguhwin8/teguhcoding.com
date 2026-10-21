---
title: "Mistral Rilis Voxtral 3 untuk Membuat Agen AI Penjawab Telepon"
source_url: "https://mistral.ai/news/voxtral-3/"
tags: ["AI", "Developer Tools", "Voice AI"]
date: "2026-10-21T02:49:00.000Z"
cover_image: "/posts/mistral-voxtral-3-call-center-cover.jpg"
---

Mistral merilis Voxtral 3 pada 20 Oktober: rangkaian model transkripsi dan text-to-speech, ditambah SDK untuk membangun agen suara. Developer bisa merangkai sistem yang mendengar penelepon, memahami permintaannya, menjalankan aksi di layanan lain, lalu menjawab lewat suara. Mistral mengatakan satu giliran percakapan bisa selesai dalam kurang dari satu detik.

![Petugas layanan pelanggan memakai headset saat bekerja di kantor](/posts/mistral-voxtral-3-call-center-cover.jpg)

*Foto ilustrasi, bukan pengguna Voxtral 3. Foto: [Yan Krukau/Pexels](https://www.pexels.com/photo/call-center-agent-working-8867267/), digunakan sesuai [lisensi Pexels](https://www.pexels.com/legal-pages/license/).*

## Bukan satu model untuk semua tugas

Voxtral 3 membagi pekerjaan suara ke beberapa bagian. Model transkripsi menangkap ucapan dan pergantian pembicara; model bahasa memutuskan apa yang perlu dilakukan; model text-to-speech menyampaikan jawabannya. SDK Mistral dibangun di atas LiveKit dan menghubungkan langkah-langkah itu dalam aliran audio yang sama.

![Alur agen suara Voxtral 3: transkripsi, penalaran dan pemanggilan tools, lalu jawaban suara](/posts/mistral-voxtral-3-voice-agent-flow.svg)

*Diagram berdasarkan [pengumuman Mistral](https://mistral.ai/news/voxtral-3/) dan [dokumentasinya](https://docs.mistral.ai/studio/audio/overview/). Klaim waktu respons berasal dari Mistral.*

Saat penelepon menyela, agen dapat berhenti bicara dan mendengarkan lagi. Mistral juga menyebut integrasi dengan function calling, pencarian web, dan sistem internal; untuk telepon memakai SIP, sedangkan browser dan aplikasi dapat terhubung lewat WebRTC. Artinya, demo bisa berkembang menjadi agen yang mengecek tagihan atau membuat janji, selama developer menghubungkannya ke data dan layanan yang diperlukan.

## Tarif mulai dari transkripsi

Harga resmi Voxtral Mini Transcribe 3 untuk rekaman adalah US$0,0035 per menit. Transkripsi real-time tercantum US$0,008 per menit, sedangkan Voxtral Speech 3 dibanderol US$13 per satu juta karakter. Jika dipakai sebagai agen suara, tarif API-nya US$0,04 per menit dengan Mistral Small 4 sebagai model penalaran, atau US$0,08 dengan model lain. Semua angka ini tarif API yang tercantum saat peluncuran, belum termasuk biaya layanan lain yang mungkin dipakai.

Voxtral mendukung 50 bahasa untuk transkripsi rekaman, 45 bahasa dan dialek untuk transkripsi real-time, serta 35 bahasa untuk pembuatan suara. Preset suara bawaannya tercantum untuk 18 bahasa; Bahasa Indonesia tidak ada di daftar itu. Ini belum berarti model TTS tak bisa mengucapkan bahasa Indonesia, tetapi developer perlu menguji pelafalan dan responsnya sebelum memasangnya di layanan nyata. Cakupan tiap kemampuan dijelaskan terpisah di [dokumentasi Mistral](https://docs.mistral.ai/studio/audio/specs-and-limits/languages/).

## Bisa dijalankan sendiri, tetapi bukan unduhan bebas

Mistral menawarkan opsi menjalankan seluruh stack di infrastruktur sendiri atau private cloud. Halaman rilis belum menyediakan tautan unduhan bobotnya; calon pengguna yang ingin menjalankan sistem sendiri diarahkan untuk menghubungi tim Mistral. Opsi ini lebih cocok untuk organisasi yang butuh kontrol atas lokasi pemrosesan dan siap memakai skema komersial.

Mistral mengklaim satu giliran percakapan bisa selesai di bawah satu detik. Untuk perbandingan suara, [Frandroid](https://www.frandroid.com/culture-tech/intelligence-artificielle/3293341_face-a-elevenlabs-et-ses-90-langues-mistral-degaine-voxtral-3) mencatat bahwa evaluasinya dilakukan secara internal dan menggunakan Gemini 3.8 Flash sebagai penilai. Angka peluncuran itu belum menggantikan pengujian independen. Developer tetap perlu mencoba transkripsi, jeda bicara, dan biaya dengan jenis panggilan yang benar-benar akan ditangani—sebelum agen suara diberi akses untuk mengambil tindakan.
