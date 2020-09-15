<template>
  <div class="index-box">
    <div class="header">
      <span @click="login">登录</span>
    </div>
    <el-scrollbar ref="scrollbar">
      <section>
        <img src="https://s1.ax1x.com/2020/08/25/dgbwKx.jpg" id="bg" :style="{top: bgTop}" />
        <img src="https://s1.ax1x.com/2020/08/25/dgbax1.png" id="moon" :style="{left: moonLeft}" />
        <img src="https://s1.ax1x.com/2020/08/25/dgb0r6.png" id="mountain" :style="{top: mountainTop}" />
        <img src="https://s1.ax1x.com/2020/08/25/dgbBqK.png" id="road" road :style="{top: roadTop}" />
        <h1 id="text" :style="{top: textTop}">流 浪 大 师</h1>
      </section>
      <div class="container">
        <div class="card">
          <div class="imgBx">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3125030378,2861943469&fm=26&gp=0.jpg" alt />
          </div>
          <div class="content">
            <h2>用户管理</h2>
            <p>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
          </div>
        </div>
        <div class="card">
          <div class="imgBx">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3125030378,2861943469&fm=26&gp=0.jpg" alt />
          </div>
          <div class="content">
            <h2>设备管理</h2>
            <p>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
          </div>
        </div>
        <div class="card">
          <div class="imgBx">
            <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3125030378,2861943469&fm=26&gp=0.jpg" alt />
          </div>
          <div class="content">
            <h2>数据分析</h2>
            <p>介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</p>
          </div>
        </div>
      </div>
      <footer class="footer">
        <span class="footer-left">©2020流浪大师. All Rights Reserved.|本站已萌萌哒(✪ω✪)运行{{time}}</span>
        <span class="footer-right">Powered by 安分的四氧化三铁| 蜀ICP备19038993号</span>
      </footer>
    </el-scrollbar>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        bgTop: 0,
        moonLeft: 0,
        mountainTop: 0,
        roadTop: 0,
        textTop: 0,
        startTime: new Date("2020-8-11 00:00:00"),
        time: 0,
        timer: null,
        screenHeight: window.innerHeight,
        showHeader: 0,
      };
    },
    mounted() {
      this.handleScroll();
      this.getTime();
      //监听视窗高度
      window.onresize = () => {
        return (() => {
          this.screenHeight = window.innerHeight;
        })();
      };
    },
    methods: {
      //监听滚动事件
      handleScroll() {
        const scrollbarEl = this.$refs.scrollbar.wrap;
        scrollbarEl.onscroll = () => {
          this.bgTop = scrollbarEl.scrollTop * 0.5 + "px";
          this.moonLeft = -scrollbarEl.scrollTop * 0.5 + "px";
          this.mountainTop = -scrollbarEl.scrollTop * 0.15 + "px";
          this.roadTop = scrollbarEl.scrollTop * 0.15 + "px";
          this.textTop = scrollbarEl.scrollTop * 1 + "px";
        };
      },
      getTime() {
        this.timer = setInterval(() => {
          const endTime = new Date();
          var date3 = endTime.getTime() - this.startTime.getTime(); //时间差的毫秒数
          //计算出相差天数
          var days = Math.floor(date3 / (24 * 3600 * 1000));
          //计算出小时数
          var leave1 = date3 % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
          var hours = Math.floor(leave1 / (3600 * 1000));
          //计算相差分钟数
          var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
          var minutes = Math.floor(leave2 / (60 * 1000));
          //计算相差秒数
          var leave3 = leave2 % (60 * 1000); //计算分钟数后剩余的毫秒数
          var seconds = Math.round(leave3 / 1000);
          this.time =
            days + "天" + hours + "小时" + minutes + "分钟" + seconds + "秒";
        }, 1000);
      },
      login() {
        this.$router.push("/login");
      },
    },
  };
</script>
<style lang="less" scoped>
  .index-box {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
  }

  // 头部
  .header {
    height: 40px;
    width: 100%;
    position: absolute;
    z-index: 999;
    position: fixed;
    top: 0;
    left: 0;
    transition: all 0.3s;

    span {
      float: right;
      width: 80px;
      color: rgba(255, 255, 255, 0.5);
      line-height: 40px;
      text-align: center;
      margin-right: 20px;
      cursor: default;
    }

    span:hover {
      color: rgba(255, 255, 255, 1);
    }
  }

  // 月亮区
  section {
    position: relative;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  section:before {
    content: "";
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 100px;
    background: linear-gradient(to top #0a2a43 transparent);
    z-index: 998;
  }

  section:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a2a43;
    z-index: 998;
    mix-blend-mode: color;
  }

  section img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  #text {
    position: relative;
    color: #ffffff;
    font-size: 10em;
    z-index: 1;
  }

  #road {
    z-index: 2;
  }

  // 第一介绍页
  .container {
    position: relative;
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    flex-wrap: wrap;
    padding: 30px;
  }

  .container .card {
    margin-top: 100px;
    position: relative;
    max-width: 300px;
    height: 215px;
    background: #fff;
    margin: 30px 10px;
    padding: 20px 15px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 5px 202px rgba(0, 0, 0, 0.5);
    transition: 0.3s ease-in-out;
  }

  .container .card:hover {
    height: 420px;
  }

  .container .card .imgBx {
    position: relative;
    width: 260px;
    height: 260px;
    top: -60px;
    left: 20px;
    z-index: 1;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  }

  .container .card .imgBx img {
    max-width: 100%;
    border-radius: 4px;
  }

  .container .card .content {
    position: relative;
    margin-top: -140px;
    padding: 10px 15px;
    text-align: center;
    color: #111;
    visibility: hidden;
    opacity: 0;
    transition: 0.3s ease-in-out;
  }

  .container .card:hover .content {
    visibility: visible;
    opacity: 1;
    margin-top: -40px;
    transition-delay: 0.3s;
  }

  ul {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  // 底部
  .footer {
    height: 60px;
    width: 100%;
    line-height: 60px;
    box-sizing: border-box;
    padding: 0 20px;
    color: rgba(255, 255, 255, 0.5);

    .footer-left {
      float: left;
    }

    .footer-right {
      float: right;
    }
  }
</style>
