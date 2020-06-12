<template>
  <v-container fluid d-flex justify-center>
    <v-row justify-center class="d-flex">
      <v-col style="margin: 0 auto;" cols="12" sm="8" md="6">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-toolbar-title>Edit-Update Product Page</v-toolbar-title>
          </v-toolbar>
          <v-form class="px-4" ref="form" v-model="valid">
            <v-text-field
              v-model="product.title"
               :counter="15"
              prepend-icon
              :rules="titleRules"
              name="title"
              label="Title"
              id="title"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="product.description"
              :counter="100"
              prepend-icon
              :rules="descriptionRules"
              name="description"
              label="Description"
              id="description"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="product.price"
              :counter="15"
              prepend-icon
              :rules="priceRules"
              name="price"
              label="Price"
              id="integer"
              type="text"
            ></v-text-field>
            <v-text-field
              v-model="product.image"
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
            <v-btn @click="update" color="primary" dark>Update</v-btn>
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
      product: {},
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
  computed: {
    singleProduct () {
      return this.$store.getters.singleProduct
    }
  },
  mounted () {
    this.$store.dispatch('getAProduct', this.$route.params.id)
  },
  methods: {
    update () {
      this.$refs.form.validate()
      this.$store.dispatch('editProduct', this.product)
    }
  },
  created () {
    this.product = this.singleProduct
  }
}
</script>

<style scoped>
.edit-update-form {
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
  border: 1px solid #521751;
  background-color: #eee;
}

.input select {
  border: 1px solid #ccc;
  font: inherit;
}

.submit button {
  border: 1px solid #521751;
  color: #521751;
  padding: 10px 20px;
  font: inherit;
  cursor: pointer;
}

.submit button:hover,
.submit button:active {
  background-color: #521751;
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
