<template>
  <div class="flexWrapper">
    <main class="article">
      <article class="card contentcard">
        <div v-if="data.thumbnail" class="thumbnail">
          <img :src="data.thumbnail.url" alt="" srcset="" />
        </div>
        <div class="content">
          <div class="meta">
            <h1 class="title">{{ data.title }}</h1>
            <div class="meta_wrap">
              <time
                class="publishedAt"
                v-if="data.publishedAt"
                :datatime="data.publishedAt"
                v-text="
                  $dateFns.format(new Date(data.publishedAt), 'yyyy/MM/dd')
                "
              />
              <!-- <a class="category" :href="'/category/' + data.category.id">{{
                data.category.category_name
              }}</a>
              <div class="tags">
                <a
                  :href="'/tag/' + tag.id"
                  v-for="tag in data.tag"
                  :key="tag.length"
                  >{{ tag.tag }}</a
                >
              </div> -->
            </div>
          </div>
          <div class="content_body" v-if="data.body" v-html="data.body"></div>
          <div class="content_body" v-if="!data.body">
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
        <script>
          hljs.highlightAll();
        </script>
        <script src="https://img.finalfantasyxiv.com/lds/pc/global/js/eorzeadb/loader.js?v2"></script>
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
          <div class="faild_getdata">
            <p>データの取得に失敗しました</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, query, error }) {
    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }

    let data = await $axios
      .$get(`/api_mc_nekolog/v1/article/${query.id}?draftKey=${query.draftKey}`)
      .catch((error) => {
        this.$nuxt.error({
          statusCode: 404,
          message: error,
        });
      });

    if (data.body) {
      var export_body = "";
      data.body.forEach((bodys) => {
        export_body = export_body + bodys.editor;
      });
      data.body = export_body;
    }

    return {
      data,
    };
  },
  data() {
    return { data: {} };
  },
};
</script>