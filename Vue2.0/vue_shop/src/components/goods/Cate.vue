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
          <tree-table class="treeTable" :data='cateList' :columns='columns' :selection-type='false' :expand-type='false'
          show-index index-text='#' border :show-row-hover='false'>
          <!-- 是否有效标志 -->
          <template slot="isok" slot-scope="scope"> 
            <i class="el-icon-success" style="color:green" v-if="scope.row.cat_deleted===false"></i>
            <i class="el-icon-error" style="color:red" v-else></i>
          </template>
          <!-- 排序 -->
          <template slot="order" slot-scope="scope"> 
            <el-tag  v-if="scope.row.cat_level===0">一级</el-tag>
            <el-tag type="success"  v-else-if="scope.row.cat_level===1">二级</el-tag>
            <el-tag type="warning"  v-else>三级</el-tag>
          </template>
          <!-- 操作 -->
           <template slot="opt" slot-scope="scope"> 
             <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
             <el-button type="danger"  size="mini" icon="el-icon-warning">删除</el-button>
          </template>
          </tree-table>
          <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="querInfo.pagenum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="querInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
            </el-pagination>
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
      columns:[{
        label:'分类名称',
        prop:'cat_name'
      },{
        label:'是否有效',
        type:'template',
        //表示当前列模板名称
        template:'isok'
      },{
        label:'排序',
        type:'template',
        template:'order'
      },{
        label:'操作',
        type:'template',
        template:'opt'
      }]
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
    },
    // 监听每页展示数据变化
    handleSizeChange(newSize){
      this.querInfo.pagesize=newSize;
      this.getCateList();
    },
    // 监听页码变化
    handleCurrentChange(newPage){
      this.querInfo.pagenum=newPage;
       this.getCateList();
    }
  },
};
</script>
<style lang='less' scoped>
.treeTable{
  margin-top:15px;
}
</style>