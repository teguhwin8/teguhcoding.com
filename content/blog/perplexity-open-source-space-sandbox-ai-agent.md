---
title: "Perplexity Buka SPACE, Sandbox microVM untuk Menjalankan AI Agent"
source_url: "https://www.perplexity.ai/en-GB/hub/blog/open-sourcing-space"
tags: ["AI", "Developer Tools", "Security"]
date: "2026-10-17T18:10:13.000Z"
cover_image: "/posts/perplexity-space-agent-sandbox-cover.svg"
---

Perplexity membuka kode **SPACE**, runtime sandbox yang dipakai untuk menjalankan tugas di produk Computer. Platform ini memberi tiap sandbox sebuah Firecracker microVM sendiri, sehingga kode yang dibuat AI agent berjalan di lingkungan virtual terpisah dari host. Rilis open-source pada 15 Oktober ini memakai lisensi Apache 2.0 dan ditujukan untuk tim yang ingin membangun infrastruktur eksekusi agent sendiri.

## Lapisan eksekusi, bukan model atau agent baru

SPACE adalah singkatan dari *Sandboxed Platform for Agentic Code Execution*. Aplikasi menggunakannya lewat HTTP API untuk membuat lingkungan Linux, menjalankan perintah, membaca keluarannya, lalu menjeda, melanjutkan, atau menghapus sandbox. Implementasinya ditulis dalam Rust, tetapi aplikasi yang terhubung tidak perlu memakai pustaka Rust; output perintah dapat dialirkan lewat server-sent events. [Dokumentasi repo SPACE](https://github.com/perplexityai/SPACE) menjelaskan alur dan API tersebut.

Pemisahan ini memberi agent ruang kerja sendiri untuk mengubah berkas atau menjalankan kode. Menurut [penjelasan Perplexity](https://www.perplexity.ai/en-GB/hub/blog/open-sourcing-space), kebijakan jaringan dan kredensial platform dikelola di luar guest VM. Agent dapat mengakses layanan yang diizinkan tanpa token disimpan begitu saja di filesystem yang bisa dibacanya.

![Diagram konseptual batas sandbox SPACE: kode agent berada di guest microVM, sedangkan kontrol jaringan dan kredensial berada di sisi host](/posts/perplexity-space-agent-sandbox-architecture.svg)

*Ilustrasi konseptual arsitektur dan hasil pengujian yang dilaporkan Perplexity; bukan tangkapan layar produk.*

## Uji keamanan menemukan celah di jalur jaringan

Bagian yang penting bagi tim developer adalah perbedaan antara isolasi VM dan pembatasan koneksi keluar. Dalam [laporan red-team Perplexity](https://www.perplexity.ai/en-GB/hub/blog/escaping-space-part-i), sembilan model diberi akses root di guest VM dan diminta menembus batas tertentu. Tidak ada VM-to-host escape yang berhasil dalam 108 percobaan. Namun, saat akses jaringan parsial diizinkan, model berhasil melewati kebijakan egress dalam 11 dari 54 percobaan, melalui masalah DNS dan alamat IP bersama.

Perplexity menyatakan telah memperbaiki masalah tersebut dan tidak lagi mereproduksi bypass dalam pengujian ulang. Hasil ini berasal dari pengujian internal perusahaan, bukan audit independen. Angka nol escape hanya berlaku untuk rangkaian percobaan itu; ia bukan bukti bahwa semua konfigurasi atau ancaman sudah tertutup. Laporan tersebut justru menunjukkan mengapa isolasi VM dan aturan jaringan perlu diperiksa sebagai dua batas keamanan yang berbeda.

## Apa yang perlu disiapkan untuk mencobanya?

Kode SPACE tersedia dengan lisensi Apache 2.0 dan repo-nya meraih sekitar 1.300 bintang serta 105 fork saat diperiksa. Diskusinya juga muncul di [r/machinelearningnews](https://www.reddit.com/r/machinelearningnews/comments/1x7wzon/perplexity_opensources_space_the_firecracker/). [MarkTechPost turut melaporkan](https://www.marktechpost.com/2026/10/16/perplexity-open-sources-space-firecracker-microvm-sandbox-ai-agents/) rilis dan fokusnya pada eksekusi kode agent yang terisolasi.

SPACE lebih tepat dipahami sebagai layanan infrastruktur yang perlu dideploy dan dioperasikan, bukan paket kecil yang tinggal dipasang ke aplikasi. Panduan resminya menunjukkan setup lokal melalui Kubernetes Kind, sementara repo juga menyediakan contoh deployment AWS EKS. Ini menarik bagi tim yang sedang membangun coding agent, agen analisis data, atau layanan yang menjalankan kode kiriman pengguna—terutama jika mereka siap mengelola Linux, VM, kebijakan egress, dan penyimpanan state.

SPACE memberi developer implementasi nyata untuk dipelajari dan dicoba, sekaligus contoh bahwa menjalankan agent dengan aman membutuhkan kontrol di sekeliling model. Sebelum menjadikannya lapisan produksi, uji sendiri batas jaringan, penanganan kredensial, serta pemulihan sandbox sesuai ancaman dan infrastrukturnya.
