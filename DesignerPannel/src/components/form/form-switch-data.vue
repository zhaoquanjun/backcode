<template>
  <div class="switch-sction">
    <slot></slot>

    <el-switch v-model="switchValue"></el-switch>
  </div>
</template>

<script>
export default {
  props: {
    modelData: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    funName: {
      type: String,
      default: 'onDataChange'
    },
    eventName: {
      type: String,
      default: ''
    }
  },
  computed: {
    switchValue: {
      get: function() {
        return this.modelData[this.name] === true
      },
      set: function(newVal) {
        var oldData = {}
        var data = {}
        var newValue = newVal
        oldData[this.name] = this.switchValue
        data[this.name] = newValue
        this.modelData[this.name] = newValue
        this[this.funName](this.eventName, oldData, data)
        this.onCssChange(oldData, data)
      }
    }
  },
  methods: {
    onDataChange(action, oldData, data) {
      if (window.smSite) {
        console.log(action, oldData, data)
        window.smSite.onDataChange(action, oldData, data)
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
.switch-sction {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
