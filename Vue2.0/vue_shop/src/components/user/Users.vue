<!-- 用户列表 -->
<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片 -->
    <el-card class="box-card">
      <!-- 搜索用户功能 -->
      <el-row :gutter="30">
        <el-col :span="8">
          <el-input clearable @clear='getUserList()' placeholder="请输入内容" v-model="quertInfo.query" class="input-with-select">
            <el-button
            @click="getUserList()"
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary"  @click="addInfo = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表数据 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label=""></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态"
          >
          <template slot-scope="scope">
            <el-switch @change="updateState(scope.row)" v-model="scope.row.mg_state"> </el-switch>
          </template>
          <!-- <slotBtn :str="userList">
            <slot>
            </slot>
          </slotBtn> -->
        </el-table-column>
        <el-table-column prop="" label="操作" width="190">
          <template slot-scope="">
            <el-tooltip class="item" :enterable='false' effect="dark" content="修改" placement="top-start">
                <el-button size="mini" type="primary" icon="el-icon-edit"></el-button>
            </el-tooltip>
            <el-tooltip class="item" :enterable='false' effect="dark" content="删除" placement="top-start">
                <el-button size="mini" type="danger" icon="el-icon-delete"></el-button>
            </el-tooltip>
            <el-tooltip class="item" :enterable='false' effect="dark" content="分配角色" placement="top-start">
                  <el-button size="mini" hover='设置' type="warning" icon="el-icon-setting"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户添加 功能输入框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addInfo"
        width="50%">
        <el-form :model="addForm" :rules="addFormRules" ref="ruleFormRef" label-width="70px" >
          <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
         </el-form-item>
          <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
         </el-form-item>
          <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
         </el-form-item>
          <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
         </el-form-item>
         </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addInfo = false">取 消</el-button>
          <el-button type="primary" @click="addInfo = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分页功能 -->
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="quertInfo.pagenum"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="quertInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    
    </el-card>
  </div>
</template>

<script>
//-switch插槽，暂未使用
import slotBtn from "@/components/slot/switch_slot.vue";
export default {
  name: "users",
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      // 邮箱正则验证
      const regEmail=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if(regEmail.test(value)){
        return callback();
      }
      callback(new Error('当前邮箱不合法'))
      };
      // 验证手机号规则
      var checkMobile = (rule, value, callback) => {
        const regMobile=/^(0|86|17951)?(13|[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if(regMobile.test(value)){
          return callback();
        }
      callback(new Error('当前手机号不合法'))
      };
    return {
      userList: [],
      quertInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 10,
      addForm:{
        username:'',
        password:'',
        email:'',
        mobile:'',
      },//添加用户数据
      addFormRules:{
        username:[
          {required:true,//必输
            message:'输入用户名',
            trigger:'blur',//失去焦点进行验证
          },
          {min:3,
            max:8,
            message:'用户名在三到八位之间。',
            trigger:'blur',//失去焦点进行验证
          }
        ],
        password:[
          {required:true,//必输
            message:'输入账号密码',
            trigger:'blur',//失去焦点进行验证
          },
          { min:6,
            max:10,
            message:'账号密码在六到十位之间',
            trigger:'blur',//失去焦点进行验证
          }
        ],
        email:[
          {required:true,//必输
            message:'输入账号邮箱',
            trigger:'blur',//失去焦点进行验证
          },
          {
            validator:checkEmail,trigger:'blur'
          },
        ],
        mobile:[
          {required:true,//必输
            message:'输入手机号',
            trigger:'blur',//失去焦点进行验证
          },
          {
            validator:checkMobile,trigger:'blur'
          }
        ],
      },//表单验证规则
      addInfo:false,
    };
    
  },
  components: {
    slotBtn,
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.quertInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.errto("获取用户列表数据失败");
      }
      // 用户数据和总数
      this.userList = res.data.users;
      this.total = res.data.total;
    },
    //监听数据开关
    async updateState(userInfo){
      // 更改当前条数据状态
      const {data:res}=await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`)
      if(res.meta.status!==200){
        //状态更新失败，回退状态更改操作
        userInfo.mg_state=!userInfo.mg_state;
        return this.$message.error('状态更新失败！')
      }
      this.$message.success('更新成功！')
    },
    // 监听页数变化
    handleSizeChange(newSize){
      this.quertInfo.pagesize=newSize;
      this.getUserList();
    },
    // 监听页码变化
    handleCurrentChange(newPage){
      this.quertInfo.pagenum=newPage;
      this.getUserList();
    }
  },
  created() {
    this.getUserList();
  },
};
</script>
<style lang='less' scoped>
</style>