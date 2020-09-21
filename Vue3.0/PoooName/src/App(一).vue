<template>
<div>
  <!-- Vue2.0用法 -->
  <div>
  <img alt="Vue logo" src="./assets/logo.png" />
  <p>{{hi}}</p>
  <p></p>
  <button @click="Pooo">点击列👇表删除</button>
  <ul>
    <li v-for="(VegetName,index) in list" 
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
    <p>{{count}}</p>
    <button @click="changeData">改变</button>
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
import HelloWorld from './components/HelloWorld.vue'
import {ref} from 'vue';//在Vue3.0使用中需要引入ref
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

  //Vue3.0提供了setup 组合API的入口函数
  setup(){
    /**
     * 定义初始值为0的count变量
     * 这个值发生改变时，Vue会自动更新UI
     * 在组合API中想定义函数，不需在methods中，直接在变量下定义即可（必须用return暴露出才可使用）
     * 重点：在组合API中定义的方法或变量，想在外界使用必须利用return{xxx}暴露出去
     */
    let count=ref(0);
    function changeData(){
      count.value+=1;
    }
    return {count,changeData}
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
