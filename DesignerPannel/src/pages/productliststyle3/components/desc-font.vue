<template>
  <div class="font-section">
    <switch-area
      prefix="$desc-"
      :model="model"
      :name="'descShow'"
    ><span class="setting-attribute--title">显示简介</span></switch-area>
    <template v-if="model.styleModel.cssvars['$desc-descShow'] == 'block'">
      <DescFont
        class="row-top__dis"
        :model="model"
        :prefix="prefix"
        :font-range="fontRange.fontRangeTitlefs"
      />
      <div class="divider"></div>
      <desc-line-height
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineHeight'"
        :value-range="fontRange.productlist4pricelh"
      >
        <span class="setting-attribute--title">行高</span>
      </desc-line-height>
      <desc-line-num
        class="row-top__dis"
        :model="model.styleModel.cssvars"
        :prefix="'$desc-'"
        :name="'lineClamp'"
        :value-range="fontRange.productlist4descln"
      >
        <span class="setting-attribute--title">行数</span>
      </desc-line-num>
    </template>
  </div>
</template>
<script>
import SwitchArea from '@comp/form/form-switch'
import DescFont from '@comp/font/font-group/font-style4'
import DescLineHeight from '@comp/font/font-line-height'
import DescLineNum from '@comp/form/form-slider-num'

export default {
  name: 'Font',
  components: {
    DescFont,
    SwitchArea,
    DescLineHeight,
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
<style lang="scss" scoped>
.font-style {
  width: 166px !important;
  li {
    width: 13px !important;
  }
}
</style>
