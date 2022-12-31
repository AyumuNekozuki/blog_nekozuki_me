import * as cheerio from 'cheerio';

export const renderToc = (body) => {
  const $ = cheerio.load(body);
  const headings = $('h1, h2, h3, h4, h5, h6').toArray();
  const toc = headings.map((data) => ({
    text: data.children[0].data,
    id: data.attribs.id,
		name: data.name
  }));

  return toc;
};