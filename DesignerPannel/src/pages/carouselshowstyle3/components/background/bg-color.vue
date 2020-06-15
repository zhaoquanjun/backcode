<template>
  <div class="pure-area">
    <div class="section-title setting-block--title">纯色</div>
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
      type: String
    },
    activeName: {
      type: String
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
          this.model[this.prefix + 'BgColor'] === 'transparent'
            ? null
            : this.model[this.prefix + 'BgColor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'BgColor']

        if (oldValue !== newVal && this.activeName === '1') {
          this.$set(this.model, this.prefix + 'BgColor', newVal)
          this.$set(this.model, this.prefix + 'Gradientstartcolor', 'none')
          this.$set(this.model, this.prefix + 'Gradientendcolor', 'none')
          this.$set(this.model, this.prefix + 'Violet', '0deg')
          this.$set(this.model, this.prefix + 'Src', '')
          this.$set(this.model, this.prefix + 'BgPosition', 'none')
          this.$set(this.model, this.prefix + 'BgSize', 'none')
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
    formatTooltip(val) {
      return val / 100
    },
    _handleChangeSliderValue(val) {
      this.opacity = val
    },
    _handleChangeSliderNum(val) {
      this.opacitySlider = val
    }
  }
}
</script>
<style lang="scss" scoped>
.section-title {
  color: $--color-main !important;
  padding-bottom: 16px;
}
.section-content {
  padding-left: 12px;
  .bg-picker-title {
    color: $--popup-font-color-main !important;
    line-height: 16px;
    padding-right: 8px;
  }
}
.pure-area .section-content /deep/ .el-color-picker--small {
  width: 140px;
}
</style>

