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

    if (!secretToken || authHeader !== `Bearer ${secretToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Fetch the URL content
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch the URL' }, { status: 400 });
    }

    const html = await response.text();
    const $ = cheerio.load(html);
    
    // Extract main text content (rudimentary extraction)
    // Remove scripts, styles, nav, footer
    $('script, style, nav, footer, header, aside, iframe, noscript').remove();
    const textContent = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 8000); // limit to 8k chars to save tokens

    // Try to get a cover image from meta tags
    const coverImage = $('meta[property="og:image"]').attr('content') || $('meta[name="twitter:image"]').attr('content') || '';

    // Ask OpenAI to generate meta data and excerpt
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates metadata for a blog post based on the article text. Respond in JSON format with the following keys: 'title' (string), 'tags' (array of strings, max 3), 'excerpt' (string, exactly 2 paragraphs summarizing the article in Indonesian). The response MUST be valid JSON."
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
    const date = new Date().toISOString().split('T')[0];

    // Prepare markdown content
    const markdownContent = `---
title: "${result.title.replace(/"/g, '\\"')}"
source_url: "${url}"
tags: ${JSON.stringify(result.tags)}
date: "${date}"
cover_image: "${coverImage}"
---

${result.excerpt}
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
