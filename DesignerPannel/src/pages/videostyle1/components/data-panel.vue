<template>
  <div>
    <div class="video-section setting-block__section">
      <ul class="video-select__tab clearfix">
        <li
          v-for="(item, index) in tab"
          :key="index"
          :class="{ active: item.value == source }"
          @click="_handleChangeVideoSrcTab(item.value)"
        >
          {{ item.title }}
        </li>
      </ul>
      <div v-show="source == 1" class="video-select__result">
        <div v-show="!uploadSrc" class="result-empty__area" @click="openDialog">
          <span
            class="empty-icon"
            :style="{ backgroundImage: `url(${defaultVideoIcon})` }"
          ></span>
          <p class="empty-tips">请选择视频</p>
        </div>
        <div v-show="uploadSrc" class="result-data__area" @click="openDialog">
          <span
            class="data-icon"
            :style="{ backgroundImage: `url(${activeVideoIcon})` }"
          ></span>
          <p class="data-tips">{{ title }}</p>
        </div>
        <button
          class="ym-button--primary"
          style="width: 100%; margin-top: 16px;"
          @click="openDialog"
        >
          {{ uploadSrc ? '重新选择' : '选择视频' }}
        </button>
      </div>

      <div v-show="source == 0" class="video-input__area">
        <el-input
          v-model="outsideSrc"
          type="textarea"
          placeholder="支持优酷、腾讯、爱奇艺的通用 代码及 http/https 视频播放地址"
          @blur="_handleChangeOutsideSrc"
        ></el-input>
        <div v-show="outsideSrcErrorTipsShow" class="ouside-src__error--tips">
          <i class="iconfont iconjianhao"></i>请输入正确的视频地址或通用代码
        </div>
      </div>
    </div>
    <el-collapse v-model="activeNames" :accordion="true">
      <el-collapse-item v-show="setCoverShow" name="1">
        <template slot="title">
          <span
            class="collapse-title title-item"
            :class="{ active: activeNames == '1' }"
          >显示设置</span>
        </template>
        <p class="collapse-content-title">
          视频封面
          <el-tooltip
            class="item"
            effect="dark"
            content="访问网站时显示的视频封面图，不设置则为视频随机截图"
            placement="top"
          >
            <i class="iconfont iconicon-exclamationmark"></i>
          </el-tooltip>
        </p>
        <div class="video-cover__src">
          <div v-show="coverSrc.length == 0" class="video-cover__src--empty">
            <span class="empty-icon" @click="uploadImg">
              <i class="iconfont iconicon-add"></i>
            </span>
            <p>选择图片</p>
          </div>
          <div
            v-show="coverSrc.length > 0"
            class="video-cover__src--data"
            :style="{
              backgroundImage: `url(${coverSrc})`
            }"
          >
            <ul class="video-cover__operate--area">
              <li>
                <i class="iconfont iconqiehuanxingshiyi" @click="uploadImg"></i>
              </li>
              <li>
                <i class="iconfont iconshanchu" @click="clearImg"></i>
              </li>
            </ul>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <span
            class="collapse-title title-item"
            :class="{ active: activeNames == '2' }"
          >播放设置</span>
        </template>
        <div class="autoplay-setting__area flex-between-center--area">
          <span class="setting-attribute--title">自动播放</span>
          <el-switch v-model="autoplay"></el-switch>
        </div>
      </el-collapse-item>
    </el-collapse>
    <videoManage
      ref="videoManageArea"
      :model="model"
      :show="showVideoDialog"
      @selectVideo="selectVideo"
      @closeDialog="closeDialog"
    />

    <image-manage
      ref="imageManageArea"
      :model="model"
      :show="show"
      :action-key="'changeCover'"
      @uploadImg="uploadImg"
      @handleCloseModal="handleCloseModal"
    />
  </div>
</template>

<script>
import videoManage from './selectVideo'
import ImageManage from './selectUpload'
export default {
  components: { videoManage, ImageManage },
  props: {
    model: {
      type: Object
    }
  },
  data() {
    return {
      tab: [
        { title: '已上传视频', value: 1 },
        { title: '其他外链', value: 0 }
      ],
      defaultVideoIcon: require('@static/images/default_video.png'),
      activeVideoIcon: require('@static/images/active_video.png'),
      activeNames: ['1', '2'],
      showVideoDialog: false,
      show: false,
      getDataFlag: true,
      outsideSrcErrorTipsShow: false,
      uploadInfo: null,
      outsideInfo: '',
      oldOutsideInfo: '',
      setCoverShow: true,
      iframeReg: /<iframe(.*?)><\/iframe>/i,
      httpsReg: /^(http|https|<embed)/
    }
  },
  computed: {
    uploadSrc: {
      get: function() {
        return this.model['UploadSrc']
      },
      set: function(val) {}
    },
    outsideSrc: {
      get: function() {
        return this.model['OutsideSrc']
      },
      set: function(val) {
        this.oldOutsideInfo = this.oldOutsideInfo
          ? this.oldOutsideInfo
          : this.model['OutsideSrc']
        this.model['OutsideSrc'] = val
      }
    },
    coverSrc: {
      get: function() {
        return this.model['Cover']
      },
      set: function(val) {}
    },
    autoplay: {
      get: function() {
        return this.model['Autoplay']
      },
      set: function(val) {
        const oldVal = this.model['Autoplay']
        if (val !== oldVal) {
          const oldData = {}
          const data = {}
          oldData['Autoplay'] = oldVal
          data['Autoplay'] = val
          this.model['Autoplay'] = val
          this.onDataChange('changeAutoplay', oldData, data)
        }
      }
    },
    source: {
      get: function() {
        return this.model['Source']
      },
      set: function() {}
    },
    title: {
      get: function() {
        return this.model['Title']
      },
      set: function() {}
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.oldOutsideInfo = this.model['OutsideSrc']
    })
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onDataChange(action, oldData, data)
      }
    },
    _handleChangeOutsideSrc() {
      const newVal = this.outsideSrc
      if (newVal) {
        if (this.iframeReg.test(newVal) || this.httpsReg.test(newVal)) {
          this.outsideSrcErrorTipsShow = false
          const oldVal = this.oldOutsideInfo
          if (newVal !== oldVal) {
            var getSrcReg = new RegExp(/src=['"]?([^'"]*)['"]?/i)
            const iframeSrc = this.iframeReg.test(newVal)
              ? newVal.match(getSrcReg)[1]
              : newVal
            const oldData = {}
            const data = {}
            oldData['OutsideSrc'] = oldVal
            oldData['Id'] = this.uploadInfo ? this.uploadInfo.id : ''
            data['OutsideSrc'] = iframeSrc
            data['Id'] = ''
            this.model['OutsideSrc'] = iframeSrc
            this.model['Id'] = ''
            this.outsideInfo = newVal
            this.oldOutsideInfo = newVal
            this.onDataChange('changeOutsideSrc', oldData, data)
          }
        } else {
          this.outsideSrcErrorTipsShow = true
        }
      }
    },
    selectVideo(list) {
      let newVideoSrc = ''
      let newCoverSrc = ''
      let newTitle = ''
      let newId = ''
      if (list.length > 0) {
        newVideoSrc = list[0].videoPlayUrl
        newCoverSrc = list[0].coverUrl
        newTitle = list[0].title
        newId = list[0].id
      } else {
        newTitle = '默认标题'
      }
      const oldData = {}
      const data = {}
      oldData['UploadSrc'] = this.model['UploadSrc']
      oldData['Cover'] = this.model['Cover']
      oldData['Title'] = this.model['Title']
      oldData['Id'] = this.model['Id']
      oldData['DefaultCover'] = this.model['DefaultCover']
      data['UploadSrc'] = newVideoSrc
      data['Cover'] = newCoverSrc
      data['Title'] = newTitle
      data['Id'] = newId
      data['DefaultCover'] = newCoverSrc
      this.model['UploadSrc'] = newVideoSrc
      this.model['Cover'] = newCoverSrc
      this.model['Title'] = newTitle
      this.model['Id'] = newId
      this.uploadInfo = list[0]
      this.onDataChange('changeSrcAndCover', oldData, data)
    },
    _handleChangeVideoSrcTab(value) {
      if (this.source === value) return
      let flag = false
      const oldData = {}
      const data = {}
      switch (value) {
        case 1:
          if (this.uploadSrc) {
            oldData['Id'] = ''
            oldData['Source'] = this.model['Source']
            data['Source'] = value
            data['Id'] = this.uploadInfo ? this.uploadInfo.id : ''
            this.model['Source'] = value
            this.model['Id'] = this.uploadInfo ? this.uploadInfo.id : ''
            this.onDataChange('changeTab', oldData, data)
            flag = true
          }
          this.setCoverShow = true
          this.outsideSrcErrorTipsShow = false
          break
        case 0:
          if (
            this.iframeReg.test(this.outsideSrc) ||
            this.httpsReg.test(this.outsideSrc)
          ) {
            oldData['Source'] = this.model['Source']
            oldData['Id'] = this.uploadInfo ? this.uploadInfo.id : ''
            data['Source'] = value
            data['Id'] = ''
            this.model['Id'] = ''
            this.model['Source'] = value
            this.onDataChange('changeTab', oldData, data)
            flag = true
          }
          this.setCoverShow = false
          break
        default:
          break
      }
      if (!flag) {
        oldData['Source'] = this.model['Source']
        data['Source'] = value
        this.model['Source'] = value
        this.onDataChange(null, oldData, data)
      }
    },
    openDialog() {
      this.showVideoDialog = true
    },
    closeDialog() {
      this.showVideoDialog = false
    },
    uploadImg() {
      this.show = true
      if (this.getDataFlag) {
        this.$refs.imageManageArea.getChildData()
        this.getDataFlag = false
      }
    },
    handleCloseModal(msg, data) {
      if (msg) {
        this.btnName = msg
      }
      if (data) {
        this.categoryId = data.categoryId
        this.fileExtension = data.fileExtension
        this.model['Cover'] = data.fullOssUrl
      }

      this.show = false
    },
    clearImg() {
      this.onDataChange(
        'clearCover',
        { Cover: this.model['Cover'] },
        { Cover: this.model['DefaultCover'] }
      )
      this.model['Cover'] = this.model['DefaultCover']
    }
  }
}
</script>

<style lang="scss" scoped>
.video-section {
  .video-select__tab {
    margin-top: 21px;
    li {
      float: left;
      width: 50%;
      height: 32px;
      font-size: $--font-size-small;
      line-height: 32px;
      text-align: center;
      background: $--panel-background-color;
      color: $--usual-font-color-sub;
      cursor: pointer;
    }

    li.active {
      color: $--usual-font-color-main;
      background: $--background-selected;
    }
  }

  .video-select__result {
    margin-top: 21px;
    .result-empty__area,
    .result-data__area {
      padding: 28px 0 27px;
      width: 100%;
      height: 113px;
      border: 1px solid $--usual-border-color;
      cursor: pointer;
      .empty-icon {
        margin: 0 auto 10px;
        display: block;
        width: 24px;
        height: 22px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .empty-tips {
        font-size: $--font-size-normal;
        line-height: 20px;
        color: $--usual-font-color-sub;
        text-align: center;
      }

      .data-icon {
        margin: 0 auto 10px;
        display: block;
        width: 24px;
        height: 22px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
      }

      .data-tips {
        font-size: 14px;
        line-height: 20px;
        padding: 0 8px;
        color: $--usual-font-color-sub;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }

    .select-data__btn {
      margin: 12px 0 16px;
      width: 232px;
    }
  }

  .video-input__area {
    margin: 21px 0 16px;
    height: 146px;
    color: $--popup-font-color-auxiliary;
    border-radius: $--border-radius-base;
    .ouside-src__error--tips {
      font-size: $--font-size-small;
      line-height: 20px;
      i {
        font-size: $--font-size-small;
        color: $-font-color-danger;
        margin-right: 8px;
      }
    }
  }

  .video-input__area /deep/ .el-textarea {
    width: 100%;
    height: 100%;
    .el-textarea__inner {
      height: 140px;
      border-color: $--panel-background-color;
      background: $--panel-background-color;
      resize: none;
    }
  }
}
.video-cover__src {
  width: 234px;
  height: 160px;
  .video-cover__src--empty {
    height: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    flex-wrap: wrap;
    background: $--panel-background-content-color;
    .empty-icon {
      margin: 0 auto;
      display: block;
      width: 30px;
      height: 30px;
      line-height: 30px;
      background: $--panel-background-color;
      text-align: center;
      cursor: pointer;
      i {
        color: $--usual-font-color-main;
      }
    }

    p {
      margin-top: 10px;
      width: 100%;
      font-size: $--font-size-normal;
      color: $--popup-font-color-auxiliary;
      line-height: 20px;
      text-align: center;
    }
  }

  .video-cover__src--data {
    width: 234px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    .video-cover__operate--area {
      display: none;
      text-align: center;
      li {
        display: inline-block;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: $--popup-background-mask;
        border-radius: 50%;
        cursor: pointer;
        i {
          color: $--usual-font-color-main;
        }
        &:hover {
          i {
            color: $--font-color-hover;
          }
        }
      }

      li:last-of-type {
        margin-left: 30px;
      }
    }
  }

  .video-cover__src--data:hover {
    .video-cover__operate--area {
      display: block;
    }
  }
}

.autoplay-setting__area {
  span {
    font-size: $--font-size-normal;
  }
}
</style>
