<template>
  <div id="welcome">
    <h1>
      Time to upgrade your fashion mindset and help you stay relevent anywhere
      in the world
    </h1>
    <p>
      You found the best place to increase your fashion outfit and makes you
      comfortable with anything you decide to wear!
    </p>
    <div class="cta">
      <router-link v-if="!auth" to="/register">Register</router-link>
      <router-link v-if="!auth" to="/login">Login</router-link>
      <router-link to="/products">
        <strong>View All Products</strong>
      </router-link>
    </div>
    <v-carousel cycle height="500" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item v-for="(item, i) in items" :key="i">
        <v-sheet :item="items[i]" height="100%" width="100%">
          <v-row class="fill-height" align="center" justify="center">
            <div class="display-3">
              <img :src="item.src" style="width:1000px; height:500px;" />
            </div>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel>
    <div>
        <h3 class="text-center mt-6">Latest Products</h3>
        <v-row>
           <v-col xs="12" sm="6" md="4" v-for="card in allProducts.slice(-3)" :key="card.title">
           <router-link :to="`/product/${card.id}`">
                <v-img
                  :src="card.image"
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="200px"
                ></v-img>
                 <v-card-title primary-title class="justify-center" v-text="card.title"></v-card-title>
                 </router-link>
           </v-col>
        </v-row>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      products: [],
      items: [
        {
          src: 'img/icons/e6.jpeg'
        },
        {
          src: 'img/icons/e5.jpeg'
        },
        {
          src: 'img/icons/e4.jpeg'
        },
        {
          src: 'img/icons/e3.jpeg'
        },
        {
          src: 'img/icons/e2.jpeg'
        },
        {
          src: 'img/icons/e1.jpeg'
        }
      ]
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
  }
}
</script>

<style scoped>
#welcome {
  width: 80%;
  margin: auto;
  padding-bottom: 100px;
}

h1 {
  text-align: center;
}

p {
  text-align: center;
}

.cta {
  width: 300px;
  margin: auto;
  text-align: center;
}

.cta a {
  margin: 10px;
  text-decoration: none;
  display: inline-block;
  border: 1px solid blue;
  border-radius: 3px;
  width: 100px;
  padding: 10px;
  box-sizing: border-box;
  color: blue;
}

.cta a:hover,
.cta a:active {
  background-color: blue;
  color: white;
}
</style>
