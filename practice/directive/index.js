import Vue from 'vue'
new Vue({
	el: '#root',
	template: `
		<div> 
		  <p v-text="text"></p>
			<p v-html="html"></p>
			<p v-show="isActive">{{isActive}}</p>
			<p v-if="isActive">{{isActive}}</p>
			<ul>
				<li v-for='(item, index) in arr' :key='item'>{{item}}:{{index}}</li>
			</ul>
			<ul>
				<li v-for='(value, key, index) in obj'>{{value}}:{{key}}:{{index}}</li>
			</ul>
			<input type="text" v-model="text" />
			<input type="checkbox" v-model="isActive"/>
			<div>
				<input type="checkbox" :value="1" v-model="arr"/>
				<input type="checkbox" :value="2" v-model="arr"/>
				<input type="checkbox" :value="3" v-model="arr"/>
			</div>
			<div>
				<input type="radio" value='one' v-model="picked"/>
				<input type="radio" value='two' v-model="picked"/>
			</div>
			<div>
        <input type="text" v-model.number="text1" /> <br />
			  <input type="text" v-model.trim="text2" /> <br />
			  <input type="text" v-model.lazy="text3"/> <br />
			  <div v-once>{{text4}}</div>
			  <input type="text" v-model="text4"/>
			</div>
		</div>
	`,
	data: {
		text: 0,
		html: '<span>this is html</span>',
		isActive: false,
		arr: [1, 2, 3],
		obj: {
			a: 1,
			b: 2,
			c: 3
		},
		picked: '',
		text1: 0,
		text2: 1,
		text3: 3,
		text4: 4
	}
})