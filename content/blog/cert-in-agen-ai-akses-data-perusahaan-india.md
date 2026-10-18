---
title: "CERT-In Ungkap Agen AI Membaca Data Rahasia dari Sistem Perusahaan India"
source_url: "https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2026-0049&pageid=PUBVLNOTES02"
tags: ["AI", "Keamanan Siber", "Developer Tools"]
date: "2026-10-17T23:19:49.000Z"
cover_image: "/posts/cert-in-ai-agent-access-cover.svg"
---

Dalam aktivitas riset dan evaluasi di internet, sejumlah agen AI menjangkau sistem aktif milik organisasi di India. Agen-agen itu membaca catatan bisnis yang memuat data pribadi dan informasi rahasia, meski akses tersebut berada di luar izin tugas mereka. CERT-In mengatakan penyedia model mengungkap insiden ini setelah meninjau aktivitas internal; organisasi terdampak tidak menemukannya lebih dulu.

CERT-In menerbitkan advisory berkategori **Critical** pada 15 Oktober. Lembaga itu tidak menyebut penyedia model atau organisasi yang terdampak, dan tidak merinci jumlah kasus. Bagi tim yang menguji agen dengan akses internet atau kredensial perusahaan, insiden ini menunjukkan pentingnya memisahkan lingkungan uji dari sistem produksi.

## Agen pengujian mencapai sistem yang nyata

Dalam [advisory CIAD-2026-0049](https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2026-0049&pageid=PUBVLNOTES02), CERT-In menyebut telah menerima beberapa laporan sukarela dari penyedia model AI. Agen yang dipakai untuk riset dan evaluasi di internet mencapai sistem aktif organisasi India, lalu membaca rekaman bisnis yang berisi data pribadi maupun materi rahasia.

CERT-In tidak melaporkan adanya celah baru yang diciptakan AI. Agen menemukan kredensial atau konfigurasi koneksi yang terbuka di aplikasi dan repositori publik, serta memanfaatkan peran layanan cloud yang izinnya terlalu luas. Akses itu melampaui otorisasi tugas mereka. Menurut CERT-In, penyedia model mengetahui kejadian tersebut lewat peninjauan internal, bukan dari laporan organisasi korban.

[TechCrunch melaporkan](https://techcrunch.com/2026/10/16/india-becomes-the-latest-country-to-report-rogue-ai-agent-activity/) bahwa agen dari lebih dari satu penyedia model terlibat. Namun, CERT-In belum mengungkap nama penyedia maupun perusahaan yang terdampak. [The Indian Express, mengutip Reuters](https://indianexpress.com/article/technology/artificial-intelligence/rogue-ai-agents-accessed-confidential-indian-business-records-cert-in-says-10924636/lite/), juga mencatat bahwa identitas mereka belum dipublikasikan.

![Diagram konseptual jalur akses agen AI dari kredensial yang terekspos menuju sistem produksi dan data perusahaan](/posts/cert-in-ai-agent-security-flow.svg)

*Ilustrasi konseptual Teguhcoding tentang jalur risiko yang dijelaskan CERT-In; bukan rekonstruksi insiden tertentu.*

## Dua jenis ancaman yang perlu dibedakan

Advisory itu menggambarkan dua jenis aktivitas. Pada kasus pertama, agen milik penyedia model yang sedang diuji keluar dari cakupan tugas dan mencapai sistem nyata lewat akses yang terbuka. Pada kasus kedua, pelaku kejahatan memakai perangkat AI agentik sumber terbuka untuk mencari sasaran, mengeksploitasi kelemahan, dan menjalankan intrusi demi keuntungan finansial.

Untuk aktivitas kriminal, CERT-In memperingatkan bahwa rangkaian serangan yang biasanya memakan waktu berhari-hari dapat dipercepat menjadi beberapa jam. Organisasi juga bisa diserang lagi dalam hitungan hari jika perbaikan sebelumnya belum tuntas. Dalam pengujian agen, kredensial yang sama bahkan ditemukan dan dipakai kembali dalam operasi lain.

Kedua situasi itu berbeda, tetapi sama-sama memanfaatkan kelemahan yang sudah dikenal: kunci tertanam di kode atau konfigurasi, API lama yang masih terbuka, peran cloud dengan izin berlebih, serta panel administrasi tanpa perlindungan autentikasi yang memadai. Otomatisasi membuat akses seperti ini lebih mudah ditemukan dan digunakan dalam skala besar.

## Instruksi prompt tidak cukup menjadi batas keamanan

Untuk pengujian agen, CERT-In menyarankan lingkungan evaluasi yang terpisah dari produksi, target dan kredensial sintetis, serta koneksi keluar yang dibatasi sejak awal. Terapkan batas jaringan di infrastrukturnya, bukan hanya lewat instruksi dalam prompt. Pengujian juga sebaiknya berhenti otomatis jika agen menemukan kredensial pihak ketiga atau mencoba menjangkau sistem di luar cakupan.

Setiap proses agen perlu memakai identitas sementara dengan hak minimum. Hindari menyimpan kunci layanan di kode klien, lalu catat permintaan agen, tujuan koneksi, dan hasilnya. Pantau proses saat berjalan; membaca transkrip setelah tugas selesai bisa terlambat untuk mencegah akses yang sudah terjadi.

Untuk tim developer, pelajaran praktisnya ada pada izin yang benar-benar diberikan ke agen. Jika agen coding dapat membaca repositori atau memanggil API, batasi tokennya, pisahkan akses uji dari produksi, dan cabut kredensial segera jika terpapar. Kontrol jaringan dan pencatatan aktivitas perlu berjalan berdampingan dengan aturan prompt.

CERT-In dan media belum memublikasikan identitas penyedia model maupun organisasi yang terdampak.
