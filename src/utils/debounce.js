// 封装一个防抖函数
export default function (fn, delay) {
  var timer
  return function () {
    var _this = this
    var _args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(function () {
      fn.apply(_this, _args)
    }, delay)
  }
}
