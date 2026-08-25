'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Check, Copy, Download, Eye, Facebook, FileText, Image as ImageIcon, Linkedin, Menu, Moon, Pause, Play, Plus, Search, Share2, Sparkles, Sun, Trash2, UploadCloud, Video, Volume2, X } from 'lucide-react';
import { useMemo, useRef, useState } from 'react';
import { BlogPost, MediaItem, acceptedFiles, formatBytes, slugify, storageAdapterExample } from '@/lib/media';

const seedMedia: MediaItem[] = [
  { id: '1', kind: 'video', name: 'launch-reel.webm', size: 48_400_000, uploadedAt: '2026-08-20', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm', extension: 'webm' },
  { id: '2', kind: 'image', name: 'studio-cover.webp', size: 2_100_000, uploadedAt: '2026-08-22', url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80', extension: 'webp' }
];

const seedPosts: BlogPost[] = [
  { id: 'p1', title: 'Designing a Faster Media Workflow', slug: 'designing-a-faster-media-workflow', category: 'Product', tags: ['Media', 'UX'], author: 'Maya Chen', status: 'Published', cover: seedMedia[1].url, body: 'MediaPulse centralizes upload, preview, sharing, and publishing into one polished workspace with optimistic actions and real-time feedback.', createdAt: '2026-08-24', readTime: '3 min read' }
];

export default function MediaPulseApp() {
  const [dark, setDark] = useState(true);
  const [mobileNav, setMobileNav] = useState(false);
  const [media, setMedia] = useState(seedMedia);
  const [posts, setPosts] = useState(seedPosts);
  const [toast, setToast] = useState('Welcome to MediaPulse');
  const [progress, setProgress] = useState(0);
  const [activeMedia, setActiveMedia] = useState<MediaItem | null>(null);
  const [share, setShare] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<MediaItem | null>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [title, setTitle] = useState('Untitled media story');
  const [body, setBody] = useState('Write in Markdown. Add image URLs or embed media links directly in the article.');
  const inputRef = useRef<HTMLInputElement>(null);

  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(''), 2600); };

  const addFiles = (files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const ext = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const kind = acceptedFiles.video.includes(ext) ? 'video' : acceptedFiles.image.includes(ext) ? 'image' : null;
      if (!kind) return notify(`${file.name} is not supported.`);
      const limit = kind === 'image' ? 10 * 1024 ** 2 : 100 * 1024 ** 2;
      if (file.size > limit) return notify(`${file.name} exceeds the ${kind === 'image' ? '10MB' : '100MB'} limit.`);
      const started = performance.now();
      const timer = window.setInterval(() => {
        setProgress((current) => {
          const next = Math.min(current + 14, 100);
          if (next === 100) {
            window.clearInterval(timer);
            const speed = formatBytes(file.size / Math.max((performance.now() - started) / 1000, 1));
            setMedia((items) => [{ id: crypto.randomUUID(), kind, name: file.name, size: file.size, uploadedAt: new Date().toISOString().slice(0, 10), url: URL.createObjectURL(file), extension: ext.slice(1) }, ...items]);
            notify(`Uploaded ${file.name} at ${speed}/s`);
            window.setTimeout(() => setProgress(0), 700);
          }
          return next;
        });
      }, 130);
    });
  };

  const filteredPosts = useMemo(() => posts.filter((post) => (category === 'All' || post.category === category) && `${post.title} ${post.tags.join(' ')}`.toLowerCase().includes(query.toLowerCase())), [posts, category, query]);
  const savePost = (status: BlogPost['status']) => {
    const words = body.split(/\s+/).filter(Boolean).length;
    const post = { id: crypto.randomUUID(), title, slug: slugify(title), category: 'Product', tags: ['Draft', 'Media'], author: 'You', status, cover: seedMedia[1].url, body, createdAt: new Date().toISOString().slice(0, 10), readTime: `${Math.max(1, Math.ceil(words / 220))} min read` };
    setPosts((items) => [post, ...items]);
    notify(status === 'Published' ? 'Post published instantly.' : 'Draft saved securely.');
  };

  return <main className={dark ? 'dark' : ''}><div className="min-h-screen bg-slate-50 text-slate-950 transition dark:bg-slate-950 dark:text-slate-100">
    <aside className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-slate-200/60 bg-white/90 p-5 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 ${mobileNav ? 'block' : 'hidden'} lg:block`}>
      <div className="mb-10 flex items-center gap-3"><div className="rounded-2xl bg-violet-600 p-3 shadow-glow"><Sparkles /></div><div><h1 className="text-xl font-black">MediaPulse</h1><p className="text-xs text-slate-500">Media + publishing OS</p></div></div>
      {['Dashboard', 'Media Hub', 'Blog Studio', 'Analytics', 'Settings'].map((item, i) => <a key={item} className={`mb-2 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm ${i === 0 ? 'bg-violet-600 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-900'}`}><BookOpen size={18}/>{item}</a>)}
      <pre className="mt-8 whitespace-pre-wrap rounded-2xl bg-slate-100 p-4 text-[10px] text-slate-500 dark:bg-slate-900">{storageAdapterExample}</pre>
    </aside>

    <section className="lg:pl-72"><header className="sticky top-0 z-20 glass flex items-center justify-between px-4 py-4 lg:px-8"><button onClick={() => setMobileNav(!mobileNav)} className="lg:hidden"><Menu /></button><div><p className="text-sm text-violet-500">Secure REST-ready workspace</p><h2 className="text-2xl font-black tracking-tight">Media Dashboard & Blog Platform</h2></div><button onClick={() => setDark(!dark)} className="rounded-full border p-3 dark:border-slate-700">{dark ? <Sun /> : <Moon />}</button></header>

    <div className="grid gap-6 p-4 lg:grid-cols-[1.35fr_.9fr] lg:p-8">
      <motion.section initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} className="rounded-[2rem] border border-dashed border-violet-400 bg-white p-6 shadow-sm dark:bg-slate-900" onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); addFiles(e.dataTransfer.files); }}>
        <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-violet-500/15 to-cyan-500/10 p-10 text-center"><UploadCloud className="mb-3 text-violet-500" size={44}/><h3 className="text-2xl font-black">Drop videos or images here</h3><p className="mt-2 max-w-xl text-sm text-slate-500">Supports MP4, MOV, WEBM, JPG, PNG, WEBP, and SVG with 10MB image and 100MB video validation.</p><button onClick={() => inputRef.current?.click()} className="mt-5 rounded-full bg-violet-600 px-6 py-3 font-bold text-white"><Plus className="mr-2 inline"/> Choose files</button><input ref={inputRef} hidden multiple type="file" accept=".mp4,.mov,.webm,.jpg,.png,.webp,.svg" onChange={(e) => addFiles(e.target.files)} /></div>
        {progress > 0 && <div className="mt-5"><div className="mb-2 flex justify-between text-sm"><span>Uploading...</span><span>{progress}%</span></div><div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800"><div style={{width:`${progress}%`}} className="h-full bg-violet-600 transition-all" /></div></div>}
      </motion.section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm dark:bg-slate-900"><h3 className="mb-4 text-xl font-black">Blog Editor</h3><input value={title} onChange={(e) => setTitle(e.target.value)} className="mb-3 w-full rounded-2xl border bg-transparent p-3 dark:border-slate-700"/><p className="mb-3 text-xs text-slate-500">Slug: /posts/{slugify(title) || 'untitled'}</p><textarea value={body} onChange={(e) => setBody(e.target.value)} className="h-40 w-full rounded-2xl border bg-transparent p-3 dark:border-slate-700"/><div className="mt-4 flex flex-wrap gap-2"><button onClick={() => savePost('Draft')} className="rounded-full border px-4 py-2 dark:border-slate-700">Save Draft</button><button onClick={() => notify('Preview generated below in the feed.')} className="rounded-full border px-4 py-2 dark:border-slate-700"><Eye className="mr-1 inline"/>Preview</button><button onClick={() => savePost('Published')} className="rounded-full bg-emerald-500 px-4 py-2 font-bold text-white">Publish Instantly</button></div></section>
    </div>

    <div className="grid gap-6 px-4 pb-10 lg:grid-cols-[1.35fr_.9fr] lg:px-8">
      <section><div className="mb-4 flex items-center justify-between"><h3 className="text-2xl font-black">Media Gallery</h3><span className="rounded-full bg-slate-200 px-3 py-1 text-sm dark:bg-slate-800">{media.length} assets</span></div><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">{media.map((item) => <motion.article layout key={item.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm dark:bg-slate-900"><button onClick={() => setActiveMedia(item)} className="block aspect-video w-full bg-slate-200 dark:bg-slate-800">{item.kind === 'image' ? <img src={item.url} alt={item.name} className="h-full w-full object-cover"/> : <video src={item.url} className="h-full w-full object-cover" muted/>}</button><div className="p-4"><div className="flex items-center gap-2 font-bold">{item.kind === 'image' ? <ImageIcon size={18}/> : <Video size={18}/>}<span className="truncate">{item.name}</span></div><p className="text-sm text-slate-500">{formatBytes(item.size)} · {item.uploadedAt}</p><div className="mt-4 flex gap-2"><button onClick={() => setShare(item.url)} className="rounded-full border p-2 dark:border-slate-700"><Share2 size={17}/></button><a download={item.name} href={item.url} onClick={() => notify('Download started.')} className="rounded-full border p-2 dark:border-slate-700"><Download size={17}/></a>{item.kind === 'image' && <button onClick={() => setDeleteTarget(item)} className="rounded-full border p-2 text-rose-500 dark:border-slate-700"><Trash2 size={17}/></button>}</div></div></motion.article>)}</div></section>

      <section><div className="mb-4 flex gap-2"><div className="relative flex-1"><Search className="absolute left-3 top-3 text-slate-400" size={18}/><input value={query} onChange={(e)=>setQuery(e.target.value)} placeholder="Search posts" className="w-full rounded-full border bg-white py-3 pl-10 pr-4 dark:border-slate-700 dark:bg-slate-900"/></div>{['All','Product'].map((cat)=><button key={cat} onClick={()=>setCategory(cat)} className="rounded-full border px-4 dark:border-slate-700">{cat}</button>)}</div><div className="space-y-4">{filteredPosts.map((post)=><article key={post.id} className="rounded-[1.5rem] bg-white p-5 shadow-sm dark:bg-slate-900"><img src={post.cover} alt="" className="mb-4 h-36 w-full rounded-2xl object-cover"/><div className="flex items-center justify-between text-xs text-slate-500"><span>{post.author} · {post.readTime}</span><span>{post.status}</span></div><h3 className="mt-2 text-2xl font-black">{post.title}</h3><p className="mt-2 text-slate-500">{post.body}</p><div className="mt-4 flex flex-wrap gap-2">{post.tags.map(tag=><span key={tag} className="rounded-full bg-violet-100 px-3 py-1 text-xs text-violet-700 dark:bg-violet-950 dark:text-violet-200">#{tag}</span>)}</div><div className="mt-5 flex gap-2"><button onClick={()=>setShare(`/posts/${post.slug}`)} className="rounded-full border px-3 py-2 dark:border-slate-700"><Share2 className="inline" size={16}/> Share</button><button onClick={()=>notify('PDF export queued.')} className="rounded-full border px-3 py-2 dark:border-slate-700"><FileText className="inline" size={16}/> Download PDF</button></div></article>)}</div></section>
    </div></section>

    <AnimatePresence>{toast && <motion.div initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} exit={{opacity:0,y:40}} className="fixed bottom-5 right-5 z-50 rounded-2xl bg-slate-950 px-5 py-3 text-white shadow-2xl dark:bg-white dark:text-slate-950"><Check className="mr-2 inline text-emerald-500"/>{toast}</motion.div>}</AnimatePresence>
    {activeMedia && <div className="fixed inset-0 z-40 grid place-items-center bg-black/80 p-4"><button onClick={()=>setActiveMedia(null)} className="absolute right-5 top-5 text-white"><X/></button><div className="w-full max-w-5xl">{activeMedia.kind === 'video' ? <video src={activeMedia.url} controls autoPlay className="w-full rounded-3xl"/> : <img src={activeMedia.url} alt={activeMedia.name} className="max-h-[82vh] w-full rounded-3xl object-contain"/>}<div className="mt-3 flex justify-center gap-5 text-white"><Play/><Pause/><Volume2/><span>Zoom · Previous · Next · Fullscreen</span></div></div></div>}
    {share && <div className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4"><div className="w-full max-w-md rounded-3xl bg-white p-6 dark:bg-slate-900"><button onClick={()=>setShare(null)} className="float-right"><X/></button><h3 className="text-2xl font-black">Share asset</h3><p className="my-3 break-all rounded-2xl bg-slate-100 p-3 text-sm dark:bg-slate-800">{share}</p><div className="flex gap-2"><button onClick={()=>{navigator.clipboard.writeText(share); notify('Link copied.')}} className="rounded-full bg-violet-600 px-4 py-2 text-white"><Copy className="inline"/> Copy</button><button className="rounded-full border p-2 dark:border-slate-700">𝕏</button><button className="rounded-full border p-2 dark:border-slate-700"><Linkedin/></button><button className="rounded-full border p-2 dark:border-slate-700"><Facebook/></button><button className="rounded-full border px-3 dark:border-slate-700">Embed</button></div></div></div>}
    {deleteTarget && <div className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4"><div className="max-w-sm rounded-3xl bg-white p-6 dark:bg-slate-900"><h3 className="text-xl font-black">Delete image?</h3><p className="my-3 text-slate-500">Are you sure you want to delete this image? This uses optimistic UI removal.</p><button onClick={()=>{setMedia(items=>items.filter(i=>i.id!==deleteTarget.id)); setDeleteTarget(null); notify('Image deleted.')}} className="mr-2 rounded-full bg-rose-500 px-4 py-2 text-white">Delete</button><button onClick={()=>setDeleteTarget(null)} className="rounded-full border px-4 py-2 dark:border-slate-700">Cancel</button></div></div>}
  </div></main>;
}
