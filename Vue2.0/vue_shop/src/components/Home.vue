<!--  -->
<template>
  <el-container class="home-style">
    <!-- 头部 -->
    <el-header>
      <div class="header-logo">
        <img src="@/assets/header.jpg" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" @click="out">退出</el-button>
    </el-header>
    <!-- 主体 -->
    <el-container>
      <!-- 左侧边 -->
      <el-aside width="200px">
        <el-menu
          background-color="#313743"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 一级导航菜单 -->
          <el-submenu :index="String(item.id)" v-for="item in menuList" :key="item.id">
            <!-- 一级导航菜单模板区域 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级导航菜单 -->
            <el-menu-item index="String(subItem.id)" v-for="subItem in item.children" :key="subItem.id">
              <!-- 一级导航菜单模板区域 -->
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右主体 -->
      <el-main>Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      menuList: [],
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    out() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 获取菜单目录数据
    async getMenuList() {
      const { data: res } = await this.$http.get("menus");
      return res.meta.status !== 200
        ? this.$message.error(res.meta.msg)
        : (this.menuList = res.data);
    },
  },
};
</script>
<style lang='less' scoped>
.home-style {
  height: 100%;
}
.el-header {
  background-color: #363d40;
  display: flex;
  font-size: 17px;
  font-weight: 700;
  color: white;
  padding-left: 5px;
  align-items: center;
  justify-content: space-between;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.header-logo > img {
  width: 15%;
  height: 14%;
  background-position-x: 2px;
  border-radius: 10px;
}
.el-aside {
  background-color: #313743;
}
.el-main {
  background-color: #e9edf1;
}
</style>