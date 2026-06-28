---
title: "Cara Memformat JSON seperti Pro — Panduan Praktis"
source_url: "https://medium.com/@jsdevspace/how-to-format-json-like-a-pro-a74ae86b1a8d"
tags: ["JSON","Best Practices","Web Development"]
date: "2026-06-28T03:46:37.321Z"
cover_image: "https://miro.medium.com/v2/resize:fit:1024/1*XdSf29khGS1JKRteb17FCw.jpeg"
---

# Cara Memformat JSON seperti Pro

JSON adalah bahasa data inti di hampir semua proyek web modern — dari API, file konfigurasi, hingga state sync. Perbedaannya besar antara JSON yang sekadar valid dan JSON yang "diformat seperti pro". Ketika kamu memperlakukan JSON sebagai bagian penting dari alur kerja engineering, bug berkurang, debugging jadi cepat, dan code review lebih bersahabat.

Berikut panduan praktis dan mudah diterapkan untuk merapikan payload, menyusun konfigurasi agar mudah dibaca, serta mengoptimalkan workflow JSON kamu.

## 1. Pilih Indentasi dengan Bijak (2 spasi vs 4 spasi)

Mesin tak peduli spasi, manusia peduli. Kuncinya konsistensi.

- 2 spasi: Standar industri web — compact, cocok untuk respons API dan file konfigurasi seperti `package.json`.
- 4 spasi: Sering dipakai di ekosistem seperti Python atau Java; lebih mudah dibaca tapi cepat mendorong struktur ke luar layar.

Pro tip: Minify untuk produksi, prettify untuk development. Jangan kirim JSON berhias spasi berlebih ke klien — whitespace tetap menghitung sebagai byte.

Contoh (development):

```json
{
  "user": {
    "id": 42,
    "active": true
  }
}
```

Contoh (produksi, minified):

```json
{"user":{"id":42,"active":true}}
```

## 2. Urutkan Kunci Secara Logis

Jangan menabur properti sembarangan. Kelompokkan kunci agar orang lain bisa memindai file dengan cepat.

- Identitas utama di depan: `id`, `uuid`, `type`, `status`.
- Untuk matriks konfigurasi besar: urutkan alfabetis agar mudah mencari dan mencegah duplikasi.
- Data kronologis di akhir: `created_at`, `updated_at`, `deleted_at`.

Contoh berantakan vs terstruktur:

```json
// Berantakan & susah discan
{
  "bio": "Software engineer...",
  "updated_at": "2026-06-26T03:30:00Z",
  "id": "usr_9921",
  "username": "johndoe",
  "created_at": "2026-01-12T11:22:00Z"
}
```

```json
// Terformat seperti pro
{
  "id": "usr_9921",
  "username": "johndoe",
  "bio": "Software engineer...",
  "created_at": "2026-01-12T11:22:00Z",
  "updated_at": "2026-06-26T03:30:00Z"
}
```

## 3. Tangani String Kompleks dan Baris Baru dengan Aman

Blok teks, potongan HTML, ekspresi reguler, atau path Windows sering bikin JSON jadi invalid bila tidak di-escape.

- Escape kutipan internal: gunakan `\"` di dalam string JSON.
- Path dan regex: gunakan double backslash `\\` saat diperlukan.
- Baris baru: representasikan dengan `\n`, jangan pakai pemecahan baris fisik di dalam file JSON.

Contoh:

```json
{
  "regex": "^\\/api\\/v1\\/([a-zA-Z0-9]+)$",
  "template": "<div class=\"hero\">\n\t<h1>Welcome</h1>\n</div>"
}
```

## 4. Flatten Struktur yang Terlalu Dalam

JSON mendukung nesting tanpa batas, tapi itu tidak berarti kamu harus memanfaatkannya. Struktur 5–6 level membuat kode klien rentan terhadap error dan butuh banyak optional chaining.

Solusi praktis: normalisasi data — pindahkan sub-objek ke koleksi terpisah, gunakan referensi ID, atau ringkas properti yang jarang dipakai.

Manfaatnya: akses lebih sederhana, parsers lebih cepat, dan review lebih mudah.

## 5. Otomatiskan Formatting — Jangan Manual

Pro sejati tidak menyusun JSON satu spasi demi satu spasi. Otomasi menghemat waktu dan mencegah kesalahan sintaks.

Alat yang direkomendasikan:

- JSON Formatter & Validator (web): drop payload mentah, dapatkan indentasi rapi, highlight, dan validasi RFC.
- Prettier (VS Code, Cursor): atur formatter global agar file JSON otomatis rapi saat save.

Contoh konfigurasi VS Code untuk memastikan JSON selalu diformat:

```json
"[json]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.tabSize": 2
}
```

- jstools.space atau tool validator lain: cepat memeriksa trailing commas, kutipan, dan kesalahan struktural.

Debugging logs:

Kadang `console.log(object)` di Node menampilkan `[Object]` atau satu baris tanpa struktur. Gunakan `JSON.stringify` dengan parameter spacing:

```js
// Argumen ketiga menentukan jumlah spasi
console.log(JSON.stringify(complexPayload, null, 2));
```

## Ringkasan dan Praktik yang Bisa Diterapkan Sekarang

- Pilih gaya indentasi dan patuhi konsistensi (biasanya 2 spasi untuk web).
- Minify data saat dikirim lewat jaringan; gunakan prettified JSON saat development.
- Urutkan kunci secara logis (id dulu, timestamps terakhir).
- Escape string dan path dengan benar; representasikan baris baru sebagai `\n`.
- Flatten struktur yang terlalu dalam bila perlu.
- Gunakan alat otomatis (Prettier, JSON validator/formatter) agar tidak tergantung pada penataan manual.

Dengan menerapkan praktik-praktik ini, JSON di proyekmu menjadi lebih mudah dikelola, lebih cepat di-debug, dan lebih aman saat dikonsumsi oleh tim lain. Mulai dari kebiasaan kecil seperti indentasi konsisten sampai pipeline otomatis — semuanya berkontribusi ke codebase yang lebih sehat.

Jika kamu ingin, saya bisa bantu membuat konfigurasi Prettier / ESLint minimal untuk proyekmu atau merekomendasikan tool online yang tepat untuk tim. Mau lanjut ke itu?
