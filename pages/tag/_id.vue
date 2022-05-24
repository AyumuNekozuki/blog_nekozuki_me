<template>
  <div class="flexWrapper">
    <main>
      <div class="__index __pages">
        <h1 class="h3 mb-3">タグ「{{ param_name }}」記事一覧</h1>
        <nuxt-link
          class="articlecard slim"
          v-for="content in tag_archive_datas"
          :key="content.id"
          :to="`/${content.id}`"
        >
          <div v-if="content.thumbnail" class="thumbnail_area">
            <img :src="content.thumbnail.url" alt="" srcset="" />
          </div>
          <div class="content_area">
            <div class="context">
              <span class="published">
                <time
                  v-if="content.published_At"
                  :datatime="content.published_At"
                  v-text="
                    $dateFns.format(new Date(content.published_At), 'yyyy/MM/dd')
                  "
                />
              </span>
              <span class="revised">
              <time
                v-if="content.revisedAt"
                :datatime="content.revisedAt"
                v-text="
                  $dateFns.format(new Date(content.revisedAt), 'yyyy/MM/dd HH:mm')
                "
              />
              </span>
            </div>
            <h2 class="article_title">{{ content.title }}</h2>
          </div>
        </nuxt-link>
        <nuxt-link to="/tag" class="articlecard slim" v-if="!tag_archive_datas.length">
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
    let [tag_archive_datas, tag_datas, newest_datas] = await Promise.all([
      $axios.$get(`/api_mc_nekolog/v1/article?filters=tag%5Bcontains%5D${params.id}&limit=250&orders=-published_At`),
      $axios.$get(`/api_mc_nekolog/v1/tag?filters=id%5Bequals%5D${params.id}&limit=50&orders=-published_At`),
      $axios.$get("/api_mc_nekolog/v1/article?limit=5&orders=-published_At"),
    ]);

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