import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/jpeg';

export default async function AppleIcon() {
  const file = await readFile(join(process.cwd(), 'public/og-image.jpg'));
  return new Response(file, {
    headers: { 'Content-Type': 'image/jpeg' },
  });
}
