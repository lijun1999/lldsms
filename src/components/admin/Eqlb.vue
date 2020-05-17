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
  .el-menu-item:hover {
    background-color: #fff;
  }
  .el-menu-item.is-active {
    background-color: #fff;
  }
}
</style>
