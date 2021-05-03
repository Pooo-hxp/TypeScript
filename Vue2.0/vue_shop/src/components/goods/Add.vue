<!-- 商品添加组件页面 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
        <!-- 文本提示信息 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"> </el-alert>
      <!-- 步骤节点 -->
      <el-steps :space="200" :active="1" finish-status="success">
        <el-step title="已完成"></el-step>
        <el-step title="进行中"></el-step>
        <el-step title="步骤 3"></el-step>
        </el-steps>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
};
</script>
<style lang='' scoped>
</style>