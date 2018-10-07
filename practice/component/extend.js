import Vue from 'vue'

const component1 = {
	props: {
		active: Boolean,
		propOne: String,
		onChange: Function,
		prop1: Number,
		active2: {
			validator (value) { // 这也是一种做数据验证的方式
				return typeof value === 'boolean'  // 这里的boolean小写
			}
		}
	},
	template: `
		<div>
			<input type="text" v-model="text"/>
			<br />
			<span v-show="active">active</span>
			<span>{{propOne}}</span>
			<span @click="changeProp1">{{prop1}}</span>
		</div>
	`,
	data () {
		return {
			text: 0
		}
	},
	mounted () {
		console.log('comp mounted')
	},
	methods: {
		changeProp1 () {
			this.onChange()
		}
	}
}

const parent = new Vue({
	name: 'parent'
})

const component2 = {
	extends: component1, // 从component1继承
	data () {
		return {
			text: 9
		}
	},
	mounted () {
		console.log(this.$parent.$options.name)
		this.$parent.aaa = 333 // 这里可以直接改变父组件的数据,但是最好不要这么做
	}
}

// const compVue = Vue.extend(component1)

/*new compVue({
	el: '#root',
	propsData: { // 这里要用propsData才能将数据传递过去
		prop1: 10
	},
	data: {
		text: 123 // 这里会覆盖上面的text
	},
	mounted () { // 上面的mounted会和下面的mounted合并，先执行上面的，再执行下面的
		console.log('instance mounted')
	}
})*/


// 在用new Vue() 实例的地方可以显示的指定parent。如果是模板编译的情况下，那么子组件写在哪个组件里面，它的parent就是哪个组件
new Vue({ // 这里会把父组件的所有option都继承过来
	parent: parent,
	name: 'Root',
	el: '#root',
	mounted () { 
		console.log('comp2 mounted')
	  console.log(this.$parent.$options.name)
	},
	data: {
		aaa: 1111
	},
	components: {
		Comp: component2
	},
	template: `
		<comp></comp>
	`
})


// 总结：当我们写了一个公共组件用在了很多地方，这个组件里面有很多功能，我们想扩展一些功能但是又不想使用这个组件里面的大部分功能，这个时候可以使用extend来扩展一个组件，然后在扩展的这个组件里面去覆盖掉父组件不需要的东西，另外扩展自己想要的东西。