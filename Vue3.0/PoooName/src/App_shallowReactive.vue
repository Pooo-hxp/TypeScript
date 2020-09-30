<template>
  <div>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>
import {readonly} from "vue";
    let obj={
      name:'poo',
      age:'13'
    };
function shallowReactive(obj){
  return new Proxy(obj,{
    get(obj,key){
      return obj[key]
    },
    set(obj,key,value){
      obj[key]=value
      console.log('更新');
      return true;
    }
  })
}
let obj={
  A:'A',
  B:{
    b1:'b1',
    b2:'b2',
    b3:{
      b3_1:'b3-1',
      b3_2:'b3-2'
    }
  }
}
let test=shallowReactive(obj)
test.A='apple';
test.B.b2='banana';
</script>
<style lang="">
* {
  list-style: none;
}
</style>
