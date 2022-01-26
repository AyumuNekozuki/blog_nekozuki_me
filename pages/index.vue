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
        <a class="articlecard ads" style="padding: 1.5rem;">
          <adsbygoogle ad-slot="1487585374" />
        </a>
      </div>
      </div>
    </main>

    <Sidebar :newest_articles="newest_articles" />
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
  async asyncData({ $axios }) {
    let [query_datas, newest_datas] = await Promise.all([
      $axios.$get("/api_mc_nekolog/v1/article?limit=10&orders=-publishedAt"),
      $axios.$get("/api_mc_nekolog/v1/article?limit=5&orders=-publishedAt"),
    ]);

    return {
      query_articles: query_datas.contents,
      newest_articles: newest_datas.contents,
    };
  },
};
</script>