<template>
  <v-container fluid d-flex justify-center>
    <v-row justify-center class="d-flex">
      <v-col style="margin: 0 auto;" cols="12" sm="8" md="6">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Register Form</v-toolbar-title>
          </v-toolbar>
          <v-form class="px-4" ref="form" v-model="valid">
            <v-text-field
              v-model="firstname"
              :counter="15"
              prepend-icon
              :rules="firstnameRules"
              name="firstname"
              label="Firstname"
              id="firstname"
              type="text">
            </v-text-field>
            <v-text-field
              v-model="surname"
              :counter="15"
              prepend-icon
              :rules="surnameRules"
              name="surname"
              label="Surname"
              id="surname"
              type="text">
            </v-text-field>
            <v-text-field
              v-model="email"
              :counter="15"
              prepend-icon
              :rules="emailRules"
              name="email"
              label="Email"
              id="email"
              type="text">
            </v-text-field>
            <v-text-field
              v-model="password"
              :counter="15"
              prepend-icon
              :rules="passwordRules"
              name="password"
              label="Password"
              id="password"
              type="password">
            </v-text-field>
            <v-text-field
              v-model="confirmPassword"
              :counter="15"
              prepend-icon
              :rules="confirmPasswordRules"
              name="confirmpassword"
              label="ConfirmPassword"
              id="confirm-password"
              type="confirmpassword">
            </v-text-field>
            <v-checkbox
              label="Accept terms and Conditions"
              color="indigo"
              value="indigo"
              hide-details
            ></v-checkbox>
          </v-form>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" color="primary" dark
              >Submit</v-btn
            >
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
      firstname: '',
      firstnameRules: [
        v => !!v || 'Firstname is required',
        v => (v && v.length <= 15) || 'Firstname must have less than 15 characters'
      ],
      surname: '',
      surnameRules: [
        v => !!v || 'Surname is required',
        v => (v && v.length <= 15) || 'Surname must have less than 15 characters'
      ],
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
        v => (v && v.length <= 15) || 'Password must have less than 15 characters'
      ],
      confirmpassword: '',
      confirmPasswordRules: [
        v => !!v || 'ConfirmPassword is required',
        v => (v && v.length <= 15) || 'ConfirmPassword must have less than 15 characters'
      ]
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate()
      const formData = {
        email: this.email,
        firstname: this.firstname,
        surname: this.surname,
        password: this.password,
        confirmPassword: this.confirmPassword
      }
      this.$store.dispatch('register', formData)
    }
  }
}
</script>
