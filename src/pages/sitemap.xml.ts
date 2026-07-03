import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const BASE = 'https://familukis.com';

const STATIC_PAGES = [
  { url: '/',                         priority: '1.0', changefreq: 'weekly'  },
  { url: '/blog/',                    priority: '0.9', changefreq: 'daily'   },
  { url: '/categoria/magic-world/',   priority: '0.8', changefreq: 'weekly'  },
  { url: '/categoria/para-ninos/',    priority: '0.7', changefreq: 'weekly'  },
  { url: '/categoria/retos-challenges/', priority: '0.7', changefreq: 'weekly' },
  { url: '/categoria/halloween/',     priority: '0.6', changefreq: 'monthly' },
  { url: '/categoria/camping-naturaleza/', priority: '0.6', changefreq: 'monthly' },
  { url: '/categoria/vacaciones-familia/', priority: '0.6', changefreq: 'monthly' },
  { url: '/categoria/parques-atracciones/', priority: '0.6', changefreq: 'monthly' },
  { url: '/categoria/parques-acuaticos/',   priority: '0.6', changefreq: 'monthly' },
  { url: '/categoria/playas-costa/',        priority: '0.6', changefreq: 'monthly' },
  { url: '/categoria/navidad-regalos/',     priority: '0.5', changefreq: 'monthly' },
  { url: '/categoria/vlogs-familia/',       priority: '0.5', changefreq: 'monthly' },
  { url: '/ranking-canales/',               priority: '0.5', changefreq: 'monthly' },
];

function xmlEscape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export const GET: APIRoute = async () => {
  const today = new Date().toISOString().split('T')[0];
  const articles = await getCollection('articles');
  const videos = (await getCollection('videos')).filter(v => !v.data.hidden);

  const items: { loc: string; lastmod: string; priority: string; changefreq: string }[] = [];

  for (const p of STATIC_PAGES) {
    items.push({ loc: `${BASE}${p.url}`, lastmod: today, priority: p.priority, changefreq: p.changefreq });
  }

  for (const a of articles) {
    const lastmod = a.data.lastModified ?? a.data.date;
    items.push({
      loc: xmlEscape(`${BASE}/blog/${a.id}/`),
      lastmod,
      priority: a.data.featured ? '0.8' : '0.6',
      changefreq: 'monthly',
    });
  }

  for (const v of videos) {
    const lastmod = v.data.publishedAt?.split('T')[0] ?? today;
    items.push({
      loc: xmlEscape(`${BASE}/videos/${v.id}/`),
      lastmod,
      priority: v.data.featured ? '0.7' : '0.5',
      changefreq: 'monthly',
    });
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${items.map(i => `  <url>
    <loc>${i.loc}</loc>
    <lastmod>${i.lastmod}</lastmod>
    <changefreq>${i.changefreq}</changefreq>
    <priority>${i.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
