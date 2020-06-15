<template>
  <div class="font-section">
    <div class="flex-between-center--area">
      <font-family :model="model"
                   :prefix="prefix"
                   :name="'fontFamily'"></font-family>
      <font-size :model="model"
                 :prefix="prefix"
                 :name="'fontSize'"
                 :value-range="fontRangeTitlefs"></font-size>
    </div>
    <div class="flex-between-center--area row-top__dis">
      <ul class="font-style">
        <li>
          <font-weight :prefix="prefix"
                       :name="'fontWeight'"
                       :model="model"></font-weight>
        </li>
        <li>
          <font-italic :prefix="prefix"
                       :name="'fontStyle'"
                       :model="model"></font-italic>
        </li>
        <li>
          <font-underline :prefix="prefix"
                          :name="'textDecoration'"
                          :model="model"></font-underline>
        </li>
        <li>
          <font-align-group :prefix="prefix"
                            :name="'textAlign'"
                            :model="model"></font-align-group>
        </li>
      </ul>
      <!-- 字体颜色选择器 begin -->
      <font-color :model="model"
                  :prefix="prefix"
                  :name="'fontColor'"></font-color>
      <!-- 字体颜色选择器 end -->
    </div>
    <div class="divider"></div>
    <title-line-height class="row-top__dis"
                       :model="model"
                       :prefix="prefix"
                       :name="'lineHeight'"
                       :value-range="fontRangeTitlelh">
      <span class="setting-attribute--title">行高</span>
    </title-line-height>
  </div>
</template>
<script>
import FontFamily from '@comp/font/font-family'
import FontSize from '@comp/font/font-size'
import FontColor from '@comp/font/font-color'

import FontWeight from '@comp/font/font-weight'
import FontItalic from '@comp/font/font-italic'
import FontUnderline from '@comp/font/font-underline'
import FontAlignGroup from '@comp/font/font-align-group'

import TitleLineHeight from '@comp/font/font-line-height'

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
    fontRangeTitlefs: {
      type: Object
    },
    fontRangeTitlelh: {
      type: Object
    }
  },
  data () {
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
