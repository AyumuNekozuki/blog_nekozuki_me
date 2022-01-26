<template>
  <div class="flexWrapper">
    <main>
      <div class="__index __pages">
        <h1 class="h3 mb-3">タグ一覧</h1>
        <nuxt-link
          class="articlecard slim items"
          v-for="content in tag_datas"
          :key="content.id"
          :to="`/tag/${content.id}`"
        >
          <div class="content_area">
            <h2 class="article_title">{{ content.tag }}</h2>
          </div>
        </nuxt-link>
      </div>
    </main>

     <Sidebar :newest_articles="newest_articles" />
  </div>
</template>

<script>
import Meta from "~/mixins/meta";
export default {
  async asyncData({ $axios }) {
    let [tag_datas, newest_datas] = await Promise.all([
      $axios.$get("/api_mc_nekolog/v1/tag?limit=500"),
      $axios.$get("/api_mc_nekolog/v1/article?limit=5&orders=-publishedAt"),
    ]);

    return {
      tag_datas: tag_datas.contents,
      newest_articles: newest_datas.contents,
    };
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "Tag",
        type: "pages",
        url: "https://blog.nekozuki.me/tag",
      },
    };
  },
};
</script>