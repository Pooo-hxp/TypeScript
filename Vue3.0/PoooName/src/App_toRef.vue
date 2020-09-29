<template>
  <div>
    <p>类型：{{obj.name }}</p>
    <p>类型：{{obj2.name }}</p>
    <button @click="myFun">clickMe</button>
  </div>
</template>

<script>
import {ref,toRef} from "vue";

export default {
  name: "App",
  setup() {
      /** * toRef */
      let obj={ name:'poo' }
      let obj2={name:'boo'}
      //-注意：这里是让 toRef 知道是让 obj里的 name变成响应式
    let test_toRef=toRef(obj,'name');
    let test_ref=ref(obj2.name);
    console.log(test_toRef);
    function myFun() {
      test_toRef.value='土豆';
      test_ref.name='地瓜';
      console.log(obj,);// {name: "土豆"}
      console.log(obj2);// {name: "boo"}
    }
    return {obj,obj2, myFun };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>