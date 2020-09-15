<template>
  <div class="login_container" id="particles-js">
    <el-page-header @back="goBack" content="修改密码">
    </el-page-header>
    <div class="login_box" v-if="isshow">
      <!-- 头像 -->
      <!-- <div class="avater_box">
        <img src="../assets/logo.png" alt />
      </div> -->
      <!-- 登陆表单 -->
      <el-form ref="editFormRef" label-width="0px" class="login_form" :model="editForm" :rules="editFormRules">
        <el-form-item prop="pw">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" placeholder="请输入密码" v-model="editForm.pw"></el-input>
        </el-form-item>
        <el-form-item prop="repw">
          <el-input type="password" prefix-icon="iconfont icon-3702mima" placeholder="请输入再次密码" v-model="editForm.repw"></el-input>
        </el-form-item>
        <!-- 按键区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="editpw">修改密码</el-button>
          <el-button type="info" @click="reseteditForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="login_box" v-if="!isshow">
      <div class="time">
        修改成功，将在{{count}}秒后返回首页
      </div>
    </div>
  </div>
</template>

<script>
  import particlesJs from "particles.js";
  import particlesConfig from "../assets/json/login/particles";
  export default {
    data() {
      return {
        //登陆表单的数据绑定对象
        editForm: {
          uid: "",
          pw: "",
          repw: "",
          type: ""
        },
        //    表单的验证规则
        editFormRules: {
          pw: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
          ],
          repw: [
            { required: true, message: "请再次输入密码", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
          ]
        },
        isshow: true,
        count: "" //倒计时
      };
    },
    mounted() {
      this.editForm.type = window.sessionStorage.getItem('utype')
      if (this.editForm.type === 'user') {
        this.editForm.uid = window.sessionStorage.getItem('uid')
      } else {
        this.editForm.uid = window.sessionStorage.getItem('aid')
      }
      this.init();
    },
    methods: {
      init() {
        particlesJS("particles-js", particlesConfig);
      },
      goBack() {
        window.history.go(-1)
      },
      //    点击重置按钮，重置登录表单
      reseteditForm() {
        this.$refs.editFormRef.resetFields();
      },
      editpw() {
        //表单预验证
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return;
          if (this.editForm.pw !== this.editForm.repw) {
            return this.$message.error("请确保两次密码输入一致");
          }
          const { data: res } = await this.$http.put("editpw", this.editForm);
          if (res.meta.status !== 200) {
            return this.$message.error("修改密码失败");
          }
          this.$message.success("修改密码成功");
          this.isshow = false
          this.startDivi()
        });
      },
      //倒计时
      startDivi() {
        const TIME_COUNT = 5;
        if (!this.timer) {
          this.count = TIME_COUNT;
          this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
              this.count--;
            } else {
              clearInterval(this.timer);
              this.timer = null;
              //跳转的页面写在此处
              if (this.editForm.type === 'user') {
                this.$router.push({
                  path: '/user'
                });
              } else {
                this.$router.push({
                  path: '/admin'
                });
              }
            }
          }, 1000)
        }
      }
    }
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
    width: 450px;
    height: 300px;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .time {
      height: 100%;
      width: 100%;
      line-height: 300px;
      text-align: center;

      span {
        color: royalblue;
      }
    }
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
