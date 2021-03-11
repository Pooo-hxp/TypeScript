<!--  -->
<template>
    <el-container class="home-style">
      <!-- 头部 -->
      <el-header>
        Header
        <el-button type="warning" @click="out">退出</el-button>
      </el-header >
      <!-- 主体 -->
      <el-container>
        <!-- 左侧边 -->
        <el-aside width="200px">Aside</el-aside>
        <!-- 右主体 -->
        <el-main>Main</el-main>
      </el-container>
    </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {};
  },
  methods: {
    out() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
<style lang='less' scoped>
.home-style{
  height: 100%;
}
.el-header{
  background-color: #363D40;
}
.el-aside{
  background-color: #313743;
}
.el-main{
  background-color: #E9EDF1;
}
</style>