<template>
  <div>
    <p>{{testJson.tip}}</p>
    <p>{{testArray[2]}}</p>
    <p>{{testString}}</p>
    <button @click="showProxyPar">showSomething </button>
  </div>
</template>

<script>
import {reactive} from 'vue';
export default {
  name: "App",
  setup() {
    let testJson=reactive({
      tip:'its a Json！'
    })
    let testArray=reactive(['first','second','third'])
    let testString=reactive('Just a string')
    function showProxyPar(){
      testJson.tip='changed';
      testArray[2]='selected';
      testString='hengxipeng';
      console.log(testJson);// Proxy {tip: "changed"}
      console.log(testArray);// {0: "first", 1: "second", 2: "selected"}
      console.log(testString);// hengxipeng
    }
    return { testJson,testArray,testString,showProxyPar };
  },
  methods: {},
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
