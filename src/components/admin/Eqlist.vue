<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>设备管理</el-breadcrumb-item>
      <el-breadcrumb-item>设备列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input :placeholder="queryInfo.type == 0 ? '请输入设备编号' : '请输入设备名称'" v-model="queryInfo.query" clearable @clear="getEqList" class="input-with-select">
            <el-select v-model="queryInfo.type" slot="prepend" placeholder="请选择">
              <el-option label="编号 " value="0"></el-option>
              <el-option label="名称 " value="2"></el-option>
              <el-option label="综合 " value="1"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="getEqList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加设备</el-button>
        </el-col>
      </el-row>
      <!-- 表格区域 -->
      <!-- 按编号名称的表格 -->
      <el-table :data="eqList" border stripe v-if="tableType != 1">
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
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="removeEqById(scope.row.eid)"
              ></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="报修" placement="top" :enterable="false">
              <el-button
                type="warning"
                icon="el-icon-paperclip"
                size="mini"
                @click="repairEqById(scope.row.eid,scope.row.state)"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 按综合的表格 -->
      <el-table :data="eqList" border stripe v-if="tableType == 1">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="ename" label="名称"></el-table-column>
        <el-table-column prop="num" label="数量"></el-table-column>
        <el-table-column prop="emanufacture" label="生产厂家"></el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- t添加设备对话框 -->
    <el-dialog title="添加设备" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="编号" prop="eid">
          <el-input v-model="addForm.eid"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="ename">
          <el-input v-model="addForm.ename"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="emanufacture">
          <el-input v-model="addForm.emanufacture"></el-input>
        </el-form-item>

        <el-form-item label="购买日期" prop="buydate">
          <!-- <el-input v-model="addForm.buydate" disabled></el-input> -->
          <el-date-picker
            v-model="addForm.buydate"
            type="date"
            placeholder="选择日期"
            disabled
            >
          </el-date-picker>
        </el-form-item>
         <el-form-item label="状态" prop="state">
          <el-input v-model="addForm.state" disabled></el-input>
        </el-form-item>
        <el-form-item label="位置" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addEq">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改设备对话框 -->
    <el-dialog title="修改设备" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="编号" prop="eid">
          <el-input v-model="editForm.eid" disabled></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="ename">
          <el-input v-model="editForm.ename"></el-input>
        </el-form-item>
        <el-form-item label="厂家" prop="emanufacture">
          <el-input v-model="editForm.emanufacture"></el-input>
        </el-form-item>
        <el-form-item label="购买日期" prop="buydate">
          <!-- <el-input v-model="editForm.buydate" disabled></el-input> -->
          <el-date-picker
            v-model="editForm.buydate"
            type="date"
            placeholder="选择日期"
            disabled
            >
          </el-date-picker>
        </el-form-item>
         <el-form-item label="状态" prop="state">
          <el-select v-model="editForm.state" placeholder="请选择" style="width: 220px" disable>
            <el-option label="可借" value="可借"></el-option>
            <!-- <el-option label="借出" value="借出"></el-option> -->
            <el-option label="教室在用" value="教室在用"></el-option>
            <!-- <el-option label="待维修" value="待维修"></el-option>
            <el-option label="报废" value="报废"></el-option> -->
          </el-select>
        </el-form-item>

        <el-form-item label="位置" prop="address">
          <el-input v-model="editForm.address"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editEqInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //获取设备列表的参数对象
      queryInfo: {
        type: '0',
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      eqList: [],
      total: 0,
      addDialogVisible: false,
      addForm: {
        eid: "",
        ename: "",
        address: "",
        state: '可借',
        emanufacture: "",
        buydate: new Date()
      },
      addFormRules: {
        eid: [
          { required: true, message: "请输入编号", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        ename: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        emanufacture: [
          { required: true, message: "请输入生产厂家", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入位置", trigger: "blur" }
        ]
      },
      //修改框显示与隐藏
      editDialogVisible: false,
      editForm: {},
      editFormRules: {
        ename: [
          { required: true, message: "请输入名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
        ],
        emanufacture: [
          { required: true, message: "请输入生产厂家", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入位置", trigger: "blur" }
        ]
      },
      setRoleDialogVisible: false,
      userInfo: {},
      rolelist: [],
      selectedRoleId: "",
      tableType: "0",
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
      console.log(res.data.eq)
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
    //监听添加设备对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },
    addEq() {
      //检验表单 正确valid=true
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.post("addeq", this.addForm);
        if (res.meta.status !== 200) {
          return this.$message.error("添加设备失败,该编号已存在");
        }
        this.$message.success("添加设备成功");
        this.addDialogVisible = false;
        this.getEqList();
      });
    },
    //展示修改对话框
    showEditDialog(row) {
      this.editForm = row;
      this.editDialogVisible = true;
    },
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },
    //修改框表单预验证并提交
    editEqInfo() {
      // 表单预验证
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return;
        const { data: res } = await this.$http.put("editeq", this.editForm);
        if (res.meta.status !== 200) {
          return this.$message.error("更新设备失败");
        }
        this.$message.success("更新设备成功");
        this.editDialogVisible = false;
        this.getEqList();
      });
    },
    //删除
    async removeEqById(eid) {
      //弹窗提示
      const confirmResult = await this.$confirm(
        "此操作将永久删除该设备, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      //如果设备确认删除，返回字符串 confirm 取消则返回字符串 cnacel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消删除");
      }
      const { data: res } = await this.$http.delete("deleq?eid=" + eid);
      if (res.meta.status !== 200) {
        return this.$message.error("删除设备失败");
      }
      this.$message.success("删除设备成功");
      this.getEqList();
    },
    async repairEqById(eid,state) {
      if (state === '报修' || state === '报废') {
        return this.$message.error("此设备不可报修");
      }
      //弹窗提示
      const confirmResult = await this.$confirm(
        "此操作报修设备, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      ).catch(err => {
        return err;
      });
      //如果设备确认删除，返回字符串 confirm 取消则返回字符串 cnacel
      if (confirmResult !== "confirm") {
        return this.$message.info("已取消报修");
      }
      const { data: res } = await this.$http.post("repaireq", { eid: eid,aid: this.aid });
      if (res.meta.status !== 200) {
        return this.$message.error("设备报修失败");
      }
      this.$message.success("设备报修成功");
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
