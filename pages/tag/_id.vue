<template>
  <div class="flexWrapper">
    <main>
      <div class="__index __pages">
        <h1 class="h3 mb-3">タグ「{{ param_name }}」記事一覧</h1>
        <a
          class="articlecard slim"
          v-for="content in tag_archive_datas"
          :key="content.id"
          :href="`/${content.id}`"
        >
          <div v-if="content.thumbnail" class="thumbnail_area">
            <img :src="content.thumbnail.url" alt="" srcset="" />
          </div>
          <div class="content_area">
            <div class="context">
              <time
                v-if="content.publishedAt"
                :datatime="content.publishedAt"
                v-text="
                  $dateFns.format(new Date(content.publishedAt), 'yyyy/MM/dd')
                "
              />
            </div>
            <h2 class="article_title">{{ content.title }}</h2>
          </div>
        </a>
        <a href="/tag/" class="articlecard slim" v-if="!tag_archive_datas.length">
          <div class="content_area">
            <h2 class="article_title">記事が見つかりませんでした</h2>
          </div>
        </a>
      </div>
    </main>

    <div class="sidebar">
      <div class="card widget autor">
        <div>
          <figure>
            <div>
              <img src="@/assets/img/avater.png" alt="" srcset="" />
            </div>
          </figure>
          <p class="name">猫月遥歩（ねこづきあゆむ）</p>
          <p class="desc">
            重度のニコ厨。VOICEROIDコンテンツを中心に、動画投稿・生配信・ツール作成など多彩に活動中。リアルでは専門学生。
          </p>
        </div>
      </div>
      <div class="card widget newest_article">
        <h3>最近の投稿</h3>
        <div>
          <div v-if="newest_articles">
            <a
              :href="`/${content.id}`"
              class="widget_article"
              v-for="content in newest_articles"
              :key="content.id"
            >
              <div class="thumbnail" v-if="content.thumbnail">
                <img :src="content.thumbnail.url" alt="" srcset="">
              </div>
              <div class="context_wrap">
                <p class="time">
                  <time
                    v-if="content.publishedAt"
                    :datatime="content.publishedAt"
                    v-text="
                      $dateFns.format(
                        new Date(content.publishedAt),
                        'yyyy/MM/dd'
                      )
                    "
                  />
                </p>
                <p class="title">{{ content.title }}</p>
              </div>
            </a>
          </div>
          <div class="faild_getdata" v-if="!newest_articles">
            <p>データの取得に失敗しました</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Meta from "~/mixins/meta";

let param_name, param_id;

export default {
  async asyncData({ $microcms, params }) {
      let tag_archive_datas = await $microcms.get({
        endpoint: "article",
        orders: "publishedAt",
        queries: { limit: 500, filters: "tag[contains]" + params.id },
      });

      //タイトル
      let tag_datas = await $microcms.get({
        endpoint: "tag",
        orders: "publishedAt",
        queries: { limit: 50, filters: "id[equals]" + params.id },
      });

      //widget newest_article
      let newest_datas = await $microcms.get({
        endpoint: "article",
        orders: "publishedAt",
        queries: { limit: 5 },
      });

      param_name = tag_datas.contents[0].tag;
      param_id = params.id;

      return {
        tag_archive_datas: tag_archive_datas.contents,
        newest_articles: newest_datas.contents,
        param_name,
        param_id
      };

  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "タグ「" + param_name + "」記事一覧",
        type: "pages",
        url: "https://blog.nekozuki.me/tag/" + param_id,
      },
    };
  },
};
</script>