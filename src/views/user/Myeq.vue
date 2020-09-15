<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备查询</el-breadcrumb-item>
      <el-breadcrumb-item>已借设备</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lj-card">
      <div style="height: 700px">
        <el-scrollbar>
          <!-- 表格区域 -->
          <el-table :data="eqList">
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="lid" label="订单编号"></el-table-column>
            <el-table-column prop="eid" label="设备编号"></el-table-column>
            <el-table-column prop="ename" label="设备名称"></el-table-column>
            <el-table-column prop="outdate" label="借出时间">
              <template slot-scope="scope">{{scope.row.outdate| dateFormat}}</template>
            </el-table-column>
            <el-table-column prop="backdate" label="归还时间">
              <template slot-scope="scope">{{scope.row.backdate| dateFormat}}</template>
            </el-table-column>
            <el-table-column label="天数">
              <template slot-scope="scope">
                <span :class="calculateDays(scope.row.outdate,scope.row.backdate) > 30 ? 'overtime' : ''">{{calculateDays(scope.row.outdate,scope.row.backdate)}}天</span></template>
            </el-table-column>
          </el-table>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        eqList: [],
        uid: ''
      };
    },
    created() {
      this.getEqList();
    },
    methods: {
      //计算天数
      calculateDays(outdate, backdate) {
        if (backdate) {
          const startDate = Date.parse(outdate);
          const endDate = Date.parse(backdate);
          const days = (endDate - startDate) / (1 * 24 * 60 * 60 * 1000);
          return days;
        } else {
          const nowDate = new Date()
          const startDate = Date.parse(outdate)
          const days = Math.ceil((nowDate - startDate) / (1 * 24 * 60 * 60 * 1000));
          return days;
        }
      },
      //获取设备列表
      async getEqList() {
        const uid = window.localStorage.getItem("uid")
        const { data: res } = await this.$http.get("myeqlist", {
          params: { uid }
        });
        console.log(res)
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
  .overtime {
    color: #FF6347;
  }
</style>
