import Vue from 'vue'
/* const div = document.createElement('div')
document.body.appendChild(div) */
const app = new Vue({
  // el: '#root',
  template: '<div ref="div">{{text}}</div>',
  data: {
    text: 0
  }
})
app.$mount('#root') // 通过这种方法也可以把dom挂在到vue的实例上
setInterval(() => {
  ++app.text
  // app.$options.data.text += 2 // 这里是无效的
  // app.$data.text += 2 // 这里是有效的
}, 1000)

console.log(app.$data)
console.log(app.$props) // 没有从父组件传递值过来，那么这里就是undefined
console.log(app.$el) // template里面的内容
console.log(app.$options)
/* app.$options.render = (h) => {
  // 刚开始页面的text初始值0，当text改变之后页面重新渲染，这段函数才生效
  return h('div', {}, 'new render function')
} */
console.log(app.$root === app) // 每一个节点都可以.$root，拿到的值都是vue的实例
console.log(app.$children)
console.log(app.$slots)
console.log(app.scopedSlots)
console.log(app.$refs)
console.log(app.$isServer) // 用来判断是否是服务端渲染，当项目里面掺入了服务端渲染，那么有些代码需要在服务端运行

/* const unWatch = app.$watch('text', (newVal, oldVal) => {
  // 在实例的外部调用$watch方法的时候，当组件销毁的时候，需要手动销毁$watch监听是，不然可能导致内存溢出
  // 当watch写在组件实例内部的时候，当组件销毁的时候，watch 跟着销毁
  console.log(`${newVal}--${oldVal}`)
}) */
/* setTimeout(() => {
  unWatch() // 三秒之后销毁监听事件
}, 3000) */

app.$on('test', (a, b) => {
  console.log(`emit event--${a}--${b}`)
})
app.$emit('test', 1, 2)
app.$once() // 事件只触发一次
// app.$forceUpdate() // 组件将强制渲染，尽量少使用，避免一直强制喧染，导致性能降低
// 当data里面的某个数据不具有某个属性的时候，直接obj.a = 'xxx' 给这个属性赋值页面不会重新渲染 。用app.$forceUpdate()；可以解决这个问题，但是最好的方法是app.$set(obj, property，value)
// 与 app.$set() 对应的一个方法是app.$delete() 可以删除掉某个属性。
