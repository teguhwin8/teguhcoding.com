---
title: "GitHub Copilot Jadwalkan Pensiunkan Enam Model AI Hari Ini"
source_url: "https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october/"
tags: ["AI", "GitHub Copilot", "Developer Tools"]
date: "2026-10-19T10:53:02.000Z"
cover_image: "/posts/github-copilot-model-retirement-cover.svg"
---

Mulai 19 Oktober, GitHub menjadwalkan penghentian enam model di Copilot: GPT-5.5, GPT-5.4, GPT-5.4 mini, GPT-5 mini, Gemini 3.7 Flash, dan Grok 4.5. Perubahan ini mencakup Copilot Chat, edit inline, mode Ask dan Agent, serta pelengkapan kode. GitHub juga sudah mencantumkan model penggantinya.

![Ilustrasi pilihan model di GitHub Copilot yang bergeser ke model pengganti](/posts/github-copilot-model-retirement-cover.svg)

*Ilustrasi vektor orisinal Teguhcoding, bukan tangkapan layar atau gambar resmi GitHub.*

## Model lama dan penggantinya

Dalam [pengumuman GitHub](https://github.blog/changelog/2026-09-18-upcoming-deprecation-of-selected-github-copilot-models-in-mid-october/), pemetaannya sebagai berikut:

- GPT-5.5 dan GPT-5.4 → GPT-5.6 Sol
- GPT-5.4 mini dan GPT-5 mini → GPT-5.6 Luna
- Gemini 3.7 Flash → Gemini 3.8 Flash
- Grok 4.5 → Grok 4.6

![Diagram enam model GitHub Copilot dan model penggantinya](/posts/github-copilot-model-retirement-map.svg)

*Pemetaan mengikuti alternatif yang disarankan GitHub; ketersediaannya bergantung pada paket dan pengaturan organisasi.*

GitHub menyebut perubahan ini berlaku di seluruh pengalaman Copilot, bukan hanya daftar model di jendela chat. Kalau kamu memilih model secara manual untuk mengedit kode atau menjalankan agent, pilihan itu bisa berubah setelah tanggal deprecation. Pengumuman ini membahas akses melalui GitHub Copilot; pengumuman tersebut tidak menyatakan bahwa API dari OpenAI, Google, atau xAI ikut dihentikan.

## Cek pengaturan sebelum pekerjaan berikutnya

Untuk pelanggan Copilot Business dan Enterprise, model pengganti akan aktif otomatis bila pengaturan default model masih menyala dan admin belum menonaktifkan model tersebut. Jika organisasi mengatur akses model secara manual, admin perlu memeriksa kebijakannya. GitHub meminta pengguna memperbarui workflow dan integrasi yang merujuk langsung ke model lama.

Ada satu catatan: saat artikel ini disusun, [halaman daftar model yang didukung](https://docs.github.com/en/copilot/reference/ai-models/supported-models) masih menampilkan beberapa model lama sebagai GA dan riwayat pensiunnya belum mencantumkan 19 Oktober. Jadi, tanggal di sini adalah jadwal yang diumumkan GitHub; akses bisa terlihat berbeda selama perubahan diterapkan. Cek model picker di IDE atau pengaturan organisasi sebelum mengandalkan satu nama model.

Jika kamu memakai salah satu model itu untuk tugas harian, pilih penggantinya dan coba pada workflow yang sama. Bandingkan hasilnya sebelum menjadikannya pilihan default—nama model baru tidak menjamin perilakunya persis sama.
