import { MetadataRoute } from 'next';
import { headers } from 'next/headers';

export default async function robots(): Promise<MetadataRoute.Robots> {
  const headersList = await headers();
  const host = headersList.get('host') ?? 'unama.com.br';
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const baseUrl = `${protocol}://${host}`;

  const isProduction = process.env.NODE_ENV === 'production';

  // 🔴 Bloqueia tudo fora de produção
  if (!isProduction) {
    return {
      rules: [
        {
          userAgent: '*',
          disallow: '/',
        },
      ],
    };
  }

  // 🟢 Produção — SEO liberado
  return {
    rules: [
      {
        userAgent: '*',
        disallow: ['/api/', '/_next/', '/admin/', '/*.json', '/*preview'],
      },
      {
        userAgent: 'GPTBot',
        disallow: '/',
      },
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
