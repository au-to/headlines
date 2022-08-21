<template>
  <div>
    <template>
      <!-- 一条文章单元格 -->
      <van-cell>
        <!-- 标题区域的插槽 -->
        <template #title>
          <div class="title-box">
            <!-- 标题 -->
            <span>{{obj.title}}</span>
            <!-- 标题右边的单图 -->
            <img class="rightImg"
                 v-if="obj.cover.type===1"
                 :src=obj.cover.images[0]
                 alt=""
                 style="width:3.0133rem;height:1.8667rem">
          </div>
          <!-- 标题下的三图 -->
          <div class="threeImg">
            <img v-for="(imgUrl,index) in obj.cover.images"
                 :key="index"
                 :src=imgUrl
                 alt=""
                 style="width:3.0133rem;height:1.8667rem">
          </div>
        </template>
        <!-- label 区域的插槽 -->
        <template #label>
          <div class="label-box">
            <div>
              <span>{{obj.aut_name}}</span>
              <span>{{obj.comm_count}}</span>
              <span>{{obj.pubdate}}</span>
            </div>
            <!-- 反馈按钮 -->
            <van-icon name="cross"
                      v-if="isShow"
                      @click.stop
                      @click="show = true" />
          </div>
        </template>
      </van-cell>

      <van-action-sheet v-model="show"
                        :actions="actions"
                        @close="onClose"
                        @cancel="onCancel"
                        @select="onSelect"
                        :cancel-text="text"
                        get-container="body" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  data () {
    return {
      show: false,
      text: '取消',
      actions: [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }],
      secondActions: [{
        value: 0,
        name: '其它问题'
      },
      {
        value: 1,
        name: '标题夸张'
      },
      {
        value: 2,
        name: '低俗色情'
      },
      {
        value: 3,
        name: '错别字多'
      },
      {
        value: 4,
        name: '旧闻重复'
      },
      {
        value: 6,
        name: '内容不实'
      },
      {
        value: 8,
        name: '侵权'
      },
      {
        value: 5,
        name: '广告软文'
      },
      {
        value: 7,
        name: '涉嫌违法犯罪'
      }]
    }
  },
  props: {
    obj: Object,
    isShow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    // 点击反馈按钮
    onSelect (action) {
      if (action.name === '反馈垃圾内容') {
        this.actions = this.secondActions
        this.text = '返回'
      }
    },
    // 点击取消按钮
    onCancel () {
      if (this.text === '返回') {
        this.actions = [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }]
        this.text = '取消'
        this.show = true
      }
    },
    // 关闭面板时触发
    onClose () {
      this.actions = [{ name: '不感兴趣' }, { name: '反馈垃圾内容' }]
      this.text = '取消'
    }
  }
}
</script>

<style scoped lang="less">
/* 标题样式 */
.title-box {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

/* label描述样式 */
.label-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 文章信息span */
.label-box span {
  margin: 0 3px;
  &:first-child {
    margin-left: 0;
  }
}

/* 三图, 图片容器 */
.threeImg {
  display: flex;
  justify-content: space-between;
}
</style>
