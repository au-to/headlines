<template>
  <div>
    <!-- 上拉刷新 -->
    <van-pull-refresh v-model="isLoading"
                      @refresh="onRefresh">
      <!-- 文章列表组件 -->
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="onLoad"
                offset="50"
                :immediate-check="false">
        <ArticleItem v-for="item in articleList"
                     @click.native="goArticleItem(item.art_id)"
                     :key="item.art_id"
                     :obj="item"></ArticleItem>
      </van-list>
    </van-pull-refresh>

  </div>
</template>

<script>
import { reqGetArticleList } from '@/api'
import ArticleItem from '@/components/ArticleItem.vue'
export default {
  name: 'ArticleList',
  data () {
    return {
      articleList: [], // 文章列表
      loading: false,
      finished: false,
      theTime: new Date().getTime(), // 请求前一页历史数据的时间戳
      isLoading: false
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
        return
      }
      this.changeChanel()
    },
    // 下拉刷新
    async onRefresh () {
      try {
        this.articleList = []
        this.changeChanel()
        this.isLoading = false
      } catch (error) {
        alert(error.message)
      }
    },
    // 路由跳转文章详情
    goArticleItem (id) {
      this.$router.push(`/article-detail?art_id=${id}`)
    }
  }
}
</script>

<style>
</style>
