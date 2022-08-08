<template>
  <div>
    <!-- 文章列表组件 -->
    <van-list v-model="loading"
              :finished="finished"
              finished-text="没有更多了"
              @load="onLoad"
              offset="50"
              :immediate-check="false">
      <ArticleItem v-for="item in articleList"
                   :key="item.art_id"
                   :obj="item"></ArticleItem>
    </van-list>
  </div>
</template>

<script>
import { reqGetArticleList } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      articleList: [], // 文章列表
      loading: false,
      finished: false,
      theTime: new Date().getTime() // 请求前一页历史数据的时间戳
    }
  },
  components: {
    ArticleItem
  },
  props: {
    channelId: Number
  },
  created () {
    this.changeChanel() // 切换频道
  },
  methods: {
    // 切换频道，展示对应的文章列表
    async changeChanel () {
      const res = await reqGetArticleList({
        channel_id: this.channelId,
        timestamp: this.theTime
      })
      this.articleList = [...this.articleList, ...res.data.data.results]
      this.theTime = res.data.data.pre_timestamp
      this.loading = false
      if (res.data.data.pre_timestamp == null) {
        this.finished = true
      }
    },
    // 上拉加载
    onLoad () {
      if (this.articleList.length === 0) {
        this.loading = false
      }
      this.changeChanel()
    }
  }
}
</script>

<style>
</style>
