<template>
  <div>
    <p>{{tip}}</p>
  </div>
</template>

<script>
import { removeItem } from "./remove"; //导入删除的业务逻辑模块
export default {
  name: "App",
  setup() {
    let tip=reactive({
      tip:'Hi～'
    })
    return { stus, removeVeget };
  },
  methods: {},
};
</script>
<style lang="">
* {
  list-style: none;
}
</style>
