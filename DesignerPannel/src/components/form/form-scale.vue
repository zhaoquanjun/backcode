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
      type: Object
    },
    prefix: {
      type: String
    },
    name: {
      type: String
    }
  },
  computed: {
    switchValue: {
      get: function() {
        return this.model[this.prefix + this.name] > 1
      },
      set: function(newVal) {
        var oldData = {}
        var data = {}
        var newValue = newVal ? 1.2 : 1
        oldData[this.prefix + this.name] = this.model[this.prefix + this.name]
        data[this.prefix + this.name] = newValue
        this.model[this.prefix + this.name] = newValue
        this.onCssChange(oldData, data)
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
.switch-sction {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
