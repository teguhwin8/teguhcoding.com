import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get('authorization');
    const secretToken = process.env.API_SECRET_TOKEN;
    const authCookie = req.headers.get('cookie')?.includes('auth_token=authenticated');

    if (!authCookie && (!secretToken || authHeader !== `Bearer ${secretToken}`)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { markdownContent, slug, originalSlug } = await req.json();

    if (!markdownContent || !slug) {
      return NextResponse.json({ error: 'Markdown content and slug are required' }, { status: 400 });
    }

    const githubToken = process.env.GITHUB_TOKEN;
    const githubOwner = process.env.GITHUB_OWNER;
    const githubRepo = process.env.GITHUB_REPO;
    
    // If originalSlug is provided and different from new slug, we might need to delete the old one (optional enhancement)
    // For now, we focus on saving the current slug.

    const githubPath = `content/blog/${slug}.md`;

    if (githubToken && githubOwner && githubRepo) {
      const base64Content = Buffer.from(markdownContent).toString('base64');
      const githubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${githubPath}`;

      // Check if file already exists to get its SHA (required for updating in GitHub API)
      let sha = undefined;
      const getResponse = await fetch(githubApiUrl, {
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
        }
      });
      
      if (getResponse.ok) {
        const fileData = await getResponse.json();
        sha = fileData.sha;
      }

      // If originalSlug is different and exists, we should ideally delete it, but let's just save the new one first.
      if (originalSlug && originalSlug !== slug) {
        const oldGithubPath = `content/blog/${originalSlug}.md`;
        const oldGithubApiUrl = `https://api.github.com/repos/${githubOwner}/${githubRepo}/contents/${oldGithubPath}`;
        const oldGetResponse = await fetch(oldGithubApiUrl, {
          headers: {
            'Authorization': `token ${githubToken}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        });
        if (oldGetResponse.ok) {
          const oldFileData = await oldGetResponse.json();
          await fetch(oldGithubApiUrl, {
            method: 'DELETE',
            headers: {
              'Authorization': `token ${githubToken}`,
              'Accept': 'application/vnd.github.v3+json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              message: `Delete old blog post: ${originalSlug}`,
              sha: oldFileData.sha,
            })
          });
        }
      }

      const bodyPayload: any = {
        message: `Publish blog post: ${slug}`,
        content: base64Content,
      };
      
      if (sha) {
        bodyPayload.sha = sha; // Add sha for updating
      }

      const githubResponse = await fetch(githubApiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${githubToken}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyPayload)
      });

      if (!githubResponse.ok) {
        const errorData = await githubResponse.json();
        console.error('GitHub API Error:', errorData);
        return NextResponse.json({ error: 'Failed to save post to GitHub', details: errorData }, { status: 500 });
      }

      return NextResponse.json({ success: true, slug, method: 'github', path: githubPath });
    } else {
      // Local FS
      const contentDirectory = path.join(process.cwd(), 'content', 'blog');
      if (!fs.existsSync(contentDirectory)) {
        fs.mkdirSync(contentDirectory, { recursive: true });
      }

      if (originalSlug && originalSlug !== slug) {
        const oldFilePath = path.join(contentDirectory, `${originalSlug}.md`);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }

      const filePath = path.join(contentDirectory, `${slug}.md`);
      fs.writeFileSync(filePath, markdownContent, 'utf8');

      return NextResponse.json({ success: true, slug, method: 'local_fs', filePath });
    }

  } catch (error: any) {
    console.error('Error publishing post:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
