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
            <van-icon name="cross" />
          </div>
        </template>
      </van-cell>
    </template>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    obj: Object
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
