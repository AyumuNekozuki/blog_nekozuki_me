<template>
  <header class="commonHeader">
    <b-navbar toggleable="lg" type="dark" class="commonHeader_wrapper">
      <b-navbar-brand href="/">
        <h1 class="logo"></h1>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/archive">Archive</b-nav-item>
          <b-nav-item href="/category">Category</b-nav-item>
          <b-nav-item href="/tag">Tag</b-nav-item>
          <b-nav-item href="https://nekozuki.me/about">About</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto sphide">
          <b-nav-item target="_blank" href="https://nekozuki.me">
            <font-awesome-icon :icon="['fas', 'globe']" />
          </b-nav-item>
          <b-nav-item target="_blank" href="https://twitter.com/nekozuki_2525">
            <font-awesome-icon :icon="['fab', 'twitter']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://friends.cafe/@nekozuki_2525"
            rel="me"
          >
            <font-awesome-icon :icon="['fab', 'mastodon']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://www.nicovideo.jp/user/45048152/video"
          >
            <i class="icon2-niconico"></i>
          </b-nav-item>
          <b-nav-item target="_blank" href="https://github.com/AyumuNekozuki">
            <font-awesome-icon :icon="['fab', 'github']" />
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </header>
</template>