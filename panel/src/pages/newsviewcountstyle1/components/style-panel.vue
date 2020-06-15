<template>
  <div class="setting-block__section">
    <p class="setting-block--title">文字样式</p>
    <font
      :model="model"
      :value="value"
      :prefix="prefix"
      :font-range="fontRange"
    />
  </div>
</template>

<script>
import Font from './font'
export default {
  components: {
    Font
  },
  props: {
    model: {
      type: Object
    },
    value: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.text-font__area {
  padding: 16px 0 24px;
  margin-bottom: 16px;
  p {
    font-size: 14px;
    padding: 0 24px 24px;
  }
}
</style>
