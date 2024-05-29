import { NextResponse } from 'next/server';
import { context } from "@/libs/activitypub/context";

export const dynamic = 'force-dynamic';

export const GET = async () => {
  const responseData = NextResponse.json(
    {
      '@context': context,
      type: 'Person',
      id: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
      inbox: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/inbox`,
      outbox: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/outbox`,
      followers: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/followers`,
      following: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki/following`,
      // sharedInbox: `https://${process.env.ACTIVITYPUB_HOST}/inbox`,
      // endpoints: {
      //   sharedInbox: `https://${process.env.ACTIVITYPUB_HOST}/inbox`
      // },
      url: `https://${process.env.ACTIVITYPUB_HOST}`,
      preferredUsername: 'AyumuNekozuki',
      name: 'ねこづきあゆむのブログ',
      summary: '<p><span>ねこづきあゆむのブログです。適当に日々の思いつきを書き連ねています。</p>',
      _misskey_summary: 'ねこづきあゆむのブログです。適当に日々の思いつきを書き連ねています。',
      icon: {
        mediaType: 'image/png',
        type: 'Image',
        url: `https://${process.env.ACTIVITYPUB_HOST}/icon.png`,
      },
      image: {
        mediaType: 'image/png',
        type: 'Image',
        url: "https://misskey-white.s3.amazonaws.com/misskey/cb4ac4a3-e644-4693-84dd-bd047dea5ba7.png",
      },
      manuallyApprovesFollowers: false,
      discoverable: true,
      publicKey: {
        id: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki#main-key`,
        owner: `https://${process.env.ACTIVITYPUB_HOST}/users/AyumuNekozuki`,
        publicKeyPem: process.env.ACTIVITYPUB_PUBLIC_KEY || '',
        type: 'Key',
      },
      "isCat": false,
      "attachment": [
        {
          "type": "PropertyValue",
          "name": "ブログ",
          "value": "<a href=\"https://blog.nekozuki.me\" rel=\"me nofollow noopener\" target=\"_blank\">https://blog.nekozuki.me</a>"
        },
        {
          "type": "PropertyValue",
          "name": "メインアカウント",
          "value": "<a href=\"https://mi.mashiro.site/@AyumuNekozuki\" rel=\"me nofollow noopener\" target=\"_blank\">https://mi.mashiro.site/@AyumuNekozuki</a>"
        }
      ],
      "vcard:bday": "2002-09-03",
      "vcard:Address": "おふとん"
    },
    {
      headers: {
        'Content-Type': 'application/activity+json',
        'Cache-Control': 'max-age=0, s-maxage=3600',
      },
    }
  );
  return responseData;
};
