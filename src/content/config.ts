import { z, defineCollection } from 'astro:content';
const nonsenseCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
    }),
});

const blogpostsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        date: z.date(),
    }),
});

export const collections = {
    'nonsense': nonsenseCollection,
    'blogposts': blogpostsCollection,
}