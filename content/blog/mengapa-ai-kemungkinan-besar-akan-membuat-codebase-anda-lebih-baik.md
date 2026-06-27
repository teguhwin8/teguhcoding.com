---
title: "Mengapa AI Kemungkinan Besar Akan Membuat Codebase Anda Lebih Baik"
source_url: "https://www.youtube.com/watch?v=rcoONGJiGx0"
tags: ["AI","engineering","code quality"]
date: "2026-06-27T09:05:52.425Z"
cover_image: "https://img.youtube.com/vi/rcoONGJiGx0/maxresdefault.jpg"
---

# Mengapa AI Kemungkinan Besar Akan Membuat Codebase Anda Lebih Baik

Banyak orang membicarakan AI dengan nada yang ekstrem. Di satu sisi, ada hype tentang *vibe coding*, otomatisasi, dan kemampuan model AI yang terasa seperti sihir. Di sisi lain, ada juga kekhawatiran besar: AI bisa berhalusinasi, menulis kode buruk, bahkan merusak sistem jika digunakan tanpa kontrol. Wajar kalau banyak developer tetap skeptis.

Namun, jika kita melihatnya dengan lebih jernih, AI sebenarnya bisa menjadi alat yang sangat kuat untuk meningkatkan kualitas codebase—terutama pada proyek kecil hingga menengah yang biasanya paling rentan terhadap masalah kualitas.

## Kenapa skeptisisme terhadap AI itu masuk akal

Kita semua pernah mendengar cerita buruk:

- AI menghasilkan kode yang jelek atau tidak relevan
- AI menyebabkan bug pada sistem yang sudah berjalan
- AI melakukan perubahan berbahaya tanpa memahami konteks
- Dalam kasus ekstrem, AI bahkan bisa merusak data produksi

Masalahnya bukan sekadar apakah AI “pintar” atau tidak. Masalah utamanya adalah **bagaimana AI dipakai**. Jika digunakan tanpa pengawasan, tanpa spesifikasi yang jelas, dan tanpa verifikasi, hasilnya memang bisa berantakan.

## Codebase kecil dan menengah sering punya masalah yang sama

Dari pengalaman bekerja sebagai freelance developer dan meninjau ribuan pull request dari banyak developer Android dan KMP, ada pola yang sering berulang: pada sebagian besar codebase kecil hingga menengah, selalu ada hal penting yang sering terlewat.

Beberapa contohnya:

### 1. Testing sering diabaikan

Idealnya, sebuah codebase profesional punya cakupan pengujian yang cukup baik—misalnya mendekati 80% coverage untuk area-area penting. Tapi kenyataannya, banyak repository yang:

- tidak punya test sama sekali
- punya test, tetapi cakupannya sangat rendah
- hanya disiplin di beberapa bagian saja

Test memang membosankan, tapi ketika bug muncul, dokumentasi test dan coverage yang baik menjadi penyelamat.

### 2. Dokumentasi sering minim

Tidak banyak developer yang suka menulis dokumentasi. Tetapi saat terjadi masalah atau perilaku aneh, dokumentasi yang jelas bisa menghemat banyak waktu.

Tanpa dokumentasi, tim baru akan kesulitan memahami:

- alasan sebuah keputusan arsitektur
- cara kerja modul tertentu
- batasan atau asumsi penting dalam sistem

### 3. Konsistensi praktik coding sering menurun seiring waktu

Codebase yang awalnya rapi bisa menjadi campur aduk seiring berkembangnya proyek. Ini sangat wajar. Dalam satu project, kita bisa menemukan:

- bagian lama yang memakai pola A
- bagian baru yang memakai pola B
- modul XML bercampur dengan Compose
- area yang masih memakai RxJava sementara yang lain sudah memakai Kotlin Flow

Migrasi besar ke pendekatan baru sering kali mahal dan tidak langsung memberi keuntungan bisnis. Karena itu, banyak proyek akhirnya hidup dengan campuran praktik lama dan baru.

## Di sinilah AI bisa membantu

Banyak hal yang dulu sulit dijaga konsistensinya kini bisa dibantu AI hampir “gratis”, asalkan dipakai dengan benar.

AI dapat membantu untuk:

- menjaga gaya penulisan kode tetap konsisten
- menghasilkan boilerplate yang mengikuti standar tim
- membantu menulis test
- membantu menyusun dokumentasi
- mempercepat refactoring terarah
- menerapkan pola yang sama di banyak file atau modul

Artinya, AI bukan pengganti engineer, melainkan alat untuk memperkuat disiplin engineering.

## Kuncinya bukan AI, tapi guardrail

AI memang bisa memberikan hasil yang buruk jika dibiarkan tanpa batas. Karena itu, beberapa hal berikut wajib ada:

- **spesifikasi yang jelas**
- **konteks yang cukup**
- **quality gate yang ketat**
- **verifikasi melalui CI dan review manusia**
- **proses kerja yang terkontrol**

Kalau AI dipakai sekadar untuk “bikin semuanya sendiri” tanpa interaksi dan tanpa evaluasi, hasilnya cenderung acak. Tetapi jika AI dipakai dalam lingkungan profesional dengan aturan yang jelas, hasilnya bisa sangat bagus.

## Jangan memandang AI sebagai pengganti manusia

Kesalahan umum adalah menganggap code itu hanya punya dua kemungkinan:

- ditulis AI
- ditulis manusia

Padahal, pendekatan terbaik justru menggabungkan keduanya.

### AI bagus untuk:

- pekerjaan repetitif
- pembuatan draft awal
- generating boilerplate
- transformasi kode skala besar
- membantu eksplorasi solusi

### Manusia lebih unggul untuk:

- keputusan arsitektural
- penilaian konteks bisnis
- penentuan trade-off
- review kualitas dan keamanan
- memastikan implementasi benar-benar sesuai tujuan

Gabungan keduanya memberi “best of both worlds”: efisiensi AI, ditambah penilaian kritis manusia.

## Vibe coder vs workflow profesional

Ada perbedaan besar antara dua pendekatan berikut:

### Vibe coding

- ngobrol singkat dengan AI
- berharap semuanya beres
- minim verifikasi
- sering tidak ada quality gate

### Workflow profesional

- AI terintegrasi dalam proses kerja tim
- ada developer berpengalaman yang mengarahkan
- ada CI pipeline
- ada review, testing, dan standar kualitas

Di lingkungan profesional, AI jauh lebih mungkin membantu daripada merusak.

## Apakah AI akan membuat semua codebase lebih baik?

Tidak.

Tetapi AI **bisa** membuat codebase rata-rata menjadi lebih baik, terutama jika:

- dipakai pada tim yang disiplin
- dipandu oleh spesifikasi yang baik
- diperiksa secara manual
- didukung oleh pipeline kualitas yang kuat

Dengan kata lain, AI bukan jaminan kualitas. Tapi AI bisa menjadi akselerator untuk praktik engineering yang baik.

## Kesimpulan

AI tidak otomatis membuat semua kode menjadi lebih baik. Namun, jika digunakan secara profesional dan terkontrol, AI dapat membantu memperbaiki banyak kelemahan yang umum terjadi pada codebase kecil dan menengah: testing yang minim, dokumentasi yang kurang, dan konsistensi yang sering menurun seiring waktu.

Alih-alih melihat AI sebagai ancaman atau solusi ajaib, cara terbaik adalah melihatnya sebagai alat. Gunakan AI untuk mempercepat hal-hal yang repetitif dan menjaga konsistensi, lalu biarkan manusia mengambil alih pada bagian yang membutuhkan penilaian, konteks, dan tanggung jawab.

Dengan pendekatan itu, AI bukan hanya tidak merusak codebase—tetapi justru bisa membantu membuat codebase Anda lebih baik.
