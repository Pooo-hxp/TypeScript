<!--  -->
<template>
    <el-container class="home-style">
      <!-- 头部 -->
      <el-header>
        <div class="header-logo">
          <img src="@/assets/header.jpg" alt="">
        <span>后台管理系统</span>
        </div>
        <el-button type="info" @click="out">退出</el-button>
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
  display: flex;
  font-size: 17px;
  font-weight: 700;
  color: white;
  padding-left: 5px;
  align-items: center;
  justify-content: space-between;
  > div{
    display: flex;
    align-items: center;
    span{
      margin-left:15px ;
    }
  }
}
.header-logo>img{
  width: 15%;
  height: 14%;
  background-position-x: 2px;
  border-radius: 10px;
}
.el-aside{
  background-color: #313743;
}
.el-main{
  background-color: #E9EDF1;
}
</style>