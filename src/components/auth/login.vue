<template>
  <v-container fluid d-flex justify-center>
    <v-row justify-center class="d-flex">
      <v-col style="margin: 0 auto;" cols="12" sm="8" md="6">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Login Form</v-toolbar-title>
          </v-toolbar>
          <v-form class="px-4" ref="form" v-model="valid">
            <v-text-field
              v-model="email"
              :counter="15"
              prepend-icon
              :rules="emailRules"
              name="email"
              label="Email"
              required
              id="email"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="password"
               :counter="15"
              prepend-icon
              :rules="passwordRules"
              name="password"
              label="Password"
              required
              id="password"
              type="password"
            ></v-text-field>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="login" color="primary" dark>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      valid: true,
      email: '',
      emailRules: [
        v => !!v || 'Email is required',
        v => /.+@.+\..+/.test(v) || 'Email must be valid'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 15) || 'Password must have less than 15 characters'
      ]
    }
  },
  methods: {
    login () {
      this.$refs.form.validate()
      const formData = {
        email: this.email,
        password: this.password
      }
      this.$store.dispatch('login', {
        email: formData.email,
        password: formData.password
      })
    }
  }
}
</script>
