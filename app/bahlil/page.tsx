'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Globe, Youtube, PenTool, CheckCircle2, XCircle, ChevronDown, ChevronUp, FileText, Trash2, Edit } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const MODELS = [
  { id: 'gpt-5.4-mini', name: 'GPT-5.4 Mini (Default)', price: '$0.15 input / $0.60 output per 1M tokens' },
  { id: 'gpt-4o', name: 'GPT-4o', price: '$2.50 input / $10.00 output per 1M tokens' },
  { id: 'gpt-4o-mini', name: 'GPT-4o Mini', price: '$0.15 input / $0.60 output per 1M tokens' },
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', price: '$10.00 input / $30.00 output per 1M tokens' },
  { id: 'gpt-4', name: 'GPT-4', price: '$30.00 input / $60.00 output per 1M tokens' },
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', price: '$0.50 input / $1.50 output per 1M tokens' },
  { id: 'o1-preview', name: 'o1 Preview', price: '$15.00 input / $60.00 output per 1M tokens' },
  { id: 'o1-mini', name: 'o1 Mini', price: '$3.00 input / $12.00 output per 1M tokens' }
];

export default function Dashboard() {
  const router = useRouter();

  // Navigation state
  const [mainTab, setMainTab] = useState<'generate' | 'articles'>('generate');
  const [activeTab, setActiveTab] = useState<'web' | 'youtube'>('web');
  
  // Generate Form state
  const [model, setModel] = useState('gpt-5.4-mini');
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [manualText, setManualText] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Editor state
  const [isEditing, setIsEditing] = useState(false);
  const [editorContent, setEditorContent] = useState('');
  const [currentSlug, setCurrentSlug] = useState('');
  const [originalSlug, setOriginalSlug] = useState('');
  
  // Notification state
  const [result, setResult] = useState<{ type: 'success' | 'error', message: string, link?: string } | null>(null);

  // Articles state
  const [articles, setArticles] = useState<any[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(false);

  const fetchArticles = async () => {
    setLoadingArticles(true);
    try {
      const res = await fetch('/api/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoadingArticles(false);
    }
  };

  useEffect(() => {
    if (mainTab === 'articles') {
      fetchArticles();
    }
  }, [mainTab]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/bahlil/login');
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const endpoint = activeTab === 'web' ? '/api/generate-post' : '/api/generate-youtube';
      const body: any = { url, model };
      
      if (activeTab === 'youtube' && transcript.trim()) {
        body.manualTranscript = transcript;
      }
      if (activeTab === 'web' && manualText.trim()) {
        body.manualText = manualText;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        // AI generated successfully, load into editor
        setEditorContent(data.markdownContent);
        setCurrentSlug(data.slug);
        setOriginalSlug(''); // it's a new post
        setIsEditing(true);
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Terjadi kesalahan saat memproses URL.'
        });
        if (activeTab === 'youtube' && data.error.includes('transkrip')) {
          setShowManual(true);
        }
        if (activeTab === 'web' && data.error.includes('secara manual')) {
          setShowManual(true);
        }
      }
    } catch (err) {
      setResult({ type: 'error', message: 'Koneksi gagal. Silakan coba lagi.' });
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/publish-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          markdownContent: editorContent,
          slug: currentSlug,
          originalSlug: originalSlug
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({
          type: 'success',
          message: 'Artikel berhasil di-publish!',
          link: `/blog/${data.slug}`
        });
        // Reset state
        setIsEditing(false);
        setEditorContent('');
        setUrl('');
        setTranscript('');
        setManualText('');
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Gagal menyimpan artikel.'
        });
      }
    } catch (err) {
      setResult({ type: 'error', message: 'Koneksi gagal.' });
    } finally {
      setLoading(false);
    }
  };

  const handleEditExisting = async (slug: string) => {
    // Fetch article content
    try {
      const res = await fetch(`/api/articles?slug=${slug}`);
      if (res.ok) {
        const data = await res.json();
        setEditorContent(data.content);
        setCurrentSlug(slug);
        setOriginalSlug(slug);
        setIsEditing(true);
        setMainTab('generate'); // Switch back to editor view
      }
    } catch (e) {
      console.error(e);
      alert('Gagal memuat artikel.');
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Yakin ingin menghapus artikel ${slug}?`)) return;
    
    try {
      const res = await fetch('/api/articles', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });

      if (res.ok) {
        alert('Artikel berhasil dihapus!');
        fetchArticles(); // reload list
      } else {
        alert('Gagal menghapus artikel.');
      }
    } catch (e) {
      console.error(e);
      alert('Koneksi gagal.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      {/* Navbar */}
      <header className="bg-white dark:bg-gray-800 border-b-2 border-black dark:border-gray-700 px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-[0_4px_0_0_rgba(0,0,0,1)] dark:shadow-[0_4px_0_0_rgba(255,255,255,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-black dark:bg-white text-white dark:text-black rounded-lg flex items-center justify-center">
            <PenTool size={20} />
          </div>
          <h1 className="text-xl font-black text-gray-900 dark:text-white">Admin Bahlil</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg border-2 border-black dark:border-gray-700">
            <button 
              onClick={() => { setMainTab('generate'); setIsEditing(false); }}
              className={`px-4 py-1 rounded-md font-bold text-sm ${mainTab === 'generate' ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Generate
            </button>
            <button 
              onClick={() => { setMainTab('articles'); setIsEditing(false); }}
              className={`px-4 py-1 rounded-md font-bold text-sm ${mainTab === 'articles' ? 'bg-black text-white dark:bg-white dark:text-black shadow-sm' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
            >
              Artikel Saya
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:text-red-800 font-bold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut size={18} className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6 mt-8">
        
        {/* TAB: GENERATE & EDITOR */}
        {mainTab === 'generate' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
            
            {/* If Not Editing -> Show Generator Form */}
            {!isEditing ? (
              <>
                <div className="flex border-b-2 border-black dark:border-gray-700">
                  <button
                    onClick={() => { setActiveTab('web'); setResult(null); }}
                    className={`flex-1 flex items-center justify-center py-4 font-bold text-lg border-r-2 border-black dark:border-gray-700 transition-colors ${
                      activeTab === 'web' 
                      ? 'bg-black text-white dark:bg-gray-200 dark:text-black' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Globe size={20} className="mr-2" />
                    Web Article
                  </button>
                  <button
                    onClick={() => { setActiveTab('youtube'); setResult(null); }}
                    className={`flex-1 flex items-center justify-center py-4 font-bold text-lg transition-colors ${
                      activeTab === 'youtube' 
                      ? 'bg-black text-white dark:bg-gray-200 dark:text-black' 
                      : 'bg-white text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Youtube size={20} className="mr-2" />
                    YouTube Video
                  </button>
                </div>

                <div className="p-8 max-w-3xl mx-auto w-full">
                  <div className="mb-8">
                    <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                      Generate from {activeTab === 'web' ? 'Website' : 'YouTube'}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      {activeTab === 'web' 
                        ? 'Masukkan URL artikel website untuk diubah menjadi postingan blog.'
                        : 'Masukkan URL video YouTube. AI akan mengubah percakapan menjadi artikel blog.'}
                    </p>
                  </div>

                  <form onSubmit={handleGenerate} className="space-y-6">
                    {/* Model Selection */}
                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        Pilih Model AI
                      </label>
                      <select 
                        value={model}
                        onChange={(e) => setModel(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black font-medium"
                      >
                        {MODELS.map(m => (
                          <option key={m.id} value={m.id}>
                            {m.name} - {m.price}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                        URL Target
                      </label>
                      <input
                        type="url"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-4 py-3 border-2 border-black dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow"
                        placeholder={activeTab === 'web' ? 'https://medium.com/...' : 'https://www.youtube.com/watch?v=...'}
                        required
                      />
                    </div>

                    {/* Fallbacks */}
                    {activeTab === 'web' && (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setShowManual(!showManual)}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 flex justify-between items-center text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span>Input Teks Manual (Opsional / Fallback)</span>
                          {showManual ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        {showManual && (
                          <div className="p-4 bg-white dark:bg-gray-900">
                            <textarea
                              value={manualText}
                              onChange={(e) => setManualText(e.target.value)}
                              className="w-full h-32 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none text-sm"
                              placeholder="Paste isi artikel di sini..."
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {activeTab === 'youtube' && (
                      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setShowManual(!showManual)}
                          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 flex justify-between items-center text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <span>Input Transkrip Manual (Opsional / Fallback)</span>
                          {showManual ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                        </button>
                        {showManual && (
                          <div className="p-4 bg-white dark:bg-gray-900">
                            <textarea
                              value={transcript}
                              onChange={(e) => setTranscript(e.target.value)}
                              className="w-full h-32 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none text-sm"
                              placeholder="0:00 Halo semuanya..."
                            />
                          </div>
                        )}
                      </div>
                    )}

                    {result && (
                      <div className={`p-4 border-2 rounded-lg flex flex-col gap-2 ${
                        result.type === 'success' ? 'bg-green-50 border-green-500 text-green-800' : 'bg-red-50 border-red-500 text-red-800'
                      }`}>
                        <div className="flex items-center font-bold">
                          {result.type === 'success' ? <CheckCircle2 className="mr-2" /> : <XCircle className="mr-2" />}
                          {result.message}
                        </div>
                        {result.link && (
                          <a href={result.link} target="_blank" rel="noreferrer" className="text-sm underline font-bold mt-1 inline-block">
                            Lihat Artikel →
                          </a>
                        )}
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !url}
                      className="w-full retro-button flex justify-center py-4 text-lg font-black disabled:opacity-50"
                    >
                      {loading ? 'AI Sedang Bekerja...' : 'Generate ke Editor'}
                    </button>
                  </form>
                </div>
              </>
            ) : (
              /* IF EDITING -> Show Markdown Editor & Preview */
              <div className="flex flex-col h-[800px]">
                <div className="p-4 border-b-2 border-black dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between items-center">
                  <div className="flex items-center gap-4 flex-1 mr-4">
                    <button 
                      onClick={() => { setIsEditing(false); setResult(null); }}
                      className="text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white"
                    >
                      ← Kembali
                    </button>
                    <div className="flex-1 max-w-sm">
                      <input 
                        type="text" 
                        value={currentSlug}
                        onChange={(e) => setCurrentSlug(e.target.value)}
                        placeholder="slug-artikel"
                        className="w-full px-3 py-1.5 text-sm border-2 border-black dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 font-mono"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handlePublish}
                    disabled={loading}
                    className="retro-button px-6 py-2 text-sm"
                  >
                    {loading ? 'Menyimpan...' : 'Publish Artikel'}
                  </button>
                </div>
                
                {result && (
                  <div className={`p-3 text-sm text-center font-bold border-b-2 ${result.type === 'success' ? 'bg-green-100 border-green-500 text-green-800' : 'bg-red-100 border-red-500 text-red-800'}`}>
                    {result.message}
                    {result.link && <a href={result.link} target="_blank" className="ml-2 underline">Lihat →</a>}
                  </div>
                )}

                <div className="flex-1 flex overflow-hidden">
                  {/* Editor Side */}
                  <div className="w-1/2 border-r-2 border-black dark:border-gray-700 h-full flex flex-col">
                    <div className="bg-gray-200 dark:bg-gray-800 text-xs font-bold px-4 py-2 uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      Markdown
                    </div>
                    <textarea 
                      value={editorContent}
                      onChange={(e) => setEditorContent(e.target.value)}
                      className="flex-1 w-full p-4 font-mono text-sm bg-white dark:bg-gray-900 text-black dark:text-gray-100 resize-none focus:outline-none"
                    />
                  </div>
                  
                  {/* Preview Side */}
                  <div className="w-1/2 h-full flex flex-col bg-white dark:bg-gray-50">
                    <div className="bg-gray-200 dark:bg-gray-800 text-xs font-bold px-4 py-2 uppercase tracking-wider text-gray-600 dark:text-gray-400">
                      Live Preview
                    </div>
                    <div className="flex-1 overflow-y-auto p-8">
                      <article className="prose prose-lg dark:prose-invert max-w-none">
                        <ReactMarkdown>
                          {editorContent.replace(/^---[\s\S]*?---\n/, '')}
                        </ReactMarkdown>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: ARTICLES */}
        {mainTab === 'articles' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="text-2xl font-black mb-6">Artikel Saya</h2>
            
            {loadingArticles ? (
              <p className="text-center py-8 font-bold text-gray-500">Memuat artikel...</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-black dark:border-gray-700">
                      <th className="pb-3 font-black">Slug / Judul File</th>
                      <th className="pb-3 font-black text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.length === 0 ? (
                      <tr>
                        <td colSpan={2} className="py-8 text-center text-gray-500">Belum ada artikel.</td>
                      </tr>
                    ) : (
                      articles.map((article, i) => (
                        <tr key={i} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="py-4 font-medium">{article.name}</td>
                          <td className="py-4 flex justify-end gap-2">
                            <button 
                              onClick={() => handleEditExisting(article.slug)}
                              className="p-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg flex items-center transition-colors"
                              title="Edit"
                            >
                              <Edit size={16} />
                            </button>
                            <button 
                              onClick={() => handleDelete(article.slug)}
                              className="p-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg flex items-center transition-colors"
                              title="Hapus"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
