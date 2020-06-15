<template>
  <div
    class="flex-start-center--area setting-block__top"
    :style="{ width: width + unit }"
  >
    <span class="setting-attribute--title">
      <slot></slot>
    </span>
    <el-color-picker
      v-model="borderColor"
      :style="{ width: '180px' }"
      size="small"
      class="bordered"
      :predefine="predefineColors"
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
      type: Number
    },
    unit: {
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
    borderColor: {
      get: function() {
        var color =
          this.model[this.prefix + 'bdColor'] === 'transparent'
            ? null
            : this.model[this.prefix + 'bdColor']
        return color
      },
      set: function(newVal) {
        const oldValue = this.model[this.prefix + 'bdColor']
        if (oldValue !== newVal) {
          const data = {}
          const oldData = {}
          this.model[this.prefix + 'bdColor'] = newVal
          data[this.prefix + 'bdColor'] = newVal
          oldData[this.prefix + 'bdColor'] = oldValue
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
