<!-- BEGIN:nextjs-agent-rules -->
 
# Next.js: ALWAYS read docs before coding
 
Before any Next.js work, find and read the relevant doc in `node_modules/next/dist/docs/`. Your training data is outdated — the docs are the source of truth.
 
<!-- END:nextjs-agent-rules -->

# Project Documentation

**IMPORTANT**: Read `CLAUDE.md` at the start of any work session for complete project context, architecture, API documentation, and development guidelines.

# MCP Servers

Always use the OpenAI developer documentation MCP server if you need to work with the OpenAI API, ChatGPT Apps SDK, Codex,… without me having to explicitly ask.

MCP server configuration is in `.agents/mcp.json`. Current servers:
- **openaiDeveloperDocs**: Real-time access to OpenAI API documentation (SSE server)

# Content Generation Guidelines

When generating blog content via AI:
- Content MUST be in Bahasa Indonesia
- Use natural, conversational yet professional tone
- Avoid rigid AI-like language or cliches
- Max 3 tags per post
- Generate comprehensive excerpts, not just summaries
- Follow the patterns in `app/api/generate-post/route.ts`
- Follow the SEO/GEO structure in `lib/content-guidelines.ts`: answer-first opening paragraph, question-style `##` headings where natural, a `## Catatan Teguh` analysis section, and a closing `## FAQ` with `###` questions (rendered as FAQPage JSON-LD)
- Never invent facts, numbers, quotes, or hands-on test results not present in the source
- When substantially editing an existing post, set `updated: "<ISO date>"` in its frontmatter (the dashboard publish flow does this automatically)