<template>
  <div class="flexWrapper">
    <main>
      <div class="__index __pages">
        <h1 class="h3 mb-3">過去記事一覧</h1>
        <nuxt-link
          class="articlecard slim"
          v-for="content in archive_datas"
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
        <a class="articlecard slim ads">
          <adsbygoogle ad-slot="6548340369" />
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
    let [archive_datas, newest_datas] = await Promise.all([
      $axios.$get("/api_mc_nekolog/v1/article?limit=500&orders=-revisedAt"),
      $axios.$get("/api_mc_nekolog/v1/article?limit=5&orders=-revisedAt"),
    ]);

    return {
      archive_datas: archive_datas.contents,
      newest_articles: newest_datas.contents,
    };
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: "Archive",
        type: "pages",
        url: "https://blog.nekozuki.me/archive",
      },
    };
  },
};
</script>