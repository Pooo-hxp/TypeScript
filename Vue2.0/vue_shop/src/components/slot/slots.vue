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
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
    };
  },
  created() {
    console.log(this.str[0].id);
    console.log(this.str[0].mg_state);
  },
  props: {
    str: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang='' scoped>
</style>