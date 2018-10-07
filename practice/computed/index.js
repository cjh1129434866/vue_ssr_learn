import Vue from 'vue'
new Vue({
  el: '#root',
  template: `
    <div>
      <p>Name1: {{firstName + '--' + secondName}}</p>
      <p>Name2: {{name2}}</p>
      <p>{{number}}</p>
      <p>{{getName()}}</p>
	  <p>Number: <input type='text' v-model='number'/></p>
	  <p>firstName: <input type='text' v-model='firstName'/></p>
	  <p>secondName: <input type='text' v-model='secondName'/></p>
	  <p>name3: <input type='text' v-model='name3'/></p>
	  <p>fullName: {{fullName}}</p>
	  <p>obj.a: <input type='text' v-model='obj.a'/></p>
    </div>
  `,
  data: {
    firstName: 'tiger',
    secondName: 'chen',
    fullName: null,
    number: 0,
    obj: {
    	a: 1
    }
  },
  computed: {
    name2 () { // computed里面的方法是会被缓存的，只有当方法里面的数据有变化时才会执行
      console.log('computed name2')
      return `${this.firstName} ${this.secondName}`
    },
    name3: {
	  get () {
        return `${this.firstName} ${this.secondName}`
	  },
	  set (name) {
	  	let names = name.split(' ')
	  	this.firstName = names[0]
	  	this.secondName = names[1]
	  }
    }
  },
  watch: {
  	firstName: {
  		handler (newVal, oldVal) { // 用watch监听其实就是编译成handler这个方法 ，watch监听时在数据有变化的时候才执行它里面的方法，那么怎么才能在组件加载的时候就执行呢 ？
  		   this.fullName = newVal + this.secondName
  		},
  		immediate: true // 组件加载的时候就执行watch里面的方法
  	},
  	obj: { // 这里监听的是对象
  		handler (newVal, oldVal) { 
  		   console.log('obj.a changed')
  		},
  		immediate: true,
  		deep: true // 深度观察, 这里如果是false，那么当改变对象的属性的值的时候不会执行handler这个方法，只有给对象重新赋值的时候才会执行
  	},
  	'obj.a': { // 可以实时监听，注意这里有引号
  		handler () {
  			console.log('监听对象的属性')
  		}
  	}
  	// 这里要注意在computed 和 watch里面最好不要修改数据，因为i这样可能造成死循环
  },
  methods: {
    getName () { // 这里每次页面重新渲染的时候都会执行
  	  console.log('getName')
      return `${this.firstName} ${this.secondName}`
    }
  }
})
