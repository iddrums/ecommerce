import Vue from 'vue'
import VueRouter from 'vue-router'

import store from './store'

import WelcomePage from './components/welcome/welcome.vue'
import DashboardPage from './components/dashboard/dashboard.vue'
import RegisterPage from './components/auth/register.vue'
import LoginPage from './components/auth/login.vue'
import ProductsPage from './components/auth/products.vue'
import AboutPage from './components/auth/about.vue'
import ProductDetails from './components/auth/productdetails.vue'
import ProductForm from './components/auth/productform.vue'
import EditProduct from './components/auth/editproduct.vue'
import Cart from './components/auth/cart.vue'
import Checkout from './components/auth/checkout.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: WelcomePage },
  { path: '/register', component: RegisterPage },
  { path: '/login', component: LoginPage },
  { path: '/products', component: ProductsPage },
  { path: '/about', component: AboutPage },
  { path: '/product/:id', component: ProductDetails },
  {
    path: '/productform',
    component: ProductForm,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/product/:id/edit',
    component: EditProduct,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  { path: '/cart', component: Cart },
  {
    path: '/checkout',
    component: Checkout,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/dashboard',
    component: DashboardPage,
    beforeEnter (to, from, next) {
      if (store.state.idToken) {
        next()
      } else {
        next('/login')
      }
    }
  }
]

export default new VueRouter({ mode: 'history', routes })
