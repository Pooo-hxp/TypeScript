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
      <!-- 搜索用户功能 -->
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
      <!-- 用户列表数据 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label=""></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <slots :str="userList">
            <slot></slot>
          </slots>
        </el-table-column>
        <el-table-column prop="" label="操作"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import slots from "@/components/slot/slots.vue";
export default {
  name: "users",
  data() {
    return {
      userList: [],
      quertInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 0,
    };
  },
  components: {
    slots,
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.quertInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.errto("获取用户列表数据失败");
      }
      // 用户数据和总数
      this.userList = res.data.users;
      this.total = res.data.total;
    },
  },
  created() {
    this.getUserList();
  },
};
</script>
<style lang='less' scoped>
</style>