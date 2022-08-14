<template>
  <div>
    <!-- 弹出层的头部区域 -->
    <van-nav-bar title="频道管理">
      <template #right>
        <van-icon name="cross"
                  @click="closePopup"
                  size=".37333rem" />
      </template>
    </van-nav-bar>

    <!-- 我的频道 -->
    <div class="my-channel-box">
      <div class="channel-title">
        <span>我的频道
          <span class="small-title">
            {{isEdit==true?'点击删除频道':'点击进入频道'}}
          </span>
        </span>
        <span @click="isEdit=!isEdit">{{isEdit==true?'完成':'编辑'}}</span>
      </div>
      <!-- 我的频道列表 -->
      <van-row type="flex">
        <van-col span="6"
                 v-for="(obj,index) in userChannels"
                 :key="obj.id"
                 @click="removeChannel(obj)">
          <div class="channel-item van-hairline--surround">
            {{obj.name}}
            <!-- 删除的徽标 -->
            <van-badge color="transparent"
                       class="cross-badge"
                       v-show="isEdit && index!==0">
              <template #content>
                <van-icon name="cross"
                          class="badge-icon"
                          color="#cfcfcf"
                          size="0.32rem" />
              </template>
            </van-badge>
          </div>
        </van-col>
      </van-row>
    </div>

    <!-- 更多频道 -->
    <div class="more-channel-box">
      <div class="channel-title">
        <span>点击添加更多频道：</span>
      </div>
      <!-- 更多频道列表 -->
      <van-row type="flex">
        <van-col span="6"
                 @click="addChannel(obj)"
                 v-for="obj in moreChannels"
                 :key="obj.id">
          <div class="channel-item van-hairline--surround">{{obj.name}}</div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import { reqGetAllChannels } from '@/api'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [], // 所有频道
      isEdit: false // 编辑状态切换
    }
  },
  props: {
    // 用户的频道
    userChannels: {
      type: Array,
      require: true
    }
  },
  created () {
    this.getAllChanels()
  },
  computed: {
    // 更多频道
    moreChannels () {
      return this.allChannels.filter(obj => {
        const index = this.userChannels.findIndex(obj2 => obj2.id === obj.id)
        if (index === -1) return true
      })
    }
  },
  methods: {
    // 获取所有的频道
    async getAllChanels () {
      const res = await reqGetAllChannels()
      this.allChannels = res.data.data.channels
    },
    // 点击，把更多频道添加进我的频道
    addChannel (channelObj) {
      if (this.isEdit === true) {
        this.$emit('addChannelEv', channelObj)
      }
    },
    // 删除用户频道
    removeChannel (obj) {
      if (this.isEdit === true) {
        // 删除频道
        if (obj.id !== 0) {
          this.$emit('removeChannelEv', obj)
        }
      } else {
        // 点击进入频道
        this.$emit('intoChannelEv', obj)
        // 关闭弹窗
        this.$emit('closePopupEv')
      }
    },
    // 关闭弹出层
    closePopup () {
      this.isEdit = false
      this.$emit('closePopupEv')
    }
  }
}
</script>

<style scoped lang="less">
.van-popup,
.popup-container {
  background-color: transparent;
  height: 100%;
  width: 100%;
}

.popup-container {
  display: flex;
  flex-direction: column;
}

.pop-header {
  height: 90px;
  background-color: #007bff;
  color: white;
  text-align: center;
  font-size: 14px;
  position: relative;
  .title {
    width: 100%;
    position: absolute;
    bottom: 15px;
  }
}

.pop-body {
  flex: 1;
  overflow: scroll;
  padding: 8px;
  background-color: white;
}

.my-channel-box,
.more-channel-box {
  .channel-title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    line-height: 28px;
    padding: 0 6px;
  }
}

.channel-item {
  font-size: 12px;
  text-align: center;
  line-height: 36px;
  background-color: #fafafa;
  margin: 5px;
}

/*删除的微标 */
.cross-badge {
  position: absolute;
  right: -3px;
  top: 0;
  border: none;
}

/*提示文字 */
.small-title {
  font-size: 10px;
  color: gray;
}
</style>
