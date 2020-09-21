<template>
<div>
  <!-- Vue2.0用法 -->
  <div>
  <!-- <img alt="Vue logo" src="./assets/logo.png" />
  <p>{{hi}}</p>
  <p></p>
  <button @click="Pooo">点击列👇表删除</button> -->
  <ul>
    <li v-for="(VegetName,index) in stus.stusList" 
       :key='VegetName.id'
       @click="removeVeget(index)"
       >
      {{VegetName.Name}}------------{{VegetName.price}}
    </li>
  </ul>
  </div>
  <!-- Vue3.0用法 -->
  <div>
    <p>-------------------------------------Vue3.0-------------------------------</p>
    <p></p>
    <button >改变</button>
  </div>
</div>
</template>

<script>
/**
 * 2.0简单demo
 * 有此例可知，在2.0中对于业务实现
 * 需要现在data中变更补充数据，然后在methods或watch中补充业务逻辑
 * 这样数据和逻辑是分模块的，不在一起，这样的话不利于业务的管理和维护
 * 因为查找起来不方便
 */
import {ref} from 'vue';//在Vue3.0使用中需要引入ref
import {reactive} from 'vue';//在Vue3.0使用中需要引入reactive
export default {
  name: 'App',
  //Vue3.0提供了setup 组合API的入口函数
  setup(){
    /**
     * ref函数注意点
     * ref一般用来监听简单类型变化（也可以用来监听复杂类型变化）
     * 通常使用reactive用来监听复杂类型变化（比如数组、对象等）
     * 
     */
    let stus=reactive({
      stusList:[
        {id:1,Name:'potato',price:'2.5元'},
        {id:2,Name:'tomato',price:'3.5元'},
        {id:3,Name:'cucumber',price:'4.5元'}
      ]
    });
     function removeVeget(index){
       console.log(index)
      stus.stusList.splice(index,1)
    }
    return {stus,removeVeget}
  },
  methods: {
    Pooo(){
      alert('Hi,不是点我，点列表~')
    },

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
