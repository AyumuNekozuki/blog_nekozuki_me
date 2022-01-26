<template>
  <div class="flexWrapper">
    <main>
      <div class="__index">
        <a
          class="articlecard"
        >
          <div class="content_area">
            <div class="context">
            </div>
            <h2 class="article_title">404 - Page not found.</h2>
          </div>
        </a>
        <div class="links_wrapper">
        <a class="card slim more" href="/" rel="more">
          TOPにもどる
        </a>
      </div>
      </div>
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
import Meta from "~/mixins/meta";
export default {
  mixins: [Meta],
  head() {
    return {
      title: "Error!",
    };
  },
};
</script>