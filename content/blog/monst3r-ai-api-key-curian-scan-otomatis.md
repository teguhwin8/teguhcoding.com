---
title: "Bitsight: MONST3R-AI Memakai API Key Curian untuk Scan Otomatis"
source_url: "https://www.bitsight.com/blog/evolution-of-ai-cybercrime-underground-forums"
tags: ["AI", "Cybersecurity", "Developer Tools"]
date: "2026-10-17T20:21:11.000Z"
cover_image: "/posts/monst3r-ai-stolen-api-keys-cover.svg"
---

Bitsight menemukan penjual di forum kriminal tertutup yang memasarkan **MONST3R-AI**, platform pentest otomatis yang menerima API key OpenAI, Anthropic, atau Google hasil curian. Pembeli memasukkan key itu ke panel, menentukan target dan batas biaya; pemakaian model ditagihkan ke akun pemilik key. Temuan Bitsight diterbitkan pada 15 Oktober dan kembali menjadi berita teratas di [ringkasan AI Weekly pada 17 Oktober](https://aiweekly.co/alerts/bitsight-monst3r-ai-runs-on-stolen-openai-anthropic-google-keys).

## Key korban menjadi biaya operasional penyerang

Dalam [laporan Bitsight](https://www.bitsight.com/blog/evolution-of-ai-cybercrime-underground-forums), tim intelijen ancaman menyebut MONST3R-AI dijual sebagai platform penetration testing otonom. Pembeli dapat menaruh key curian, mengatur batas belanja di panel, lalu memasukkan daftar target. Penyedia model melihat permintaan API yang terautentikasi dengan key tersebut; biaya inference dibebankan ke akun yang sama.

Ini bukan bukti bahwa penyedia model mengalami kebocoran, atau bahwa semua pemindaian yang diiklankan berhasil. Risiko bagi pemilik key muncul karena kredensial yang bocor masih dapat dipakai hingga dicabut atau dibatasi. Laporan tersebut menunjukkan bagaimana akses model yang sah secara teknis bisa disalahgunakan untuk mengoperasikan alat yang tidak berizin.

![Diagram konseptual alur API key curian pada platform pentest otomatis, dengan tagihan penggunaan kembali ke akun pemilik key](/posts/monst3r-ai-api-key-flow.svg)

*Ilustrasi orisinal berdasarkan uraian Bitsight; bukan rekonstruksi panel MONST3R-AI atau bukti transaksi korban.*

Penjual mengklaim dashboard-nya mencatat 1.072 temuan pada 199 host. Namun, [Bitsight menyatakan angka itu tidak dapat diverifikasi secara independen](https://www.helpnetsecurity.com/2026/10/16/stolen-ai-api-keys-autonomous-scans/). Angka tersebut adalah klaim penjual, bukan jumlah kerentanan yang sudah dikonfirmasi atau bukti bahwa sistem target berhasil ditembus.

## Percakapan tentang agent ikut meningkat

Bitsight menganalisis ribuan unggahan dari 16 forum bawah tanah selama Februari hingga Agustus 2026. Dalam sampel itu, percakapan tentang AI secara keseluruhan meningkat 45 persen, sementara penyebutan AI agent, indirect prompt injection, dan MCP naik 67 persen. Peneliti membandingkannya dengan kata kunci kejahatan siber lain: penyebutan ransomware turun 49 persen dan phishing turun 8,5 persen.

Angka tersebut mengukur perubahan percakapan di forum yang dipilih, bukan jumlah serangan nyata. Meski begitu, laporan ini memberi gambaran bahwa pasar gelap mulai membicarakan otomasi agent dan infrastruktur AI, bukan hanya chatbot yang dimodifikasi. [Help Net Security merangkum temuan dan batas datanya](https://www.helpnetsecurity.com/2026/10/16/stolen-ai-api-keys-autonomous-scans/).

## Yang perlu dilakukan tim developer

API key penyedia AI sebaiknya diperlakukan seperti kredensial cloud: simpan di secret manager atau environment server, batasi izin dan anggaran, aktifkan pemantauan pemakaian, serta jalankan secret scanning pada repositori dan pipeline. Jika key terlanjur terekspos, cabut dan rotasi segera; sekadar menghapusnya dari commit terbaru tidak menghilangkan salinan yang mungkin sudah tersimpan di riwayat Git atau log.

Untuk tim yang memakai coding agent, laporan Bitsight juga mengingatkan agar asal-usul plugin, skill, dan server MCP diperiksa sebelum dipasang. Alat yang tampak membantu dapat memperoleh akses ke shell, file lokal, dan kredensial proyek. Terapkan izin minimum dan minta persetujuan sebelum agent menjalankan tindakan sensitif.

Kasus MONST3R-AI belum membuktikan skala keberhasilan yang diklaim penjual. Namun, mekanismenya menjadi pengingat praktis: satu key bocor dapat memberi orang lain akses ke model sekaligus membuat pemiliknya menanggung biaya pemakaian.
