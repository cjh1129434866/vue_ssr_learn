<template>
  <div id="app">
    <div id="cover"></div>
    <Header></Header>
    <Footer></Footer>
    <router-link to="/app/123">app</router-link>
    <!-- <router-link :to="{name: 'app'}">app</router-link> -->
    <router-link to="/login">login</router-link>
    <!-- <Todo></Todo> -->
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<script>
import Header from './layout/header.vue'
import Footer from './layout/footer.jsx'
import Todo from './views/todo/todo.vue'
export default {
  name: 'app',
  data () {
    return {

    }
  },
  mounted () {
    console.log(this.$route)
  },
  components: {
    Header,
    Footer,
    Todo
  }
}
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
    background-color #999
    opacity .5
    z-index -1
  }
</style>