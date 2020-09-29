<template>
  <div>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>
import {ref, toRefs} from "vue";
/**
 * 执行时机： setup 在 beforeCreate之前执行的
 */
export default {
  name: "App",
  setup() {
    let btn=ref(null);
    console.log(btn.value);
    function myFun() {
    }
    return {btn, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
