<template>
  <div class="font-section">
    <div class="font-setting__area flex-between-center--area">
      <font-family
        :model="model"
        :prefix="prefix"
      ></font-family>
      <font-size
        :model="model"
        :prefix="prefix"
        :value-range="fontRange"
      ></font-size>
    </div>
    <div class="font-setting__area flex-between-center--area row-top__dis">
      <ul class="font-style flex-start-center--area">
        <li>
          <font-weight
            :prefix="prefix"
            :model="model"
          ></font-weight>
        </li>
        <li>
          <font-italic
            :prefix="prefix"
            :model="model"
          ></font-italic>
        </li>
        <li>
          <font-underline
            :prefix="prefix"
            :model="model"
          ></font-underline>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color
        :model="model"
        :prefix="prefix"
      ></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'

export default {
  name: 'FontStyle4',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline
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
      type: Object
    }
  },
  data() {
    return {
      activeName: '1'
    }
  }
}
</script>
<style lang="scss" scoped>
.font-style {
  width: 166px !important;
  li {
    width: 27px !important;
  }
}
</style>
