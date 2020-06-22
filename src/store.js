import Vue from 'vue'
import Vuex from 'vuex'
import axios from './axios-auth'
import globalAxios from 'axios'
import router from './router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idToken: null,
    userId: null,
    user: null,
    products: [],
    product: {},
    cartProducts: [],
    cartCount: 0,
    cartTotal: 0
  },
  mutations: {
    authUser (state, userData) {
      state.idToken = userData.token
      state.userId = userData.userId
    },
    storeUser (state, user) {
      state.user = user
    },
    clearAuthData (state) {
      state.idToken = null
      state.userId = null
    },
    storeProduct (state, product) {
      state.products = product
    }
  },
  actions: {
    setLogoutTimer ({ commit }, expirationTime) {
      setTimeout(() => {
        commit('clearAuthData')
      }, expirationTime * 1000)
    },
    register ({ commit, dispatch }, authData) {
      axios.post(':signUp?key=AIzaSyALi8_I0SqoEqX4dLj-snK55yWmq982ROI', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('products')
        })
        .catch(error => console.log(error))
    },
    addProduct ({ commit, dispatch, state }, authData) {
      const userId = localStorage.getItem('userId')
      globalAxios.post('/products.json' + '?auth=' + state.idToken, {
        title: authData.title,
        description: authData.description,
        price: authData.price,
        image: authData.image,
        ownerId: userId
      })
        .then(res => {
          console.log(res)
          router.push('products')
        })
        .catch(error => console.log(error))
    },
    editProduct ({ dispatch, state }, product) {
      globalAxios.patch(`/products/${product.id}.json?auth=${state.idToken}`, product)
        .then(res => {
          router.push('products')
        })
        .catch(error => console.log(error))
    },
    deleteProduct ({ dispatch, state }, productId) {
      globalAxios.delete(`/products/${productId}.json?auth=${state.idToken}`)
        .then(res => {
          alert('product deleted, id' + productId)
          const products = state.products.filter(product => {
            return product.id !== productId
          })
          state.products = products
        })
        .catch(error => console.log(error))
    },
    fetchAllProducts ({ commit, state }) {
      globalAxios.get('/products.json')
        .then(res => {
          const data = res.data
          const products = []
          for (const key in data) {
            const product = data[key]
            product.id = key
            products.push(product)
          }

          state.products = products
          // router.push('product')
        }).catch(error => console.log(error))
    },
    getAProduct ({ dispatch, state }, productId) {
      globalAxios.get(`/products/${productId}.json`)
        .then(res => {
          const singleProduct = { ...res.data, id: productId }
          state.product = singleProduct
        })
        .catch(error => console.log(error))
    },
    login ({ commit, dispatch }, authData) {
      axios.post(':signInWithPassword?key=AIzaSyALi8_I0SqoEqX4dLj-snK55yWmq982ROI', {
        email: authData.email,
        password: authData.password,
        returnSecureToken: true
      })
        .then(res => {
          const now = new Date()
          const expirationDate = new Date(now.getTime() + res.data.expiresIn * 1000)
          localStorage.setItem('token', res.data.idToken)
          localStorage.setItem('userId', res.data.localId)
          localStorage.setItem('expirationDate', expirationDate)
          commit('authUser', {
            token: res.data.idToken,
            userId: res.data.localId
          })
          dispatch('setLogoutTimer', res.data.expiresIn)
          router.push('/')
        })
        .catch(error => console.log(error))
    },
    tryAutoLogin ({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }
      const expirationDate = localStorage.getItem('expirationDate')
      const now = new Date()
      if (now >= expirationDate) {
        return
      }
      const userId = localStorage.getItem('userId')
      commit('authUser', {
        token: token,
        userId: userId
      })
    },
    logout ({ commit }) {
      commit('clearAuthData')
      localStorage.removeItem('expirationDate')
      localStorage.removeItem('token')
      localStorage.removeItem('userId')
      router.replace('/login')
    },
    toCart ({ commit, state }, product) {
      const found = state.cartProducts.find(
        (item) => item.id === product.id
      )

      if (found) {
        found.quantity++
        state.cartTotal += parseInt(product.price)
      } else {
        product.quantity = 1
        state.cartProducts.push(product)
        state.cartTotal += parseInt(product.price)
        state.cartCount++
      }
    },
    removeFromCart ({ commit, state }, product) {
      const index = state.cartProducts.indexOf(product)

      if (index > -1) {
        const item = state.cartProducts[index]
        state.cartCount -= item.quantity
        state.cartTotal -= product.quantity * product.price

        state.cartProducts.splice(index, 1)
      }
    },
    decreaseQuantity ({ commit, state }, product) {
      const addedproduct = state.cartProducts.find(
        (item) => item.id === product.id
      )

      if (addedproduct) {
        addedproduct.quantity--
        state.cartTotal -= parseInt(addedproduct.price)
      }
    },
    fetchUser ({ commit, state }) {
      if (!state.idToken) {
        return
      }
      globalAxios.get('/users.json' + '?auth=' + state.idToken)
        .then(res => {
          const data = res.data
          const users = []
          for (const key in data) {
            const user = data[key]
            user.id = key
            users.push(user)
          }
          commit('storeUser', users[0])
        })
        .catch(error => console.log(error))
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isAuthenticated (state) {
      return state.idToken !== null
    },
    allProducts (state) {
      return state.products
    },
    singleProduct (state) {
      return state.product
    },
    cartProducts (state) {
      return state.cartProducts
    }
  }
})
