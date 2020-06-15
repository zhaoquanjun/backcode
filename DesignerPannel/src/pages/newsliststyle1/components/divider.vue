<template>
  <div class="divider-section">
    <border-color style="margin-top: 0;" :model="model" :width="232" :prefix="prefix">颜色</border-color>
    <border-style :model="model" :prefix="prefix">线型</border-style>
  </div>
</template>

<script>
import BorderColor from '@comp/border/border-color'
import BorderStyle from '@comp/border/border-style'

export default {
  components: {
    BorderColor,
    BorderStyle
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
