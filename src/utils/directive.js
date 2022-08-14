// 封装中间件函数插件
import Vue from 'vue'
export default {
  install () {
    Vue.directive('autoFucus', {
      inserted (el) {
        // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
        el = el.querySelector('input')
        el.focus()
      }
    })
  }
}
