<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单 -->
      <el-form
        ref="loginFormRef"
        label-width="0px"
        class="login_form"
        :model="loginForm"
        :rules="loginFormRules"
      >
        <el-form-item prop="uid">
          <el-input prefix-icon="iconfont icon-user" placeholder="请输入编号" v-model="loginForm.uid"></el-input>
        </el-form-item>
        <el-form-item prop="pw">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码" v-model="loginForm.pw"></el-input>
        </el-form-item>
        <el-form-item>
          <template>
            <el-radio v-model="loginForm.type" label="user">用户</el-radio>
            <el-radio v-model="loginForm.type" label="admin">管理员</el-radio>
          </template>
        </el-form-item>
        <!-- 按键区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetloginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //登陆表单的数据绑定对象
      loginForm: {
        uid: "",
        pw: "",
        type: "user"
      },
      //    表单的验证规则
      loginFormRules: {
        uid: [
          { required: true, message: "请输入ID", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        pw: [
          { required: true, message: "请输入登录密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //    点击重置按钮，重置登录表单
    resetloginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      //表单预验证
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("login", this.loginForm);
        console.log(res);

        if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
        this.$message.success("登陆成功");
        //  通过编程式导航跳转到后台主页
        if (this.loginForm.type === 'admin') {
          window.sessionStorage.setItem('utype', this.loginForm.type)
          window.sessionStorage.setItem('aid', this.loginForm.uid)
          this.$router.push("/admin");
        } else {
          window.sessionStorage.setItem('utype', this.loginForm.type)
          window.sessionStorage.setItem('uid', this.loginForm.uid)
          this.$router.push("/user");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
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
}

.avater_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eeeeee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}

.btns {
  display: flex;
  justify-content: flex-end;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  box-sizing: border-box;
  padding: 0 10px;
}
</style>
