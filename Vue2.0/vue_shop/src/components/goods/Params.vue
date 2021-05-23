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
                <el-cascader
                    v-model="selectCateKeys"
                    :options="catelist"
                    :props="cateProps"
                    @change="handleChange">
                    </el-cascader>
            </el-col>
        </el-row>
        <!-- 页签区域 -->
        <el-tabs v-model="activeName" @tab-click="handleTableClick">
        <el-tab-pane label="动态参数" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
    </el-tabs>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        //商品分类列表
        catelist:[],
        //为级联选择配置对象
        cateProps:{
            value:'cat_id',
            label:'cat_name',
            children:'children'
        },
        // 级联选择框选中的数据
        selectCateKeys:[],
        // 激活页签名称
        activeName:'first'
    };
  },
  created() {
      this.getCateList()
  },
  methods: {
      //获取商品分配数据
      async getCateList() {
          const {data:res}=await this.$http.get('cateGories')
          if(res.meta.status!==200){
              return this.$message.error('获取商品分类失败！')
          }
          this.catelist=res.data;
      },
      //级联选择框数据变化出发
      handleChange(){
          //选中的商品分三级，则清空选中
          if(this.selectCateKeys.length!==3){
              this.selectCateKeys.length=0;
          }
      },
      //tab页签点击事件处理函数
      handleTableClick(){
          console.log(this.activeName);
      }
  },
};
</script>

<style lang="less" scoped>
.cat_opt{
    margin: 15px 0;
}
</style>