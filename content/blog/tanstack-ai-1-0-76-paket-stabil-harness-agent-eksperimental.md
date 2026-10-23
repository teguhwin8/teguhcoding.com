---
title: "TanStack AI 1.0 Resmi Stabil: 76 Paket, Harness Agent Masih Eksperimental"
source_url: "https://tanstack.com/blog/tanstack-ai-1-0"
tags: ["AI", "Developer Tools", "TypeScript"]
date: "2026-10-23T05:53:35.000Z"
cover_image: "/posts/tanstack-ai-1-0-cover.jpg"
---

TanStack AI resmi mencapai versi 1.0 pada 23 Oktober. Timnya menyebut 76 paket masuk rilis stabil, dengan 23 adapter provider dan dukungan delapan framework UI plus vanilla JavaScript. Ada satu batas yang perlu diperhatikan: agent harness baru masih berstatus eksperimental dan tetap di versi 0.x.

![Tumpukan batu bertuliskan 1.0 di tepi pantai, gambar sampul pengumuman TanStack AI 1.0](/posts/tanstack-ai-1-0-cover.jpg)

*Foto: TanStack, dari [pengumuman resmi TanStack AI 1.0](https://tanstack.com/blog/tanstack-ai-1-0).*

## Satu toolkit untuk merangkai fitur AI

TanStack AI bukan model bahasa baru. Ini toolkit TypeScript untuk menambahkan chat, pemanggilan tools, media, MCP, dan fitur agent ke aplikasi. Pengembang bisa memilih provider model dan framework UI yang dipakai, lalu menghubungkannya lewat adapter TanStack. Menurut [dokumentasi rilis](https://tanstack.com/blog/tanstack-ai-1-0), kini ada 23 adapter provider dan dukungan delapan framework UI, ditambah vanilla JavaScript.

![Diagram lapisan TanStack AI: aplikasi TypeScript terhubung ke API inti stabil dan adapter; agent harness tetap eksperimental](/posts/tanstack-ai-1-0-architecture.svg)

*Diagram: Teguhcoding.com, diringkas dari [dokumentasi TanStack AI](https://tanstack.com/ai/latest).*

Buat tim yang sudah punya aplikasi TypeScript, pendekatan ini memberi ruang untuk mengganti provider tanpa harus merombak antarmuka aplikasi. Ada juga dukungan 11 penyedia sandbox untuk menjalankan coding agent. Angka itu menjanjikan banyak pilihan, tetapi tiap integrasi tetap perlu dicocokkan dengan kebutuhan dan infrastruktur proyek.

## Core stabil, harness agent belum

Pemisahan status versi ini penting. API inti TanStack AI 1.0 dinyatakan stabil, sementara paket `@tanstack/ai-harness` dan CLI-nya masih 0.x. Harness ditujukan untuk pekerjaan agent yang berlangsung lebih lama daripada satu balasan chat: sesi yang tersimpan, subagent, plugin, dan pekerjaan latar belakang. Karena API-nya masih eksperimental, tim sebaiknya menguji perubahan versi sebelum menjadikannya fondasi alur produksi.

## Upgrade dari 0.x perlu disiapkan

Versi 1.0 menghapus API yang sebelumnya sudah ditandai deprecated. TanStack menyediakan codemod untuk perubahan umum, tetapi pembaruan tetap perlu dilakukan di sisi client dan server pada waktu yang sama. `threadId` juga kini wajib diberikan secara eksplisit. Kalau aplikasi menyimpan percakapan, run, atau berkas, ikuti langkah migrasi data di [panduan upgrade 1.0](https://tanstack.com/ai/latest/docs/migration/v1) sebelum deploy; lolos type check saja belum memindahkan data lama.

Rilis ini paling relevan bagi pengembang yang memang ingin merangkai fitur AI dengan pilihan provider dan UI yang lebih luas. Untuk proyek baru, [quick start TanStack](https://tanstack.com/ai/latest/docs/getting-started/quick-start) memberi jalur mencoba versi stabil; untuk yang sudah memakai 0.x, baca panduan migrasi dulu dan perlakukan harness agent sebagai bagian terpisah yang masih berubah.

**Sumber:** [pengumuman TanStack AI 1.0](https://tanstack.com/blog/tanstack-ai-1-0), [rilis 1.0.0 di GitHub](https://github.com/TanStack/ai/releases/tag/%40tanstack%2Fai%401.0.0), dan [panduan migrasi](https://tanstack.com/ai/latest/docs/migration/v1).
