<template>
  <div class="font-section">
    <div class="font-setting__area flex-between-center--area">
      <TitleFont
        :model="model"
        :prefix="'$title-'"
        :font-range="fontRange.productfs"
      />
    </div>
    <div class="divider"></div>
    <title-line-height
      class="row-top__dis"
      :model="model"
      :prefix="'$title-'"
      :name="'lineHeight'"
    >
      <span class="setting-attribute--title">行高</span>
    </title-line-height>
    <desc-line-num
      class="row-top__dis"
      :model="model"
      :prefix="'$title-'"
      :name="'lineClamp'"
      :value-range="fontRange.productdesccol"
    >
      <span class="setting-attribute--title">行数</span>
    </desc-line-num>
  </div>
</template>
<script>
import TitleFont from '@comp/font/font-group/font-style4'
import TitleLineHeight from '@comp/font/font-line-height'
import DescLineNum from '@comp/form/form-slider-num'
export default {
  name: 'Font',
  components: {
    TitleFont,
    TitleLineHeight,
    DescLineNum
  },
  props: {
    model: {
      type: Object,
      default: () => ({})
    },
    prefix: {
      type: String,
      default: '$'
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
