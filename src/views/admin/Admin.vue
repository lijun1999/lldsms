<template>
  <div class="body-center">
    <el-container>
      <el-header height="70px">
        <div class="header-left">
          <h1>流浪大师设备管理系统</h1>
        </div>
        <el-menu :router="true" class="el-menu-demo" mode="horizontal" active-text-color="#1989fa" :default-active="NavActive != 'design' ? '/'+NavActive : NavActive">
          <el-menu-item index="design">指南</el-menu-item>
          <el-submenu index="2">
            <template slot="title">用户管理</template>
            <el-menu-item index="/admin/userlist">用户列表</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">设备管理</template>
            <el-menu-item index="/admin/eqlist">设备列表</el-menu-item>
            <el-menu-item index="/admin/eqlb">设备借还</el-menu-item>
            <el-menu-item index="/admin/repair">报修列表</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">数据</template>
            <!-- <el-menu-item index="/chart">
              <i class="el-icon-data-analysis"></i>
              <span slot="title">图表</span>
            </el-menu-item> -->
            <el-menu-item index="/echart">
              <i class="el-icon-pie-chart"></i>
              <span slot="title">数据图表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">下载APP</template>
            <div style="height: 200px; width: 200px">
              <img src="http://ljweb.club/file/images/downloadMsMobile.png" style="height:100%;width:100%" />
            </div>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title">我的</template>
            <el-menu-item index="/editpw">修改密码</el-menu-item>
            <el-menu-item index="7" @click="logout">退出登录</el-menu-item>
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
    beforeMount() {
      this.getActiveNav();
    },
    created() {
      this.checkType();
    },
    methods: {
      getActiveNav: function () {
        let currentUrl = window.location.href;
        this.NavActive = currentUrl.split('#')[1].replace("/", "");
        console.log(this.NavActive)
        if (this.NavActive == 'admin/sysinfo' || this.NavActive == 'admin/timeline') {
          this.NavActive = 'design'
          console.log(this.NavActive)
        }
      },
      checkType() {
        const userType = window.localStorage.getItem("utype");
        if (!window.localStorage.getItem('token')) {
          return this.$router.push("/login");
        }
        if (userType === "user") {
          return this.$router.push("/user");
        } else if (userType !== "admin") {
          return this.$router.push("/login");
        }
      },
      logout() {
        window.localStorage.clear();
        this.$router.push("/index");
        this.$message.success("退出成功");
      },
    },
  };
</script>

<style lang="less" scoped>
  .iconfont {
    margin-right: 10px;
  }

  .el-header {
    // border-bottom: 1px solid #dcdfe6;
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
