<template>
  <v-container>
    <v-layout>
      <h1>Home page</h1>
    </v-layout>
    <Login class="mt-3 mb-4" />
  </v-container>
</template>

<script>
import Login from '../components/Login'

export default {
  components: {
    Login
  }
}
</script>
