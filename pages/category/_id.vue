<template>
  <div class="flexWrapper">
    <main>
      <div class="__index __pages">
        <h1 class="h3 mb-3">カテゴリ「{{ param_name }}」記事一覧</h1>
        <nuxt-link
          class="articlecard slim"
          v-for="content in category_archive_datas"
          :key="content.id"
          :to="`/${content.id}`"
        >
          <div v-if="content.thumbnail" class="thumbnail_area">
            <img :src="content.thumbnail.url" alt="" srcset="" />
          </div>
          <div class="content_area">
            <div class="context">
              <time
                v-if="content.revisedAt"
                :datatime="content.revisedAt"
                v-text="
                  $dateFns.format(new Date(content.revisedAt), 'yyyy/MM/dd HH:mm')
                "
              />
            </div>
            <h2 class="article_title">{{ content.title }}</h2>
          </div>
        </nuxt-link>
        <nuxt-link to="/category/" class="articlecard slim" v-if="!category_archive_datas.length">
          <div class="content_area">
            <h2 class="article_title">記事が見つかりませんでした</h2>
          </div>
        </nuxt-link>
      </div>
    </main>

     <Sidebar :newest_articles="newest_articles" />
  </div>
</template>

<script>
import Meta from "~/mixins/meta";

let param_name, param_id;

export default {
  async asyncData({ $axios, params }) {
    let [category_archive_datas, category_datas, newest_datas] = await Promise.all([
      $axios.$get(`/api_mc_nekolog/v1/article?filters=category%5Bequals%5D${params.id}&limit=500&orders=-revisedAt`),
      $axios.$get(`/api_mc_nekolog/v1/category?filters=id%5Bequals%5D${params.id}&limit=100&orders=-revisedAt`),
      $axios.$get("/api_mc_nekolog/v1/article?limit=5&orders=-revisedAt"),
    ]);

    param_name = category_datas.contents[0].category_name;
    param_id = params.id;

    return {
      category_archive_datas: category_archive_datas.contents,
      newest_articles: newest_datas.contents,
      param_name,
      param_id
    };
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "カテゴリ「" + param_name + "」記事一覧",
        type: "pages",
        url: "https://blog.nekozuki.me/category/" + param_id,
      },
    };
  },
};
</script>