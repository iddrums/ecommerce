<template>
<div class="strong">
  <v-card class="mx-auto my-12">
    <v-toolbar color="primary" dark>
      <v-toolbar-title>Products In Stock</v-toolbar-title>
    </v-toolbar>
     <div class="text-center mt-2">
        <v-btn icon color="deep-orange">
          <v-icon>mdi-thumb-up</v-icon>
        </v-btn>
        <v-btn v-if="auth" to="/productform" color="primary" dark
          >Add a New Product</v-btn
        >
      </div>
    <v-container fluid>
      <v-row dense>
        <v-dialog v-model="open" width="500">
                  <v-card>
                      <v-card-title
                        class="headline grey lighten-2"
                        primary-title
                      >
                    <p>Added to cart successfully.</p>
                      </v-card-title>
                    <v-divider></v-divider>
                    <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="orange" text @click="open = false">
                      Okay
                    </v-btn>
                    </v-card-actions>
                  </v-card>
        </v-dialog>
          <v-col xs="12" sm="6" md="4" v-for="card in allProducts" :key="card.title">
            <v-card>
              <router-link :to="`/product/${card.id}`">
                <v-img
                  :src="card.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                ></v-img>
              </router-link>
              <v-card-title v-text="card.title"></v-card-title>
              <v-card-subtitle class="pb-0">
                <strong>Unique Product</strong>
              </v-card-subtitle>
              <v-card-text class="text--primary">
                <div>Celebrity wears</div>
                <h3>₦{{ card.price }}</h3>
                <div>Celebrity wears, Events and Seminars</div>
              </v-card-text>
              <v-card-actions>
                <v-btn :to="`/product/${card.id}`" color="orange" text
                  >More Info</v-btn
                >

                <v-btn
                        @click="addToCart(card)"
                        color="orange"
                        text
                      >
                        <v-icon>mdi-cart</v-icon>
                      </v-btn>

              </v-card-actions>
            </v-card>
          </v-col>
      </v-row>
    </v-container>
  </v-card>
</div>
</template>

<script>
export default {
  data () {
    return {
      open: false,
      products: [],
      product: {}
    }
  },
  computed: {
    allProducts () {
      return this.$store.getters.allProducts
    },
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted () {
    this.$store.dispatch('fetchAllProducts')
  },
  methods: {
    addToCart (card) {
      this.$store.dispatch('toCart', card)
      this.open = true
    }
  }
}
</script>

<style scoped>
.strong {
  padding-bottom: 80px;
}
</style>
