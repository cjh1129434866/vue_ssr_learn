import Vue from 'vue'

// 挡在注册的组件里面配置数据的时候，这个数据最好是写在组件里面的，如果是写在外面的一个对象引用进来的话，那么当这个组件多处使用的时候，他们公用的是同一个数据，彼此并不会独立，切记。子组件的data必须是一个function并且return
const component1 = {
	props: {
		active: Boolean,
		propOne: String,
		onChange: Function,
		prop1: Number,
		active1: {
			type: Object,
			// required: true, // true 必须传这个值，false可以不传
			// default: true  // 指定默认值，他与required 一般不会同时存在，因为逻辑上冲突了，那么如果default后面是一个对象，那么要写成一个方法，return一个对象出去
			default () {
				return {
					a: 111
				}
			}
		},
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
	methods: {
		changeProp1 () {
			this.onChange()
		}
	}
}

// Vue.component('CompOne', component1)


// 子组件最好不要修改父组件传递过来的数据，如果有这方面的需求，那么最好不要直接在子组件里面修改，通过$emit或者通过父组件传递过来的一个方法来触发父组件来改变。
new Vue({
	el: '#root',
	data: {
		active: true,
		prop1: 0,
		active1: {a: 111},
		active2: false
	},
	components: {
		CompOne: component1
	},
	methods: {
		handleClick () {
			this.prop1++
		}
	},
	template: `
		<div>
		  <comp-one :active='true'></comp-one>
			<comp-one prop-one='props'></comp-one>
			<comp-one :prop1='prop1' :on-change="handleClick"></comp-one>
			<comp-one :active1='active1' :active2='active2'></comp-one>
		</div>
	`
})