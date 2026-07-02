---
title: "SvelteKit Makin Rapat dengan Vite: Konfigurasi Baru, Env Eksplisit, dan Tooling yang Lebih Siap"
source_url: "https://svelte.dev/blog/whats-new-in-svelte-july-2026?ref=dailydev"
tags: ["SvelteKit","Svelte","Web Development"]
date: "2026-07-02T08:39:17.324Z"
cover_image: "https://svelte.dev/blog/whats-new-in-svelte-july-2026/card.png"
---

Bulan ini cukup menarik untuk ekosistem Svelte, terutama bagi yang rutin mengikuti perkembangan SvelteKit. Ada perubahan arah yang terasa cukup besar: konfigurasi SvelteKit kini bisa langsung didefinisikan di `vite.config.js`, tanpa perlu lagi memisahkannya ke `svelte.config.js`.

Ini bukan sekadar perubahan kecil di struktur file. Perubahan ini memberi gambaran jelas ke mana SvelteKit 3 akan bergerak: konfigurasi yang lebih terpusat di Vite, lebih selaras dengan tooling modern, dan lebih mudah dipahami oleh proyek yang memang sudah menjadikan Vite sebagai fondasi utama.

Selain itu, ada preview awal untuk explicit environment variables, peningkatan remote functions, dukungan tooling untuk sintaks `{const ...}`, serta banyak rilis menarik dari komunitas.

## SvelteKit: Konfigurasi Mulai Pindah ke Vite

Perubahan paling menonjol bulan ini datang dari SvelteKit 2.62.0. Sekarang, konfigurasi SvelteKit bisa langsung diberikan ke Vite plugin. Artinya, `svelte.config.js` tidak lagi wajib ada.

Pendekatan ini menjadi preview dari perilaku yang nantinya akan diwajibkan di SvelteKit 3, yaitu konfigurasi Kit tinggal di dalam `vite.config.js`.

Bagi developer yang menyukai struktur proyek yang lebih ringkas, ini kabar baik. Satu file konfigurasi utama berarti lebih sedikit konteks yang harus dibuka saat mengatur build, plugin, adapter, atau eksperimen tertentu.

Tooling Svelte juga sudah mulai mengikuti arah ini. Language tools kini bisa membaca konfigurasi Svelte langsung dari `vite.config.js` atau `vite.config.ts`, sehingga pengalaman di editor tetap konsisten.

## Explicit Environment Variables: Menuju Pengganti `$env/*`

SvelteKit 2.63.0 memperkenalkan experimental explicit environment variables. Fitur ini memungkinkan developer mendeklarasikan dan mengetik environment variables di satu tempat.

Dalam jangka panjang, pendekatan ini akan menggantikan modul `$env/*` di SvelteKit 3.

Manfaatnya cukup jelas:

- Environment variables lebih eksplisit dan terdokumentasi.
- Type safety meningkat karena variabel bisa didefinisikan dengan tipe yang jelas.
- Risiko typo atau env yang lupa disediakan bisa dikurangi lebih awal.
- Add-on dan tooling bisa membaca kebutuhan environment proyek dengan lebih baik.

Beberapa add-on di Svelte CLI, seperti Drizzle dan Better Auth, juga sudah mulai mendukung sistem env baru ini. Jadi meskipun masih experimental, ekosistemnya sudah mulai bergerak ke arah yang sama.

## Remote Functions dan Remote Queries Makin Praktis

Remote functions juga mendapat beberapa peningkatan yang terasa praktis untuk aplikasi nyata.

Pertama, command remote function sekarang bisa menerima objek `File` secara langsung. Ini membuat proses upload file lebih sederhana karena developer tidak perlu lagi membungkus file secara manual ke dalam `FormData`.

Kedua, remote queries kini bisa me-refresh query lain. Ini penting untuk skenario setelah mutation, misalnya setelah membuat, mengubah, atau menghapus data, lalu ingin memastikan data terkait ikut diperbarui.

Dengan perubahan ini, pola invalidasi data di SvelteKit menjadi lebih mudah ditulis dan lebih natural, terutama untuk aplikasi yang banyak bergantung pada data realtime atau interaksi server-client yang intensif.

## Peningkatan Prerendering dan Form Handling

SvelteKit juga membawa beberapa penyempurnaan kecil tapi berguna:

- File `.md` dan `.mdx` yang diprerender kini ikut diprecompress bersama HTML, JS, dan CSS. Ini membantu pengiriman konten lebih cepat.
- Ada warning baru saat boolean field di remote form schema tidak ditandai optional, karena hal ini sering menyebabkan submit gagal secara diam-diam.
- Opsi `prerender.handleInvalidUrl` memungkinkan developer mengatur bagaimana URL invalid yang ditemukan saat crawling dilaporkan.
- Tipe `RemoteFormEnhanceInstance` dan `RemoteFormEnhanceCallback` kini diekspor, sehingga custom enhance callback bisa diberi tipe dengan lebih rapi.
- Submit field yang dikirim sekarang tetap mempertahankan value di payload form action, membuat multi-button form lebih mudah ditangani di server.

Ini bukan fitur yang selalu terlihat glamor, tapi justru peningkatan seperti ini yang membuat framework terasa lebih matang untuk produksi.

## Svelte CLI dan Language Tools Ikut Mengejar

Svelte CLI versi terbaru juga ikut beradaptasi.

Template demo sekarang menggunakan declaration tag baru `{const ...}`, sehingga proyek baru langsung memperlihatkan sintaks modern Svelte. Selain itu, `sv create` kini membuat proyek dengan `@sveltejs/kit ^2.62.0` dan secara default memindahkan konfigurasi Svelte ke dalam Vite plugin.

Ada juga add-on eksperimental baru untuk mengaktifkan experimental flags dan memilih versi `@next` langsung dari CLI. Ini cukup membantu bagi developer yang ingin mencoba fitur masa depan tanpa terlalu banyak konfigurasi manual.

Di sisi language tools, kabar baiknya adalah dukungan untuk `{const ...}` kini sudah hadir di:

- Svelte language server
- `svelte-check`
- `svelte2tsx`

CSS completions juga kini bekerja di dalam nested `<style>` tags, dan `svelte-check` mendapat opsi `--config` untuk menunjuk lokasi config custom.

Yang cukup menarik, `svelte-check` mulai menyediakan dukungan eksperimental untuk tsgo atau TypeScript Go. Tujuannya adalah mempercepat type checking pada codebase besar. Masih eksperimental, tapi ini sinyal bagus untuk proyek Svelte berskala besar yang mulai merasakan bottleneck di proses validasi tipe.

## Showcase Komunitas: Dari AI Desktop sampai Media Server

Seperti biasa, komunitas Svelte produktif melahirkan banyak aplikasi dan eksperimen menarik.

Beberapa yang menonjol bulan ini:

- COLOR LAB, alat color science berbasis browser untuk mengeksplorasi gamut RGB sebagai solid 3D dan membuat theme ramp dengan pengecekan WCAG.
- Cometline, AI companion lokal berbasis SvelteKit, Electron, dan Go agent core.
- EZResumes, resume builder local-first yang berjalan sepenuhnya di client dan memakai Typst untuk layout.
- Lunarr, media server self-hosted open source yang diposisikan sebagai alternatif Plex.
- Pixel Snapper, aplikasi desktop berbasis SvelteKit, Tauri, dan Rust untuk merapikan gambar bergaya pixel art ke grid sempurna.
- SuperMCP, aplikasi macOS native yang memberi akses berbagai AI tools ke Reddit, X, LinkedIn, dan layanan lain melalui cookie Chrome lokal.
- darkly, program seni open source yang dibangun dengan Rust dan Svelte.

Ada juga beberapa situs besar yang terlihat memakai Svelte, termasuk situs resmi Guild Wars 3 dari ArenaNet dan situs baru Obama Foundation untuk Obama Presidential Center.

Menariknya lagi, ada `sveltekit.fyi`, sebuah proyek yang memindai Bluesky untuk menemukan situs yang dibangun dengan SvelteKit dan menampilkannya sebagai showcase komunitas.

## Resource Belajar dan Bacaan Menarik

Untuk yang ingin mengikuti perkembangan Svelte lebih dalam, ada beberapa resource baru yang layak masuk daftar tontonan dan bacaan.

Paolo Ricciuti dari Mainmatter memulai seri YouTube Agentic Engineering with Svelte, yang mendokumentasikan proses membangun aplikasi Svelte produksi dengan bantuan AI agents. Sudah ada beberapa episode, termasuk rencana AMA.

Joy of Code juga membahas realtime data di SvelteKit melalui remote functions, live queries, dan generators dalam video My Favorite Framework Just Got Better.

Dari sisi artikel, ada beberapa bacaan yang cukup reflektif, seperti Picking Svelte in 2026: the honest tradeoff nobody tells you dan Wuchale: One Year of Compile-Time i18n.

## Library dan Tooling Baru yang Patut Dilirik

Ekosistem library Svelte juga terus bergerak.

Di area framework dan tooling, ada Mochi, alternatif SvelteKit yang fokus pada performa dengan islands architecture dan programmatic routing di Bun. Ada juga pottz, yang membundel aplikasi SvelteKit, runtime Bun, dan webview menjadi satu executable untuk aplikasi desktop.

Untuk kebutuhan UI, beberapa proyek menarik meliputi:

- neobrutalism-svelte, UI library dengan gaya neobrutalism dan lo-fi.
- @winkintel/bootstrap-svelte, implementasi Bootstrap 5 untuk Svelte 5 dengan dukungan TypeScript.
- Svaul, drawer component zero-dependency untuk Svelte 5.
- FlareCharts, charting library native runes untuk Svelte 5 dengan theming CSS dan aksesibilitas bawaan.
- Svelte Video Editor, komponen editor video timeline-based dengan dukungan multi-track, scrubbing, dan ripple edits.

Di sisi developer tools, tsv menarik perhatian sebagai formatter dan parser berbasis Rust untuk TypeScript, Svelte, dan CSS. Ada juga svelte-docinfo untuk mengekstrak dokumentasi JSON dari modul TypeScript dan Svelte, serta sveltekit-cloudflare-do yang membantu ekspor Durable Objects ke bundle Cloudflare Worker.

## Penutup

Rilis bulan ini memperlihatkan arah yang semakin jelas untuk SvelteKit: konfigurasi lebih menyatu dengan Vite, environment variables dibuat lebih eksplisit, remote functions makin ergonomis, dan tooling terus mengejar sintaks serta kebutuhan terbaru Svelte 5.

Bagi pengguna SvelteKit saat ini, belum semua perubahan perlu langsung diadopsi, terutama yang masih experimental. Namun, mulai membiasakan diri dengan konfigurasi di `vite.config.js` dan memperhatikan explicit environment variables akan sangat membantu saat transisi menuju SvelteKit 3 nanti.

Ekosistemnya juga terlihat sehat. Tooling berkembang, komunitas terus membangun aplikasi nyata, dan eksperimen baru bermunculan dari berbagai arah, mulai dari desktop apps, AI tools, charting library, sampai framework alternatif.
