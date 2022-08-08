<template>
  <div>
    <!-- home和user路由组件展示的出口 -->
    <div class="home_container">
      <router-view></router-view>
    </div>
    <!-- 底部tabbar -->
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o"
                       to="/layout/home">首页</van-tabbar-item>
      <van-tabbar-item icon="search">问答</van-tabbar-item>
      <van-tabbar-item icon="friends-o">视频</van-tabbar-item>
      <van-tabbar-item icon="setting-o"
                       to="/layout/user">用户</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped lang="less">
.home_container {
  padding-bottom: 50px;
}
.van-tabbar {
  border-top: 1px solid #f8f8f8;
}
</style>
