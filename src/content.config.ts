import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const CATEGORIAS = [
  'magic-world',
  'parques-atracciones',
  'parques-acuaticos',
  'camping-naturaleza',
  'senderismo-cascadas',
  'montana-pirineos',
  'playas-costa',
  'vacaciones-familia',
  'actividades-casa',
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
  }),
});

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    categoria: z.enum(CATEGORIAS),
    tags: z.array(z.string()).default([]),
    relatedVideoId: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { videos, articles };

export const CATEGORIA_LABELS: Record<typeof CATEGORIAS[number], string> = {
  'magic-world': 'Magic World Resort',
  'parques-atracciones': 'Parques de Atracciones',
  'parques-acuaticos': 'Parques Acuáticos',
  'camping-naturaleza': 'Camping y Naturaleza',
  'senderismo-cascadas': 'Senderismo y Cascadas',
  'montana-pirineos': 'Montaña y Pirineos',
  'playas-costa': 'Playas y Costa',
  'vacaciones-familia': 'Vacaciones en Familia',
  'actividades-casa': 'Actividades en Casa',
};
