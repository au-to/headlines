import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 适配
import 'amfe-flexible'
// 引入vant组件
import { NavBar, Form, Field, Button, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, List } from 'vant'
Vue.config.productionTip = false
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Button)
Vue.use(Tabbar)
Vue.use(TabbarItem)
Vue.use(Icon)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Cell)
Vue.use(List)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
