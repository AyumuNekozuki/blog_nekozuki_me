---
title: 自作Webフォントを導入したお話。（詳細版）
date: 2020-04-23 19:58:55
tags:
- 技術小話
- hexoでブログを立てるシリーズ
- フォント
category:
 - hexoでブログを立てるシリーズ
---
# <i class="icon2-niconico"></i>  <i class="icon2-nicolive"></i>

どうも猫月あゆむです。
<a href="/2020/04/create-newblog-byhexo-2/">ブログ構築2日目の記事</a> で、自作フォントを導入したよ！っていうお話をしたと思います。
ツイッターで質問が来てたのでそれの詳しい解説です。

<!--more-->

## 導入方法
導入方法自体は結構簡単でした。

> 参考：<a href="https://mndangler.net/2017/04/webicon_icomoon_and_font-awesome/">Webアイコン「IcoMoon」の使い方とアイコンの追加方法</a>

まず、フォント化したい画像、アイコンとかを **SVG** 形式で用意します。
画像が用意できたら、<a style="font-weight:bold;" href="https://icomoon.io/app/">icomoon</a> というサイトを利用してフォント化します。

### フォント化方法
ざっとこんな感じ。わからないことあったらコメント欄へGO

1. 右上インポートからSVGを読み込む
2. 入れたいアイコンを選択し、右下「Genelate font」をクリック
3. アイコン名、大きさなどを調整
4. 画面右下ダウンロードの隣の <i class="fas fa-cog"></i> をクリック
5. 項目を以下のように改変

<img src="https://media.discordapp.net/attachments/542501461439938596/702827790570881024/unknown.png">

理由としては、

Class Prefix
　fontawesomeとの競合避けその１

Use i
　hexoで色んな所で使うにはfontawesomeと合わせないと、_config.ymlから編集できない（うまく反映されない）

って感じです。

設定できたらダウンロード。

### hexoへ導入
ここから先は、利用しているテーマによってかなり変わってきます。
当ブログでは「Icarus」を利用しているのを前提に解説します。

まず、DLしたファイルを以下のように配置します。

```
blogdir/
     └ themes/
           └ icarus/
                 └ source/
                       ├ css/
                       ├ img/
                       └ fonts/                     //なければmkdir
                            ├ style.css             //DLファイル
                            ├ selection.json        //DLファイル
                            └ fonts/                //DLファイル
```

次に、**head.jsx** を編集します。
head.jsxは以下の場所に格納されています。

```　
...blogdir/themes/icarus/layout/common/head.jsx
```

そして以下のように書き換えます。



``` diff head.jsx
- <link rel="stylesheet" href={iconcdn()} />

+ <link rel="stylesheet" href="//use.fontawesome.com/releases/v5.13.0/css/all.css" /> 
+ <link rel="stylesheet" href="/fonts/style.css" /> 
```

_config.ymlで指定している fontawesomeを切って、直で読み込ませます。
あと、さっきの自作フォントも読み込ませます。

直で読み込ませてるのは競合対策です。

これで、```<i class="icon2-niconico"></i>``` ってすると <i class="icon2-niconico"></i> 読み込めます。

### おまけ：プロフィールに自作フォントを使う

``` yml themes/icarus/_config.yml
        social_links:
            Github:
                icon: fab fa-github
                url: 'https://github.com/AyumuNekozuki'
            Twitter:
                icon: fab fa-twitter
                url: 'https://twitter.com/nekozuki_2525'
            niconico:
                icon: icon2-niconico
                url: 'https://www.nicovideo.jp/user/45048152'
            RSS:
                icon: fas fa-rss
                url: /atom.xml
```

以上。何か質問あったらコメント欄へどうぞ。

## 最後に一言。
**アウトプットは大事。**