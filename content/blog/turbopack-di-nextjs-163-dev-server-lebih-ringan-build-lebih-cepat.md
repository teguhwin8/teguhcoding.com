---
title: "Turbopack di Next.js 16.3: Dev Server Lebih Ringan, Build Lebih Cepat"
source_url: "https://nextjs.org/blog/next-16-3-turbopack?ref=dailydev"
tags: ["Next.js","Turbopack","Frontend"]
date: "2026-07-01T18:27:00.589Z"
cover_image: "https://h8dxkfmaphn8o0p3.public.blob.vercel-storage.com/static/blog/next-16-3-turbopack/twitter-card.png"
---

Next.js 16.3 Preview membawa sejumlah pembaruan penting untuk Turbopack, bundler generasi baru yang makin matang sebagai bagian dari ekosistem Next.js. Fokus utama rilis ini cukup jelas: performa compiler yang lebih baik, penggunaan memori yang jauh lebih rendah, build yang lebih cepat, dan pengalaman development yang terasa lebih responsif.

Bagi developer yang bekerja di aplikasi Next.js berskala besar, peningkatan ini bukan sekadar angka benchmark. Dev server yang lebih hemat memori, HMR yang lebih cepat, serta cache yang lebih pintar bisa langsung terasa dalam workflow harian.

## Memori dev server turun drastis

Salah satu highlight terbesar di Next.js 16.3 adalah penurunan penggunaan memori Turbopack saat menjalankan `next dev`. Tim Next.js menyebutkan pengurangan memori bisa mencapai hingga 90% pada beberapa aplikasi besar.

Contohnya, pada aplikasi dashboard Vercel, penggunaan memori setelah mengompilasi 50 route turun dari sekitar 21,5 GB menjadi 2 GB. Sementara di nextjs.org, penggunaan memori turun dari sekitar 4,6 GB menjadi 840 MB.

Peningkatan ini sangat relevan karena environment development modern biasanya sudah cukup berat. Selain dev server, developer juga menjalankan IDE, typechecker, linter, browser, hingga coding agent berbasis AI. Jika bundler ikut memakai memori terlalu besar, pengalaman development bisa cepat menurun.

Turbopack sejak awal dirancang dengan pendekatan incremental compilation. Artinya, ia menyimpan hasil kerja sebelumnya agar tidak perlu mengompilasi ulang file yang tidak berubah. Strategi ini bagus untuk mengurangi CPU usage, tetapi konsekuensinya adalah konsumsi memori bisa meningkat seiring sesi development berjalan lama.

Di Next.js 16.3, Turbopack kini dapat melakukan eviction terhadap cache di memori. Dengan memanfaatkan file-system cache yang sebelumnya diperkenalkan di Next.js 16.1, hasil kompilasi bisa tetap disimpan di disk tanpa harus terus memenuhi RAM. Fitur ini aktif secara default di 16.3.

Jika diperlukan untuk debugging performa cache, memory eviction dapat dimatikan lewat konfigurasi eksperimental `turbopackMemoryEviction`.

## File system cache kini tersedia untuk build

Sebelumnya, persistent file system cache sudah membantu mempercepat sesi `next dev`. Di Next.js 16.3, cache yang sama mulai tersedia untuk `next build`.

Dampaknya cukup menarik. Pada beberapa aplikasi Vercel, waktu kompilasi Turbopack untuk build bisa jauh lebih cepat saat cache tersedia. Contohnya, nextjs.org turun dari sekitar 21 detik menjadi 9,2 detik, sementara proyek vercel.com/geist turun dari 30 detik menjadi 5,5 detik.

Untuk CI/CD, ini membuka peluang optimasi yang cukup praktis. Pipeline bisa menyimpan dan menggunakan kembali direktori `.next` dari run sebelumnya, sehingga Turbopack tidak perlu menghitung ulang semua pekerjaan dari nol.

Fitur ini masih perlu diaktifkan melalui flag `turbopackFileSystemCacheForBuild` di konfigurasi eksperimental.

## Dukungan eksperimental Rust React Compiler

Next.js sudah mendukung React Compiler sejak versi 16.0, tetapi selama ini implementasinya berjalan sebagai transform Babel. Pada aplikasi besar, pendekatan berbasis JavaScript ini bisa menjadi bottleneck karena menunggu resource eksekusi JS.

Kini, Turbopack mulai mengintegrasikan React Compiler versi native berbasis Rust. Berdasarkan pengujian awal pada aplikasi React besar seperti v0, peningkatan waktu kompilasi bisa berada di kisaran 20–50%.

Fitur ini masih eksperimental, tetapi sangat menarik untuk dicoba oleh tim yang sudah menggunakan React Compiler dan ingin memangkas waktu build. Untuk menggunakannya, developer perlu mengaktifkan `reactCompiler` serta flag `turbopackRustReactCompiler`.

## `import.meta.glob` hadir di Turbopack

Turbopack kini mendukung API `import.meta.glob` yang kompatibel dengan Vite. API ini memungkinkan developer mengimpor banyak module berdasarkan pola file tanpa harus menuliskan nama file satu per satu.

Contoh kasus yang paling mudah dibayangkan adalah blog berbasis MDX. Dengan `import.meta.glob('./posts/*.mdx')`, aplikasi bisa mengambil semua file post yang cocok dengan pola tersebut. Secara default, setiap nilai yang dihasilkan adalah fungsi async untuk memuat module tersebut.

API ini juga mendukung mode eager import, named imports, multiple patterns, negative patterns, custom search path, query string untuk loader, hingga TypeScript types yang dihasilkan otomatis.

Menariknya lagi, fitur ini terhubung dengan file watcher Turbopack. Jadi ketika file baru ditambahkan atau dihapus dari pola tersebut, dev server akan melakukan recompilation secara otomatis. Untuk use case seperti blog, dokumentasi produk, katalog konten, atau kumpulan file MDX, fitur ini membuat workflow terasa jauh lebih natural.

Perlu dicatat, `import.meta.glob` tersedia sebagai fitur Turbopack dan tidak berlaku jika aplikasi Next.js dibangun menggunakan opsi `--webpack`.

## HMR dan startup dev server makin efisien

Tim Next.js juga melakukan investigasi performa HMR pada aplikasi besar di Vercel. Salah satu hasilnya adalah penyederhanaan cara Turbopack melacak chunk yang sedang dimuat di halaman.

Sebelumnya, ada beberapa subscription yang bisa digabungkan menjadi satu mekanisme yang lebih efisien. Perubahan ini diklaim mampu mengurangi cold start dev server lebih dari 15% pada aplikasi kompleks.

Ini bukan akhir dari optimasi HMR. Tim Next.js menyebut area ini masih akan terus ditingkatkan, terutama untuk menekan penggunaan resource dan mempercepat startup di rilis berikutnya.

## Runtime Turbopack lebih kecil

Turbopack mengirimkan runtime code ke setiap route untuk menyelesaikan module dan mengambil chunk secara dinamis. Runtime ini juga menangani fitur seperti WebAssembly, worker, dan top-level async modules.

Masalahnya, tidak semua aplikasi membutuhkan seluruh kemampuan tersebut. Di Next.js 16.3, Turbopack hanya akan mengirimkan bagian runtime yang benar-benar diperlukan. Hasilnya, aplikasi dapat menghindari pengiriman kode tambahan yang tidak dipakai.

## Konfigurasi PostCSS lokal untuk monorepo

Untuk pengguna monorepo, Next.js 16.3 menambahkan opsi eksperimental `turbopackLocalPostcssConfig`. Dengan opsi ini, Turbopack dapat mencari konfigurasi PostCSS terdekat dari masing-masing file CSS sebelum fallback ke konfigurasi di root project.

Ini berguna ketika beberapa package dalam monorepo membutuhkan transformasi CSS yang berbeda, sementara aplikasi utama tetap memakai konfigurasi root.

## Apa artinya bagi developer Next.js?

Rilis ini menunjukkan arah yang makin jelas untuk Turbopack: bukan hanya mengejar kompatibilitas, tetapi juga mengejar pengalaman development yang lebih stabil di proyek nyata berskala besar.

Beberapa manfaat yang paling terasa dari Next.js 16.3 antara lain:

- Dev server lebih hemat memori, terutama untuk sesi development panjang.
- Build lebih cepat berkat persistent file system cache.
- Integrasi React Compiler berbasis Rust mulai tersedia untuk pengujian.
- `import.meta.glob` mempermudah workflow konten dan module discovery.
- HMR dan cold start dev server makin efisien.
- Runtime yang dikirim ke route menjadi lebih ramping.
- Monorepo mendapat fleksibilitas lebih baik lewat konfigurasi PostCSS lokal.

Bagi tim yang sudah memakai Turbopack, upgrade ke Next.js 16.3 kemungkinan besar akan langsung terasa, terutama pada aplikasi besar. Sementara bagi yang masih bertahan di Webpack, rilis ini menjadi sinyal kuat bahwa Turbopack semakin siap menjadi default bundler modern untuk Next.js.
