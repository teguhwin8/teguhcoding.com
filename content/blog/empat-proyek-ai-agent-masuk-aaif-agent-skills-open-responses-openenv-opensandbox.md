---
title: "Empat Proyek AI Agent Masuk AAIF, Termasuk Agent Skills dari Anthropic"
source_url: "https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects"
tags: ["AI", "Developer Tools", "Open Source"]
date: "2026-10-23T08:00:50.000Z"
cover_image: "/posts/aaif-four-projects-cover.png"
---

Agentic AI Foundation (AAIF) kini menaungi empat proyek baru: Agent Skills dari Anthropic, Open Responses dari OpenAI, OpenEnv dari Hugging Face, dan OpenSandbox dari Alibaba. Pengumuman pada 22 Oktober itu menambah koleksi AAIF dari tiga proyek saat didirikan menjadi sepuluh. AAIF berada di bawah Linux Foundation, dan [keempat proyek ini](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects) mengisi bagian berbeda dari infrastruktur agent.

![Pengumuman AAIF tentang empat proyek baru: Agent Skills, Open Responses, OpenEnv, dan OpenSandbox](/posts/aaif-four-projects-cover.png)

*Gambar: Agentic AI Foundation, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/) sesuai [ketentuan Linux Foundation](https://www.linuxfoundation.org/legal/terms), dari [pengumuman resminya](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects). AAIF dan logonya merupakan merek dagang Linux Foundation; Teguhcoding.com tidak berafiliasi atau disponsori AAIF.*

## Empat proyek, empat pekerjaan

Keempat proyek ini mengisi pekerjaan yang berbeda. **Agent Skills** mengemas instruksi, skrip, dan bahan rujukan agar agent bisa memakai alur kerja tertentu. **Open Responses** merumuskan format bersama untuk aplikasi yang ingin berkomunikasi dengan beberapa penyedia model. **OpenEnv** menyediakan lingkungan untuk melatih dan menguji agent, sedangkan **OpenSandbox** memberi developer tempat terisolasi untuk menjalankan kode atau tugas agent.

![Ilustrasi Agent Skills: pengetahuan dan alur kerja tim dibagikan ke beberapa antarmuka agent](/posts/agent-skills-team-expertise.jpg)

*Ilustrasi: Agentic AI Foundation, [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/), dari [halaman proyek Agent Skills](https://aaif.io/projects/skills).*

Agent Skills paling mudah dikenali developer yang memakai format `SKILL.md`: sebuah folder berisi petunjuk untuk tugas tertentu, dengan skrip atau referensi tambahan bila dibutuhkan. Anthropic menyebut lebih dari 70 platform—termasuk ChatGPT, Cursor, GitHub Copilot, dan VS Code—sudah mengintegrasikannya. Perusahaan itu juga melaporkan satu juta skill telah diterbitkan dan hampir 280 juta kali diinstal; angka tersebut berasal dari Anthropic sendiri.

## Yang berubah adalah tata kelolanya

Anthropic menyerahkan nama dan logo Agent Skills, organisasi GitHub, serta domain `agentskills.io` kepada AAIF. Standarnya akan dirawat oleh para engineer dari sejumlah perusahaan dalam kapasitas pribadi; David Soria Parra dan Mahesh Murag menjadi lead maintainer. Pengguna masih boleh memakai dan berkontribusi tanpa menjadi anggota AAIF.

Anthropic belum mengumumkan kewajiban migrasi bagi tim yang sudah memakai Agent Skills. Format folder dan isi skill tetap bisa digunakan. Dukungan praktiknya tetap bergantung pada produk: satu agent mungkin membaca format yang sama, tetapi kemampuan menjalankan skrip, izin, dan tool yang tersedia bisa berbeda.

Anthropic mengusulkan agar pekerjaan berikutnya mencakup rilis berversi, proses proposal formal, dan panduan keamanan untuk penulis maupun pemasang skill. Itu masih usulan awal; jadwal dan aturan final belum diumumkan. [The Register](https://www.theregister.com/ai-and-ml/2026/10/23/vendor-affiliated-ai-agent-tech-gets-adopted-by-friendly-funded-foundation/5304912) mencatat tujuan AAIF memperluas tata kelola vendor-neutral. Bagi developer, klaim itu baru bisa dinilai dari siapa yang memutus perubahan dan seberapa terbuka prosesnya. Simon Willison, pengamat developer independen, mengatakan ia sudah menduga Agent Skills akan berakhir di AAIF sejak standar itu diumumkan terbuka tahun lalu.

Untuk tim yang sudah memakai Agent Skills, pengumuman ini berfokus pada tata kelola dan tidak meminta penggantian paket. Perubahan spesifikasi dan panduan keamanan AAIF berikutnya akan menunjukkan bagaimana format ini dirawat dan dipakai di berbagai platform.

**Sumber:** [pengumuman AAIF](https://aaif.io/news/agentic-ai-foundation-announces-four-new-projects), [penjelasan Anthropic](https://www.anthropic.com/news/donating-agent-skills-to-the-agentic-ai-foundation), [ulasan The Register](https://www.theregister.com/ai-and-ml/2026/10/23/vendor-affiliated-ai-agent-tech-gets-adopted-by-friendly-funded-foundation/5304912), [catatan Simon Willison](https://simonwillison.net/2026/Oct/22/donating-agent-skills/), dan [spesifikasi Agent Skills](https://github.com/agentskills/agentskills).
