<template>
  <div class="font-section">
    <title-font
      :font-range="fontRange.newslistdescfs"
      :model="model"
      :prefix="prefix + 'title-'"
    />
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
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'
import FontStyle2 from '@comp/font/font-group/font-style2'
import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontAlignGroup from '@comp/font/font-align-group'

import TitleLineHeight from '@comp/font/font-line-height'

import DescLineNum from '@comp/form/form-slider-num'

import TitleFont from '@comp/font/font-group/font-style3'
export default {
  name: 'Font',
  components: {
    FontFamily,
    FontColor,
    FontSize,
    FontWeight,
    FontItalic,
    FontUnderline,
    TitleLineHeight,
    FontAlignGroup,
    DescLineNum,
    FontStyle2,
    TitleFont
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
    }
  },
  data() {
    return {
      activeName: '1'
    }
  },
  methods: {
    _handleAddButtonIcon() {},
    onCssChange(oldData, data) {
      if (window.smSite) {
        window.smSite.onCssChange(oldData, data)
      }
    }
  }
}
</script>
