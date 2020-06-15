<template>
  <div class="switch-sction flex-between-center--area">
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
    },
    attribute: {
      type: String,
      default: () => {
        return 'block'
      }
    }
  },
  computed: {
    switchValue: {
      get: function() {
        return (
          this.model.styleModel.cssvars[this.prefix + this.name] ===
          this.attribute
        )
      },
      set: function(newVal) {
        var oldData = {}
        var data = {}
        var newValue = newVal ? this.attribute : 'none'
        oldData[this.prefix + this.name] = this.switchValue
          ? this.attribute
          : 'none'
        data[this.prefix + this.name] = newValue
        this.model.styleModel.cssvars[this.prefix + this.name] = newValue
        this.onCssChange(oldData, data)
        // 时间轴组件时间显示隐藏特殊处理 **
        if (this.prefix === '$time-') {
          this.$emit('changeTimeShow', newValue)
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
