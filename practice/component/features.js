import Vue from 'vue'

const childsComponent = {
	template: `
		<div>this is childsComponent 
			<div>
				<span>{{data.value}}</span>
			</div>
		</div>
	`,
	// inject: ['yeye', 'yeyeValue'], // 它用来与爷爷组件的provide配合使用
	inject: ['yeye', 'data'],
	mounted () {
		console.log(this.$parent.$options.name)
		// console.log(this.yeye, this.yeyeValue)
	}
}

const component = {
	name: 'compss',
	/*template: `
		<div :style='style'>
		  <div class="header">
		  	<slot name="header"></slot>
		  </div>
		  <div class="footer">
				<slot name="footer"></slot>
		  </div>
		  <div>
				<slot name="xxx"></slot>
		  </div>
		  <div>
				<slot name="a1" value="456" aaa="789" :value1="value1"></slot>
		  </div>
		</div>
	`,*/
	components: {
		childsComponent
	},
	template: `
		<childsComponent></childsComponent>
	`,
	data () {
		return {
			style: {
				width: '200px',
				height: '200px',
				border: '1px solid #aaa'
			},
			value1: 'childComponent'
		}
	}
}

new Vue({
	components: {
		CompOne: component
	},
	el: '#root',
	data () {
		return {
			value: 'yeye123'
		}
	},
	provide () { // 它用来与孙子组件配合使用，让孙子组件拿到它的内容;注意这里要写成方法
		// 那么如果想通过改变爷爷组件的data,同时孙子组件也响应的话必须使用vue的如下方法
		const data = {}
		Object.defineProperty(data, 'value', {
			get: () => this.value,
			enumerable: true // 必须写；
		})
		return {
			yeye: this,
			// yeyeValue: this.value
			data // 这里要把上面的data返回出去
		}
	},
	mounted () {
		// 我们可以直接用$refs 调用组件上的属性，但是最好不要用这种方式去修改属性
		// console.log(this.$refs.comps.value1, this.$refs.dom)
	},
	template: `
		<div>
			<comp-one ref="comps">
				<span slot="header" ref="dom">this is header</span>
				<span slot="footer">this is footer</span>
				<span slot="xxx">{{value}}</span>
				<span slot="a1" slot-scope="props">{{props.value}}{{props.aaa}}{{props.value1}}---{{value}}</span>
			</comp-one>
			<input type="text" :value="value"/>
		</div>
	`
})