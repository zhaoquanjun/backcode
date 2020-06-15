<template>
  <div class="image-area">
    <div class="section-title setting-block--title">图片</div>
    <div class="bg-image__area flex-start-start--area">
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
      isModalShow: false, //  弹窗 : true 打开 | false 关闭
      getDataFlag: true
    }
  },
  computed: {
    bgPositon: {
      get: function() {
        const bgPosition = this.model[this.prefix + 'bgPosition']
        return bgPosition
      },
      set: function() {}
    },
    bgSize: {
      get: function() {
        const bgSize = this.model[this.prefix + 'bgSize']
        return bgSize
      },
      set: function(newValue) {
        const oldValue = this.model[this.prefix + 'bgSize']
        const oldRepeat = this.model[this.prefix + 'bgRepeat']
        const data = {}
        const oldData = {}
        if (newValue === 'auto') {
          const oldValueData = this.model[this.prefix + 'bgRepeat']
          if (oldValueData !== newValue && this.activeName === '3') {
            this.model[this.prefix + 'bgSize'] = newValue
            this.model[this.prefix + 'bgRepeat'] = 'repeat'
            oldData[this.prefix + 'bgSize'] = oldValue
            oldData[this.prefix + 'bgRepeat'] = oldRepeat
            data[this.prefix + 'bgRepeat'] = 'repeat'
            data[this.prefix + 'bgSize'] = newValue
          }
        } else {
          if (oldValue !== newValue && this.activeName === '3') {
            this.model[this.prefix + 'bgSize'] = newValue
            this.model[this.prefix + 'bgRepeat'] = 'no-repeat'
            oldData[this.prefix + 'bgSize'] = oldValue
            oldData[this.prefix + 'bgRepeat'] = oldRepeat
            data[this.prefix + 'bgSize'] = newValue
            data[this.prefix + 'bgRepeat'] = 'no-repeat'
          }
        }
        this.onCssChange(oldData, data)
      }
    },
    bgImage: {
      get: function() {
        var bgImage = ''
        if (
          !this.model[this.prefix + 'bgImage'] ||
          this.model[this.prefix + 'bgImage'] === '' ||
          this.model[this.prefix + 'bgImage'] === "''"
        ) {
          bgImage = this.defaultImage
        } else {
          bgImage = this.model[this.prefix + 'bgImage']
        }
        return bgImage
      },
      set: function() {}
    }
  },
  methods: {
    setBgPosition(index) {
      const newValue = this.positionInfo[index].position
      const oldValue = this.model[this.prefix + 'bgPosition']
      if (oldValue !== newValue) {
        const oldData = {}
        const data = {}
        this.model[this.prefix + 'bgPosition'] = newValue
        oldData[this.prefix + 'bgPosition'] = oldValue
        data[this.prefix + 'bgPosition'] = newValue
        this.onCssChange(oldData, data)
      }
    },
    setBgImage(newValue) {
      const oldValue = this.model[this.prefix + 'bgImage']
      const oldBgStartColor = this.model[this.prefix + 'gradientstartcolor']
      const oldBgEndColor = this.model[this.prefix + 'gradientendcolor']
      const oldVolit = this.model[this.prefix + 'violet']
      const oldBgColor = this.model[this.prefix + 'bgColor']
      if (oldValue !== newValue) {
        const oldData = {}
        const data = {}
        this.model[this.prefix + 'bgImage'] = newValue
        this.model[this.prefix + 'bgColor'] = 'transparent'
        this.model[this.prefix + 'gradientstartcolor'] = 'none'
        this.model[this.prefix + 'gradientendcolor'] = 'none'
        this.model[this.prefix + 'violet'] = '0deg'

        oldData[this.prefix + 'bgImage'] = oldValue
        oldData[this.prefix + 'bgColor'] = oldBgColor
        oldData[this.prefix + 'gradientstartcolor'] = oldBgStartColor
        oldData[this.prefix + 'gradientendcolor'] = oldBgEndColor
        oldData[this.prefix + 'violet'] = oldVolit

        data[this.prefix + 'bgImage'] = newValue
        data[this.prefix + 'bgColor'] = 'transparent'
        data[this.prefix + 'gradientstartcolor'] = 'none'
        data[this.prefix + 'gradientendcolor'] = 'none'
        data[this.prefix + 'violet'] = '0deg'
        this.onCssChange(oldData, data)
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
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        if (
          this.prefix === '$content-' ||
          this.prefix === '$header-' ||
          this.prefix === '$footer-'
        ) {
          window.smSite.onPageCssChange(oldData, data)
        } else {
          window.smSite.onCssChange(oldData, data)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.image-area {
  .section-title {
    padding-bottom: 16px;
  }
  .bg-image__area {
    padding-left: 12px;
    .upload-box {
      width: 83px;
      height: 69px;
      background-color: $--panel-background-content-color;
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
      margin-left: 24px;
      width: 70px;
      height: 70px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-content: space-between;
      li {
        width: 21px;
        height: 21px;
        background: $--panel-background-content-color;
        i {
          font-size: $--font-size-small;
          color: $--popup-background-main;
        }
      }
      .active {
        i {
          color: $--background-selected;
        }
      }
    }
  }
  .ways {
    margin-top: 16px;
    padding-left: 12px;
    .el-select {
      max-width: 100%;
      width: 177px;
      height: 40px;
      .el-input__inner {
        padding: 8px;
        text-align: left;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
@import '@static/styles/components/select-picture-popup.scss';
</style>
