<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="lj-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入编号" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>
      <el-table :data="userList" @row-click="getUserEq" ref="table" row-key="id">
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column prop="uid" label="编号"></el-table-column>
        <el-table-column prop="uname" label="姓名"></el-table-column>
        <el-table-column prop="email" label="邮箱"></el-table-column>
        <el-table-column prop="mobile" label="电话"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="修改" placement="top" :enterable="false">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.uid)"></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="重置密码" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="resetpwById(scope.row.uid)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </div>
    <!-- t添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
      <!-- 内容主题区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="编号" prop="uid">
          <el-input v-model="addForm.uid"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="uname">
          <el-input v-model="addForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pw">
          <el-input v-model="addForm.pw" type="password"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="30%" @close="editDialogClosed">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.uname" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUerInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      //邮箱检验规则
      var checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (regEmail.test(value)) {
          return cb();
        }
        cb(new Error("请输入合法邮箱"));
      };
      //手机检验规则
      var checkMobile = (rule, value, cb) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]}18[57]|14[57])[0-9]{8}$/;
        if (regMobile.test(value)) {
          return cb();
        }
        cb(new Error("请输入合法电话号码"));
      };
      return {
        //获取用户列表的参数对象
        queryInfo: {
          query: "",
          pagenum: 1,
          pagesize: 5
        },
        userList: [],
        total: 0,
        addDialogVisible: false,
        addForm: {
          uid: "",
          uname: "",
          pw: "",
          email: "",
          mobile: ""
        },
        addFormRules: {
          uid: [
            { required: true, message: "请输入编号", trigger: "blur" },
            { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur" }
          ],
          uname: [
            { required: true, message: "请输入用户名", trigger: "blur" },
            { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
          ],
          pw: [
            { required: true, message: "请输入密码", trigger: "blur" },
            { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur" }
          ],
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { validator: checkEmail, trigger: "blur" }
          ],
          mobile: [
            { required: true, message: "请输入电话", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" }
          ]
        },
        //修改框显示与隐藏
        editDialogVisible: false,
        editForm: {},
        editFormRules: {
          email: [
            { required: true, message: "请输入邮箱", trigger: "blur" },
            { validator: checkEmail, trigger: "blur" }
          ],
          mobile: [
            { required: true, message: "请输入电话", trigger: "blur" },
            { validator: checkMobile, trigger: "blur" }
          ]
        },
        setRoleDialogVisible: false,
        userInfo: {},
        rolelist: [],
        selectedRoleId: ""
      };
    },
    created() {
      this.getUserList();
    },
    methods: {
      //获取用户列表
      async getUserList() {
        const { data: res } = await this.$http.get("userlist", {
          params: this.queryInfo
        });
        console.log(res)
        if (res.meta.status === 202) {
          this.userList = [];
          this.total = 0;
          return;
        }
        if (res.meta.status !== 200) {
          return this.$message.error(res.meta.msg);
        }
        this.userList = res.data.users;
        this.total = res.data.total;
      },
      //下拉
      getUserEq(row, event, column) {
        console.log('请求', row, column)
        // const { data: res } = await this.$http.post("adduser", this.addForm);
        //   if (res.meta.status !== 200) {
        //     return this.$message.error("添加用户失败,该编号已存在");
        //   }

        // const $table = this.$refs.table
        // $table.toggleRowExpansion(row, true)

      },
      //监听pagesize的变化
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize;
        this.getUserList();
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage;
        this.getUserList();
      },
      //监听添加用户对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields();
      },
      addUser() {
        //检验表单 正确valid=true
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.post("adduser", this.addForm);
          if (res.meta.status !== 200) {
            return this.$message.error("添加用户失败,该编号已存在");
          }
          this.$message.success("添加用户成功");
          this.addDialogVisible = false;
          this.getUserList();
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
      editUerInfo() {
        // 表单预验证
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return;
          const { data: res } = await this.$http.put("edituser", this.editForm);
          if (res.meta.status !== 200) {
            return this.$message.error("更新用户失败");
          }
          this.$message.success("更新用户成功");
          this.editDialogVisible = false;
          this.getUserList();
        });
      },
      //删除
      async removeUserById(uid) {
        //弹窗提示
        const confirmResult = await this.$confirm(
          "此操作将永久删除该用户, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).catch(err => {
          return err;
        });
        //如果用户确认删除，返回字符串 confirm 取消则返回字符串 cnacel
        if (confirmResult !== "confirm") {
          return this.$message.info("已取消删除");
        }
        const { data: res } = await this.$http.delete("deluser?uid=" + uid);
        if (res.meta.status !== 200) {
          this.$message.error("删除用户失败");
        }
        this.$message.success("删除用户成功");
        this.getUserList();
      },
      //重置用户密码
      async resetpwById(uid) {
        //弹窗提示
        const confirmResult = await this.$confirm(
          "此操作将重置用户" + uid + "密码为123456, 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }
        ).catch(err => {
          return err;
        });
        //如果用户确认删除，返回字符串 confirm 取消则返回字符串 cnacel
        if (confirmResult !== "confirm") {
          return this.$message.info("已取消重置密码");
        }
        const { data: res } = await this.$http.put("resetpw", { uid: uid });
        if (res.meta.status !== 200) {
          return this.$message.error("重置密码失败");
        }
        this.$message.success("重置密码成功");
      }
    }
  };
</script>

<style lang="less" scoped>
</style>
