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
   * 实质是 ref('its a string')==>reactive({value:'its a string'})
   * 也因此更改时应该 testRef.value=XX 才能更改
   */
  setup() {
    let testRef = ref('its a string');
    function showProxyPar() {
      testRef.value='ref_string'
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
