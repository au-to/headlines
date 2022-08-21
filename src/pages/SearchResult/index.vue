<template>
  <div>
    <!-- 搜索结果页-头部导航 -->
    <div class="search-result-container">
      <van-nav-bar title="搜索结果"
                   left-arrow
                   @click-left="bacKsearch"
                   fixed />
    </div>
    <!-- 搜索结果铺设 -->
    <div>
      <ArticleItem :obj="obj"
                   @click.native="goArticleItem(obj.art_id)"
                   :isShow="false"
                   v-for="obj in articleList"
                   :key="obj.art_id">
      </ArticleItem>
    </div>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem.vue'
import { reqGetSearchResult } from '@/api'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  data () {
    return {
      articleList: []
    }
  },
  mounted () {
    this.getResults()
  },
  methods: {
    // 回到搜索页
    bacKsearch () {
      this.$router.go(-1)
    },
    // 获取搜索结果
    async getResults () {
      const res = await reqGetSearchResult({
        q: this.$route.params.kw
      })
      this.articleList = res.data.data.results
    },
    // 跳转文章详情
    goArticleItem (art_id) {
      this.$router.push(`/article-detail?art_id=${art_id}`)
    }
  }
}
</script>

<style lang="less" scoped>
.search-result-container {
  padding-top: 46px;
}
</style>
