<template>
  <i class="iconfont iconicon-des-i fonticon font-icon__size" :class="{active: fontStyle == 'italic'}" @click="_handleSetUnderline"></i>
</template>
<script>
export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    }
  },
  data() {
    return {}
  },
  computed: {
    fontStyle: {
      get: function() {
        return this.model[this.prefix + 'fontStyle']
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetUnderline() {
      const oldValue = this.fontStyle
      const newVal = this.fontStyle === 'normal' ? 'italic' : 'normal'
      if (oldValue !== newVal) {
        const data = {}
        const oldData = {}
        this.model[this.prefix + 'fontStyle'] = newVal
        data[this.prefix + 'fontStyle'] = newVal
        oldData[this.prefix + 'fontStyle'] = oldValue
        this.onCssChange(oldData, data)
      }
    },
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: $--color-main;
}
</style>
