<template>
  <div>
    <!-- 评论列表 -->
    <div class="cmt-list"
         id="cmt-list">
      <!-- 评论的 Item 项 -->
      <van-list v-model="loading"
                :finished="finished"
                finished-text="没有更多了"
                @load="loadFn"
                offset="50"
                :immediate-check="false">
        <div class="cmt-item"
             v-for="(obj,index) in comments"
             :key="index">
          <!-- 头部区域 -->
          <div class="cmt-header">
            <!-- 头部左侧 -->
            <div class="cmt-header-left">
              <img :src="obj.aut_photo"
                   class="avatar">
              <span class="uname">{{obj.aut_name}}</span>
            </div>
            <!-- 头部右侧 -->
            <div class="cmt-header-right">
              <van-icon name="like"
                        v-if="obj.is_liking===true"
                        @click="likeFn(true,obj)"
                        size="16"
                        color="red" />
              <van-icon name="like-o"
                        v-else
                        @click="likeFn(false,obj)"
                        size="16"
                        color="gray" />
            </div>
          </div>
          <!-- 主体区域 -->
          <div class="cmt-body">
            {{obj.content}}
          </div>
          <!-- 尾部区域 -->
          <div class="cmt-footer">3天前</div>
        </div>
      </van-list>
    </div>

    <!-- 底部添加评论区域 - 1 -->
    <div class="add-cmt-box van-hairline--top"
         v-if="isShow===false">
      <van-icon name="arrow-left"
                size="0.48rem"
                @click="$router.back()" />
      <div class="ipt-cmt-div"
           @click="isShow=true">发表评论</div>
      <div class="icon-box">
        <van-badge :content="totalCount"
                   max="9">
          <!-- 显示评论条数 -->
          <van-icon name="comment-o"
                    size="0.53333334rem" />
        </van-badge>
        <van-icon name="star-o"
                  size="0.53333334rem" />
        <van-icon name="share-o"
                  size="0.53333334rem" />
      </div>
    </div>

    <!-- 底部添加评论区域 - 2 -->
    <div class="cmt-box van-hairline--top"
         v-else>
      <textarea v-model="content"
                placeholder="友善评论、理性发言、阳光心灵"
                @blur="blurFn"></textarea>
      <van-button type="default"
                  @click="release"
                  :disabled="content.length===0">发布</van-button>
    </div>
  </div>
</template>

<script>
import { reqGetCommentsInfo, reqLikeArticle, reqDisLikeArticle, reqComment } from '@/api'
export default {
  name: 'CommentList',
  data () {
    return {
      comments: [],
      isShow: false,
      content: '',
      loading: false,
      finished: false,
      offset: null
    }
  },
  props: {
    articleInfo: {
      type: Object
    }
  },
  mounted () {
    // 获取评论数据
    this.getCommentsInfo()
  },
  computed: {
    totalCount () {
      return this.comments.length
    }
  },
  methods: {
    // 获取评论信息
    async getCommentsInfo () {
      const parameter = {
        id: this.$route.query.art_id,
        offset: this.offset
      }
      const res = await reqGetCommentsInfo(parameter)
      this.comments = res.data.data.results
    },
    // 点击爱心，喜欢或者不喜欢
    async likeFn (val, obj) {
      if (val === true) {
        // 点的红心，变为不喜欢
        obj.is_liking = false
        await reqDisLikeArticle(obj.com_id)
      } else {
        // 点的灰心，变为喜欢
        obj.is_liking = true
        await reqLikeArticle(obj.com_id)
      }
    },
    // 发布文章
    async release () {
      const res = await reqComment(this.articleInfo.art_id, this.content)
      this.comments.push(res.data.data)
      this.content = ''
      location.reload('#cmt-list')
    },
    // 失去焦点
    blurFn () {
      setTimeout(() => {
        this.isShow = true
      }, 100)
    },
    // 瀑布流数据请求
    async fn () {
      const parameter = {
        id: this.$route.query.art_id,
        offset: this.offset
      }
      const res = await reqGetCommentsInfo(parameter)
      if (res.data.data.results.length === 0) {
        this.finished = true
      }
      this.comments = [...this.comments, ...res.data.data.results]
      this.offset = res.data.data.last_id
      this.loading = false
    },
    // 瀑布流加载
    loadFn () {
      // 发请求更新数据
      this.fn()
    }
  }
}
</script>

<style scoped lang="less">
.cmt-list {
  padding: 10px;
  .cmt-item {
    padding: 15px 0;
    + .cmt-item {
      border-top: 1px solid #f8f8f8;
    }
    .cmt-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .cmt-header-left {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          background-color: #f8f8f8;
          border-radius: 50%;
          margin-right: 15px;
        }
        .uname {
          font-size: 12px;
        }
      }
    }
    .cmt-body {
      font-size: 14px;
      line-height: 28px;
      text-indent: 2em;
      margin-top: 6px;
      word-break: break-all;
    }
    .cmt-footer {
      font-size: 12px;
      color: gray;
      margin-top: 10px;
    }
  }
}

/*美化 - 文章详情 - 底部的评论页面 */
// 外层容器
.art-cmt-container-1 {
  padding-bottom: 46px;
}
.art-cmt-container-2 {
  padding-bottom: 80px;
}

// 发布评论的盒子 - 1
.add-cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  background-color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  line-height: 46px;
  padding-left: 10px;
  .ipt-cmt-div {
    flex: 1;
    border: 1px solid #efefef;
    border-radius: 15px;
    height: 30px;
    font-size: 12px;
    line-height: 30px;
    padding-left: 15px;
    margin-left: 10px;
    background-color: #f8f8f8;
  }
  .icon-box {
    width: 40%;
    display: flex;
    justify-content: space-evenly;
    line-height: 0;
  }
}

.child {
  width: 20px;
  height: 20px;
  background: #f2f3f5;
}

// 发布评论的盒子 - 2
.cmt-box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  padding-left: 10px;
  box-sizing: border-box;
  background-color: white;
  textarea {
    flex: 1;
    height: 66%;
    border: 1px solid #efefef;
    background-color: #f8f8f8;
    resize: none;
    border-radius: 6px;
    padding: 5px;
  }
  .van-button {
    height: 100%;
    border: none;
  }
}
</style>
