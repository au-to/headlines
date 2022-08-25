<template>
  <div class="user-edit-container">
    <!-- Header 区域 -->
    <van-nav-bar title="编辑资料"
                 left-arrow
                 @click-left="$router.back()"
                 fixed />

    <!-- 用户资料 -->
    <van-cell-group class="action-card">
      <van-cell title="头像"
      @click="$refs.File.click()"
                is-link
                center>
        <template #default>
          <van-image round
                     class="avatar"
                     :src="personnalInfo.photo" />
                     <input type="file"
                     v-show="false"
                     accept="image/*"
                     ref="File"
                     @change="uploadImage"
                     >
        </template>
      </van-cell>
      <van-cell title="名称"
      :value="personnalInfo.name"
                is-link />
      <van-cell title="生日"
      :value="personnalInfo.birthday"
                is-link />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage } from 'vant'
import { reqGetPersonalInfo } from '@/api'
Vue.use(VanImage)

export default {
  name: 'InfoEdit',
  data () {
    return {
      personnalInfo: {}
    }
  },
  created () {
    this.getPersonalInfo()
  },
  methods: {
    // 获取个人信息
    async  getPersonalInfo () {
      const res = await reqGetPersonalInfo()
      this.personnalInfo = res.data.data
    },
    // 更换头像
    uploadImage (event) {
      console.log(event.target.files[0])
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit-container {
  padding-top: 46px;
  .avatar {
    width: 50px;
    height: 50px;
  }
}
</style>
