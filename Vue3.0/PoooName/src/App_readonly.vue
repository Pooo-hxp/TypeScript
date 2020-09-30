<template>
  <div>
    <p>{{only.name}}</p>
    <p>{{only.age}}</p>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>
import {readonly} from "vue";

export default {
  name: "App",
  setup() {
    let obj={
      name:'poo',
      age:'13'
    }
    let only=readonly(obj)
    function myFun() {
      only.name='HAHA';//  failed: target is readonly
    }
    return {only, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
