<!-- 角色列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">权限管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card >
      <!-- 添加角色按钮 -->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!-- 角色列表区域 -->
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      // 角色列表数据
      roleList:[]
    };
  },
  created(){
    this.getRolesList();
  },
  methods:{
    // 获取角色列表
    async getRolesList(){
      const{data:res}=await this.$http.get('roles')
      if(res.meta.status!==200){
        return this.$message.error('获取角色列表失败！')
      }
      this.roleList=res.data;
      console.log(this.roleList);
    }
  }
};
</script>
<style lang='less' scoped>
</style>