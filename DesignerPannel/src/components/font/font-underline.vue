<template>
  <i class="iconfont iconicon-des-u fonticon font-icon__size" :class="{active: textDecoration == 'underline'}" @click="_handleSetUnderline"></i>
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
    textDecoration: {
      get: function() {
        return this.model[this.prefix + 'textDecoration']
      },
      set: function() {}
    }
  },
  created() {
  },
  methods: {
    _handleSetUnderline() {
      const oldValue = this.textDecoration
      const newVal = this.textDecoration === 'none' ? 'underline' : 'none'
      if (oldValue !== newVal) {
        const data = {}
        const oldData = {}
        this.model[this.prefix + 'textDecoration'] = newVal
        data[this.prefix + 'textDecoration'] = newVal
        oldData[this.prefix + 'textDecoration'] = oldValue
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
