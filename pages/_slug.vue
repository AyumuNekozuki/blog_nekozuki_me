<template>
  <div class="flexWrapper">
    <main class="article">
      <article class="card contentcard">
        <div v-if="article_data.thumbnail" class="thumbnail">
          <img :src="article_data.thumbnail.url" alt="" srcset="" />
        </div>
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
              <nuxt-link class="category" :to="'/category/' + article_data.category.id">{{
                article_data.category.category_name
              }}</nuxt-link>
              <div class="tags">
                <nuxt-link
                  :to="'/tag/' + tag.id"
                  v-for="tag in article_data.tag"
                  :key="tag.length"
                  >{{ tag.tag }}</nuxt-link
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
        <div class="share addtoany">
          <!-- AddToAny BEGIN -->
          <div class="a2a_kit a2a_kit_size_32 a2a_default_style">
            <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
            <a class="a2a_button_twitter"></a>
            <a class="a2a_button_facebook"></a>
            <a class="a2a_button_line"></a>
            <a class="a2a_button_hatena"></a>
            <a class="a2a_button_mastodon"></a>
          </div>
          <script>
            var a2a_config = a2a_config || {};
            a2a_config.locale = "ja";
          </script>
          <script async src="https://static.addtoany.com/menu/page.js"></script>
          <!-- AddToAny END -->
        </div>
      </article>
      <div class="links_wrapper">
        <nuxt-link class="card slim next" v-if="next" :to="'/'+next.id" rel="next">
          {{ next.title }}
        </nuxt-link>
        <nuxt-link class="card slim prev" v-if="prev" :to="'/'+prev.id" rel="prev">
          {{ prev.title }}
        </nuxt-link>
      </div>
      <!-- <div class="comment_wrapper">
        <div class="comments">
          <Disqus />
        </div>
      </div> -->
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
let metas = [];

import Meta from "~/mixins/meta";

export default {
  async asyncData({ $microcms, params, error }) {
    try{
      let article_data = await $microcms.get({
        endpoint: `article/${params.slug}`,
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