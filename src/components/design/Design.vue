<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu :router="true" class="el-menu-vertical-demo" :default-active="NavActive" text-color="#6B8198">
          <el-menu-item index="sysinfo">
            <i class="el-icon-document"></i>
            <span slot="title">简介</span>
          </el-menu-item>
          <el-submenu index="3">
            <template slot="title">项目相关</template>
            <el-menu-item index="/timeline">
              <i class="el-icon-timer"></i>
              <span slot="title">开发时间线</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        NavActive: ''
      }
    },
    beforeMount() {
      this.getActiveNav();
    },
    methods: {
      getActiveNav: function () {
        const currentUrl = window.location.href.split('#')[1].replace("/", "");
        this.NavActive = currentUrl.split('/')[1]
        console.log(this.NavActive)
      }
    }
  }
</script>

<style lang="less" scoped>
  .el-menu {
    border: 0;
    background: transparent !important;
    border-right: 3px solid rgba(255, 255, 255, .3);
    height: 100%;


    .el-menu-item,
    .el-menu-item .is-active,
    .el-menu-item:hover {
      background: transparent !important;
    }
  }
</style>
