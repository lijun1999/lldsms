<template>
  <div id="particles-js">
    <el-page-header @back="goBack" content="数据图表"></el-page-header>
    <!--为echarts准备一个具备大小的容器dom-->
    <div class="chart-box">
      <div class="chart-box-row">
        <div class="chart-item eq-num-box">
          <div class="eq-num-title">设备总数</div>
          <div class="eq-num-content">
            <count-to :startVal="0" :endVal="eqNumData.total" :duration="2000" class="eq-num"></count-to>
            <span class="eq-num-unit">件</span>
          </div>
        </div>
        <div class="chart-item eq-num-box">
          <div class="eq-num-title">可借设备数</div>
          <div class="eq-num-content">
            <count-to :startVal="0" :endVal="eqNumData.canLend" :duration="2000" class="eq-num">></count-to>
            <span class="eq-num-unit">件</span>
          </div>
        </div>
        <div class="chart-item eq-num-box">
          <div class="eq-num-title">待维修设备数</div>
          <div class="eq-num-content">
            <count-to :startVal="0" :endVal="eqNumData.repair" :duration="2000" class="eq-num">></count-to>
            <span class="eq-num-unit">件</span>
          </div>
        </div>
        <div class="chart-item eq-num-box">
          <div class="eq-num-title">报废设备数</div>
          <div class="eq-num-content">
            <count-to :startVal="0" :endVal="eqNumData.scrap" :duration="2000" class="eq-num">></count-to>
            <span class="eq-num-unit">件</span>
          </div>
        </div>
      </div>
      <div class="chart-box-row">
        <div class="chart-item" id="pieChart"></div>
        <div class="chart-item" id="BrokenLineChart"></div>
        <!-- <div class="chart-item" id="pieChart"></div> -->
      </div>
    </div>
  </div>
</template>
<script>
import echarts from "echarts";
import countTo from "vue-count-to";
export default {
  name: "echart",
  components: { countTo },
  data() {
    return {
      day: 0,
      pieCharts: "",
      pieOpinion: [],
      pieOpinionData: [],
      lineChart: "",
      lineData: {
        xAxis: [],
        lendDataAxis: [],
        backDataAxis: [],
      },
      eqNumData: {
        total: 0,
        canLend: 0,
        repair: 0,
        scrap: 0,
      }, //设备数的数据
    };
  },
  methods: {
    //获取页面数据
    async getData() {
      const res = await this.$http.get("/chartdata", this.editForm);
      console.log(res.data.data.eq);
      // 设备数的数据
      this.eqNumData.total = res.data.data.eq[0][0].num;
      for (const item of res.data.data.eq[1]) {
        switch (item.state) {
          case "可借":
            this.eqNumData.canLend = item.num;
            break;
          case "报修":
            this.eqNumData.repair = item.num;
            break;
          case "报废":
            this.eqNumData.scrap = item.num;
            break;
          default:
            break;
        }
      }
      // 圆饼图
      this.pieData(res.data.data.eq[1]);
      // 折线图
      this.BrokenLineData(res.data.data.eq[2], res.data.data.eq[3]);
    },
    //处理圆饼图数据
    pieData(data) {
      for (const i in data) {
        this.pieOpinion.push(data[i].state);
        this.pieOpinionData.push({
          value: data[i].num,
          name: data[i].state,
        });
      }
      this.drawPie("pieChart");
    },
    //画圆饼图
    drawPie(id) {
      this.pieCharts = echarts.init(document.getElementById(id));
      this.pieCharts.setOption({
        title: {
          text: "设备状态",
          textStyle: {
            color: "#95A5B5",
          },
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          x: "left",
          top: 50,
          data: this.pieOpinion,
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        series: [
          {
            name: "设备状态",
            type: "pie",
            radius: ["50%", "70%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center",
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "blod",
                },
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            data: this.pieOpinionData,
          },
        ],
      });
    },
    //折线图数据
    BrokenLineData(lendData, backData) {
      let lendDataAxis = [];
      let backDataAxis = [];
      let xAxis = [];
      let m = 0;
      let n = 0;
      let yMax = 0;
      for (let i = 1; i <= this.day; i++) {
        xAxis.push(`${i}日`);
        // 借出
        if (lendData.length == 0) {
          lendDataAxis.push(0);
        } else {
          const outdate = new Date(lendData[m].outdate);
          const day = outdate.getDate();
          if (day == i) {
            lendDataAxis.push(lendData[m].num);
            yMax = yMax < lendData[m].num ? lendData[m].num : yMax;
            m = m == lendData.length - 1 ? m : m + 1;
          } else {
            lendDataAxis.push(0);
          }
        }
        // 归还
        if (backData.length == 0) {
          backDataAxis.push(0);
        } else {
          const outdate = new Date(backData[n].outdate);
          const day = outdate.getDate();
          if (day == i) {
            backDataAxis.push(backData[n].num);
            yMax = yMax < backData[n].num ? backData[n].num : yMax;
            n = n == backData.length - 1 ? n : n + 1;
          } else {
            backDataAxis.push(0);
          }
        }
      }
      this.lineData.xAxis = xAxis;
      this.lineData.lendDataAxis = lendDataAxis;
      console.log("借出", lendDataAxis);
      console.log("归还", backDataAxis);
      this.lineData.backDataAxis = backDataAxis;
      this.drawBrokenLineChart("BrokenLineChart");
    },
    //画折线图
    drawBrokenLineChart(id) {
      const option = {
        title: {
          text: "本月借还折线图",
          textStyle: {
            color: "#95A5B5",
          },
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["本月借出设备数", "本月归还设备数"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.lineData.xAxis,
            axisLine: {
              lineStyle: {
                color: "#95A5B5",
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLine: {
              lineStyle: {
                color: "#95A5B5",
              },
            },
          },
        ],
        series: [
          {
            name: "借出设备",
            type: "line",
            stack: "借出总量",
            areaStyle: {},
            data: this.lineData.lendDataAxis,
          },
          {
            name: "归还设备",
            type: "line",
            stack: "归还总量",
            areaStyle: {},
            data: this.lineData.backDataAxis,
          },
        ],
      };
      this.lineChart = echarts.init(document.getElementById(id));
      this.lineChart.setOption(option);
    },
    goBack() {
      window.history.go(-1);
    },
  },
  //调用
  mounted() {
    const time = new Date();
    this.day = time.getDate(); //或当前的日期
    this.getData();
  },
};
</script>
<style lang="less" scoped>
.el-page-header {
  color: rgba(255, 255, 255, 0.3);
  margin-left: 40px;
  line-height: 60px;
}

.el-page-header:hover {
  color: rgba(255, 255, 255, 0.8);
}

.chart-box {
  width: 1500px;
  margin: 40px auto;
  // background: pink;

  .chart-box-row {
    display: flex;
    display: -webkit-flex;
    justify-content: space-between;
    flex-direction: row;
    .chart-item {
      width: 500px;
      height: 400px;
      box-shadow: 20px 20px 30px rgba(0, 0, 0, 0.1),
        -20px -20px 30px rgba(255, 255, 255, 0.1);
      border-radius: 20px;
      transition: all 0.5s ease-out;
      padding: 15px;
      box-sizing: border-box;
      background: #2b4b6b;
      margin-top: 40px;
    }

    .chart-item:hover {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 rgba(255, 255, 255, 0.2),
        inset 20px 20px 30px rgba(0, 0, 0, 0.1),
        inset -20px -20px 30px rgba(255, 255, 255, 0.1);
    }
    .eq-num-box:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    .eq-num-box {
      width: 300px;
      height: 200px;
      text-align: center;
      color: rgba(255, 255, 255, 0.5);
      .eq-num-title {
        line-height: 40px;
        font-weight: 800;
        font-size: 24px;
        margin-top: 20px;
      }
      .eq-num-content {
        margin-top: 25px;
        .eq-num {
          font-size: 32px;
          font-weight: 700;
          padding: 20px;
        }
        .eq-num-unit {
          color: rgba(255, 255, 255, 0.3);
        }
      }
    }

    #BrokenLineChart {
      width: 900px;
      margin-left: 80px;
    }
  }
}
</style>
