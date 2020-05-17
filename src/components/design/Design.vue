<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu
          default-active="2"
          :router="true"
          class="el-menu-vertical-demo"
        >
          <el-menu-item index="sysinfo">
            <i class="el-icon-document"></i>
            <span slot="title">简介</span>
          </el-menu-item>
          <el-menu-item index="chart">
            <i class="el-icon-document"></i>
            <span slot="title">图表</span>
          </el-menu-item>
          <el-menu-item index="timeline">
            <i class="el-icon-timer"></i>
            <span slot="title">开发时间线</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style lang="less" scoped>
.el-menu {
  border: 0;
  .el-menu-item:hover {
    background-color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #fff;
  }
}
</style>
