<template>
  <div id="app">
    <Home></Home>
    <!-- 使用组件 -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Home from '@/Home.vue';
//引入Home组件

@Component({
  //注册组件hhigkg
  components:{
    Home,
  }
})
export default class App extends Vue{
  
}

// @Component({
//   components: {
//     HelloWorld,
//   },
// })
// export default class App extends Vue {}
</script>

<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px
</style>
