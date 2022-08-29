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
      <van-cell title="用户名"
      @click="showDialog"
      :value="personnalInfo.name"
                is-link />
      <!-- 修改用户名称的对话框 -->
    <van-dialog
      v-model="isShowNameDialog"
      title="修改用户名"
      show-cancel-button
      :before-close="onNameDialogBeforeClose">
      <!-- 输入框 -->
      <van-field
        v-model.trim="userName"
        input-align="center"
        maxlength="7"
        placeholder="请输入用户名"
        v-autoFucus
      />
    </van-dialog>

      <van-cell title="生日"
      :value="personnalInfo.birthday"
                is-link />
    </van-cell-group>
  </div>
</template>

<script>
import Vue from 'vue'
import { Image as VanImage, Notify } from 'vant'
import { reqGetPersonalInfo, reqEditInfo, reqUpdateImage } from '@/api'
Vue.use(VanImage)

export default {
  name: 'InfoEdit',
  data () {
    return {
      personnalInfo: {},
      isShowNameDialog: false, // 是否显示姓名弹出框
      userName: '', // 用户名
      birthday: '' // 生日
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
    async  uploadImage (event) {
      if (event.target.files.length === 0) {
        return // 防止用户未选择图片
      }
      const fd = new FormData()
      fd.append('photo', event.target.files[0])
      const res = await reqUpdateImage(fd)
      this.personnalInfo.photo = res.data.data.photo
    },
    // 点击姓名，出现弹出框
    showDialog () {
      this.isShowNameDialog = true
      this.userName = this.personnalInfo.name
    },
    // 关闭对话框前的回调
    async  onNameDialogBeforeClose (action, done) {
      if (action === 'confirm') {
        if (/^[A-Za-z0-9\u4e00-\u9fa5]{1,7}$/.test(this.userName)) {
          // 调用接口
          await reqEditInfo({ name: this.userName, birthday: this.birthday })
          this.personnalInfo.name = this.userName
          // 关闭弹窗
          done()
        } else {
          // 提示用户
          Notify({ type: 'warning', message: '用户名中英文和数字1-7位' })
          // 阻止弹窗关闭
          done(false)
        }
      } else if (action === 'cancel') {
        done()
      }
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
