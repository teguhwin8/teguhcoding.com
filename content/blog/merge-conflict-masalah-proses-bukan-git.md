---
title: "Merge Conflict Itu Masalah Proses, Bukan Masalah Git"
source_url: "https://codecraftdiary.com/2026/07/26/merge-conflicts-process-problem/"
tags: ["git", "development", "workflow", "trunk-based-development", "version-control"]
date: "2026-07-29T06:03:00.000Z"
cover_image: "/merge-conflicts-process-problem.webp"
---

Kebanyakan developer nganggap merge conflict itu masalah Git.

Git bilang ada dua orang yang ngubah kode yang sama, highlight baris yang konflik, terus lo yang harus beresin sendiri. Habis beberapa menit edit-edit, lo commit resolution-nya dan lanjut kerja.

Rasanya kayak Git yang jadi masalahnya.

Tapi setelah kerja di banyak project backend, gue sampai ke kesimpulan yang beda.

Merge conflict itu jarang banget disebabkan sama Git-nya sendiri.

Git cuma **mengekspos** masalah yang udah ada di proses development lo.

Kalau tim lo ngabisin berjam-jam tiap minggu buat resolve merge conflict, masalah sebenarnya mungkin bukan di version control system-nya. Tapi di cara kerja tim lo.

## Git Nggak Bikin Conflict

Satu hal yang gampang lupa adalah Git nggak bikin conflict dari nol.

Merge conflict cuma muncul kalau Git beneran nggak bisa nentuin mana yang harus menang.

Bayangin dua developer kerja di controller yang sama.

Developer A nambahin request validation.

Developer B ngubah response format.

Keduanya modifikasi method yang sama.

Git berhenti dan nanya ke seseorang buat bikin keputusan karena dia emang nggak punya cukup konteks.

Itu persis yang seharusnya dia lakuin.

Conflict-nya bukan kegagalan Git.

Kegagalan-nya terjadi jauh lebih awal—pas dua developer nggak sadar ngabisin berhari-hari modifikasi kode yang sama.

## Pertanyaan Sebenarnya: Kenapa Ini Bisa Terjadi?

Setiap kali ada yang bilang:

"Merge conflict Git bikin gue gila."

Gue biasanya nanya satu pertanyaan.

Berapa lama branch lo buka?

Lebih sering daripada nggak, jawabannya:

- empat hari
- satu minggu
- kadang bahkan tiga minggu

Di situlah masalah sebenarnya mulai.

Setiap hari branch lo tetap isolated, main branch terus bergerak.

Seseorang rename class.

Seseorang refactor service.

Seseorang fix production bug.

Seseorang update dependencies.

Pas lo siap buat merge, kode lo nggak lagi based on project hari ini—tapi based on project dari minggu lalu.

Git cuma jadi tool pertama yang ngasih tau itu.

## Biaya Tersembunyi Bukan dari Conflict-nya

Orang sering mikir merge conflict itu mahal karena butuh waktu buat resolve.

Kenyataannya, editing baris yang konflik biasanya cuma butuh beberapa menit.

**Memahami kenapa conflict itu ada** yang butuh waktu.

Bayangin situasi ini.

Lo mulai feature di hari Senin.

Pas hari Jumat:

- enam pull request udah di-merge
- service lo udah partially refactored
- developer lain extract shared logic ke class baru
- seseorang fix production bug di module yang sama

Sekarang Git report conflict.

Lo nggak lagi solving satu conflict.

Lo lagi **rebuild mental model** dari semua yang terjadi selama lo kerja.

Itulah bagian yang mahal.

## Pull Request Besar Multiply Masalahnya

Satu pattern muncul hampir di mana-mana.

Pull request besar hampir selalu bikin merge conflict yang lebih besar.

Nggak mengejutkan.

Pull request dengan 2,000 baris changed lines menyentuh puluhan file.

Pull request dengan 150 baris mungkin cuma menyentuh dua atau tiga file.

Yang mana yang lebih mungkin overlap sama pekerjaan orang lain?

Exactly.

Ini salah satu alasan terbesar kenapa gue prefer small pull request.

Changes yang lebih kecil nggak cuma bikin review lebih gampang.

Mereka **secara dramatis ngurangin** chance bahwa multiple developer modifikasi kode yang sama di waktu yang sama.

## Long-Lived Branch Drift Away From Reality

Feature branch bukan masalahnya.

**Long-lived feature branch** yang jadi masalah.

Gue pernah liat tim ngabisin dua minggu building feature sebelum buka pull request pertama mereka.

Pas itu, main branch udah berkembang sedemikian rupa sampe merging jadi task tersendiri.

Developer ngabisin berjam-jam:

- fixing conflict
- updating failing test
- adapting ke refactored service
- resolving dependency change

Ironisnya, tim sering nyimpulin bahwa merging itu painful.

Kebenarannya sedikit beda.

Merging jadi painful karena mereka **nunggu terlalu lama**.

## Komunikasi Mencegah Lebih Banyak Conflict Daripada Git

Nggak semua conflict bisa dihindari.

Kadang dua developer emang harus kerja di bagian yang sama dari aplikasi.

Bedanya adalah apakah mereka **tahu tentang satu sama lain**.

Bayangin ini.

Satu developer lagi refactoring authentication service.

Developer lain lagi implementing passwordless login.

Tanpa komunikasi, keduanya ngabisin beberapa hari modifikasi kode yang sama.

Conflict-nya inevitable.

Sekarang bayangin percakapan lima menit sebelum mereka mulai.

"Gue kerja di AuthService minggu ini."

"Gue juga."

"Yuk split worknya dan merge lebih sering."

Lima menit komunikasi bisa ngabisin berjam-jam unnecessary conflict resolution.

Git nggak pernah bisa solve masalah itu.

## Trunk-Based Development Mengubah Segalanya

Ini salah satu alasan terbesar kenapa gue fan berat Trunk-Based Development.

Tujuannya bukan buat eliminate merge conflict sepenuhnya.

Itu impossible.

Tujuannya adalah bikin mereka **sedemikian kecil** sampe nggak ada yang peduli.

Daripada merging sekali tiap Jumat…

…developer merge beberapa kali tiap hari.

Daripada resolving lima puluh conflict sekaligus…

…mereka resolve satu tiny overlap sebelum lunch.

Small branch bikin small pull request.

Small pull request bikin small conflict.

Small conflict jarang interrupt development.

## Conflict Paling Berbahaya Nggak Pernah Muncul di Git

Menariknya, conflict terburuk bukan merge conflict sama sekali.

Bayangin scenario ini.

Developer A ngubah cara discount dihitung.

Developer B ngubah invoice generation.

File beda.

Nggak ada merge conflict.

Semuanya merge dengan sempurna.

Production break karena invoice generation masih expect discount logic yang lama.

Git nggak bisa detect itu.

Masalahnya bukan textual.

Tapi **logical**.

Hidden conflict kayak gini jadi jauh lebih gampang ditemukan kalau tim integrate secara continuous daripada nunggu berhari-hari sebelum merging.

## Cara Mengurangi Merge Conflict

Nggak ada workflow yang eliminate merge conflict sepenuhnya.

Tapi beberapa habit sederhana bikin mereka jauh lebih nggak painful.

- **Merge ke main branch frequently** — jangan nunggu berhari-hari
- **Keep pull request small** — 150 baris lebih baik dari 2,000
- **Avoid combining unrelated changes** — satu PR satu tujuan
- **Communicate** kalau multiple developer kerja di area yang sama
- **Use feature flag** daripada long-lived branch
- **Review PR quickly** jadi nggak duduk idle berhari-hari

Nggak ada praktik di atas yang revolutionary.

Tapi kalau digabungin, mereka mengubah merge conflict dari major interruption jadi minor inconvenience.

## Stop Blaming Git

Git jadi salah satu tool yang paling gampang disalahin.

Dia report conflict.

Dia highlight perbedaan.

Dia force developer buat bikin keputusan.

Tapi Git nggak bikin masalahnya.

Dia cuma **mengungkapnya**.

Next time tim lo ngabisin sore hari resolving merge conflict, jangan tanya:

"Gimana caranya kita jadi lebih baik di Git?"

Tanya sesuatu yang jauh lebih valuable:

"Apa di proses development kita yang bikin conflict ini tumbuh sebesar ini?"

Kebanyakan waktu, jawabannya nggak tersembunyi di Git command.

Tapi tersembunyi di **workflow**.

Dan begitu workflow membaik, merge conflict jadi persis seperti yang seharusnya: small, occasional interruption daripada recurring team-wide headache.

---

## Kesimpulan

Merge conflict itu indikator, bukan root cause.

Kalau tim lo sering banget ketemu conflict yang massive, jangan langsung salahkan Git. Coba liat:

- Berapa lama branch lo buka sebelum di-merge?
- Seberapa besar pull request lo?
- Apakah tim lo komunikasi sebelum kerja di area yang sama?
- Seberapa sering lo integrate ke main branch?

Git cuma messenger. Jangan bunuh messenger-nya.

Fix workflow-nya, dan lo bakal liat merge conflict jadi nggak serem lagi. 😈
