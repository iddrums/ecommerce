<template>
  <v-container fluid d-flex justify-center>
    <v-row justify-center class="d-flex">
      <v-col style="margin: 0 auto;" cols="12" sm="8" md="6">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Create Product Form</v-toolbar-title>
          </v-toolbar>
          <v-form class="px-4" ref="form" v-model="valid">
            <v-text-field
              v-model="title"
              :counter="15"
              prepend-icon
              :rules="titleRules"
              name="title"
              label="Title"
              id="title"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="description"
              :counter="100"
              prepend-icon
              :rules="descriptionRules"
              name="description"
              label="Description"
              id="description"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="price"
              :counter="15"
              prepend-icon
              :rules="priceRules"
              name="price"
              label="Price"
              id="integer"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="image"
              :counter="200"
              prepend-icon
              :rules="imageRules"
              name="image"
              label="Image"
              id=""
              type="text"
            ></v-text-field>
          </v-form>
          <v-checkbox
            label="Tick if completed"
            color="indigo"
            value="indigo"
            hide-details
          ></v-checkbox>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="submit" color="primary" dark>Submit</v-btn>
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
      title: '',
      titleRules: [
        v => !!v || 'Title is required',
        v => (v && v.length <= 15) || 'Title must have less than 15 characters'
      ],
      description: '',
      descriptionRules: [
        v => !!v || 'Description is required',
        v => (v && v.length <= 100) || 'Description must have less than 100 characters'
      ],
      price: '',
      priceRules: [
        v => !!v || 'Price must be integer',
        v => v >= 10 || 'Loan should be above ₦10',
        v => v <= 50000 || 'Max should not be above ₦50,000'
      ],
      image: '',
      imageRules: [
        v => !!v || 'Image is required',
        v => (v && v.length <= 200) || 'Image must have less than 200 characters'
      ]
    }
  },
  methods: {
    submit () {
      this.$refs.form.validate()
      const formData = {
        title: this.title,
        description: this.description,
        price: this.price,
        image: this.image
      }
      this.$store.dispatch('addProduct', formData)
    }
  }
}
</script>

<style scoped>
.register-form {
  width: 400px;
  margin: 30px auto;
  border: 1px solid #eee;
  padding: 20px;
  box-shadow: 0 2px 3px #ccc;
}

.input {
  margin: 10px auto;
}

.input label {
  display: block;
  color: #4e4e4e;
  margin-bottom: 6px;
}

.input.inline label {
  display: inline;
}

.input input {
  font: inherit;
  width: 100%;
  padding: 6px 12px;
  box-sizing: border-box;
  border: 1px solid #ccc;
}

.input.inline input {
  width: auto;
}

.input input:focus {
  outline: none;
  border: 1px solid blue;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit button {
  border: 1px solid blue;
  color: blue;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: blue;
  color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
  border: 1px solid #ccc;
  background-color: transparent;
  color: #ccc;
  cursor: not-allowed;
}
</style>
