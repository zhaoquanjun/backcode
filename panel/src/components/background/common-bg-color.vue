<template>
  <div class="bg-color__section">
    <span class="bg-title">
      <slot></slot>
    </span>
    <div class="bg-color__area">
      <el-color-picker
        v-model="color"
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
    colorName: {
      type: String,
      default: 'bgColor'
    }
  },
  data() {
    return {
      config: themeColorConfig
    }
  },
  computed: {
    predefineColors: {
      get: function() {
        return Object.values(themeColorConfig.data)
      },
      set: function() {}
    },
    color: {
      get: function() {
        return this.model[this.prefix + this.colorName]
      },
      set: function(newVal) {
        var oldVal = this.model[this.prefix + this.colorName]
        if (newVal !== oldVal) {
          const oldData = {}
          const data = {}
          oldData[this.prefix + this.colorName] = oldVal
          data[this.prefix + this.colorName] = newVal
          this.model[this.prefix + this.colorName] = newVal
          this.onCssChange(oldData, data)
        }
      }
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
.bg-color__section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .bg-title {
    flex: none;
  }
  .bg-color__area {
    width: 100%;
    padding-left: 18px;
  }
  .bg-color__area /deep/ .el-color-picker--small {
    width: 100%;
  }
}
</style>
