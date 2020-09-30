<template>
  <div>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>
import {ref, toRefs} from "vue";

export default {
  name: "App",
  setup() {
    let btn=ref(null);
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
