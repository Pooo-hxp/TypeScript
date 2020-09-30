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
    let objProxy=new Proxy(obj,{
      //数据读会触发
      get(obj,key){
        console.log(obj);//{name: "poo", age: "13"}
        return obj[key]
      },
      //监听的数据被修改会触发
      set(obj,key,value){
      // 操作的对象，操作的属性，赋予的新值
      obj[key]=value //把外界赋予的新值更新到该对象
      console.log('进行UI之类的操作');
      }
    })
   objProxy.name;
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
