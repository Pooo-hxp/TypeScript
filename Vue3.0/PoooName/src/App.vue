<template>
  <div>
    <p>类型：{{ parse.type }}</p>
    <!-- <p>名称：{{ parse.suchAS.name }}</p> -->
    <p>名称：{{ parse.suchAS.name }}</p>
    <!-- <p>价格：{{ parse.suchAS.info.price }}</p>
    <p>小品种：{{ parse.suchAS.info.size.small }}</p>
    <p>大品种：{{ parse.suchAS.info.size.big }}</p> -->
    <button @click="recursion">showSomething</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { shallowReactive } from "vue";
import { shallowRef } from "vue";

export default {
  name: "App",
  /**
   * 非递归监听
   * 只监听数据的第一层
   */
  setup() {
    // let parse = shallowReactive({
    let parse = shallowRef({
      type: "vegetables",
      suchAS: {
        name: "tomato",
        info: {
          price: "0.4元/kg",
          size: {
            big: "50g",
            small: "20g",
          },
        },
      },
    });
    function recursion() {
      // parse.type='fruit';
      // parse.suchAS.name='cucumber';
      // parse.suchAS.info.price='0.8元/kg';
      // parse.suchAS.info.size.small='70g'; 
      // parse.suchAS.info.size.big='90g';

      // console.log(parse);
      // console.log( parse.suchAS);
      // console.log( parse.suchAS.info);
      // console.log(parse.suchAS.info.size);
      /**
       * 对于第一层的修改无效
       */
      parse.value.type='fruit';
      parse.value.suchAS.name='cucumber';
      parse.value.suchAS.info.price='0.8元/kg';
      parse.value.suchAS.info.size.small='70g'; 
      parse.value.suchAS.info.size.big='90g';
//--查看控制台
      console.log(parse);
      console.log( parse.value.suchAS);
      console.log( parse.value.suchAS.info);
    }
    return { parse,recursion };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
