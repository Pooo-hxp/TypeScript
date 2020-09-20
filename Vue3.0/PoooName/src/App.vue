<template>
<div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>{{hi}}</p>
  <p></p>
  <button @click="Pooo">点击列👇表删除</button>
  <ul>
    <li v-for="VegetName in list" 
       :key='VegetName.id'
       @click="removeVeget(index)"
       >
      {{VegetName.Name}}------------{{VegetName.price}}
    </li>
  </ul>
</div>
</template>

<script>
/**
 * 2.0简单demo
 * 有此例可知，在2.0中
 */
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data() {
    return {
      hi:'测试',
      list:[
        {id:1,Name:'potato',price:'2.5元'},
        {id:2,Name:'tomato',price:'3.5元'},
        {id:3,Name:'cucumber',price:'4.5元'}
      ]
    }
  },
  methods: {
    Pooo(){
      alert('Hi,不是点我，点列表~')
    },
    removeVeget(index){
      this.list.splice(index,1)
    }
  },
}
</script>
<style lang="">
  *{
    list-style: none;
  }
  li{
    width: 40%;
    margin: 0 auto;
    background: pink;
    border-bottom: 1px dotted gray;
  }
</style>
