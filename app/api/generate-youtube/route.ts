import { NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';
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
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}

function extractYouTubeId(url: string) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const secretToken = process.env.API_SECRET_TOKEN;
    const authCookie = req.headers.get('cookie')?.includes('auth_token=authenticated');

    if (!authCookie && (!secretToken || authHeader !== `Bearer ${secretToken}`)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { url, transcript: manualTranscript } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'YouTube URL is required' }, { status: 400 });
    }

    const videoId = extractYouTubeId(url);
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 });
    }

    // 1. Fetch Transcript
    let transcriptText = "";
    if (manualTranscript) {
      transcriptText = manualTranscript;
    } else {
      try {
        const transcript = await YoutubeTranscript.fetchTranscript(videoId);
        transcriptText = transcript.map(t => t.text).join(' ');
      } catch (e) {
        console.error("Transcript fetch error:", e);
        return NextResponse.json({ error: 'Gagal mengambil transkrip otomatis. YouTube mungkin memblokir server. Silakan masukkan transkrip secara manual di dashboard.' }, { status: 400 });
      }
    }

    // Truncate to save tokens (limit to 15,000 characters)
    transcriptText = transcriptText.slice(0, 15000);

    // 2. Fetch Title & Thumbnail from oEmbed
    let title = "Generated YouTube Post";
    let coverImage = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    
    try {
      const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (oembedRes.ok) {
        const oembedData = await oembedRes.json();
        title = oembedData.title || title;
      }
    } catch (e) {
      console.error("Failed to fetch oEmbed metadata", e);
    }

    // 3. Ask OpenAI to generate a blog post
    const completion = await openai.chat.completions.create({
      model: "gpt-5.4-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates a natural, engaging, and professional blog post based on a video transcript. Respond in JSON format with the following keys: 'title' (string, a catchy title based on the video), 'tags' (array of strings, max 3), 'excerpt' (string, the full blog post in Markdown format in Indonesian. Write in a natural, conversational yet professional style like an experienced tech blogger. Avoid rigid AI-like language, robotic transitions, and cliches like 'Dalam video ini...'. Make it engaging and easy to read. Use paragraphs, lists, and headers naturally). The response MUST be valid JSON."
        },
        {
          role: "user",
          content: `Video Title: ${title}\n\nTranscript:\n${transcriptText}`
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

    // 4. Prepare markdown content
    const markdownContent = `---
title: "${result.title.replace(/"/g, '\\"')}"
source_url: "${url}"
tags: ${JSON.stringify(result.tags)}
date: "${date}"
cover_image: "${coverImage}"
---

${result.excerpt}
`;

    // 5. Save to file (either GitHub or Local FS)
    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubPath = `content/blog/${slug}.md`;

    if (githubToken && githubOwner && githubRepo) {
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
          message: `Add new YouTube blog post: ${slug}`,
          content: base64Content,
        })
      });

      if (!githubResponse.ok) {
        const errorData = await githubResponse.json();
        return NextResponse.json({ error: 'Failed to save post to GitHub', details: errorData }, { status: 500 });
      }

      return NextResponse.json({ success: true, slug, method: 'github', path: githubPath });
    } else {
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
