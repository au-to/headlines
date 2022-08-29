import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 适配
import 'amfe-flexible'
import directiveObj from '@/utils/directive'
// 引入vant组件
import { NavBar, Form, Field, Button, Lazyload, Tag, PullRefresh, Loading, Dialog, Image as VanImage, CellGroup, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, Badge, List, ActionSheet, Popup, Col, Row, Search, Divider } from 'vant'
Vue.use(directiveObj)
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
Vue.use(PullRefresh)
Vue.use(ActionSheet)
Vue.use(Popup)
Vue.use(Col)
Vue.use(Row)
Vue.use(Badge)
Vue.use(Search)
Vue.use(Divider)
Vue.use(Tag)
Vue.use(CellGroup)
Vue.use(Dialog)
Vue.use(VanImage)
Vue.use(Loading)
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
