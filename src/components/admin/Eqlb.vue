<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="2" :router="true" class="el-menu-vertical-demo">
          <el-menu-item index="eqlend">
            <i class="el-icon-zoom-out"></i>
            <span slot="title">借出</span>
          </el-menu-item>
          <el-menu-item index="eqback">
            <i class="el-icon-zoom-in"></i>
            <span slot="title">归还</span>
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
