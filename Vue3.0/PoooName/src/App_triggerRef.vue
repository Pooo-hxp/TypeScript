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
import {shallowRef, triggerRef } from "vue";

export default {
  name: "App",
  setup() {
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
      /**
       *  手动更新
      parse.value = {
        type: "fruit",
        suchAS: {
          name: "cucumber",
          info: {
            price: "0.8元/kg",
            size: {
              big: "70g",
              small: "90g",
            },
          },
        },
      };
       */
      /** * 使用triggerRef */
      parse.value.suchAS.info.price='0.8元/kg';
      triggerRef(parse)
    }
    return { parse, recursion };
  },
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
