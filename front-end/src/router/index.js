import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Issue from '@/components/Issue'
import Transfer from '@/components/Transfer'
import Finace from '@/components/Finace'
import Settle from '@/components/Settle'
import Register from '@/components/Register'
import Deploy from '@/components/Deploy'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/issue',
      name: '欠款记账',
      component: Issue
    },
    {
      path: '/finace',
      name: '融资',
      component: Finace
    },
    {
      path: '/transfer',
      name: '转让账单',
      component: Transfer
    },
    {
      path: '/settle',
      name: '结算',
      component: Settle
    },
    {
      path: '/register',
      name: '注册页面',
      component: Register
    },
    {
      path: '/deploy',
      name: '合约部署',
      component: Deploy
    },
  ],
  mode: 'history'
})
