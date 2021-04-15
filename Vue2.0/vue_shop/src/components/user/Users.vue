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
          <el-input
            clearable
            @clear="getUserList()"
            placeholder="请输入内容"
            v-model="quertInfo.query"
            class="input-with-select"
          >
            <el-button
              @click="getUserList()"
              slot="append"
              icon="el-icon-search"
            ></el-button> </el-input
        ></el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addInfo = true">添加用户</el-button>
        </el-col>
      </el-row>
      <!-- 用户列表数据 -->
      <el-table :data="userList" style="width: 100%" border stripe>
        <el-table-column type="index" label=""></el-table-column>
        <el-table-column prop="username" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch
              @change="updateState(scope.row)"
              v-model="scope.row.mg_state"
            >
            </el-switch>
          </template>
          <!-- <slotBtn :str="userList">
            <slot>
            </slot>
          </slotBtn> -->
        </el-table-column>
        <el-table-column prop="" label="操作" width="190">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              :enterable="false"
              effect="dark"
              content="修改"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="primary"
                icon="el-icon-edit"
                @click="showEditDialog(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              :enterable="false"
              effect="dark"
              content="删除"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="danger"
                icon="el-icon-delete"
                @click="removeUserById(scope.row.id)"
              ></el-button>
            </el-tooltip>
            <el-tooltip
              class="item"
              :enterable="false"
              effect="dark"
              content="分配角色"
              placement="top-start"
            >
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-setting"
                @click="setRole(scope.row)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 用户添加 功能输入框 -->
      <el-dialog
        title="添加用户"
        :visible.sync="addInfo"
        width="50%"
        @close="addDiaClose"
      >
        <el-form
          :model="addForm"
          :rules="addFormRules"
          ref="ruleFormRef"
          label-width="70px"
        >
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
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 修改用户信息输入框 -->
      <el-dialog
        title="修改用户"
        :visible.sync="editDialogVisible"
        width="50%"
        @close="editDialogClosed"
      >
        <el-form
          :model="editForm"
          :rules="editFormRules"
          ref="editFormRef"
          label-width="70px"
        >
          <el-form-item label="用户名">
            <el-input v-model="editForm.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="editForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model="editForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="editDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="editUserInfo">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 分配角色对话框 -->
      <el-dialog
        title="分配角色"
        :visible.sync="setRoleDialogVisible"
        width="50%"
      >
        <span slot="footer" class="dialog-footer">
          <el-button @click="setRoleDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="setRoleDialogVisible">确 定</el-button>
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
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
//-switch插槽，暂未使用
import slotBtn from "@/components/slot/switch_slot.vue";
import { MessageBox } from "element-ui";
export default {
  name: "users",
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, callback) => {
      // 邮箱正则验证
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
      if (regEmail.test(value)) {
        return callback();
      }
      callback(new Error("当前邮箱不合法"));
    };
    // 验证手机号规则
    var checkMobile = (rule, value, callback) => {
      const regMobile = /^(0|86|17951)?(13|[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
      if (regMobile.test(value)) {
        return callback();
      }
      callback(new Error("当前手机号不合法"));
    };
    return {
      userList: [],
      quertInfo: {
        query: "",
        pagenum: 1,
        pagesize: 2,
      },
      total: 10,
      //添加用户数据
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: "",
      },
      // 添加用户表单验证规则
      addFormRules: {
        username: [
          {
            required: true, //必输
            message: "输入用户名",
            trigger: "blur", //失去焦点进行验证
          },
          {
            min: 3,
            max: 8,
            message: "用户名在三到八位之间。",
            trigger: "blur", //失去焦点进行验证
          },
        ],
        password: [
          {
            required: true, //必输
            message: "输入账号密码",
            trigger: "blur", //失去焦点进行验证
          },
          {
            min: 6,
            max: 10,
            message: "账号密码在六到十位之间",
            trigger: "blur", //失去焦点进行验证
          },
        ],
        email: [
          {
            required: true, //必输
            message: "输入账号邮箱",
            trigger: "blur", //失去焦点进行验证
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true, //必输
            message: "输入手机号",
            trigger: "blur", //失去焦点进行验证
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
      // 用户修改表单验证规则
      editFormRules: {
        email: [
          {
            required: true, //必输
            message: "输入账号邮箱",
            trigger: "blur", //失去焦点进行验证
          },
          {
            validator: checkEmail,
            trigger: "blur",
          },
        ],
        mobile: [
          {
            required: true, //必输
            message: "输入手机号",
            trigger: "blur", //失去焦点进行验证
          },
          {
            validator: checkMobile,
            trigger: "blur",
          },
        ],
      },
      // 控制修改用户对话框展示
      editDialogVisible: false,
      // 根据ID 查询到的用户信息对象
      editForm: {},
      // 控制添加用户对话框展示
      addInfo: false,
      //控制分配角色对话框显示与隐藏
      setRoleDialogVisible:false,
      //分配角色时，当前选中的角色信息
      userInfo:{}
    };
  },
  components: {
    slotBtn,
  },
  methods: {
    // 获取用户信息
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
    //监听数据开关变化
    async updateState(userInfo) {
      // 更改当前条数据状态
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.mg_state}`
      );
      if (res.meta.status !== 200) {
        //状态更新失败，回退状态更改操作
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("状态更新失败！");
      }
      this.$message.success("更新成功！");
    },
    // 监听增加用户信息对话框关闭事件，重置表单验证提示信息
    addDiaClose() {
      this.$refs.ruleFormRef.resetFields();
    },
    // 监听修改用户信息对话框关闭事件，重置表单验证提示信息
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    // 修改用户信息并修改
    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        // 校验不通过直接终止
        if (!valid) return;
        // 发起信息修改请求
        const { data: res } = await this.$http.put(
          "users/" + this.editForm.id,
          {
            email: this.editForm.email,
            mobile: this.editForm.mobile,
          }
        );
        if (res.meta.status !== 200)
          return this.$message.error("用户信息修改失败！");
        // 修改成功关闭表单，重新渲染数据列表
        this.editDialogVisible = false;
        this.getUserList();
        this.$message.success("用户信息修改成功！");
      });
    },
    // 添加表单预校验,并添加用户
    addUser() {
      this.$refs.ruleFormRef.validate(async (vaid) => {
        if (!vaid) return;
        // 发起请求，添加用户
        const { data: res } = await this.$http.post("users", this.addForm);
        if (res.meta.status != 201)
          return this.$message.error(`添加失败,${res.meta.msg}`);
        this.$message.success("添加成功");
        // 关闭添加用户表单
        this.addInfo = false;
        // 更新列表信息
        this.getUserList();
      });
      // addInfo = false
    },
    // 删除用户数据
    async removeUserById(id) {
      //根据传入ID删除用户
      const confirmResult = await this.$confirm(
        "此操作将删除当前账户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((error) => error);
      if (confirmResult != "confirm") return this.$message.info("已取消删除");

      const { data: res } = await this.$http.delete("users/" + id);
      if (res.meta.status != 200)
        return this.$message.error(`删除失败,${res.meta.msg}`);
      this.$message.success("删除成功");
      // 更新列表信息
      this.getUserList();
    },
    // 展示用户信息修改表单
    async showEditDialog(id) {
      const { data: res } = await this.$http.get("users/" + id);
      if (res.meta.status !== 200)
        return this.$message.error("获取用户信息失败");
      this.editForm = res.data;
      this.editDialogVisible = true;
    },
    // 监听页数变化
    handleSizeChange(newSize) {
      this.quertInfo.pagesize = newSize;
      this.getUserList();
    },
    // 监听页码变化
    handleCurrentChange(newPage) {
      this.quertInfo.pagenum = newPage;
      this.getUserList();
    },
    setRole(){
      this.setRoleDialogVisible=true;
    }
  },
  created(userInfo) {
    this.userInfo=userInfo;
    console.log(this.userInfo);
    this.getUserList();
  },
};
</script>
<style lang='less' scoped>
</style>