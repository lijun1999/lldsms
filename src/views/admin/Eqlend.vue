<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备借还</el-breadcrumb-item>
      <el-breadcrumb-item>设备借出</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lj-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入编号" v-model="sel.eid" clearable>
            <el-button slot="append" icon="el-icon-search" @click="geteq"></el-button>
          </el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" @click="lendDialogOpen">借出</el-button>
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="deltabbleData">全部移除</el-button>
        </el-col>
      </el-row>
      <el-table :data="tableData">
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
        <el-table-column fixed="right" label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="deltableDataItem(scope.$index)">移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 用户信息框 -->
    <el-dialog title="用户信息" :visible.sync="lendDialogVisible" width="30%" @close="lendDialogClosed">
      <el-form :rules="lendFormRules" ref="lendFormRef" label-width="70px" :model="userForm">
        <el-form-item label="用户号" prop="uid">
          <el-input v-model="userForm.uid"></el-input>
        </el-form-item>
        <!-- 底部区域 -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eqLend">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  // import serialport from 'serialport'
  export default {
    data() {
      return {
        aid: null,
        sel: {
          eid: ""
        },
        tableData: [],
        nowTable: [],
        userForm: {
          uid: ""
        },
        lendDialogVisible: false,
        lendFormRules: {
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

      //串口
      // serialport.list().then(
      // 　　ports => {

      // 　　　　//ports 串口
      // 　　　　console.log(ports)
      // 　　}
      // )
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
        console.log()
        this.nowTable.find(function (value) {
          if (value === that.sel.eid) {
            iseid = true;
          }
        });
        if (iseid) {
          return this.$message.error("该设备已在列表中");
        }
        const { data: res } = await this.$http.get("lendseleq", { params: this.sel });
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        if (res.data[0].state !== '可借') {
          return this.$message.error('设备状态不可借');
        }
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
      //借出
      async eqLend() {
        //检验表单 正确valid=true
        this.$refs.lendFormRef.validate(async valid => {
          if (!valid) return;
          console.log('dianji')
          const { data: res } = await this.$http.post("eqlend", {
            eqlend: this.nowTable,
            uid: this.userForm.uid,
            aid: this.aid
          });
          console.log(res.meta.status)
          if (res.meta.status !== 200) {
            return this.$message.error(res.meta.msg);
          }
          this.$message.success("借出成功");
          this.lendDialogVisible = false;
          this.deltabbleData();
        });
      },
      lendDialogOpen() {
        if (this.nowTable.length === 0) {
          return this.$message.error("请先选择设备");
        }
        this.lendDialogVisible = true;
      },
      lendDialogClosed() {
        this.$refs.lendFormRef.resetFields();
      }
    },
    destroyed() {
      // 销毁监听
      // this.socket.onclose = this.close;
    }
  };
</script>

<style lang="less" scoped>
  .lj-card {
    margin-left: 20px;
  }
</style>
