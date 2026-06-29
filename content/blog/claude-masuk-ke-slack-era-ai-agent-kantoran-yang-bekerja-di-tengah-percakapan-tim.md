---
title: "Claude Masuk ke Slack: Era AI Agent Kantoran yang Bekerja di Tengah Percakapan Tim"
source_url: "https://www.artificialintelligence-news.com/news/anthropic-slack-workplace-ai-agents/"
tags: ["AI Enterprise","Slack","Anthropic"]
date: "2026-06-29T08:47:44.923Z"
cover_image: "https://www.artificialintelligence-news.com/wp-content/uploads/2026/06/301d5ee481a352435c048a9df7ce172b9617b05f-2400x1260-1-2048x1075.jpg"
---

Anthropic sedang mendorong Claude keluar dari kotak chat pribadi dan masuk langsung ke ruang kerja tim. Lewat fitur beta bernama **Claude Tag**, pengguna Slack di paket Enterprise dan Team kini bisa memanggil Claude di channel bersama hanya dengan mengetik `@Claude`.

Perubahannya terdengar sederhana, tetapi dampaknya cukup besar. Alih-alih membuka tab browser terpisah, menyalin konteks dari Slack, lalu kembali lagi membawa hasilnya ke tim, Claude kini bisa ikut berada di dalam thread yang sama dengan rekan kerja lain. Semua orang di channel dapat melihat tugas yang diberikan, memantau prosesnya, meninjau output, dan melanjutkan diskusi dari konteks yang sudah ada.

## Dari chatbot pribadi menjadi rekan kerja di channel

Selama ini, sebagian besar tools AI generatif bekerja dalam pola yang cukup individual: satu pengguna bertanya, AI menjawab, lalu hasilnya dibawa secara manual ke ruang kerja tim. Model seperti ini berguna, tetapi sering memutus konteks.

Claude Tag mencoba mengubah pola tersebut menjadi lebih kolaboratif. Rob Seaman, general manager Slack, menggambarkannya sebagai AI yang “muncul di ruang terbuka”, bukan dalam percakapan privat. Artinya, konteks kerja tidak lagi tersebar di antara chat pribadi, dokumen, email, dan browser terpisah.

Di dalam channel Slack, Claude dapat mengikuti riwayat percakapan, memahami tugas yang sedang berjalan, dan mencatat status pekerjaan langsung di tempat tim berkoordinasi. Bagi organisasi besar, ini bisa mengurangi kebiasaan menjelaskan ulang konteks proyek, detail perusahaan, atau prioritas pekerjaan setiap kali seseorang ingin menggunakan AI.

## Cara kerja Claude Tag di Slack

Integrasi ini ditopang oleh model **Opus 4.8** milik Anthropic. Ketika diberi tugas, Claude dapat memecah permintaan menjadi beberapa tahap kerja, lalu menggunakan database perusahaan, tool internal, hingga repositori kode yang sudah dihubungkan.

Yang menarik, Claude Tag tidak hanya menunggu instruksi real-time. Dalam konfigurasi tertentu, terutama mode “ambient”, agent ini dapat bekerja secara asinkron. Ia bisa memantau thread yang tidak aktif, mendeteksi tugas yang belum selesai, mengirim notifikasi prioritas dari integrasi lain, dan mengikuti pekerjaan lintas hari.

Contoh sederhananya: seorang pengguna dapat menghubungkan Claude Tag ke arsip email, lalu meminta sistem mengidentifikasi pesan penting dan mengirim ringkasannya ke Slack. Dalam skenario developer, agent dapat membantu menelusuri codebase, membuat perubahan, atau menjawab pertanyaan teknis berdasarkan repositori internal.

## Kenapa ini penting untuk pasar enterprise AI?

Langkah Anthropic ini datang di tengah kompetisi ketat pasar AI untuk bisnis. Perusahaan tersebut baru saja mendapatkan pendanaan Seri H senilai **US$65 miliar**, dengan valuasi pasca-pendanaan sekitar **US$965 miliar**. Angka ini menempatkan Anthropic di atas valuasi OpenAI yang disebut berada di kisaran **US$852 miliar**.

Dari sisi adopsi enterprise, data Ramp AI Index Mei 2026 menunjukkan Anthropic mencapai tingkat penggunaan **34,4%**, melewati OpenAI di angka **32,3%**. Dengan kata lain, integrasi seperti Claude Tag bukan sekadar fitur tambahan, tetapi bagian dari perebutan posisi strategis di software kerja perusahaan.

Bagi Anthropic, Slack adalah lokasi yang sangat masuk akal. Banyak keputusan, diskusi teknis, eskalasi masalah, hingga koordinasi harian terjadi di sana. Jika AI bisa hadir di titik kerja yang sama, peluang penggunaannya menjadi jauh lebih tinggi dibandingkan tool yang harus dibuka secara terpisah.

## Produktivitas meningkat, tapi risikonya juga ikut naik

Potensi manfaatnya jelas. Claude Tag dapat membantu tim:

- merangkum thread panjang,
- menindaklanjuti tugas yang tertunda,
- mengambil data dari database internal,
- menganalisis metrik bisnis,
- menangani tiket dukungan IT,
- membantu pekerjaan engineering dan dokumentasi,
- menjaga konteks proyek tetap terlihat oleh seluruh anggota channel.

Anthropic bahkan menyebut tim produk internalnya telah menghasilkan sekitar **65% kode** menggunakan versi privat dari Claude Tag. Angka ini menunjukkan betapa agresifnya penggunaan agent AI dalam alur kerja engineering modern.

Namun, semakin dalam AI masuk ke sistem kerja perusahaan, semakin besar pula tuntutan tata kelolanya. Agent yang bisa membaca riwayat chat, mengakses email, terhubung ke tool bisnis, dan berinteraksi dengan repositori kode bukan lagi sekadar asisten teks. Ia menjadi bagian dari infrastruktur operasional.

Jika konfigurasi akses keliru, informasi sensitif bisa bocor ke channel yang tidak semestinya. Jika agent salah memahami instruksi, ia dapat menjalankan workflow yang salah tanpa validasi manusia di setiap tahap. Dalam perusahaan besar, kesalahan kecil semacam ini bisa berkembang menjadi masalah keamanan, kepatuhan, atau operasional.

## Kontrol admin menjadi faktor penentu

Untuk menjawab risiko tersebut, Anthropic menyediakan konsep identitas Claude yang dibatasi berdasarkan ruang lingkup tertentu. Admin IT dapat menentukan channel mana yang boleh menggunakan Claude, data apa yang dapat diakses, serta tool mana yang bisa dihubungkan.

Memori lokal dan integrasi juga dibatasi pada channel yang telah diotorisasi. Selain itu, portal manajemen menyediakan log lengkap atas query pengguna dan batasan organisasi untuk mengontrol biaya token bulanan.

Pendekatan ini penting karena AI agent di lingkungan perusahaan tidak bisa hanya dinilai dari kecerdasannya. Ia juga harus dapat diaudit, dibatasi, dipantau, dan diputus aksesnya bila diperlukan.

## Kesimpulan: AI agent mulai pindah ke pusat kerja tim

Claude Tag menandai arah baru penggunaan AI di perusahaan. Bukan lagi sekadar chatbot pribadi untuk menjawab pertanyaan cepat, melainkan agent yang hadir di tengah percakapan kerja, mengikuti konteks, dan mengeksekusi tugas secara berkelanjutan.

Bagi banyak tim, ini bisa menjadi lompatan produktivitas yang nyata. Pekerjaan rutin dapat dipercepat, konteks proyek lebih mudah dipertahankan, dan kolaborasi lintas fungsi menjadi lebih efisien.

Tetapi keputusan mengadopsi model seperti ini tidak boleh hanya didorong oleh janji efisiensi. Perusahaan perlu menimbang dengan serius aspek keamanan, audit, hak akses, dan risiko kesalahan otomatis. Semakin otonom agent AI di ruang kerja, semakin matang pula governance yang dibutuhkan.

Pada akhirnya, pertanyaannya bukan lagi apakah AI akan masuk ke workflow perusahaan. Pertanyaannya adalah: seberapa jauh perusahaan siap membiarkan AI bekerja di ruang yang sama dengan tim manusia, lengkap dengan akses, konteks, dan tanggung jawab yang menyertainya?
