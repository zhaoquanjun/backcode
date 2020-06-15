<template>
  <div class="font-section">
    <div class="flex-between-center--area">
      <font-family :model="model" :prefix="prefix"></font-family>
      <font-size
        :model="model"
        :prefix="prefix"
        :value-range="fontRange.detailfs"
      ></font-size>
    </div>
    <font-style1
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
    ></font-style1>
    <font-line-height class="row-top__dis" :model="model" :prefix="prefix" :name="'lineHeight'">
      <span class="setting-attribute--title">行高</span>
    </font-line-height>
    <font-letter-space
      class="row-top__dis"
      :model="model"
      :prefix="prefix"
      :name="'letterSpace'"
      :value-range="fontRange.producttitlels"
    >
      <span class="setting-attribute--title">字间距</span>
    </font-letter-space>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontStyle1 from '@comp/font/font-group/font-style1'
import FontAlignGroup from '@comp/font/font-align-group'

import FontLineHeight from '@comp/font/font-line-height'
import FontLetterSpace from '@comp/form/form-slider-css'

export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontStyle1,
    FontLineHeight,
    FontLetterSpace,
    FontAlignGroup
  },
  props: {
    model: {
      type: Object
    },
    prefix: {
      type: String,
      default: '$'
    },
    fontRange: {
      type: Object
    },
    controlName: {
      type: String
    }
  },
  data() {
    return {
      activeName: '1',
      iconPopupFlag: false
    }
  }
}
</script>
