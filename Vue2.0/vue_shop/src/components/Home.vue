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
      <el-aside :width="!isCollapse?'200px':'65px'">
        <div class="toggle-btn" @click="toggleColl">|||</div>
        <el-menu
          background-color="#313743"
          text-color="#fff"
          active-text-color="#409BFF"
          :unique-opened='true'
          :collapse-transition='false'
          :collapse="isCollapse"
        >
          <!-- 一级导航菜单 -->
          <el-submenu :index="String(item.id)" v-for="item in menuList" :key="item.id">
            <!-- 一级导航菜单模板区域 -->
            <template slot="title">
              <i :class="menuIconList[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级导航菜单 -->
            <el-menu-item :index="String(subItem.id)" v-for="subItem in item.children" :key="subItem.id">
              <!-- 一级导航菜单模板区域 -->
              <template slot="title">
                <i class="el-icon-s-grid"></i>
                <span>{{subItem.authName}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右主体 -->
      <el-main>
        <router-view> </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "home",
  data() {
    return {
      menuList: [],
      menuIconList:{
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '103':'iconfont icon-tijikongjian',
        '125':'iconfont icon-user',
        '145':'iconfont icon-baobiao',
      },
      //控制左侧导航栏是否折叠
      isCollapse:false
    };
  },
  created() {
    this.getMenuList();
  },
  methods: {
    // 系统退出功能，清除token
    out() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    // 左侧导航菜单的展开与折叠
    toggleColl(){
      console.log(this.isCollapse);
      this.isCollapse=!this.isCollapse;
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
  // 解决导航有条边框线对不齐
  .el-menu{
    border: 0;
  }
}
//--左侧导航折叠按钮
.toggle-btn{
  font-size: 10px;
  color: #FFF;
  text-align: center;
  line-height: 20px;
  letter-spacing: 0.4em;
  cursor: pointer;
  background-color: #2333;
}
.toggle-btn:hover{
  color: white;
  font-weight:700;
}
.el-main {
  background-color: #e9edf1;
}
.iconfont{
  margin-right: 4px;
}
</style>