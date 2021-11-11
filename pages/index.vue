<template>
  <div class="flexWrapper">
    <main>
      <div class="__index">
        <nuxt-link
          class="articlecard"
          v-for="content in query_articles"
          :key="content.id"
          :to="`/${content.id}`"
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
        </nuxt-link>
        <div class="links_wrapper">
        <nuxt-link class="card slim more" to="/archive" rel="more">
          もっと見る
        </nuxt-link>
      </div>
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
            <nuxt-link
              :to="`/${content.id}`"
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
            </nuxt-link>
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
export default {
  mixins: [Meta],
  head() {
    return {
      titleTemplate: null,
      title: "ねころぐ",
    };
  },
  async asyncData({ $microcms }) {
    let query_datas = await $microcms.get({
      endpoint: "article",
      orders: "publishedAt",
      queries: { limit: 10 },
    });

    //widget_articles
    let newest_datas = await $microcms.get({
      endpoint: "article",
      orders: "publishedAt",
      queries: { limit: 5 },
    });

    return {
      query_articles: query_datas.contents,
      newest_articles: newest_datas.contents,
    };
  },
};
</script>