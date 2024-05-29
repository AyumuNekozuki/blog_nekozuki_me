import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const responseData = NextResponse.json(
    {
      version: '2.1',
      software: { name: 'ayumunekozuki_blog', version: '2024.05', homepage: 'https://blog.nekozuki.me' },
      protocols: ['activitypub'],
      services: { inbound: [], outbound: ['atom1.0', 'rss2.0'] },
      openRegistrations: false,
      usage: { users: { total: 1, activeHalfyear: null, activeMonth: null }, localPosts: 0, localComments: 0 },
      metadata: {
        nodeName: 'ねこづきあゆむのブログ',
        nodeDescription: 'ねこづきあゆむのブログです。適当に日々の思いつきを書き連ねています。',
        nodeAdmins: [{ name: 'AyumuNekozuki', email: 'https://prof.nekozuki.me/' }],
        maintainer: { name: 'AyumuNekozuki', email: 'https://prof.nekozuki.me/' },
        langs: [],
        tosUrl: 'https://blog.nekozuki.me/policy',
        privacyPolicyUrl: 'https://blog.nekozuki.me/policy',
        impressumUrl: 'https://prof.nekozuki.me/',
        repositoryUrl: 'https://github.com/AyumuNekozuki/blog_nekozuki_me',
        feedbackUrl: 'https://github.com/AyumuNekozuki/blog_nekozuki_me/issues/new',
        disableRegistration: true,
        // disableLocalTimeline: true,
        // disableGlobalTimeline: true,
        // emailRequiredForSignup: true,
        // enableHcaptcha: false,
        // enableRecaptcha: false,
        // maxNoteTextLength: 3000,
        // enableEmail: true,
        // enableServiceWorker: true,
        proxyAccountName: 'proxy2',
        themeColor: '#ae9c9b',
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    }
  );
  return responseData;
};
