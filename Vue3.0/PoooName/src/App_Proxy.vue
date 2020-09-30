<template>
  <div>
  </div>
</template>

<script>
import {readonly} from "vue";
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
</script>
<style lang="">
* {
  list-style: none;
}
</style>
