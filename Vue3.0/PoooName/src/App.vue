<template>
  <div>
    <p>类型：{{testReactive }}</p>
    <button @click="myFun">clickMe</button>
  </div>
</template>

<script>
import {reactive,ref} from "vue";
import {toRaw} from "vue";

export default {
  name: "App",
  setup() {
      /** * toRaw */
      let obj={
        name:'花花',
        age:'3'
      }
      let testReactive=reactive(obj);
      let testRef=ref(obj);
      let rawReac=toRaw(testReactive);
      let rawRef=toRaw(testRef.value);
      console.log(rawReac===obj); //true
      console.log(rawRef===obj); //true
      //返回由 `reactive`  或` readonly` 等方法转换成响应式代理的原始对象
    function myFun() {
      // 这里无论是直接修改参数对象，还是修改引用的test 内存中数据都会改变
      // 但直接修改对象，因为没有Proxy监听，所以视图不会发生变化
      obj.name='乐乐1';//{name: "乐乐1", age: "3"}
      testReactive.name='乐乐2';//{name: "乐乐2", age: "3"}

    }
    return {testReactive, testRef, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
