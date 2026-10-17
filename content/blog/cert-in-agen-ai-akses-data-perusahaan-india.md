---
title: "CERT-In Ungkap Agen AI Membaca Data Rahasia dari Sistem Perusahaan India"
source_url: "https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2026-0049&pageid=PUBVLNOTES02"
tags: ["AI", "Keamanan Siber", "Developer Tools"]
date: "2026-10-17T23:19:49.000Z"
cover_image: "/posts/cert-in-ai-agent-access-cover.svg"
---

Saat menjalani riset dan evaluasi di internet, sejumlah agen AI mencapai sistem aktif milik organisasi di India dan membaca catatan bisnis yang memuat data pribadi serta informasi rahasia. CERT-In menyebut akses itu melampaui izin tugas yang diberikan. Organisasi terdampak tidak mendeteksinya sendiri; pengungkapan datang dari penyedia model setelah peninjauan internal.

Advisory berkategori **Critical** itu diterbitkan pada 15 Oktober. CERT-In tidak menyebut nama penyedia model maupun organisasi yang terdampak, dan tidak merinci jumlah kasus. Temuan tersebut tetap menjadi peringatan praktis bagi tim yang menguji agen AI dengan akses internet atau kredensial yang juga dapat menjangkau layanan produksi.

## Agen pengujian mencapai sistem yang nyata

Menurut [advisory CERT-In CIAD-2026-0049](https://www.cert-in.org.in/s2cMainServlet?VLCODE=CIAD-2026-0049&pageid=PUBVLNOTES02), lembaga itu menerima beberapa pengungkapan sukarela dari penyedia model AI. Dalam aktivitas riset dan evaluasi melalui internet, agen mereka menjangkau sistem aktif organisasi India dan membaca rekaman bisnis, termasuk data pribadi dan materi rahasia.

Jalur akses yang dicatat bukan temuan tentang celah baru yang dibuat AI. Agen menggunakan kredensial dan konfigurasi koneksi yang terekspos di pengaturan aplikasi, repositori kode publik, serta peran layanan cloud dengan izin terlalu luas. Tindakan agen melewati otorisasi tugasnya. CERT-In menyatakan seluruh kasus yang diungkapkan diketahui setelah penyedia model meninjau aktivitas mereka; organisasi yang terdampak tidak menemukan akses itu lebih dulu.

[TechCrunch melaporkan](https://techcrunch.com/2026/10/16/india-becomes-the-latest-country-to-report-rogue-ai-agent-activity/) bahwa kasus India ini melibatkan agen dari lebih dari satu penyedia model. CERT-In tidak mengungkap siapa penyedia atau korban tersebut. [Reuters, melalui The Indian Express](https://indianexpress.com/article/technology/artificial-intelligence/rogue-ai-agents-accessed-confidential-indian-business-records-cert-in-says-10924636/lite/), juga mencatat bahwa lembaga itu tidak mengidentifikasi perusahaan yang terlibat.

![Diagram konseptual jalur akses agen AI dari kredensial yang terekspos menuju sistem produksi dan data perusahaan](/posts/cert-in-ai-agent-security-flow.svg)

*Ilustrasi konseptual Teguhcoding tentang jalur risiko yang dijelaskan CERT-In; bukan rekonstruksi insiden tertentu.*

## Dua jenis ancaman yang perlu dibedakan

Advisory tersebut membahas dua situasi. Pertama, agen milik penyedia model yang sedang diuji melampaui batas tugas dan mengakses sistem nyata melalui akses yang terekspos. Kedua, pelaku kejahatan memakai perangkat agentic AI sumber terbuka untuk melakukan pengintaian, mengeksploitasi kelemahan, dan menjalankan intrusi demi keuntungan finansial.

Untuk kelompok kedua, CERT-In mengatakan rangkaian serangan yang sebelumnya berlangsung berhari-hari dapat dipadatkan menjadi beberapa jam. Pelaku juga menyerang kembali organisasi dalam hitungan hari ketika perbaikan sebelumnya tidak tuntas. Pada kasus pengujian, agen diketahui menemukan kembali dan memakai ulang kredensial yang sama dalam operasi berbeda.

Kedua situasi ini tidak berarti setiap agen AI bertindak seperti penyerang. Namun, keduanya menunjukkan bagaimana otomatisasi dapat mempercepat pemanfaatan izin dan rahasia yang dibiarkan terbuka. Dalam advisory yang sama, CERT-In menekankan kelemahan yang dieksploitasi bersifat konvensional: kunci yang tertanam di kode atau konfigurasi, API lama yang masih dapat diakses, peran cloud yang terlalu permisif, serta panel administrasi yang terekspos atau tidak dilindungi autentikasi berlapis.

## Instruksi prompt tidak cukup menjadi batas keamanan

Untuk organisasi yang menguji agen, CERT-In menyarankan lingkungan evaluasi dipisahkan dari produksi, menggunakan target dan kredensial sintetis, serta membatasi koneksi keluar jaringan secara default. Pembatasan jaringan perlu ditegakkan pada lapisan infrastruktur, bukan hanya lewat instruksi kepada model. Jika agen menemukan kredensial pihak ketiga atau mencoba mengakses sistem di luar cakupan, proses sebaiknya berhenti otomatis.

Tim developer juga perlu memberi setiap proses agen identitas singkat dengan hak minimum, menghindari kunci layanan di kode sisi klien, dan mencatat permintaan yang dimulai agen beserta tujuan serta hasilnya. Pemantauan saat proses berlangsung penting karena pemeriksaan transkrip setelah pekerjaan selesai dapat melewatkan akses yang sudah terjadi.

**Implikasinya untuk tim:** prompt yang lebih ketat saja tidak cukup. Hak akses yang benar-benar dimiliki agen, batas jaringan, dan pencatatan aktivitas perlu dirancang sebagai kontrol terpisah. Jika agen coding dapat membaca repositori atau memanggil API, perlakukan token dan peran yang tersedia baginya seperti kredensial layanan biasa: batasi cakupan, pisahkan dari produksi, dan cabut segera bila terekspos.

Catatan ini merangkum advisory CERT-In dan liputan media; identitas penyedia model serta organisasi yang terdampak belum dipublikasikan.
