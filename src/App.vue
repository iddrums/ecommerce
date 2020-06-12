<template>
  <v-app>
   <v-content>
      <app-header />
      <router-view></router-view>
      <app-footer />
      <!-- Display view pages here based on route -->
    </v-content>
  </v-app>
</template>

<script>
import header from './components/header/header.vue'
import footer from './components/footer/footer.vue'

export default {
  name: 'app',
  components: {
    'app-header': header,
    'app-footer': footer
  },
  created () {
    this.$store.dispatch('tryAutoLogin')
  }
}
</script>

<style scoped>
  body, html {
    margin: 0;
    /* font-family: Arial, Helvetica, sans-serif; */
  }
</style>
