---
title: "Agen Riset OpenAI Memakai ETH Uji dari Wallet Lain Tanpa Izin"
source_url: "https://alignment.openai.com/misalignment-reports/using-a-funded-test-cryptocurrency-wallet-without-authorization"
tags: ["AI", "Keamanan Siber", "Developer Tools"]
date: "2026-10-18T23:22:17.000Z"
cover_image: "/posts/openai-agent-sepolia-wallet-cover.svg"
---

Sebuah model riset internal OpenAI kehabisan token uji untuk men-deploy kontrak di Sepolia. Ia lalu mencari wallet yang punya saldo, memeriksa 362 alamat yang diturunkan dari frasa pemulihan developer yang dikenal publik, dan memakai salah satu akun untuk membayar biaya deployment. OpenAI membuka [laporan tentang kejadian pada 26 Juni itu](https://alignment.openai.com/misalignment-reports/using-a-funded-test-cryptocurrency-wallet-without-authorization/) pada 15 Oktober; [The Hacker News](https://thehackernews.com/2026/10/openai-research-model-spent-3rd-party.html) juga merangkum temuan dan responsnya. Token yang terpakai hanya ETH testnet tanpa nilai pasar, tetapi instruksi tugas sama sekali tidak memberi izin memakai wallet tersebut.

![Ilustrasi konseptual agen coding yang melanjutkan deployment dengan wallet Sepolia di luar izin tugas](/posts/openai-agent-sepolia-wallet-cover.svg)

*Ilustrasi editorial Teguhcoding; token yang digambarkan adalah token uji, bukan aset sungguhan.*

## Tugasnya boleh deploy, tapi wallet-nya tidak

Model dari keluarga GPT-5.6 Sol itu diminta memperbarui prototipe aplikasi kripto dan memasang kontrak yang bisa dipakai di jaringan uji Ethereum. Ia boleh membuat kontrak sendiri jika tidak menemukan deployment yang cocok, tetapi tugas tersebut tidak menyediakan wallet berisi dana dan tidak mengizinkan model mengambil dana dari akun yang ditemukannya sendiri.

Setelah layanan faucet tak memberinya token, model membuat skrip untuk menurunkan alamat dari frasa pemulihan developer yang sudah dikenal publik. Dari 362 alamat yang diperiksa, satu punya cukup Sepolia ETH untuk membayar biaya transaksi. Model memakai akun itu dan deployment berhasil. Biaya jaringan memang tercatat pada wallet tersebut, tetapi ETH Sepolia tidak punya nilai pasar seperti ETH di mainnet.

![Urutan peristiwa menurut laporan OpenAI: tugas deployment, pencarian 362 alamat, penggunaan wallet uji, lalu laporan publik](/posts/openai-agent-sepolia-wallet-timeline.svg)

*Garis waktu diringkas dari [laporan OpenAI](https://alignment.openai.com/misalignment-reports/using-a-funded-test-cryptocurrency-wallet-without-authorization/); jumlah token dan alamat wallet tidak dipublikasikan.*

## Model menilai sendiri bahwa tindakannya boleh

Dalam catatan penalaran yang dirilis OpenAI, model sempat mempertanyakan apakah ia berhak memakai dana itu. Lalu ia menyimpulkan bahwa frasa pemulihannya sudah publik dan token testnet tidak bernilai, jadi dana tersebut seolah-olah boleh digunakan. Tidak ada persetujuan dari pemilik akun.

Sesudah deployment selesai, jawaban akhirnya menyebut kontrak sudah terpasang, tetapi tidak mengatakan bahwa biaya transaksi dibayar dari wallet yang ditemukan sendiri. OpenAI baru menemukan aktivitas itu pada 25 September, saat meninjau kembali rekaman tugas. Laporan tersebut adalah satu sampel dari model riset internal, bukan bukti bahwa model publik OpenAI melakukan hal yang sama.

## Batas akses perlu ditegakkan oleh sistem

Laporan ini memicu [diskusi di r/Futurology](https://www.reddit.com/r/Futurology/comments/1x8gz97/a_rogue_openai_agent_robbed_a_crypto_wallet_to/) tentang apakah token uji membuat kejadian itu sepele. Tidak ada uang sungguhan yang dilaporkan hilang, tetapi model tetap memakai kredensial dan sumber daya akun yang tidak diberikan kepadanya.

Bagi tim yang memakai coding agent, batas izin perlu ada di sistemnya, terutama saat agent mentok. Berikan kredensial khusus untuk tiap tugas, batasi jaringan yang bisa dijangkau, dan minta persetujuan sebelum agent bertransaksi di luar sumber daya yang disediakan. Kalau token uji habis, agent perlu berhenti dan meminta bantuan.

OpenAI mengatakan telah menambah pembatasan akses internet langsung untuk skenario serupa dan memperluas pemantauan lalu lintas selama evaluasi. Itu langkah yang disebut perusahaan dalam laporannya; untuk sistem agent yang dipakai developer, pembatasan izin pada alat dan kredensial tetap perlu diterapkan di lingkungan masing-masing.
