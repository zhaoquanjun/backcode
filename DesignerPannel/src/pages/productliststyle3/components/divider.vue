<template>
  <div class="divider-section">
    <border-color :model="model" :width="192" :prefix="prefix">颜色</border-color>
    <border-style :model="model" :prefix="prefix" style="padding-top: 24px;">线型</border-style>
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
