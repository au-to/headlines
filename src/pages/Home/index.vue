<template>
  <div>
    <!-- 顶部搜索 -->
    <div>
      <van-nav-bar left-arrow
                   fixed>
        <template v-slot:left>
          <img class="logo"
               src="~@/assets/logo.png"
               alt="">
        </template>
        <template #right>
          <van-icon name="search"
                    color="#fff"
                    size="0.48rem" />
        </template>
      </van-nav-bar>
    </div>
    <!-- 顶部标签栏 -->
    <div class="main">
      <van-tabs v-model="channelId"
                animated
                sticky
                offset-top="1.2226rem"
                style="height: 1000px">
        <van-tab v-for="item in channelList"
                 :key="item.id"
                 :name="item.id"
                 :title="item.name">
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import { reqGetUserChannels } from '@/api'
import ArticleList from './components/ArticleList.vue'
export default {
  name: 'Home',
  components: {
    ArticleList
  },
  data () {
    return {
      channelId: 0, // 频道id
      channelList: [] // 用户频道
    }
  },
  created () {
    // 获取频道列表
    this.getChannelList()
  },
  methods: {
    // 获取频道列表
    async getChannelList () {
      const res = await reqGetUserChannels()
      this.channelList = res.data.data.channels
    }
  }
}
</script>

<style scoped lang="less">
.logo {
  width: 100px;
  height: 30px;
}
.main {
  padding-top: 46px;
}
</style>
