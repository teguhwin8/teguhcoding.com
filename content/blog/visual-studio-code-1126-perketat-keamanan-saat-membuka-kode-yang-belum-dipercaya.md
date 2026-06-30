---
title: "Visual Studio Code 1.126 Perketat Keamanan Saat Membuka Kode yang Belum Dipercaya"
source_url: "https://www.infoworld.com/article/4190672/visual-studio-code-locks-down-untrusted-code.html"
tags: ["Visual Studio Code","Security","Development Tools"]
date: "2026-06-30T03:56:07.427Z"
cover_image: "https://www.infoworld.com/wp-content/uploads/2026/06/4190672-0-10182900-1782752201-shutterstock_2416896949.jpg?quality=50&strip=all&w=1024"
---

## VS Code Kini Lebih Hati-hati dengan Kode Asing

Microsoft kembali merilis pembaruan untuk Visual Studio Code, dan kali ini fokus utamanya cukup penting bagi developer yang sering membuka proyek dari sumber luar: keamanan. Di Visual Studio Code 1.126, Microsoft memperkenalkan perubahan pada fitur **Workspace Trust** agar editor tidak langsung menjalankan kode secara otomatis saat pengguna membuka folder proyek baru.

Bagi developer, kebiasaan membuka repository dari GitHub, contoh proyek, hasil eksperimen AI, atau folder kiriman rekan kerja sudah menjadi hal sehari-hari. Masalahnya, tidak semua kode aman untuk langsung dieksekusi. Ekstensi, task, script, atau konfigurasi tertentu bisa berjalan tanpa disadari jika lingkungan editor terlalu permisif. Di sinilah pembaruan VS Code ini terasa relevan.

## Folder Baru Dibuka dalam Restricted Mode

Sebelumnya, saat membuka folder baru, VS Code langsung menampilkan dialog yang meminta pengguna menentukan apakah folder tersebut dipercaya atau tidak. Pendekatan ini aman, tetapi agak mengganggu karena keputusan harus dibuat sebelum pengguna sempat melihat isi proyek.

Di VS Code 1.126, alurnya dibuat lebih masuk akal. Folder baru kini akan dibuka terlebih dahulu dalam **Restricted Mode**. Artinya, pengguna tetap bisa menelusuri isi kode, membaca struktur proyek, dan mengecek file penting tanpa mengizinkan eksekusi otomatis.

Setelah merasa yakin bahwa proyek tersebut aman, barulah pengguna bisa memberikan trust pada folder tersebut.

Perubahan ini kecil di permukaan, tetapi cukup besar dampaknya untuk workflow sehari-hari. Developer tidak lagi dipaksa mengambil keputusan terlalu cepat, terutama ketika sedang meninjau kode dari sumber yang belum dikenal.

## Workspace Trust Jadi Lebih Praktis

Fitur Workspace Trust sendiri bukan hal baru di VS Code, tetapi implementasi terbaru ini membuatnya lebih natural. Alih-alih menghalangi pengguna sejak awal dengan pertanyaan keamanan, VS Code memberi ruang untuk inspeksi terlebih dahulu.

Pendekatan ini cocok untuk beberapa skenario umum, misalnya:

- membuka repository open source yang baru di-clone;
- mengecek proyek dari kandidat saat proses technical interview;
- meninjau kode dari vendor atau kontraktor;
- membuka hasil generate dari tool AI;
- memeriksa arsip proyek lama yang asal-usulnya tidak sepenuhnya jelas.

Dengan Restricted Mode, VS Code membantu mengurangi risiko eksekusi kode berbahaya tanpa membuat pengalaman pengguna terasa terlalu kaku.

## Pembaruan untuk Chat dan Agent di VS Code

Selain keamanan, VS Code 1.126 juga membawa sejumlah peningkatan untuk pengalaman berbasis AI dan agent. Salah satu perubahan menarik adalah tampilan biaya chat yang kini menunjukkan **total cost untuk seluruh sesi**, bukan hanya biaya per giliran percakapan.

Ini berguna bagi pengguna yang aktif memakai model AI berbayar atau Bring Your Own Key. Dengan informasi biaya yang lebih menyeluruh, developer bisa lebih mudah memantau konsumsi penggunaan selama sesi kerja berlangsung.

Microsoft juga memperbarui pengalaman di **Agents window**, yaitu jendela pendamping untuk mengeksplorasi sesi agent di berbagai proyek dan mesin. Kini, sesi Copilot yang dimulai dari agent host bisa menampung beberapa chat sekaligus. Karena chat-chat tersebut berbagi sesi dan konteks kerja yang sama, pengguna dapat menjalankan beberapa percakapan paralel dalam satu workspace.

Untuk workflow yang melibatkan agent, ini bisa sangat membantu. Misalnya, satu chat dipakai untuk membahas refactoring, sementara chat lain fokus pada debugging atau dokumentasi, semuanya tetap berada dalam konteks proyek yang sama.

## Hover Model Dibuat Lebih Ringkas

VS Code 1.126 juga menyederhanakan tampilan hover untuk model AI. Kini, hover tersebut menampilkan deskripsi satu kata mengenai kemampuan model, lengkap dengan tombol deep link menuju konfigurasi yang relevan.

Perubahan seperti ini mungkin terdengar minor, tetapi cukup penting ketika pilihan model semakin banyak. Developer tidak selalu ingin membaca penjelasan panjang saat sedang bekerja. Informasi singkat dan akses cepat ke pengaturan bisa membuat pengalaman penggunaan AI di editor terasa lebih efisien.

## VS Code Masuk Ritme Rilis Mingguan

Rilis ini juga menjadi bagian dari jadwal pembaruan mingguan VS Code yang mulai berjalan sejak Maret. Dalam beberapa bulan terakhir, Microsoft terlihat agresif menambahkan fitur seputar AI, agent, remote development, dan kontrol model.

Beberapa rilis terbaru sebelumnya mencakup:

- **VS Code 1.125**: menghadirkan integrated browser yang dapat mem-proxy traffic web melalui koneksi remote, sehingga developer bisa mengakses port atau service yang hanya tersedia dari mesin remote.
- **VS Code 1.124**: meningkatkan kecepatan kerja lintas sesi agent dan memberi agent lebih banyak otonomi untuk menyelesaikan tugas.
- **VS Code 1.123**: menambahkan dukungan context window hingga 1 juta token untuk model Anthropic dan OpenAI.
- **VS Code 1.122**: memperluas pengalaman agent dan mode BYOK, termasuk kemampuan memakai model bahasa sendiri bahkan saat tidak terkoneksi.
- **VS Code 1.121**: memperkenalkan dukungan eksperimental untuk menjalankan sesi agent di mesin remote dari Agents window.
- **VS Code 1.120**: membawa Agents window ke channel Stable, meningkatkan kontrol model BYOK, serta menambahkan peningkatan untuk Markdown dan fitur keselamatan agent.

Dari pola ini terlihat jelas bahwa VS Code sedang bergerak cepat menjadi editor yang bukan hanya ringan dan fleksibel, tetapi juga semakin terintegrasi dengan workflow AI modern.

## Kenapa Pembaruan Ini Penting?

Banyak pembaruan editor biasanya terasa seperti peningkatan kosmetik atau tambahan kecil. Namun, perubahan pada Workspace Trust kali ini menyentuh masalah yang sangat nyata: keamanan supply chain dan risiko membuka kode dari sumber yang tidak dikenal.

Di era ketika developer semakin sering bekerja dengan dependency eksternal, repository publik, extension, automation script, dan output dari AI, editor perlu berperan lebih aktif sebagai lapisan perlindungan pertama. VS Code 1.126 mengambil langkah yang tepat dengan membuat mode aman sebagai perilaku default untuk folder baru.

Bukan berarti semua risiko hilang, tentu saja. Developer tetap perlu membaca kode dengan teliti, berhati-hati menjalankan script, dan memahami konfigurasi proyek. Namun, perubahan ini mengurangi peluang kesalahan yang terjadi hanya karena folder dibuka terlalu cepat dan editor langsung menjalankan sesuatu di belakang layar.

## Kesimpulan

Visual Studio Code 1.126 membawa pembaruan yang terasa praktis dan relevan. Fitur keamanan baru pada Workspace Trust membuat proses membuka proyek asing menjadi lebih aman tanpa mengorbankan kenyamanan. Sementara itu, peningkatan pada chat, agent, tampilan biaya sesi, dan konfigurasi model menunjukkan arah pengembangan VS Code yang semakin kuat di ranah AI-assisted development.

Bagi developer yang sering bekerja dengan kode dari berbagai sumber, pembaruan ini layak segera dicoba. Bukan hanya karena fiturnya baru, tetapi karena kebiasaan kecil seperti meninjau proyek dalam Restricted Mode bisa menjadi perlindungan penting dalam rutinitas pengembangan modern.
