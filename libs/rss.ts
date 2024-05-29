import { Feed } from 'feed';
import client from '@/libs/client';

export const generatedRssFeed = async (type: "rss2" | "atom1" | "json1") => {
  const baseUrl = 'https://blog.nekozuki.me';
  const date = new Date();

  const author = {
    name: 'ねこづきあゆむ',
    email: 'https://prof.nekozuki.me/',
    link: 'https://prof.nekozuki.me/'
  }

  const feed = new Feed({
    title: 'ねこづきあゆむのブログ',
    description: 'ねこづきあゆむのブログです。適当に日々の思いつきを書き連ねています。',
    id: baseUrl,
    link: baseUrl,
    language: 'ja',
    image: `${baseUrl}/favicon.png`,
    copyright: `© 2018 - ${date.getFullYear()} AyumuNekozuki`,
    updated: date,
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: author
  });

  const articleData = await client.get({
    endpoint: 'article',
    queries: {
      limit: 10,
      orders: '-publishedAt',
    },
  });

  if (articleData.contents.length === 0) return;

  articleData.contents.map((article: any) => {
    const url = `${baseUrl}/${article.id}`;
    let bodyText = "";
    let articleText = ""
    article.body.map((bodyitem: any) => {
      if(bodyitem.fieldId === "oldRicheditor") bodyText += bodyitem.editor.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, "");

      if(bodyitem.fieldId === "oldRicheditor") articleText += bodyitem.editor;
      if(bodyitem.fieldId === "codeblock-editor") articleText += `<pre><code class='hljs'>${bodyitem.editor}</code></pre>`;
    });

    feed.addItem({
      title: article.title,
      description: `${bodyText.substring(0, 60)}…`,
      id: url,
      link: url,
      content: articleText,
      date: new Date(article.publishedAt),
    })
  });



  return feed[type]();
}