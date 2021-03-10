<template>
  <div class="login_container">
    <div class="login_box">
      <!-- logo 区 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" alt="" />
      </div>
      <!-- 表单区 -->
      <el-form class="login_info" :model="loginForm">
        <el-form-item label="">
          <!-- 用户名 -->
          <el-input  prefix-icon="iconfont icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="">
          <!-- 密码 -->
          <el-input  prefix-icon="iconfont icon-3702mima" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <!-- 登录按钮 -->
           <el-button type="success" round>登录</el-button>
           <el-button type="info" round>重置</el-button>
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
      loginForm:{
        username:'name',
        password:'123',
      }
    };
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
.login_info{
  position: absolute;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  bottom: 0;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
