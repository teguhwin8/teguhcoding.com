---
title: "Vercel Agent Stack: Fondasi Lengkap untuk Membangun AI Agent Production-Ready"
source_url: "https://vercel.com/blog/agent-stack"
tags: ["AI Agent","Vercel","Developer Tools"]
date: "2026-06-28T18:31:26.079Z"
cover_image: "https://assets.vercel.com/image/upload/contentful/image/e5382hct74si/3DY9nOdYwY2S9sBIiLSMF7/e84c52b9ffaa367fdc606182287aae8a/agent-stack-og-final.png"
---

Membangun AI agent yang benar-benar siap dipakai di production bukan sekadar memanggil model AI lalu menampilkan jawabannya ke user. Agent modern harus bisa memilih model yang tepat, menjalankan workflow panjang, mengeksekusi kode dengan aman, mengakses data internal, sampai hadir di platform tempat pengguna bekerja sehari-hari.

Di sinilah Vercel memperkenalkan **Agent Stack**, kumpulan building block untuk membantu developer membangun, menjalankan, dan mengirim agent ke production tanpa harus terjebak pada satu provider model atau merakit terlalu banyak infrastruktur sendiri.

## Tiga kebutuhan utama AI agent

Apa pun bentuknya, agent pada dasarnya membutuhkan tiga kemampuan inti:

1. **Terhubung ke berbagai model AI** dan bisa melakukan routing sesuai kebutuhan tugas.
2. **Menjalankan workflow multi-step** yang tahan terhadap kegagalan, jeda, atau proses panjang.
3. **Terhubung ke data, tools, dan platform komunikasi** agar agent benar-benar berguna dalam konteks kerja pengguna.

Tanpa fondasi ini, developer biasanya dihadapkan pada pilihan yang kurang ideal: terkunci pada satu vendor, menyambungkan banyak layanan secara manual, atau membangun abstraction layer sendiri dari nol.

## AI SDK dan AI Gateway: satu interface untuk banyak model

Agent yang baik tidak selalu memakai satu model untuk semua hal. Analisis pasar mungkin lebih cocok dikerjakan Claude, copywriting bisa diarahkan ke GPT, sementara pembuatan gambar dapat memakai Gemini atau model visual lain.

Masalahnya, setiap provider punya API, format request, streaming, tool calling, dan structured output yang berbeda. **AI SDK** menyederhanakan ini dengan menyediakan satu interface yang agnostik terhadap platform, framework, dan model.

Dengan pendekatan ini, mengganti model cukup dilakukan dengan mengubah satu string, bukan menulis ulang integrasi.

Sementara itu, **AI Gateway** berperan seperti “CDN untuk token”. Ia menyediakan satu endpoint untuk melakukan routing ke ratusan model, menangani failover ketika provider bermasalah, serta melacak biaya dan penggunaan di berbagai model. Ini penting karena token kini sudah menjadi dependency production, mirip seperti bandwidth bagi aplikasi web.

## Workflow SDK: agent yang tahan gagal dan bisa melanjutkan pekerjaan

Banyak tugas agent tidak selesai dalam satu langkah. Ada proses yang berjalan beberapa menit, bahkan berjam-jam, melibatkan API eksternal, approval manusia, webhook, atau rangkaian model call yang mahal.

Jika salah satu langkah gagal dan tidak ada mekanisme resume, seluruh pekerjaan harus diulang dari awal. Itu bukan hanya boros waktu, tetapi juga boros biaya.

**Workflow SDK** menyelesaikan masalah ini dengan melakukan checkpoint pada setiap langkah. State disimpan, retry ditangani, dan proses bisa dijeda ketika menunggu input manusia atau respons dari sistem lain. Jika terjadi kegagalan, workflow dapat dilanjutkan dari langkah terakhir yang berhasil, bukan dimulai ulang dari nol.

Bagi tim yang membangun agent kompleks, kemampuan durability seperti ini mengurangi banyak beban arsitektur yang biasanya harus dibangun sendiri.

## Vercel Sandbox: menjalankan kode agent dengan aman

Agent yang mampu membaca file, menjalankan command, atau menulis kode memang jauh lebih powerful. Namun kemampuan ini juga membawa risiko besar jika tidak dibatasi dengan benar.

**Vercel Sandbox** memberikan setiap agent sebuah microVM terisolasi, lengkap dengan lingkungan Linux, filesystem, dukungan Docker, dan kernel sendiri. Artinya, kode yang belum direview dapat dijalankan di lingkungan sementara yang terpisah dari host maupun sandbox lain.

Pendekatan ini penting untuk use case seperti coding agent, data processing, atau automation yang membutuhkan eksekusi command. Kredensial juga hanya diinjeksi ketika agent benar-benar memanggil service tertentu, sehingga raw token tidak terekspos langsung ke agent.

## Vercel Connect: akses aman ke sistem dan data

Agent yang hanya bisa berbicara dengan model tidak akan banyak membantu. Agar bermanfaat, agent perlu membuka pull request, memperbarui record, membaca data warehouse, membuat tiket, atau berinteraksi dengan tools bisnis lain.

Masalah klasiknya adalah akses. Banyak implementasi agent masih mengandalkan token jangka panjang dengan permission luas. Ini berisiko, sulit diaudit, dan tidak selalu jelas tindakan mana yang diotorisasi oleh user tertentu.

**Vercel Connect** memperkenalkan pendekatan berbasis token jangka pendek yang scoped per task. Agent hanya mendapatkan permission yang memang diperlukan untuk pekerjaan tersebut. Setiap aksi juga dapat dilacak dari user ke agent hingga ke service yang dipanggil, sehingga audit log menjadi jauh lebih jelas.

Saat ini Vercel Connect tersedia dalam public beta dengan dukungan untuk Slack, GitHub, Snowflake, Salesforce, Notion, Linear, serta layanan lain melalui OAuth atau API.

## Chat SDK: membawa agent ke tempat user bekerja

Pengguna tidak selalu berada di satu aplikasi. Mereka bisa memulai percakapan di Slack, melanjutkannya di GitHub, lalu menindaklanjuti di Linear atau Discord.

Membangun integrasi untuk tiap platform secara manual berarti menangani API, authentication flow, dan format pesan yang berbeda-beda. **Chat SDK** menyederhanakan proses ini dengan menyediakan adapter lintas platform, sehingga agent dapat hadir di banyak channel dari satu codebase.

Ini membuka pola interaksi yang lebih natural: agent tidak hanya hidup di satu dashboard, tetapi bisa mengikuti alur kerja pengguna di berbagai permukaan.

## Eve: framework agent di atas Agent Stack

Dari pengalaman membangun ratusan agent, Vercel juga memperkenalkan gambaran tentang struktur agent yang lebih terorganisir melalui framework bernama **eve**. Sebuah agent tidak hanya terdiri dari model, tetapi juga instruksi, tools, skills, subagents, channel, dan schedule.

Struktur seperti ini membantu developer memisahkan:

- model yang digunakan agent,
- instruksi dan persona agent,
- kemampuan teknis melalui tools,
- pengetahuan domain melalui skills,
- delegasi ke subagent,
- serta channel tempat agent berinteraksi dengan user.

Dengan kata lain, agent mulai diperlakukan seperti software product yang memiliki arsitektur jelas, bukan sekadar prompt panjang yang ditempel ke API model.

## Kenapa ini penting?

Agent production-ready membutuhkan lebih dari sekadar kecerdasan model. Ia membutuhkan routing, observability biaya, durability, isolasi eksekusi, permission yang aman, dan integrasi platform.

Vercel Agent Stack mencoba menggabungkan semua kebutuhan itu ke dalam satu ekosistem yang modular. Developer tetap bisa memilih komponen yang dibutuhkan, tetapi tidak harus membangun fondasi agent dari nol.

Bagi tim yang sedang bereksperimen dengan AI agent, ini bisa mempercepat iterasi. Bagi tim yang sudah masuk production, ini menjawab persoalan yang lebih serius: reliabilitas, keamanan, biaya, dan skalabilitas.

AI agent mungkin terlihat sederhana dari sisi user. Namun di balik layar, agent yang benar-benar berguna membutuhkan infrastruktur yang matang. Agent Stack adalah upaya Vercel untuk menjadikan infrastruktur tersebut lebih mudah diakses oleh developer.
