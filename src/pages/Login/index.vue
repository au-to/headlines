<template>
  <div>
    <van-nav-bar title="今日头条"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field v-model="user.mobile"
                 name="mobile"
                 required
                 label="手机号"
                 placeholder="手机号"
                 :rules="[{ required: true, message: '请填写手机号',pattern: /^1[3-9]\d{9}$/}]" />
      <van-field v-model="user.code"
                 type="password"
                 name="password"
                 required
                 label="密码"
                 placeholder="密码"
                 :rules="[{ required: true, message: '请填写密码',pattern: /^\d{6}$/}]" />
      <div style="margin: 16px;">
        <van-button round
                    :loading="isLoding"
                    loading-text="登录中..."
                    :disabled="isLoding"
                    block
                    type="info"
                    native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin } from '@/api'
import { Notify } from 'vant'
import { setToken } from '@/utils/token'
export default {
  name: 'Login',
  data () {
    return {
      user: { mobile: '', code: '246810' },
      isLoding: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        this.isLoding = true
        const res = await reqLogin(this.user)
        // 登录成功，存储token
        setToken(res.data.data.token)
        this.$router.push({ path: '/layout/home' })
      } catch (error) {
        Notify({ type: 'warning', message: '登录失败' })
      }
      this.isLoding = false
    }
  }
}
</script>

<style scoped lang="less">
</style>
