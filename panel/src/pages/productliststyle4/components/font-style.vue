<template>
  <div class="font-section">
    <FontStyle
      :model="model"
      :prefix="prefix"
      :font-range="fontRange.productfs"
    />
    <div class="divider"></div>
    <title-line-height class="row-top__dis" :model="model" :prefix="prefix" :name="'lineHeight'">
      <span class="setting-attribute--title">行高</span>
    </title-line-height>
  </div>
</template>
<script>
import FontStyle from '@comp/font/font-group/font-style3'
import TitleLineHeight from '@comp/font/font-line-height'

export default {
  name: 'Font',
  components: {
    FontStyle,
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
    fontRange: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
