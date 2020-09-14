<template>
  <div>
    <ul>
      <li
        v-for="(VegetName, index) in stus.stusList"
        :key="VegetName.id"
        @click="removeVeget(index)"
      >
        {{ VegetName.Name }}------------{{ VegetName.price }}
      </li>
    </ul>
  </div>
</template>

<script>
import { removeItem } from "./remove"; //导入删除的业务逻辑模块
export default {
  name: "App",
  setup() {
    let { stus, removeVeget } = removeItem();
    return { stus, removeVeget };
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
