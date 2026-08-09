const SITE_URL = 'https://saakian-watches.ru';
const API_URL = 'https://saakianwatches-lilexport.amvera.io';

interface WatchesPage {
  items: { id: string }[];
  has_more: boolean;
}

const STATIC_ROUTES = ['/', '/catalog', '/about-us', '/delivery', '/privacy-policy', '/return-policy'];

const fetchAllWatchIds = async (): Promise<string[]> => {
  const ids: string[] = [];
  const limit = 100;
  let offset = 0;

  // Ограничиваем число страниц на случай проблем с API, чтобы не зациклиться
  for (let page = 0; page < 50; page++) {
    let res: WatchesPage;

    try {
      res = await $fetch<WatchesPage>('/watches', {
        baseURL: API_URL,
        query: { offset, limit },
      });
    } catch {
      break;
    }

    ids.push(...res.items.map((item) => item.id));

    if (!res.has_more || !res.items.length) break;
    offset += limit;
  }

  return ids;
};

const xmlEscape = (value: string) => value.replace(/&/g, '&amp;');

export default defineEventHandler(async (event) => {
  const watchIds = await fetchAllWatchIds();

  const urls = [
    ...STATIC_ROUTES.map((path) => `${SITE_URL}${path}`),
    ...watchIds.map((id) => `${SITE_URL}/watch/${id}`),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((url) => `  <url><loc>${xmlEscape(url)}</loc></url>`).join('\n')}
</urlset>`;

  setResponseHeader(event, 'content-type', 'application/xml; charset=UTF-8');

  return body;
});
