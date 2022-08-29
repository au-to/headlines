// 封装中间件函数插件
import Vue from 'vue'
export default {
  install () {
    Vue.directive('autoFucus', {
      inserted (el) {
        fn(el)
      },
      update (el) {
        fn(el)
      }
    })
  }
}

function fn (el) {
  if (el.nodeName === 'input' || el.nodeName === 'textArea') {
    el.focus()
  } else {
    // 指令在van-search组件身上, 获取的是组件根标签div, 而input在标签内
    const inp = el.querySelector('input')
    const textArea = el.querySelector('textarea')
    // 如果找到了
    if (inp || textArea) {
      inp && inp.focus()
      textArea && textArea.focus()
    } else {
      // 本身也不是, 子标签里也没有
      console.error('请把v-fofo用在输入框标签上')
    }
  }
}
