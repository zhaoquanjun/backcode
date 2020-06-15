<template>
  <div class="switch-sction">
    <slot></slot>
    <el-switch v-model="switchValue"></el-switch>
  </div>
</template>

<script>
export default {
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
    }
  },
  // computed: {
  //   pos() {
  //     return this.model[this.prefix + 'location-mode']
  //   }
  // },
  computed: {
    switchValue: {
      get: function() {
        return this.model[this.prefix + 'location-mode'] === 'fixed'
      },
      set: function(newVal) {
        console.log(newVal)
        var newValue = newVal ? 'fixed' : 'relative'
        this.setPosition(newValue)
      }
    }
  },
  methods: {
    setPosition(newVal) {
      const oldValue = this.model[this.prefix + 'location-mode']
      if (oldValue !== newVal) {
        this.model[this.prefix + 'location-mode'] = newVal
        const data = {}
        const oldData = {}
        data[this.prefix + 'location-mode'] = newVal
        oldData[this.prefix + 'location-mode'] = oldValue
        this.onCssChange(oldData, data)
      }
    },
    onCssChange(action, oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(action, oldData, data)
      }
    }
  }
}
</script>

<style lang='scss' scoped>
.list-pos {
  div {
    line-height: 40px;
    color: #fff;
    &:hover {
      background-color: $--color-main;
    }
    &.active {
      background-color: $--color-main;
    }
  }
}
</style>
<style lang="scss" scoped>
.switch-sction {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
