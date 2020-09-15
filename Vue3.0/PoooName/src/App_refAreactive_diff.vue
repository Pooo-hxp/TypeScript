<template>
  <div>
    <!-- <p>{{ testJson.readme }}</p> -->
    <p>{{ testRef }}</p>
    <button @click="showProxyPar">showSomething</button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { ref } from "vue";
export default {
  name: "App",
  /**
   * Vue在解析时，通过  __v_isRef 来判定当前参数是否由 ref 传递出来的
   * 是的话，则会自动在调用当前参数时添加 value
   */
  setup() {
    // let testRef = ref('its a string');
    let testRef = reactive({value:'its a string'});
    function showProxyPar() {
      // testRef.value='ref_string'
      console.log(testRef);
    }
    return { testRef, showProxyPar };
  },
  methods: {},
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
