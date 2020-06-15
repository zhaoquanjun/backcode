<template>
  <div class="divider-section">
    <border-color :model="model" :width="192" :prefix="prefix">颜色</border-color>
    <border-style :model="model" :prefix="prefix" style="padding-top: 24px;">线型</border-style>
  </div>
</template>
  
<script>
import BorderColor from '@comp/border/border-color';
import BorderStyle from '@comp/border/border-style';

export default {
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    }
  },
  components: {
    BorderColor,
    BorderStyle
  }
}
</script>

<style lang="scss" scoped>

</style>