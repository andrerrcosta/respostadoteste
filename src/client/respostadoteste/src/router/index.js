import Vue from 'vue'
import VueRouter from 'vue-router'
import Form from '../views/Form'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Cadastro',
    component: Form
  },
  {
    path: '/lista',
    name: 'Lista',

    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/List.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router;
