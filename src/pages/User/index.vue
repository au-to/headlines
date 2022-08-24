<template>
  <div class="user-container">
    <!-- 用户基本信息面板 -->
    <div class="user-card">
      <!-- 用户头像、姓名 -->
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <img :src="userInfo.photo"
               alt=""
               class="avatar">
        </template>
        <template #title>
          <span class="username">{{userInfo.name}}</span>
        </template>
        <template #label>
          <van-tag color="#fff"
                   text-color="#007bff">申请认证</van-tag>
        </template>
      </van-cell>

      <!-- 动态、关注、粉丝 -->
      <div class="user-data">
        <div class="user-data-item">
          <span>{{userInfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="user-data-item">
          <span>{{userInfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="user-data-item">
          <span>{{userInfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>

    <!-- 操作面板 -->
    <van-cell-group class="action-card">
      <van-cell icon="edit"
                @click="$router.push('/info-edit')"
                title="编辑资料"
                is-link />
      <van-cell icon="chat-o"
                title="小思同学"
                is-link />
      <van-cell icon="warning-o"
                @click="exitLogin"
                title="退出登录"
                is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { reqGetUserInfo } from '@/api'
import { Dialog } from 'vant'
import { removeToken } from '@/utils/token'
export default {
  name: 'User',
  data () {
    return {
      userInfo: {}
    }
  },
  mounted () {
    this.getUserInfo()
  },
  methods: {
    // 获取个人信息
    async getUserInfo () {
      const res = await reqGetUserInfo()
      this.userInfo = res.data.data
    },
    // 退出登录
    exitLogin () {
      Dialog.confirm({
        message: '是否确认退出'
      })
        .then(() => {
          // 退出后清空token，路由跳转
          removeToken()
          this.$router.push('/login')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="less">
.user-container {
  .user-card {
    background-color: #007bff;
    color: white;
    padding-top: 20px;
    .van-cell {
      background: #007bff;
      color: white;
      &::after {
        display: none;
      }
      .avatar {
        width: 60px;
        height: 60px;
        background-color: #fff;
        border-radius: 50%;
        margin-right: 10px;
      }
      .username {
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
  .user-data {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-size: 14px;
    padding: 30px 0;
    .user-data-item {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 33.33%;
    }
  }
}
</style>
