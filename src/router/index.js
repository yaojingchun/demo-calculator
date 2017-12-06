import Vue from 'vue'
import Router from 'vue-router'
import Calculator from '@/components/Calculator'
import Hello from '@/components/hello'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Calculator',
      component: Calculator
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello
    }
  ]
})
