import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

// AI answer engines are named explicitly so the intent is on record: this
// practice wants to be read and cited by assistants as well as search.
const aiCrawlers = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-SearchBot',
  'Claude-User',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'Applebot-Extended',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: aiCrawlers, allow: '/' },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
