<template>
  <div class="flexWrapper">
    <main class="article">
      <article class="card contentcard">
        <div class="content">
          <div class="meta">
            <h1 class="title">{{ article_data.title }}</h1>
            <div class="meta_wrap">
              <time
                class="publishedAt"
                v-if="article_data.publishedAt"
                :datatime="article_data.publishedAt"
                v-text="
                  $dateFns.format(
                    new Date(article_data.publishedAt),
                    'yyyy/MM/dd'
                  )
                "
              />
              <a v-if="article_data.category" class="category" :href="'/category/' + article_data.category.id">{{
                article_data.category.category_name
              }}</a>
              <div class="tags">
                <a
                  :href="'/tag/' + tag.id"
                  v-for="tag in article_data.tag"
                  :key="tag.length"
                  >{{ tag.tag }}</a
                >
              </div>
            </div>
          </div>
          <div
            class="content_body"
            v-if="article_data.body"
            v-html="article_data.body"
          ></div>
          <div class="content_body" v-if="!article_data.body">
            <p class="h3 m-3 text-center">
              <span class="badge p-3 badge-danger"
                >データの取得に失敗しました</span
              >
            </p>
          </div>
        </div>
      </article>
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
                <img :src="content.thumbnail.url" alt="" srcset="" />
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
      <div class="card widget ads">
        <adsbygoogle ad-slot="4743939808" />
      </div>
    </div>
  </div>
</template>

<script>
let metas = [];
import Meta from "~/mixins/meta";

export default {
  async asyncData({ $microcms, params, error }) {
    try{
      let article_data = await $microcms.get({
        endpoint: `article/policy`,
      }).catch(function (error) {
        this.$nuxt.error({
          statusCode: 404,
          message: error,
        });
      });

      metas.push(params.slug);
      metas.push(article_data.title);
      if (article_data.body) {
        var export_body = "";
        for (var i = 0; i < article_data.body.length; i++) {
          export_body = export_body + article_data.body[i].editor;
        }
        article_data.body = export_body;

        article_data.desc = article_data.body.replace(
          /<("[^"]*"|'[^']*'|[^'">])*>/g,
          ""
        );
        article_data.desc = article_data.desc.substr(0, 29) + "…";
        metas.push(article_data.desc);
      } else {
        metas.push("このページは準備中です");
      }
      if (article_data.thumbnail) {
        metas.push(article_data.thumbnail.url);
      } else {
        metas.push("https://blog.nekozuki.me/favicon.png");
      }

      //prev, next
      let data_index = await $microcms.get({
        endpoint: "article",
        queries: { limit: 500, fields: "id,title" },
      });

      const index = data_index.contents.findIndex(
        (content) => content.id === params.slug
      );
      const prevLink = data_index.contents[index + 1];
      const nextLink = data_index.contents[index - 1];

      //widget newest_article
      let newest_datas = await $microcms.get({
        endpoint: "article",
        orders: "publishedAt",
        queries: { limit: 5 },
      });

      return {
        article_data,
        newest_articles: newest_datas.contents,
        metas,
        prev: prevLink,
        next: nextLink,
      };

    }catch{
      error({ statusCode: 404, message: 'Page not Found' })
    }
  },
  mixins: [Meta],
  data() {
    return {
      meta: {
        title: metas[1],
        description: metas[2],
        type: "article",
        url: "https://blog.nekozuki.me/" + metas[0],
        image: metas[3],
      },
    };
  },
};
</script>