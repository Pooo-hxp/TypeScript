<template>
  <div>
    <!-- <p>{{ testJson.readme }}</p> -->
    <p>{{ testRef }}</p>
    <button @click="showProxyPar">showSomething</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { ref } from "vue";
import {isRef,isReactive } from "vue";

export default {
  name: "App",
  /**
   * 其中Vue3.0中提供了两个方法，`isReactive`和`isRef`用来判定数据来源
   */
  setup() {
    let testReactive = reactive({value:'its a string'});
    let testRef = ref('its a string');
    function showProxyPar() {
      console.log('检测是否是Ref',isRef(testReactive));// false
      console.log('检测是否是Ref',isRef(testRef));// true
    }
    return { testRef,testReactive, showProxyPar };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
