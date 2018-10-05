<template>
  <section class="real-app">
    <input
      type="text"
      class="add-input"
      autofocus = "autofocus"
      placeholder="接下去要去做什么"
      @keyup.enter = "addTodo"
    >
    <item v-for="todo in filterTodos" :key="todo.id" :todo="todo" @del="deleteTodo"/>
    <tabs
            :filter="filter"
            :todos="todos"
            @toggleFilter="toggleFilter"
            @clearAllCompleted="clearAllCompleted"
    />
  </section>
</template>

<script>
import item from './item.vue'
import tabs from './tabs.vue'
let id = 0
export default {
  name: 'todo',
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    item,
    tabs
  },
  computed: {
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      const completed = this.filter === 'completed'
      return this.todos.filter(todo => completed === todo.completed)
    }
  },
  methods: {
    addTodo (e) {
      this.todos.unshift({
        id: id++,
        completed: false,
        content: e.target.value.trim()
      })
      e.target.value = ''
    },
    deleteTodo (id) {
      this.todos.splice(this.todos.findIndex(todo => todo.id === id), 1)
    },
    toggleFilter (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter(todo => !todo.completed)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .real-app{
    width 600px
    margin :0px  auto
    box-shadow :0px 0px 5px #666
  }
  .add-input{
    positon:relative;
    margin 0px
    width 100%
    font-size 24px
    font-family  inherit
    font-weight:inherit
    line-height 1.4rem
    border 0;
    outline none
    color inherit
    box-shadow: inset 0 -1px 5px 0px rgba(0,0,0,0)
    box-sizing border-box
    font-smoothing:antialiased;
    padding 16px 16px 16px 60px
    border none
  }
</style>