# Requirements Document

## Introduction

Dokumen ini mendefinisikan improvement plan menyeluruh untuk portfolio website **teguhcoding.com** milik Teguh Widodo (Senior Software Engineer). Website dibangun dengan Next.js 16 (canary), React 19, TypeScript, Tailwind CSS, dan Framer Motion.

Perbaikan mencakup empat area utama:
1. **Security** — kelemahan autentikasi admin panel yang kritis
2. **Correctness** — bug fungsional yang menyebabkan fitur tidak bekerja
3. **Performance** — optimasi rendering dan animasi
4. **Content & UX** — kelengkapan dan akurasi konten portfolio

---

## Glossary

- **Website**: Aplikasi web teguhcoding.com
- **Admin_Panel**: Halaman admin di route `/bahlil` untuk mengelola konten blog
- **Auth_System**: Sistem autentikasi berbasis cookie HTTP-only untuk admin panel
- **Auth_API**: Endpoint `POST /api/auth` yang memverifikasi password admin
- **Auth_Middleware**: Next.js middleware yang memvalidasi cookie autentikasi sebelum mengizinkan akses ke rute admin
- **Newsletter_API**: Endpoint API yang memproses subscription newsletter
- **Newsletter_Form**: Form email di footer website
- **OpenAI_Integration**: Integrasi dengan OpenAI API untuk generate konten blog
- **Blog_Generator**: Endpoint `POST /api/generate-post` yang menggunakan OpenAI untuk membuat artikel
- **Homepage**: Halaman utama (`/`) yang menampilkan Hero, FeaturedProjects, dan LatestBlog
- **Hero_Component**: Komponen hero di `components/hero.tsx` yang menampilkan profil Teguh Widodo
- **FeaturedProjects_Component**: Komponen di `components/featured-projects.tsx` yang menampilkan daftar proyek
- **LatestBlog_Component**: Komponen di `components/latest-blog.tsx` yang menampilkan artikel terbaru
- **Card_Component**: Setiap kartu animasi di FeaturedProjects_Component dan LatestBlog_Component
- **Experience_Page**: Halaman `/experience` yang menampilkan riwayat karir
- **Blog_Post**: Artikel yang dihasilkan dari konten eksternal via Admin_Panel
- **Skills_Section**: Seksi baru di Hero_Component yang menampilkan tech stack Teguh Widodo
- **Certification**: Data sertifikasi yang ditampilkan di halaman education
- **Unused_Dependency**: Package yang terdaftar di `package.json` tetapi tidak digunakan di codebase
- **Resend_API**: Email delivery service yang digunakan untuk contact form

---

## Requirements

### Requirement 1: Keamanan Autentikasi Admin Panel

**User Story:** Sebagai pemilik website, saya ingin admin panel saya aman dari unauthorized access, sehingga konten blog saya tidak bisa dimanipulasi oleh pihak lain.

#### Acceptance Criteria

1. THE Auth_API SHALL memverifikasi password yang dikirim dari login form dengan nilai yang tersimpan di environment variable `ADMIN_PASSWORD`.
2. WHEN password yang dikirim cocok dengan `ADMIN_PASSWORD`, THE Auth_System SHALL menyetel cookie HTTP-only bernama `auth_token` dengan nilai yang merupakan signed token atau random secure string, bukan string literal `"authenticated"`.
3. WHEN permintaan masuk ke route `/bahlil` atau sub-route-nya, THE Auth_Middleware SHALL memvalidasi nilai cookie `auth_token` terhadap secret yang hanya diketahui server — bukan hanya memeriksa keberadaan cookie.
4. IF cookie `auth_token` tidak ada atau nilainya tidak valid, THEN THE Auth_Middleware SHALL mengalihkan request ke halaman `/bahlil/login` dengan status 302.
5. IF environment variable `ADMIN_PASSWORD` tidak disetel, THEN THE Auth_API SHALL menolak setiap request login dengan status 500 dan pesan error yang informatif — ini berlaku untuk setiap attempt login, bukan hanya saat startup.
6. IF environment variable `ADMIN_PASSWORD` tidak disetel, THEN THE Auth_System SHALL juga memblokir request logout dengan mengembalikan status 500 untuk konsistensi.
6. WHEN admin melakukan logout, THE Auth_System SHALL menghapus cookie `auth_token` dengan cara menyetel `maxAge` ke 0.
7. THE Auth_System SHALL menggunakan cookie dengan atribut `httpOnly: true`, `secure: true` di production, dan `sameSite: 'lax'`.

---

### Requirement 2: Newsletter Form Berfungsi

**User Story:** Sebagai pengunjung website, saya ingin bisa berlangganan newsletter, sehingga saya mendapatkan update terbaru dari Teguh Widodo.

#### Acceptance Criteria

1. THE Newsletter_API SHALL menyediakan endpoint `POST /api/newsletter` yang menerima body JSON berisi field `email`.
2. WHEN request diterima dengan email yang valid secara format dan request telah diterima oleh server, THE Newsletter_API SHALL memproses subscription dan mengembalikan response sukses dengan status 200.
3. IF email yang dikirim tidak valid secara format, THEN THE Newsletter_API SHALL mengembalikan response error dengan status 422 dan pesan yang menjelaskan alasan penolakan.
4. WHEN pengguna mengisi email dan mengklik tombol "Subscribe" di Newsletter_Form, THE Newsletter_Form SHALL mengirim request ke Newsletter_API dan menampilkan feedback status (loading, sukses, atau error) kepada pengguna.
5. WHEN Newsletter_API berhasil memproses subscription, THE Newsletter_API SHALL mengirim email konfirmasi ke alamat yang disubscribe menggunakan Resend_API.
6. IF Resend_API tidak tersedia atau mengembalikan error, THEN THE Newsletter_API SHALL mengembalikan response error dengan status 503 — tidak boleh diam-diam gagal tanpa memberikan feedback.
7. THE Newsletter_Form SHALL menonaktifkan tombol "Subscribe" selama request sedang diproses untuk mencegah double submission.

---

### Requirement 3: OpenAI Model Name yang Benar

**User Story:** Sebagai admin, saya ingin Blog_Generator menggunakan model OpenAI yang valid, sehingga proses generate artikel tidak gagal karena nama model salah.

#### Acceptance Criteria

1. THE Blog_Generator SHALL menggunakan nama model OpenAI yang valid sebagai nilai default, yaitu `"gpt-4o-mini"` atau versi yang lebih baru yang tersedia.
2. WHEN field `model` tidak disertakan dalam request body, THE Blog_Generator SHALL menggunakan model default yang valid.
3. WHEN field `model` disertakan dalam request body, THE Blog_Generator SHALL menggunakan nilai model tersebut.
4. IF OpenAI API mengembalikan error karena nama model tidak ditemukan, THEN THE Blog_Generator SHALL mengembalikan response error dengan status 422 dan pesan yang menyebutkan bahwa nama model tidak valid.
5. THE Blog_Generator SHALL menghapus import `fs` dan `path` yang tidak digunakan dari file route handler.

---

### Requirement 4: Penyelesaian Kontradiksi Cache Homepage

**User Story:** Sebagai developer, saya ingin konfigurasi cache homepage konsisten, sehingga perilaku rendering dapat diprediksi dan tidak menyebabkan build error atau perilaku tak terduga di production.

#### Acceptance Criteria

1. THE Homepage SHALL menggunakan satu strategi rendering yang konsisten — tidak boleh menggabungkan `export const dynamic = "force-static"` dan `export const revalidate = 60` secara bersamaan dalam satu file.
2. WHERE blog posts perlu diperbarui secara berkala tanpa full rebuild, THE Homepage SHALL menggunakan strategi Incremental Static Regeneration dengan `export const revalidate = 60` tanpa `force-static`.
3. WHEN build dijalankan, THE Homepage SHALL berhasil di-build — namun build boleh selesai meskipun terdapat warning terkait konfigurasi rendering selama tidak ada runtime error.

---

### Requirement 5: Animasi Framer Motion Berbasis Viewport

**User Story:** Sebagai pengunjung website, saya ingin animasi card hanya berjalan saat elemen masuk ke layar, sehingga performa halaman lebih baik dan animasi tidak terlewatkan karena sudah berjalan sebelum elemen terlihat.

#### Acceptance Criteria

1. THE Card_Component di FeaturedProjects_Component SHALL menggunakan `whileInView` (bukan `animate`) untuk trigger animasi masuk, dengan prop `viewport={{ once: true }}`.
2. THE Card_Component di LatestBlog_Component SHALL menggunakan `whileInView` (bukan `animate`) untuk trigger animasi masuk, dengan prop `viewport={{ once: true }}`.
3. WHEN elemen Card_Component belum masuk ke viewport, THE Card_Component SHALL berada dalam state tersembunyi (opacity 0, y offset positif).
4. WHEN elemen Card_Component memasuki viewport untuk pertama kali, THE Card_Component SHALL menjalankan animasi masuk sekali saja.
5. THE heading section di FeaturedProjects_Component dan LatestBlog_Component SHALL juga menggunakan `whileInView` dengan `viewport={{ once: true }}`.
6. THE `whileInView` animation requirement SHALL diterapkan hanya pada Card_Component yang berada di dalam FeaturedProjects_Component dan LatestBlog_Component — bukan semua komponen di website.

---

### Requirement 6: Akurasi Data Karir di Experience Page

**User Story:** Sebagai pengunjung website, saya ingin melihat riwayat karir Teguh Widodo yang akurat dan tidak ambigu, sehingga saya mendapatkan gambaran profesional yang tepat.

#### Acceptance Criteria

1. THE Experience_Page SHALL menampilkan data karir yang tidak memiliki tumpang tindih periode waktu yang tidak dijelaskan.
2. THE Experience_Page SHALL memperbarui entri "PT Hijau Digital International" untuk tidak lagi menampilkan "Present" jika posisi di Capio Teknologi Indonesia (May 2025) sudah menjadi posisi aktif terkini.
3. WHEN periode pekerjaan ditampilkan, THE Experience_Page SHALL menggunakan tanggal akhir yang eksplisit untuk posisi yang sudah berakhir (bukan "Present").
4. THE Experience_Page SHALL menampilkan urutan pengalaman dari yang paling baru ke yang paling lama secara kronologis konsisten.

---

### Requirement 7: Disclaimer Blog sebagai Content Aggregator

**User Story:** Sebagai pengunjung website dan search engine, saya ingin mengetahui bahwa artikel blog bersumber dari konten eksternal yang di-rephrase, sehingga tidak ada kesan konten tersebut adalah tulisan original dan SEO tidak terdampak negatif.

#### Acceptance Criteria

1. THE Blog_Post SHALL menampilkan disclaimer yang jelas bahwa konten artikel berasal dari sumber eksternal, bersama dengan link ke `source_url` yang tersimpan di frontmatter.
2. WHEN Blog_Post ditampilkan, THE Blog_Post SHALL menyertakan tag `<link rel="canonical">` yang mengarah ke `source_url` original untuk mencegah duplicate content penalty dari search engine.
3. THE Blog_Post SHALL menampilkan teks disclaimer seperti: "Artikel ini adalah ringkasan dari sumber eksternal. Baca artikel asli di: [URL]".
4. IF `source_url` tidak ada di frontmatter blog post, THEN THE Blog_Post SHALL tidak menampilkan disclaimer dan tidak menyertakan canonical tag ke sumber eksternal.
5. WHEN `source_url` pada Blog_Post mengarah ke domain eksternal, THE Blog_Post SHALL menggunakan `robots` meta tag dengan direktif `NOINDEX` untuk mencegah indexing konten duplikat oleh search engine.

---

### Requirement 8: Perluasan dan Dinamisme Data Projects

**User Story:** Sebagai pengunjung website, saya ingin melihat portfolio proyek yang lengkap dan mudah diperbarui, sehingga saya mendapatkan gambaran nyata tentang kemampuan dan pengalaman Teguh Widodo.

#### Acceptance Criteria

1. THE FeaturedProjects_Component SHALL dapat menampilkan lebih dari 3 proyek, minimal menampilkan seluruh proyek yang tersedia di data source.
2. THE Website SHALL menyediakan mekanisme pengelolaan data proyek yang tidak mengharuskan perubahan kode (file TypeScript) untuk menambah proyek baru.
3. WHEN halaman `/projects` diakses, THE Projects_Page SHALL menampilkan semua proyek yang tersedia dengan informasi lengkap.
4. THE Projects_Page SHALL menampilkan informasi teknologi yang digunakan, deskripsi singkat, dan link demo untuk setiap proyek.

---

### Requirement 9: Skills & Tech Stack Section di Hero

**User Story:** Sebagai pengunjung website, saya ingin langsung melihat tech stack utama Teguh Widodo di halaman utama, sehingga saya bisa cepat menilai kesesuaian keahlian tanpa harus navigasi ke halaman lain.

#### Acceptance Criteria

1. THE Hero_Component SHALL menampilkan Skills_Section yang memuat daftar teknologi utama Teguh Widodo, minimal mencakup: Next.js, React, TypeScript, Laravel, NestJS, dan Tailwind CSS.
2. THE Skills_Section SHALL ditampilkan di bawah deskripsi profil dan di atas CTA buttons dalam Hero_Component.
3. THE Skills_Section SHALL menggunakan visual representasi yang jelas (badge, tag, atau icon) untuk membedakan setiap skill.
4. WHEN halaman utama diakses, THE Skills_Section SHALL tampil tanpa membutuhkan interaksi dari pengguna.

---

### Requirement 10: Internasionalisasi Atribut HTML Lang

**User Story:** Sebagai screen reader user dan search engine crawler, saya ingin atribut `lang` pada tag HTML mencerminkan bahasa konten yang sebenarnya, sehingga aksesibilitas dan SEO tidak terdampak negatif.

#### Acceptance Criteria

1. THE Website SHALL menggunakan `lang="id"` pada tag `<html>` di `app/layout.tsx` karena mayoritas konten website menggunakan Bahasa Indonesia.
2. WHERE konten dalam Bahasa Inggris terdapat di dalam halaman berbahasa Indonesia, THE Website SHOULD menggunakan atribut `lang="en"` pada elemen spesifik tersebut.
3. WHEN metadata Open Graph dibuat, THE Website SHALL menggunakan `locale: "id_ID"` yang sudah konsisten dengan konten — nilai ini sudah benar dan harus dipertahankan.

---

### Requirement 11: Perbaikan Certification Links

**User Story:** Sebagai pengunjung website, saya ingin bisa mengklik link sertifikasi untuk memverifikasi kredensial Teguh Widodo, sehingga saya bisa memvalidasi keahlian yang diklaim.

#### Acceptance Criteria

1. THE Education_Page SHALL menampilkan link sertifikasi yang mengarah ke URL verifikasi yang valid dan aktif — bukan `"#"` atau string kosong.
2. WHEN link sertifikasi diklik, THE Education_Page SHALL membuka URL verifikasi di tab baru.
3. IF URL verifikasi untuk sertifikasi tertentu tidak tersedia, THEN THE Education_Page SHALL menyembunyikan link sepenuhnya — tidak menampilkan disabled link atau placeholder text.
4. THE Education_Page SHALL menggunakan atribut `target="_blank"` dan `rel="noopener noreferrer"` pada semua external certification links.

---

### Requirement 12: Perbaikan Image Priority di Hero Component

**User Story:** Sebagai developer, saya ingin komponen Hero menggunakan prop Next.js Image yang benar, sehingga tidak ada warning saat build dan LCP (Largest Contentful Paint) dioptimalkan dengan benar.

#### Acceptance Criteria

1. THE Hero_Component SHALL menggunakan prop `priority` (bukan `preload`) pada komponen `<Image>` untuk foto profil, sesuai dengan Next.js Image API.
2. WHEN halaman utama diload, THE Hero_Component SHALL mem-preload gambar profil dengan benar menggunakan `priority={true}`.
3. THE Hero_Component SHALL tidak menggunakan prop yang tidak dikenal atau deprecated pada komponen `<Image>` dari Next.js.

---

### Requirement 13: Penghapusan TypeScript `any` di API Routes

**User Story:** Sebagai developer, saya ingin API routes menggunakan TypeScript types yang tepat, sehingga type safety terjaga dan potensi runtime error lebih mudah terdeteksi.

#### Acceptance Criteria

1. THE Blog_Generator SHALL mendefinisikan tipe eksplisit untuk response dari OpenAI API, menggantikan penggunaan `error: any` di catch block.
2. WHEN catch block menangkap exception di API routes, THE API_Route SHALL menggunakan type guard `error instanceof Error ? error.message : String(error)` — type assertion `error as Error` tidak diperbolehkan.
3. THE Website SHALL tidak memiliki penggunaan tipe `any` yang eksplisit di file-file dalam direktori `app/api/`.

---

### Requirement 14: Pembersihan Unused Dependencies

**User Story:** Sebagai developer, saya ingin package.json hanya berisi dependencies yang benar-benar digunakan, sehingga bundle size lebih kecil dan waktu install lebih cepat.

#### Acceptance Criteria

1. THE Website SHALL tidak mengimpor komponen individual dari Radix UI packages yang tidak digunakan di halaman manapun — namun mengimpor seluruh package tetap diperbolehkan jika sebagian komponennya digunakan.
2. THE Website SHALL tidak mengimpor dari package `recharts` jika tidak ada komponen chart yang ditampilkan.
3. WHEN audit dependency dijalankan, THE Website SHALL tidak memiliki komponen UI di `components/ui/` yang tidak diimpor oleh komponen manapun di `app/` atau `components/`.
4. THE `package.json` SHALL tidak mendaftarkan dependency yang tidak digunakan di `dependencies` atau `devDependencies`.
