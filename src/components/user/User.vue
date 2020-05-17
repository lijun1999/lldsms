<template>
  <div class="body-center">
    <el-container>
      <el-header height="70px">
        <div class="header-left">
          <img src="../../assets/logo2.jpg" alt />
        </div>
        <el-menu :router="true" class="el-menu-demo" mode="horizontal" active-text-color="#1989fa">
          <el-menu-item index="design">指南</el-menu-item>
          <el-submenu index="2">
            <template slot="title">设备查询</template>
            <el-menu-item index="/user/eqsel">查找设备</el-menu-item>
            <el-menu-item index="/user/myeq">已借设备</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">我的</template>
            <el-menu-item index="/user/editpw">修改密码</el-menu-item>
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
      isCollapse: false
    };
  },
  created() {
    this.checkType()
  },
  methods: {
    checkType() {
      const tokenStr = window.sessionStorage.getItem('utype')
      if (tokenStr === 'user') {
        return this.$router.push("/user");
      } else if (tokenStr !== 'admin') {
        return this.$router.push("/login");
      }
    },
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
      this.$message.success("退出成功");
    }
  }
};
</script>

<style lang="less" scoped>
.iconfont {
  margin-right: 10px;
}
.el-header {
  background-color: #fff;
  border-bottom: 1px solid #dcdfe6;
}
.el-menu {
  float: right;
  margin-left: 50px;
  margin-top: 9px;
}
.header-left {
  float: left;
  img {
    width: 155px;
    height: 50px;
    margin-top: 15px;
  }
}
</style>
