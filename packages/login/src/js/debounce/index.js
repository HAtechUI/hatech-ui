function debounce(fun, delay) { //防抖函数 在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
  return function (args) {
   /* let that = this
    let _args = args*/
    clearTimeout(fun.id)   //清除上一个定时器 后重新开始计时 再生成一个定时器
    fun.id = setTimeout(function () {
      fun.call(this, args)
    }, delay)
  }
}
export default debounce
