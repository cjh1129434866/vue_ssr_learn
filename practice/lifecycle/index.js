import Vue from 'vue'

new Vue({
  el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log(this, '---', this.$el)
  },
  created () {
    console.log(this, '---', this.$el)
  },
  beforeMount () {
    console.log(this, '---', this.$el)
  },
  mounted () {
    console.log(this, '---', this.$el)
  },
  beforeUpdate () {
    console.log(this, '---', this.$el)
  },
  updated () {
    console.log(this, '---', this.$el)
  },
  activated () {
    console.log(this, '---', this.$el)
  },
  deactivated () {
    console.log(this, '---', this.$el)
  },
  beforeDestory () {
    console.log(this, '---', this.$el)
  },
  destoryed () {
    console.log(this, '---', this.$el)
  },
  render (h) { // 只适用于开发环境
    console.log('this is render function') // 在beforeMount 和 mounted 之间执行
    throw new TypeError('render报错')
    // return h('div', {}, this.text)
  },
  renderError (h, err) { // 只作用于当前组件
    return h('div', {}, err.stack)
  },
  errorCaptured () {
    // 会向上冒泡，适用于生产环境，收集所有组件的报错信息
    console.log('errorCaptured')
  }
})
