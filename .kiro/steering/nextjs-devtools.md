# Next.js DevTools MCP: Always Use Proactively

This project runs on Next.js. The `next-devtools` MCP server is available and must be used proactively — without waiting to be asked.

## When to use it

Use the Next.js DevTools MCP tools automatically in these situations:

- **Before implementing any change** to the app: query routes, component tree, or current state first to understand what exists
- **When debugging** errors, blank pages, or unexpected behavior: check runtime errors and diagnostics before reading code
- **When asked about routes**: use the MCP to list them instead of inferring from the file tree
- **After making changes**: check for compilation errors or runtime issues
- **When the user asks "what's happening"** or similar diagnostic questions

## How to use it

1. Call `mcp_next_devtools_nextjs_index` first to discover the running dev server and available tools
2. Then call `mcp_next_devtools_nextjs_call` with the appropriate tool and port
3. If no server is found via auto-discovery, ask the user which port the dev server is on

## Priority

This rule applies to all Next.js work in this project. Do not skip it even for small changes.
