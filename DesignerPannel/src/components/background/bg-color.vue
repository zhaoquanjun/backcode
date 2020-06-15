<template>
  <div class="pure-area">
    <div v-if="titleShow" class="section-title setting-block--title">纯色</div>
    <div class="section-content flex-start-center--area">
      <div class="bg-picker-title setting-attribute--title">颜色</div>
      <el-color-picker
        v-model="bgColor"
        size="small"
        :predefine="predefineColors"
        show-alpha
      ></el-color-picker>
    </div>
  </div>
</template>
<script>
import themeColorConfig from '@/config/theme.js'
export default {
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
    },
    titleShow: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      config: themeColorConfig
    }
  },
  computed: {
    bgColor: {
      get: function() {
        var color =
          this.model[this.prefix + 'bgColor'] === 'transparent'
            ? null
            : this.model[this.prefix + 'bgColor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'bgColor']
        const oldBgStartColor = this.model[this.prefix + 'gradientstartcolor']
        const oldBgEndColor = this.model[this.prefix + 'gradientendcolor']
        const oldVolit = this.model[this.prefix + 'violet']
        const oldBgImage = this.model[this.prefix + 'bgImage']
        const oldBgPosition = this.model[this.prefix + 'bgPosition']
        const oldBgSize = this.model[this.prefix + 'bgSize']

        if (oldValue !== newVal && this.activeName === '1') {
          this.model[this.prefix + 'bgColor'] = newVal
          this.model[this.prefix + 'gradientstartcolor'] = 'none'
          this.model[this.prefix + 'gradientendcolor'] = 'none'
          this.model[this.prefix + 'violet'] = 0
          this.model[this.prefix + 'bgImage'] = ''
          this.model[this.prefix + 'bgPosition'] = '50% 50%'
          this.model[this.prefix + 'bgSize'] = 'cover'

          const data = {}
          const oldData = {}
          data[this.prefix + 'bgColor'] =
            newVal == null ? 'transparent' : newVal
          data[this.prefix + 'gradientstartcolor'] = 'none'
          data[this.prefix + 'gradientendcolor'] = 'none'
          data[this.prefix + 'violet'] = 0
          data[this.prefix + 'bgImage'] = ''
          data[this.prefix + 'bgPosition'] = '50% 50%'
          data[this.prefix + 'bgSize'] = 'cover'
          oldData[this.prefix + 'bgColor'] = oldValue
          oldData[this.prefix + 'gradientstartcolor'] = oldBgStartColor
          oldData[this.prefix + 'gradientendcolor'] = oldBgEndColor
          oldData[this.prefix + 'violet'] = oldVolit
          oldData[this.prefix + 'bgImage'] = oldBgImage
          oldData[this.prefix + 'bgPosition'] = oldBgPosition
          oldData[this.prefix + 'bgSize'] = oldBgSize
          this.onCssChange(oldData, data)
        }
      }
    },
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() {}
    }
  },
  methods: {
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
.section-title {
  padding-bottom: 16px;
}
.section-content {
  padding-left: 12px;
  .bg-picker-title {
    line-height: 16px;
    padding-right: 8px;
  }
}
.pure-area .section-content /deep/ .el-color-picker--small {
  width: 140px;
}
</style>
