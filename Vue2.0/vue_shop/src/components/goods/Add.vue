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
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"  > </el-alert>
      <!-- 步骤节点 -->
      <el-steps :space="200" :active="activeIndex*1" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
        </el-steps>
        <!-- tab流程栏 -->
    <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <el-tabs tab-position="left" v-model="activeIndex" :before-leave="beforeTabLeave"
        @tab-click="tabClicked">
            <el-tab-pane label="基本信息" name="0">
                <el-form-item label="商品名称" prop='goods_name'>
                    <el-input v-model="addForm.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="商品价格" prop='goods_price'>
                    <el-input v-model="addForm.goods_price" type="number"></el-input>
                </el-form-item>
                <el-form-item label="商品重量" prop='goods_weight'>
                    <el-input v-model="addForm.goods_weight" type="number"></el-input>
                </el-form-item>
                 <el-form-item label="商品数量" prop='goods_number'>
                    <el-input v-model="addForm.goods_number" type="number"></el-input>
                </el-form-item>
                <el-form-item label="商品分类" prop="goods_cat">
                    <el-cascader
                        v-model="addForm.goods_cat"
                        :options="catelist"
                         expand-trigger='hover'
                        :props="cateProps"
                        @change="handleChange">
                    </el-cascader>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品参数" name="1">
                <!-- 渲染表单的item项 -->
                <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
                    <el-checkbox-group v-model="item.attr_vals">
                        <el-checkbox :label="cb" v-for="(cb,i) in item.attr_vals" :key="i" border></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="2">
                <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
                <el-input v-model="item.attr_vals"></el-input>
                </el-form-item>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="3">
                <!-- 图片上传的后台API地址 -->
                <el-upload
                    :action="uploadURL"
                    :on-preview="handlePreview"
                    :on-remove="handleRemove"
                    list-type="picture"
                    :headers="headerObj">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容" name="4">
                <el-form-item label="商品数量" prop='goods_number'>
                    <el-input v-model="addForm.goods_number" type="number"></el-input>
                </el-form-item>
            </el-tab-pane>
         </el-tabs>
    <!-- el-tab-paneb必须嵌套在el-tabs中，中间不可被其他包裹 -->
    </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        //图片资源上传的路径 
        uploadURL:'http://127.0.0.1:8888/api/private/v1/upload',
        // 图片上传的请求头
        headerObj:{Authorization:window.sessionStorage.getItem('token')},
        // 当前流程节点坐标
        activeIndex:'0',
        // 添加商品的表单对象
        addForm:{
            goods_name:'',
            goods_price:0,
            goods_weight:0,
            goods_number:0,
            //商品所属分类数组
            goods_cat:[]
        },
        addFormRules:{
            goods_name:[{required:true,message:'请输入商品名称',trigger:'blur'}],
            goods_price:[{required:true,message:'请输入商品价格',trigger:'blur'}],
            goods_weight:[{required:true,message:'请输入商品重量',trigger:'blur'}],
            goods_number:[{required:true,message:'请设置商品数量',trigger:'blur'}],
            goods_cat:[{required:true,message:'请选择商品分类',trigger:'blur'}],
        },
        // 商品分类数组
        catelist:[],
        cateProps:{
            label:'cat_name',
            value:'cat_id',
            children:'children'
        },
        //动态获取的商品参数列表数据
        manyTableData:[],
        // 动态获取的商品属性列表数据
        onlyTableData:[],
    }
  },
    created(){
        this.getCateList();
    },
    methods:{
        // 获取商品分类数据
        async getCateList(){
            const {data:res}=await this.$http.get('categories');
            if(res.meta.status!==200) return this.$message.error('获取商品分类失败！')
            this.catelist=res.data;
        },
        // 级联选择器选中变化时触发
        handleChange(){
            //选中非三类商品,清空输入框
            if(this.addForm.goods_cat.length!=3)this.addForm.goods_cat=[]
        },
        beforeTabLeave(acName,oldName){
            //从基本信息到商品页节点跳转时，未选中三类商品则禁止跳转
            if(oldName==0&&this.addForm.goods_cat.length!=3) {
                this.$message.error('请先选择商品分类，再跳转到下个节点')
                return false ;
            }
        },
        async tabClicked(){
            if(this.activeIndex==1){
                //商品参数面板
                const {data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:'many'}});
                if(res.meta.status!==200) return this.$message.error('获取商品参数失败！')
                res.data.forEach(item=>{
                    item.attr_vals=item.attr_vals.length===0?[]:item.attr_vals.split(' ');
                })
                this.manyTableData=res.data;
            }else if(this.activeIndex==2){
                // 商品属性面板
                const {data:res}=await this.$http.get(`categories/${this.cateId}/attributes`,{params:{sel:'only'}});
                if(res.meta.status!==200) return this.$message.error('获取商品属性失败！')
                this.onlyTableData= res.data
            }else if(this.activeIndex==3){
            }
        },
        //处理上传的图片预览
        handlePreview(){

        },
        // 处理移除图片操作
        handleRemove(){

        }
    },
    computed:{
        cateId(){
            let id=this.addForm.goods_cat
            //选中三类商品则返回ID，否则返回null
            return id.length==3?id[2]:null;
        }
    }
};
</script>
<style lang='' scoped>
.el-checkbox{ 
    margin: 0 7px 0 0 !important;
}
</style>