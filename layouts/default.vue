<template>
  <div>
    <Universe />
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
import Universe from '@/components/Universe.vue';
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: 'default',
  components:{
    Universe,
    Header,
    Footer,
  },
}
</script>