<template>
  <div>
    <div style="width: 70%;margin: 0 auto;">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in swiperData" :key="index">
          <img :src="item"></img>
        </el-carousel-item>
      </el-carousel>
      <div class="lj-card">
        本系统主要用于管理所有设备。
        设立目的是为了架设高效的信息化管理平台，尽可能简化设备管理日常工作流程、提高工效率。
        考虑到使用人数较多以及发展的需要，系统充分考虑其易用性、可扩展性以及数据安全性。
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        swiperData: [
          'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2377869723,78530684&fm=26&gp=0.jpg',
          'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2266085146,1932202416&fm=26&gp=0.jpg',
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2499717272,551683638&fm=26&gp=0.jpg',
          'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=565113291,1968789215&fm=26&gp=0.jpg'
        ]
      }
    }
  }
</script>

<style lang="less" scoped>
  .lj-card {
    color: rgba(255, 255, 255, .7);
  }
</style>
