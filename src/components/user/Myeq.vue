<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>已借设备</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <!-- 表格区域 -->
      <el-table :data="eqList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="lid" label="订单编号"></el-table-column>
        <el-table-column prop="eid" label="设备编号"></el-table-column>
        <el-table-column prop="ename" label="设备名称"></el-table-column>
        <el-table-column prop="outdate" label="借出时间">
          <template slot-scope="scope">{{scope.row.outdate| datetimeFormat}}</template>
        </el-table-column>
        <el-table-column prop="backdate" label="归还时间">
          <template slot-scope="scope">{{scope.row.backdate == '' ? '未还' : scope.row.backdate| datetimeFormat}}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      eqList: []
    };
  },
  created() {
    this.getEqList();
  },
  methods: {
    //获取设备列表
    async getEqList() {
      const uid = window.sessionStorage.getItem('uid')
      const { data: res } = await this.$http.get("myeqlist", {
        params: { uid }
      });
      if (res.meta.status === 202) {
        this.eqList = [];
        this.total = 0;
        return;
      }
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.eqList = res.data.eq;
    },
    //监听pagesize的变化
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getEqList();
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getEqList();
    }
  }
};
</script>

<style lang="less" scoped>
</style>
