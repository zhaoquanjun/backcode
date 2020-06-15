<template>
  <div class="border-section">
    <!-- 颜色 begin -->
    <border-color :model="model" :prefix="prefix" style="margin-top: -16px;">颜色</border-color>
    <!-- 颜色 end -->
  </div>
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
    }
  }
}
</script>
