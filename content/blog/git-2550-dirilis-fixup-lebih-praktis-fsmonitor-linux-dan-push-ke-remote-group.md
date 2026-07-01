---
title: "Git 2.55.0 Dirilis: Fixup Lebih Praktis, fsmonitor Linux, dan Push ke Remote Group"
source_url: "https://about.gitlab.com/blog/whats-new-in-git-2-55-0/?ref=dailydev"
tags: ["Git","Open Source","Developer Tools"]
date: "2026-07-01T18:11:56.456Z"
cover_image: "https://res.cloudinary.com/about-gitlab-com/image/upload/v1782732487/ztwgrvlolpifo01vj8qc.png"
---

Git 2.55.0 resmi dirilis, dan versi ini membawa beberapa pembaruan yang terasa cukup dekat dengan workflow developer sehari-hari. Tidak semuanya berupa fitur besar yang langsung mengubah cara kita bekerja, tetapi banyak peningkatan kecil yang membuat Git lebih nyaman, lebih cepat, dan lebih rapi digunakan di proyek modern—terutama di monorepo, stacked branches, dan repository dengan banyak remote.

Di rilis ini, ada beberapa hal menarik yang patut diperhatikan: `git-history fixup`, fsmonitor bawaan untuk Linux, kemampuan `git push` ke remote group, pembatasan lebar graph di `git log`, perkembangan penggunaan Rust di codebase Git, serta peningkatan performa untuk `git-grep` dan `git-cherry` pada partial clone.

## `git-history fixup`: memperbaiki commit tanpa rebase interaktif yang merepotkan

Pada Git 2.54.0, Git memperkenalkan `git-history(1)`. Di Git 2.55.0, tool ini mendapatkan subcommand baru bernama `fixup`.

Biasanya, kalau kita ingin memasukkan perubahan baru ke commit lama, alurnya kurang lebih seperti ini:

- buat fixup commit dengan `git commit --fixup=<commit-id>`
- jalankan `git rebase -i --autosquash <commit-id>^`
- selesaikan proses rebase interaktif

Cara ini sudah umum, tetapi tetap terasa agak berat untuk sesuatu yang sebenarnya sederhana: “tolong masukkan perubahan staged ini ke commit tertentu”.

Dengan Git 2.55.0, proses tersebut bisa dipersingkat menjadi `git history fixup <commit-id>`. Perintah ini mengambil perubahan yang sudah di-stage, lalu menggabungkannya ke commit yang dituju.

Yang menarik, karena fitur ini berjalan lewat `git-history`, Git juga akan memperbarui branch lokal lain yang memuat commit tersebut. Ini sangat berguna untuk workflow stacked branches, karena ketika satu commit di tengah stack diperbaiki, branch terkait bisa ikut direbase secara otomatis.

Singkatnya: lebih sedikit langkah manual, lebih sedikit risiko lupa menjalankan autosquash, dan workflow stack jadi lebih mulus.

## fsmonitor daemon kini tersedia untuk Linux

Bagi yang sering bekerja dengan monorepo besar, `git status` bisa terasa lambat. Alasannya sederhana: Git perlu memeriksa working tree untuk mengetahui file mana yang berubah. Pada repository kecil ini bukan masalah, tetapi pada repository besar, proses traversal bisa cukup mahal.

Git sebenarnya sudah punya dukungan `core.fsmonitor` sejak Git 2.16. Awalnya, pengguna perlu menyediakan tool eksternal seperti Watchman. Kemudian, Git memperkenalkan fsmonitor daemon bawaan untuk Windows dan macOS.

Nah, di Git 2.55.0, dukungan tersebut akhirnya hadir untuk GNU/Linux.

Implementasinya menggunakan `inotify(7)`, bukan `fanotify(7)`, karena `fanotify` membutuhkan privilege yang lebih tinggi. Konsekuensinya, fsmonitor perlu memasang watcher pada setiap direktori di repository. Untuk repository yang sangat besar, pengguna mungkin perlu menaikkan batas `fs.inotify.max_user_watches`.

Buat developer Linux yang bekerja di codebase besar, ini pembaruan yang sangat praktis. `git status` bisa menjadi lebih responsif karena Git tidak perlu selalu memindai semuanya dari awal.

## `git push` sekarang bisa ke remote group

Git sudah lama mendukung fetch dari sekelompok remote. Misalnya, kita bisa membuat remote group bernama `forks` yang berisi `origin` dan `upstream`, lalu melakukan fetch dari keduanya sekaligus.

Di Git 2.55.0, kemampuan serupa akhirnya hadir untuk `git push`.

Contohnya, setelah remote group dikonfigurasi, kita bisa menjalankan `git push forks main` untuk mendorong branch `main` ke semua remote dalam group tersebut.

Setiap remote tetap diproses secara independen dan tetap menghormati konfigurasi masing-masing, termasuk mapping `remote.<name>.push` dan pengaturan mirror.

Fitur ini berguna untuk workflow yang melibatkan beberapa fork, mirror, atau remote internal-eksternal. Daripada menjalankan push berulang kali ke beberapa target, kita bisa mengelompokkannya dan menggunakan satu perintah saja.

## `git log --graph` bisa dibatasi lebarnya

`git log --graph` adalah salah satu cara paling cepat untuk melihat struktur histori commit. Masalahnya, di repository yang ramai dengan banyak branch aktif, tampilan graph bisa melebar dengan cepat.

Ketika terlalu banyak lane muncul, pesan commit terdorong jauh ke kanan. Jika terminal tidak cukup lebar, output menjadi sulit dibaca dan kehilangan manfaat utamanya.

Git 2.55.0 memperkenalkan opsi baru: `--graph-lane-limit=<n>`.

Dengan opsi ini, kita bisa membatasi jumlah lane yang digambar. Lane yang melewati batas akan diganti dengan tanda `~`, sehingga pengguna tetap tahu bahwa graph dipangkas, bukan hilang begitu saja.

Contohnya: `git log --graph --graph-lane-limit=5`.

Ini pembaruan kecil, tetapi sangat membantu saat membaca histori repository besar. Output menjadi lebih ringkas, pesan commit tetap mudah dibaca, dan terminal tidak cepat “penuh” oleh garis graph.

## Rust mulai berkembang di codebase Git

Rilis ini juga menyinggung perkembangan penggunaan Rust dalam codebase Git. Ini menarik karena Git selama ini identik dengan C, dan perubahan bahasa di proyek setua dan sepenting Git tentu tidak dilakukan secara terburu-buru.

Pendekatannya terlihat bertahap: Rust mulai masuk sebagai bagian dari evolusi jangka panjang, bukan sebagai perubahan besar yang langsung mengganti fondasi Git. Untuk komunitas open source, ini menjadi sinyal bahwa Git tetap membuka ruang untuk modernisasi, sambil menjaga stabilitas dan kompatibilitas yang selama ini menjadi kekuatannya.

## `git-grep` dan `git-cherry` lebih cepat di partial clone

Git 2.55.0 juga membawa peningkatan performa untuk `git-grep(1)` dan `git-cherry(1)` ketika digunakan pada partial clone.

Partial clone semakin relevan untuk repository besar karena memungkinkan developer mengambil sebagian objek sesuai kebutuhan, bukan seluruh histori dan objek sejak awal. Karena itu, optimasi pada perintah-perintah yang sering dipakai seperti `grep` dan `cherry` bisa berdampak langsung pada pengalaman kerja sehari-hari.

Bagi tim yang mengandalkan repository besar atau monorepo, peningkatan semacam ini biasanya terasa dalam bentuk waktu tunggu yang lebih pendek dan interaksi Git yang lebih ringan.

## Kesimpulan

Git 2.55.0 bukan sekadar rilis pemeliharaan biasa. Ada beberapa peningkatan yang langsung menyentuh workflow developer modern:

- `git history fixup` membuat perbaikan commit lama lebih praktis.
- fsmonitor bawaan untuk Linux membantu mempercepat operasi di repository besar.
- `git push` ke remote group menyederhanakan workflow multi-remote.
- `--graph-lane-limit` membuat output `git log --graph` lebih mudah dibaca.
- Rust mulai bergerak lebih jauh di dalam ekosistem Git.
- `git-grep` dan `git-cherry` makin efisien untuk partial clone.

Kalau Anda bekerja dengan stacked branches, monorepo, atau banyak remote sekaligus, Git 2.55.0 layak segera dicoba. Banyak fiturnya memang terasa sederhana, tetapi justru jenis peningkatan seperti inilah yang membuat workflow harian menjadi lebih bersih dan menyenangkan.
