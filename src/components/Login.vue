<template>
  <div class="login_container" id="particles-js">
    <el-page-header @back="goBack" content="登录" title="首页">
    </el-page-header>
    <div class="login_box">
      <!-- 头像 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- 登陆表单 -->
      <el-form ref="loginFormRef" label-width="0px" class="login_form" :model="loginForm" :rules="loginFormRules">
        <el-form-item prop="uid">
          <el-input prefix-icon="iconfont icon-user" placeholder="请输入编号" v-model="loginForm.uid"></el-input>
        </el-form-item>
        <el-form-item prop="pw">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码" v-model="loginForm.pw"></el-input>
        </el-form-item>
        <el-form-item prop="inputIdentifyCode">
          <el-input type="text" prefix-icon="iconfont el-icon-finished" placeholder="请输入验证码" v-model="loginForm.inputIdentifyCode">
            <template slot="suffix">
              <div @click="refreshCode" style="height：100%;width:100%">
                <s-identify :identifyCode="identifyCode"></s-identify>
              </div>
            </template>
          </el-input>
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
  import particlesJs from "particles.js";
  import particlesConfig from "../assets/json/login/particles";
  import SIdentify from './components/sIdentify'
  export default {
    components: { SIdentify },
    data() {
      return {
        //登陆表单的数据绑定对象
        loginForm: {
          uid: "",
          pw: "",
          type: "user",
          inputIdentifyCode: ""
        },
        //    表单的验证规则
        loginFormRules: {
          uid: [
            { required: true, message: "请输入ID", trigger: "blur" },
            {
              min: 3,
              max: 10,
              message: "长度在 3 到 10 个字符",
              trigger: "blur",
            },
          ],
          pw: [
            { required: true, message: "请输入登录密码", trigger: "blur" },
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符",
              trigger: "blur",
            },
          ],
          inputIdentifyCode: [
            { required: true, message: "请输入验证码", trigger: "blur" }
          ]
        },
        identifyCode: '',
        identifyCodes: '0123456789qwertyuioplkjhgfdsazxcvbnmZXCVBNMALKJHGFDSQWERTYUIOP'
      };
    },
    mounted() {
      this.init();
      this.refreshCode()
    },
    methods: {
      randomNum(min, max) {
        return Math.floor(Math.random() * (max - min) + min)
      },
      refreshCode() {
        this.identifyCode = ''
        this.makeCode(this.identifyCodes, 4)
      },
      makeCode(o, l) {
        for (let i = 0; i < l; i++) {
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ]
        }
      },
      //    点击重置按钮，重置登录表单
      resetloginForm() {
        this.$refs.loginFormRef.resetFields();
      },
      init() {
        particlesJS("particles-js", particlesConfig);
      },
      login() {
        //表单预验证
        this.$refs.loginFormRef.validate(async (valid) => {
          // 表单验证结果不正确
          if (!valid) return;
          //验证码不正确
          if (this.loginForm.inputIdentifyCode.toLowerCase() != this.identifyCode.toLowerCase()) {
            return this.$message.error('验证码不正确')
          }
          const { data: res } = await this.$http.post("login", this.loginForm);

          if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
          this.$message.success("登陆成功");
          // 通过编程式导航跳转到后台主页;
          if (this.loginForm.type === "admin") {
            window.localStorage.setItem("utype", this.loginForm.type);
            window.localStorage.setItem("aid", this.loginForm.uid);
            window.localStorage.setItem("token", res.data.token);
            this.$router.push("/admin");
          } else {
            window.localStorage.setItem("utype", this.loginForm.type);
            window.localStorage.setItem("uid", this.loginForm.uid);
            window.localStorage.setItem("token", res.data.token);
            this.$router.push("/user");
          }
        });
      },
      goBack() {
        this.$router.push("/index")
      }
    },
  };
</script>

<style lang="less" scoped>
  .login_container {
    background-color: #2b4b6b;
    height: 100%;
  }

  .el-page-header {
    color: rgba(255, 255, 255, .3);
    margin-left: 40px;
    line-height: 60px;
  }

  .el-page-header:hover {
    color: rgba(255, 255, 255, .8);
  }

  .login_box {
    width: 600px;
    height: 400px;
    // background-color: rgba(255, 255, 255, .5);
    background-color: rgba(0, 0, 0, .5);
    border-radius: 10px;
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
    padding: 0 30px;
  }
</style>
