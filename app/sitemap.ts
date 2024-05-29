import { MetadataRoute } from "next";
import client from '@/libs/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://blog.nekozuki.me";

    let sitemapData = [
      {
        url: `${baseUrl}/`,
        lastModified: new Date(),
        priority: 1,
      },
      {
        url: `${baseUrl}/archive`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/tag`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/category`,
        lastModified: new Date(),
      },
    ]

    const [articleData, tagData, categoryData] = await Promise.all([
      client.get({ endpoint: 'article', queries: { limit: 500, orders: '-publishedAt' } }),
      client.get({ endpoint: 'tag', queries: { limit: 500, orders: '-publishedAt' } }),
      client.get({ endpoint: 'category', queries: { limit: 500, orders: '-publishedAt' } }),
    ]);

    if(articleData.contents.length !== 0) {
      articleData.contents.map((article: any) => {
        const url = `${baseUrl}/${article.id}`;
        sitemapData.push({
          url: url,
          lastModified: new Date(article.publishedAt),
          priority: 1,
        })
      });
    }

    if(tagData.contents.length !== 0) {
      tagData.contents.map((tag: any) => {
        const url = `${baseUrl}/tag/${tag.id}`;
        sitemapData.push({
          url: url,
          lastModified: new Date(),
          priority: 0.5,
        })
      });
    }

    if(categoryData.contents.length !== 0) {
      categoryData.contents.map((category: any) => {
        const url = `${baseUrl}/category/${category.id}`;
        sitemapData.push({
          url: url,
          lastModified: new Date(),
          priority: 0.5,
        })
      });
    }

  return sitemapData
}