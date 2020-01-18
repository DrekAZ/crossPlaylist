import Vue from 'vue'
import VueYoutube from 'vue-youtube'
import List from './list.vue'
Vue.config.productionTip = false
import Setting from './components/setting.vue'

Vue.use(VueYoutube)

new Vue({
	render: h => h(Setting)
}).$mount('#setting')
new Vue({
	render: h => h(List),
}).$mount('#app')