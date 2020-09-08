<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备查询</el-breadcrumb-item>
      <el-breadcrumb-item>查找设备</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lj-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input :placeholder="queryInfo.type == 0 ? '请输入设备编号' : '请输入设备名称'" v-model="queryInfo.query" clearable @clear="getEqList" class="input-with-select">
            <el-select v-model="queryInfo.type" slot="prepend" placeholder="请选择" style="width: 80px">
              <el-option label="编号 " value="0"></el-option>
              <el-option label="名称 " value="2"></el-option>
              <el-option label="综合 " value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getEqList()"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <!-- 按编号名称的表格 -->
      <el-table :data="eqList" v-if="tableType != 1" :cell-style="{background: transparent}">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="eid" label="编号"></el-table-column>
        <el-table-column prop="ename" label="名称"></el-table-column>
        <!-- <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="snum" label="库存量"></el-table-column> -->
        <el-table-column prop="emanufacture" label="生产厂家"></el-table-column>
        <el-table-column prop="buydate" label="购买日期">
          <template slot-scope="scope">{{scope.row.buydate| dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="address" label="位置"></el-table-column>
        <el-table-column prop="state" label="状态"></el-table-column>
      </el-table>
      <!-- 按综合的表格 -->
      <el-table :data="eqList" border stripe v-if="tableType == 1">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="ename" label="名称"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="emanufacture" label="生产厂家"></el-table-column>
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
          type: "0",
          query: "",
          pagenum: 1,
          pagesize: 5
        },
        eqList: [],
        total: 0,
        tableType: "0"
      };
    },
    created() {
      this.getEqList();
    },
    methods: {
      //获取设备列表
      async getEqList() {
        const { data: res } = await this.$http.get("eqlist", {
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
      }
    }
  };
</script>

<style lang="less" scoped>
</style>
