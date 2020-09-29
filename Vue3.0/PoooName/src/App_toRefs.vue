<template>
  <div>
    <p>类型：{{test_toRefs }}</p>
    <button @click="myFun">clickMe</button>
  </div>
</template>

<script>
import {toRefs} from "vue";

export default {
  name: "App",
  setup() {
      /** * toRefs */
      let obj={
        name:'poo',
        age:'3'
      }
    let test_toRefs=toRefs(obj);
    /**
     * 在 toRefs 底层中其实执行了以下遍历方法
     * let par1=toRef(obj,'name')
     * let par2=toRef(obj,'age')
     */
    function myFun() {
      test_toRefs.name.value='HAHA';
      test_toRefs.age.value='13';
    }
    return {test_toRefs, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
