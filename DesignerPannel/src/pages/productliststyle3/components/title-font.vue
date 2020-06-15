<template>
  <div class="font-section">
    <TitleFont
      :model="model"
      :prefix="prefix"
      :font-range="fontRangeTitlefs"
    />
    <div class="divider"></div>
    <title-line-height
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'lineHeight'"
      :value-range="fontRangeTitlelh"
    >
      <span class="setting-attribute--title">行高</span>
    </title-line-height>
  </div>
</template>
<script>
import TitleFont from '@comp/font/font-group/font-style4'
import TitleLineHeight from '@comp/font/font-line-height'

export default {
  name: 'Font',
  components: {
    TitleFont,
    TitleLineHeight
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
    fontRangeTitlefs: {
      type: Object,
      default: () => ({})
    },
    fontRangeTitlelh: {
      type: Object,
      default: () => ({})
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
