<template>
  <div>
    <p>类型：{{testReactive }}</p>
    <button @click="myFun">clickMe</button>
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import {markRaw} from "vue";

export default {
  name: "App",
  setup() {
      /** * markRaw */
      let obj={
        name:'poo',
        age:'3'
      }
      console.log(obj);//{name: "poo", age: "3"}
     obj=markRaw(obj)//使其值的改变，不会被监听，视图不会发生变化
    let testReactive=reactive(obj);

    function myFun() {
      testReactive.name='地瓜';
      console.log(obj);//{name: "地瓜", age: "3", __v_skip: true}
    }
    return {testReactive, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
