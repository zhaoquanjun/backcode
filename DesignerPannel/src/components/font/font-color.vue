<template>
  <div class="font-color__section flex-between-center--area">
    <span class="compontents-title"><slot></slot></span>
    <el-color-picker
      v-model="fontColor"
      size="small"
      :style="{ width: width + units }"
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
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    width: {
      type: Number,
      default: 50
    },
    units: {
      type: String,
      default: 'px'
    }
  },
  data() {
    return {
      config: themeColorConfig
    }
  },
  computed: {
    fontColor: {
      get: function() {
        var color =
          this.model[this.prefix + 'ftColor'] === 'none'
            ? 'rgba(255, 255, 255, 1)'
            : this.model[this.prefix + 'ftColor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'ftColor']

        if (oldValue !== newVal) {
          this.model[this.prefix + 'ftColor'] = newVal
          const data = {}
          const oldData = {}
          data[this.prefix + 'ftColor'] = newVal
          oldData[this.prefix + 'ftColor'] = oldValue
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
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.compontents-title {
  color: $--usual-font-color-main;
  flex: none;
  padding-right: 15px;
}
</style>
