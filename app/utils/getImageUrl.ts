export function getImageUrl(imagePath: string | undefined | null): string | undefined {
  if (!imagePath) return undefined;
  if (imagePath.startsWith('http')) return imagePath;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
  return baseUrl.replace(/\/$/, '') + (imagePath.startsWith('/') ? imagePath : '/' + imagePath);
}
