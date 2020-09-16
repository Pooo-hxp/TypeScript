<template>
  <div>
    <!-- <p>{{ testJson.readme }}</p> -->
    <p>{{ testRef }}</p>
    <button @click="showProxyPar">showSomething</button>
  </div>
</template>

<script>
import { reactive } from "vue";
// import { ref } from "vue";
// import {isRef,isReactive } from "vue";

export default {
  name: "App",
  /**
   * 递归监听
   */
  setup() {
    function recursion() {
      let parse=reactive({
        type:'vegetables',
        suchAS:{
          num1:'potato',
          info:{
            price:'$0.4',
            size:{
              big:'50g',
              small:'20g'
            }
          }
        }
      })
    }
    return { recursion };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
