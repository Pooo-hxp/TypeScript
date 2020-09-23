<template>
  <div>
    <ul>
      <li
        v-for="(VegetName,index) in stus.stusList"
        :key="VegetName.id"
        @click="removeVeget(index)"
      >{{VegetName.Name}}------------{{VegetName.price}}</li>
    </ul>
  </div>
</template>

<script>
/**
 * 2.0简单demo
 */
import { ref } from "vue"; //在Vue3.0使用中需要引入ref
import { reactive } from "vue"; //在Vue3.0使用中需要引入reactive
export default {
  name: "App",
  //Vue3.0提供了setup 组合API的入口函数
  setup() {
    /**
     * ref一般用来监听简单类型变化（也可以用来监听复杂类型变化）
     * 通常使用reactive用来监听复杂类型变化（比如数组、函数之类）
     * 以下用来演示数据和方法如何抽离出来
     */
    /*
    let stus = reactive({ stusList: [********], });
    function removeVeget(index) {
      stus.stusList.splice(index, 1);
    }*/
    let {stus, removeVeget }=removeItem();// 三、直接获取外围暴露出来的数据和方法
    return { stus, removeVeget };//四、再次暴露给外界使用
  },
  methods: {},
};
  //一、把在setup中的数据和函数剥离出来,既保证数据和业务不分散利于维护的同时，又避免入口函数杂乱
  function removeItem() {
    let stus = reactive({
      stusList: [
        { id: 1, Name: "potato", price: "2.5" },
        { id: 2, Name: "tomato", price: "3.5" },
        { id: 3, Name: "cucumber", price: "4.5" },
      ],
    });
    function removeVeget(index) {
      //这里比较方便的是，不需要再用this指向Vue实例了
      stus.stusList.splice(index, 1);
    }
    return {stus,removeVeget} // 二、暴露给组合API
  }
</script>
<style lang="">
* {
  list-style: none;
}
li {
  width: 40%;
  margin: 0 auto;
  background: pink;
  border-bottom: 1px dotted gray;
}
</style>
