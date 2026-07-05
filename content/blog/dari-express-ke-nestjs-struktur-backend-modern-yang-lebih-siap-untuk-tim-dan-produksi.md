---
title: "Dari Express ke NestJS: Struktur Backend Modern yang Lebih Siap untuk Tim dan Produksi"
source_url: "https://www.youtube.com/watch?v=Q6NpiIp-6WM"
tags: ["NestJS","Backend","TypeScript"]
date: "2026-07-05T17:27:24.549Z"
cover_image: "https://i.ytimg.com/vi/Q6NpiIp-6WM/maxresdefault.jpg"
---

Kalau kamu sudah cukup lama membangun backend dengan Express, kemungkinan besar kamu pernah sampai di titik ini: API jalan, deployment aman, endpoint bisa dipakai, tapi begitu melihat lowongan kerja atau tutorial backend modern, nama NestJS muncul di mana-mana.

Lalu pertanyaannya jadi cukup wajar: apakah Express masih cukup? Atau memang ada lapisan arsitektur backend yang selama ini terlewat?

Kabar baiknya, pengetahuan Express sama sekali tidak terbuang. Justru itu adalah modal awal yang bagus. NestJS tidak datang untuk menghapus apa yang sudah kamu pahami dari Express. Ia mengambil fondasi tersebut, lalu menambahkan struktur, pola kerja, dan arsitektur yang lebih cocok untuk aplikasi besar serta tim yang berkembang.

## Express Itu Fleksibel, tapi Fleksibilitas Bisa Jadi Masalah

Express sering terasa seperti kanvas kosong. Kamu bebas menentukan semuanya sendiri: struktur folder, penamaan file, cara memisahkan logic, cara menulis middleware, sampai pola komunikasi antarbagian aplikasi.

Untuk prototype cepat, ini menyenangkan. Kamu bisa membuat server sederhana dalam beberapa menit. Tetapi begitu proyek mulai membesar, kebebasan itu bisa berubah menjadi beban.

Masalah yang sering muncul antara lain:

- Setiap developer punya gaya struktur folder sendiri.
- Business logic bercampur dengan route handler.
- Testing menjadi lebih sulit karena dependency tersebar.
- Onboarding developer baru butuh waktu lebih lama.
- Diskusi tim habis untuk hal-hal seperti “service ini taruh di mana?” atau “folder ini harusnya namanya apa?”.

Dengan kata lain, Express memberi kebebasan penuh, tapi kamu sendiri yang harus membuat aturan mainnya.

## NestJS: Express dengan Arsitektur yang Lebih Tegas

NestJS bisa dibayangkan sebagai versi backend yang lebih “tertata”. Kalau Express adalah wild west, NestJS adalah kota modern dengan zoning law. Ada aturan, ada pola, dan ada tempat yang jelas untuk setiap bagian kode.

Yang menarik, NestJS tidak benar-benar menggantikan Express. Secara default, NestJS justru berjalan di atas Express. Express tetap menangani layer HTTP mentah di balik layar, sementara NestJS membungkusnya dengan struktur yang lebih rapi.

Inilah yang membuat Nest terasa familiar bagi developer Express, tetapi sekaligus terasa lebih profesional untuk aplikasi skala produksi.

## Tiga Konsep Utama yang Membuat NestJS Berbeda

Ada tiga hal besar yang perlu kamu pahami saat berpindah dari Express ke NestJS: TypeScript, dependency injection, dan decorators.

### 1. TypeScript dari Awal

NestJS dibangun untuk TypeScript. Tidak perlu setup Babel yang rumit atau konfigurasi tambahan hanya agar project bisa berjalan dengan typing yang layak.

Dari awal, kamu mendapatkan pengalaman development yang lebih aman:

- Type checking yang jelas.
- Autocomplete yang lebih membantu.
- Struktur class dan interface yang lebih konsisten.
- Refactor kode yang lebih percaya diri.

Untuk backend production, ini sangat membantu karena banyak bug bisa dicegah sebelum aplikasi dijalankan.

### 2. Dependency Injection

Dependency injection adalah salah satu konsep yang awalnya terasa asing, terutama jika kamu terbiasa dengan Express yang lebih manual.

Di Express, kamu biasanya mengimpor service, membuat instance, lalu memakainya langsung di route handler. Di NestJS, framework yang mengatur dependency tersebut untukmu.

Misalnya sebuah controller membutuhkan user service. Kamu tidak perlu membuat instance service secara manual. Kamu cukup mendeklarasikannya lewat constructor, lalu Nest akan menyuntikkannya.

Keuntungannya besar:

- Kode lebih loosely coupled.
- Service lebih mudah dites.
- Dependency antarbagian aplikasi lebih mudah dilacak.
- Integrasi dengan database, auth, dan external service menjadi lebih rapi.

Ini adalah pola yang sudah lama dipakai di ekosistem Java dan C#, dan NestJS membawanya ke dunia Node.js dengan cara yang cukup natural.

### 3. Decorators

Kalau kamu pernah melihat kode NestJS, kamu pasti melihat simbol seperti `@Controller()`, `@Get()`, atau `@Injectable()`.

Itulah decorators.

Alih-alih menulis route secara manual seperti di Express, kamu memberi anotasi pada class dan method. Nest kemudian membaca anotasi tersebut dan mengatur routing, dependency, serta lifecycle aplikasi di balik layar.

Hasilnya, kode menjadi lebih deklaratif. Kamu bisa membaca sebuah controller dan langsung paham endpoint apa yang tersedia, tanpa harus menelusuri banyak konfigurasi manual.

## Struktur Dasar NestJS: Module, Controller, dan Service

Setiap aplikasi NestJS dibangun dari tiga blok utama:

- Module
- Controller
- Service atau Provider

Pola ini hampir selalu muncul di setiap fitur.

Misalnya kamu punya fitur user. Maka biasanya akan ada:

- `user.module.ts`
- `user.controller.ts`
- `user.service.ts`

### Module

Module adalah tempat untuk mengelompokkan fitur. Semua hal yang berhubungan dengan user diletakkan di user module. Semua hal yang berhubungan dengan hackathon diletakkan di hackathon module.

Dengan cara ini, aplikasi besar tidak berubah menjadi kumpulan file acak. Setiap fitur punya ruangnya sendiri.

### Controller

Controller menangani request yang masuk. Kalau ada request `GET /users`, controller adalah bagian pertama yang biasanya menerima request tersebut.

Namun controller sebaiknya tidak berisi business logic yang berat. Tugasnya lebih seperti pintu masuk: menerima request, memanggil service yang sesuai, lalu mengembalikan response.

### Service

Service adalah tempat business logic berada. Di sinilah kamu menulis operasi seperti mengambil data user, membuat akun baru, memvalidasi aturan bisnis, atau berinteraksi dengan database melalui Prisma.

Pemisahan ini membuat kode lebih bersih dan mudah dirawat.

## Memulai Project NestJS dengan CLI

Salah satu hal yang menyenangkan dari NestJS adalah CLI-nya. CLI membantu membuat struktur project tetap konsisten tanpa harus membuat file satu per satu.

Sebelum mulai, pastikan Node.js sudah siap. NestJS membutuhkan Node 20 atau lebih baru. Setelah itu, kamu bisa menginstal CLI secara global dengan perintah `npm i -g @nestjs/cli`.

Untuk membuat project baru, jalankan `nest new nama-project`. CLI akan menanyakan package manager yang ingin dipakai, lalu membuat struktur project secara otomatis.

Di dalam project, file penting pertama yang perlu kamu lihat adalah `main.ts`. File ini adalah entry point aplikasi. Di sinilah Nest melakukan bootstrap dan menjalankan server, biasanya pada port 3000.

Untuk development, kamu bisa menjalankan `npm run start:dev`. Mode ini akan menjalankan aplikasi dengan watch mode, sehingga server otomatis restart setiap kali kamu menyimpan perubahan.

## Kenapa NestJS Lebih Cocok untuk Backend Production?

NestJS bersinar ketika proyek mulai serius. Bukan hanya untuk endpoint sederhana, tetapi untuk aplikasi yang punya autentikasi, role-based access control, database, validasi, security layer, dan banyak module.

Dalam konteks project production-style seperti API hackathon, NestJS sangat masuk akal. Kamu bisa membagi fitur menjadi beberapa module, misalnya:

- Auth module untuk login, register, dan session.
- User module untuk manajemen pengguna.
- Hackathon module untuk event dan submission.
- Admin module untuk permission khusus admin.
- Participant module untuk fitur peserta.

Dengan stack seperti Prisma untuk PostgreSQL, Better Auth untuk autentikasi, dan Arkjet untuk security, NestJS memberikan kerangka yang rapi agar semua bagian itu tidak saling tumpang tindih.

## Dari Belajar Fundamental ke Membangun dengan AI

Menariknya, cara membangun backend juga mulai berubah. Developer modern tidak selalu menulis setiap baris kode secara manual. Dengan pendekatan agentic, kamu mengarahkan AI untuk membuat bagian tertentu, lalu kamu mereview, memperbaiki, dan memastikan hasilnya sesuai arsitektur.

Tetapi ini hanya efektif kalau kamu paham fondasinya.

AI bisa membantu menulis kode, tetapi kamu tetap perlu tahu:

- Di mana controller harus dibuat.
- Logic apa yang masuk ke service.
- Module mana yang harus mengimpor provider tertentu.
- Bagaimana dependency injection bekerja.
- Bagaimana request diproses dalam lifecycle NestJS.
- Bagaimana guard, pipe, dan middleware dipakai dengan benar.

Tanpa pemahaman itu, AI hanya akan mempercepat kekacauan. Dengan pemahaman yang benar, AI bisa menjadi akselerator yang sangat kuat.

## Express Masih Relevan, tapi NestJS Memberi Arah

Express tetap berguna. Untuk project kecil, API sederhana, atau prototype cepat, Express masih menjadi pilihan yang ringan dan fleksibel.

Namun jika kamu ingin masuk ke backend yang lebih enterprise, bekerja dalam tim besar, atau membangun aplikasi yang siap dipamerkan di portfolio dan resume, NestJS memberi banyak keuntungan.

Ia menyediakan struktur yang jelas, pola yang konsisten, integrasi TypeScript yang matang, dan arsitektur yang lebih mudah diskalakan.

Jadi kalau kamu sudah bisa Express, kamu sebenarnya tidak mulai dari nol. Kamu hanya naik level dari sekadar membuat endpoint menjadi merancang backend yang lebih terorganisir, mudah dites, dan siap produksi.

Dan begitu konsep module, controller, service, dependency injection, serta decorators mulai terasa natural, NestJS akan terasa jauh lebih masuk akal daripada kelihatannya di awal.
