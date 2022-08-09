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
                offset-top="1.2226rem">
        <van-tab v-for="item in channelList"
                 :key="item.id"
                 :name="item.id"
                 :title="item.name">
          <ArticleList :channelId="channelId"></ArticleList>
        </van-tab>
      </van-tabs>
      <!-- 加号 -->
      <van-icon name="plus"
                @click="showPopup"
                class="add"
                size="0.37333334rem" />
      <!-- 点击加号，显示弹出层 -->
      <van-popup class="popUp"
                 v-model="show"
                 closeable>
        <ChannelEdit></ChannelEdit>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { reqGetUserChannels } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelEdit from './components/ChannelEdit.vue'
export default {
  name: 'Home',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      channelId: 0, // 频道id
      channelList: [], // 用户频道
      show: false
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
    },
    // 点击加号，展示弹出层
    showPopup () {
      this.show = true
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
  .add {
    position: fixed;
    top: 62px;
    right: 8px;
    z-index: 100;
  }
  .popUp {
    width: 100vw;
    height: 100vh;
  }
}
</style>
