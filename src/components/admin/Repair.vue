<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>报修列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lj-card">
      <!-- 表格区域 -->
      <!-- 按编号名称的表格 -->
      <el-switch v-model="queryInfo.type" active-text="未修" inactive-text="已修" @change="switchChange">
      </el-switch>
      <el-table :data="eqList">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="rid" label="订单号编号"></el-table-column>
        <el-table-column prop="eid" label="设备编号"></el-table-column>
        <el-table-column prop="ename" label="设备名称"></el-table-column>
        <el-table-column prop="aid" label="报修人编号"></el-table-column>
        <el-table-column prop="uname" label="报修人名称"></el-table-column>
        <!-- <el-table-column prop="emanufacture" label="生产厂家"></el-table-column> -->
        <el-table-column prop="date" label="报修日期">
          <template slot-scope="scope">{{scope.row.date| datetimeFormat}}</template>
        </el-table-column>
        <el-table-column prop="repairdate" label="维修日期" v-if="!queryInfo.type">
          <template slot-scope="scope">{{scope.row.repairdate| datetimeFormat}}</template>
        </el-table-column>
        <el-table-column prop="state" label="状态" width="60px">
          <template slot-scope="scope">{{scope.row.state === '0' ? '待修' : '已修' }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80px" v-if="queryInfo.type">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="已修" placement="top" :enterable="false">
              <el-button type="success" icon="el-icon-check" size="mini" @click="repairedEqById(scope.row.eid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //获取设备列表的参数对象
        queryInfo: {
          type: true,
          query: "",
          pagenum: 1,
          pagesize: 5
        },
        eqList: [],
        total: 0,
        setRoleDialogVisible: false,
        userInfo: {},
        rolelist: [],
        selectedRoleId: "",

        aid: null
      };
    },
    created() {
      this.getEqList();
    },
    mounted() {
      this.aid = window.sessionStorage.getItem('aid')
    },
    methods: {
      //开关状态改变
      switchChange(e) {
        // console.log(e)
        // 重新获取列表
        this.getEqList()
      },
      //获取设备列表
      async getEqList() {
        const { data: res } = await this.$http.get("repaireqlist", {
          params: this.queryInfo
        });
        if (res.meta.status === 202) {
          this.eqList = [];
          this.total = 0;
          return;
        }
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.tableType = res.data.type
        this.eqList = res.data.eq;
        this.total = res.data.total;
      },
      //监听pagesize的变化
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize;
        this.getEqList();
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage;
        this.getEqList();
      },
      async repairedEqById(eid) {
        const { data: res } = await this.$http.put("repaired", { eid: eid });
        if (res.meta.status !== 200) {
          return this.$message.error("更改设备状态失败");
        }
        this.$message.success("已更改设备状态");
        this.getEqList();
      }
    }
  };
</script>

<style lang="less" scoped>
  .el-select {
    width: 80px;
  }
</style>
