<template>
  <div class="hello">
    <el-page-header @back="goBack" content="图表">
    </el-page-header>

    <div class="a_box">
      <a href="http://ljweb.club:3003/" target="view_window" class="el-icon-full-screen"></a>
    </div>
    <div class="iframe-box">
      <iframe style="width:100%;height:100%;" :src="url" frameborder="0"></iframe>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data() {
      return {
        orgOptions: {},
        url: 'http://ljweb.club:3003/'
      }
    },
    mounted() {
      this.orgOptions = {
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [{
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
          smooth: true
        }]
      }
    },
    methods: {
      goBack() {
        window.history.go(-1)
      }
    }
  }
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

  .hello {
    height: 100%;
    width: 100%;
  }

  .iframe-box {
    height: 90%;
    width: 90%;
    margin: 0 auto;
  }

  .a_box {
    height: 30px;
    width: 30px;
    background: rgba(255, 255, 255.1);
    position: absolute;
    bottom: 70px;
    border-radius: 15px;

    a {
      display: inline-block;
      width: 30px;
      line-height: 30px;
      text-align: center;
      text-decoration: none;
    }
  }
</style>
