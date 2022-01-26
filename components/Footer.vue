<template>
  <footer class="commonFooter">
    <div class="container">
      <div class="level">
        <div class="level-start">
          <a class="footer-logo is-block mb-2" href="/">
            <img
              class="logo-img"
              src="@/assets/img/logo-dark.png"
              alt="ねころぐ"
              height="28"
            />
          </a>
          <p class="size-small">
            © 2018 - 2022 AyumuNekozuki
          </p>
        </div>
        <div class="level-end">
          <div class="field has-addons">
            <p class="control">
              <a
                class="button is-transparent is-large"
                rel="noopener"
                href="#__nuxt"
              >
                <font-awesome-icon :icon="['fas', 'chevron-up']" />
              </a>
              <a
                class="button is-transparent is-large"
                target="_blank"
                rel="noopener"
                title="Pullreq &amp; issue is Here"
                href="https://github.com/AyumuNekozuki/blog_nekozuki_me"
              >
                <font-awesome-icon :icon="['fab', 'github']" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
