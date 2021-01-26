import Vue from 'vue'
import App from '@/App'
import store from '@/store/index.js'
import { utils } from '@/static/js/utils.js'
	
Vue.prototype.$utils = utils

import * as filters from '@/static/js/filters.js'
Object.keys(filters).forEach(key=>{
  Vue.filter(key,filters[key]) // 插入过滤器名和对应方法
})

// 全局组件
import esoImg from '@/components/eso-img/eso-img'
import navBar from '@/components/eso-navBar/eso-navBar.vue'
import scrollBox from '@/components/eso-scrollBox/eso-scrollBox.vue'
Vue.component('esoImg', esoImg)
Vue.component('navBar', navBar)
Vue.component('scrollBox', scrollBox)

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
