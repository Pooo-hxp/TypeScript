<template>
  <div>
    <ul>
      <li
        v-for="(VegetName,index) in stus.stusList"
        :key="VegetName.id"
        @click="removeVeget(index)"
      >{{VegetName.Name}}------------{{VegetName.price}}</li>
    </ul>
  </div>
</template>

<script>
import { ref } from "vue"; 
import { removeItem } from "./remove"; //
export default {
  name: "App",
  setup() {
    let {stus, removeVeget }=removeItem();// 三、直接获取外围暴露出来的数据和方法
    return { stus, removeVeget };//四、再次暴露给外界使用
  },
  methods: {},
};
</script>
<style lang="">
* {
  list-style: none;
}
li {
  width: 40%;
  margin: 0 auto;
  background: pink;
  border-bottom: 1px dotted gray;
}
</style>
