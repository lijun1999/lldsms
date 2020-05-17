<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备借还</el-breadcrumb-item>
      <el-breadcrumb-item>设备归还</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入编号" v-model="sel.eid" clearable>
            <el-button slot="append" icon="el-icon-search" @click="geteq"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="eqBack">归还</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="deltabbleData">全部移除</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="eid" label="设备编号"></el-table-column>
        <el-table-column prop="uid" label="用户编号"></el-table-column>
        <el-table-column prop="emanufacture" label="生产厂家"></el-table-column>
        <el-table-column prop="uname" label="用户名称"></el-table-column>
        <el-table-column prop="uname" label="用户名称"></el-table-column>
        <el-table-column prop="outdate" label="借出日期">
          <template slot-scope="scope">{{scope.row.outdate| dateFormat}}</template>
        </el-table-column>
        <el-table-column prop="days" label="天数">
          <template slot-scope="scope">{{scope.row.days + '天'}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deltableDataItem(scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      aid: null,
      sel: {
        eid: ""
      },
      tableData: [],
      nowTable: [],
      backFormRules: {
        uid: [
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" },
          { required: true, message: "请输入编号", trigger: "blur" }
        ]
      },
      path: "ws://127.0.0.1:8005",
      socket: ""
    };
  },
  mounted() {
    this.aid = window.sessionStorage.getItem('aid')
    // 初始化
    // this.init();
  },
  methods: {
    init() {
      if (typeof WebSocket === "undefined") {
        alert("您的浏览器不支持socket");
      } else {
        // 实例化socket
        this.socket = new WebSocket(this.path);
        // 监听socket连接
        this.socket.onopen = this.open;
        // 监听socket错误信息
        this.socket.onerror = this.error;
        // 监听socket消息
        this.socket.onmessage = this.getMessage;
      }
    },
    open() {
      console.log("socket连接成功");
      var uid = "uid2";
      this.socket.send("game2");
    },
    error() {
      console.log("连接错误");
    },
    getMessage(msg) {
      this.sel = {
        eid: msg.data
      }
      this.geteq()
    },
    send() {
      this.socket.send(params);
    },
    close() {
      console.log("socket已经关闭");
    },
    //获取设备信息
    async geteq() {
      if (this.sel.eid === "") {
        return this.$message.error("请输入设备编号");
      }
      var that = this;
      //判断eid是否已存在于nowTable中
      var iseid = false;
      this.nowTable.find(function(value) {
        if (value === that.sel.eid) {
          iseid = true;
        }
      });
      if (iseid) {
        return this.$message.error("该设备已在列表中");
      }
      const { data: res } = await this.$http.get("backseleq", { params: this.sel });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      if (res.data[0].state !== '借出') {
        return this.$message.error('该设备未借出，无归还');
      }
      //获取当前时间
      const nowdate = new Date()
      const nd = nowdate.getTime()
      const outdate = new Date(res.data[0].outdate)
      const od = outdate.getTime()
      res.data[0].days = parseInt((nd - od) / (1000 * 60 * 60 * 24))
      this.nowTable.push(res.data[0].eid);
      this.tableData.push(res.data[0]);
    },
    // 删除表格中一行内容
    deltableDataItem(index) {
      this.nowTable.splice(index, 1);
      this.tableData.splice(index, 1);
    },
    // 移除表格全部内容
    deltabbleData() {
      this.tableData = [];
      this.nowTable = [];
    },
    //归还
    async eqBack() {
      if (this.nowTable.length === 0) {
        return this.$message.error("请添加要归还的设备");
      }
      const { data: res } = await this.$http.post("eqback", {
        eqback: this.nowTable,
        aid: this.aid
      });
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      this.$message.success("归还成功");
      this.backDialogVisible = false;
      this.deltabbleData();
    }
  },
  destroyed() {
    // 销毁监听
    // this.socket.onclose = this.close;
  }
};
</script>

<style lang="less" scoped>
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
