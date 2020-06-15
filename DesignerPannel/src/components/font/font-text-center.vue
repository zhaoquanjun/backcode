<template>
  <i class="iconfont iconicon-des-jz fonticon font-icon__size" :class="{active: textAlign == 'center'}" @click="_handleSetTextAlign"></i>
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
    return {
      align: 'center'
    }
  },
  computed: {
    textAlign: {
      get: function() {
        return this.model[this.prefix + 'textAlign']
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetTextAlign() {
      const oldValue = this.model[this.prefix + 'textAlign']
      if (oldValue !== this.align) {
        const data = {}
        const oldData = {}
        this.model[this.prefix + 'textAlign'] = 'center'
        data[this.prefix + 'textAlign'] = this.textAlign
        oldData[this.prefix + 'textAlign'] = oldValue
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
i {
  font-size: 12px;
}
</style>
