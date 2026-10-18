---
title: "Bitsight: MONST3R-AI Memakai API Key Curian untuk Scan Otomatis"
source_url: "https://www.bitsight.com/blog/evolution-of-ai-cybercrime-underground-forums"
tags: ["AI", "Cybersecurity", "Developer Tools"]
date: "2026-10-17T20:21:11.000Z"
cover_image: "/posts/monst3r-ai-stolen-api-keys-cover.svg"
---

Satu API key AI yang bocor bisa dipakai orang lain untuk menjalankan pemindaian otomatis—dan tagihannya tetap masuk ke pemilik akun. Itulah cara kerja yang ditemukan Bitsight pada **MONST3R-AI**, layanan pentest yang dipasarkan di forum kriminal tertutup. Laporannya terbit 15 Oktober dan kembali ramai dibahas dalam [ringkasan AI Weekly](https://aiweekly.co/alerts/bitsight-monst3r-ai-runs-on-stolen-openai-anthropic-google-keys) dua hari kemudian.

## Key korban menjadi biaya operasional penyerang

Tim intelijen ancaman Bitsight menjelaskan bahwa pembeli MONST3R-AI dapat memasukkan API key curian, menetapkan batas pengeluaran, lalu memberikan daftar target. Permintaan model berjalan memakai key tersebut, sehingga biaya inference tercatat pada akun pemiliknya. Rincian ini ada di [laporan Bitsight](https://www.bitsight.com/blog/evolution-of-ai-cybercrime-underground-forums).

Laporan tersebut tidak menyebut kebocoran di sisi penyedia model, dan tidak membuktikan bahwa semua pemindaian yang dijanjikan layanan itu berhasil. Masalahnya ada pada kredensial yang masih aktif: selama belum dicabut atau dibatasi, orang lain dapat menggunakannya tanpa izin.

![Diagram konseptual alur API key curian pada platform pentest otomatis, dengan tagihan penggunaan kembali ke akun pemilik key](/posts/monst3r-ai-api-key-flow.svg)

*Ilustrasi orisinal berdasarkan uraian Bitsight; bukan rekonstruksi panel MONST3R-AI atau bukti transaksi korban.*

Penjual mengklaim dashboard-nya mencatat 1.072 temuan pada 199 host. [Bitsight tidak dapat memverifikasi angka tersebut secara independen](https://www.helpnetsecurity.com/2026/10/16/stolen-ai-api-keys-autonomous-scans/), jadi angka itu belum bisa dibaca sebagai jumlah kerentanan terkonfirmasi atau bukti bahwa target berhasil ditembus.

## Percakapan tentang agent ikut meningkat

Bitsight juga meninjau ribuan unggahan dari 16 forum bawah tanah selama Februari–Agustus 2026. Dalam sampel tersebut, percakapan tentang AI naik 45 persen. Penyebutan AI agent, indirect prompt injection, dan MCP naik 67 persen. Sebagai pembanding, kata kunci ransomware turun 49 persen dan phishing turun 8,5 persen.

Angka-angka itu mengukur percakapan di forum yang diteliti, bukan jumlah serangan yang benar-benar terjadi. Namun, sampel tersebut menunjukkan bahwa pelaku mulai membicarakan otomasi agent dan infrastruktur AI. [Help Net Security merangkum temuan beserta batas datanya](https://www.helpnetsecurity.com/2026/10/16/stolen-ai-api-keys-autonomous-scans/).

## Yang perlu dilakukan tim developer

Perlakukan API key penyedia AI seperti kredensial cloud. Simpan di secret manager atau environment server, batasi izin dan anggarannya, pantau pemakaian, dan jalankan secret scanning pada repositori serta pipeline. Jika key terungkap, cabut lalu ganti. Menghapusnya dari commit terbaru saja tidak membersihkan salinan di riwayat Git atau log.

Tim yang memakai coding agent juga perlu memeriksa sumber plugin, skill, dan server MCP sebelum memasangnya. Alat-alat itu mungkin mendapat akses ke shell, file lokal, atau kredensial proyek. Berikan izin seperlunya dan minta persetujuan sebelum agent menjalankan tindakan sensitif.

Klaim hasil MONST3R-AI belum terverifikasi. Mekanisme penyalahgunaan key-nya tetap jelas: kredensial yang bocor dapat memberi orang lain akses ke model dan membebankan biaya kepada pemilik akun.
