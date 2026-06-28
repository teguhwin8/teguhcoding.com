---
title: "GLM-5.2 Hanya Sebagus Prompt Anda Saat Review Kode"
source_url: "https://blog.kilo.ai/p/glm-52s-code-reviews-are-only-as?ref=dailydev"
tags: ["AI","Code Review","LLM"]
date: "2026-06-28T15:48:22.892Z"
cover_image: "https://substackcdn.com/image/fetch/$s_!LLUV!,w_1200,h_675,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7224b676-7a63-4eb0-9c45-10e971de7ae0_6006x3894.png"
---

# GLM-5.2 Hanya Sebagus Prompt Anda Saat Review Kode

GLM-5.2 dari Z.ai memang menarik perhatian sejak dirilis sebagai salah satu model open-weight yang cukup kuat untuk tugas coding. Di Kilo, model ini bahkan dijadikan daily driver untuk melihat seberapa jauh performanya dalam pekerjaan pengembangan nyata. Tapi ada satu temuan yang cukup konsisten muncul: kualitas code review-nya bisa berubah jauh tergantung prompt yang diberikan.

Dalam eksperimen ini, tim menguji apakah masalah tersebut berasal dari prompt yang kurang tepat, atau memang ada keterbatasan yang lebih mendasar pada modelnya. Hasilnya cukup jelas: **cara Anda meminta review jauh lebih berpengaruh daripada seberapa dalam model "berpikir"**.

## Cara Pengujian Dilakukan

Pengujian dimulai dengan membangun backend kecil dalam TypeScript menggunakan **Bun, Hono, Drizzle, dan SQLite**. Aplikasinya mencakup fitur umum seperti:

- manajemen user
- autentikasi
- task management
- pencarian
- bulk operations
- ekspor CSV

Setelah perilaku yang benar dikunci lewat test suite, tim sengaja menyisipkan bug ke dalam kode. Dari situ, GLM-5.2 diminta melakukan audit kode melalui Kilo Code CLI.

Setiap kode yang rusak kemudian dinilai berdasarkan apakah model benar-benar menemukan masalah yang spesifik, bukan sekadar memberi komentar umum. Pengujian dilakukan dengan tiga tingkat reasoning:

- **low**
- **medium**
- **high**

Lalu prompt-nya juga divariasikan menjadi tiga gaya:

1. **Casual** – kesan seperti minta tolong rekan kerja lihat kode yang terasa sudah rapi
2. **Consistency-focused** – fokus pada bug nyata, keamanan, dan konsistensi perilaku
3. **Strict production** – seolah sedang memblokir atau menyetujui pull request produksi

## Hasil Round 1: GLM-5.2 Tampil Kuat

Pada kode base pertama, tim menanam **16 bug** yang tergolong cukup jelas dan berbahaya, misalnya:

- SQL injection pada query pencarian
- pencarian user yang ikut membocorkan password hash
- export admin yang tidak dicek autentikasinya
- celah otorisasi yang membuat user bisa mengubah task milik orang lain
- CSV formula injection
- bug pagination off-by-one
- sejumlah masalah akurasi pada bulk operation

Di ronde ini, GLM-5.2 tampil impresif. Ia mampu menangkap hampir semua bug serius dan bahkan konsisten di berbagai variasi prompt maupun tingkat reasoning. Skornya berada di kisaran **13 hingga 15 dari 16 bug** pada setiap run.

Artinya, untuk codebase yang relatif lurus dan bug yang sifatnya cukup langsung, GLM-5.2 memang bisa berperan sebagai reviewer yang tajam. Di skenario seperti ini, prompt tidak terlalu banyak mengubah hasil.

## Round 2: Saat Bug Menjadi Lebih Halus, Performanya Mulai Turun

Setelah itu, proyek dibuat lebih kompleks. Fitur baru seperti berikut ditambahkan:

- **soft deletion** lewat `deletedAt`
- **archive flag** untuk menyembunyikan data tanpa benar-benar menghapus
- **optimistic concurrency** menggunakan version number
- **status state machine** untuk task
- **audit log** untuk mencatat siapa melakukan perubahan

Lalu disisipkan **10 bug yang jauh lebih subtil**. Bug-bug ini bukan tipe yang mudah ditemukan oleh scanner atau sekadar pembacaan cepat. Banyak di antaranya hanya terlihat kalau reviewer benar-benar memahami perilaku sistem secara utuh.

Beberapa contoh bug yang ditanam:

- endpoint delete ternyata hanya mengarsipkan task, bukan mengisi `deletedAt`
- pengecekan version untuk optimistic locking justru terbalik
- guard permission yang seharusnya mencegah user biasa membuka task selesai ternyata tidak pernah benar-benar aktif
- audit log salah mencatat actor
- archived task masih muncul di hasil pencarian, export CSV, dan daftar overdue

Di sinilah hasil GLM-5.2 mulai berubah. Ia masih menemukan sejumlah bug, tetapi **cakupannya turun**. Yang lebih menarik, hasilnya juga makin dipengaruhi oleh bagaimana prompt diformulasikan.

## Wording Prompt Lebih Berpengaruh daripada Reasoning

Temuan paling penting dari eksperimen ini bukan sekadar bahwa model bisa miss bug. Yang lebih penting: **framing prompt ternyata lebih menentukan daripada effort reasoning**.

Prompt dengan gaya **strict production** tidak justru menghasilkan review terbaik untuk bug yang ditanam. Sebaliknya, framing itu mendorong GLM-5.2 masuk ke mode security hardening review. Model jadi lebih fokus mencari hal-hal seperti:

- hardcoded fallback secret
- password hashing yang lemah
- missing rate limiting
- transaksi yang hilang

Semua itu memang masalah nyata dan layak diperbaiki, tetapi bukan bug utama yang sengaja ditanam untuk diuji. Akibatnya, perhatian model sedikit bergeser dari problem perilaku produk yang sebenarnya ingin dinilai.

Sementara itu, prompt yang lebih **casual** atau **consistency-focused** justru memberi hasil sedikit lebih baik pada bug yang diincar. Alasannya sederhana: model tetap diarahkan untuk memeriksa perilaku kode, bukan menyusun checklist keamanan yang terlalu luas.

## Bug yang Mudah Ditangkap vs Bug yang Membutuhkan Konteks Sistem

Dari hasil pengujian, pola kemampuannya terlihat cukup jelas.

### Bug yang relatif konsisten ditangkap

- delete yang hanya mengarsipkan, bukan soft-delete
- version check yang terbalik
- guard permission yang tidak pernah bisa aktif
- actor yang salah di audit log
- ketidakkonsistenan penamaan aksi audit saat bulk archive

Bug-bug ini cenderung lokal. Artinya, cukup dengan membaca satu fungsi atau satu alur logika, model sudah punya peluang besar untuk menangkapnya.

### Bug yang sering terlewat

- archived task tetap muncul di default search
- archived task tetap masuk ke export
- archived task masih muncul di daftar overdue

Bug seperti ini berbeda. Untuk menemukannya, reviewer harus memahami aturan produk secara menyeluruh: apa arti archived, kapan data harus disembunyikan, dan endpoint mana saja yang wajib mengikuti aturan itu. Tidak ada satu baris kode yang secara eksplisit menjelaskan semuanya. Model harus menyatukan konteks dari beberapa file dan rute sekaligus.

Di titik inilah GLM-5.2 mulai kurang stabil.

## Kesimpulan: Kuat di Bug Lokal, Lemah di Aturan Produk Lintas File

Eksperimen ini menunjukkan bahwa GLM-5.2 memang cukup solid untuk code review, terutama ketika masalahnya berada dalam satu fungsi atau satu unit logika yang jelas. Tetapi begitu bug menyebar lintas endpoint, lintas file, atau bergantung pada aturan produk yang harus diingat secara menyeluruh, performanya menurun.

Yang paling penting, hasil review-nya **sangat dipengaruhi oleh prompt**. Kalau prompt terlalu mengarah ke audit keamanan, model bisa kehilangan fokus pada bug produk yang sebenarnya ingin dicari. Kalau prompt-nya lebih menekankan konsistensi perilaku dan real bug, hasilnya cenderung lebih relevan.

Buat tim engineering yang ingin memakai model seperti GLM-5.2 untuk code review, pelajarannya cukup praktis: **prompt bukan detail kecil, tapi bagian inti dari workflow review itu sendiri**.

Kalau framing-nya tepat, model bisa sangat membantu. Kalau framing-nya meleset, ia masih akan menemukan masalah—hanya saja bukan masalah yang sedang Anda cari.
