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
                    size="0.48rem"
                    @click="goSearch" />
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
        <ChannelEdit :userChannels="channelList"
                     @addChannelEv="addChannel"
                     @intoChannelEv="intoChannel"
                     @removeChannelEv="removeChannel"
                     @closePopupEv="closePopup"></ChannelEdit>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { reqGetUserChannels, reqUpdateChannels, reqRemoveChannels } from '@/api'
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
    // 获取用户的频道列表
    async getChannelList () {
      const res = await reqGetUserChannels()
      this.channelList = res.data.data.channels
    },
    // 点击加号，展示弹出层
    showPopup () {
      this.show = true
    },
    // 子组件中点击添加频道的自定义事件回调
    async addChannel (channelObj) {
      this.channelList.push(channelObj)
      // 更新用户频道
      // 先过滤掉id为0的推荐频道
      const arr = this.channelList.filter((obj) => {
        return obj.id !== 0
      })
      const newList = arr.map((item, index) => {
        const newObj = { ...item }
        newObj.seq = index + 1
        delete newObj.name
        return newObj
      })
      await reqUpdateChannels({ channels: newList })
    },
    // 删除用户频道
    async removeChannel (obj) {
      // 首先把它从用户列表中移除
      const index = this.channelList.findIndex((item) => obj.id === item.id)
      this.channelList.splice(index, 1)
      // 发请求更新用户频道
      await reqRemoveChannels(obj.id)
    },
    // 关闭弹出层
    closePopup () {
      this.show = false
    },
    // 进入频道
    intoChannel (obj) {
      this.channelId = obj.id
    },
    // 点击搜索
    goSearch () {
      this.$router.push('/search')
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
