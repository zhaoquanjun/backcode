<template>
  <div class="font-section">
    <div class="font-setting__area flex-between-center--area">
      <font-family :model="model" :prefix="prefix"></font-family>
      <!-- 字体颜色选择器 begin -->
      <font-color :model="model" :prefix="prefix"></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontColor from '@comp/font/font-color'
export default {
  name: 'FontStyle4',
  components: {
    FontFamily,
    FontColor
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: () => {
        return '$'
      }
    },
    fontRange: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>
