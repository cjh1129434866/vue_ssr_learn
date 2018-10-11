import Todo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'

export default [
  {
  	path: '/',
  	redirect: '/app'
  },
  {
  	path: '/app',
    // path: '/app/:id', // 通过路由传参
    // props: true, // 如果这里声明为true，那么这里的id会作为props传到这个组件里面
    /*props: { // 在这里自定义参数的键值
    	id: '456' 
    },*/
   // props: (route) => ({id: route.query.b}),
    component: Todo,
    name: 'app', // 给路由命名，可以通过这个名字实现路由跳转
    meta: { // 可以通过this.$route.meta拿到这个信息
    	title: 'this id app',
    	description: '这里是描述'
    },
    /*children: [
    	{
    		path: 'test',
    	  component: Login
    	}
    ]*/
  },
  {
    path: '/login',
	  component: Login
  }
]