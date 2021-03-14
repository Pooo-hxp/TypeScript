<!--  -->
<template>
  <div>
    <slot>
      <el-switch
        v-model="str[0].mg_state"
        active-color="#13ce66"
        inactive-color="#ff4949"
      >
      </el-switch>
    </slot>
    <p>{{str[0].mg_state}}</p>
  </div>
</template>

<script>
export default {
  name: "slotBtn",
  data() {
    return {
    };
  },
  props: {
    str: {
      default: () => [],
    },
  },
};
</script>
<style lang='' scoped>
</style>