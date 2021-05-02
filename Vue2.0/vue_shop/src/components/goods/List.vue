<!--  -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">商品管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card>
        <el-row :gutter='20'>
            <el-col >
                <el-col :span="8">
                    <el-input placeholder="请输入内容">
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary">添加商品</el-button>
                </el-col>
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
        // 查询参数对象
        queryInfo:{
            quert:'',
            pagenum:1,
            pagesize:10
        }
    };
  },
  created() {
      this.getGoodsList();
  },
  methods: {
    async getGoodsList(){
            const{data:res}=await this.$http.get('goods',{params:this.queryInfo})
            if(res.meta.status!==200) return this.$message.error('获取商品列表失败！')
            this.$message.success('获取列表成功');
      }
  },
};
</script>
<style lang='' scoped>
</style>