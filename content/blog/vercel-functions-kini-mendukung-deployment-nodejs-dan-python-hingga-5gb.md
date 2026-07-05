---
title: "Vercel Functions Kini Mendukung Deployment Node.js dan Python Hingga 5GB"
source_url: "https://vercel.com/changelog/vercel-functions-can-now-be-up-to-5-gb-in-package-size?ref=dailydev"
tags: ["Vercel","Serverless","Cloud"]
date: "2026-07-05T05:00:09.419Z"
cover_image: "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/5EPfHjKljpHLiMIM8cuM7Z/f543e47c97ad1b864a68165596b1d050/vercel_functions_package_size_limit_increased_to_5_og_card.jpg"
---

## Vercel Functions Naik Kelas: Package Size Kini Bisa Hingga 5GB

Vercel baru saja memperluas kemampuan **Vercel Functions** dengan dukungan ukuran deployment hingga **5GB** untuk runtime **Node.js** dan **Python** di atas **Fluid compute**. Ini adalah lompatan besar dari batas sebelumnya yang hanya **250MB**, atau sekitar peningkatan 20 kali lipat.

Fitur ini saat ini tersedia dalam status **public beta**, tetapi dampaknya sudah cukup terasa bagi tim yang selama ini kesulitan menjalankan workload backend berukuran besar di Vercel.

## Kenapa Ini Penting?

Batas 250MB sebelumnya cukup masuk akal untuk banyak aplikasi web modern, terutama API ringan, route handler sederhana, atau fungsi serverless yang tidak membawa banyak dependensi. Namun, tidak semua backend sekecil itu.

Dengan dukungan Large Functions hingga 5GB, Vercel kini lebih ramah untuk berbagai kebutuhan seperti:

- Library Python untuk data processing dan AI yang ukurannya besar
- Dependency browser automation seperti Chromium atau Playwright
- Package untuk image dan video processing
- Generated client berukuran besar
- Route yang berbagi banyak application code
- Backend workload yang sebelumnya tidak cocok masuk ke batas 250MB

Bagi developer yang membangun aplikasi berbasis AI, automation, media processing, atau backend yang lebih kompleks, perubahan ini bisa mengurangi kebutuhan untuk memecah deployment ke layanan lain hanya karena kendala ukuran paket.

## Cara Mengaktifkan Large Functions

Untuk **project baru**, Vercel akan otomatis mendaftarkannya ke beta ini. Jadi, jika Anda membuat project baru dan menggunakan Fluid compute, dukungan Large Functions sudah tersedia tanpa konfigurasi tambahan.

Untuk **project yang sudah ada**, Anda bisa mengaktifkannya dengan menambahkan environment variable berikut:

`VERCEL_SUPPORT_LARGE_FUNCTIONS=1`

Setelah itu, lakukan redeploy agar konfigurasi tersebut berlaku.

Menariknya, Vercel juga akan meminta Anda untuk opt in jika suatu Function melewati batas 250MB. Jadi, workflow-nya tetap cukup natural dan tidak memaksa semua project langsung memakai jalur beta.

Jika ingin lebih aman, environment variable ini bisa di-scope hanya untuk **preview deployments** terlebih dahulu. Dengan begitu, tim bisa menguji kompatibilitas sebelum mengaktifkannya di production.

## Tidak Semua Function Otomatis Masuk Jalur Large Functions

Salah satu detail penting dari pengumuman ini adalah Vercel tetap mempertahankan jalur standar untuk Function yang ukurannya masih di bawah 250MB.

Artinya, dalam satu deployment yang sama:

- Function di bawah 250MB tetap berjalan seperti biasa
- Hanya Function yang melewati batas 250MB yang memakai Large Functions beta
- Function lain tidak ikut berubah perilakunya

Ini pendekatan yang cukup elegan karena developer tidak perlu mengorbankan seluruh deployment hanya karena satu atau dua route membutuhkan dependency besar.

Vercel juga menampilkan informasi di dashboard ketika sebuah deployment menggunakan Large Functions. Jadi, tim tetap punya visibilitas yang jelas tentang apa yang sedang berjalan di production maupun preview.

## Catatan dan Batasan Saat Ini

Karena masih berada dalam public beta, ada beberapa hal yang perlu diperhatikan.

Large Functions saat ini:

- Membutuhkan **Fluid compute**
- Belum mendukung **Secure Compute**
- Belum mendukung **Static IPs**

Vercel juga menyebutkan bahwa dukungan untuk Function berukuran **10GB atau lebih besar** sedang disiapkan. Ini memberi sinyal bahwa Vercel ingin membuka ruang lebih luas untuk workload backend yang sebelumnya kurang cocok dengan model serverless tradisional.

## Apa Artinya untuk Developer?

Perubahan ini membuat Vercel semakin fleksibel, terutama untuk aplikasi modern yang backend-nya tidak lagi sekadar CRUD API ringan. Banyak aplikasi sekarang membawa dependensi berat: AI inference tooling, data science package, automation runtime, hingga media processing pipeline.

Dengan batas 5GB, developer punya lebih banyak ruang untuk membangun tanpa harus langsung memindahkan sebagian workload ke infrastruktur terpisah. Tetap ada batasan yang perlu dipahami, terutama karena fitur ini masih beta dan bergantung pada Fluid compute, tetapi arahnya jelas: Vercel ingin menjadi platform yang lebih siap untuk aplikasi full-stack dengan kebutuhan backend yang lebih serius.

Jika project Anda sebelumnya mentok karena ukuran Function melewati 250MB, ini waktu yang tepat untuk mencoba kembali deployment di Vercel.
