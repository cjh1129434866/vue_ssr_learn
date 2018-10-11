import Vue from 'vue'

const childComp = {
	props: ['props1'],
	/*template: `
	  <div :style="style">
			<slot name="spann"></slot>
	  </div>
	`,*/
	render () {
		return this.$createElement('div', {
			style: this.style,
			on: {
				click: () => {this.$emit('click1')} 
			}
		}, ['111', this.$slots.spann, this.props1])
	},
	data () {
		return {
			value: 111,
			style: {
				width: '200px',
				height: '400px',
				border: '1px solid #aaa'
			}
		}
	}
}

new Vue({
	el: '#root',
	data: {
		value: '222',
		value1: 'value111'
	},
	components: {
		childComp
	},
	methods: {
		handleClick () {
			console.log('cliked')
		}
	},
	/*template: `
		<div>
			<child-comp ref="childComp">
				<span ref="span">{{value}}</span>
			</child-comp>
		</div>
	`,*/
	render (createElement) {
		return createElement('child-comp', {
			ref: 'childComp',
			props: {
				props1: this.value1
			},
			on: {
				click1: this.handleClick
			}
		}, [
			createElement('span', {
				ref: "span",
				slot: 'spann'
			}, this.value)
		])
	}
})