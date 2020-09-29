<template>
  <div>
    <button @click="myFun" ref="btn">clickMe</button>
  </div>
</template>

<script>
import {ref, onMounted} from "vue";
/**
 * 执行时机： setup 在 beforeCreate之前执行的
 * 在3.0中生命周期函数已经被抽离了，需要哪块引哪块就好了
 */
export default {
  name: "App",
  setup() {
    let btn=ref(null);
    console.log(btn.value);
    // 回调函数和它在函数中顺序无关，根据 Vue 生命周期顺序执行
    onMounted(()=>{
      console.log(btn.value);//-  <button>clickMe</button>  
    })
    return {btn};
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
