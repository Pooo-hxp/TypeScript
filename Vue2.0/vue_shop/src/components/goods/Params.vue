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
    <!-- 商品选择区域 -->
    <el-row class="cat_opt">
        <el-col>
            <span>选择商品分类：</span>
            <!-- 商品分类级联 -->
        </el-col>
    </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        //商品分类列表
        catelist:[]
    };
  },
  created() {
      this.getCateList()
  },
  methods: {
      async getCateList() {
          const {data:res}=await this.$http.get('cateGories')
          if(res.meta.status!==200){
              return this.$message.error('获取商品分类失败！')
          }
          this.catelist=res.data;
      }
  },
};
</script>

<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}
</style>