import Vue from 'vue'


// 有时候当我需要实现双线绑定，但是又想增加另外一个value来实现另外一个功能，这时候怎么办呢，增加一个model属性可以解决
const component = {
	model: {
		prop: 'value1',
		event: 'change'
	},
	props: ['value', 'value1'],
	template: `
		<input type="text" :value="value" :value='value1' @input="handleChnge"/>
	`,
	methods: {
		handleChnge (e) {
		  this.$emit('input', e.target.value)
			this.$emit('change', e.target.value)
		}
	}
}

new Vue({
	el: '#root',
	data: {
		value: 123
	},
	components: {
		Comp: component
	},
	template: `
		<comp v-model="value"></comp>
	`
	/*template: `
		<comp :value='value' @input='value = arguments[0]'></comp>
	`*/
	// 上面的v-model指令实际上已经在内部处理了props的绑定和@input事件
})