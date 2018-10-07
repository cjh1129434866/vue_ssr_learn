import Vue from 'vue'
new Vue({
  el: '#root',
  /* template: `
    <div :class='{active: isActive}' :id='aaa' @click='handleClick'>
      <span>{{isActive}}</span>
      <span>{{arr.join(' ')}}</span>
      <span>{{Date.now()}}</span>
      <p v-html='html'></p>
    </div>
  `, */
  template: `
    <div :class='[isActive? "active": ""]' 
      :id='aaa' 
      @click='handleClick'
      :style='[style1, style2]'
    >
      <p>{{getJoinArr()}}</p>
    </div>
  `,
  data: {
    isActive: true,
    arr: [1, 2, 3],
    html: '<span>html代码</span>',
    aaa: 'class_aaa',
    style1: {
      color: 'green'
    },
    style2: {
      fontSize: '20px',
      appearance: 'none'
    }
  },
  methods: {
    handleClick () {
      console.log('绑定的click事件')
    },
    getJoinArr () {
      return this.arr.join('/')
    }
  }
})
