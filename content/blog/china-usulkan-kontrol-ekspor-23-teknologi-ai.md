---
title: "China Usulkan Kontrol Ekspor untuk 23 Teknologi AI"
source_url: "https://www.mofcom.gov.cn/zwgk/zcjd/art/2026/art_b11d5c1e9374421e93e85dc87eba6e38.html"
tags: ["AI", "Regulasi", "Open Source"]
date: "2026-10-18T13:14:41.000Z"
cover_image: "/posts/china-ai-export-controls-cover.svg"
---

China mengusulkan penambahan 23 teknologi AI ke katalog ekspor yang dilarang atau dibatasi, termasuk teknologi untuk model besar, agen AI, klaster komputasi, dan pemrosesan informasi. Rancangan yang diumumkan pada 16 Oktober itu masih dibuka untuk masukan sampai 15 November. Pada saat yang sama, pemerintah sudah memberlakukan pendaftaran sementara sebelum ekspor untuk teknologi yang tercantum dalam lampiran pengumuman.

![Ilustrasi rancangan aturan ekspor teknologi AI China dan perbedaan antara layanan API dengan transfer teknologi](/posts/china-ai-export-controls-cover.svg)

*Ilustrasi konseptual Teguhcoding berdasarkan rancangan dan penjelasan MOFCOM; bukan dokumen resmi.*

## Bukan larangan untuk semua model AI China

Kementerian Perdagangan China (MOFCOM) dan Kementerian Sains dan Teknologi memasukkan 40 teknologi dari tiga bidang ke dalam rancangan katalog: 23 terkait AI, lima biomedis, dan 12 fotovoltaik. Untuk AI, daftar itu mencakup model besar, agen, klaster komputasi, dan teknologi pemrosesan informasi.

Rancangan yang dibahas [Associated Press](https://apnews.com/article/china-export-restrictions-ai-chips-solar-us-5ac381c0c6d6628bbea2e0da7d855a5b) menyasar teknologi inti untuk model yang dilatih dengan data nasional sensitif serta agen yang ditujukan bagi pertahanan atau infrastruktur informasi kritis. Model dengan dua triliun parameter atau kemampuan yang dinilai terdepan di dunia juga dapat masuk kategori terbatas. Dokumen itu tidak menyebut merek model tertentu.

Jadi, kabar ini belum berarti Qwen, DeepSeek, atau semua model China akan berhenti tersedia di luar negeri. Fokus aturannya adalah pemindahan teknologi dari China ke luar negeri—misalnya pengalihan kepemilikan atau pemberian lisensi—bukan sekadar penggunaan model oleh orang di negara lain.

![Bagan ringkas: akses API dan teknologi yang sudah masuk domain publik dibedakan dari pemindahan teknologi yang tercakup dalam rancangan](/posts/china-ai-export-controls-scope.svg)

*Ringkasan konseptual dari tanya jawab resmi MOFCOM. Cakupan akhir tetap bergantung pada aturan yang disahkan.*

## Model yang sudah dibuka dan layanan API mendapat perlakuan berbeda

Dalam [tanya jawab resminya](https://www.mofcom.gov.cn/zwgk/zcjd/art/2026/art_b11d5c1e9374421e93e85dc87eba6e38.html), MOFCOM menyebut teknologi yang sudah masuk ranah publik melalui rilis open source atau publikasi akademik tidak akan dimasukkan ke pengelolaan ekspor. Untuk teknologi AI baru yang diekspor lewat rilis open source, kementerian menyebut jalur lisensi otomatis sebagai kemudahan. Artinya, pengecualian bagi teknologi yang sudah terbuka berbeda dari prosedur untuk ekspor teknologi baru.

MOFCOM juga mengatakan pemakaian model terbatas lewat API, aplikasi, situs web, atau SaaS tidak dihitung sebagai ekspor teknologi model. Sebaliknya, menempatkan model secara lokal di luar China termasuk dalam cakupan pengelolaan; deployment di cloud milik perusahaan sendiri dapat memakai lisensi otomatis pada kondisi tertentu.

Untuk developer yang memakai model China dari Indonesia, perbedaan ini penting: memanggil model lewat API tidak sama dengan membawa bobot model atau melisensikan teknologi ke entitas luar negeri. Penjelasan itu mengikuti posisi pemerintah China dalam rancangan ini; ketentuan lain dari penyedia layanan atau negara tempat developer beroperasi tetap berlaku secara terpisah.

## Pendaftaran sementara sudah berlaku

Meski revisi katalog masih berupa rancangan, [pengumuman bersama nomor 48](https://www.mofcom.gov.cn/zcfb/dwmygl/art/2026/art_61446ab4beee4f63973d4d0ab3097648.html) menetapkan pendaftaran sebelum ekspor sejak 16 Oktober untuk teknologi yang dicantumkan di lampirannya. Pendaftaran sementara ini berlaku sampai revisi katalog resmi diterapkan. Di antaranya, kewajiban itu mencakup pengalihan hak teknologi ke luar negeri, lisensi penggunaan kepada pihak luar negeri, dan perubahan kepemilikan atau kendali kepada entitas asing.

Jendela masukan publik berlangsung sampai 15 November, jadi daftar maupun batas teknisnya masih dapat berubah. Perusahaan yang mengirim teknologi dari China perlu membaca lampiran dan memeriksa apakah produknya masuk cakupan; label “model AI” saja belum cukup untuk menentukan kewajibannya.

Perdebatan di [r/LocalLLaMA](https://www.reddit.com/r/LocalLLaMA/comments/1x7g3zq/china_proposes_export_controls_on_23_ai/) banyak berkisar pada dampaknya terhadap bobot model terbuka berikutnya. Sebagian pembaca menilai batas dua triliun parameter akan menyasar hanya model terbesar; yang lain mengingatkan bahwa ukuran bukan satu-satunya pemicu karena rancangan juga memakai kriteria kemampuan global. Buat pengguna model yang sudah tersedia, draf ini belum mengubah akses hari ini. Yang patut dipantau adalah versi final katalog dan cara lisensi otomatis diterapkan untuk model baru.
