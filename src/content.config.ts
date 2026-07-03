import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORIAS = [
  'magic-world',
  'para-ninos',
  'retos-challenges',
  'navidad-regalos',
  'halloween',
  'parques-atracciones',
  'parques-acuaticos',
  'camping-naturaleza',
  'playas-costa',
  'vacaciones-familia',
  'vlogs-familia',
] as const;

const videos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/videos' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    seoDescription: z.string().optional(),
    videoId: z.string(),
    publishedAt: z.string(),
    categoria: z.enum(CATEGORIAS),
    tags: z.array(z.string()).default([]),
    views: z.number().default(0),
    duracion: z.string().default(''),
    thumbnail: z.string().optional(),
    featured: z.boolean().default(false),
    hidden: z.boolean().default(false),
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    seoTitle: z.string().optional(),
    description: z.string(),
    seoDescription: z.string().optional(),
    date: z.string(),
    categoria: z.enum(CATEGORIAS),
    tags: z.array(z.string()).default([]),
    relatedVideoIds: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    rating: z.number().min(1).max(5).optional(),
    reviewCount: z.number().default(1),
    lastModified: z.string().optional(),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).optional(),
    ogImage: z.string().optional(),
  }),
});

export const collections = { videos, articles };

export const CATEGORIA_LABELS: Record<typeof CATEGORIAS[number], string> = {
  'magic-world':       'Magic World Resort',
  'para-ninos':        'Para niños',
  'retos-challenges':  'Retos y Challenges',
  'navidad-regalos':   'Navidad y Regalos',
  'halloween':         'Halloween',
  'parques-atracciones': 'Parques de Atracciones',
  'parques-acuaticos': 'Parques Acuáticos',
  'camping-naturaleza': 'Camping y Naturaleza',
  'playas-costa':      'Playas y Costa',
  'vacaciones-familia': 'Vacaciones en Familia',
  'vlogs-familia':     'Vlogs de Familia',
};
