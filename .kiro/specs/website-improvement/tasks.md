# Implementation Plan: Website Improvement

## Overview

Rencana implementasi ini mencakup 14 requirement perbaikan untuk teguhcoding.com, dikelompokkan ke dalam 5 phase berdasarkan prioritas dan dependency. Phase dimulai dari perubahan tanpa dependency (quick wins), dilanjutkan ke correctness bugs, performance, content, security, dan diakhiri dengan fitur baru. Setiap task cukup granular untuk dikerjakan dalam satu sesi dan mereferensikan file spesifik yang dimodifikasi.

## Tasks

---

### Phase 1 — Quick Wins (No Dependencies)

- [ ] 1. Perbaiki atribut HTML lang dan Image priority di Hero

  - [ ] 1.1 Ubah `lang="en"` menjadi `lang="id"` di `app/layout.tsx`
    - Temukan baris `<html lang="en" suppressHydrationWarning>` dan ganti menjadi `lang="id"`
    - Pertahankan `locale: "id_ID"` di metadata OpenGraph yang sudah benar
    - _Requirements: 10.1_

  - [ ] 1.2 Ganti prop `preload` menjadi `priority` pada `<Image>` di `components/hero.tsx`
    - Cari `<Image src="/teguh.jpg"` dan ubah prop `preload` menjadi `priority`
    - `preload` bukan prop valid Next.js Image — ini menyebabkan TypeScript warning dan tidak ada efek
    - _Requirements: 12.1, 12.2, 12.3_

- [ ] 2. Perbaiki nama model OpenAI dan bersihkan unused imports di Blog Generator

  - [ ] 2.1 Ganti model default dan hapus unused imports di `app/api/generate-post/route.ts`
    - Hapus baris `import fs from 'fs'` dan `import path from 'path'` yang tidak digunakan
    - Ubah `const selectedModel = model || "gpt-5.4-mini"` menjadi `model || "gpt-4o-mini"`
    - Tambahkan penanganan error untuk kasus model tidak ditemukan di OpenAI (status 422)
    - _Requirements: 3.1, 3.2, 3.3, 3.5_

  - [ ] 2.2 Fix TypeScript `error: any` di `app/api/generate-post/route.ts`
    - Ubah `catch (error: any)` menjadi `catch (error: unknown)`
    - Ganti `error.message` dengan `error instanceof Error ? error.message : String(error)`
    - Audit `app/api/contact/route.ts` dan `app/api/articles/route.ts` untuk pola `any` yang sama, perbaiki jika ditemukan
    - _Requirements: 13.1, 13.2, 13.3_

  - [ ]* 2.3 Write property test untuk error handler API routes
    - **Property 8: Error handler converts any thrown value to string**
    - Gunakan `fc.oneof(fc.string(), fc.integer(), fc.constant(null), fc.constant(undefined), fc.record({ message: fc.string() }))` sebagai arbitrary thrown value
    - Verifikasi bahwa fungsi helper `error instanceof Error ? error.message : String(error)` selalu mengembalikan string tanpa melempar exception baru
    - **Validates: Requirements 13.2**

- [ ] 3. Resolve cache strategy contradiction di Homepage

  - [ ] 3.1 Hapus `export const dynamic = "force-static"` dari `app/page.tsx`
    - Cari baris `export const dynamic = "force-static"` dan hapus
    - Pertahankan `export const revalidate = 60` untuk ISR (Incremental Static Regeneration)
    - Keduanya tidak boleh hadir bersamaan — `force-static` mengalahkan `revalidate` dan mencegah periodic update
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 4. Perbaiki data karir di Experience Page

  - [ ] 4.1 Update entri PT Hijau Digital International dan urutkan array kronologis di `app/experience/page.tsx`
    - Ubah `period: "March 2019 – Present"` menjadi `period: "March 2019 – April 2025"` untuk entri Hijau Digital
    - Susun ulang array `experiences` berdasarkan tanggal mulai terbaru: Capio (May 2025) → Majoo (Jan 2022) → Hijau Digital (Mar 2019) → Politeknik (Jan 2018)
    - Verifikasi tidak ada entri lain yang masih menampilkan "Present" untuk posisi yang sudah berakhir
    - _Requirements: 6.1, 6.2, 6.3, 6.4_

- [ ] 5. Perbaiki Certification Links di Education Page

  - [ ] 5.1 Update tipe data dan conditional rendering sertifikasi di `app/education/page.tsx`
    - Tambah interface `Certification` dengan field `link?: string | null`
    - Ubah semua entries yang memiliki `link: "#"` menjadi `link: null` (tidak ada URL verifikasi nyata yang tersedia)
    - Tambah rendering conditional: tampilkan elemen `<a>` hanya jika `cert.link` truthy, menggunakan `target="_blank"` dan `rel="noopener noreferrer"`
    - Sembunyikan link sepenuhnya jika tidak ada URL — jangan render disabled link atau placeholder `#`
    - _Requirements: 11.1, 11.2, 11.3, 11.4_

- [ ] 6. Audit dan hapus unused dependencies

  - [ ] 6.1 Audit `components/ui/` untuk file yang tidak memiliki importor
    - Buat daftar semua file `.tsx` di `components/ui/`
    - Untuk setiap file, cari apakah ada impor dari `app/` atau `components/` menggunakan `grep`
    - Tandai file yang tidak memiliki importor sebagai kandidat hapus
    - _Requirements: 14.1, 14.3_

  - [ ]* 6.2 Write property test untuk UI component import coverage
    - **Property 9: All UI components have at least one importer**
    - Enumerate semua file `.tsx` di `components/ui/` menggunakan `fs.readdirSync`
    - Untuk setiap file, scan semua file di `app/` dan `components/` menggunakan `fs.readFileSync` + string search
    - Verifikasi setiap file memiliki setidaknya satu importor — file tanpa importor adalah unused
    - **Validates: Requirements 14.3**

  - [ ] 6.3 Hapus unused `components/ui/` files dan Radix UI packages yang tidak lagi digunakan
    - Hapus setiap file `components/ui/*.tsx` yang tidak memiliki importor (hasil dari task 6.1)
    - Map setiap file yang dihapus ke Radix UI package-nya, hapus package dari `package.json` jika semua komponennya sudah dihapus
    - Verifikasi `recharts` tidak digunakan di `app/` atau `components/` — jika tidak ada chart, hapus dari `package.json`
    - _Requirements: 14.1, 14.2, 14.4_

- [ ] 7. Checkpoint Phase 1 — Verifikasi quick wins
  - Jalankan `npm run build` dan pastikan tidak ada TypeScript error
  - Pastikan tidak ada `preload` prop, `force-static`, `"Present"` di Hijau Digital, `link: "#"` di sertifikasi, atau `error: any` di `app/api/`
  - Tanyakan ke user jika ada pertanyaan sebelum melanjutkan ke Phase 2.

---

### Phase 2 — Performance

- [ ] 8. Ubah animasi Framer Motion ke viewport-based di FeaturedProjects

  - [ ] 8.1 Ganti `animate` menjadi `whileInView` pada heading dan card di `components/featured-projects.tsx`
    - Ubah `motion.h2`: ganti `animate={{ opacity: 1, y: 0 }}` menjadi `whileInView={{ opacity: 1, y: 0 }}` dan tambah `viewport={{ once: true }}`
    - Ubah setiap `motion.div` yang membungkus project card dengan pola yang sama
    - Pertahankan `initial={{ opacity: 0, y: 20 }}` dan `transition` yang sudah ada
    - _Requirements: 5.1, 5.3, 5.4, 5.5, 5.6_

- [ ] 9. Ubah animasi Framer Motion ke viewport-based di LatestBlog

  - [ ] 9.1 Ganti `animate` menjadi `whileInView` pada heading dan card di `components/latest-blog.tsx`
    - Ubah `motion.h2`: ganti `animate={{ opacity: 1, y: 0 }}` menjadi `whileInView={{ opacity: 1, y: 0 }}` dan tambah `viewport={{ once: true }}`
    - Ubah setiap `motion.div` yang membungkus `ArticleCard` dengan pola yang sama
    - Pertahankan `initial={{ opacity: 0, y: 20 }}` dan `transition` yang sudah ada
    - _Requirements: 5.2, 5.3, 5.4, 5.5, 5.6_

---

### Phase 3 — Content & UX

- [ ] 10. Tambah Blog Disclaimer dan SEO NOINDEX di Blog Post

  - [ ] 10.1 Tambah disclaimer UI di `app/blog/[slug]/page.tsx`
    - Di dalam `<article>`, tambahkan blok disclaimer di atas konten `<ReactMarkdown>` jika `post.source_url` ada
    - Tampilkan teks: "⚠️ Artikel ini adalah ringkasan dari sumber eksternal." dengan link ke `source_url` menggunakan `target="_blank" rel="noopener noreferrer"`
    - Kondisi: hanya tampilkan jika `post.source_url` truthy (non-empty string)
    - _Requirements: 7.1, 7.3, 7.4_

  - [ ] 10.2 Tambah canonical tag dan robots NOINDEX di `generateMetadata()` pada `app/blog/[slug]/page.tsx`
    - Di dalam `generateMetadata()`, tambah `alternates: { canonical: post.source_url }` jika `post.source_url` ada
    - Tambah `robots: { index: false, follow: true }` jika `post.source_url` ada dan merupakan external domain
    - Jika `post.source_url` tidak ada, jangan tambahkan `alternates` atau robots override
    - _Requirements: 7.2, 7.5_

  - [ ]* 10.3 Write property test untuk blog disclaimer presence
    - **Property 5: Blog post disclaimer presence matches source_url presence**
    - Gunakan `fc.record({ source_url: fc.webUrl() })` untuk post dengan source URL
    - Gunakan `fc.record({ source_url: fc.constant('') })` dan `fc.record({ source_url: fc.constant(undefined) })` untuk post tanpa source URL
    - Verifikasi: post dengan `source_url` → disclaimer ada di HTML output dan metadata mengandung `noindex`
    - Verifikasi: post tanpa `source_url` → tidak ada disclaimer, tidak ada `noindex`
    - **Validates: Requirements 7.1, 7.2, 7.4, 7.5**

- [ ] 11. Migrasi Project Data ke JSON dan perbarui FeaturedProjects

  - [ ] 11.1 Buat `types/project.ts` dengan interface Project
    - Definisikan interface `Project` dengan field: `id`, `title`, `description`, `longDescription`, `features`, `image`, `link`, `slug`, `technologies`, `demo`
    - Export interface sebagai named export
    - _Requirements: 8.2_

  - [ ] 11.2 Buat `data/projects.json` dengan semua project data
    - Pindahkan ketiga proyek dari `lib/projects.ts` ke `data/projects.json` dalam format array JSON
    - Pastikan semua field sesuai dengan interface `Project` di `types/project.ts`
    - Tambahkan minimal satu proyek baru untuk memvalidasi mekanisme penambahan via JSON
    - _Requirements: 8.2, 8.3_

  - [ ] 11.3 Update `lib/projects.ts` untuk import dari JSON
    - Ganti hardcoded array dengan `import projectsData from '@/data/projects.json'`
    - Tambah type assertion: `export const projects: Project[] = projectsData`
    - Pastikan `tsconfig.json` mengizinkan `resolveJsonModule: true` (sudah umum di Next.js)
    - _Requirements: 8.1, 8.2_

  - [ ]* 11.4 Write property test untuk FeaturedProjects renders all items
    - **Property 6: FeaturedProjects renders all available projects**
    - Gunakan `fc.array(fc.record({ id: fc.nat(), title: fc.string({ minLength: 1 }), description: fc.string(), image: fc.constant('/test.jpg'), link: fc.string(), slug: fc.string(), technologies: fc.array(fc.string()), demo: fc.webUrl() }), { minLength: 1, maxLength: 20 })` sebagai arbitrary project data
    - Render `FeaturedProjects` dengan mock data tersebut dan verifikasi jumlah card = panjang array
    - **Validates: Requirements 8.1**

  - [ ]* 11.5 Write property test untuk project card required fields
    - **Property 7: Project card renders all required fields**
    - Gunakan `fc.record({ title: fc.string({ minLength: 1 }), description: fc.string({ minLength: 1 }), technologies: fc.array(fc.string({ minLength: 1 }), { minLength: 1 }), demo: fc.webUrl() })` sebagai arbitrary project
    - Render satu project card dan verifikasi output HTML mengandung title, description, technologies, dan demo link
    - **Validates: Requirements 8.4**

- [ ] 12. Tambah Skills Section di Hero Component

  - [ ] 12.1 Tambahkan `SkillsSection` di `components/hero.tsx`
    - Definisikan array `skills` yang minimal berisi: `"Next.js"`, `"React"`, `"TypeScript"`, `"Laravel"`, `"NestJS"`, `"Tailwind CSS"`, `"PHP"`, `"PostgreSQL"`
    - Render skills sebagai badge/tag dengan retro aesthetic (border-2, shadow), ditempatkan di antara `<p>` deskripsi profil dan `<div>` social media links
    - Gunakan `flex flex-wrap justify-center gap-2 my-6` sebagai container
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [ ] 13. Checkpoint Phase 3 — Verifikasi content & UX
  - Jalankan `npm run build` dan pastikan tidak ada error
  - Verifikasi disclaimer muncul di halaman blog yang memiliki `source_url`
  - Verifikasi Skills Section tampil di homepage tanpa interaksi user
  - Verifikasi data proyek bisa ditambah cukup dengan edit `data/projects.json`
  - Tanyakan ke user jika ada pertanyaan sebelum melanjutkan ke Phase 4.

---

### Phase 4 — Security

- [ ] 14. Implementasi HMAC Auth System (Security — dependency paling besar)

  - [ ] 14.1 Buat `lib/auth.ts` dengan fungsi `signToken()` dan `verifyToken()`
    - Implementasikan `signToken(secret: string): string` — format token: `base64url("auth:{timestamp}") + "." + hmac-sha256-hex(payload, secret)`
    - Implementasikan `verifyToken(token: string, secret: string): boolean` menggunakan `timingSafeEqual` dari Node.js `crypto` untuk mencegah timing attacks
    - Handle edge cases: token yang tidak mengandung titik, hex string dengan panjang berbeda
    - Import hanya dari `node:crypto` (bukan `crypto`)
    - _Requirements: 1.2, 1.3_

  - [ ]* 14.2 Write property test untuk auth token verifiability
    - **Property 1: Auth cookie always contains verifiable HMAC token**
    - Gunakan `fc.string({ minLength: 32 })` sebagai arbitrary `AUTH_SECRET`
    - Untuk setiap secret, panggil `signToken(secret)` → hasilnya HARUS bisa diverifikasi dengan `verifyToken(token, secret)` → `true`
    - Verifikasi token yang dihasilkan TIDAK SAMA dengan string literal `"authenticated"`
    - **Validates: Requirements 1.2**

  - [ ]* 14.3 Write property test untuk middleware menolak token tidak valid
    - **Property 2: Middleware rejects all invalid tokens**
    - Gunakan `fc.string()` sebagai arbitrary invalid token (termasuk empty string, "authenticated", random strings)
    - Filter: exclude token yang kebetulan valid (sangat tidak mungkin, tapi aman untuk di-filter)
    - Verifikasi setiap arbitrary string yang di-pass ke `verifyToken(token, secret)` mengembalikan `false`
    - **Validates: Requirements 1.3, 1.4**

  - [ ] 14.4 Modifikasi `app/api/auth/route.ts` untuk menggunakan `signToken()`
    - Hapus fallback hardcoded `process.env.ADMIN_PASSWORD || 'teguhcoding'`
    - Tambah guard: jika `ADMIN_PASSWORD` tidak disetel → return 500 dengan pesan `"Server configuration error: ADMIN_PASSWORD is not set"`
    - Tambah guard: jika `AUTH_SECRET` tidak disetel → return 500 dengan pesan `"Server configuration error: AUTH_SECRET is not set"`
    - Ganti `value: 'authenticated'` dengan `value: signToken(process.env.AUTH_SECRET!)`
    - Pertahankan cookie attributes: `httpOnly: true`, `secure: process.env.NODE_ENV === 'production'`, `sameSite: 'lax'`
    - _Requirements: 1.1, 1.2, 1.5, 1.7_

  - [ ] 14.5 Modifikasi `app/api/auth/logout/route.ts` untuk guard env var dan hapus cookie dengan benar
    - Tambah guard: jika `ADMIN_PASSWORD` tidak disetel → return 500 (konsistensi dengan Req 1.6)
    - Pastikan cookie `auth_token` dihapus dengan `maxAge: 0`, bukan dengan `delete` atau tanpa maxAge
    - _Requirements: 1.6, 1.7_

  - [ ] 14.6 Buat `middleware.ts` di root project untuk memprotect `/bahlil/*`
    - Import `verifyToken` dari `@/lib/auth`
    - Baca cookie `auth_token` dari request
    - Jika tidak ada cookie atau `verifyToken()` mengembalikan `false` → redirect ke `/bahlil/login?redirect=<path>` dengan status 302
    - Kecualikan `/bahlil/login` dari proteksi untuk menghindari redirect loop
    - Export `config = { matcher: ['/bahlil/:path*'] }` dengan `/bahlil/login` dikecualikan dari matcher atau di-handle dengan kondisi di dalam fungsi middleware
    - _Requirements: 1.3, 1.4_

- [ ] 15. Checkpoint Phase 4 — Verifikasi security
  - Jalankan `npm run build` — pastikan tidak ada error TypeScript di `lib/auth.ts` dan `middleware.ts`
  - Verifikasi cookie value tidak lagi `"authenticated"` setelah modifikasi auth route
  - Tanyakan ke user jika ada pertanyaan sebelum melanjutkan ke Phase 5.

---

### Phase 5 — New Features

- [ ] 16. Implementasi Newsletter API dan Form

  - [ ] 16.1 Install dependency `resend` jika belum ada di `package.json`
    - Cek apakah `resend` sudah ada di `package.json` — jika belum, tambahkan
    - Pastikan `RESEND_API_KEY` dan `zod` tersedia (zod sudah ada di package.json)
    - _Requirements: 2.1, 2.5_

  - [ ] 16.2 Buat `app/api/newsletter/route.ts`
    - Definisikan Zod schema: `z.object({ email: z.string().email({ message: 'Email tidak valid. Masukkan alamat email yang benar.' }) })`
    - Implementasikan `POST` handler: parse body → validasi Zod → jika invalid return 422 → kirim email via `resend.emails.send()` → jika Resend error return 503 → jika sukses return 200
    - Gunakan `catch (error: unknown)` dengan type guard untuk error handling
    - _Requirements: 2.1, 2.2, 2.3, 2.5, 2.6_

  - [ ]* 16.3 Write property test untuk newsletter valid email acceptance
    - **Property 3: Newsletter accepts all valid email formats**
    - Gunakan `fc.emailAddress()` sebagai arbitrary valid email generator (min 100 iterasi)
    - Mock `resend.emails.send()` untuk return sukses
    - Verifikasi semua valid email → response status 200, bukan 422
    - **Validates: Requirements 2.2**

  - [ ]* 16.4 Write property test untuk newsletter invalid email rejection
    - **Property 4: Newsletter rejects all invalid email formats**
    - Gunakan `fc.string().filter(s => !s.includes('@') || s.length === 0)` sebagai invalid input generator (min 100 iterasi)
    - Verifikasi semua non-email strings → response status 422, bukan 200
    - **Validates: Requirements 2.3**

  - [ ] 16.5 Update `components/footer.tsx` untuk newsletter form yang functional
    - Tambah state management: `email`, `state: 'idle' | 'loading' | 'success' | 'error'`, `errorMessage`
    - Implementasikan `handleSubmit` yang memanggil `POST /api/newsletter` dengan body `{ email }`
    - Disable tombol "Subscribe" saat `state === 'loading'` untuk mencegah double submission
    - Tampilkan feedback state: loading → teks "Subscribing...", success → "Terima kasih! Cek inbox Anda.", error → pesan error dari API
    - Form sudah memiliki `id="newsletter-email"` dan label — pertahankan aksesibilitas yang ada
    - _Requirements: 2.4, 2.7_

- [ ] 17. Final Checkpoint — Semua tests pass
  - Jalankan semua property-based tests (fast-check) dan unit tests
  - Jalankan `npm run build` — pastikan tidak ada error
  - Jalankan `npm run lint` — pastikan zero warnings
  - Verifikasi newsletter form bekerja end-to-end di browser dengan `RESEND_API_KEY` yang valid
  - Tanyakan ke user jika ada pertanyaan.

---

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk implementasi yang lebih cepat
- Setiap task mereferensikan requirement number spesifik untuk traceability
- Property-based tests menggunakan `fast-check` — install dengan `npm install --save-dev fast-check` jika belum ada
- Property tests ditempatkan dekat dengan implementasinya agar error terdeteksi lebih awal
- Phase 4 (Security) sengaja diletakkan setelah Phase 1–3 karena memerlukan file baru (`lib/auth.ts`, `middleware.ts`) dan modifikasi auth routes — risiko lebih tinggi
- `AUTH_SECRET` environment variable perlu ditambahkan di `.env.local` dan Vercel settings sebelum deploy
- Perubahan `data/projects.json` memungkinkan penambahan proyek baru tanpa menyentuh TypeScript
- Untuk dependency audit (Task 6), perhatikan bahwa beberapa Radix UI components mungkin digunakan secara transitive oleh shadcn components lain

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "2.1", "3.1", "4.1", "5.1", "6.1"] },
    { "id": 1, "tasks": ["2.2", "6.2", "8.1", "9.1", "11.1", "12.1"] },
    { "id": 2, "tasks": ["2.3", "6.3", "10.1", "11.2", "14.1"] },
    { "id": 3, "tasks": ["6.4", "10.2", "11.3", "14.2", "14.3"] },
    { "id": 4, "tasks": ["10.3", "11.4", "11.5", "14.4", "14.5", "16.1"] },
    { "id": 5, "tasks": ["14.6", "16.2"] },
    { "id": 6, "tasks": ["16.3", "16.4", "16.5"] }
  ]
}
```
