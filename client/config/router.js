import Router from 'vue-router'

import routes from './routes'

// 以下的这种写法不建议这么做，因为我们后面需要用到服务端渲染，那么下面的这个写法会使得在其他页面引用router的时候，每次都是引用的同一个router，并不会创建新的router，这会这个router会被缓存，用完之后并不会释放，那么多次缓存会导致内存占用严重，甚至溢出。
/* const router = new Router({
	routes
})
export default router */

// 为了适应后面的服务端渲染，我们采用下面的写法
export default () => {
	return new Router({
		routes,
		mode: 'history', // 去掉url路径里面的hash
		// base: 'base',  // 设置基路径，url每一个路由钱买你都会加上'base'
		linkActiveClass: 'active-link', // 用于页面路由激活状态时的样式修饰
		linkExtractActiveClass: 'extract-active-link',
		scrollBehavior (to, from, savedPosition) {
			// (路由去哪里， 从哪里过去， 保存的路径)
			if (savedPosition) {
				return savedPosition // 如果有保存路径，那么下一次回来的时候定位到这个滚动位置
			} else {
				return {x: 0, y: 0} // 定位到0，0 位置
			}
		},
		// parseQuery (query) {},
		// stringifyQuery (obj) {}, // 以上两个方法时对url后面的参数做处理，转成字符串或对象
		fallback: true // 一般设置为true，当有些浏览器不支持如有跳转的时候设置为true.如果设置为false，那么项目就变成了多页应用
	})
}
