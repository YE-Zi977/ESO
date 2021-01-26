import Vue from 'vue'
import Vuex from 'vuex'

// import { LoginModule } from './login_store/store'

Vue.use(Vuex)

export default new Vuex.Store({
	namespaced: true,
	// 公共数据
	state: {
		theme: 'default', // 默认主题
	},
	mutations: {
		// 设置值
		setValue(state, obj) {
			state[obj.key] = obj.value;
		}
	},
	// 模块数据
	modules: {
		// 登录模块
		// LoginModule
	}
})
