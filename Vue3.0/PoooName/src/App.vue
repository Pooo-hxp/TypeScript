<template>
  <div>
    <p>类型：{{obj }}</p>
    <button @click="myFun">clickMe</button>
  </div>
</template>

<script>
import {shallowRef, triggerRef } from "vue";
import {shallowRef, triggerRef } from "vue";

export default {
  name: "App",
  setup() {
      /** * toRaw */
      let obj={
        name:'花花',
        age:'3'
      }
    function myFun() {
      obj.name='乐乐';
      console.log(obj);
    }
    return {obj, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
