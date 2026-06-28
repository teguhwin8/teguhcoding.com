import { NextResponse } from 'next/server';
import * as cheerio from 'cheerio';
import OpenAI from 'openai';
import fs from 'fs';
import path from 'path';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

function slugify(text: string) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const secretToken = process.env.API_SECRET_TOKEN;
    const authCookie = req.headers.get('cookie')?.includes('auth_token=authenticated');

    if (!authCookie && (!secretToken || authHeader !== `Bearer ${secretToken}`)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url, manualText } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // 1. Get Text Content
    let textContent = "";
    if (manualText) {
      textContent = manualText.slice(0, 8000);
    } else {
      // Fetch the URL content
      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5'
        }
      });
      
      if (!response.ok) {
        return NextResponse.json({ error: 'Gagal mengambil konten website. Website mungkin memblokir server. Silakan masukkan teks secara manual di dashboard.' }, { status: 400 });
      }

      const html = await response.text();
      const $ = cheerio.load(html);
      
      // Extract main text content (rudimentary extraction)
      // Remove scripts, styles, nav, footer
      $('script, style, nav, footer, header, aside, iframe, noscript').remove();
      textContent = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 8000); // limit to 8k chars to save tokens
    }

    // Try to get a cover image from meta tags
    const coverImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';

    // Ask OpenAI to generate meta data and excerpt
    const completion = await openai.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates a natural, engaging, and professional blog post based on the article text. Respond in JSON format with the following keys: 'title' (string), 'tags' (array of strings, max 3), 'excerpt' (string, a comprehensive blog post in Markdown format in Indonesian, using natural, conversational yet professional language like an experienced tech blogger. Avoid rigid AI-like language, cliches, or robotic transitions. Use paragraphs, lists, and headers naturally. IMPORTANT: DO NOT wrap the excerpt in ```markdown code blocks. Return the raw text directly). The response MUST be valid JSON."
        },
        {
          role: "user",
          content: `Generate metadata for the following article:\n\n${textContent}`
        }
      ],
      response_format: { type: "json_object" }
    });

    const resultString = completion.choices[0].message.content;
    if (!resultString) {
      return NextResponse.json({ error: 'Failed to generate content from OpenAI' }, { status: 500 });
    }

    const result = JSON.parse(resultString);
    const slug = slugify(result.title);
    const date = new Date().toISOString();
    
    // Clean up if AI still wraps in markdown code block
    let cleanExcerpt = result.excerpt.replace(/^```markdown\n?/i, '').replace(/\n?```$/i, '').trim();

    // Prepare markdown content
    const markdownContent = `---
title: "${result.title.replace(/"/g, '\\"')}"
source_url: "${url}"
tags: ${JSON.stringify(result.tags)}
date: "${date}"
cover_image: "${coverImage}"
---

${cleanExcerpt}
`;

    // Save to file (either GitHub or Local FS)
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubPath = `content/blog/${slug}.md`;

    if (githubToken && githubOwner && githubRepo) {
      // Use GitHub API
      const base64Content = Buffer.from(markdownContent).toString('base64');
      const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`;

      const githubResponse = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Add new blog post: ${slug}`,
          content: base64Content,
        })
      });

      if (!githubResponse.ok) {
        const errorData = await githubResponse.json();
        console.error('GitHub API Error:', errorData);
        return NextResponse.json({ error: 'Failed to save post to GitHub', details: errorData }, { status: 500 });
      }

      return NextResponse.json({ success: true, slug, method: 'github', path: githubPath });
    } else {
      // Fallback to local file system
      const contentDirectory = path.join(process.cwd(), 'content', 'blog');
      if (!fs.existsSync(contentDirectory)) {
        fs.mkdirSync(contentDirectory, { recursive: true });
      }

      const filePath = path.join(contentDirectory, `${slug}.md`);
      fs.writeFileSync(filePath, markdownContent, 'utf8');

      return NextResponse.json({ success: true, slug, method: 'local_fs', filePath });
    }

  } catch (error: any) {
    console.error('Error generating post:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
