import requests from './ajax'
import { getToken } from '@/utils/token'

// 登录接口
export const reqLogin = (data) => requests({ url: '/v1_0/authorizations', method: 'post', data: data })
// 获取用户的频道
export const reqGetUserChannels = () => requests({ url: '/v1_0/user/channels', method: 'get', headers: { Authorization: `Bearer ${getToken()}` } })
// 获取文章列表
export const reqGetArticleList = ({ channel_id, timestamp }) => requests({
  url: '/v1_0/articles',
  method: 'get',
  params: {
    channel_id,
    timestamp
  }
})
