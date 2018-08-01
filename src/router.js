import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        icon: 'home',
        caption: 'Home',
        title: 'Home'
      }
    },
    {
      path: '/favorite',
      name: 'favorite',
      component: () => import(/* webpackChunkName: "favorite" */ './views/Favorite.vue'),
      meta: {
        icon: 'favorite',
        caption: 'Favorite',
        title: 'Favorite'
      }
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        icon: 'help',
        caption: 'About',
        title: 'About'
      }
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import(/* webpackChunkName: "detail" */ './views/Detail.vue'),
      meta: {
        icon: 'help',
        caption: 'Detail',
        title: 'Detail',
        hidden: true
      }
    }
  ]
})
