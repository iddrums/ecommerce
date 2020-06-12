<template>
  <header>
    <v-app-bar color="primary" dark>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      >
      </v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" exact>Mapsie Store</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <nav class="hidden-sm-and-down">
        <router-link
          v-for="(link, index) in filteredLinks"
          :key="index"
          :to="link.to"
          >{{ link.title }}</router-link
        >
        <a v-if="auth" @click="logout">Logout</a>
      </nav>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>John Leider</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item link v-for="(link, index) in filteredLinks" :key="index">
          <v-list-item-content>
            <v-list-item-title>
              <router-link :to="link.to">{{ link.title }}</router-link>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item link v-if="auth">
          <v-list-item-content>
            <v-list-item-title>
              <a @click="logout">Logout</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </header>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      links: [
        {
          title: 'Register',
          to: '/register',
          auth: false
        },
        {
          title: 'Login',
          to: '/login',
          auth: false
        },
        {
          title: 'Products',
          to: '/products',
          auth: false
        },
        {
          title: 'About',
          to: '/about',
          auth: false
        },
        {
          title: 'Cart',
          to: '/cart',
          auth: ''
        },
        {
          title: 'Dashboard',
          to: '/dashboard',
          auth: true
        }
      ]
    }
  },
  computed: {
    auth () {
      return this.$store.getters.isAuthenticated
    },
    filteredLinks () {
      return this.links.filter(
        link => link.auth === this.auth || link.title === 'Cart'
      )
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style scoped>
header a {
  text-decoration: none;
}

nav a {
  margin: 0 16px;
}

.v-toolbar__title a,
nav a {
  color: white;
}

header a:hover,
header a:active,
header a.router-link-active {
  color: #fa923f;
}
</style>
