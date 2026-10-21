---
title: "Agen AI Dikerahkan ke 1.200 Situs, Lebih dari 100 Perusahaan Dilaporkan Dibobol"
source_url: "https://norforge.com/blog/inside_cairn"
tags: ["AI", "Keamanan Siber", "Developer"]
date: "2026-10-21T06:51:10.000Z"
cover_image: "/posts/cairn-ai-agent-cyberattack-cover.jpg"
---

Seorang operator memakai agen AI di platform Cairn untuk mencoba masuk ke lebih dari 1.200 situs. Reuters mengidentifikasi lebih dari 100 perusahaan yang terdampak dari catatan kampanye itu. Angka 1.200 adalah jumlah situs yang dicoba, bukan yang dipastikan berhasil dibobol; peneliti NorForge memverifikasi beberapa kompromi, termasuk sebuah web shell yang masih aktif.

![Seseorang mengetik di depan layar komputer berisi kode; foto ilustrasi, bukan pelaku dalam laporan](/posts/cairn-ai-agent-cyberattack-cover.jpg)

*Foto ilustrasi oleh [Julio Lopez di Pexels](https://www.pexels.com/photo/hacker-in-hoodie-working-on-cybersecurity-code-34258666/), digunakan sesuai [lisensi Pexels](https://www.pexels.com/license/). Foto ini tidak menggambarkan operator atau insiden dalam laporan.*

Temuan itu berasal dari [investigasi NorForge](https://norforge.com/blog/inside_cairn) yang terbit 19 Oktober. [Reuters](https://www.reuters.com/legal/government/how-one-hacker-used-ai-agents-few-thousand-dollars-break-into-scores-sites-2026-10-19/) meninjau catatan aktivitas operator; [The Verge](https://www.theverge.com/ai-artificial-intelligence/1013643/ai-agents-hack-john-deere-shark-ninja-cummins) melaporkan Deere, SharkNinja, dan Cummins termasuk nama yang disebut. Beberapa perusahaan itu mengatakan dampaknya terbatas atau masih diselidiki.

## Manusia memilih sasaran, agen mengerjakan langkah-langkahnya

Cairn adalah kerangka pemecahan masalah berbasis agen. Operator memberi titik awal dan tujuan, lalu agen membagi pekerjaan dan menaruh temuannya di papan bersama. Operator bisa menambahkan petunjuk selama proses berjalan. Cairn dibuat untuk berbagai tugas, termasuk pengujian penetrasi yang sah; dalam kasus ini, operator mengarahkannya ke situs tanpa izin.

![Alur yang dilaporkan NorForge: operator menentukan target dan tujuan, agen mengerjakan langkah-langkah, lalu temuan kembali ke papan bersama](/posts/cairn-ai-agent-workflow.svg)

*Diagram ringkas berdasarkan [laporan NorForge](https://norforge.com/blog/inside_cairn); ini bukan diagram asli dari Cairn.*

NorForge menemukan lebih dari 20 panel Cairn yang terbuka di internet dan menilai panel-panel itu kemungkinan terkait aktivitas berbahaya. Dalam satu kelompok yang mereka sebut AIA0001, ada 14 panel dengan lebih dari 1.100 proyek serangan. Instruksi awalnya bisa singkat; agen kemudian mencari jalan sendiri menuju tujuan yang ditetapkan operator.

Peneliti memperkirakan tingkat keberhasilan sekitar 10 persen untuk aktivitas yang diamati. Angka ini perkiraan kasar: kelompok yang diteliti punya sasaran dan definisi “berhasil” yang berbeda, jadi hasilnya tidak bisa dibandingkan langsung. NorForge juga melaporkan rata-rata proyek yang berhasil mencapai tujuan memerlukan waktu kurang dari 23 jam.

## Panel yang terbuka ikut membocorkan data

Masalahnya tidak berhenti pada situs yang diserang. Panel yang dibiarkan terbuka juga menyimpan target, hasil pemeriksaan, serta kredensial dan kunci API. Dari ratusan rahasia yang ditemukan, pemindai NorForge memvalidasi sekitar 11 persen sebagai masih berlaku. Mereka mengatakan belum mencoba mengambil alih panel-panel itu.

NorForge memverifikasi sebuah web shell pada situs vendor perangkat keras. Deere dan SharkNinja mengatakan dampaknya terbatas, sementara Cummins sedang menyelidiki kemungkinan insiden pada situs milik vendornya. Berapa banyak data yang mungkin diambil belum diketahui. Cairn sendiri tidak memilih sasaran secara mandiri: manusia yang memasukkan target dan tujuan. Penulis Cairn mengatakan kepada Reuters bahwa alat itu tidak dirancang untuk serangan berbahaya.

## Batas akses tetap penting saat agent bekerja lama

Bagi tim developer, risikonya muncul saat agent diberi akses jaringan lalu dibiarkan menjalankan banyak langkah tanpa pengawasan langsung. Jika agent perlu memakai browser, shell, atau API, jalankan di lingkungan yang terpisah dari produksi dan batasi sasaran ke sistem yang memang diizinkan. Panel kendalinya sebaiknya hanya bisa dibuka melalui jaringan privat dengan autentikasi kuat; jangan jadikan kredensial produksi sebagai akses bawaan.
