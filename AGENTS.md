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