# Design Document — Website Improvement

## Overview

Dokumen ini mendefinisikan desain teknis untuk improvement plan menyeluruh website **teguhcoding.com**. Perbaikan mencakup 14 requirement yang dikelompokkan ke dalam empat area:

- **Security** (Req 1): Hardening autentikasi admin panel dari cookie literal ke HMAC-signed token
- **Correctness** (Req 2–4): Perbaikan bug fungsional — newsletter, OpenAI model name, cache contradiction
- **Performance & UX** (Req 5, 9, 10, 12): Animasi viewport-based, Skills section, HTML lang, Image priority
- **Content & Compliance** (Req 6–8, 11, 13, 14): Akurasi data, SEO/disclaimer blog, TypeScript types, dependency audit

Stack teknis tidak berubah: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Resend API, OpenAI API, Vercel.

---

## Architecture

Website ini menggunakan Next.js App Router dengan arsitektur berikut:

```
teguhcoding.com
├── app/                    # Next.js App Router pages & API routes
│   ├── api/               # Server-side API route handlers
│   │   ├── auth/          # Auth login (POST)
│   │   │   └── logout/    # Auth logout (POST)
│   │   ├── newsletter/    # [NEW] Newsletter subscription (POST)
│   │   ├── generate-post/ # OpenAI blog generator
│   │   ├── contact/       # Contact form
│   │   └── ...
│   ├── bahlil/            # Admin panel (protected)
│   ├── blog/[slug]/       # Blog post detail
│   ├── experience/        # Career history
│   ├── education/         # Education & certifications
│   ├── projects/          # Projects list & detail
│   └── layout.tsx         # Root layout (lang attribute)
├── components/            # Shared React components
│   ├── hero.tsx           # Hero + Skills_Section
│   ├── featured-projects.tsx
│   ├── latest-blog.tsx
│   └── footer.tsx         # Newsletter form
├── lib/
│   ├── projects.ts        # [MIGRATE → JSON] Project data
│   └── auth.ts            # [NEW] Token signing/verification utilities
├── middleware.ts           # [NEW/UPDATE] Auth middleware for /bahlil/*
└── data/
    └── projects.json       # [NEW] Project data external file
```

Perubahan arsitektur utama:
1. `middleware.ts` baru di root untuk validasi HMAC token pada semua request ke `/bahlil/*`
2. `lib/auth.ts` baru berisi fungsi `signToken()` dan `verifyToken()` menggunakan `crypto.createHmac`
3. `app/api/newsletter/route.ts` baru sebagai endpoint subscription
4. `data/projects.json` baru untuk externalize project data dari TypeScript

---

## Components and Interfaces

### Req 1 — Auth Security

**`lib/auth.ts`** (file baru)

```typescript
// Token format: HMAC-SHA256(payload, AUTH_SECRET)
// payload: "auth:{timestamp_ms}"
// Full token: base64url(payload) + "." + hex(signature)

export function signToken(secret: string): string
export function verifyToken(token: string, secret: string): boolean
```

Token dibuat saat login sukses dan disimpan sebagai cookie `auth_token`. Middleware membaca cookie dan memanggil `verifyToken()` — jika gagal, redirect ke `/bahlil/login`.

**`middleware.ts`** (file baru di root)

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest): NextResponse
export const config = { matcher: ['/bahlil/:path*'] }
```

Middleware intercept semua request ke `/bahlil/*` (termasuk `/bahlil/login` dikecualikan). Cookie `auth_token` divalidasi. Redirect ke `/bahlil/login?redirect=<path>` jika tidak valid.

**`app/api/auth/route.ts`** (modifikasi)

```typescript
// Perubahan: hapus fallback hardcoded, gunakan lib/auth.ts
// Sebelum: value: 'authenticated'
// Sesudah: value: signToken(process.env.AUTH_SECRET!)
```

Environment variables yang diperlukan:
- `ADMIN_PASSWORD` — password admin (required, tidak ada fallback)
- `AUTH_SECRET` — secret untuk HMAC signing (required, min 32 chars, beda dari ADMIN_PASSWORD)

**`app/api/auth/logout/route.ts`** (modifikasi)

```typescript
// Tambah guard: jika ADMIN_PASSWORD tidak disetel, return 500
// Hapus cookie dengan maxAge: 0
```

### Req 2 — Newsletter Form

**`app/api/newsletter/route.ts`** (file baru)

```typescript
import { z } from 'zod'
import { Resend } from 'resend'

const NewsletterSchema = z.object({
  email: z.string().email(),
})

export async function POST(req: Request): Promise<NextResponse>
```

Flow:
1. Parse body JSON, validasi dengan Zod `z.string().email()`
2. Jika invalid → 422 dengan pesan error Zod
3. Kirim email konfirmasi via `resend.emails.send()`
4. Jika Resend error → 503 dengan pesan error
5. Jika sukses → 200 `{ success: true, message: "..." }`

**`components/footer.tsx`** (modifikasi)

Form newsletter berubah dari uncontrolled ke controlled dengan state:

```typescript
type NewsletterState = 'idle' | 'loading' | 'success' | 'error'

const [email, setEmail] = useState('')
const [state, setState] = useState<NewsletterState>('idle')
const [errorMessage, setErrorMessage] = useState('')
```

Button `disabled` saat `state === 'loading'`. Tampilkan:
- Loading: teks "Subscribing..." dengan disabled button
- Success: pesan "Terima kasih! Cek inbox Anda."
- Error: pesan error dari API

### Req 3 — OpenAI Model Fix

**`app/api/generate-post/route.ts`** (modifikasi)

```typescript
// Hapus:
import fs from 'fs';
import path from 'path';

// Ubah:
const selectedModel = model || "gpt-4o-mini";  // was "gpt-5.4-mini"

// Update catch block:
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  return NextResponse.json({ error: message }, { status: 500 })
}
```

### Req 4 — Cache Strategy Fix

**`app/page.tsx`** (modifikasi)

```typescript
// Hapus baris ini:
export const dynamic = "force-static";

// Pertahankan:
export const revalidate = 60;
```

Rationale: `force-static` dan `revalidate = 60` saling bertentangan. `force-static` memaksa build-time static generation tanpa revalidation, sementara `revalidate = 60` mengindikasikan ISR. Mempertahankan hanya `revalidate = 60` adalah intent yang benar untuk konten yang perlu periodic update.

### Req 5 — Viewport Animations

**`components/featured-projects.tsx`** dan **`components/latest-blog.tsx`** (modifikasi)

```typescript
// Sebelum (di setiap motion.div card dan heading):
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Sesudah:
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

Perubahan ini berlaku pada:
- `motion.h2` heading di kedua komponen
- Setiap `motion.div` yang membungkus card/article

### Req 6 — Career Data Accuracy

**`app/experience/page.tsx`** (modifikasi data)

```typescript
{
  id: 2,
  title: "Fullstack Developer",
  company: "PT Hijau Digital International",
  period: "March 2019 – April 2025",  // was "March 2019 – Present"
  ...
}
```

Urutan tetap dipertahankan dari terbaru ke terlama:
1. Capio Teknologi Indonesia — May 2025 – July 2025 (posisi aktif terkini)
2. PT Hijau Digital International — March 2019 – April 2025
3. PT Majoo Teknologi Indonesia — January 2022 – June 2023
4. Politeknik Dharma Patria — January 2018 – February 2019

Catatan desain: urutan items 2 dan 3 di array yang ada perlu dipertimbangkan — Majoo (Jan 2022–Jun 2023) secara kronologis berada di dalam rentang Hijau Digital (2019–2025). Ini adalah pengalaman concurrent/parallel yang umum di industri software. Urutkan array berdasarkan tanggal *mulai* terbaru: Capio > Majoo > Hijau Digital > Politeknik. Ini lebih akurat secara kronologis.

### Req 7 — Blog Disclaimer & SEO

**`app/blog/[slug]/page.tsx`** (modifikasi)

Tambahkan ke `generateMetadata()`:

```typescript
// Jika source_url ada dan merupakan external domain:
alternates: {
  canonical: post.source_url,  // canonical → sumber asli
},
robots: {
  index: false,    // NOINDEX untuk aggregated content
  follow: true,
},
```

Tambahkan disclaimer UI di atas konten artikel:

```tsx
{post.source_url && (
  <div className="mb-8 p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800/50">
    <p className="text-sm text-gray-600 dark:text-gray-400">
      ⚠️ Artikel ini adalah ringkasan dari sumber eksternal.{' '}
      <a
        href={post.source_url}
        target="_blank"
        rel="noopener noreferrer"
        className="underline font-medium hover:text-black dark:hover:text-white"
      >
        Baca artikel asli di sini →
      </a>
    </p>
  </div>
)}
```

Kondisi: disclaimer dan NOINDEX hanya ditampilkan/diterapkan jika `post.source_url` ada dan merupakan external domain (bukan domain teguhcoding.com sendiri).

### Req 8 — Projects Expansion

**`data/projects.json`** (file baru)

Data proyek dipindah dari `lib/projects.ts` ke file JSON agar bisa diedit tanpa mengubah TypeScript:

```json
[
  {
    "id": 1,
    "title": "...",
    "description": "...",
    "longDescription": "...",
    "features": [...],
    "image": "/...",
    "link": "/projects/...",
    "slug": "...",
    "technologies": [...],
    "demo": "https://..."
  }
]
```

**`lib/projects.ts`** (modifikasi)

```typescript
import projectsData from '@/data/projects.json'
import type { Project } from '@/types/project'

export const projects: Project[] = projectsData
```

**`types/project.ts`** (file baru)

```typescript
export interface Project {
  id: number
  title: string
  description: string
  longDescription: string
  features: string[]
  image: string
  link: string
  slug: string
  technologies: string[]
  demo: string
}
```

`FeaturedProjects` dan `Projects_Page` tidak perlu diubah logika rendering-nya — mereka sudah iterasi dari array. Penambahan proyek baru cukup dengan menambah entry di `data/projects.json`.

### Req 9 — Skills Section

**`components/hero.tsx`** (modifikasi)

Tambah `SkillsSection` component inline atau sebagai sub-component:

```tsx
const skills = [
  "Next.js", "React", "TypeScript", "Laravel",
  "NestJS", "Tailwind CSS", "PHP", "PostgreSQL"
]

// Di dalam Hero, antara <p> deskripsi dan <div> CTA buttons:
<div className="flex flex-wrap justify-center gap-2 my-6">
  {skills.map((skill) => (
    <span
      key={skill}
      className="px-3 py-1 border-2 border-black dark:border-white
                 text-sm font-bold bg-white dark:bg-gray-900
                 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]
                 dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.5)]"
    >
      {skill}
    </span>
  ))}
</div>
```

Badge menggunakan border + drop-shadow retro aesthetic yang konsisten dengan design system yang sudah ada (`retro-card`, `retro-button`).

### Req 10 — HTML Lang

**`app/layout.tsx`** (modifikasi)

```tsx
// Sebelum:
<html lang="en" suppressHydrationWarning>

// Sesudah:
<html lang="id" suppressHydrationWarning>
```

Metadata OpenGraph `locale: "id_ID"` sudah benar, tidak perlu diubah.

### Req 11 — Certification Links

**`app/education/page.tsx`** (modifikasi data + rendering logic)

Ubah tipe data sertifikasi: field `link` menjadi `link?: string | null`.

```typescript
interface Certification {
  id: number
  title: string
  issuer: string
  date: string
  link?: string | null  // undefined/null = tidak tampilkan link
}
```

Update semua entries dengan `link: "#"` — ganti ke `link: null` (atau URL valid jika tersedia). Rendering conditional:

```tsx
{cert.link && (
  <a
    href={cert.link}
    target="_blank"
    rel="noopener noreferrer"
    className="text-sm underline mt-2 inline-block"
  >
    Verifikasi Sertifikat ↗
  </a>
)}
```

### Req 12 — Image Priority Prop

**`components/hero.tsx`** (modifikasi)

```tsx
// Sebelum:
<Image ... preload />

// Sesudah:
<Image ... priority />
```

`preload` bukan prop yang dikenal oleh Next.js `<Image>`. `priority` adalah prop yang benar untuk preload gambar LCP.

### Req 13 — TypeScript any

Semua file dalam `app/api/` diaudit dan diperbarui. Pattern penggantian:

```typescript
// Sebelum:
} catch (error: any) {
  return NextResponse.json({ error: error.message }, { status: 500 })
}

// Sesudah:
} catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  return NextResponse.json({ error: message }, { status: 500 })
}
```

Files yang teridentifikasi menggunakan `any`: `app/api/generate-post/route.ts` (dikonfirmasi dari source read).

### Req 14 — Unused Dependencies

Pendekatan:
1. Audit `components/ui/` — identify files yang tidak diimpor oleh siapapun
2. Map setiap file ke Radix UI package yang digunakan
3. Jika tidak ada impor → hapus dari `components/ui/` dan dari `dependencies` di `package.json`
4. Cek `recharts` — jika tidak ada chart component di `app/` atau `components/`, hapus

Dependency yang perlu diverifikasi sebelum dihapus (tidak boleh dihapus tanpa audit impor):
- `recharts` — belum ada chart teridentifikasi di codebase
- Radix UI individual packages yang mapped ke unused `components/ui/` files

---

## Data Models

### Token Model (Auth)

Token yang disimpan di cookie `auth_token` mengikuti format:

```
{base64url(payload)}.{hex(hmac-sha256(payload, AUTH_SECRET))}
```

Dimana `payload = "auth:{timestamp_ms}"`. Timestamp disertakan untuk memungkinkan token expiry jika diperlukan di masa depan, namun validasi saat ini hanya memeriksa signature correctness.

```typescript
// lib/auth.ts
export interface TokenPayload {
  prefix: 'auth'
  timestamp: number
}
```

### Project Data Model

```typescript
// types/project.ts
export interface Project {
  id: number
  title: string
  description: string       // short, untuk card preview
  longDescription: string   // full, untuk detail page
  features: string[]
  image: string             // path relatif ke /public
  link: string              // internal route /projects/{slug}
  slug: string
  technologies: string[]
  demo: string              // URL eksternal demo
}
```

### Newsletter Request/Response

```typescript
// Request body (POST /api/newsletter)
interface NewsletterRequest {
  email: string  // validated as email format
}

// Response 200
interface NewsletterSuccessResponse {
  success: true
  message: string
}

// Response 422
interface NewsletterErrorResponse {
  success: false
  error: string   // human-readable validation message
}

// Response 503
interface NewsletterServiceErrorResponse {
  success: false
  error: string   // "Email service unavailable"
}
```

### Blog Post Frontmatter (existing + addition)

```typescript
interface BlogPost {
  title: string
  date: string
  tags?: string[]
  excerpt: string
  source_url: string    // existing — digunakan untuk disclaimer
  cover_image?: string
  readingTime: number
  slug: string
}
```

`source_url` sudah ada di frontmatter. Tidak perlu skema perubahan — hanya logic rendering yang ditambah.

---

## API Design

### Endpoint Baru: POST /api/newsletter

```
POST /api/newsletter
Content-Type: application/json

Request:
{
  "email": "user@example.com"
}

Response 200 OK:
{
  "success": true,
  "message": "Terima kasih! Email konfirmasi telah dikirim ke user@example.com"
}

Response 422 Unprocessable Entity:
{
  "success": false,
  "error": "Email tidak valid. Masukkan alamat email yang benar."
}

Response 503 Service Unavailable:
{
  "success": false,
  "error": "Layanan email sedang tidak tersedia. Coba lagi nanti."
}
```

**Implementasi (`app/api/newsletter/route.ts`):**

```typescript
import { NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const Schema = z.object({
  email: z.string().email({ message: 'Email tidak valid. Masukkan alamat email yang benar.' }),
})

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request): Promise<NextResponse> {
  const body: unknown = await req.json()
  const result = Schema.safeParse(body)

  if (!result.success) {
    return NextResponse.json(
      { success: false, error: result.error.issues[0].message },
      { status: 422 }
    )
  }

  const { email } = result.data

  try {
    await resend.emails.send({
      from: 'Teguh Widodo <newsletter@teguhcoding.com>',
      to: email,
      subject: 'Selamat datang di newsletter teguhcoding.com!',
      html: `<p>Halo! Terima kasih telah berlangganan newsletter teguhcoding.com.</p>`,
    })

    return NextResponse.json({
      success: true,
      message: `Terima kasih! Email konfirmasi telah dikirim ke ${email}`,
    })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error)
    console.error('Resend error:', message)
    return NextResponse.json(
      { success: false, error: 'Layanan email sedang tidak tersedia. Coba lagi nanti.' },
      { status: 503 }
    )
  }
}
```

### Endpoint yang Dimodifikasi: POST /api/auth

```
POST /api/auth
Content-Type: application/json

Request:
{
  "password": "admin_password"
}

Response 200 OK (+ Set-Cookie: auth_token=<hmac_token>; HttpOnly; Secure; SameSite=Lax):
{
  "success": true
}

Response 401 Unauthorized:
{
  "error": "Kata sandi salah"
}

Response 500 Internal Server Error (jika ADMIN_PASSWORD tidak disetel):
{
  "error": "Server configuration error: ADMIN_PASSWORD is not set"
}
```

### Middleware: /bahlil/* Route Protection

```
GET /bahlil           → validasi cookie → redirect /bahlil/login jika invalid
GET /bahlil/login     → pass through (tidak diprotect)
GET /bahlil/*         → validasi cookie → redirect /bahlil/login jika invalid
```

Middleware tidak memprotect `/bahlil/login` itu sendiri untuk menghindari redirect loop.

---

## Security Design

### Problem Statement

Auth system saat ini menyimpan string literal `"authenticated"` sebagai nilai cookie. Siapapun yang mengetahui nama cookie (`auth_token`) dapat mengakses admin panel hanya dengan menyetel cookie tersebut ke nilai `"authenticated"` secara manual via browser DevTools.

### Solusi: HMAC-SHA256 Signed Token

**Alasan memilih HMAC over JWT:**
- Tidak memerlukan dependency tambahan (Node.js `crypto` sudah built-in)
- Lebih sederhana untuk use case ini (tidak perlu claims kompleks seperti JWT)
- Performa lebih baik — tidak ada parsing JSON overhead
- [Medium confidence] Untuk single-server admin panel sederhana, HMAC custom token setara dengan JWT dalam hal security jika diimplementasikan dengan benar

**Token Structure:**

```
base64url("auth:{timestamp}") + "." + hmac-sha256-hex(payload, AUTH_SECRET)
```

Contoh:
```
YXV0aDoxNzM0MDAwMDAwMDAw.a1b2c3d4e5f6...
```

**Signing (`lib/auth.ts`):**

```typescript
import { createHmac, timingSafeEqual } from 'crypto'

export function signToken(secret: string): string {
  const payload = `auth:${Date.now()}`
  const encoded = Buffer.from(payload).toString('base64url')
  const sig = createHmac('sha256', secret).update(encoded).digest('hex')
  return `${encoded}.${sig}`
}

export function verifyToken(token: string, secret: string): boolean {
  const parts = token.split('.')
  if (parts.length !== 2) return false
  const [encoded, sig] = parts
  const expectedSig = createHmac('sha256', secret).update(encoded).digest('hex')
  // Timing-safe comparison untuk mencegah timing attacks
  try {
    return timingSafeEqual(Buffer.from(sig, 'hex'), Buffer.from(expectedSig, 'hex'))
  } catch {
    return false
  }
}
```

**Kenapa `timingSafeEqual`:** String comparison biasa (`===`) rentan terhadap timing attacks dimana attacker bisa mengukur waktu respons untuk menebak karakter signature satu per satu. `timingSafeEqual` memastikan waktu perbandingan selalu konstan.

**Environment Variables:**

| Variable | Keterangan | Required |
|----------|-----------|----------|
| `ADMIN_PASSWORD` | Password login admin | Ya — tidak ada fallback |
| `AUTH_SECRET` | Secret key untuk HMAC signing | Ya — min 32 karakter random |
| `RESEND_API_KEY` | API key Resend untuk email | Ya untuk newsletter |
| `OPENAI_API_KEY` | API key OpenAI | Ya untuk blog generator |

**Catatan:** `AUTH_SECRET` harus berbeda dari `ADMIN_PASSWORD`. Gunakan `openssl rand -hex 32` untuk generate value yang kuat.

### Threat Model

| Ancaman | Mitigasi |
|---------|---------|
| Cookie forgery (set manual `auth_token=authenticated`) | Token sekarang HMAC-signed — tanpa `AUTH_SECRET` tidak bisa dipalsukan |
| Brute force login | Di luar scope requirement ini, tapi rate limiting di Vercel Edge bisa ditambah sebagai follow-up |
| Token replay attack | Token mengandung timestamp, dapat diperluas dengan expiry check jika diperlukan |
| Timing attack pada signature comparison | `timingSafeEqual` digunakan |
| Missing env var crash | Guard eksplisit di auth routes — return 500 bukan crash |

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

**Property Reflection:** Setelah prework analysis, beberapa criteria yang redundan dikonsolidasi:
- Req 7.1, 7.3, 7.4 → digabung menjadi satu property yang mencakup disclaimer presence/absence
- Req 7.2 dan 7.5 → digabung menjadi satu property karena keduanya berkaitan dengan metadata blog post
- Req 13.2 → satu property yang mencakup semua throwable value types
- Req 14.3 → satu property tentang import completeness

### Property 1: Auth cookie selalu berisi HMAC-signed token

*For any* valid admin password, setelah login sukses, nilai cookie `auth_token` yang di-set HARUS bisa diverifikasi menggunakan `verifyToken()` dengan `AUTH_SECRET` yang benar, dan TIDAK BOLEH sama dengan string literal `"authenticated"`.

**Validates: Requirements 1.2**

### Property 2: Middleware menolak semua token yang tidak valid

*For any* string yang bukan merupakan token yang ditandatangani dengan `AUTH_SECRET` yang benar (termasuk string kosong, string acak, string "authenticated", token yang dimanipulasi, token dengan signature yang salah), middleware HARUS mengembalikan redirect response ke `/bahlil/login`, bukan response 200.

**Validates: Requirements 1.3, 1.4**

### Property 3: Newsletter API menerima semua format email yang valid

*For any* string yang merupakan email address valid menurut RFC 5322 (dengan berbagai format: subdomain, plus-addressing, domain internasional), endpoint `POST /api/newsletter` HARUS mengembalikan response dengan status 200, bukan 422.

**Validates: Requirements 2.2**

### Property 4: Newsletter API menolak semua input email yang tidak valid

*For any* string yang bukan email address yang valid (string kosong, string tanpa @, string dengan multiple @, whitespace-only, string dengan karakter tidak valid), endpoint `POST /api/newsletter` HARUS mengembalikan response dengan status 422, bukan 200.

**Validates: Requirements 2.3**

### Property 5: Blog post dengan source_url menampilkan disclaimer dan tidak diindex

*For any* blog post data dengan `source_url` yang terisi (non-empty string), halaman blog post yang di-render HARUS:
1. Menampilkan teks disclaimer yang mengandung `source_url`
2. Memiliki metadata `robots` yang mengandung direktif `noindex`
3. Memiliki metadata `alternates.canonical` yang mengarah ke `source_url`

Dan *for any* blog post data tanpa `source_url` (undefined atau empty string), halaman TIDAK BOLEH menampilkan disclaimer dan TIDAK BOLEH menyertakan `noindex` atau canonical ke sumber eksternal.

**Validates: Requirements 7.1, 7.2, 7.4, 7.5**

### Property 6: FeaturedProjects merender semua proyek yang tersedia

*For any* array project data dengan panjang N (N ≥ 1), komponen `FeaturedProjects` HARUS merender tepat N item project card, tidak lebih dan tidak kurang.

**Validates: Requirements 8.1**

### Property 7: Project card merender semua field yang diperlukan

*For any* valid `Project` object, project card yang di-render HARUS mengandung title, description, daftar technologies, dan demo link dalam output HTML-nya.

**Validates: Requirements 8.4**

### Property 8: Error handler API routes menangani semua jenis throwable

*For any* value yang di-throw (instance dari `Error`, string, number, `null`, `undefined`, plain object), error handler di API routes HARUS menghasilkan string pesan error tanpa melempar exception baru. Pattern `error instanceof Error ? error.message : String(error)` HARUS diverifikasi bekerja untuk semua jenis tersebut.

**Validates: Requirements 13.2**

### Property 9: Semua file di components/ui/ memiliki setidaknya satu importor

*For any* file `.tsx` di direktori `components/ui/`, HARUS ada setidaknya satu file di `app/` atau `components/` yang mengimpornya. File yang tidak memiliki importor berarti merupakan unused dependency.

**Validates: Requirements 14.3**

---

## Error Handling

### Auth Errors

| Kondisi | Response | HTTP Status |
|---------|---------|------------|
| `ADMIN_PASSWORD` tidak disetel | `{ error: "Server configuration error: ADMIN_PASSWORD is not set" }` | 500 |
| `AUTH_SECRET` tidak disetel | `{ error: "Server configuration error: AUTH_SECRET is not set" }` | 500 |
| Password salah | `{ error: "Kata sandi salah" }` | 401 |
| Cookie tidak ada | Redirect ke `/bahlil/login` | 302 |
| Cookie ada tapi signature tidak valid | Redirect ke `/bahlil/login` | 302 |

### Newsletter Errors

| Kondisi | Response | HTTP Status |
|---------|---------|------------|
| Email tidak valid (format) | `{ success: false, error: "Email tidak valid..." }` | 422 |
| Email kosong / field missing | `{ success: false, error: "Email tidak valid..." }` | 422 |
| Body bukan JSON valid | `{ success: false, error: "Bad Request" }` | 400 |
| `RESEND_API_KEY` tidak disetel | `{ success: false, error: "Layanan email tidak tersedia..." }` | 503 |
| Resend API error | `{ success: false, error: "Layanan email tidak tersedia..." }` | 503 |

Error message ke user untuk Resend failure tidak mengekspos detail teknis (API key missing, network error, dll). Log internal untuk debugging.

### Blog Generator Errors

| Kondisi | Response | HTTP Status |
|---------|---------|------------|
| Model tidak ditemukan di OpenAI | `{ error: "Model tidak valid: {model_name}" }` | 422 |
| OpenAI API key tidak valid | `{ error: "OpenAI API error: {message}" }` | 500 |
| Konten URL tidak bisa di-fetch | `{ error: "Gagal mengambil konten website..." }` | 400 |
| OpenAI tidak menghasilkan konten | `{ error: "Failed to generate content from OpenAI" }` | 500 |

---

## Testing Strategy

Feature ini cocok untuk property-based testing pada beberapa area (auth token, newsletter validation, rendering properties). Feature lain lebih cocok menggunakan example-based atau smoke tests.

**PBT Library:** `fast-check` (TypeScript-native, well-maintained, compatible dengan Jest/Vitest)

### Unit Tests (example-based)

- Auth login dengan password benar → cookie di-set
- Auth login dengan password salah → 401
- Auth login tanpa `ADMIN_PASSWORD` env → 500
- Logout → cookie di-clear dengan maxAge 0
- Newsletter dengan email valid → 200 + Resend dipanggil
- Newsletter dengan email tidak valid → 422
- Newsletter saat Resend error → 503
- Blog generator tanpa model → default `gpt-4o-mini` digunakan
- Blog generator dengan model di body → nilai tersebut digunakan
- Blog post render: dengan `source_url` → disclaimer tampil
- Blog post render: tanpa `source_url` → tidak ada disclaimer
- Experience page: tidak ada "Present" di entri Hijau Digital
- Certification: entries dengan `link: null` tidak merender elemen `<a>`
- Hero: `<Image>` menggunakan `priority`, bukan `preload`

### Property-Based Tests (dengan fast-check)

**Tag format: `Feature: website-improvement, Property {N}: {deskripsi singkat}`**

**Property 1 — Auth token verifiability** (min 100 iterasi)
```typescript
// fc.string() sebagai password, verifikasi cookie value bisa diverifikasi dengan verifyToken()
// Tag: Feature: website-improvement, Property 1: auth cookie always contains verifiable HMAC token
```

**Property 2 — Middleware rejects invalid tokens** (min 100 iterasi)
```typescript
// fc.string() sebagai arbitrary token value
// Semua arbitrary string → middleware redirect, kecuali token yang benar-benar valid
// Tag: Feature: website-improvement, Property 2: middleware rejects all invalid tokens
```

**Property 3 — Newsletter valid email acceptance** (min 100 iterasi)
```typescript
// fc.emailAddress() sebagai valid email generator
// Semua valid email → 200 response
// Tag: Feature: website-improvement, Property 3: newsletter accepts all valid email formats
```

**Property 4 — Newsletter invalid email rejection** (min 100 iterasi)
```typescript
// fc.string().filter(s => !isEmail(s)) sebagai invalid input generator
// Semua non-email strings → 422 response
// Tag: Feature: website-improvement, Property 4: newsletter rejects all invalid email formats
```

**Property 5 — Blog disclaimer presence** (min 100 iterasi)
```typescript
// fc.record({ source_url: fc.webUrl() }) dan fc.record({ source_url: fc.constant('') })
// Post dengan source_url → disclaimer muncul, noindex ada
// Post tanpa source_url → disclaimer tidak muncul, noindex tidak ada
// Tag: Feature: website-improvement, Property 5: blog post disclaimer presence matches source_url presence
```

**Property 6 — FeaturedProjects renders all items** (min 100 iterasi)
```typescript
// fc.array(fc.record({...projectShape}), { minLength: 1, maxLength: 20 })
// Render dengan array tersebut → jumlah card = jumlah item array
// Tag: Feature: website-improvement, Property 6: FeaturedProjects renders all available projects
```

**Property 7 — Project card required fields** (min 100 iterasi)
```typescript
// fc.record({ title: fc.string(), description: fc.string(), technologies: fc.array(fc.string()), demo: fc.webUrl() })
// Render card → output HTML mengandung semua field tersebut
// Tag: Feature: website-improvement, Property 7: project card renders all required fields
```

**Property 8 — Error handler handles all throwable types** (min 100 iterasi)
```typescript
// fc.oneof(fc.string(), fc.integer(), fc.constant(null), fc.constant(undefined), fc.record({message: fc.string()}))
// errorHandler(value) → selalu menghasilkan string, tidak pernah throw
// Tag: Feature: website-improvement, Property 8: error handler converts any thrown value to string
```

**Property 9 — All UI components are imported** (static analysis, 1 iterasi)
```typescript
// Enumerate files in components/ui/, check import graph
// Setiap file harus memiliki minimal 1 importor
// Tag: Feature: website-improvement, Property 9: all UI components have at least one importer
```

### Smoke Tests / Build Checks

- TypeScript compilation: tidak ada `any` eksplisit di `app/api/`
- TypeScript compilation: tidak ada unused imports di `app/api/generate-post/route.ts`
- Build check: `app/page.tsx` tidak mengandung `force-static` dan `revalidate` bersamaan
- Source check: `components/hero.tsx` menggunakan `priority` prop bukan `preload`
- Source check: `app/layout.tsx` menggunakan `lang="id"`
- Source check: `components/featured-projects.tsx` menggunakan `whileInView`
- Source check: `components/latest-blog.tsx` menggunakan `whileInView`

### Integration Tests

- `POST /api/auth` dengan database real (atau mock filesystem): end-to-end cookie creation
- Dependency audit: run `npx depcheck` — verify zero unused packages
- Build: `next build` succeeds without errors

---

## File Modification Summary

### File Baru (Created)

| File | Req | Keterangan |
|------|-----|-----------|
| `middleware.ts` | 1 | Auth middleware untuk `/bahlil/*` |
| `lib/auth.ts` | 1 | `signToken()` dan `verifyToken()` utilities |
| `app/api/newsletter/route.ts` | 2 | Newsletter subscription endpoint |
| `data/projects.json` | 8 | Project data dalam format JSON |
| `types/project.ts` | 8 | TypeScript interface untuk Project |

### File yang Dimodifikasi (Modified)

| File | Req | Perubahan |
|------|-----|----------|
| `app/api/auth/route.ts` | 1 | Ganti cookie value ke signToken(), hapus fallback hardcoded, guard env var |
| `app/api/auth/logout/route.ts` | 1 | Tambah guard ADMIN_PASSWORD, pastikan maxAge: 0 |
| `app/api/generate-post/route.ts` | 3, 13 | Ganti model default, hapus fs/path imports, fix error type |
| `app/page.tsx` | 4 | Hapus `export const dynamic = "force-static"` |
| `components/featured-projects.tsx` | 5 | Ganti animate → whileInView + viewport |
| `components/latest-blog.tsx` | 5 | Ganti animate → whileInView + viewport |
| `app/experience/page.tsx` | 6 | Update "Present" → tanggal eksplisit, urutkan chronologis |
| `app/blog/[slug]/page.tsx` | 7 | Tambah disclaimer UI, canonical tag, noindex robots |
| `lib/projects.ts` | 8 | Ubah ke import dari JSON file |
| `components/hero.tsx` | 9, 12 | Tambah Skills_Section, ganti preload → priority |
| `components/footer.tsx` | 2 | Tambah state management newsletter form |
| `app/layout.tsx` | 10 | Ganti lang="en" → lang="id" |
| `app/education/page.tsx` | 11 | Update cert links, conditional rendering |
| `app/api/contact/route.ts` | 13 | Audit dan fix any types jika ditemukan |
| `app/api/articles/route.ts` | 13 | Audit dan fix any types jika ditemukan |
| `package.json` | 14 | Hapus unused dependencies setelah audit |

### Potentially Deleted (setelah audit)

| File | Kondisi Penghapusan |
|------|-------------------|
| `components/ui/*.tsx` (subset) | Jika tidak ada importor ditemukan setelah audit |
| Radix packages di `package.json` | Jika semua componentsnya dihapus |
| `recharts` di `package.json` | Jika tidak ada komponen chart |

---

## Design Decisions & Rationales

1. **HMAC custom token vs JWT**: JWT lebih umum dikenal, tapi untuk use case ini (single-user admin, session sederhana) HMAC custom token lebih ringan tanpa dependency tambahan. Jika auth berkembang (multi-user, roles), migrasi ke JWT library seperti `jose` direkomendasikan.

2. **Zod untuk newsletter validation**: Zod sudah kemungkinan besar ada di project (common di Next.js projects). Jika belum, ini satu-satunya dependency baru yang ditambahkan. Alternatif adalah manual regex validation, tapi Zod lebih robust dan menghasilkan error message yang lebih baik.

3. **Projects data di JSON vs MDX**: JSON dipilih karena data proyek bersifat structured (bukan narasi panjang). MDX lebih cocok jika setiap proyek butuh custom rendering. JSON lebih sederhana untuk use case ini.

4. **Blog NOINDEX decision**: Menggunakan NOINDEX untuk aggregated content adalah keputusan yang correct secara SEO — duplicate content dari sumber eksternal bisa mempengaruhi ranking negatif. Canonical tag ke source_url memberi kredit ke penulis asli. Keputusan ini sejalan dengan Google's guidance tentang [duplicate content](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

5. **whileInView vs animate**: `animate` berjalan segera saat komponen mount, artinya jika user scroll cepat, animasi sudah selesai sebelum elemen terlihat. `whileInView` dengan `once: true` memastikan animasi hanya berjalan saat elemen benar-benar masuk viewport, sekali saja.

6. **Experience data ordering dengan concurrent roles**: Periode kerja di Hijau Digital (2019–2025) dan Majoo (2022–2023) overlap, yang umum di software engineering (freelance/part-time concurrent). Array diurutkan berdasarkan tanggal mulai terbaru untuk konsistensi, bukan berdasarkan posisi "aktif". Ini perlu dikonfirmasi dengan pemilik website untuk akurasi data biografi.
