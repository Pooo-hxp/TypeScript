<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary">添加分类</el-button>
          <!-- 表格 -->

          <!-- 分页 -->
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      //商品分类列表
      cateList:[],
      // 商品分配查询默认条件
      querInfo:{
        type:3,
        pagenum:1,
        pagesize:5
      },
      total:0,
    };
  },
  created() {
    this.getCateList();
  },
  methods:{
    // 获取商品分类数据
    async getCateList(){
      const {data:res}=await this.$http.get('categories',{params:this.querInfo});
      if(res.meta.status!==200) return this.$message.error('获取商品分类数据错误！')
      this.$message.success('获取商品分类数据成功！')
      // 赋值数据列表
      this.cateList=res.data.result;
      this.total=res.data.total;
    }
  },
};
</script>
<style lang='' scoped>
</style>