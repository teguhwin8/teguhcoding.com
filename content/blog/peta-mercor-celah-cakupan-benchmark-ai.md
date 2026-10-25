---
title: "Peta Mercor Menunjukkan Banyak Pekerjaan Belum Terwakili Benchmark AI"
source_url: "https://www.mercor.com/research/labor-index/benchmark-map/"
tags: ["AI", "Benchmark", "Developer Tools"]
date: "2026-10-18T00:20:59.000Z"
cover_image: "/posts/mercor-ai-benchmark-gap-cover.svg"
updated: "2026-10-18T05:54:41.000Z"
---

Benchmark AI sering dipakai untuk mengukur kemajuan model. Namun, seberapa banyak tugas kerja yang benar-benar tercakup dalam tes-tes itu? Mercor mencoba menjawabnya dengan memetakan 29 benchmark AI agentik ke katalog O*NET di Amerika Serikat. Dari 18.797 tugas yang ditinjau, 924 memenuhi ambang cakupan mereka. Berdasarkan peta itu, Mercor memperkirakan 90% jam kerja di AS berkaitan dengan tugas yang hanya sedikit atau belum terwakili dalam benchmark. Temuan ini ramai dibahas di [Hacker News](https://news.ycombinator.com/item?id=50121179).

## Apa yang dihitung dalam peta ini?

Mercor mencocokkan benchmark itu dengan 18.797 tugas O*NET, yang tersebar di 923 pekerjaan dan 22 kelompok pekerjaan. Satu tugas baru masuk hitungan “tercakup” jika sedikitnya lima prompt benchmark dipetakan ke sana. Hasilnya, 208 pekerjaan memiliki setidaknya satu tugas yang lolos ambang tersebut. Enam kelompok pekerjaan sama sekali tidak memiliki pekerjaan yang mencapai ambang itu.

![Infografik konseptual tentang pemetaan 29 benchmark ke tugas O*NET dan hasil cakupan yang dilaporkan Mercor](/posts/mercor-benchmark-map-flow.svg)

*Infografik berdasarkan angka dan definisi pada peta Mercor; visual ini bukan tangkapan layar produk.*

Angka 90% mengacu pada perkiraan jam kerja untuk tugas yang kurang terwakili dalam indeks awal Mercor. Jadi, angka itu tidak mengukur kemampuan model atau menghitung pekerjaan yang akan digantikan AI. Peta ini menjawab pertanyaan yang lebih spesifik: bagian mana dari pekerjaan manusia yang sudah tercakup dalam benchmark pilihan Mercor?

## Bagaimana benchmark dipetakan?

Pemetaan prompt ke tugas O*NET dilakukan dengan bantuan model bahasa. Mercor lalu menggabungkan hasilnya dengan estimasi waktu yang dihabiskan pekerja untuk tiap tugas—estimasi yang juga bersandar pada riset berbasis model bahasa. Tim memilih benchmark berdasarkan ketersediaan publik, sifat agentik, relevansi ekonomi, keragaman pekerjaan, dan tingkat kesulitannya. Rincian prosesnya dijelaskan di [halaman metodologi Mercor](https://www.mercor.com/research/labor-index/benchmark-map/methodology/).

Untuk memeriksa hasilnya, Mercor meminta pakar di platform mereka menilai pemetaan dari tiga benchmark APEX milik perusahaan: APEX-1, APEX-Agents, dan APEX-Accounting. Dalam 76,7% penilaian, pakar menganggap pilihan utama model masuk akal. Angkanya menjadi 85,4% jika jawaban pakar muncul di salah satu kandidat yang diajukan model. Pemeriksaan ini hanya mencakup sebagian benchmark; APEX-SWE dipetakan belakangan dan tidak ikut dinilai pakar.

Mercor mengakui 29 benchmark itu belum mewakili seluruh tes agentik yang tersedia. Sejumlah tugas yang tampak jarang diuji mungkin sebenarnya tercakup dalam benchmark yang belum masuk indeks. Pemilihan benchmark—termasuk penilaian soal “relevansi ekonomi”—juga melibatkan keputusan subjektif. Angka 90% adalah perkiraan dari peta awal, bukan hitungan final.

## Kenapa ini relevan bagi developer?

Peta itu menemukan bahwa benchmark publik lebih sering mencakup tugas yang mudah dijadikan tes, seperti rekayasa perangkat lunak dan analisis keuangan. Tugas yang dinilai lebih terpapar AI sekitar enam kali lebih mungkin masuk benchmark daripada tugas yang dinilai kurang terpapar. Tugas yang dianggap penting dalam suatu pekerjaan juga enam hingga sepuluh kali lebih mungkin terwakili dibanding tugas yang kurang penting.

Skor benchmark tetap berguna untuk membandingkan model dalam tes yang sama. Untuk memilih model bagi sebuah produk, tim perlu mengujinya juga pada tugas yang benar-benar mereka kerjakan. Ukur bukan hanya tingkat keberhasilan, tetapi juga kasus gagal, waktu yang dibutuhkan manusia untuk memeriksa hasil, biaya, dan konsistensinya. Ulangi evaluasi itu saat model atau prompt berubah.

Mercor sendiri menerbitkan benchmark APEX yang masuk ke indeks, sehingga riset ini datang dari pelaku industri dan bukan audit independen. Perusahaan memaparkan metode serta batasannya; cakupan peta tetap perlu diperiksa lagi ketika indeks diperluas.

Skor tinggi hanya menceritakan kinerja model pada tugas yang diuji. Saat menilai kemampuan AI untuk pekerjaan nyata, cakupan benchmark dan kemiripan tugasnya dengan pekerjaan sehari-hari sama pentingnya dengan posisi di leaderboard.
