<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
        <!-- 头部警告 -->
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon> </el-alert>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods() {},
};
</script>

<style lang="less" scoped>
</style>