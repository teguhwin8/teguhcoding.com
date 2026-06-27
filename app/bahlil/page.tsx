'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, Globe, Youtube, PenTool, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'web' | 'youtube'>('web');
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState('');
  const [showManual, setShowManual] = useState(false);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error', message: string, link?: string } | null>(null);
  const router = useRouter();

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
      const body: any = { url };
      
      if (activeTab === 'youtube' && transcript.trim()) {
        body.transcript = transcript;
      }

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        setResult({
          type: 'success',
          message: 'Artikel berhasil di-generate dan disimpan ke GitHub!',
          link: `/blog/${data.slug}`
        });
        setUrl('');
        setTranscript('');
        setShowManual(false);
      } else {
        setResult({
          type: 'error',
          message: data.error || 'Terjadi kesalahan saat memproses URL.'
        });
        if (activeTab === 'youtube' && data.error.includes('transkrip')) {
          setShowManual(true);
        }
      }
    } catch (err) {
      setResult({ type: 'error', message: 'Koneksi gagal. Silakan coba lagi.' });
    } finally {
      setLoading(false);
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
        <button 
          onClick={handleLogout}
          className="flex items-center text-red-600 hover:text-red-800 font-bold px-4 py-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
        >
          <LogOut size={18} className="mr-2" />
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="max-w-3xl mx-auto p-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-black dark:border-gray-700 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.1)] overflow-hidden">
          
          {/* Tabs */}
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

          {/* Form */}
          <div className="p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                Generate from {activeTab === 'web' ? 'Website' : 'YouTube'}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 font-medium">
                {activeTab === 'web' 
                  ? 'Masukkan URL artikel website untuk diubah menjadi postingan blog Anda.'
                  : 'Masukkan URL video YouTube. AI akan mengubah transkrip percakapan menjadi artikel blog.'}
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-6">
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
                      <p className="text-xs text-gray-500 mb-3">
                        Gunakan ini jika Vercel terblokir oleh YouTube. Copy-paste transkrip langsung dari YouTube (Klik '...' di bawah video {'>'} Show transcript).
                      </p>
                      <textarea
                        value={transcript}
                        onChange={(e) => setTranscript(e.target.value)}
                        className="w-full h-32 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-black dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-shadow resize-y text-sm"
                        placeholder="0:00 Halo semuanya, selamat datang di video kali ini..."
                      />
                    </div>
                  )}
                </div>
              )}

              {result && (
                <div className={`p-4 border-2 rounded-lg flex flex-col gap-2 ${
                  result.type === 'success' 
                  ? 'bg-green-50 border-green-500 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                  : 'bg-red-50 border-red-500 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                }`}>
                  <div className="flex items-center font-bold">
                    {result.type === 'success' ? <CheckCircle2 className="mr-2" /> : <XCircle className="mr-2" />}
                    {result.type === 'success' ? 'Berhasil!' : 'Gagal!'}
                  </div>
                  <p className="text-sm">{result.message}</p>
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
                className="w-full retro-button flex justify-center py-4 text-lg font-black disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'AI Sedang Bekerja...' : 'Generate Artikel'}
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
