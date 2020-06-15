<template>
  <div class="section-content">
    <div class="setting-attribute--title">颜色</div>
    <el-color-picker
      v-model="bgColor"
      size="small"
      :style="{ width: width + 'px' }"
      :predefine="predefineColors"
      show-alpha
    ></el-color-picker>
  </div>
</template>
<script>
import themeColorConfig from '@/config/theme.js'
export default {
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
    },
    activeName: {
      type: String,
      default: ''
    },
    width: {
      type: Number,
      default: 0
    },
    name: {
      type: String,
      default: ''
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
          this.model[this.name] === 'none'
            ? 'rgba(255, 255, 255, 1)'
            : this.model[this.name]
        return color
      },
      set: function(newValue) {
        const oldValue = this.model[this.name]

        var rgb = newValue.match(
          /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
        )
        newValue =
          rgb && rgb.length === 4
            ? '#' +
              ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) +
              ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2) +
              ('0' + parseInt(rgb[3], 10).toString(16)).slice(-2)
            : ''

        if (oldValue !== newValue) {
          const data = JSON.parse(JSON.stringify(this.model))
          const oldData = JSON.parse(JSON.stringify(this.model))
          this.model[this.name] = newValue
          oldData[this.name] = oldValue
          data[this.name] = newValue
          this.$emit('onDataChange', 'renderQRCode', oldData, data)
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
.section-content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .bg-picker-title {
    font-size: 14px;
    line-height: 16px;
    padding-right: 16px;
  }
}
</style>
