<template>
  <div class="index-box">
    <div class="header" :style="{opacity: showHeader}">
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
      <div class="auto-box">
        <div class="main-box">
          <div class="index-tit">
            <h1>更多的是精益求精的360°服务</h1>
            <p>千锤百炼打造全程服务</p>
          </div>
          <ul class="index-tserver">
            <li class="tserver-list1">
              用户管理
              <p class="animated zoomin">
                <a href="#">制定上云整体方案，实现专业、有序、安全迁移上云</a>
              </p>
            </li>
            <li class="tserver-list2">
              新手服务
              <p class="animated zoomin">
                <a href="#">提供云端架构、部署、产品和功能培训和指导</a>
              </p>
            </li>
            <li class="tserver-list3">
              网络安全服务
              <p class="animated zoomin">
                <a href="#">提供漏扫、态势感知、安全加固等全面网络安全防护服务</a>
              </p>
            </li>
            <li class="tserver-list4">
              资质服务
              <p class="animated zoomin">
                <a href="#">致力于为云上客户的应用提供更加安全防护与合规保障</a>
              </p>
            </li>
            <li class="tserver-list5">
              应用部署服务
              <p class="animated zoomin">
                <a href="#">整合CI/CD，提供面向应用的系统部署和运维服务</a>
              </p>
            </li>
            <li class="tserver-list6">
              混合托管服务
              <p class="animated zoomin">
                <a href="#">提供IDC托管混合、云与IDC数据混合，全方位混合云构建</a>
              </p>
            </li>
            <li class="tserver-list7">
              运维运营服务
              <p class="animated zoomin">
                <a href="#">提供各种技术代维和业务代维服务</a>
              </p>
            </li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <span class="footer-left">©2020流浪大师. All Rights Reserved.|本站已萌萌哒(✪ω✪)运行{{time}}</span>
        <span class="footer-right">Powered by 安分的四氧化三铁| 蜀ICP备19038993号</span>
      </div>
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
          if (scrollbarEl.scrollTop >= this.screenHeight) {
            this.showHeader = 1;
          } else {
            this.showHeader = 0;
          }
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
    background: rgba(0, 0, 0, 0.2);
    z-index: 10;
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
    z-index: 10000;
  }

  section:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #0a2a43;
    z-index: 10000;
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

  // 第二介绍页
  .auto-box {
    width: 100%;
    height: auto;
    padding: 30px 0 40px;
    background: #fff;
  }

  .main-box {
    max-width: 1200px;
    height: auto;
    margin: 0 auto;
  }

  .index-tit {
    padding: 40px 0;
    text-align: center;
  }

  .index-tit h1 {
    font-size: 30px;
    color: #363f45;
    font-weight: normal;
  }

  .index-tit p {
    font-size: 20px;
    color: #abb0b4;
    padding-top: 15px;
  }

  .index-tserver {
    width: 100%;
    // background: url("http://i2.tiimg.com/725017/9eb85c1aa95be28b.png") no-repeat center 125px;
    box-sizing: border-box;
    text-align: center;
    padding: 0 2.6%;
  }

  .index-tserver li {
    width: 24.8%;
    min-width: 162px;
    height: 162px;
    text-align: center;
    box-sizing: border-box;
    padding-top: 106px;
    font-size: 14px;
    color: #656d73;
    display: inline-block;
    position: relative;
    cursor: pointer;
    margin-bottom: 10px;
    margin-left: -0.1%;
  }

  .index-tserver li.tserver-list1 {
    // background: url("http://i2.tiimg.com/725017/bae7bd19ff22b009.png") no-repeat center top;
  }

  .index-tserver li.tserver-list2 {
    // background: url("http://i2.tiimg.com/725017/0a32fcca9a4ac09a.png") no-repeat center top;
  }

  .index-tserver li.tserver-list3 {
    // background: url("http://i2.tiimg.com/725017/e3cda649033a5c95.png") no-repeat center top;
  }

  .index-tserver li.tserver-list4 {
    // background: url("http://i2.tiimg.com/725017/8deb829ccf9e62fd.png") no-repeat center top;
  }

  .index-tserver li.tserver-list5 {
    // background: url("http://i2.tiimg.com/725017/78bca34f93e75458.png") no-repeat center top;
  }

  .index-tserver li.tserver-list6 {
    // background: url("http://i2.tiimg.com/725017/9231f3dd753250ec.png") no-repeat center top;
  }

  .index-tserver li.tserver-list7 {
    // background: url("http://i2.tiimg.com/725017/d380f3f409eee6fd.png") no-repeat center top;
  }

  .index-tserver li p {
    width: 162px;
    height: 162px;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -81px;
    border-radius: 81px;
    padding: 40px 30px;
    box-sizing: border-box;
    text-align: left;
    font-size: 14px;
    line-height: 22px;
    background: linear-gradient(111deg, #04bde4, #1067fe);
    display: none;
  }

  .index-tserver li p a {
    color: #fff;
  }

  .index-tserver li p.animated {
    animation-duration: 0.5s;
    animation-fill-mode: both;
  }

  .index-tserver li:hover p {
    display: block;
  }

  .zoomin {
    animation-name: zoomin;
  }

  @keyframes zoomin {
    0% {
      opacity: 0;
      transform: scale(0.3);
    }

    50% {
      opacity: 1;
    }
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
