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
              <a v-if="article_data.category" class="category" :href="'/category/' + article_data.category.id">{{
                article_data.category.category_name
              }}</a>
              <div class="tags" v-if="article_data.tag">
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
        <a class="card slim next" v-if="next" :href="'/'+next.id" rel="next">
          {{ next.title }}
        </a>
        <a class="card slim prev" v-if="prev" :href="'/'+prev.id" rel="prev">
          {{ prev.title }}
        </a>
      </div>
      <!-- <div class="comment_wrapper">
        <div class="comments">
          <Disqus />
        </div>
      </div> -->
      <a class="articlecard ads" style="padding: 1.5rem;">
        <adsbygoogle ad-slot="1487585374" />
      </a>
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
      <script>
        hljs.highlightAll();
      </script>
    </div>
  </div>
</template>

<script>
let meta_id, meta_title, meta_desc, meta_img;

export default {
  async asyncData({ $microcms, params, error }) {
    try{
      let article_data = await $microcms.get({
        endpoint: `article/${params.slug}`,
        query: {limit: 0}
      }).catch(function (error) {
        this.$nuxt.error({
          statusCode: 404,
          message: error,
        });
      });

      meta_id = params.slug;
      meta_title = article_data.title;
      if (article_data.body) {
        var export_body = "";
        article_data.body.forEach(bodys => {
          export_body = export_body + bodys.editor;
        });
        article_data.body = export_body;


        //meta
        article_data.desc = article_data.body.replace(
          /<("[^"]*"|'[^']*'|[^'">])*>/g,
          ""
        );
        article_data.desc = article_data.desc.substr(0, 29) + "…";
        meta_desc = article_data.desc;
      } else {
        meta_desc = "このページは準備中です";
      }

      if (article_data.thumbnail) {
        meta_img = article_data.thumbnail.url;
      } else {
        meta_img = "https://blog.nekozuki.me/favicon.png";
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
        prev: prevLink,
        next: nextLink,
        meta_id,
        meta_title,
        meta_desc,
        meta_img
      };

    }catch{
      error({ statusCode: 404, message: 'Page not Found' })
    }
  },
  head() {
    return{
      title: this.meta_title,
      meta: [
        { hid: 'description', name: 'description', content: this.meta_desc },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: this.meta_title + " - ねころぐ" },
        { hid: 'og:description', property: 'og:description', content: this.meta_desc },
        { hid: 'og:url', property: 'og:url', content: `https://blog.nekozuki.me/${this.meta_id}` },
        { hid: 'og:image', property: 'og:image', content: this.meta_img },
      ],
    }
  }
};
</script>