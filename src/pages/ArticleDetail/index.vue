<template>
  <div>
    <!-- Header 区域 -->
    <van-nav-bar fixed
                 title="文章详情"
                 left-arrow
                 @click-left="$router.back()" />

    <van-loading type="spinner"
                 v-if="articleInfo.title"
                 size="24px"
                 color="#1989fa"
                 text-color="#0094ff"
                 vertical>
      加载中...
    </van-loading>

    <!-- 文章信息区域 -->
    <div class="article-container">
      <!-- 文章标题 -->
      <h1 class="art-title">{{articleInfo.title}}</h1>

      <!-- 用户信息 -->
      <van-cell center
                :title="articleInfo.aut_name"
                label="3天前">
        <template #icon>
          <img :src="articleInfo.aut_photo"
               class="avatar">
        </template>
        <template #default>
          <div>
            <van-button type="info"
                        size="mini"
                        @click="isFocus(true)"
                        v-if="articleInfo.is_followed===true">已关注</van-button>
            <van-button icon="plus"
                        type="info"
                        size="mini"
                        plain
                        @click="isFocus(false)"
                        v-else>关注</van-button>
          </div>
        </template>
      </van-cell>

      <!-- 分割线 -->
      <van-divider></van-divider>

      <!-- 文章内容 -->
      <div class="art-content"
           v-html="articleInfo.content"></div>

      <!-- 分割线 -->
      <van-divider>End</van-divider>

      <!-- 点赞 -->
      <div class="like-box">
        <van-button icon="good-job"
                    type="danger"
                    size="small"
                    @click="isAddLike(1)"
                    v-if="articleInfo.attitude===1">已点赞</van-button>
        <van-button icon="good-job-o"
                    type="danger"
                    plain
                    size="small"
                    @click="isAddLike(0)"
                    v-else>点赞</van-button>
      </div>
    </div>

    <!-- 文章评论 -->
    <div>
      <CommentList :articleInfo="articleInfo"></CommentList>
    </div>
  </div>
</template>

<script>
import { reqGetArticleInfo, reqFocus, reqUnFocus, reqAddLike, reqDisLike } from '@/api'
import CommentList from '@/pages/ArticleDetail/CommentList.vue'
export default {
  name: 'ArticleDetail',
  components: {
    CommentList
  },
  data () {
    return {
      articleInfo: {}
    }
  },
  mounted () {
    this.getArticleInfo()
  },
  methods: {
    // 获取文章详情
    async getArticleInfo () {
      const res = await reqGetArticleInfo(this.$route.query.art_id)
      this.articleInfo = res.data.data
    },
    // 点击关注或已关注
    async isFocus (val) {
      if (val === true) {
        // 点的是已关注，应该显示关注
        this.articleInfo.is_followed = false
        // 对作者取关
        await reqUnFocus(this.articleInfo.aut_id)
      } else {
        // 点的是关注，应该显示已关注
        this.articleInfo.is_followed = true
        // 关注作者
        await reqFocus(this.articleInfo.aut_id)
      }
    },
    // 点赞或不点赞
    async isAddLike (val) {
      if (val === 1) {
        // 点的是已点赞，显示点赞
        await reqDisLike(this.articleInfo.art_id)
        this.articleInfo.attitude = 0
        // 取消点赞
      } else {
        // 点的是点赞，显示已点赞
        await reqAddLike(this.articleInfo.art_id)
        this.articleInfo.attitude = 1
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  padding: 10px;
  margin-top: 46px;
}
.art-title {
  font-size: 16px;
  font-weight: bold;
  margin: 10px 0;
}

.art-content {
  font-size: 12px;
  line-height: 24px;
  width: 100%;
  overflow-x: scroll;
  word-break: break-all;
  /deep/ img {
    width: 100%;
  }
  /deep/ pre {
    white-space: pre-wrap;
    word-wrap: break-word;
  }
}

.van-cell {
  padding: 5px 0;
  &::after {
    display: none;
  }
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f8f8f8;
  margin-right: 5px;
  border: none;
}

.like-box {
  display: flex;
  justify-content: center;
}
</style>
