<template>
  <div class="animate-switch__sction">
    <span class="setting-attribute--title">仅播放一次动画</span>
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
        return !this.model['autoReverse']
      },
      set: function(newVal) {
        const oldValue = !this.model['autoReverse']
        var oldData = {}
        var data = {}
        oldData['autoReverse'] = oldValue
        data['autoReverse'] = !newVal
        this.model['autoReverse'] = !newVal
        this.$emit('onDataChange', 'animate', oldData, data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.animate-switch__sction {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px 32px;
  span.switch-desc {
    font-size: $--font-size-normal;
    line-height: 20px;
  }
}
</style>
