

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const data = `<?xml version="1.0"?><XRD xmlns="http://docs.oasis-open.org/ns/xri/xrd-1.0"><Link rel="lrdd" type="application/xrd+xml" template="https://siren.capslock.dev/.well-known/webfinger?resource={uri}" /></XRD>`;

  return new Response(data, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'max-age=0, s-maxage=3600',
    },
  });
};
