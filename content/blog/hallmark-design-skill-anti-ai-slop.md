---
title: "Hallmark: Design Skill yang Bikin UI Lo Gak Keliatan AI-Generated"
source_url: "https://www.youtube.com/watch?v=dVGJ3DE1MzA"
tags: ["ai", "design", "claude-code", "cursor", "codex", "ui-design"]
date: "2026-07-15T07:30:00.000Z"
cover_image: "/hallmark-design-skill.png"
---

Gue lagi scrolling YouTube terus nemu video tentang Hallmark + Claude Code/Codex, dan anjir ini **design skill paling gila** yang pernah gue liat buat AI coding assistants! 

Lo pernah gak sih liat website yang dibuat AI, terus langsung ketauan banget dari tampilannya? Gradient purple-pink di hero section, font Inter dimana-mana, semua di-center kayak template gratisan? Nah, **Hallmark** ini solusinya.

## Apa Sih Hallmark Itu?

Hallmark adalah design skill buat AI coding assistants kayak **Claude Code**, **Cursor**, sama **Codex** yang tujuannya cuma satu: **bikin UI lo gak keliatan kayak hasil generate AI**.

Ini bukan cuma framework CSS atau component library biasa. Hallmark tuh kayak "design brain" yang lo kasih ke AI lo, jadi dia bisa bikin UI yang:
- Gak pake template generic
- Tiap project beda style-nya
- Keliatan dibuat sama designer beneran, bukan robot

Yang bikin ini **Together AI**, dan mereka udah release dengan 20+ themes, 4 mode operasi, dan **57 slop-test gates** yang nge-check apakah design lo keliatan AI-slop apa ngga.

## Masalah: AI Design Itu Keliatan Banget

Sebelum gue jelasin gimana Hallmark kerja, lo harus ngerti dulu kenapa design AI itu **gampang banget ketauan**.

### 5 Tanda-tanda "AI Slop" Design

**1. Purple Gradient Hero**

Lo pasti pernah liat ini: hero section dengan gradient dari purple ke blue atau purple ke pink, text putih di tengah. Ini tuh **AI aesthetic paling terkenal**. Setiap LLM pasti defaultnya kesini.

**2. Inter as Display Font**

Inter (atau Roboto, Open Sans) dipake buat heading DAN body text. Gak ada pairing font sama sekali. One-font page = template page.

**3. Centered Everything**

Heading di tengah, body di tengah, button di tengah, semua section centered. Symmetry jadi default. Boring banget.

**4. Icon-Tile Feature Cards**

Rectangle rounded, icon dalam kotak warna di kiri atas, heading 2 baris, copy 3 baris, terus "Learn more →". Universal template banget.

**5. The AI Nav**

Wordmark kiri, 4 link tengah, CTA button kanan, sticky scroll, hairline border bottom. Shape yang selalu di-ship sama LLM.

Nah, kalau lo liat design dengan **minimal 3 dari 5 ciri di atas**, dipastikan itu AI-generated tanpa skill khusus.

## Hallmark: Anti-AI-Slop Design Skill

Hallmark beda. Dia punya **opinionated rules** yang sengaja ngelawan training default dari LLM. Jadi bukan cuma "variasi visual", tapi **variasi struktural**.

### Prinsip Core Hallmark

**1. Macrostructure First**

Hallmark **pilih struktur layout dulu** sebelum pilih warna atau font. Ada banyak macrostructure:
- Split Hero (content kiri, visual kanan)
- Marquee Hero (full-width dengan overlay)
- Editorial Stack (kayak artikel majalah)
- Terminal Grid (kayak command line interface)
- Dan 16 lainnya

**2. Theme Library (20+ Themes)**

Setelah macrostructure dipilih, Hallmark dress-up dengan salah satu dari 20+ themes:
- **Hum**: Warm, organic, bubbly
- **Cobalt**: Tech-forward, sharp, high-contrast
- **Carnival**: Playful, bold colors, quirky
- **Lumen**: Minimal, breathable, soft
- **Garden**: Natural, earthy, grounded
- **Riso**: Print-inspired, grainy, textured
- Dan masih banyak lagi...

**3. Slop-Test Gates (57 Rules)**

Sebelum output final, Hallmark jalanin **57 automated checks** buat mastiin design lo gak jatuh ke AI-slop patterns. Plus ada **pre-emit self-critique** di mana AI-nya sendiri nge-review design sebelum dikasih ke lo.

**4. No Repeat Policy**

Hallmark **refuse repeat macrostructure** dari 3 project terakhir. Jadi kalau lo minta bikin 5 landing page, dijamin beda semua struktur dasarnya.

## 4 Mode Operasi Hallmark

Hallmark punya 4 cara kerja tergantung kebutuhan lo:

### 1. Build (Default Mode)

Lo cuma bilang "Bikin landing page buat podcast platform" dan Hallmark bakal:
- Baca brief lo
- Pilih macrostructure yang cocok
- Pilih theme yang sesuai
- Generate page lengkap dengan slop-test
- Return working HTML + CSS

**Contoh output:**
- Bubble (sourdough app) → Hum theme
- Distil (content API) → Cobalt theme  
- Cold Snap (record label) → Carnival theme
- Cinder (AI tool) → Lumen theme

Semuanya beda macrostructure, beda theme, gak ada yang sama.

### 2. Study Mode

Lo kasih screenshot atau URL dari design yang lo suka, terus bilang:

```
hallmark study together.ai
```

Hallmark bakal **extract DNA** dari design itu:
- Macrostructure: Split Hero
- Display font role: Heavy geometric sans
- Body font role: Same family, regular weight
- Color anchor: Cool blue + magenta gradient
- Layout rhythm: Left-copy, right product card

**PENTING:** Hallmark **refuses to copy pixels**. Dia cuma ambil struktur dan prinsip design, bukan clone mentah-mentah.

Lo juga bisa export jadi `design.md` yang portable, jadi bisa lo kasih ke AI tool lain.

### 3. Audit Mode

Lo udah punya website yang running, terus lo pengen tau "Ini keliatan AI-generated gak sih?"

```
hallmark audit my-landing-page.html
```

Hallmark bakal kasih **ranked punch list** dari semua anti-pattern yang dia detect:

❌ Purple-to-pink gradient hero → Fix: Solid surface, single accent  
❌ Inter as display + body → Fix: Pair distinctive display + body  
❌ Centered everything → Fix: Bias the layout, break symmetry  
❌ Sparkle ✨ emoji as badge → Fix: Pick an icon library, or drop it  
❌ Gradient pill CTA → Fix: Solid fill or outline, single hue

Ini **diagnosis only**, gak auto-edit. Lo yang decide mau fix atau ngga.

### 4. Redesign Mode

Lo udah punya page dengan content + branding yang solid, tapi lo pengen **beda total secara struktur**:

```
hallmark redesign existing-page.html
```

Hallmark bakal:
- Keep semua copy, IA, dan brand lo
- **Throw out** structural fingerprint
- Rebuild dengan macrostructure yang deliberately different
- New section rhythm, new component voice

Same content, different bones.

## Custom Mode: Buat Project Unik

Kadang lo punya brief yang **terlalu unik** buat 20 themes yang ada. Misalnya:
- Sleeper-train ticket booking (The Cascadia Nightjar)
- Repair-café broadsheet (The Mend Assembly)
- Type foundry portfolio (Press Quaternary)

Hallmark punya **Custom mode** yang design from scratch:
- Made-to-measure palette
- Custom type pairing
- Layout yang fully original
- Tetap jalan 57 slop-test gates

Custom mode ini "quiet branch" — hanya triggered kalau brief lo clearly butuh sesuatu yang catalog themes gak bisa handle.

## 8 Foundation Rules

Hallmark punya 8 prinsip yang hold across semua theme:

**1. Type**: Pair display + body face. Never one font doing both.

**2. Colour**: OKLCH palettes. One anchor hue. Accent stays under 5%.

**3. Space**: Named scale. Multiples of 4. No arbitrary 17px paddings.

**4. Motion**: Exponential ease-out. Reduced-motion alternative for every animation.

**5. Voice**: Distinct register per theme. Never SaaS-default neutral middle.

**6. Layout**: Bias the page. Asymmetric is intentional. Centered everything is a tell.

**7. Hierarchy**: Display, body, label. A weight ladder you can read in 2 seconds.

**8. Restraint**: Better nothing than bad something. The strongest fail-state is silence.

## Before/After: Same Prompt, Different Results

Coba liat perbedaan output dari prompt yang sama:

**Prompt:**  
"Build a landing page for a dev event launch"

### Without Hallmark (Claude Sonnet 4.6)
- Default purple gradient hero
- Generic stat strip with made-up numbers
- Fake Trustpilot rating
- "10× faster" feature cards dengan zero substance
- Template nav bar

### With Hallmark (Claude Sonnet 4.6 + Hallmark)
- Marquee Hero dengan Atelier theme
- Italic Fraunces display font
- Real event details (real venue, real speakers, real dates)
- No fabricated stats
- Custom nav yang match event theme

Bedanya **langit dan bumi**.


## Cara Install Hallmark

Install Hallmark tuh gampang banget. Tinggal pilih salah satu:

### Option 1: NPX Command (Recommended)

```bash
npx skills add nutlope/hallmark
```

Run command ini kapan aja lo mau update. Auto-detected sama Claude Code, Cursor, dan Codex.

### Option 2: Manual Install

Download `SKILL.md` + folder `references/` dari [GitHub repo](https://github.com/Nutlope/hallmark) terus copy ke:

**Claude Code:**
```
~/.claude/skills/hallmark/
```

**Cursor:**
```
.cursor/rules/hallmark.mdc
```
(body of SKILL.md, no frontmatter)

**Codex:**
```
~/.codex/skills/hallmark/  (personal)
.codex/skills/hallmark/    (project-scoped)
```

Setelah install, **skill auto-attach** setiap kali lo minta AI bikin UI.

## Use Cases: Kapan Pake Hallmark?

### 1. Lo Lagi Bikin Landing Page Cepet

Butuh landing page buat product launch besok? Instead of grab template dari Tailwind UI atau Vercel templates (yang bakal keliatan generic), lo bisa:

```
Build me a landing page for a SaaS note-taking app 
targeted at developers. Include hero, features, pricing.
```

Hallmark bakal kasih lo page yang **structurally unique** dan gak keliatan template.

### 2. Lo Pengen Redesign Website Existing

Website lo udah running, content udah solid, tapi tampilannya keliatan AI-generated atau terlalu generic:

```
hallmark redesign ./src/pages/home.tsx
```

Keep content, ganti bones.

### 3. Lo Pengen "Steal" Design DNA

Lo nemu website yang design-nya keren banget, pengen adopt prinsip design-nya tapi gak mau plagiat:

```
hallmark study https://example-cool-site.com
```

Lo dapet DNA card yang bisa lo build against, tanpa copy pixel-per-pixel.

### 4. Quality Check Sebelum Launch

Sebelum launch, lo pengen mastiin design lo gak keliatan AI slop:

```
hallmark audit ./dist/index.html
```

Dapat punch list lengkap dari semua anti-patterns.

## Hallmark vs Design Systems Lain

### Hallmark vs Tailwind UI

**Tailwind UI**: Component library. Lo pilih components, compose sendiri. Risk: Semua orang pake components yang sama, jadi keliatan similar.

**Hallmark**: Design intelligence. Lo kasih brief, dia generate complete page dengan **structural variety**. No two outputs sama.

### Hallmark vs v0/Vercel v0

**v0**: Generate UI dari prompt, tapi masih pake template patterns. Output bisa keliatan similar between projects.

**Hallmark**: Built specifically to **refuse template patterns**. Macrostructure rotation + slop-test gates ensure uniqueness.

### Hallmark vs Manual Design

**Manual Design**: Paling unique, tapi butuh design skills dan waktu.

**Hallmark**: Middle ground. Automated tapi dengan **design opinions** yang strong. Good starting point yang bisa lo refine.

## Limitasi Hallmark

Hallmark itu powerful, tapi gak magic. Ada beberapa limitasi:

**1. Masih Butuh Review**

Output Hallmark lebih bagus dari default AI, tapi **masih butuh human review**. Especially untuk brand-specific touches.

**2. Learning Curve**

Lo perlu ngerti 4 modes dan kapan pake yang mana. Gak bisa cuma "generate and ship".

**3. Opinionated Banget**

Hallmark punya strong opinions tentang type pairing, color usage, layout bias. Kalau lo pengen full control, mungkin terlalu restrictive.

**4. English-First**

Dokumentasi dan examples mostly English. Untuk Indonesian content, lo mungkin perlu adjust copy sendiri.

## Kenapa Gue Excited Sama Hallmark?

Sejujurnya, gue udah lama notice bahwa **AI-generated designs itu keliatan banget**. Apalagi kalau lo sering liat banyak AI-generated sites, lo bisa instant recognize the patterns.

Hallmark adalah **first serious attempt** to solve this problem. Bukan cuma "add more variety", tapi literally **encode anti-AI-slop rules** into the skill.

Yang gue suka:
- **Structural variety**, bukan cuma visual variety
- **57 slop-test gates** yang actually check for AI tells
- **20+ themes** dengan distinct voices
- **Study mode** buat learn from designs you admire
- **Audit mode** buat quality check

Yang masih bisa improve:
- Lebih banyak macrostructures
- Support untuk non-landing pages (dashboards, apps)
- Better internationalization support

## Siapa Yang Cocok Pake Hallmark?

**Cocok buat:**
- **Developers yang gak punya designer** tapi pengen UI yang keliatan profesional
- **AI coding assistant users** (Claude Code, Cursor, Codex) yang pengen output lebih bagus
- **Rapid prototypers** yang butuh starting point solid tanpa template generic
- **Agencies** yang sering bikin landing pages dan butuh variety

**Kurang cocok buat:**
- Designer yang prefer full manual control
- Project dengan brand guidelines super strict
- Apps yang butuh design system consistency across hundreds of pages

## Kesimpulan: Worth It Gak?

**Hell yes, worth it.**

Install Hallmark literally cuma 1 command, dan dia auto-attach ke workflow lo. Worst case, lo gak suka output-nya dan bikin manual. Best case, lo dapet **landing page yang structurally solid** dalam hitungan menit.

Gue personally bakal pake ini buat:
- Client projects yang butuh quick turnaround
- Side projects yang gue gak mau buang waktu design
- Prototyping ideas sebelum hire proper designer

Yang paling penting: **Hallmark bikin AI-generated UIs stop looking like AI-generated UIs**. And that's a huge win.

## Resources

- **Website**: [usehallmark.com](https://www.usehallmark.com)
- **GitHub**: [github.com/Nutlope/hallmark](https://github.com/Nutlope/hallmark)
- **Examples**: [usehallmark.com/examples](https://www.usehallmark.com)
- **License**: MIT (free to use, fork, ship)

---

**Disclaimer:** Artikel ini ditulis berdasarkan research dan demo yang available publicly. Gue belum nyobain extensively di production projects, jadi YMMV (your mileage may vary).

Kalau lo udah nyobain Hallmark, drop pengalaman lo di comments! Pengen tau use case apa yang paling cocok menurut lo. 😈
