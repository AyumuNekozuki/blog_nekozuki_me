<template>
  <div class="sidebar">
    <div class="card widget autor">
      <div>
        <figure>
          <div>
            <picture>
              <img src="@/assets/img/avater.png" alt="猫月遥歩（ねこづきあゆむ）" srcset="@/assets/img/avater.png" />
            </picture>
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
              <picture>
                <source :srcset="content.thumbnail.url+'?fm=webp&w=480&h=270'" type="image/webp">
                <img :src="content.thumbnail.url+'?w=480&h=270'" :alt="content.title" :srcset="content.thumbnail.url+'?w=480&h=270'" />
              </picture>
            </div>
            <div class="context_wrap">
              <p class="time">
                <time
                  v-if="content.revisedAt"
                  :datatime="content.revisedAt"
                  v-text="
                    $dateFns.format(new Date(content.revisedAt), 'yyyy/MM/dd HH:mm')
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
    <div class="card widget ads">
      <adsbygoogle ad-slot="4743939808" />
    </div>
    <div class="card widget twitter">
      <h3>Twitter @nekozuki_2525</h3>
      <client-only>
        <Timeline id="nekozuki_2525" sourceType="profile" :options="{ height:'500', chrome: 'noheader nofooter transparent noborders' }"/>
      </client-only>
    </div>
  </div>
</template>

<script>
import { Timeline } from 'vue-tweet-embed';

export default {
  props: {
    newest_articles: Object
  },
  components:{
    Timeline
  },
}
</script>