---
title: "Fitur Baru Chrome DevTools 150: Memory Debugging, AI Assistance, dan CSS Editing"
source_url: "https://developer.chrome.com/blog/new-in-devtools-150"
tags: ["chrome", "devtools", "debugging", "ai", "css", "developer-tools"]
date: "2026-07-23T09:27:00.000Z"
cover_image: "/chrome-devtools-150.jpg"
---

Chrome DevTools 150 baru aja rilis dan bawa fitur-fitur gokil yang bikin debugging makin asik! Mulai dari memory debugging buat AI agents, AI assistance yang makin canggih, sampe editing CSS at-rules yang lebih powerful. Gue bakal kupas tuntas semua fitur barunya di artikel ini.

## DevTools for Agents: Memory Debugging Suite

Ini fitur yang paling gue tunggu-tunggu! Chrome DevTools for agents sekarang udah sampe versi 1.4.0 dan bawa banyak improvement keren.

### Memory Debugging yang Lebih Powerful

Dengan flag `--experimentalMemory`, sekarang AI agents bisa langsung capture dan analyze V8 heap snapshots. Ini game-changer banget buat diagnose memory leaks di aplikasi JavaScript lo.

Bayangin deh, sebelumnya lo harus manual capture heap snapshot, analyze object retention hierarchies, dan cari tau kenapa memory terus naik. Sekarang agents bisa ngerjain semua itu otomatis!

**Fitur utamanya:**

- **Direct heap snapshot capture**: Agents bisa ambil snapshot memory V8 kapan aja
- **Object retention analysis**: Bisa trace object mana aja yang masih di-retain dan kenapa gak ke-garbage collect
- **Memory leak detection**: Auto-detect pattern yang bikin memory leak
- **Hierarchical visualization**: Liat struktur object retention dalam bentuk tree

### Chrome Extensions Management

Flag `--categoryExtensions` sekarang ngasih lo full control atas Chrome extensions:

```javascript
// Install extension
await agent.installExtension('path/to/extension');

// List active extensions
const extensions = await agent.listExtensions();

// Reload extension untuk testing
await agent.reloadExtension(extensionId);

// Uninstall extension
await agent.uninstallExtension(extensionId);
```

Yang paling berguna: sekarang lo bisa capture **background service worker console logs** langsung dari extension lo. Perfect buat debugging extension yang rumit!

### Bundled Agent Skills

Ini yang bikin DevTools for agents makin powerful. Sekarang folder `skills/` langsung included dalam npm package distribution. Artinya, MCP client agents bisa otomatis discover dan execute specialized workflows.

Skills ini kayak preset automation buat common tasks:

- Navigation workflows
- Form automation
- Performance testing
- Accessibility audits
- Network debugging

Lo tinggal pake aja, gak perlu implement dari nol!

### Token & Output Optimization

Buat yang concern sama cost (especially kalo pake AI yang bayar per token), Chrome DevTools 150 bawa optimization keren:

**Screenshot dimension capping**: Screenshots di-cap dimensinya di source, jadi token consumption turun drastis. Gak perlu kirim full 4K screenshot kalo lo cuma butuh liat layout.

**TOON (Token-Oriented Object Notation)**: Format experimental buat optimize structured data. Basically JSON yang lebih compact dan token-efficient. Masih experimental tapi promising banget!

### Enhanced Navigation & Context

`list_pages` sekarang include page titles alongside URLs dan target IDs. Ini bikin multi-tab context selection jauh lebih gampang:

```javascript
// Before: cuma dapet URL
["https://example.com/page1", "https://example.com/page2"]

// Now: dapet title + URL + target ID
[
  {
    title: "Homepage - Example",
    url: "https://example.com/page1",
    targetId: "ABC123"
  },
  {
    title: "About Us - Example", 
    url: "https://example.com/page2",
    targetId: "DEF456"
  }
]
```

Plus, sekarang ada `allowedUrlPattern` dan `blockedUrlPattern` config options buat enforce strict browsing scope security. Lo bisa limit agent cuma boleh browse URL pattern tertentu aja.

## AI Assistance Panel: Deeper Insights

AI assistance panel di DevTools makin canggih! Sekarang ada 9 widget baru yang kasih lo deeper insight ke Agent walkthroughs.

### New Widgets

Widget-widget baru ini ambil data dari berbagai panel:

- **Lighthouse panel**: Performance metrics, accessibility scores
- **Network panel**: Request timings, resource sizes, waterfall view
- **Sources panel**: Breakpoint info, call stacks, scope variables
- **Performance panel**: Frame rates, paint timings, JavaScript execution

Widget-widget ini bantu lo understand data yang dipake Gemini waktu calling agent tools buat retrieve:

- Performance events
- Resource content
- Network requests
- Source code context
- And more!

Jadi lo bisa liat exactly kenapa AI agent lo ngambil keputusan tertentu. Transparency yang gue suka!

### Agent Walkthrough Enhanced

Agent walkthrough sekarang kasih lo play-by-play explanation tentang:

1. **What the agent is doing**: Step-by-step breakdown
2. **Why it's doing it**: Reasoning behind each action
3. **What data it's using**: Exact metrics and values
4. **What it discovered**: Findings and recommendations

Ini berguna banget buat understand how AI agents work under the hood dan improve your prompts/workflows.

## CSS At-Rules: Full Editing Support

Styles tab di Elements panel sekarang support full editing buat modern CSS features. This is HUGE buat frontend developers!

### @container Rule Editing

Sekarang lo bisa **directly edit** container names dan query conditions di CSS `@container` rules. Gak perlu edit di code editor terus refresh browser lagi!

```css
/* Edit langsung di DevTools */
@container sidebar (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 2fr 1fr;
  }
}
```

Lo bisa:
- Edit container name (`sidebar`)
- Ubah query condition (`min-width: 400px`)
- Lihat changes real-time
- Experiment sama responsive container query designs

Perfect buat rapid prototyping!

### @function Rule Editing

Custom CSS functions sekarang fully editable! Lo bisa define dan edit CSS functions langsung di DevTools:

```css
@function --my-function(--multiplier) {
  result: calc(var(--base-size) * var(--multiplier));
}

.element {
  font-size: --my-function(1.5);
}
```

Edit function parameters, change calculations, test different values - semua bisa di DevTools.

### @counter-style Rule Editing

Ini underrated tapi super useful! Sekarang ada **code completion** buat `list-style-type` properties yang link langsung ke `@counter-style` definitions:

```css
@counter-style custom-bullets {
  system: cyclic;
  symbols: ◆ ◇ ◈ ◉;
  suffix: " ";
}

ul {
  list-style-type: custom-bullets; /* Auto-complete works here! */
}
```

DevTools bakal suggest counter styles yang lo define, jadi gak perlu hafal nama-namanya.

### Collapse Non-Contributing Rules

Fitur baru di preferences: **collapse non-contributing CSS rules**. Ini keep Styles pane lo focused cuma ke active styles aja.

Rules yang gak contribute ke final computed style bakal di-collapse otomatis. Jadi lo gak overwhelmed sama hundreds of unused rules!

## Sources Panel: Better Debugging Experience

### Logical Breakpoint De-duplication

Ini fix annoying issue yang sering gue alamin: duplicate breakpoint markers waktu debugging code-split bundles atau SSR/client compiled templates.

Sekarang breakpoint markers di-dedupe pake **closest resolved location mapping**. Jadi lo gak liat 3-4 breakpoint icons di line yang sama cuma karena code lo compiled di multiple chunks.

### Recursive Source Maps Support

DevTools 150 sekarang support:

- **Recursive EvalOrigin structures**: Buat code yang di-eval berkali-kali
- **Nested source map translation chains**: Multi-stage compilation workflows

Ini ensure stack traces lo accurate bahkan di complex build pipelines (think Webpack + Babel + TypeScript + custom transforms).

### New Keyboard Shortcut

**ALT + G** sekarang jadi shortcut tambahan buat "Go to line" navigation. Ini karena Google nambah Gemini in Chrome shortcut yang conflict sama shortcut lama.

Pro tip: Pake ALT + G kalo shortcut lama lo gak work!

### Import Attributes Formatting

Acorn parser di-update buat support pretty-print formatting untuk standard JavaScript import attributes syntax:

```javascript
import data from "./data.json" with { type: "json" };
import styles from "./styles.css" with { type: "css" };
```

Formatted code sekarang lebih readable di Sources panel!

## Security & Cross-Origin Hardening

Chrome DevTools team recently saw spike in security reports (many found dengan help dari AI - ironic!). They're constantly reviewing dan fixing issues buat keep DevTools safe.

### Self-XSS Protections

**Live Expressions** sekarang ada warning dialogs dan protection mechanisms. Ini prevent self-XSS attacks di Console.

Kalo lo paste code yang suspicious, DevTools bakal warn lo sebelum execute.

### Recorder Panel Security

**Recorder panel** sekarang enforce strict navigation allowlists buat prevent navigating ke high-privilege pages. Plus ada strict extension origin verification dalam replay sections.

Jadi lo gak bisa accidentally record interactions di chrome://settings atau chrome://flags yang bisa expose sensitive data.

### Extension Network Override Restrictions

Network overrides yang di-manage extensions sekarang strictly enforce `runtime_blocked_hosts` host policies. Ini prevent malicious extensions dari override network requests ke blocked hosts.

### Safe @font-face Construction

@font-face rule generation di-refactor pake CSSStyleSheet API dan safe URL stringification buat prevent CSS injection through data URLs.

Before:
```css
/* Vulnerable to injection */
@font-face {
  font-family: 'MyFont';
  src: url(data:...); /* Could contain malicious code */
}
```

Now: DevTools validate dan sanitize semua URLs sebelum construct @font-face rules.

## Other Highlights: Performance, Network & More

Selain fitur-fitur besar di atas, ada banyak smaller improvements yang tetep worth mentioning!

### Performance Panel Improvements

**TraceTree transfer size fix**: Fixed inflation issue buat cached network requests. Sekarang transfer size di-force ke 0 bytes kalo identified as cache hit. Jadi metrics lo accurate!

**CrUX deviceScope support**: Performance formatters sekarang support optional Chrome UX Report (CrUX) deviceScope field data. Lo bisa breakdown performance by device type (desktop, mobile, tablet).

**Horizontal scrolling in Call Tree**: Call Tree tables sekarang support horizontal scrolling! Gak ada lagi ellipsis truncation di long file URLs. Finally!

**Insights sidebar fixes**: Fixed broken re-rendering dan DOM state corruption waktu switching between multiple trace files. Sebelumnya sering crash, sekarang stable.

**Settings migration**: Timeline invalidation tracking dan debug mode settings moved dari experimental flags ke standard DevTools settings. Easier to access!

### Network Panel Updates

**Has overrides column restored**: Reverted incorrect column renaming buat restore "Has overrides" column. Plus fixed sorting logic buat header and content overrides.

**Server-Timing waterfall bars**: Fixed CSS `attr()` styling di Server-Timing waterfall bars. Sekarang per-row generated colors render properly - easier to distinguish different timing entries!

**Copy as cURL fix**: Fixed "Copy as cURL" command generation buat nameless cookies. Before it would generate broken cURL commands, now it handles edge cases correctly.

### Application Panel Enhancements

**Storage infrastructure upgrade**: Local dan session storage items sekarang connected pake new StorageAgent infrastructure. This is groundwork buat future improvements!

**Speculative loads status**: Fixed precedence logic buat URLs yang succeed both prefetch AND prerender. Sekarang accurately display as "prerendered" instead of confusing "prefetch".

**Heap Snapshot tooltips**: Byte-exact value tooltips sekarang available across columns di Heap Snapshot views. Hover over any value buat liat exact bytes - super helpful buat memory debugging!

### Issues Tab Updates

**BackUINavigationWouldSkipAd issue**: Sekarang surface issue type baru waktu back navigation would skip ad entries. Useful buat detect navigation manipulation.

**Email verification issues**: Added support buat surface email verification request issues (`EmailVerificationRequestIssue`). Kalo app lo handle email verification, sekarang lo bisa debug issues di DevTools!

### Lighthouse Integration

**Agentic Browsing category**: Added checkbox baru di Lighthouse configuration panel buat "Agentic Browsing" category (disabled by default). This is experimental feature buat test how well your site works dengan AI agents!

**Engine upgrade**: Bundled Lighthouse engine updated ke v13.3.0 dengan latest performance audits dan best practices.

## Accessibility Improvements

Chrome 150 bawa several enhancements buat screen reader support dan ARIA semantics:

### Better Screen Reader Announcements

Improved announcements waktu:
- Selecting tabs di various panels
- Navigating sections dalam Styles tab
- Switching between different DevTools features

Sebelumnya, screen readers sering miss context atau announce wrong information. Sekarang much more accurate!

### Enhanced Tooltips

**Descriptive tooltips** added di dialog close icons. Plus, tooltips sekarang allow ARIA `details` dan `description` attributes buat provide richer context ke assistive technologies.

Example:
```html
<!-- Old: generic tooltip -->
<button title="Close">×</button>

<!-- New: descriptive tooltip with ARIA -->
<button 
  title="Close settings dialog"
  aria-details="settings-help"
  aria-describedby="close-shortcut">
  ×
</button>
```

### Strict ARIA Roles

Enforced strict ARIA `menuitem` roles di context menu items. Ini improve navigation buat assistive technologies - screen readers now properly announce menu structure and allow standard keyboard navigation.

## Kesimpulan

Chrome DevTools 150 is PACKED dengan improvements! Dari memory debugging yang powerful buat AI agents, sampe CSS editing yang makin smooth, sampe security hardening yang comprehensive.

Favorite features gue:

1. **Memory debugging suite** - Game changer buat diagnose memory leaks
2. **@container rule editing** - Finally bisa rapid prototype container queries!
3. **Logical breakpoint de-duplication** - No more duplicate breakpoint hell
4. **Security improvements** - Sleep better knowing DevTools is hardened
5. **AI assistance widgets** - Transparency into how agents work

Kalo lo belum update ke Chrome 150, update sekarang! Fitur-fitur ini worth it banget, especially kalo lo heavy DevTools user.

Want to contribute atau report bugs? Check out [GitHub repository](https://github.com/ChromeDevTools/chrome-devtools-mcp/releases) buat latest updates!

Happy debugging! 😈

