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
      <el-alert
        title="注意：只允许为第三级分类设置相关参数"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <!-- 商品选择区域 -->
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <!-- 商品分类级联 -->
          <el-cascader
            v-model="selectCateKeys"
            :options="catelist"
            :props="cateProps"
            @change="handleChange"
          >
          </el-cascader>
        </el-col>
      </el-row>
      <!-- 页签区域 -->
      <el-tabs v-model="activeName" @tab-click="handleTableClick">
        <!-- 动态参数面板 -->
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDis"
           @click="addDialogVisible=true"
            >添加参数</el-button>
            <!-- 参数表格 -->
            <el-table :data="manyTableData" border stripe>
                <!-- 展开行 -->
                <el-table-column type="expand"></el-table-column>
                <el-table-column type="index"></el-table-column>
                <el-table-column label="参数名称" prop="attr_name"></el-table-column>
                <el-table-column label="操作">
                   <template slot-scope="">
                       <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                       <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                   </template>
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <!-- 静态属性面板 -->
        <el-tab-pane label="静态属性" name="only" :disabled="isBtnDis">
          <el-button type="primary" size="mini" @click="addDialogVisible=true">添加属性</el-button>
          <!-- 静态属性面板 -->
            <el-table :data="onlyTableData" border stripe>
            <!-- 展开行 -->
            <el-table-column type="expand"></el-table-column>
            <el-table-column type="index"></el-table-column>
            <el-table-column label="属性名称" prop="attr_name"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="">
                    <el-button size="mini" type="primary" icon="el-icon-edit">编辑</el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete">删除</el-button>
                </template>
            </el-table-column>
            </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!-- 添加参数的对话框 -->
    <el-dialog
      :title="'添加'+titleText"
      :visible.sync="addDialogVisible"
      width="50%"
      >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
      </span>
  </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //商品分类列表
      catelist: [],
      //为级联选择配置对象
      cateProps: {
        value: "cat_id",
        label: "cat_name",
        children: "children",
      },
      // 级联选择框选中的数据
      selectCateKeys: [],
      // 激活页签名称
      activeName: "many",
      //动态参数数据
      manyTableData:[],
      //静态属性数据
      onlyTableData:[],
      //控制添加对话框
      addDialogVisible:false,
    };
  },
  created() {
    this.getCateList();
  },
  methods: {
    //获取商品分配数据
    async getCateList() {
      const { data: res } = await this.$http.get("cateGories");
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品分类失败！");
      }
      this.catelist = res.data;
    },
    //级联选择框数据变化出发
    handleChange() {
        this.getParamsData();
    },
    //tab页签点击事件处理函数
    handleTableClick() {
        this.getParamsData();
    },
    async getParamsData(){
              //选中的商品分三级，则清空选中
      if (this.selectCateKeys.length !== 3) {
        this.selectCateKeys.length = 0;
      }
      //依据所处面板及分类ID，获取对应参数
      const {data:res}= await this.$http.get(`categories/${this.cateId}/attributes`, {
        params: { sel: this.activeName },
      });
      if(res.meta.status!==200){
          return this.$message.error('获取参数列表失败！')
      }
      this.activeName==='many'?this.manyTableData=res.data:this.onlyTableData=res.data;
    }
    
  },
  computed: {
    //按钮被禁用
    isBtnDis() {
      // 选中商品非三类，则禁用控制面板
      return this.selectCateKeys.length !== 3 ? true : false;
    },
    // 当前选中的三级分类ID
    cateId() {
      return this.selectCateKeys.length === 3 ? this.selectCateKeys[2] : null;
    },
    // 计算标题文本
    titleText(){
      return this.activeName=='many'?'动态参数':'静态属性';
    }
  },
};
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>