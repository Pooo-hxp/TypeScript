<template>
  <div>
    <p>类型：{{ parse.type }}</p>
    <p>名称：{{ parse.suchAS.name }}</p>
    <p>价格：{{ parse.suchAS.info.price }}</p>
    <p>小品种：{{ parse.suchAS.info.size.small }}</p>
    <p>大品种：{{ parse.suchAS.info.size.big }}</p>
    <button @click="recursion">showSomething</button>
  </div>
</template>

<script>
import { reactive } from "vue";

export default {
  name: "App",
  /**
   * 递归监听
   * 每一层的数据都可以改变，都会进行监听
   */
  setup() {
    let parse = reactive({
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
      parse.type='fruit';
      parse.suchAS.name='cucumber';
      parse.suchAS.info.price='0.8元/kg';
      parse.suchAS.info.size.small='70g'; 
      parse.suchAS.info.size.big='90g';
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
