<template>
  <div>
    <el-page-header @back="goBack" content="项目开发时间线">
    </el-page-header>

    <div class="box">
      <div class="radio">
        排序:
        <el-radio-group v-model="reverse">
          <el-radio :label="false">正序</el-radio>
          <el-radio :label="true">倒序</el-radio>
        </el-radio-group>
      </div>
      <div style="height: 735px;">
        <el-scrollbar>
          <el-timeline :reverse="reverse">
            <el-timeline-item timestamp="2020/2/4" placement="top">
              <div class="lj-card">
                <h4>创建数据库</h4>
                <p>安分的四氧化三铁 提交于 2020/2/4 20:46</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/2/8" placement="top">
              <div class="lj-card">
                <h4>
                  建立vue项目
                  <br />建立服务器项目
                  <br />完成登录页面以及登录功能
                </h4>
                <p>安分的四氧化三铁 提交于 2020/2/8 18:01</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/2/14" placement="top">
              <div class="lj-card">
                <h4>
                  完成管理员主界面及退出登录功能
                  <br />完成用户列表页面及获取用户列表功能
                </h4>
                <p>安分的四氧化三铁 提交于 2020/2/14 17:17</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/2/15" placement="top">
              <div class="lj-card">
                <h4>完成用户列表页面增加、修改、删除用户功能<br />优化获取用户列表功能</h4>
                <p>安分的四氧化三铁 提交于 2020/2/15 20:25</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/2/16" placement="top">
              <div class="lj-card">
                <h4>
                  添加看板娘
                  <br />完成设备列表页面及获取列表、增删改功能
                  <br />完成指南页面主体和开发时间线子页面
                  <br />完成设备借还页面及获取设备信息功能
                </h4>
                <p>安分的四氧化三铁 提交于 2020/2/16 20:51</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/4/25" placement="top">
              <div class="lj-card">
                <h4>
                  修复设备借出页若干bug
                  <br />完成设备归还功能
                  <br />完成websocket服务器搭建并测试
                </h4>
                <p>安分的四氧化三铁 提交于 2020/4/25 17:43</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/5/12" placement="top">
              <div class="lj-card">
                <h4>
                  修复服务器设备借出与归还功能若干bug
                  <br />重构数据库内容
                  <br />修改所有数据库查询语句
                </h4>
                <p>安分的四氧化三铁 提交于 2020/5/12 20:43</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/5/13" placement="top">
              <div class="lj-card">
                <h4>
                  完成设备报修与已维修更改设备状态功能
                  <br />完成用户管理员修改密码功能
                  <br />完成用户列表页用户密码重置功能
                </h4>
                <p>安分的四氧化三铁 提交于 2020/5/13 21:09</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/5/17" placement="top">
              <div class="lj-card">
                <h4>
                  将服务器和数据库部署到腾讯云
                  <br />用electron打包项目
                </h4>
                <p>安分的四氧化三铁 提交于 2020/5/17 21:09</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/8/11" placement="top">
              <div class="lj-card">
                <h4>
                  优化服务器代码结构，提升健壮性和可读性
                  <br />新增token验证功能
                  <br /> 完成API接口文档V1
                  <br />提升网页性能300%，提升首屏加载速度
                  <br />加入网页跳转及请求数据进度条，提升系统友好性
                  <br />更改网页UI颜色，加入部分动画效果，让网页更加美观
                  <br />将网页部署到http://ljweb.club/lldsms/
                </h4>
                <p>安分的四氧化三铁 提交于 2020/8/11 15:22</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/8/12" placement="top">
              <div class="lj-card">
                <h4>
                  登录页面新增验证码功能
                  <br />新增首页，网站首屏由登录页改为首页
                </h4>
                <p>安分的四氧化三铁 提交于 2020/8/12 9:32</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/8/15" placement="top">
              <div class="lj-card">
                <h4>
                  修复设备列表页和用户列表页分页bug
                </h4>
                <p>安分的四氧化三铁 提交于 2020/8/15 11:05</p>
              </div>
            </el-timeline-item>
            <el-timeline-item timestamp="2020/8/22" placement="top">
              <div class="lj-card">
                <h4>
                  新增首屏加载动画，提升用户体验
                </h4>
                <p>安分的四氧化三铁 提交于 2020/8/22 20:05</p>
              </div>
            </el-timeline-item>
          </el-timeline>
        </el-scrollbar>
      </div>
    </div>
    <el-backtop target=".el-scrollbar .el-scrollbar__wrap">
      <div style="{
        height: 100%;
        width: 100%;
        background-color: #f2f5f6;
        box-shadow: 0 0 6px rgba(0,0,0, .12);
        text-align: center;
        line-height: 40px;
        color: #1989fa;
      }">UP</div>
    </el-backtop>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        reverse: true
      };
    },
    methods: {
      goBack() {
        window.history.go(-1)
      }
    }
  };
</script>

<style lang="less" scoped>
  .el-page-header {
    color: rgba(255, 255, 255, .3);
    margin-left: 40px;
    line-height: 60px;
  }

  .el-page-header:hover {
    color: rgba(255, 255, 255, .8);
  }

  .box {
    margin: 20px 40px;
  }

  .radio {
    margin-left: 30px;
    margin-bottom: 20px;
    font-size: 14px;
    color: rgba(255, 255, 255, .7);

    .el-radio-group {
      margin-left: 15px;

      .el-radio {
        color: rgba(255, 255, 255, .5);
      }
    }
  }

  .lj-card {
    color: rgba(255, 255, 255, .5);
  }

  .el-timeline {
    width: 95%;
  }

  .el-backtop {
    border-radius: 12px;
    overflow: hidden;
  }
</style>
