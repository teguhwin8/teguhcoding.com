import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function DELETE(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const secretToken = process.env.API_SECRET_TOKEN;

    if (!secretToken || authHeader !== `Bearer ${secretToken}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { slug } = await req.json();

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    const githubPath = `content/blog/${slug}.md`;

    if (githubToken && githubOwner && githubRepo) {
      // 1. Get file SHA from GitHub (required for deletion)
      const getUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`;
      const getResponse = await fetch(getUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });

      if (!getResponse.ok) {
        if (getResponse.status === 404) {
          return NextResponse.json({ error: 'Post not found on GitHub' }, { status: 404 });
        }
        return NextResponse.json({ error: 'Failed to fetch file from GitHub' }, { status: 500 });
      }

      const fileData = await getResponse.json();
      const sha = fileData.sha;

      // 2. Delete file from GitHub
      const deleteResponse = await fetch(getUrl, {
        method: 'DELETE',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: `Delete blog post: ${slug}`,
          sha: sha,
        })
      });

      if (!deleteResponse.ok) {
        const errorData = await deleteResponse.json();
        console.error('GitHub API Delete Error:', errorData);
        return NextResponse.json({ error: 'Failed to delete post on GitHub', details: errorData }, { status: 500 });
      }

      return NextResponse.json({ success: true, message: `Deleted ${slug} from GitHub` });
    } else {
      // Fallback to local FS
      const filePath = path.join(process.cwd(), 'content', 'blog', `${slug}.md`);
      
      if (!fs.existsSync(filePath)) {
        return NextResponse.json({ error: 'Post not found locally' }, { status: 404 });
      }

      fs.unlinkSync(filePath);
      return NextResponse.json({ success: true, message: `Deleted ${slug} locally` });
    }
  } catch (error: any) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
