<template>
  <v-footer class="zeal"
    dark
    padless
  >
    <v-card
      class="flex"
      flat
      tile
      color="primary" dark
    >

      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} —
      <strong>Designed by iddrumz</strong>
        <v-spacer></v-spacer>

       <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-4"
          dark
          icon
        >
          <v-icon size="24px">{{ icon }}</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-twitter',
      'mdi-linkedin',
      'mdi-instagram',
      'mdi-telegram',
      'mdi-wechat',
      'mdi-snapchat',
      'mdi-whatsapp'
    ]
  })
}
</script>

<style scoped>
 .zeal {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
