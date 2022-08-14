import requests from './ajax'
import { getToken } from '@/utils/token'

// 登录接口
export const reqLogin = (data) => requests({ url: '/v1_0/authorizations', method: 'post', data: data })
// 获取用户的频道
export const reqGetUserChannels = () => requests({ url: '/v1_0/user/channels', method: 'get', headers: { Authorization: `Bearer ${getToken()}` } })
// 获取文章列表
export const reqGetArticleList = ({ channel_id, timestamp }) => requests({ url: '/v1_0/articles', method: 'get', params: { channel_id, timestamp } })
// 反馈不喜欢的文章
export const reqUnintresting = (artId) => requests({ url: '/v1_0/article/dislikes', headers: { Authorization: `Bearer ${getToken()}` }, data: { artId }, method: 'post' })
// 举报文章
export const reqReportArticle = ({ artId, type, remark }) => requests({ url: '/v1_0/article/reports', headers: { Authorization: `Bearer ${getToken()}` }, data: { artId, type, remark }, method: 'post' })
// 获取所有的频道
export const reqGetAllChannels = () => requests({ url: '/v1_0/channels', method: 'get' })
// 更新用户频道
export const reqUpdateChannels = ({ channels }) => requests({ url: '/v1_0/user/channels', method: 'put', data: { channels: channels } })
// 删除用户频道
export const reqRemoveChannels = (target) => requests({ url: `/v1_0/user/channels/${target}`, method: 'delete' })
// 搜索框联想词
export const reqSuggestions = (str) => requests({ url: '/v1_0/suggestion', method: 'get', params: { q: str } })
