<template>
  <div>
    <!-- 搜索页面头部 -->
    <div class="search-header">
      <!-- 后退按钮 -->
      <van-icon name="arrow-left"
                color="white"
                size="0.48rem"
                class="goback"
                @click="$router.back()" />
      <!-- 搜索组件 -->
      <van-search placeholder="请输入搜索关键词"
                  background="#007BFF"
                  v-autoFucus
                  shape="round"
                  v-model="keywords"
                  @input="associated"
                  @search="searchFn" />
    </div>

    <!-- 搜索建议列表 -->
    <div class="sugg-list"
         v-if="keywords.length!==0">
      <div class="sugg-item"
           @click="goResult(str)"
           v-for="(str,index) in suggestList"
           :key="index">
        {{str}}
      </div>
    </div>

    <!-- 搜索历史 -->
    <div class="search-history"
         v-else>
      <!-- 标题 -->
      <van-cell title="搜索历史">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
          <van-icon name="delete"
                    @click="removeHistory"
                    class="search-icon" />
        </template>
      </van-cell>

      <!-- 历史列表 -->
      <div class="history-list">
        <span class="history-item"
              @click="hisClick(str)"
              v-for="(str,index) in history"
              :key="index">{{str}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { reqSuggestions } from '@/api'
export default {
  name: 'Search',
  data () {
    return {
      keywords: '', // 搜索关键词
      timer: null, // 防抖用的定时器
      suggestList: [], // 建议关键字列表
      history: [] // 搜索历史
    }
  },
  mounted () {
    const arr = JSON.parse(localStorage.getItem('his'))
    this.history = [...new Set(arr)] || []
  },
  methods: {
    // 联想词
    associated () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      if (this.keywords.length === 0) {
        this.suggestList = []
      } else {
        this.timer = setTimeout(async () => {
          const res = await reqSuggestions(this.keywords)
          this.suggestList = res.data.data.options
        }, 300)
      }
    },
    // 关键字高亮
    lightKw (target, origin) {
      origin.replace(target, `<span style="color: red">${target}</span>`)
    },
    // 搜索框输入跳转
    searchFn () {
      const str = this.keywords
      // 将关键字存入搜索记录
      this.history.push(str)
      // 本地存储搜索历史列表
      localStorage.setItem('his', JSON.stringify(this.history))
      this.$router.push({
        path: `/searchresult/${str}`
      })
    },
    // 点击联想词跳转
    goResult (str) {
      // 将关键字存入搜索记录
      this.history.push(str)
      // 本地存储搜索历史列表
      localStorage.setItem('his', JSON.stringify(this.history))
      this.$router.push({
        path: `/searchresult/${str}`
      })
    },
    // 点击历史记录跳转
    hisClick (str) {
      this.$router.push({
        path: `/searchresult/${str}`
      })
    },
    // 清空历史记录
    removeHistory () {
      this.history = []
      localStorage.removeItem('his')
    }
  }
}
</script>

<style scoped lang="less">
.search-header {
  height: 46px;
  display: flex;
  align-items: center;
  background-color: #007bff;
  overflow: hidden;
  /*后退按钮*/
  .goback {
    padding-left: 14px;
  }
  /*搜索组件*/
  .van-search {
    flex: 1;
  }
}
/*搜索建议列表样式 */
.sugg-list {
  .sugg-item {
    padding: 0 15px;
    border-bottom: 1px solid #f8f8f8;
    font-size: 14px;
    line-height: 50px;
    // 实现省略号的三行代码
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
/**搜索历史 */
.search-icon {
  font-size: 16px;
  line-height: inherit;
}
// 历史列表
.history-list {
  padding: 0 10px;
  .history-item {
    display: inline-block;
    font-size: 12px;
    padding: 8px 14px;
    background-color: #efefef;
    margin: 10px 8px 0px 8px;
    border-radius: 10px;
  }
}
</style>
