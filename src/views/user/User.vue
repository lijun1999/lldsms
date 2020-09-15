<template>
  <div class="body-center">
    <el-container>
      <el-header height="70px">
        <div class="header-left">
          <!-- <img src="../../assets/logo2.jpg" alt /> -->
          <h1>流浪大师设备管理系统</h1>
        </div>
        <el-menu :router="true" class="el-menu-demo" mode="horizontal" active-text-color="#1989fa" :default-active="'/'+NavActive">
          <el-menu-item index="design">指南</el-menu-item>
          <el-submenu index="2">
            <template slot="title">设备查询</template>
            <el-menu-item index="/user/eqsel">查找设备</el-menu-item>
            <el-menu-item index="/user/myeq">已借设备</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">我的</template>
            <el-menu-item index="/editpw">修改密码</el-menu-item>
            <el-menu-item index="5" @click="logout">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        NavActive: ''
      };
    },
    created() {
      this.checkType()
    },
    beforeMount() {
      this.getActiveNav();
    },
    methods: {
      getActiveNav: function () {
        const currentUrl = window.location.href;
        this.NavActive = currentUrl.split('#')[1].replace("/", "");
      },
      checkType() {
        const userType = window.localStorage.getItem('utype')
        if (!window.localStorage.getItem('token')) {
          return this.$router.push("/login");
        }
        if (userType === 'user') {
          return this.$router.push("/user");
        } else if (userType !== 'admin') {
          return this.$router.push("/login");
        }
      },
      logout() {
        window.localStorage.clear();
        this.$router.push("/index");
        this.$message.success("退出成功");
      }
    }
  };
</script>

<style lang="less" scoped>
  .iconfont {
    margin-right: 10px;
  }


  .el-menu {
    float: right;
    margin-left: 50px;
    margin-top: 9px;
    border: 0;
    background: #2b4b6b;

    .is-active {
      background: transparent !important;
    }

    .el-menu-item:hover {
      color: #38B2FF !important;
      background: transparent;
    }
  }

  .header-left {
    float: left;
    color: bisque;

    img {
      width: 155px;
      height: 50px;
      margin-top: 15px;
    }
  }
</style>
