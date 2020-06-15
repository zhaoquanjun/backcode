<template>
  <i class="iconfont iconicon-des-right fonticon font-icon__size" :class="{active: textAlign == 'right'}" @click="_handleSetTextAlign"></i>
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
    textAlign: {
      get: function() {
        return this.model[this.prefix + 'textAlign']
      },
      set: function() {}
    }
  },
  methods: {
    _handleSetTextAlign() {
      const oldValue = this.textAlign
      this.model[this.prefix + 'textAlign'] = 'right'
      if (oldValue !== this.textAlign) {
        const data = {}
        const oldData = {}
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
