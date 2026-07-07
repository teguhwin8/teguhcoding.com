# Teguh Coding - Personal Website & Tech Blog

## Project Overview

Teguh Coding adalah personal website dan tech blog yang dibangun dengan Next.js 16 (canary). Website ini menampilkan portfolio, blog posts tentang teknologi, dan berbagai fitur AI-powered untuk content generation.

**Live URL**: teguhcoding.com  
**Tech Stack**: Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Radix UI  
**Content**: Markdown-based blog system dengan AI-generated content support  
**Deployment**: Vercel

## Architecture & Technology Stack

### Core Technologies
- **Framework**: Next.js 16.3.0-canary.71 dengan App Router
- **React**: Version 19.2.7 (latest)
- **TypeScript**: 5.3.3
- **Styling**: Tailwind CSS 3.4.1 dengan tailwindcss-animate
- **UI Components**: Radix UI (comprehensive component library)
- **Animations**: Framer Motion 12.0.6
- **Forms**: React Hook Form + Zod validation
- **AI Integration**: OpenAI API untuk content generation

### Key Libraries
- **Content Processing**:
  - `gray-matter`: Frontmatter parsing untuk markdown files
  - `react-markdown`: Markdown rendering
  - `cheerio`: Web scraping untuk content extraction
  
- **UI/UX**:
  - `lucide-react`: Icon library
  - `sonner`: Toast notifications
  - `cmdk`: Command menu
  - `embla-carousel-react`: Carousel component
  - `react-resizable-panels`: Resizable panel layouts
  
- **Utilities**:
  - `date-fns`: Date manipulation
  - `clsx` + `tailwind-merge`: Conditional classnames
  - `class-variance-authority`: Component variants

## File Structure

```
teguhcoding.com/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Homepage
│   ├── blog/                     # Blog pages
│   ├── projects/                 # Projects showcase
│   ├── experience/               # Work experience
│   ├── education/                # Education history
│   ├── contact/                  # Contact form
│   ├── search/                   # Search functionality
│   └── api/                      # API routes
│       ├── contact/              # Contact form handler (Resend)
│       ├── generate-post/        # AI post generation
│       ├── generate-youtube/     # YouTube content generation
│       ├── publish-post/         # Publish markdown post
│       ├── delete-post/          # Delete blog post
│       ├── articles/             # Articles API
│       ├── search/               # Search API
│       └── auth/                 # Authentication
├── components/                   # React components
│   ├── ui/                       # Radix UI components (shadcn/ui style)
│   ├── hero.tsx                  # Homepage hero
│   ├── navigation.tsx            # Main navigation
│   ├── footer.tsx                # Site footer
│   ├── article-card.tsx          # Blog post card
│   ├── featured-projects.tsx    # Project showcase
│   ├── latest-blog.tsx          # Latest blog posts
│   ├── contact-form.tsx         # Contact form component
│   ├── search-bar.tsx           # Search component
│   ├── tag-filter.tsx           # Tag filtering
│   ├── table-of-contents.tsx    # ToC for blog posts
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── lib/                          # Utility functions
│   ├── markdown.ts               # Markdown processing & blog post utilities
│   ├── projects.ts               # Projects data
│   ├── toc.ts                    # Table of contents generation
│   ├── html-text.ts              # HTML to text conversion
│   ├── types.ts                  # TypeScript type definitions
│   └── utils.ts                  # General utilities
├── content/
│   └── blog/                     # Markdown blog posts
├── public/                       # Static assets
├── .agents/
│   └── mcp.json                  # MCP server configuration
├── AGENTS.md                     # Agent-specific instructions
└── .env.local                    # Environment variables (not in git)
```

## Key Features

### 1. Blog System
- **Markdown-based**: Blog posts stored as `.md` files in `content/blog/`
- **Frontmatter**: Uses gray-matter untuk metadata (title, tags, date, cover_image, source_url)
- **Reading Time**: Auto-calculated (200 words/minute)
- **Tags**: Tag-based filtering and organization
- **Search**: Full-text search across blog posts

### 2. AI-Powered Content Generation
- **Auto Blog Generation**: AI generates blog posts dari URL atau manual text input
- **YouTube Content**: AI-powered YouTube content generation
- **Model Selection**: Support untuk multiple OpenAI models (gpt-5.4-mini, dll)
- **Smart Extraction**: Web scraping dengan Cheerio untuk extract content
- **Metadata Generation**: AI generates title, tags, dan excerpt dalam Bahasa Indonesia

### 3. Content Management
- **Publish**: API endpoint untuk publish markdown posts
- **Delete**: API endpoint untuk delete posts
- **Authentication**: Bearer token authentication untuk protected endpoints
- **Cookie Auth**: Support untuk cookie-based authentication

### 4. Contact System
- **Resend Integration**: Email handling via Resend API
- **Form Validation**: React Hook Form + Zod validation
- **Error Handling**: Comprehensive error handling dan user feedback

### 5. UI/UX Features
- **Dark Mode**: next-themes untuk dark/light mode toggle
- **Responsive**: Mobile-first responsive design
- **Animations**: Framer Motion untuk smooth transitions
- **Toast Notifications**: Sonner untuk user feedback
- **SEO**: Optimized meta tags, sitemap, robots.txt

## Environment Variables

File `.env.local` harus berisi:

```bash
# WordPress Integration (optional)
WORDPRESS_API_URL=https://wordpress.teguhcoding.com/wp-json/wp/v2
WORDPRESS_USERNAME=your_username
WORDPRESS_APP_PASSWORD="your_app_password"

# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxx
CONTACT_FROM_EMAIL="Teguh Coding <contact@teguhcoding.com>"
CONTACT_TO_EMAIL=teguhwin8@gmail.com

# OpenAI API
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxx

# Authentication
API_SECRET_TOKEN=your_secret_token_here
```

**IMPORTANT**: Jangan commit `.env.local` ke git. Gunakan `.env.local.example` sebagai template.

## API Routes Documentation

### POST `/api/generate-post`
Generate blog post dari URL atau manual text menggunakan OpenAI.

**Authentication**: Bearer token atau cookie auth required

**Request Body**:
```json
{
  "url": "https://example.com/article",
  "manualText": "Optional manual text content",
  "model": "gpt-5.4-mini"
}
```

**Response**:
```json
{
  "success": true,
  "markdownContent": "---\ntitle: \"...\"\n...",
  "slug": "article-slug"
}
```

**Flow**:
1. Fetch URL content atau gunakan manual text
2. Extract text dengan Cheerio (remove scripts, styles, nav, footer)
3. Extract cover image dari og:image meta tag
4. Send ke OpenAI dengan sistem prompt dalam Bahasa Indonesia
5. Generate title, tags (max 3), dan excerpt (comprehensive blog post)
6. Return markdown dengan frontmatter

### POST `/api/publish-post`
Publish markdown content ke file system.

**Authentication**: Bearer token atau cookie auth required

**Request Body**:
```json
{
  "slug": "article-slug",
  "content": "---\ntitle: \"...\"\n..."
}
```

### DELETE `/api/delete-post`
Delete blog post file.

**Authentication**: Bearer token atau cookie auth required

**Request Body**:
```json
{
  "slug": "article-slug"
}
```

### POST `/api/contact`
Send contact form email via Resend.

**Public endpoint** (no auth required)

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Contact message"
}
```

### GET `/api/articles`
Fetch articles dari WordPress API (optional integration).

### POST `/api/generate-youtube`
Generate YouTube-related content menggunakan AI.

**Authentication**: Bearer token atau cookie auth required

### GET/POST `/api/search`
Search blog posts by keyword.

## MCP Server Configuration

Project ini sudah dikonfigurasi dengan **Model Context Protocol (MCP)** servers untuk enhance AI capabilities.

### Active MCP Servers

File `.agents/mcp.json`:
```json
{
  "mcpServers": {
    "openaiDeveloperDocs": {
      "type": "sse",
      "url": "https://developers.openai.com/mcp"
    }
  }
}
```

### OpenAI Developer Docs MCP Server

**Purpose**: Akses real-time ke OpenAI developer documentation  
**Type**: Server-Sent Events (SSE)  
**Usage**: Otomatis digunakan ketika bekerja dengan OpenAI API, ChatGPT Apps SDK, Codex, dll.

**Kapan Digunakan**:
- Saat implement atau debug OpenAI API calls
- Saat perlu referensi tentang API parameters, model capabilities
- Saat troubleshoot authentication atau error handling
- Saat explore new OpenAI features atau models

**Cara Kerja**:
MCP server ini otomatis di-load oleh AI agents sesuai instruksi di `AGENTS.md`:
> "Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, ChatGPT Apps SDK, Codex,… without me having to explicitly ask."

### Adding More MCP Servers

Untuk menambah MCP servers, edit `.agents/mcp.json`:

```json
{
  "mcpServers": {
    "openaiDeveloperDocs": {
      "type": "sse",
      "url": "https://developers.openai.com/mcp"
    },
    "yourNewServer": {
      "type": "sse",
      "url": "https://your-mcp-server.com/endpoint"
    }
  }
}
```

## Development Workflow

### Setup
```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.local.example .env.local
# Edit .env.local dengan values yang sesuai

# Run development server
npm run dev
```

### Development
```bash
# Development dengan Turbopack (faster)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

### Working with Blog Posts

**Manual Creation**:
1. Buat file `.md` baru di `content/blog/`
2. Tambahkan frontmatter:
```markdown
---
title: "Post Title"
source_url: "https://source.com"
tags: ["tag1", "tag2"]
date: "2026-07-08T00:00:00.000Z"
cover_image: "https://image.url"
---

Post content dalam Markdown...
```

**AI Generation**:
1. Gunakan dashboard atau API endpoint `/api/generate-post`
2. Provide URL atau manual text
3. AI generate content dalam Bahasa Indonesia
4. Review dan publish via `/api/publish-post`

## Important Patterns & Conventions

### Next.js Specifics
**CRITICAL**: Always read Next.js docs from `node_modules/next/dist/docs/` before coding. Training data is outdated - docs are source of truth.

### Code Style
- **TypeScript**: Strict mode enabled
- **Components**: Functional components dengan TypeScript
- **Styling**: Tailwind utility classes
- **State Management**: React hooks (useState, useEffect, etc.)
- **Forms**: React Hook Form + Zod validation

### Component Patterns
- **UI Components**: Follow shadcn/ui patterns (Radix UI + Tailwind)
- **Client Components**: Use `"use client"` directive when needed
- **Server Components**: Default untuk data fetching
- **Layout**: Nested layouts via `layout.tsx`

### Content Processing
- **Markdown**: Gray-matter untuk parsing frontmatter
- **Slugs**: Lowercase, hyphens, no special chars
- **Dates**: ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)
- **Reading Time**: 200 words per minute calculation

### API Security
- **Authentication**: Bearer token OR cookie-based auth
- **Protected Routes**: `/api/generate-*`, `/api/publish-*`, `/api/delete-*`
- **Public Routes**: `/api/contact`, `/api/search`, `/api/articles`
- **Token Check**: `process.env.API_SECRET_TOKEN`
- **Cookie Check**: `auth_token=authenticated`

### Error Handling
- API routes return JSON dengan `{ error: string }` untuk errors
- Status codes: 200 (success), 400 (bad request), 401 (unauthorized), 500 (server error)
- User-facing errors via Sonner toast notifications

## Testing & Verification

### Manual Testing Checklist
- [ ] Homepage loads dengan hero, featured projects, latest blog
- [ ] Blog page displays all posts dengan proper pagination
- [ ] Individual blog post renders markdown correctly
- [ ] Search functionality works
- [ ] Tag filtering works
- [ ] Dark mode toggle works
- [ ] Contact form submits successfully
- [ ] Responsive design works on mobile
- [ ] Navigation works across all pages

### AI Content Generation Testing
- [ ] Generate post dari URL works
- [ ] Generate post dengan manual text works
- [ ] Model selection works (different OpenAI models)
- [ ] Publish post creates file correctly
- [ ] Delete post removes file
- [ ] Authentication blocks unauthorized access

## Deployment

### Vercel Deployment
Project ini di-deploy ke Vercel. `.vercelignore` file sudah configured.

**Environment Variables di Vercel**:
Pastikan semua env vars dari `.env.local` sudah di-set di Vercel dashboard:
- OPENAI_API_KEY
- RESEND_API_KEY
- CONTACT_FROM_EMAIL
- CONTACT_TO_EMAIL
- API_SECRET_TOKEN
- (Optional) WORDPRESS_* variables

### Build Process
```bash
npm run build
```

Build command akan:
1. Compile TypeScript
2. Generate Next.js production build
3. Optimize images dan assets
4. Generate static pages where possible

## Troubleshooting

### Common Issues

**"OpenAI API Error"**:
- Check OPENAI_API_KEY is set
- Verify API key is valid dan has credits
- Check model name is correct (e.g., "gpt-5.4-mini")

**"Unauthorized" pada API calls**:
- Verify API_SECRET_TOKEN is set
- Include Bearer token in Authorization header
- Or ensure auth_token cookie is set

**"Failed to fetch content" pada generate-post**:
- Website might be blocking scraper
- Try using manual text input instead
- Check User-Agent headers

**Build errors**:
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run lint`

## AI Agent Instructions

### When Working with This Project

1. **Always check Next.js docs** di `node_modules/next/dist/docs/` sebelum coding
2. **Use OpenAI MCP server** automatically untuk OpenAI API reference
3. **Follow existing patterns** di codebase untuk consistency
4. **Test changes locally** dengan `npm run dev`
5. **Verify TypeScript** dengan `npm run lint`
6. **Check responsive design** untuk mobile compatibility

### Content Generation
- Content harus dalam **Bahasa Indonesia** (natural, professional, conversational)
- Avoid AI-like rigid language atau cliches
- Use paragraphs, lists, headers naturally
- Max 3 tags per post
- Generate comprehensive excerpt (not just summary)

### Code Changes
- Follow TypeScript strict mode
- Use existing UI components dari `components/ui/`
- Follow Tailwind utility-first approach
- Test API endpoints dengan proper authentication
- Verify changes don't break existing functionality

---

**Last Updated**: 2026-07-08  
**Maintained By**: Teguh Widodo  
**Questions**: Refer ke code comments atau contact via website
