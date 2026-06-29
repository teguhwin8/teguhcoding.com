---
title: "Home Server Murah dari Mini PC Bekas: Hemat Daya, Bisa Diakses dari Mana Saja"
source_url: "https://www.youtube.com/watch?v=z2yBHC_RcDw"
tags: ["Home Server","Ubuntu Server","Docker"]
date: "2026-06-29T06:08:19.058Z"
cover_image: "https://img.youtube.com/vi/z2yBHC_RcDw/maxresdefault.jpg"
---

# Home Server Murah dari Mini PC Bekas: Hemat Daya, Bisa Diakses dari Mana Saja

Punya server sendiri di rumah itu tidak harus mahal, tidak harus rak server besar, dan tidak harus berlangganan IP publik dari ISP. Dengan mini PC bekas, SSD baru, Ubuntu Server, Tailscale, dan Docker, kita sudah bisa punya home server yang rapi, hemat listrik, dan fleksibel untuk menjalankan berbagai aplikasi self-hosted.

Setup seperti ini cocok buat yang ingin mulai belajar server, hosting aplikasi pribadi, bikin lab kecil-kecilan, atau sekadar ingin punya layanan sendiri tanpa selalu bergantung ke cloud.

## Kenapa pakai mini PC bekas?

Mini PC bekas adalah pilihan menarik untuk home server karena ukurannya kecil, konsumsi dayanya rendah, dan harganya relatif ramah kantong. Dibandingkan PC desktop biasa, mini PC jauh lebih praktis untuk dinyalakan 24 jam di rumah.

Spesifikasi yang dipakai di setup ini kurang lebih:

- Mini PC bekas dengan Intel Core i5 generasi ke-7
- RAM 8 GB
- SSD NVMe baru 128 GB
- Flashdisk 16 GB untuk installer Ubuntu Server
- Koneksi LAN ke router

Spesifikasi tersebut tidak wajib sama persis. Yang penting, pastikan perangkat mendukung beberapa hal berikut:

- CPU 64-bit
- Mendukung virtualization
- RAM minimal 4 GB
- Bisa dipasang storage yang layak, idealnya SSD

Untuk storage, lebih aman memakai SSD baru. SSD, terutama NVMe, punya metrik TBW atau terabytes written, yaitu perkiraan total data yang bisa ditulis selama masa pakainya. Kalau beli SSD bekas, kita tidak selalu tahu seberapa berat pemakaiannya sebelumnya.

## Menyiapkan installer Ubuntu Server

Sistem operasi yang digunakan adalah Ubuntu Server. Versi server lebih ringan karena tidak membawa tampilan desktop, sehingga cocok untuk perangkat yang nantinya diakses lewat terminal.

Langkah umumnya seperti ini:

1. Download ISO Ubuntu Server dari ubuntu.com.
2. Download Balena Etcher untuk membuat flashdisk bootable.
3. Pilih file ISO Ubuntu Server di Balena Etcher.
4. Pilih flashdisk sebagai target.
5. Klik flash dan tunggu sampai selesai.

Setelah proses selesai, flashdisk biasanya tidak muncul normal di file explorer. Itu wajar, karena formatnya sudah berubah menjadi media installer.

## Instalasi Ubuntu Server di mini PC

Sebelum instalasi, sambungkan mini PC ke jaringan menggunakan kabel LAN. Ini penting supaya Ubuntu langsung mendapatkan koneksi internet dan alamat IP secara otomatis. Memakai Wi-Fi tetap bisa, tapi untuk server rumahan, LAN jauh lebih stabil dan direkomendasikan.

Perangkat yang perlu disambungkan saat instalasi:

- Monitor
- Keyboard
- Flashdisk installer Ubuntu Server
- Kabel LAN

Masuk ke BIOS sesuai merek perangkat. Pada mini PC Lenovo, biasanya bisa menekan Enter lalu F1 saat booting. Di BIOS, ada satu pengaturan yang menarik untuk server rumahan: after power loss.

Ubah pengaturan tersebut menjadi power on. Dengan begitu, kalau listrik mati lalu menyala lagi, mini PC akan otomatis hidup kembali. Ini sederhana, tapi sangat membantu untuk perangkat yang memang dirancang menyala terus.

Pastikan urutan boot mengarah ke USB terlebih dahulu, lalu simpan konfigurasi dan restart.

Saat installer Ubuntu muncul, pilih opsi Try or Install Ubuntu Server. Setelah itu, ikuti proses instalasi:

- Pilih bahasa Inggris
- Pilih layout keyboard US
- Pilih Ubuntu Server
- Gunakan koneksi LAN
- Pilih SSD NVMe sebagai target instalasi
- Buat nama server, username, dan password
- Aktifkan OpenSSH Server
- Lewati Ubuntu Pro jika tidak diperlukan
- Lewati paket tambahan untuk sementara

Setelah instalasi selesai, cabut flashdisk ketika diminta, lalu tekan Enter untuk reboot.

## Login pertama dan akses lewat SSH

Setelah server menyala, login menggunakan username dan password yang dibuat saat instalasi. Di layar akan terlihat alamat IP lokal, misalnya 192.168.0.219.

IP ini adalah IP lokal. Artinya, hanya perangkat yang berada di jaringan yang sama yang bisa mengakses server tersebut. Misalnya laptop, HP, atau PC yang tersambung ke router rumah yang sama.

Dari laptop atau PC lain, kita bisa mencoba SSH:

`ssh username@192.168.0.219`

Saat pertama kali konek, terminal akan meminta konfirmasi fingerprint. Ketik yes, lalu masukkan password user server.

Kalau berhasil masuk, artinya server sudah bisa diakses dari perangkat lain di jaringan lokal. Setelah ini, monitor dan keyboard sebenarnya sudah tidak wajib dipasang lagi. Server bisa diletakkan di sudut rumah, selama tetap terhubung ke listrik dan LAN.

## Membuat IP server jadi statis

Secara default, router memberi IP lewat DHCP. Masalahnya, IP ini bisa berubah sewaktu-waktu, terutama setelah perangkat restart atau mati cukup lama. Untuk server, ini kurang ideal.

Solusinya adalah membuat DHCP reservation di router. Menu setiap router bisa berbeda, tapi umumnya ada di bagian DHCP Server atau Address Reservation.

Cari perangkat dengan nama server yang tadi dibuat, lalu kunci alamat IP-nya. Misalnya server rumahku selalu mendapatkan IP 192.168.0.219.

Dengan cara ini, kita tidak perlu menebak-nebak IP server setiap kali ingin SSH.

## Akses dari mana saja tanpa IP publik dengan Tailscale

Banyak koneksi internet rumahan tidak menyediakan IP publik. Kalaupun ada, kadang harus bayar tambahan. Untuk kebutuhan pribadi, Tailscale adalah solusi yang jauh lebih simpel.

Tailscale membuat jaringan privat berbasis WireGuard antar perangkat kita. Jadi laptop, HP, dan server rumah bisa saling terhubung seolah-olah berada di jaringan yang sama, meskipun sebenarnya kita sedang di luar rumah.

Langkahnya:

1. Daftar akun gratis di tailscale.com.
2. Buka dokumentasi instalasi Tailscale untuk Linux.
3. Jalankan perintah instalasi di server Ubuntu.
4. Jalankan `sudo tailscale up`.
5. Login lewat link yang muncul.
6. Pastikan server muncul di dashboard Tailscale.

Setelah berhasil, server akan mendapatkan IP khusus Tailscale dan nama domain internal. Kita bisa SSH menggunakan IP Tailscale atau nama perangkatnya, misalnya:

`ssh username@server-rumahku`

Syaratnya, perangkat yang ingin mengakses server juga harus menginstal dan login ke Tailscale. Misalnya laptop Windows, MacBook, iPhone, atau Android.

Ini enaknya Tailscale: tidak perlu port forwarding, tidak perlu utak-atik modem ISP, dan tidak perlu IP publik.

## Instal Docker untuk menjalankan aplikasi

Setelah server bisa diakses dengan nyaman, langkah berikutnya adalah menginstal Docker. Docker memudahkan kita menjalankan aplikasi dalam container. Banyak aplikasi self-hosted modern sudah menyediakan image Docker atau file Docker Compose, jadi proses deploy jauh lebih praktis.

Untuk instalasi, sebaiknya ikuti dokumentasi resmi Docker bagian install using apt repository. Jalankan perintah yang disediakan di dokumentasi agar versi Docker yang terpasang lebih terkontrol.

Setelah Docker terinstal, biasanya user biasa belum langsung punya permission untuk menjalankan Docker tanpa sudo. Solusinya adalah menambahkan user ke group docker, lalu logout dan login ulang agar permission-nya aktif.

## Contoh self-hosting: BentoPDF

Salah satu contoh aplikasi yang bisa dijalankan sendiri adalah BentoPDF. Kalau biasanya kita memakai layanan PDF online, file yang diproses biasanya harus diunggah dulu ke server pihak lain. Dengan self-hosting, kita punya kontrol lebih baik atas aplikasi yang digunakan.

BentoPDF bisa dijalankan menggunakan Docker Compose. Alurnya kira-kira seperti ini:

1. Buat folder khusus untuk Docker Compose.
2. Buat subfolder untuk BentoPDF.
3. Salin konfigurasi Docker Compose dari repository BentoPDF.
4. Simpan sebagai `docker-compose.yml`.
5. Jalankan dengan `docker compose up -d`.

Opsi `-d` berarti detached mode, jadi container berjalan di background.

Kalau muncul error permission denied setelah Docker baru dipasang, kemungkinan user belum masuk group docker atau session terminal belum di-refresh. Logout dari SSH, masuk lagi, lalu coba ulang perintahnya.

## Kenapa setup seperti ini menarik?

Dengan mini PC bekas dan software open source, kita bisa punya server rumahan yang cukup powerful untuk banyak kebutuhan:

- Menjalankan aplikasi self-hosted
- Belajar Linux server
- Belajar Docker dan deployment
- Membuat layanan pribadi yang bisa diakses dari luar rumah
- Eksperimen networking tanpa harus sewa VPS

Yang paling penting, setup ini tidak menuntut biaya besar. Mini PC bekas sudah cukup, storage bisa pakai SSD baru ukuran kecil, dan akses jarak jauhnya bisa memanfaatkan Tailscale secara gratis untuk kebutuhan personal.

## Catatan keamanan

Walaupun Tailscale memudahkan akses, tetap jaga keamanan server:

- Gunakan password yang kuat
- Rutin update sistem dengan `sudo apt update && sudo apt upgrade`
- Jangan asal membuka port ke publik
- Pisahkan folder tiap aplikasi Docker agar rapi
- Backup konfigurasi penting

Kalau nanti ingin aplikasi benar-benar bisa diakses publik tanpa semua user menginstal Tailscale, barulah pertimbangkan tunneling atau reverse proxy yang sesuai. Tapi untuk akses pribadi, Tailscale sudah sangat nyaman dan aman.

## Penutup

Membangun home server tidak harus rumit dan mahal. Dengan mini PC bekas, Ubuntu Server, Tailscale, dan Docker, kita sudah punya fondasi yang kuat untuk menjalankan berbagai layanan sendiri dari rumah.

Mulai dari yang sederhana dulu: pastikan server stabil, IP lokal statis, SSH lancar, Tailscale aktif, lalu baru tambah aplikasi satu per satu lewat Docker. Dari situ, home server kecil ini bisa berkembang jadi pusat eksperimen teknologi pribadi yang seru dan berguna.
