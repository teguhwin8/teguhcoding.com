import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
  try {
    const authCookie = req.headers.get('cookie')?.includes('auth_token=authenticated');
    if (!authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const url = new URL(req.url);
    const slug = url.searchParams.get('slug');

    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    
    // Read specific article content
    if (slug) {
      if (githubToken && githubOwner && githubRepo) {
        const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/content/blog/${slug}.md`;
        const response = await fetch(githubApiUrl, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        if (response.ok) {
          const fileData = await response.json();
          const content = Buffer.from(fileData.content, 'base64').toString('utf8');
          return NextResponse.json({ content });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      } else {
        const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          return NextResponse.json({ content });
        }
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
      }
    }

    // Read list of articles
    if (githubToken && githubOwner && githubRepo) {
      const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/content/blog`;
      const response = await fetch(githubApiUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      if (!response.ok) {
        if (response.status === 404) return NextResponse.json({ articles: [] });
        return NextResponse.json({ error: 'Failed to fetch from GitHub' }, { status: 500 });
      }

      const files = await response.json();
      const articles = files
        .filter((file: any) => file.name.endsWith('.md'))
        .map((file: any) => ({
          slug: file.name.replace('.md', ''),
          name: file.name,
          path: file.path,
          sha: file.sha
        }));
        
      return NextResponse.json({ articles });
    } else {
      const contentDirectory = path.join(process.cwd(), 'content', 'blog');
      if (!fs.existsSync(contentDirectory)) {
        return NextResponse.json({ articles: [] });
      }
      const files = fs.readdirSync(contentDirectory);
      const articles = files
        .filter(name => name.endsWith('.md'))
        .map(name => ({
          slug: name.replace('.md', ''),
          name
        }));
      return NextResponse.json({ articles });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const authCookie = req.headers.get('cookie')?.includes('auth_token=authenticated');
    if (!authCookie) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await req.json();
    if (!slug) return NextResponse.json({ error: 'Slug is required' }, { status: 400 });

    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    
    if (githubToken && githubOwner && githubRepo) {
      const githubPath = `content/blog/${slug}.md`;
      const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`;
      
      const getResponse = await fetch(githubApiUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        await fetch(githubApiUrl, {
          method: 'DELETE',
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: `Delete blog post: ${slug}`,
            sha: fileData.sha,
          })
        });
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'File not found on GitHub' }, { status: 404 });
    } else {
      const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
