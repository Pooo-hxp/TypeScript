<!-- 用户列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select">
            <el-button
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary">添加用户</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "users",
  data() {
    return {
      userList:[],
      quertInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total:0
    };
  },
  methods: {
    async getUserList() {
      console.log('---');
      const { data: res } = await this.$http.get("users", {
        params: this.quertInfo,
      });
      if(res.meta.status!==200){ return this.$message.errto('获取用户列表数据失败')}
      this.userList=res.data.users;
      this.total=res.data.total;
      console.log(this.total);
      console.log(this.userList);
    },
  },
  created() {
    this.getUserList();
  },
};
</script>
<style lang='less' scoped>
</style>