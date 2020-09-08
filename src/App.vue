<template>
  <div id="app" ref="homePage">
    <el-scrollbar>
      <!-- 路由占位符 -->
      <router-view></router-view>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        height: 0
      }
    },
    mounted() {
       this.height =   `${document.documentElement.clientHeight}`;
       window.onresize = function() {
        this.height = `${document.documentElement.clientHeight}`;
        console.log(this.height)
      };
    },
     watch: {
      // 如果 `clientHeight` 发生改变，这个函数就会运行
      height: function () {
        this.changeFixed(this.height)
      }
    },
    methods:{
      changeFixed(height){                        //动态修改样式
        console.log(height);
        this.$refs.homePage.style.height = height+'px';

      },
    }
  };
</script>

<style>
  @import "./assets/fonts/iconfont.css";
  #app {
    min-height: 800px;
  }
</style>
