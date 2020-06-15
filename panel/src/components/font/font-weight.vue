<template>
  <i class="iconfont iconicon-des-weightfont fonticon font-icon__size" :class="{active: fontWeight == 'bold'}" @click="_handleSetFontWeight"></i>
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
    fontWeight: {
      get: function() {
        return this.model[this.prefix + 'fontWeight']
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetFontWeight() {
      const oldValue = this.fontWeight
      const newVal = this.fontWeight === 'normal' ? 'bold' : 'normal'
      if (oldValue !== newVal) {
        const data = {}
        const oldData = {}
        this.model[this.prefix + 'fontWeight'] = newVal
        data[this.prefix + 'fontWeight'] = newVal
        oldData[this.prefix + 'fontWeight'] = oldValue
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
  color: $--font-color-selected;
}
</style>

