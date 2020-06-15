<template>
  <border-color
    style="margin-top: 0;"
    :model="model"
    :width="232"
    :prefix="prefix"
  >颜色</border-color>
</template>
<script>
import BorderColor from '@comp/border/border-color'
export default {
  name: 'Border',
  components: { BorderColor },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String
    },
    fontRange: {
      type: Object
    }
  }
}
</script>
