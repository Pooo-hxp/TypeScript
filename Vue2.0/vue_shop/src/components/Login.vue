<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo 区 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 表单区 -->
      <el-form
        ref="loginFormRef"
        class="login_info"
        :rules="loginFormRules"
        :model="loginForm"
      >
        <el-form-item label="" prop="username">
          <!-- 用户名 -->
          <el-input
            prefix-icon="iconfont icon-user"
            v-model="loginForm.username"
          ></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <!-- 密码 -->
          <el-input
            prefix-icon="iconfont icon-3702mima"
            v-model="loginForm.password"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <!-- 登录按钮 -->
          <el-button type="success" round @click="login">登录</el-button>
          <el-button type="info" round @click="reSet">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      //登录表单数据对象
      loginForm: {
        username: "admin",
        password: "",
      },
      //表单校验设置
      loginFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入账号密码", trigger: "change" },
          {
            min: 6,
            max: 13,
            message: "密码长度在 6 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    //将表单重置为默认值且移除校验规则
    reSet() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      /**
       * 表单提交前预验证
       * val 格式校验返回布尔值
       * true 数据通过验证
       * false 数据格式校验失败
       */
      this.$refs.loginFormRef.validate(async (val) => {
        if (!val) return;
        // 解构获取返回参数data，赋值给res
        const { data: res } = await this.$http.post("login", this.loginForm);
        if (res.meta.status !== 200) {
          this.$message.error("账号有误，请检查！");
        } else {
          this.$message.success("登录成功！");
          /**
           * 按照业务逻辑，登录号后其他操作必须携带token
           * 保存在客户端 sessionStorage使用
           */
          window.sessionStorage.setItem("token", res.data.token);
          // 登录成功，路由跳转
          this.$router.push("/home");
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less' scoped>
.login_container {
  height: 100%;
  background-color: #2b4b6b;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: #fff;
    img {
      width: 100%;
      height: 100%;
      background: skyblue;
      border-radius: 50%;
    }
  }
}
.login_info {
  position: absolute;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  bottom: 0;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
