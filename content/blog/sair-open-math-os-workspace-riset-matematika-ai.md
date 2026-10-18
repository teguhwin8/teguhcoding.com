---
title: "SAIR Buka Akses Awal Open Math OS untuk Riset Matematika dengan AI"
source_url: "https://www.openmathmodel.org/about/"
tags: ["AI", "Riset", "Developer Tools"]
date: "2026-10-18T03:17:27.287Z"
cover_image: "/posts/sair-open-math-os-cover.svg"
---

SAIR Foundation mulai membuka akses awal **Open Math OS**, workspace berbasis cloud yang menggabungkan model matematika open-weight, alat komputasi ilmiah, dan ruang kolaborasi tim. Pengumuman soft launch disampaikan pada 16 Oktober oleh matematikawan Terence Tao. Ini bukan peluncuran model baru: layanan tersebut saat ini menjalankan model yang sudah ada, lalu menyatukan beberapa tahap riset matematika dalam satu lingkungan kerja. ([pengumuman Terence Tao](https://terrytao.wordpress.com/2026/10/16/sair-open-math-os-released/), [penjelasan resmi Open Math OS](https://www.openmathmodel.org/about/).)

![Ilustrasi konseptual workspace matematika yang menghubungkan peneliti, model AI, dan pemeriksaan bukti formal](/posts/sair-open-math-os-workflow.svg)

*Ilustrasi konseptual buatan Teguhcoding, bukan tangkapan layar Open Math OS.*

## Satu workspace untuk model, komputasi, dan bukti

Menurut situs resminya, setiap proyek mendapat mesin cloud yang berjalan terus-menerus serta lebih dari 100 alat untuk matematika dan komputasi ilmiah. Daftarnya mencakup Lean 4 dan Mathlib untuk formalisasi bukti, juga SageMath, PARI/GP, SymPy, dan LaTeX. Peneliti dapat bekerja melalui browser tanpa menyiapkan semua perangkat tersebut di laptop sendiri.

Open Math OS juga menawarkan Ultramath, fitur yang menjalankan beberapa agent pada satu masalah secara paralel. Agent dapat mengusulkan pendekatan dan mengembalikan hasilnya ke ruang proyek, sementara peneliti tetap menentukan mana yang benar. Bagi developer, bagian menariknya adalah integrasi antara percakapan dengan model, komputasi yang dapat dijalankan, dan pemeriksaan formal menggunakan Lean—bukan klaim bahwa agent otomatis menghasilkan bukti yang valid. ([daftar fitur Open Math OS](https://www.openmathmodel.org/about/).)

## Model yang dipakai masih model pihak ketiga

Pada tahap awal, layanan ini menampung Kimi K3, DeepSeek V4.1 Flash, dan GLM 5.3 Flash—semuanya model open-weight dari pengembang lain. Tao menyebut model-model tersebut masih tertinggal kira-kira setahun dari kemampuan frontier saat ini. Ia menilai model itu belum cocok untuk menyelesaikan masalah sulit dalam sekali jalan, tetapi sudah dapat membantu tugas seperti merapikan argumen menengah ke Lean, merangkum literatur, atau mendiskusikan topik matematika.

SAIR mengatakan sedang mencari mitra untuk mengembangkan model matematika yang lebih terarah dengan melakukan post-training pada model terbuka. Jadi, nilai Open Math OS untuk saat ini lebih terletak pada lingkungan riset dan akses komputasinya, sementara pengembangan model khusus masih menjadi pekerjaan berikutnya. ([catatan soft launch Tao](https://terrytao.wordpress.com/2026/10/16/sair-open-math-os-released/), [rencana Open Math Model](https://www.openmathmodel.org/about/).)

## Privasi dan tata kelola menjadi bagian dari desain

SAIR menyatakan proyek, berkas, dan percakapan bersifat privat sampai tim memilih untuk membagikannya; materi pengguna hanya dipakai untuk pelatihan bila ada persetujuan eksplisit. Organisasi itu juga berkomitmen mempertahankan kepemilikan dan kredit karya pada penulisnya. Ini adalah kebijakan yang diumumkan oleh pengelola platform, sehingga peneliti tetap perlu membaca ketentuan layanan dan memahami siapa saja yang bisa melihat isi workspace mereka.

Model akun Open Math OS menekankan tim: dalam satu tim, anggota dapat melihat prompt satu sama lain. Tao menyebut akses awal gratis sedang diberikan kepada pemohon dari institusi akademik dengan komputasi sumbangan. Di kolom komentar pengumumannya, pembaca juga bertanya tentang alur pendaftaran, akun untuk kolaborasi yang berbeda, dan kemungkinan menjalankan model secara lokal—pertanyaan yang relevan untuk layanan yang masih berada pada tahap awal. ([kebijakan dan akses Open Math OS](https://www.openmathmodel.org/about/), [pengumuman dan diskusi Tao](https://terrytao.wordpress.com/2026/10/16/sair-open-math-os-released/).)

Open Math OS mencoba membawa model terbuka, komputasi, agent, dan pemeriksaan bukti ke tempat kerja yang sama. Untuk saat ini, peneliti dapat menganggapnya sebagai workspace eksperimen yang masih berkembang, bukan pengganti proses verifikasi matematika atau bukti bahwa AI sudah mampu melakukan riset mandiri.
