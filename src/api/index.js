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
// 获取搜索结果
export const reqGetSearchResult = ({ q }) => requests({ url: '/v1_0/search', method: 'get', params: { q } })
// 获取文章详情
export const reqGetArticleInfo = (id) => requests({ url: `/v1_0/articles/${id}`, method: 'get' })
// 关注作者
export const reqFocus = (auid) => requests({ url: '/v1_0/user/followings', method: 'post', data: { target: auid } })
// 取消关注
export const reqUnFocus = (auid) => requests({ url: `/v1_0/user/followings/${auid}`, method: 'delete' })
// 点赞文章
export const reqAddLike = (artid) => requests({ url: '/v1_0/article/likings', method: 'post', data: { target: artid } })
// 取消点赞
export const reqDisLike = (target) => requests({ url: `/v1_0/article/likings/${target}`, method: 'delete' })
// 获取评论信息
export const reqGetCommentsInfo = ({ id, offset = null, limit = 10 }) => requests({
  url: '/v1_0/comments',
  method: 'get',
  params: {
    type: 'a',
    source: id,
    offset,
    limit
  }
})
// 点赞评论
export const reqLikeArticle = (id) => requests({ url: '/v1_0/comment/likings', method: 'post', data: { target: id } })
// 取消点赞
export const reqDisLikeArticle = (target) => requests({ url: `/v1_0/comment/likings/${target}`, method: 'delete' })
// 对文章或者评论进行评论
export const reqComment = (target, content) => requests({ url: '/v1_0/comments', method: 'post', data: { target, content } })
// 获取个人信息
export const reqGetUserInfo = () => requests({ url: '/v1_0/user', method: 'get' })
// 获取用户的个人资料
export const reqGetPersonalInfo = () => requests({ url: '/v1_0/user/profile', method: 'get' })
