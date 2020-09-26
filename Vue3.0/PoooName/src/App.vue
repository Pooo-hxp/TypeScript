<template>
  <div>
    <p>类型：{{test }}</p>
    <button @click="myFun">clickMe</button>
  </div>
</template>

<script>
import {reactive} from "vue";

export default {
  name: "App",
  setup() {
      /** * toRaw */
      let obj={
        name:'花花',
        age:'3'
      }
      let test=reactive(obj);
    function myFun() {
      // 这里无论是直接修改参数对象，还是修改引用的test 内存中数据都会改变
      // 但直接修改对象，因为没有Proxy监听，所以视图不会发生变化
      obj.name='乐乐1';//{name: "乐乐1", age: "3"}
      test.name='乐乐2';//{name: "乐乐2", age: "3"}
    }
    return {test, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
