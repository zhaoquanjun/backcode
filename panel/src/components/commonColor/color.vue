<template>
  <div class="common-color__area">
    <slot></slot>
    <el-color-picker
      v-model="Color"
      :style="{width: width + 'px'}"
      size="small"
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
    name: {
      type: String
    },
    prefix: {
      type: String,
      default: '$'
    },
    width: {
      type: Number,
      default: 160
    }
  },
  data() {
    return {
      config: themeColorConfig
    }
  },
  computed: {
    Color: {
      get: function() {
        var color =
          this.model[this.prefix + this.name] == 'none'
            ? 'rgba(255, 255, 255, 1)'
            : this.model[this.prefix + this.name]
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + this.name]

        if (oldValue !== newVal) {
          this.model[this.prefix + this.name] = newVal
          const data = {}
          const oldData = {}
          data[this.prefix + this.name] = newVal
          oldData[this.prefix + this.name] = oldValue
          this.onCssChange(oldData, data)
        }
      }
    },
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() { }
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
.common-color__area {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

