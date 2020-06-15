<template>
  <div class="pt-5 text-end">
    <v-dialog
      v-model="dialog"
      width="500"
    >
     <template v-slot:activator="{ on }">
    <v-btn
      v-on="on" @click="addToCart" color="orange" text>
        <v-icon size="50">mdi-cart</v-icon>
    </v-btn>
     </template>

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
          <v-btn
            color="orange"
            text
            @click="dialog = false">Okay
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
    <div class="text-center pt-0 d-flex">
      <div class="part-1">
        <h1>{{ singleProduct.title }}</h1>
        <img :src="singleProduct.image" height="350px" width="500px" />
        <h1>₦{{ singleProduct.price }}</h1>
      </div>
      <div class="flex-column pt-10">
        <div class="part-2">
          <h4>{{ singleProduct.description }}</h4>
        </div>
        <div>
               <v-btn v-if="this.userId === singleProduct.ownerId"
                  :to="`/product/${singleProduct.id}/edit`" class="ma-2" color="orange darken-2" dark>
            Edit/Update
          </v-btn>

               <v-btn  v-if="this.userId === singleProduct.ownerId"
                  @click.prevent="deleteProduct(singleProduct.id)" class="ma-2" color="orange darken-2" dark>
          Delete
          </v-btn>

               <v-btn to="/products" class="ma-2" color="orange darken-2" dark>
            <v-icon dark left>mdi-arrow-left</v-icon>Back to products
          </v-btn>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialog: false,
      product: {},
      userId: ''
    }
  },
  computed: {
    singleProduct () {
      return this.$store.getters.singleProduct
    },
    auth () {
      return this.$store.getters.isAuthenticated
    }
  },
  mounted () {
    this.$store.dispatch('getAProduct', this.$route.params.id)
    console.log('details', this.singleProduct)
    this.userId = localStorage.getItem('userId')
  },
  methods: {
    deleteProduct (productId) {
      this.$store.dispatch('deleteProduct', productId)
    },
    addToCart () {
      this.$store.dispatch('toCart', this.singleProduct)
    }
  }
}
</script>

<style scoped>
  .part-1{
    padding: 50px 30px;
  }
  .part-2{
    padding: 50px 30px;
  }
</style>
