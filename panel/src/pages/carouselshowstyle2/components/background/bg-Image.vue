<template>
  <div class="image-area">
    <div class="section-title setting-block--title">图片</div>
    <div class="bg-image__area flex-between-center--area">
      <div class="upload-box" @click="uploadImg">
        <div v-show="bgImage === defaultImage" class="default-show">
          <div class="default-image"></div>
          <p class="desc">添加图片</p>
        </div>
        <div
          v-show="bgImage != defaultImage"
          class="real-show"
          :style="{ backgroundImage: `url(${bgImage})` }"
        ></div>
      </div>
      <ul class="pos-section">
        <li
          v-for="(item, index) in positionInfo"
          :key="index"
          class="position flex-center-center--area"
          :class="{ active: item.position == bgPositon }"
          @click="setBgPosition(index)"
        >
          <i
            class="iconfont"
            :class="{
              'iconicon-circular': index == 4,
              iconjiantoushang: index !== 4
            }"
            :style="{ transform: 'rotate(' + item.rotate + ')' }"
          ></i>
        </li>
      </ul>
    </div>
    <div class="ways">
      <el-select v-model="bgSize" popper-class="m-dataselect" class="m-imgtype">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <div class="divider"></div>
    <div class="section-content">
      <div class="bg-picker-title">图片背景色</div>
      <el-color-picker
        v-model="bgColor"
        size="small"
        class="bordered"
        :predefine="predefineColors"
        show-alpha
      ></el-color-picker>
    </div>
    <div>
      <div v-show="isModalShow" class="mask"></div>
      <div v-show="isModalShow" id="content">
        <el-header class="modal-header">
          <span style="font-size: 16px;">我的图片</span>
          <span @click="cancelgetImg"><i class="iconfont iconguanbi"></i></span>
        </el-header>
        <img-manage
          ref="imgList"
          data-type="imgList"
          :multiple="false"
          @getImgInfo="getImgInfo"
        >
          <div slot="modal-footer" class="modal-footer">
            <div
              class="ym-button--isplain"
              style="margin-right: 16px;"
              @click="cancelgetImg"
            >
              取消
            </div>
            <div class="ym-button--primary" @click="getImg">确定</div>
          </div>
        </img-manage>
      </div>
    </div>
  </div>
</template>
<script>
import imgManage from '@comp/imgManage/index'
import themeColorConfig from '@/config/theme.js'
export default {
  components: {
    imgManage
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    activeName: {
      type: String
    }
  },
  data() {
    return {
      options: [
        {
          value: 'none',
          label: '原始填充'
        },
        {
          value: 'cover',
          label: '裁剪填充'
        },
        {
          value: '100% 100%',
          label: '拉伸填充'
        },
        {
          value: 'auto',
          label: '平铺填充'
        }
      ],
      positionInfo: [
        {
          rotate: '-45deg',
          position: '0 0'
        },
        {
          rotate: '0',
          position: '50% 0'
        },
        {
          rotate: '45deg',
          position: '100% 0'
        },
        {
          rotate: '-90deg',
          position: '0 50%'
        },
        {
          rotate: '0',
          position: '50% 50%'
        },
        {
          rotate: '90deg',
          position: '100% 50%'
        },
        {
          rotate: '-135deg',
          position: '0 100%'
        },
        {
          rotate: '-180deg',
          position: '50% 100%'
        },
        {
          rotate: '135deg',
          position: '100% 100%'
        }
      ],
      defaultImage: require('@static/images/background/default_background_placeholder.png'),
      getDataFlag: true,
      isModalShow: false
    }
  },
  computed: {
    bgPositon: {
      get: function() {
        const bgPosition = this.model[this.prefix + 'BgPosition']
        return bgPosition
      },
      set: function() {}
    },
    bgSize: {
      get: function() {
        const bgSize = this.model[this.prefix + 'BgSize']
        return bgSize
      },
      set: function(newValue) {
        const oldValue = this.model[this.prefix + 'BgSize']
        if (newValue === 'auto') {
          const oldValueData = this.model[this.prefix + 'BgRepeat']
          if (oldValueData !== newValue && this.activeName === '3') {
            this.model[this.prefix + 'BgSize'] = 'auto'
            this.model[this.prefix + 'BgRepeat'] = 'repeat'
          }
        } else {
          if (oldValue !== newValue && this.activeName === '3') {
            this.model[this.prefix + 'BgSize'] = newValue
            this.model[this.prefix + 'BgRepeat'] = 'no-repeat'
          }
        }
      }
    },
    bgImage: {
      get: function() {
        var bgImage = ''
        if (
          this.model[this.prefix + 'Src'] === '' ||
          this.model[this.prefix + 'Src'] === "''"
        ) {
          bgImage = this.defaultImage
        } else {
          bgImage = this.model[this.prefix + 'Src']
        }
        return bgImage
      },
      set: function() {}
    },
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() {}
    },
    bgColor: {
      get: function() {
        var color =
          this.model[this.prefix + 'BgColor'] === 'transparent'
            ? null
            : this.model[this.prefix + 'BgColor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'BgColor']

        if (oldValue !== newVal) {
          this.$set(this.model, this.prefix + 'BgColor', newVal)
        }
      }
    }
  },
  methods: {
    setBgPosition(index) {
      const newValue = this.positionInfo[index].position
      const oldValue = this.model[this.prefix + 'BgPosition']
      if (oldValue !== newValue) {
        this.model[this.prefix + 'BgPosition'] = newValue
      }
    },
    setBgImage(newValue) {
      const oldValue = this.model[this.prefix + 'Src']
      if (oldValue !== newValue) {
        this.$set(this.model, this.prefix + 'Src', newValue)
        this.$set(this.model, this.prefix + 'Gradientstartcolor', 'none')
        this.$set(this.model, this.prefix + 'Gradientendcolor', 'none')
        this.$set(this.model, this.prefix + 'Violet', '0deg')
      }
    },
    uploadImg() {
      this.isModalShow = true
      this.getChildData()
    },
    getImgInfo(info) {
      this.imgData = info
    },
    getImg() {
      this.setBgImage(this.imgData[0].fullOssUrl)
      this.isModalShow = false
    },
    // 关闭图片选择弹窗
    cancelgetImg() {
      this.isModalShow = false
    },
    getChildData() {
      this.$nextTick(() => {
        if (this.getDataFlag) {
          this.$refs.imgList.getPictureData()
        }
        this.getDataFlag = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.image-area {
  .section-title {
    color: $--color-main !important;
    padding-bottom: 16px;
  }
  .bg-image__area {
    padding: 0 8px 0 0;
    .upload-box {
      width: 83px;
      height: 69px;
      background-color: $--popup-background-auxiliary;
      border-radius: 2px;
      cursor: pointer;

      .default-show {
        padding-top: 11px;
        width: 100%;
        height: 100%;
        cursor: pointer;

        .default-image {
          margin: 0 auto 5px;
          width: 27px;
          height: 24px;
          background: url('~@static/images/background/default_background_placeholder.png')
            no-repeat center center;
          background-size: 100% 100%;
          cursor: pointer;
        }

        .desc {
          font-size: 12px;
          font-weight: 400;
          color: $--color-main;
          line-height: 17px;
          text-align: center;
          cursor: pointer;
        }
      }

      .real-show {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% 100%;
        cursor: pointer;
      }
    }
    .pos-section {
      width: 70px;
      height: 70px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 21px;
        height: 21px;
        background: $--list-background-hover;
        i {
          font-size: $--font-size-small;
          color: $--color-main;
        }
      }
      .active {
        background: $--color-main;
        i {
          color: $--usual-font-color-main;
        }
      }
    }
  }
  .ways {
    margin-top: 16px;
    .el-select {
      width: 100%;
      height: 40px;
      max-width: none;
    }
  }

  .divider {
    border-color: $--popup-border-color !important;
  }

  .section-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;

    .bg-picker-title {
      font-size: $--font-size-small;
      color: $--popup-font-color-main;
    }
  }

  .section-content /deep/ .el-color-picker--small {
    width: 120px;
  }
  .ways /deep/ .el-select .el-input__inner {
    padding: 8px;
    text-align: left;
    color: $--popup-font-color-main;
    background-color: $--popup-background-main !important;
    border-color: $--popup-border-color !important;
  }
}
</style>

<style lang="scss">
.el-select-dropdown {
  border-color: $--popup-background-main !important;
}
.el-select-dropdown .el-select-dropdown__list {
  background-color: $--popup-background-main !important;
}

.el-select-dropdown .el-select-dropdown__list .el-select-dropdown__item {
  color: $--popup-font-color-sub;
}

.el-select-dropdown .el-select-dropdown__list .el-select-dropdown__item.hover {
  background-color: $--popup-background-main !important;
}

.el-select-dropdown .el-select-dropdown__list .el-select-dropdown__item:hover {
  background-color: $--list-background-hover !important;
}

.el-select-dropdown
  .el-select-dropdown__list
  .el-select-dropdown__item.selected {
  background-color: $--list-background-selected;
}

.el-select-dropdown .popper__arrow::after {
  border-top-color: $--popup-background-main !important;
  border-bottom-color: $--popup-background-main !important;
}
</style>

<style lang="scss" scoped>
@import '@static/styles/components/select-picture-popup.scss';
</style>
