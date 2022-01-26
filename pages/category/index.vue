<template>
  <div class="flexWrapper">
    <main>
      <div class="__index __pages">
        <h1 class="h3 mb-3">カテゴリ一覧</h1>
        <a
          class="articlecard slim items"
          v-for="content in category_datas"
          :key="content.id"
          :href="`/category/${content.id}`"
        >
          <div class="content_area">
            <h2 class="article_title">{{ content.category_name }}</h2>
          </div>
        </a>
      </div>
    </main>

     <Sidebar :newest_articles="newest_articles" />
  </div>
</template>

<script>
import Meta from "~/mixins/meta";
export default {
  async asyncData({ $axios }) {
    let [category_datas, newest_datas] = await Promise.all([
      $axios.$get("/api_mc_nekolog/v1/category?limit=100"),
      $axios.$get("/api_mc_nekolog/v1/article?limit=5&orders=-publishedAt"),
    ]);

    return {
      category_datas: category_datas.contents,
      newest_articles: newest_datas.contents,
    };
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "Category",
        type: "pages",
        url: "https://blog.nekozuki.me/category",
      },
    };
  },
};
</script>